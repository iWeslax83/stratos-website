// Single source of truth for site content. Keep TR primary; EN comes later.

export const site = {
  brand: {
    name: "Stratos",
    descriptor: "Bursa Fen Lisesi İHA Takımı",
    descriptorShort: "Bursa Fen İHA",
    school: "Tofaş Fen Lisesi",
    city: "Bursa",
    tagline: "Tofaş Fen Lisesi'nin insansız hava aracı takımı.",
    longTagline:
      "İHA'mızın tasarımını da, üretimini de, yazılımını da öğrenciler yapıyor. Ulusal ve uluslararası yarışmalarda da bu araçla yarışıyoruz.",
  },
  contact: {
    email: "stratosiha@gmail.com",
    phone: "+90 505 036 36 07",
    phoneHref: "tel:+905050363607",
    address: "Tofaş Fen Lisesi, Bursa",
  },
  season: {
    label: "Sezon 2025-26",
    competition: "TEKNOFEST 2026 · Liseler Arası İHA",
    competitionDate: "2026-09-10",
    sponsorshipDeadline: "2026-06-03",
    currentPhase: "Detay Tasarım",
    nextMilestone: "Üretim & Entegrasyon",
  },
  social: {
    // Live: LinkedIn. Instagram / YouTube open later — render as "coming soon".
    instagram: null as string | null,
    linkedin: "https://www.linkedin.com/company/stratos-i%CC%87ha" as
      | string
      | null,
    youtube: null as string | null,
  },
  nav: [
    { href: "/", label: "Anasayfa" },
    { href: "/projeler", label: "Projeler" },
    { href: "/takim", label: "Takım" },
    { href: "/basarilar", label: "Başarılar" },
    { href: "/galeri", label: "Galeri" },
    { href: "/topluluk", label: "Topluluk" },
    { href: "/blog", label: "Blog" },
    { href: "/sponsorlar", label: "Sponsorlar" },
    { href: "/iletisim", label: "İletişim" },
  ],
  achievements: [
    {
      id: "meb-design",
      title: "MEB Robot · En İyi Tasarım Ödülü",
      year: "2026",
      category: "Tasarım",
      blurb:
        "MEB Robot Yarışması'nda mekanik tasarım ve özgünlük dalında ödüllendirildik.",
    },
    {
      id: "nasa-spaceapps",
      title: "NASA SpaceApps Hackathon · Türkiye 2.liği",
      year: "2025",
      category: "Hackathon",
      blurb:
        "2025 NASA SpaceApps Challenge'da Bursa il birinciliği ve Türkiye 2.liği aldık.",
    },
    {
      id: "teknofest-iha",
      title: "TEKNOFEST Liseler Arası İHA · İlk Raporu Geçtik",
      year: "2026",
      category: "TEKNOFEST",
      blurb:
        "Döner Kanat kategorisinde proje sunum raporumuz, baraj puanının 8 puan üzerinde kalarak kabul edildi.",
    },
  ],
  projects: [
    {
      slug: "otonom-doner-kanat",
      title: "Otonom Döner Kanat İHA",
      competition: "TEKNOFEST Liseler Arası İHA · Döner Kanat",
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
      image: "/images/projects/otonom-doner-kanat.jpg" as string | null,
      specs: [
        { value: "2.4", unit: "kg", label: "Ağırlık" },
        { value: "19.76", unit: "dk", label: "Hover" },
        { value: "59.4", unit: "km/h", label: "Maks. Hız" },
        { value: "12", unit: "km", label: "Menzil" },
      ],
    },
    {
      slug: "fpv-doner-kanat",
      title: "FPV Döner Kanat İHA",
      competition: "MEB Robot FPV İHA · Döner Kanat",
      year: "2025",
      summary:
        "Düşük gecikmeli FPV görüntü aktarımıyla uçurduğumuz, yarış için ayarlanmış manevra kabiliyeti yüksek bir drone.",
      highlights: [
        "Düşük gecikmeli analog FPV video aktarımı",
        "Yarış parkurları için optimize edilmiş hafif gövde",
        "Sertifikalı pilotlar tarafından çalıştırılıyor",
      ],
      tech: ["FPV", "Analog Video", "Carbon Frame", "Race-tuned PID"],
      image: "/images/projects/fpv-doner-kanat.jpg" as string | null,
      specs: [
        { value: "~170", unit: "km/h", label: "Maks. Hız" },
        { value: "409", unit: "g", label: "Ağırlık" },
        { value: "14-19", unit: "dk", label: "Uçuş" },
        { value: "8", unit: "ms", label: "Video Gecikmesi" },
      ],
    },
  ],
  team: {
    advisor: {
      name: "Kadir Hançer",
      role: "Takım Sorumlusu (Öğretmen)",
      photo: null as string | null,
    },
    members: [
      {
        name: "Arda Akalın",
        role: "Takım Kaptanı",
        department: "Yönetim",
        captain: true,
      },
      {
        name: "Sualp Çelik",
        role: "Takım Kaptanı",
        department: "Yönetim",
        captain: true,
      },
      {
        name: "Emir Sakarya",
        role: "Elektronik & Yazılım Kaptanı",
        department: "Elektronik & Yazılım",
        captain: true,
      },
      {
        name: "Berke Azim Açıkkol",
        role: "Sponsorluk Kaptanı",
        department: "Sponsorluk",
        captain: true,
      },

      { name: "Erdem Gümüş", role: "Ana Pilot", department: "Pilot", captain: false },
      { name: "Demir Özcan", role: "Tasarım Üyesi", department: "Çizim", captain: false },
      { name: "Yusuf Talha Kaya", role: "Sponsorluk Üyesi", department: "Sponsorluk", captain: false },
      { name: "Ali Arda Tırnava", role: "Sponsorluk Üyesi", department: "Sponsorluk", captain: false },
      { name: "Ahmet Ege Aksoy", role: "Elektronik Üyesi", department: "Elektronik", captain: false },
      { name: "İbrahim Özdemir", role: "Mekanik Üyesi", department: "Mekanik", captain: false },
    ] as Member[],
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
          "Tasarımı fiziksel parçaya dönüştürür: CNC kesim, 3D baskı, montaj ve prototip testleri bu ekipte yapılır.",
      },
      {
        id: "yazilim",
        name: "Yazılım",
        blurb:
          "Otonom uçuş algoritmaları, görüntü işleme ve yer istasyonu yazılımını ArduPilot ile OpenCV üzerinde geliştirir.",
      },
      {
        id: "elektronik",
        name: "Elektronik",
        blurb:
          "Uçuş kontrolcüsü, ESC, motor ve sensör entegrasyonunu kurar; güç dağıtımı ve telemetri bağlantılarının testini yapar.",
      },
      {
        id: "sponsorluk",
        name: "Sponsorluk",
        blurb:
          "Sponsor bulmak için kurumlarla iletişim kurar; sunum dosyası, raporlama ve marka iş birlikleri bu ekipte yürütülür.",
      },
    ],
  },
  sponsorship: {
    intro:
      "Stratos yeni kurulan bir takım ve ulusal ve uluslararası yarışmalarda iddialı olmayı hedefliyor. Sponsorlarımızın adı aracımızın gövdesinde ve paylaştığımız içeriklerde yer alır.",
    tiers: [
      // Platin & Altın now visible: Türkiye Teknoloji Takımı came in at the
      // Platin level (70.000 TL), so the high tiers are live.
      {
        id: "platin",
        name: "Platin",
        amount: "50.000 TL+",
        hidden: false,
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
        hidden: false,
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
    sponsors: [
      {
        name: "Türkiye Teknoloji Takımı",
        logo: "/images/sponsors/t3-vakfi-logo.png",
        url: "https://www.t3vakfi.org" as string | null,
        tier: "platin",
      },
      {
        name: "Deneme Dünyası",
        logo: "/images/sponsors/deneme-dunyasi-logo.png",
        url: "https://denemedunyasi.com.tr" as string | null,
        tier: "gumus",
      },
    ],
  },
  // "Topluma Açılan Kanatlar" — gerçek etkinlikler docs/media-fill-prompt.md
  // promptuyla doldurulur. Boşken anasayfada zarif bir "yakında" durumu gösterilir.
  outreach: [] as OutreachItem[],
  media: {
    // Sabit arka plan reveal bandının fotoğrafı (public/images/reveal/...).
    // Geçici stok görsel; gerçek uçuş karesiyle değiştir (docs/media-fill-prompt.md).
    revealBand: "/images/reveal/flight-band.jpg" as string | null,
  },
} as const;

export type Project = (typeof site.projects)[number];
export type Member = {
  name: string;
  role: string;
  department: string;
  captain: boolean;
  photo?: string | null;
};
export type OutreachItem = {
  slug: string;
  title: string;
  period: string;
  blurb: string;
  stat?: string;
  statLabel?: string;
  image?: string | null;
};
export type Department = (typeof site.team.departments)[number];
export type Achievement = (typeof site.achievements)[number];
export type Tier = (typeof site.sponsorship.tiers)[number];
export type Sponsor = (typeof site.sponsorship.sponsors)[number];
