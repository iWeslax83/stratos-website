export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;          // ISO date
  readTimeMin: number;
  category: "Build Log" | "Donanım" | "Yazılım" | "Saha" | "Takım";
  author: string;
  content: BlogBlock[];  // structured content blocks (no MDX dep)
}

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; lang?: string; code: string }
  | { type: "quote"; text: string }
  | { type: "metric"; items: { label: string; value: string }[] };

export const posts: BlogPost[] = [
  {
    slug: "teknofest-2026-donanim-tercihleri",
    title: "TEKNOFEST 2026 · Donanım Tercihlerimiz ve Neden Önemli",
    excerpt:
      "Otonom Döner Kanat İHA'mızdaki her parça bir mühendislik tercihinin sonucu. Pixhawk 6C'den karbon fiber gövdeye, bu seçimleri neden yaptığımızı anlatıyoruz.",
    date: "2026-02-14",
    readTimeMin: 7,
    category: "Donanım",
    author: "Emir Sakarya · Elektronik & Yazılım Kaptanı",
    content: [
      {
        type: "p",
        text: "TEKNOFEST Liseler Arası İHA Yarışması Döner Kanat kategorisi için tasarladığımız aracın temel iddiası: yüksek manevra kabiliyetini, otonom görev kararlılığıyla birleştirmek. Bu iddianın altında her bir komponent için açık gerekçelerle aldığımız mühendislik tercihleri var. Bu yazıda en kritik üçünü açıyoruz.",
      },
      {
        type: "h2",
        text: "Neden X-Quadrotor + 520 mm gövde?",
      },
      {
        type: "p",
        text: "X-tipi konfigürasyonda motor kolları gövdenin diyagonalinde, bu sayede Pi Kamera Modülü 3'ün geniş görüş açısını pervane gölgesi olmadan kullanmamızı sağlıyor. Geniş açılı tarama, otonom hedef tespitinin temel girdisi. 520 mm motor-to-motor mesafesi ise 10 inç pervaneye yeterli açıklığı verirken, sahaya çıkış için kompakt kalıyor.",
      },
      {
        type: "metric",
        items: [
          { label: "Toplam ağırlık", value: "2.4 kg" },
          { label: "Hover süresi", value: "19.76 dk" },
          { label: "Maks. hız", value: "59.4 km/h" },
          { label: "Hover throttle", value: "%45.9" },
        ],
      },
      {
        type: "h2",
        text: "Pixhawk 6C + Raspberry Pi 5 · Çift İşlemci Mimarisi",
      },
      {
        type: "p",
        text: "Tek bir SoC üzerinde hem PID uçuş kontrolünü hem ağır görüntü işlemeyi koşturmak, kararlılığı riske atar. Bu yüzden iki ayrı kart kullanıyoruz: Pixhawk 6C deterministik uçuş kontrolünü çift IMU yedekliliğiyle yapıyor; Raspberry Pi 5 (8 GB) OpenCV tabanlı hedef tespit pipeline'ını yürütüyor. İki kart FTDI USB-TTL üzerinden MAVLink protokolüyle haberleşiyor, kritik yol gecikmesi saniyenin altında.",
      },
      {
        type: "list",
        items: [
          "Pixhawk 6C: ArduPilot stack, sensor-fusion + motor PWM çıkışı",
          "Raspberry Pi 5: OpenCV görüntü işleme + karar mekanizması, DroneKit/PyMAVLink köprüsü",
          "Aktif soğutucu: Pi 5'in yoğun işleme altında throttling yapmasını engelliyor",
          "Holybro PM07 + Pololu D24V50F5 BEC: Pi 5'in 5V/5A çekme ihtiyacını izole şekilde karşılıyor",
        ],
      },
      {
        type: "quote",
        text: "Ucuz olanı değil, sahada çalışan en uygunu seçtik: düşük voltaj drop, tutarlı tepki süresi ve servis edilebilirlik öncelik.",
      },
      {
        type: "h2",
        text: "3K karbon fiber + ABS · neden iki malzeme?",
      },
      {
        type: "p",
        text: "Gövde plakaları için 3K karbon fiber kullanıyoruz: dayanım/ağırlık oranı alüminyumun çok üstünde, elektromanyetik yalıtım ve titreşim sönümleme açısından üstün. Yarışma sırasında değişme ihtimali yüksek olan parçalar (motor sabitleyici, kanat eklentisi, yük haznesi gibi) ise ABS filament ile 3D yazıcılarımızda basılıyor. Bu sayede saha onarım süresini 10 dakikanın altına indirebiliyoruz.",
      },
      {
        type: "h2",
        text: "Sonuç",
      },
      {
        type: "p",
        text: "Her komponent tek başına değerlendirilince makul görünebilir, ama hep birlikte sahada çalışmak zorunda. Bu yazıda gösterdiğimiz tercihlerin hepsi, iki ana hedefe hizmet ediyor: (1) otonom hedef tespiti pipeline'ının kesintisiz çalışması, (2) yarışma sahasında 10 dakika içinde onarılabilir olmak. Bir sonraki yazıda yazılım tarafını, özellikle SITL simülasyondan saha geçişi sürecini, yazacağız.",
      },
    ],
  },
];
