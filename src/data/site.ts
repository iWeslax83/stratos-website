// Single source of truth for site content. Keep TR primary; EN comes later.

export const site = {
  brand: {
    name: "Stratos",
    descriptor: "Bursa Fen Lisesi İHA Takımı",
    descriptorShort: "Bursa Fen İHA",
    school: "Tofaş Fen Lisesi",
    city: "Bursa",
    tagline: "Stratosferi hedefleyen lise İHA takımı.",
    longTagline:
      "Tasarım, üretim, otonom yazılım ve uçuş — hepsini öğrenci eliyle yapan, ulusal yarışmalarda sahaya çıkan bir lise takımı.",
  },
  contact: {
    email: "stratosiha@gmail.com",
    phone: "+90 505 036 36 07",
    phoneHref: "tel:+905050363607",
    address: "Tofaş Fen Lisesi, Bursa",
  },
  season: {
    label: "Sezon 2025-26",
    competition: "TEKNOFEST 2026 — Liseler Arası İHA",
    // Yarışma haftası — TEKNOFEST'in resmi tarihi açıklandığında güncelle.
    competitionDate: "2026-09-10",
    sponsorshipDeadline: "2026-04-30",
    currentPhase: "Detay Tasarım",
    nextMilestone: "Üretim & Entegrasyon",
  },
  social: {
    // None active yet — will be opened soon. Render as "coming soon" badges.
    instagram: null as string | null,
    linkedin: null as string | null,
    youtube: null as string | null,
  },
  nav: [
    { href: "/", label: "Anasayfa" },
    { href: "/projeler", label: "Projeler" },
    { href: "/takim", label: "Takım" },
    { href: "/basarilar", label: "Başarılar" },
    { href: "/galeri", label: "Galeri" },
    { href: "/blog", label: "Blog" },
    { href: "/sponsorlar", label: "Sponsorlar" },
    { href: "/iletisim", label: "İletişim" },
  ],
  achievements: [
    {
      id: "meb-design",
      title: "MEB Robot — En İyi Tasarım Ödülü",
      year: "2025",
      category: "Tasarım",
      blurb:
        "MEB Robot Yarışması'nda mekanik tasarım ve özgünlük dalında ödüllendirildik.",
    },
    {
      id: "nasa-spaceapps",
      title: "NASA SpaceApps Hackathon — Türkiye 2.liği",
      year: "2025",
      category: "Hackathon",
      blurb:
        "2025 NASA SpaceApps Challenge'da Bursa il birinciliği ve Türkiye 2.liği aldık.",
    },
    {
      id: "teknofest-iha",
      title: "TEKNOFEST Liseler Arası İHA — İlk Raporu Geçtik",
      year: "2026",
      category: "TEKNOFEST",
      blurb:
        "Döner Kanat kategorisinde proje sunum raporumuz baraj puanının 8 puan üstünde bir başarı elde ederek başarıyla kabul edildi.",
    },
  ],
  projects: [
    {
      slug: "otonom-doner-kanat",
      title: "Otonom Döner Kanat İHA",
      competition: "TEKNOFEST Liseler Arası İHA — Döner Kanat",
      year: "2026",
      summary:
        "Görüntü işleme ile otonom hedef tespiti, hassas iniş ve görev mekanizması yapabilen X-quadrotor.",
      highlights: [
        "Pixhawk 6C otopilot + Raspberry Pi 5 (8 GB) görev bilgisayarı",
        "Pi Camera Module 3 + OpenCV ile gerçek zamanlı hedef tespiti",
        "3K karbon fiber gövde, CNC ile 0.1 mm toleransta üretim",
        "2.4 kg ağırlık · 19.76 dk hover · 16.5 m/s maks. hız",
      ],
      tech: [
        "Pixhawk 6C",
        "Raspberry Pi 5",
        "ArduPilot",
        "OpenCV",
        "MAVLink",
        "Karbon Fiber",
      ],
    },
    {
      slug: "fpv-doner-kanat",
      title: "FPV Döner Kanat İHA",
      competition: "MEB Robot FPV İHA — Döner Kanat",
      year: "2025",
      summary:
        "Gerçek zamanlı FPV görüntü aktarımı ve yüksek manevra kabiliyetine sahip yarış drone'u.",
      highlights: [
        "Düşük gecikmeli analog FPV video aktarımı",
        "Yarış parkurları için optimize edilmiş hafif gövde",
        "Sertifikalı pilotlar tarafından çalıştırılıyor",
      ],
      tech: ["FPV", "Analog Video", "Carbon Frame", "Race-tuned PID"],
    },
    {
      slug: "vex-pushback",
      title: "VEX Robotics V5 — Pushback",
      competition: "VEX Robotics Competition",
      year: "2025",
      summary:
        "Özel mekanik tasarım ve stratejik otonom programlama içeren yarışma seviyesinde robot.",
      highlights: [
        "Sezona özel \"Pushback\" oyunu için tasarlandı",
        "Sensör entegrasyonu ile gelişmiş otonom rutin",
        "Mekanizma tekrarı için modüler tasarım",
      ],
      tech: ["VEX V5", "C++", "Modular Mechanics"],
    },
  ],
  team: {
    advisor: {
      name: "Kadir Hançer",
      role: "Takım Sorumlusu (Öğretmen)",
    },
    members: [
      {
        name: "Emir Sakarya",
        role: "Elektronik & Yazılım Kaptanı",
        department: "Yazılım",
        captain: true,
      },
      {
        name: "Berke Azim Açıkkol",
        role: "Sponsorluk Kaptanı",
        department: "Sponsorluk",
        captain: true,
      },
      {
        name: "Erdem Gümüş",
        role: "Ana Pilot",
        department: "Pilot",
        captain: true,
      },
      {
        name: "Demir Özcan",
        role: "Tasarım Kaptanı",
        department: "Çizim",
        captain: true,
      },

      { name: "Yusuf Talha Kaya", role: "Üye", department: "Mekanik", captain: false },
      { name: "Ahmet Ege Aksoy", role: "Üye", department: "Yazılım", captain: false },
      { name: "İbrahim Özdemir", role: "Üye", department: "Çizim", captain: false },
    ],
    departments: [
      {
        id: "cizim",
        name: "Çizim",
        blurb:
          "İHA'nın gövde tasarımını CAD ortamında 3 boyutlu olarak modelliyor, mekanik ekiple birlikte üretime hazır hâle getiriyor.",
      },
      {
        id: "mekanik",
        name: "Mekanik",
        blurb:
          "Tasarımın gerçek dünyaya geçişini yönetir — CNC kesim, 3D baskı, montaj ve prototip testleri ekibin elinden çıkar.",
      },
      {
        id: "yazilim",
        name: "Yazılım",
        blurb:
          "Otonom uçuş algoritmaları, görüntü işleme ve yer istasyonu yazılımı; ArduPilot + OpenCV ekosistemi üstünde geliştirilir.",
      },
      {
        id: "pilot",
        name: "Pilot",
        blurb:
          "Sertifikalı pilotlarımız uçuş testlerini ve yarışma uçuşlarını gerçekleştirir; simülasyon ve gerçek saha tecrübesi taşır.",
      },
      {
        id: "sponsorluk",
        name: "Sponsorluk",
        blurb:
          "Takımın maddi ve manevi destekleri için kurumlarla iletişim kurar; pitch deck, raporlama ve marka iş birlikleri ekipte yönetilir.",
      },
    ],
  },
  sponsorship: {
    intro:
      "Stratos, Türkiye'nin önde gelen lise İHA takımlarından biri olma yolunda. Sponsorlarımız bu yolculuğun parçası — adınız uçtuğumuz her görevde, paylaştığımız her başarıda taşınır.",
    tiers: [
      {
        id: "platin",
        name: "Platin",
        amount: "50.000 TL+",
        benefits: [
          "İHA gövdesinde büyük logo",
          "Tüm takım kıyafetlerinde logo",
          "Web sitesi anasayfasında öne çıkan logo",
          "Resmî tanıtım videolarında özel anma",
          "Yarışmalarda VIP saha ziyareti imkânı",
          "Detaylı sezon sonu raporu",
        ],
      },
      {
        id: "altin",
        name: "Altın",
        amount: "25.000 TL+",
        benefits: [
          "İHA gövdesinde orta boy logo",
          "Takım kıyafetlerinde logo",
          "Web sitesi sponsorlar sayfasında öne çıkan logo",
          "Sosyal medya tanıtım postları",
          "Sezon sonu raporu",
        ],
      },
      {
        id: "gumus",
        name: "Gümüş",
        amount: "10.000 TL+",
        benefits: [
          "İHA üstünde küçük logo",
          "Web sitesi sponsorlar sayfasında logo",
          "Sosyal medya teşekkür postu",
        ],
      },
      {
        id: "destekci",
        name: "Destekçi",
        amount: "5.000 TL altı / ayni destek",
        benefits: [
          "Web sitesi destekçiler bölümünde isim",
          "Sosyal medya teşekkür postu",
        ],
      },
    ],
    credibility: [
      { label: "Toplam uçuş ağırlığı", value: "2.4 kg" },
      { label: "Hover uçuş süresi", value: "19.76 dk" },
      { label: "Maksimum hız", value: "59.4 km/h" },
      { label: "Maks. menzil", value: "12 km" },
      { label: "Otopilot", value: "Pixhawk 6C" },
      { label: "Görev bilgisayarı", value: "Raspberry Pi 5 (8 GB)" },
      { label: "Yazılım", value: "ArduPilot · OpenCV" },
      { label: "Gövde", value: "3K Karbon Fiber" },
    ],
  },
} as const;

export type Project = (typeof site.projects)[number];
export type Member = (typeof site.team.members)[number];
export type Department = (typeof site.team.departments)[number];
export type Achievement = (typeof site.achievements)[number];
export type Tier = (typeof site.sponsorship.tiers)[number];
