# Stratos — Medya Doldurma Promptu

Bu dosya, fotoğraflar ve "Topluma Açılan Kanatlar" içeriği hazır olduğunda
kullanılır. Aşağıdaki **PROMPT** bölümünü kopyalayıp Claude Code'a yapıştır,
dosyaları belirtilen klasörlere koy, gerisini Claude bağlar.

Bu konvansiyonlar, spec şeridi + fotoğraf alanları + outreach bölümü ilk
kurulurken belirlendi; kod bu isim/oran/alanlara göre hazırlandı.

---

## Dosya yerleşimi ve oranlar (referans)

### 1. Proje kartı fotoğrafları  (C1 — dikey, görsel üstüne bindirme)
- **Klasör:** `public/images/projects/`
- **Dosyalar:** `otonom-doner-kanat.jpg`, `fpv-doner-kanat.jpg`
- **Oran:** dikey **3:4** (kart böyle kırpıyor, `object-cover`)
- **Önerilen boyut:** en az **1080 × 1440 px**, JPG ya da WebP
- **İçerik ipucu:** aracın net göründüğü, üst yarısı sade (alt yarıya
  başlık + 4 stat biniyor, koyu degrade var)
- **Bağlanır:** `src/data/site.ts` → her proje için `image: "/images/projects/<slug>.jpg"`

### 2. Takım üyesi fotoğrafları  (yatay kart — solda foto)
- **Klasör:** `public/images/team/`
- **Oran:** dikeyimsi **4:5** (sol sütun boydan boya `object-cover`)
- **Önerilen boyut:** en az **800 × 1000 px**
- **Dosya adları** (ASCII slug — ç→c, ş→s, ğ→g, ı→i, ö→o, ü→u, İ→i):
  - `arda-akalin.jpg`
  - `sualp-celik.jpg`
  - `emir-sakarya.jpg`
  - `berke-azim-acikkol.jpg`
  - `erdem-gumus.jpg`
  - `demir-ozcan.jpg`
  - `yusuf-talha-kaya.jpg`
  - `ali-arda-tirnava.jpg`
  - `ahmet-ege-aksoy.jpg`
  - `ibrahim-ozdemir.jpg`
  - `kadir-hancer.jpg` (danışman)
- **Bağlanır:** `src/data/site.ts` → ilgili üyeye `photo: "/images/team/<slug>.jpg"`
- Foto olmayan üyede otomatik baş harf yedeği devreye girer, eksik olması sorun değil.

### 3. "Topluma Açılan Kanatlar" kartları  (yatay görsel)
- **Klasör:** `public/images/outreach/`
- **Oran:** yatay **4:3** ya da **16:10**
- **Önerilen boyut:** en az **1200 × 900 px**
- **Dosyalar:** her etkinlik için kendi slug'ı, ör. `ortaokul-stem-atolyesi.jpg`
- **Bağlanır:** `src/data/site.ts` → `outreach` dizisindeki ilgili maddenin `image` alanı

### 4. Sabit arka plan reveal bandı  (anasayfa "A" efekti)
- **Klasör:** `public/images/reveal/`
- **Oran:** geniş yatay **16:9** (sayfa üstünden kayar, ortası sade olsun)
- **Önerilen boyut:** en az **1920 × 1080 px**
- **Dosya:** ör. `flight-band.jpg` (uçuş / saha karesi en iyisi)
- **Bağlanır:** `src/data/site.ts` → `media.revealBand: "/images/reveal/flight-band.jpg"`
- Mobilde otomatik olarak normal kapak görseline döner; foto yokken sinematik degrade gösterilir.

---

## "Topluma Açılan Kanatlar" — her etkinlik için doldurulacak şablon

Her gerçek etkinlik için şunları ver (uydurma yok):

```
Başlık:        (ör. Ortaokul STEM Atölyesi)
Dönem:         (ör. Mart 2026)
Açıklama:      (1-2 cümle: ne yaptınız, kime, nerede)
Vurgu sayısı:  (opsiyonel, ör. 40)
Sayı etiketi:  (opsiyonel, ör. öğrenciye ulaştık)
Fotoğraf:      (opsiyonel, dosya adı)
```

> Not: site metinlerinde uzun tire ( — ) kullanma, normal tire ya da virgül kullan.

---

## PROMPT  (hazır olduğunda bunu kopyala-yapıştır)

```
Stratos sitesinde bekleyen medyayı doldur. Konvansiyonlar docs/media-fill-prompt.md
dosyasında. Aşağıdakileri ekledim/veriyorum:

PROJE FOTOĞRAFLARI:
- public/images/projects/ klasörüne şu dosyaları koydum: [koyduklarını yaz veya "hepsi"]

TAKIM FOTOĞRAFLARI:
- public/images/team/ klasörüne şu üyelerin fotoğraflarını koydum: [isimleri yaz veya "hepsi"]

REVEAL BANDI:
- public/images/reveal/ klasörüne reveal bandı fotoğrafını koydum: [dosya adı]

TOPLUMA AÇILAN KANATLAR ETKİNLİKLERİ:
1) Başlık: ...
   Dönem: ...
   Açıklama: ...
   Vurgu sayısı: ...   Sayı etiketi: ...
   Fotoğraf: ...
2) ...
(istediğin kadar madde)

Yapman gerekenler:
- site.ts'te ilgili image / photo alanlarını doldur.
- media.revealBand'i koyduğum reveal fotoğrafıyla doldur.
- outreach dizisini verdiğim etkinliklerle güncelle (boş/placeholder durumunu kaldır).
- Eksik foto olan yerlerde baş harf / degrade yedeği kalsın.
- next/image kullan, oranlar docs'taki gibi (object-cover).
- npm run build ve npm run typecheck ile doğrula.
```
