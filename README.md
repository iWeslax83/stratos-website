# Stratos — Bursa Fen Lisesi İHA Takımı

Sponsor odaklı sinematik tek sayfa + alt sayfalar mimarisi. Next.js 15 App Router, TypeScript, Tailwind v4, Resend.

## Geliştirme

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # üretim derlemesi
npm run typecheck    # tsc --noEmit
```

## Ortam değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyala ve doldur.

| Anahtar | Zorunlu | Açıklama |
| --- | --- | --- |
| `RESEND_API_KEY` | Üretim | https://resend.com/api-keys üzerinden alın. Yoksa form çalışır ama mail gitmez (sunucu loguna düşer). |
| `RESEND_FROM` | Hayır | Mail gönderilen "from" adresi. Varsayılan: `onboarding@resend.dev` (test sandbox). Üretimde doğrulanmış bir domain kullanın. |
| `CONTACT_TO` | Hayır | Form maillerinin iletileceği adres. Varsayılan: `stratosiha@gmail.com`. |

## Dizin yapısı

```
app/
  page.tsx                Anasayfa (hero + stats + manifesto + pillars + achievements + projects + roadmap + team teaser + sponsor cta)
  projeler/page.tsx       Proje listesi
  projeler/[slug]/        Proje detay (Otonom Döner Kanat, FPV, VEX)
  takim/                  Danışman, kaptanlar, üyeler, departmanlar
  basarilar/              Başarı timeline
  galeri/                 Görsel grid (placeholder — sunum kareleri)
  blog/                   "Yakında" sayfası
  sponsorlar/             4 tier paket + teknik credibility + sponsor logoları placeholder
  iletisim/               Sponsor + Üyelik formları
  api/contact/            Resend mail endpoint
  sitemap.ts, robots.ts   SEO
  opengraph-image.tsx     Dinamik sosyal paylaşım görseli
  not-found.tsx           404
  loading.tsx             Sayfa geçişi
src/
  components/             ui, layout, brand, forms
  data/site.ts            Tüm metin/veri tek dosyada
  lib/cn.ts, i18n.ts      Yardımcılar
public/
  brand/                  Logo, wordmark.svg, presentation.pdf
  images/gallery/         12 placeholder kare
```

## İçerik

Tüm metin ve veri `src/data/site.ts` içinde. Güncelleme için sadece bu dosyayı düzenleyin — projeler, takım, başarılar, sponsor tier'ları, iletişim hepsi orada.

Logo: `public/brand/logo-mark.png` (yuvarlak amblem). Wordmark: CSS-rendered (`Saira Stencil One` + gradient text) ve bir export SVG'si `public/brand/wordmark.svg`.

## Tasarım sistemi

`app/globals.css` üzerinden CSS custom property'leriyle tanımlı:

- **Marka:** Teal #1A6973 (logo'dan)
- **Sky gradient:** #07101E → #173255 → #87BBE0
- **Vurgu:** Sunset orange #FF7849 (sıcak kontrast)
- **Yüzeyler:** ink-50 → ink-950 (12 ton)
- **Display:** Saira Condensed (Bahnschrift alternatifi, geometric)
- **Wordmark:** Saira Stencil One (NASA worm enerjisi)
- **Body:** Inter

## Deploy (Vercel)

1. GitHub'a push: `git push origin development` (veya `main`)
2. Vercel'de "Import Project" → repo'yu seç
3. Environment Variables sekmesinde `RESEND_API_KEY` ve opsiyonel olarak `RESEND_FROM`, `CONTACT_TO` ekle
4. Deploy

Production'da `stratosiha@gmail.com`'a sponsor + üyelik mail'lerinin ulaşması için Resend'de domain doğrulaması yapılmalı (aksi halde varsayılan `onboarding@resend.dev` adresi kullanılır — bu sandbox sadece test için).

## Henüz eksik / yakında

- EN içerik — yapı route-bazlı `[locale]` segmente taşınacak
- Sosyal medya hesapları — açıldığında `src/data/site.ts > social` doldurulup footer/iletişim aktifleşir
- Yüksek çözünürlüklü fotoğraf / drone uçuş videosu — hero ve galeri güncellenecek
- Blog yazıları — `app/blog/` altına `[slug]/page.tsx` eklenecek
- Wordmark SVG export — `Saira Stencil One` font outline'larıyla statik SVG hazırlanacak

## Lisans

Tüm hakları Stratos / Bursa Fen Lisesi İHA Takımı'na aittir.
