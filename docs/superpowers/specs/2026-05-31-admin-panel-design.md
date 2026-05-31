# Stratos Admin Panel — Tasarım Dokümanı

**Tarih:** 2026-05-31
**Durum:** Onay bekliyor
**Repo:** `iWeslax83/iha-website` (yerel klasör: `stratos-website`)

## 1. Amaç

`stratosiha.vercel.app/admin` üzerinden ekibin tüm site içeriğini kod yazmadan
düzenleyebilmesi ve görsel yükleyebilmesi. Her kayıt GitHub repo'suna commit'lenir,
Vercel yeniden derler, değişiklik ~1-2 dk içinde canlıya çıkar.

**Kapsam (düzenlenebilir bölümler):** Genel (marka, iletişim, sezon, sosyal,
medya görseli), Takım (üyeler, departmanlar, danışman), Sponsorlar (sponsor
listesi + tier'lar), Başarılar, Topluluk (outreach etkinlikleri), Projeler
(specs/highlights/görseller dahil), Blog yazıları.

**EN sayfası:** Düzenlenebilir veri alanları Gemini ile TR→EN otomatik çevrilir
ve `/en` sayfasına yansır. Sabit sayfa metinleri (Hero, About prose) elle yazılmış
İngilizcesiyle kalır.

## 2. Temel Kararlar (brainstorm çıktısı)

| Karar | Seçim | Gerekçe |
|---|---|---|
| Veri saklama | GitHub'a commit | Yeni servis yok, her edit bir commit = tam geçmiş + geri alma, statik mimari korunur |
| Giriş | Tek paylaşılan şifre | Küçük ekip için pratik |
| Editör tipi | Her bölüme özel formlar | Teknik olmayan kullanıcı için en iyi deneyim |
| Görseller | Panelden yükleme (base64 commit) | Logo/foto tamamen panelden |
| EN çeviri | Gemini, sadece veri alanları | Senkron + kaliteli sabit metin korunur |

## 3. Mimari Genel Bakış

Dört katman:

1. **İçerik deposu refactor'ü** — Düzenlenebilir içerik `site.ts`/`blog.ts`
   TypeScript sabitlerinden JSON dosyalarına taşınır. `site.ts` ince bir tipli
   loader olur; sayfalar yine `import { site } from "@/data/site"` kullanır.
2. **Auth** — Şifre girişi → imzalı oturum cookie'si. `middleware.ts` + API
   route'larında sunucu tarafı doğrulama.
3. **Editör + yazma API'si** — Her bölüme özel formlar; kayıtta GitHub Contents
   API ile commit.
4. **Çeviri** — Kayıtta Gemini ile çevrilebilir alanlar TR→EN, `site.en.json`
   üretilip commit'lenir; `/en` oradan beslenir.

## 4. İçerik Deposu Refactor'ü

### Mevcut
- `src/data/site.ts` (293 satır, `as const`, türetilmiş tipler)
- `src/data/blog.ts` (417 satır)
- `app/en/page.tsx` — EN metinleri sayfaya gömülü (`tiersEn`, `achievementsEn`,
  `pillarsEn`, `credibilityEn`, `captainRoleEn` + JSX prose). TR ile senkron değil
  (eski `platin` tier'ı vb.).

### Yeni dosya yapısı
```
src/content/
  site.json          # `site` içeriği (nav HARİÇ)
  site.en.json       # Gemini ile üretilen EN çevirisi (otomatik, commit'lenir)
  blog.json          # blog yazıları
  blog.en.json       # blog EN çevirisi (otomatik)
src/data/
  types.ts           # açık TS interface'ler (Member, Project, Tier, Sponsor,
                     #   Achievement, OutreachItem, Department, BlogPost, Site...)
  site.ts            # site.json'u import + tiple + nav'ı kodda ekle → export
  site-en.ts         # site.en.json'u import + tiple → export `siteEn`
  blog.ts            # blog.json'u import + tiple → export
```

### Önemli değişiklikler
- Tipler artık `as const`'tan **türetilemez** (JSON literal değil). `types.ts`'te
  açık `interface`/`type` tanımlanır. Her `export type X = (typeof ...)[number]`
  açık tipe çevrilir. Tipi import eden bileşenler değişmeden çalışır.
- `nav` **kodda kalır** (`site.ts` içinde). Gerçek route'lara bağlı; panelden
  düzenlemek yeni sayfa eklemeden navigasyonu bozar. Kapsam dışı.
- `app/en/page.tsx` refactor edilir: gömülü `tiersEn`/`achievementsEn`/...
  dizileri kaldırılır, `siteEn`'den okunur. Sabit sayfa metinleri (Hero başlığı,
  About paragrafları, bölüm eyebrow'ları, buton etiketleri, QuickFacts etiketleri)
  sayfada İngilizce olarak kalır. Bu refactor mevcut TR/EN senkronsuzluğunu da
  giderir.

## 5. Auth

- Env: `ADMIN_PASSWORD`, `SESSION_SECRET`.
- `/admin/login` — şifre formu → `POST /api/admin/login`.
- Login route: `ADMIN_PASSWORD` ile **timing-safe** karşılaştırma. Başarıda
  `SESSION_SECRET` ile imzalı (HMAC, Web Crypto — ekstra paket yok),
  `httpOnly` + `secure` + `sameSite=strict` cookie (`stratos_admin`), ~7 gün geçerli.
- `verifySession()` yardımcı fonksiyonu cookie imzası + süresini doğrular.
- `middleware.ts` — `/admin/*`'i korur (`/admin/login` hariç), girişsizi login'e
  yönlendirir. **API route'ları ayrıca sunucu tarafında `verifySession()` çağırır**
  (çift katman — middleware tek başına API koruması için yeterli değil).
- Başarısız girişe küçük sabit gecikme (brute-force yavaşlatma). Güçlü şifre şart.
- `POST /api/admin/logout` cookie'yi temizler.

## 6. Yazma API'si (GitHub commit)

### `GET /api/admin/content?section=...`
Editör açılışında **GitHub'dan canlı** güncel içeriği okur (deploy'u beklemeden
son commit'lenmiş hal). Public site bundle'daki JSON'u kullanır (statik, hızlı);
iki taraf bağımsız.

### `POST /api/admin/content { section, data }`
1. `verifySession`
2. **Zod ile şema doğrulaması** — bozuk veri reddedilir
3. GitHub'dan `site.json`'un güncel halini + `sha`'sını oku
4. Sadece düzenlenen bölümü merge et, tüm dosyayı `sha` ile commit'le
   (optimistic concurrency — `sha` değiştiyse GitHub reddeder → "içerik değişti,
   yenile")
5. Çeviri tetikle (bkz. §8), `site.en.json` commit'le
6. Başarı → "Kaydedildi, ~1-2 dk içinde yayında" toast

### `POST /api/admin/upload` (görsel)
- `verifySession`
- Dosya tipi (`png/jpg/webp/svg`) + boyut (≤5MB) doğrula
- `public/images/<kategori>/<slug>.<ext>` olarak Contents API ile commit
  (slug'laştırılmış benzersiz ad — çakışmayı önler)
- Dönen yolu (`/images/...`) ilgili form alanına yaz

GitHub erişimi: ekstra paket yok, düz `fetch` ile REST Contents API.

## 7. Editör UI

- `/admin` dashboard → bölüm kartları: Genel, Takım, Sponsorlar, Başarılar,
  Topluluk, Projeler, Blog.
- Her bölüm kendi formu (client component).
- Yeniden kullanılabilir parçalar: `TextField`, `TextArea`, `Select`,
  `ListEditor<T>` (satır ekle/sil/sırala), `ImageUpload` (yükle + önizleme +
  manuel yol yedeği).
- Listeler (üyeler, sponsorlar, başarılar, projeler, outreach, blog, tier'lar) →
  satır bazlı düzenleme, her satırda doğru alanlar.
- Stil: utiliter, public siteden görsel olarak ayrı; mevcut Tailwind token'ları
  tutarlılık için kullanılır.
- Her bölümde "Kaydet" + (gerekirse) "EN'i yeniden çevir" butonu.

## 8. Çeviri (Gemini TR→EN)

- Env: `GEMINI_API_KEY`. Model: hızlı bir Gemini modeli (örn. `gemini-2.0-flash`),
  config'te sabitlenir. Erişim: düz `fetch` ile Generative Language REST API.
- **Çeviri manifesti** — hangi alanların çevrileceğini belirleyen alan haritası.
  Çevrilir: başlık, blurb/summary, role, department, benefits[], tagline'lar,
  intro, kategori, statLabel, highlights[], spec label, blog title/excerpt/body/tags.
  Çevrilmez (olduğu gibi kopyalanır): name (özel ad), email, phone, url, logo/image
  yolu, id, slug, year, date, sayısal değerler, unit, tech[] (marka/ürün adları).
- **Akış:** Kayıtta düzenlenen bölümün çevrilebilir string'leri `{path: text}`
  olarak tek Gemini çağrısında gönderilir → `{path: translation}` döner →
  `site.en.json` klonlanıp ilgili alanlar güncellenir → commit. (Sadece edit'lenen
  bölüm çevrilir, tüm dosya değil — token tasarrufu.)
- **TR otoritedir:** Önce TR commit'i atılır. Çeviri başarısız olursa TR yine
  kaydedilmiştir; "TR kaydedildi, EN çevirisi başarısız — tekrar dene" uyarısı +
  manuel "EN'i yeniden çevir" butonu.
- `/en` sayfası `siteEn`'den (= `site.en.json`) okur; sabit sayfa metinleri
  sayfada kalır.

## 9. Riskler & Önlemler

- **Bozuk commit build'i kırabilir** (site geçici düşer). Önlem: (1) sunucuda zod
  doğrulaması, (2) JSON sadece veri — şema geçerliyse build geçer, (3) her edit
  bir commit = git ile anında geri alma.
- **Her kayıt bir production deploy tetikler** — küçük ekip için sorun değil,
  ücretsiz Vercel build dakikaları yeter.
- **Brute-force** — tek şifre; başarısız girişe gecikme + güçlü `ADMIN_PASSWORD`.
- **Eşzamanlı düzenleme** — `sha` ile optimistic concurrency; çakışmada "yenile".
- **Yerel geliştirme** — panel `GITHUB_BRANCH`'e commit'ler. Dev'de `main`'i
  kirletmemek için `GITHUB_BRANCH`'i bir scratch branch'e alınabilir.
- **Gemini hatası/kotası** — çeviri best-effort; TR akışını bloklamaz, retry var.

## 10. Env Variables (tam liste)

| Variable | Değer | Amaç |
|---|---|---|
| `GITHUB_TOKEN` | fine-grained PAT (Contents: R/W, sadece bu repo) | Commit |
| `ADMIN_PASSWORD` | güçlü rastgele şifre | `/admin` girişi |
| `GITHUB_REPO` | `iWeslax83/iha-website` | Hedef repo |
| `GITHUB_BRANCH` | `main` | Hedef branch |
| `SESSION_SECRET` | rastgele 32+ karakter | Oturum cookie imzası |
| `GEMINI_API_KEY` | Gemini API anahtarı | TR→EN çeviri |

## 11. Bağımlılıklar

- `zod` (doğrulama) — eklenir.
- GitHub & Gemini → ekstra paket yok, düz `fetch`.
- Cookie imzası → Web Crypto (HMAC), paket yok.

## 12. SEO / Diğer

- `/admin` → `noindex`, `app/robots.ts`'te disallow.

## 13. Route & Dosya Özeti

```
app/admin/login/page.tsx
app/admin/page.tsx                  # dashboard
app/admin/[section]/page.tsx        # bölüm editörleri (veya bölüm başına sayfa)
app/api/admin/login/route.ts
app/api/admin/logout/route.ts
app/api/admin/content/route.ts      # GET güncel, POST kaydet
app/api/admin/upload/route.ts       # görsel
middleware.ts
src/lib/admin/auth.ts               # oturum imzala/doğrula
src/lib/admin/github.ts             # Contents API client (fetch)
src/lib/admin/gemini.ts             # çeviri client (fetch)
src/lib/admin/schema.ts             # zod şemaları
src/lib/admin/translatable.ts       # çeviri manifesti (alan haritası)
src/content/site.json, site.en.json, blog.json, blog.en.json
src/data/types.ts, site.ts, site-en.ts, blog.ts
src/components/admin/*              # TextField, ListEditor, ImageUpload, ...
```

## 14. Kapsam Dışı (YAGNI)

- nav düzenleme (yapısal)
- çok kullanıcı / değişiklik logu (tek şifre seçildi)
- taslak/önizleme akışı (git geri alma yeterli)
- EN alt sayfaları (blog/proje detay) — sadece `/en` landing çevrilir
- EN sabit pazarlama metinlerinin (Hero/About) otomatik çevirisi

## 15. Test

- **Manuel:** giriş akışı, her bölümü düzenle, görsel yükle, GitHub'da commit'i
  doğrula, deploy + canlı değişikliği doğrula, EN çevirisinin yansımasını doğrula.
- **Birim:** auth imza/doğrulama, zod şemaları, github client (mock fetch),
  çeviri manifesti (doğru alanları seçiyor mu), gemini client (mock fetch).
