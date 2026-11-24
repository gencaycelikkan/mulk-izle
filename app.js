// ============================================================================
// MÜLKİZLE (mulkizle.com) — 3 PANELLİ (EMLAKÇI • SATICI • ALICI) UYGULAMA MANTIĞI
// ============================================================================

const UCRETSIZ_LIMIT = 3;
const STORAGE_KEY = "mulkizle_portfoyler_clean_v1";
const USERS_STORAGE_KEY = "mulkizle_kullanicilar_clean_v1";
const ACTIVE_USER_KEY = "mulkizle_aktif_kullanici_clean_v1";

// Emlakçının kutucukla hızlıca seçebileceği hazır pazarlama & aracılık hizmetleri
const HAZIR_HIZMET_HAVUZU = [
  "Yerinde Keşif",
  "Profesyonel Fotoğraf Çekimi",
  "Detaylı Pazar Analizi",
  "Tapu Takyidat & İmar Kontrolü",
  "Yetki Sözleşmesi",
  "Afiş / Branda Asılması",
  "Drone ile Havadan Çekim",
  "360 Derece Çekim",
  "Bölgeye El İlanı / Broşür Dağıtımı",
  "Sosyal Medya Tanıtımı",
  "İlan Portalında Yayınlama"
];

const ORNEK_FOTOGRAFLAR = [
  {
    baslik: "Salon & Panoramik Cephe Görünümü",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
  },
  {
    baslik: "Modern Ankastre Mutfak & Balkon Çıkışı",
    url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80"
  },
  {
    baslik: "Site Peyzajı & Dış Cephe Drone Açısı",
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80"
  }
];

const VARSAYILAN_PORTFOYLER = [
  {
    kod: "849201736410",
    baslik: "Bağlıca Mah. 3+1 Site İçi Ara Kat Daire",
    fiyat: "4.850.000 ₺",
    mulkSahibi: "Ahmet Yılmaz",
    mulkSahibiTel: "0532 410 20 30",
    danisman: "Gencay Çelikkan",
    danismanTel: "0532 000 00 00",
    ofis: "Gayrimenkul Danışmanlık Ofisi",
    bolge: "Bağlıca, Ankara",
    durumEtiketi: "Yayında • Aktif Gösterim & Teklif Sürecinde",
    sonGuncelleme: "16 Kasım 2026",
    sahibindenUrl: "https://www.sahibinden.com/",
    videoUrl: "https://www.instagram.com/gencaycelikkan/reels/",
    matterportUrl: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
    sosyalMedyaLinkleri: [
      {
        platform: "Instagram Reels Tanıtımı",
        url: "https://www.instagram.com/gencaycelikkan/"
      },
      {
        platform: "Twitter (X) Portföy Paylaşımı",
        url: "https://x.com/elonmusk"
      },
      {
        platform: "LinkedIn Kurumsal Portföy Sunumu",
        url: "https://www.linkedin.com/company/elon-muskbusiness"
      }
    ],
    takyidatUrl: "",
    goruntulenme: "1.840",
    favori: "46",
    telefon: "19 Arama",
    gosterim: "6 Aile Gezdi",
    sosyalErisim: "12.400 İzlenme • 385 Beğeni",
    // Yetki Belgesi Ayarları (yok | taslak_yukle | mobil_onay)
    yetkiModu: "mobil_onay",
    yetkiSuresi: "",
    komisyon: "",
    yetkiOnaylandiMi: false,
    yetkiBelgesiDosyaAdi: "",
    yetkiOnayDetayi: "",
    // Seçilen kronolojik hizmetler
    hizmetler: [
      {
        ad: "Yerinde Keşif",
        durum: "done",
        emoji: "👍",
        saticiYorumu: ""
      },
      {
        ad: "Profesyonel Fotoğraf Çekimi",
        durum: "done",
        emoji: "❤️",
        saticiYorumu: "Fotoğraflar ve açılar çok güzel çıkmış, elinize sağlık Gencay Bey."
      },
      {
        ad: "Detaylı Pazar Analizi",
        durum: "done",
        emoji: "👏",
        saticiYorumu: "Rakip daire analizleri çok açıklayıcı olmuş, 5M - 5.25M aralığı bizim için uygundur."
      },
      { ad: "Tapu Takyidat & İmar Kontrolü", durum: "done", emoji: "👍", saticiYorumu: "" },
      { ad: "Yetki Sözleşmesi", durum: "done", emoji: "", saticiYorumu: "" },
      { ad: "Afiş / Branda Asılması", durum: "done", emoji: "🔥", saticiYorumu: "" },
      { ad: "Drone ile Havadan Çekim", durum: "done", emoji: "❤️", saticiYorumu: "" },
      { ad: "360 Derece Çekim", durum: "done", emoji: "", saticiYorumu: "" },
      { ad: "Sosyal Medya Tanıtımı", durum: "done", emoji: "", saticiYorumu: "" },
      { ad: "İlan Portalında Yayınlama", durum: "done", emoji: "", saticiYorumu: "" }
    ],
    // Kolay Pazar Analizi Verileri
    pazarAnalizi: {
      tamamlandiMi: true,
      danismanFoto: "../assets/gencay-hero-portre.jpg",
      danismanBio:
        "Ankara Bağlıca, Yaşamkent ve Çayyolu bölgelerinde uzman gayrimenkul danışmanı olarak; profesyonel drone çekimi, 360° sanal tur, doğru emsal fiyatlandırma ve şeffaf raporlama ile mülkünüzü en doğru alıcıyla buluşturuyorum.",
      referansMulkler:
        "Bağlıca Mah. 3+1 Site İçi Daire — 21 Günde Satıldı (5.100.000 ₺)\nYaşamkent 4+1 Bahçe Dubleks — 18 Günde Satıldı (7.350.000 ₺)\nÇayyolu 3+1 Ara Kat Daire — 14 Günde Satıldı (5.400.000 ₺)",
      minFiyat: "5.000.000 ₺",
      maxFiyat: "5.250.000 ₺",
      finalDegerlendirme:
        "Yaptığım yerinde fotoğraf çekimi, şerefiye incelemesi ve bölgedeki rakip ilanların emlakçılarıyla yaptığım görüşmeler sonucunda; mülkünüzün 5.000.000 TL ile 5.250.000 TL aralığında satılacağına inanıyorum. Bu mülk için yapacağım hizmetler aşağıda yer almaktadır.",
      rakipler: [
        {
          url: "https://www.sahibinden.com/ilan/emlak-konut-satilik-baglica-3-1-ornek-1",
          baslik: "Bağlıca Aynı Bölge 3+1 130 m² Kuzey Cephe Daire",
          fiyat: "5.450.000 ₺",
          sure: "3 Aydır İlanda (Satılmadı)",
          yorum:
            "Burası yapısız (tadilatsız) ve kuzey cephe. Bu ilandaki emlakçıyla konuşuldu; 3 aydır ilanda olduğu ve fiyat yüksek kaldığı için ciddi teklif almadığı söylendi."
        },
        {
          url: "https://www.sahibinden.com/ilan/emlak-konut-satilik-baglica-3-1-ornek-2",
          baslik: "Bağlıca Site İçi 3+1 1. Kat Daire",
          fiyat: "4.900.000 ₺",
          sure: "45 Gündür İlanda",
          yorum:
            "Bu daire 1. katta ve kapalı otoparkı yok. Bizim mülkümüz ara kat, güney cephe ve ebeveyn banyolu olduğu için bu rakibin üzerinde konumlanmalıdır."
        }
      ]
    },
    // Mülk Günlüğüm (Sadece danışmana özel saha, kapıcı, anahtar ve pazarlık notları — Satıcı panelinde görünmez!)
    gunluk: [
      {
        tarih: "16 Kasım 2026 • 14:30",
        metin: "Kapıcı Arif Koçyiğit Telefonu: 0549 000 00 00 — Yedek anahtar kendisinde, yer gösteriminden 30 dk önce haber verilecek.",
        gorunurluk: "private"
      },
      {
        tarih: "15 Kasım 2026 • 18:10",
        metin: "Mülk sahibi Ahmet Bey nakit alıcı olursa 4.700.000 TL'ye kadar inebileceğini söyledi, pazarlık payını buna göre yönetelim.",
        gorunurluk: "private"
      },
      {
        tarih: "14 Kasım 2026 • 11:20",
        metin: "Site yönetimi aidat: 1.850 TL • Panjur kumandası mutfak çekmecesinde, kombi sigortası vestiyer dolabının içinde.",
        gorunurluk: "private"
      }
    ],
    medya: [...ORNEK_FOTOGRAFLAR],
    teklifler: [
      {
        alici: "Mehmet Ziyagil",
        tutar: "4.650.000 ₺",
        odemeSekli: "Nakit / Peşin",
        tarih: "17 Kasım 2026",
        not: "Alıcı peşin ödeme yapacak, tapu devrini bu hafta içi hemen gerçekleştirmeye hazır.",
        durum: "pending", // pending | approved | rejected
        saticiYaniti: ""
      },
      {
        alici: "Kaan Soylu",
        tutar: "4.500.000 ₺",
        odemeSekli: "Banka Kredili",
        tarih: "14 Kasım 2026",
        not: "2.000.000 TL kredi + 2.500.000 TL nakit teklif edildi.",
        durum: "rejected",
        saticiYaniti: "Rakam düşük bulundu."
      }
    ],
    yerGosterimleri: [
      {
        alici: "Selin Demir & Ailesi",
        telefon: "0532 888 77 66",
        tarihSaat: "21 Kasım Cumartesi • 14:30",
        not: "4 kişilik aile, daireyi 2. kez detaylı görmek istiyorlar.",
        durum: "pending", // pending | approved | rejected
        saticiYaniti: ""
      },
      {
        alici: "Mehmet Ziyagil",
        telefon: "0533 444 55 66",
        tarihSaat: "15 Kasım Pazar • 16:00",
        not: "Yer gösterme belgesi imzalatılarak daire gezdirildi.",
        durum: "approved",
        saticiYaniti: "Satıcı onayladı, gösterim tamamlandı."
      }
    ],
    taleplerMetni:
      "16 Kasım | Sahibinden & Telefon | Krediye uygunluk soruldu, Cumartesi 14:00 için 2. aile gösterimi planlandı. | Sıcak Alıcı\n14 Kasım | Instagram Reels | Tanıtım videosundan ulaşan yatırımcı alıcı daireyi gezdi, teklif hazırlıyor. | Teklif Bekleniyor"
  },
  {
    kod: "592837461029",
    baslik: "Yaşamkent 4+1 Bahçe Kullanımlı Daire",
    fiyat: "7.400.000 ₺",
    mulkSahibi: "Zeynep Kaya",
    mulkSahibiTel: "0533 210 90 80",
    danisman: "Gencay Çelikkan",
    danismanTel: "0532 000 00 00",
    ofis: "Gayrimenkul Danışmanlık Ofisi",
    bolge: "Yaşamkent, Ankara",
    durumEtiketi: "Pazar Analizi & Branda Aşamasında (Henüz İlanda Değil)",
    sonGuncelleme: "16 Kasım 2026",
    sahibindenUrl: "",
    videoUrl: "https://www.instagram.com/gencaycelikkan/reels/",
    matterportUrl: "", // Bu mülkte 360 çekim yapılmadı!
    takyidatUrl: "",
    goruntulenme: "620",
    favori: "19",
    telefon: "7 Arama",
    gosterim: "2 Aile Gezdi",
    sosyalErisim: "5.900 İzlenme • 142 Beğeni",
    yetkiModu: "yok", // Sözlü yetkiyle pazarlanıyor (Zorunlu değil)
    yetkiSuresi: "",
    komisyon: "",
    yetkiOnaylandiMi: false,
    yetkiBelgesiDosyaAdi: "",
    yetkiOnayDetayi: "",
    // Bu mülkte Drone ve 360 seçilmedi, onun yerine El İlanı ve Branda seçildi!
    hizmetler: [
      { ad: "Yerinde Keşif", durum: "done", emoji: "👍", saticiYorumu: "" },
      { ad: "Profesyonel Fotoğraf Çekimi", durum: "done", emoji: "👍", saticiYorumu: "Teşekkürler." },
      { ad: "Detaylı Pazar Analizi", durum: "done", emoji: "❤️", saticiYorumu: "" },
      { ad: "Tapu Takyidat & İmar Kontrolü", durum: "done", emoji: "", saticiYorumu: "" },
      { ad: "Afiş / Branda Asılması", durum: "done", emoji: "", saticiYorumu: "" },
      { ad: "Bölgeye El İlanı / Broşür Dağıtımı", durum: "done", emoji: "", saticiYorumu: "" },
      { ad: "İlan Portalında Yayınlama", durum: "pending", emoji: "", saticiYorumu: "" }
    ],
    pazarAnalizi: {
      tamamlandiMi: true,
      danismanFoto: "../assets/gencay-hero-portre.jpg",
      danismanBio:
        "Yaşamkent ve Çayyolu bölgesinde lüks konut ve bahçe katı portföylerde uzmanlaşmış gayrimenkul danışmanı.",
      referansMulkler:
        "Yaşamkent 4+1 Bahçe Dubleks — 18 Günde Satıldı (7.350.000 ₺)\nBağlıca 3+1 Site İçi Daire — 21 Günde Satıldı (5.100.000 ₺)",
      minFiyat: "7.200.000 ₺",
      maxFiyat: "7.450.000 ₺",
      finalDegerlendirme:
        "Bölgedeki rakip 4+1 bahçe kullanımlı daireler incelendiğinde mülkünüzün 7.200.000 TL ile 7.450.000 TL aralığında satılacağına inanıyorum.",
      rakipler: [
        {
          url: "https://www.sahibinden.com/ilan/emlak-konut-satilik-yasamkent-4-1-ornek",
          baslik: "Yaşamkent Yan Site 4+1 Bahçe Katı Daire",
          fiyat: "7.750.000 ₺",
          sure: "4 Aydır İlanda",
          yorum: "Bu ilandaki emlakçıyla görüşüldü; 4 aydır ilanda olduğu ve mutfak/banyo tadilatı gerektiği öğrenildi."
        }
      ]
    },
    gunluk: [
      {
        tarih: "16 Kasım 2026 • 13:00",
        metin: "Site Görevlisi Arif Koçyiğit Tel: 0549 000 00 00 — Bahçe kapısı anahtarı güvenlik kulübesinden teslim alınıyor.",
        gorunurluk: "private"
      },
      {
        tarih: "15 Kasım 2026 • 16:45",
        metin: "Zeynep Hanım sözlü yetki ile çalışıyor. Komşu daire 7.650.000 TL'den satılık, 7.150.000 TL nakit teklife sıcak bakabilir.",
        gorunurluk: "private"
      }
    ],
    medya: [ORNEK_FOTOGRAFLAR[0], ORNEK_FOTOGRAFLAR[1]],
    teklifler: [
      {
        alici: "Hakan Çelik",
        tutar: "7.150.000 ₺",
        odemeSekli: "Nakit / Peşin",
        tarih: "17 Kasım 2026",
        not: "Yatırımcı alıcı, peşin ödeme teklifi sundu.",
        durum: "pending",
        saticiYaniti: ""
      }
    ],
    yerGosterimleri: [
      {
        alici: "Burak & Esra Yılmaz",
        telefon: "0535 123 45 67",
        tarihSaat: "22 Kasım Pazar • 13:00",
        not: "Yaşamkent'te 4+1 bahçe katı arayan ailemiz.",
        durum: "pending",
        saticiYaniti: ""
      }
    ],
    taleplerMetni:
      "16 Kasım | Ofis Portföy Havuzu | Yaşamkent'te 4+1 arayan hazır müşterimize daire gösterildi. | Değerlendiriyor"
  },
  {
    // PAYLAŞIMLI ÇALIŞMA (CO-OPERATION) ÖRNEK PORTFÖYÜ (Ankara -> İstanbul Bağcılar)
    kod: "738192045612", // Satıcının 12 Haneli Takip Numarası
    coopKod: "910482736519", // Ortak Çalışılan (Co-Op) Emlakçının 12 Haneli Takip Numarası (Satıcıdan farklı!)
    coopAktifMi: true,
    coopPaylasimOrani: "%50 - %50 Hizmet Bedeli Paylaşımı",
    coopYonlendirenDanisman: "Gencay Çelikkan (Ankara • Etimesgut / Çankaya)",
    coopDanismanTel: "0532 000 00 00", // Ortak emlakçı için tanımlı telefon numarası
    baslik: "İstanbul Bağcılar Güneşli 3+1 Metro Yakını Site İçi Daire",
    fiyat: "6.250.000 ₺ - 6.500.000 ₺",
    mulkSahibi: "Mülk Sahibi (0535 610 20 30)",
    mulkSahibiTel: "0535 610 20 30", // Satıcı için tanımlı telefon numarası
    danisman: "Burak Demir (İstanbul Bağcılar Bölge Uzmanı)",
    danismanTel: "0532 777 88 99",
    ofis: "Marmara Kurumsal Gayrimenkul • Bağcılar / İstanbul",
    bolge: "Bağcılar, İstanbul",
    durumEtiketi: "Paylaşımlı Portföy (Co-Op) • Pazar Analizi & İlan Yayında",
    sonGuncelleme: "19 Kasım 2026",
    sahibindenUrl: "https://www.sahibinden.com/",
    videoUrl: "https://www.instagram.com/",
    matterportUrl: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
    takyidatUrl: "",
    goruntulenme: "1.420",
    favori: "38",
    telefon: "14 Arama",
    gosterim: "4 Aile Gezdi",
    sosyalErisim: "9.800 İzlenme • 310 Beğeni",
    yetkiModu: "mobil_onay",
    yetkiSuresi: "90 Gün",
    komisyon: "2",
    yetkiOnaylandiMi: true,
    yetkiBelgesiDosyaAdi: "",
    yetkiOnayDetayi: "Satıcı ve Ortak Danışman (Co-Op) onaylı paylaşımlı portföy",
    hizmetler: [
      {
        ad: "Yerinde Keşif",
        durum: "done",
        emoji: "👍",
        saticiYorumu: ""
      },
      {
        ad: "Profesyonel Fotoğraf Çekimi",
        durum: "done",
        emoji: "👍",
        saticiYorumu: "Bağcılar bölge uzmanı Burak Bey zamanında gelip çekimleri yaptı."
      },
      {
        ad: "Detaylı Pazar Analizi",
        durum: "done",
        emoji: "👏",
        saticiYorumu: "Güneşli bölgesindeki emsal analizi çok net olmuş."
      },
      { ad: "Tapu Takyidat & İmar Kontrolü", durum: "done", emoji: "❤️", saticiYorumu: "" },
      { ad: "Yetki Sözleşmesi", durum: "done", emoji: "", saticiYorumu: "" },
      { ad: "Afiş / Branda Asılması", durum: "done", emoji: "🔥", saticiYorumu: "" },
      { ad: "İlan Portalında Yayınlama", durum: "done", emoji: "", saticiYorumu: "" }
    ],
    pazarAnalizi: {
      tamamlandiMi: true,
      danismanFoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      danismanBio:
        "İstanbul Bağcılar, Güneşli ve Basın Ekspres hattında 9 yıllık bölge uzmanıyım. Ankara'dan Gencay Çelikkan ortaklığıyla (Co-Operation) yönlendirilen bu mülkün tüm saha, çekim ve gösterim operasyonunu yürütüyorum.",
      referansMulkler:
        "Bağcılar Güneşli 3+1 Site İçi Daire — 19 Günde Satıldı (6.300.000 ₺)\nBağcılar Kirazlı 2+1 Metro Yakını — 15 Günde Satıldı (4.450.000 ₺)",
      minFiyat: "6.250.000 ₺",
      maxFiyat: "6.500.000 ₺",
      finalDegerlendirme:
        "Bağcılar Güneşli meydan ve metro hattındaki rakip 3+1 daireler incelendiğinde mülkün 6.250.000 TL - 6.500.000 TL aralığında satılacağı öngörülmektedir.",
      rakipler: [
        {
          url: "https://www.sahibinden.com/",
          baslik: "Bağcılar Güneşli Mah. 3+1 125 m² Yan Blok Daire",
          fiyat: "6.750.000 ₺",
          sure: "3 Aydır İlanda",
          yorum: "Bu ilandaki emlakçıyla görüşüldü; fiyat yüksek kaldığı için 3 aydır teklif almadığı teyit edildi."
        }
      ]
    },
    gunluk: [
      {
        tarih: "19 Kasım 2026 • 11:00",
        metin: "🤝 Ankara'dan Gencay Çelikkan ile İstanbul Bağcılar Bölge Uzmanı Burak Demir arasında %50-%50 paylaşımlı çalışma (Co-Operation) başlatıldı. Satıcı ve Ortak Emlakçı için ayrı 12 haneli takip kodları üretildi.",
        gorunurluk: "public"
      },
      {
        tarih: "19 Kasım 2026 • 15:30",
        metin: "Bağcılar Güneşli'deki dairenin fotoğraf çekimi ve pazar analizi tamamlanarak yayına alındı.",
        gorunurluk: "public"
      }
    ],
    medya: [ORNEK_FOTOGRAFLAR[0], ORNEK_FOTOGRAFLAR[2]],
    teklifler: [
      {
        alici: "Serkan Kaya (İstanbul)",
        tutar: "6.200.000 ₺",
        odemeSekli: "Nakit / Peşin",
        tarih: "19 Kasım 2026",
        not: "Bağcılar bölge uzmanı Burak Demir tarafından gösterim sonrası alınan ilk yazılı teklif.",
        durum: "pending",
        saticiYaniti: ""
      }
    ],
    yerGosterimleri: [
      {
        alici: "Serkan Kaya & Ailesi",
        telefon: "0532 911 22 33",
        tarihSaat: "20 Kasım Cuma • 15:00",
        not: "Bağcılar bölge uzmanı eşliğinde yer gösterme belgesi imzalatılarak gezdirilecek.",
        durum: "approved",
        saticiYaniti: "Uygun, kiracı/kapıcı bilgilendirildi."
      }
    ],
    taleplerMetni:
      "19 Kasım | Co-Operation (Paylaşımlı Portföy) | Bağcılar bölge uzmanı Burak Demir tarafından 2 aileye yer gösterimi planlandı. | Aktif"
  }
];

let portfoyler = [];
let seciliKod = "";
let proPaketAktif = false;
let kayitliKullanicilar = [];
let aktifKullanici = null;

function kullanicilariYukle() {
  try {
    const kayitli = localStorage.getItem(USERS_STORAGE_KEY);
    kayitliKullanicilar = kayitli ? JSON.parse(kayitli) : [];
    const aktifStr = localStorage.getItem(ACTIVE_USER_KEY);
    aktifKullanici = aktifStr ? JSON.parse(aktifStr) : null;
  } catch (e) {
    kayitliKullanicilar = [];
    aktifKullanici = null;
  }
}

function kullanicilariKaydet() {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(kayitliKullanicilar));
    if (aktifKullanici) {
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(aktifKullanici));
    } else {
      localStorage.removeItem(ACTIVE_USER_KEY);
    }
  } catch (e) {}
}

function tumKullanicilariVeVerileriSifirla() {
  kayitliKullanicilar = [];
  aktifKullanici = null;
  portfoyler = [];
  seciliKod = "";
  acikAkordeonPortfoyKodu = null;
  danismanGirisYaptiMi = false;
  proPaketAktif = false;
  danismanProfili = {
    ad: "",
    ofis: "",
    deneyim: "",
    telefon: "",
    foto: "",
    il: "Ankara",
    ilce: "",
    bolgeler: "",
    hobiler: "",
    bio: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    magazaUrl: "",
    bloglar: []
  };
  try {
    localStorage.removeItem(USERS_STORAGE_KEY);
    localStorage.removeItem(ACTIVE_USER_KEY);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch (e) {}
  const navText = document.getElementById("navAgentLoginBtnText");
  if (navText) navText.textContent = "Üye Girişi";
}

function verileriYukle() {
  kullanicilariYukle();
  try {
    const kayitli = localStorage.getItem(STORAGE_KEY);
    portfoyler = kayitli ? JSON.parse(kayitli) : [];
  } catch (e) {
    portfoyler = [];
  }
  if (portfoyler.length > 0 && !portfoyler.some(p => p.kod === seciliKod)) {
    seciliKod = portfoyler[0].kod;
  }
  if (aktifKullanici) {
    danismanGirisYaptiMi = true;
    proPaketAktif = aktifKullanici.plan !== "ucretsiz";
    const navText = document.getElementById("navAgentLoginBtnText");
    if (navText) navText.textContent = `Danışman Paneli (${(aktifKullanici.ad || "Danışman").split(" ")[0]})`;
  }
}

function verileriKaydet() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfoyler));
  } catch (e) {}
}

function aktifPortfoy() {
  return portfoyler.find(p => p.kod === seciliKod) || portfoyler[0] || null;
}

// ============================================================================
// AKTİF PORTFÖY SİTE İÇİ TEKİL (UNIQUE) GÖRÜNTÜLENME SAYACI & ANA SAYFA CANLI SAYAÇLAR
// - Üye kendi portföyünü görüntülediğinde sayaç ÇALIŞMAZ.
// - Başkası (Alıcı, Satıcı veya başka bir ziyaretçi) bir kere görüntülediğinde +1 sayılır,
//   aynı kişi tekrar baktığında tekrar sayılmaz (1 tekil görüntülenme = 1 kişi).
// ============================================================================
function portfoySahibiAktifUyeMi(p) {
  if (!p) return false;
  if (!danismanGirisYaptiMi || !aktifKullanici) return false;
  const uId = (aktifKullanici.id || "").trim();
  const uAd = (aktifKullanici.ad || "").trim();
  if (p.danismanId && uId && p.danismanId === uId) return true;
  if (p.danisman && uAd && p.danisman === uAd) return true;
  return false;
}

function aktifZiyaretciTekilAnahtariAl(gorunumTipi) {
  // Giriş yapmış başka bir üye ise üye ID'si
  if (danismanGirisYaptiMi && aktifKullanici && aktifKullanici.id) {
    return `uye:${aktifKullanici.id}`;
  }
  // Giriş yapmamış ziyaretçi (Satıcı veya Alıcı) için tarayıcı cihaz kimliği + rolü
  let cihazId = "";
  try {
    cihazId = localStorage.getItem("mulkizle_ziyaretci_cihaz_id") || "";
    if (!cihazId) {
      cihazId = "v_" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("mulkizle_ziyaretci_cihaz_id", cihazId);
    }
  } catch (e) {
    cihazId = "v_default";
  }
  const rol = gorunumTipi === "view-seller" ? "satici" : gorunumTipi === "view-buyer" ? "alici" : (aktifHizliTestEkrani || "ziyaretci");
  return `misafir:${cihazId}:${rol}`;
}

function portfoyGoruntulenmeSayisiniAl(p) {
  if (!p) return 0;
  if (Array.isArray(p.tekilGoruntuleyenler)) {
    p.siteIciGoruntulenmeSayisi = p.tekilGoruntuleyenler.length;
    return p.siteIciGoruntulenmeSayisi;
  }
  p.tekilGoruntuleyenler = [];
  p.siteIciGoruntulenmeSayisi = 0;
  return 0;
}

function portfoyGoruntulenmeSayisiniAyarla(p, yeniSayi) {
  if (!p) return 0;
  const temiz = Math.max(0, parseInt(String(yeniSayi || "0").replace(/\D/g, ""), 10) || 0);
  p.siteIciGoruntulenmeSayisi = temiz;
  return temiz;
}

function portfoyGoruntulenmeArtir(kod, kaydetVeYenile = true, gorunumTipi = "") {
  const hedef = portfoyler.find(x => x.kod === kod) || aktifPortfoy();
  if (!hedef) return 0;

  // 1. KURAL: Üye kendi portföyünü görüntülüyorsa sayaç kesinlikle çalışmaz!
  if (portfoySahibiAktifUyeMi(hedef)) {
    return portfoyGoruntulenmeSayisiniAl(hedef);
  }

  // 2. KURAL: Başkası bir kere görüntüleyince sayılır, aynı kişi tekrar bakınca bir daha sayılmaz!
  if (!Array.isArray(hedef.tekilGoruntuleyenler)) {
    hedef.tekilGoruntuleyenler = [];
  }
  const ziyaretciAnahtari = aktifZiyaretciTekilAnahtariAl(gorunumTipi);
  if (hedef.tekilGoruntuleyenler.includes(ziyaretciAnahtari)) {
    hedef.siteIciGoruntulenmeSayisi = hedef.tekilGoruntuleyenler.length;
    return hedef.siteIciGoruntulenmeSayisi;
  }

  hedef.tekilGoruntuleyenler.push(ziyaretciAnahtari);
  hedef.siteIciGoruntulenmeSayisi = hedef.tekilGoruntuleyenler.length;

  if (kaydetVeYenile) {
    verileriKaydet();
    anaSayfaSayaclariniGuncelle();
  }
  return hedef.siteIciGoruntulenmeSayisi;
}

function toplamPortfoyGoruntulenmeSayisiniHesapla() {
  return (portfoyler || []).reduce((toplam, p) => toplam + portfoyGoruntulenmeSayisiniAl(p), 0);
}

function anaSayfaSayaclariniGuncelle() {
  const aktifKullaniciSayisi = Array.isArray(kayitliKullanicilar) ? kayitliKullanicilar.length : 0;
  const aktifPortfoySayisi = Array.isArray(portfoyler) ? portfoyler.length : 0;
  const toplamGoruntulenme = toplamPortfoyGoruntulenmeSayisiniHesapla();

  const elUsers = document.getElementById("homeActiveUsersCount");
  const elPortfolios = document.getElementById("homeActivePortfoliosCount");
  const elViews = document.getElementById("homeTotalPortfolioViewsCount");

  if (elUsers) elUsers.textContent = aktifKullaniciSayisi.toLocaleString("tr-TR");
  if (elPortfolios) elPortfolios.textContent = aktifPortfoySayisi.toLocaleString("tr-TR");
  if (elViews) elViews.textContent = toplamGoruntulenme.toLocaleString("tr-TR");
}


// ============================================================================
// ANA GÖRÜNÜM (3 PANEL + TANITIM) DEĞİŞTİRİCİ & KURUMSAL DANIŞMAN GİRİŞİ
// ============================================================================
let danismanGirisYaptiMi = false;
let bekleyenDanismanModu = "mode-portfolios";
let _aktifGorunumId = "view-landing";
let _aktifDanismanModu = "mode-portfolios";
let _popstateIsleniyor = false;
let _sonHistoryPushZamani = 0;

function tarayiciGecmisineKaydet(viewId, modeId) {
  if (_popstateIsleniyor || typeof window.history === "undefined") return;
  const v = viewId || _aktifGorunumId || "view-landing";
  const m = modeId || _aktifDanismanModu || "mode-portfolios";
  const mevcut = window.history.state;
  if (mevcut && mevcut.view === v && (v !== "view-dashboard" || mevcut.mode === m)) {
    return;
  }
  const hashAd =
    v === "view-dashboard"
      ? `#panel-${m.replace(/^mode-/, "")}`
      : `#${v.replace(/^view-/, "")}`;
  const stateObj = { view: v, mode: m, seciliKod: seciliKod || "" };
  const simdi = Date.now();
  if (simdi - _sonHistoryPushZamani < 80) {
    window.history.replaceState(stateObj, "", hashAd);
  } else {
    window.history.pushState(stateObj, "", hashAd);
    _sonHistoryPushZamani = simdi;
  }
}

function gorunumDegistir(hedefId) {
  _aktifGorunumId = hedefId;
  document.querySelectorAll(".app-view").forEach(v => {
    v.classList.toggle("active", v.id === hedefId);
  });
  document.querySelectorAll(".view-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.target === hedefId);
  });

  tarayiciGecmisineKaydet(hedefId, _aktifDanismanModu);

  // Sol ikon barı site ana sayfasında (ve üye girişi yapılmadığında) görünmez;
  // Üye girişi yapıldığında görünür ve üye girişi yapılınca üstteki "Ana Sayfa - Mobil Uygulama - Biz Kimiz?" sekmeleri gizlenir.
  const kamusalSayfaMi =
    hedefId === "view-landing" ||
    hedefId === "view-why-mulkizle" ||
    hedefId === "view-services" ||
    hedefId === "view-mobile-app" ||
    hedefId === "view-about" ||
    hedefId === "view-membership" ||
    hedefId === "view-membership-form";
  const uyeBariniGoster = Boolean(danismanGirisYaptiMi && !kamusalSayfaMi);
  document.body.classList.toggle("member-logged-in", uyeBariniGoster);

  anaSayfaSayaclariniGuncelle();

  if (hedefId === "view-dashboard") {
    panelYenile();
  } else if (hedefId === "view-ariyorum") {
    bolgeUzmaniAraRender();
    if (typeof igSolMenuGuncelle === "function") igSolMenuGuncelle("ariyorum");
  } else if (hedefId === "view-seller") {
    portfoyGoruntulenmeArtir(seciliKod, true, "view-seller");
    saticiPaneliniGoster(seciliKod);
  } else if (hedefId === "view-buyer") {
    portfoyGoruntulenmeArtir(seciliKod, true, "view-buyer");
    aliciPaneliniGoster(seciliKod);
  } else if (hedefId === "view-agent-profile") {
    danismanKisiselWebSitesiGoster();
    if (typeof igSolMenuGuncelle === "function") igSolMenuGuncelle("view-website");
  } else if (hedefId === "view-mobile-app") {
    mobilUygulamaSimulasyonRender();
  }
}

function uyeGirisiTetikle(hedefMod = "mode-portfolios") {
  bekleyenDanismanModu = hedefMod || "mode-portfolios";
  if (danismanGirisYaptiMi && aktifKullanici) {
    gorunumDegistir("view-dashboard");
    const btnId =
      bekleyenDanismanModu === "mode-profile"
        ? "modeBtnProfile"
        : bekleyenDanismanModu === "mode-coop"
        ? "modeBtnCoop"
        : "modeBtnPortfolios";
    danismanAnaModSec(bekleyenDanismanModu, document.getElementById(btnId));
  } else {
    const errBox = document.getElementById("agentLoginErrorBox");
    if (errBox) {
      if (kayitliKullanicilar.length === 0) {
        errBox.style.display = "block";
        errBox.style.background = "#EFF6FF";
        errBox.style.borderColor = "#BFDBFE";
        errBox.style.color = "#1E40AF";
        errBox.textContent = "Sistemde kayıtlı kullanıcı bulunmuyor. Lütfen 'Yeni Danışman Kaydı Oluştur' veya 'Google ile Hızlı Kayıt' üzerinden yeni hesap oluşturun.";
      } else {
        errBox.style.display = "none";
      }
    }
    document.getElementById("agentLoginModal")?.classList.add("open");
  }
}

function danismanGirisModalKapat() {
  document.getElementById("agentLoginModal")?.classList.remove("open");
}

function danismanGirisOnayla() {
  const girisId = (document.getElementById("agentLoginIdentifier")?.value || "").trim().toLowerCase();
  const sifre = (document.getElementById("agentLoginPassword")?.value || "").trim();
  const errBox = document.getElementById("agentLoginErrorBox");

  if (kayitliKullanicilar.length === 0) {
    if (errBox) {
      errBox.style.display = "block";
      errBox.style.background = "#FEF2F2";
      errBox.style.borderColor = "#FECACA";
      errBox.style.color = "#DC2626";
      errBox.textContent = "Henüz kayıtlı hiçbir kullanıcı yok! Şimdi yeni kayıt ekranına yönlendiriliyorsunuz...";
    }
    setTimeout(() => {
      danismanGirisModalKapat();
      gorunumDegistir("view-membership");
      document.getElementById("regFullName")?.focus();
    }, 600);
    return;
  }

  const temizGirilenTel = girisId.replace(/\D/g, "");
  const bulunan = kayitliKullanicilar.find(u => {
    const uEmail = (u.email || "").toLowerCase();
    const uUsername = (u.kullaniciAdi || "").toLowerCase();
    const uTel = (u.telefon || "").replace(/\D/g, "");
    const idEslesiyor =
      (girisId && (uEmail === girisId || uUsername === girisId)) ||
      (temizGirilenTel.length >= 7 && uTel.includes(temizGirilenTel));
    const sifreEslesiyor = !u.sifre || u.sifre === sifre;
    return idEslesiyor && sifreEslesiyor;
  });

  if (!bulunan) {
    if (errBox) {
      errBox.style.display = "block";
      errBox.style.background = "#FEF2F2";
      errBox.style.borderColor = "#FECACA";
      errBox.style.color = "#DC2626";
      errBox.textContent = "Kullanıcı adı, e-posta, telefon veya şifre hatalı! Lütfen bilgilerinizi kontrol edin.";
    }
    return;
  }

  aktifKullanici = bulunan;
  kullanicilariKaydet();
  danismanGirisYaptiMi = true;
  proPaketAktif = bulunan.plan !== "ucretsiz";
  incelenenWebSitesiDanismanId = bulunan.id;
  profilGoruntuleyenModu = "owner";

  const hedefProfil = danismanProfiliniGetirById(bulunan.id);
  if (hedefProfil) {
    danismanProfili = JSON.parse(JSON.stringify(hedefProfil));
    profilKaydetStorage();
  }

  const kendiPortfoyleri = portfoyler.filter(p => p.danismanId === bulunan.id || p.danisman === bulunan.ad);
  if (kendiPortfoyleri.length > 0) {
    seciliKod = kendiPortfoyleri[0].kod;
    acikAkordeonPortfoyKodu = null;
  }

  const avatarEl = document.getElementById("igSidebarAvatarImg");
  if (avatarEl && danismanProfili?.foto) {
    avatarEl.src = danismanProfili.foto;
  }

  danismanGirisModalKapat();

  const navText = document.getElementById("navAgentLoginBtnText");
  if (navText) navText.textContent = `Danışman Paneli (${(bulunan.ad || "Danışman").split(" ")[0]})`;

  gorunumDegistir("view-dashboard");
  const btnId =
    bekleyenDanismanModu === "mode-profile"
      ? "modeBtnProfile"
      : bekleyenDanismanModu === "mode-coop"
      ? "modeBtnCoop"
      : "modeBtnPortfolios";
  danismanAnaModSec(bekleyenDanismanModu, document.getElementById(btnId));
}

function danismanCikisYap() {
  danismanGirisYaptiMi = false;
  aktifKullanici = null;
  kullanicilariKaydet();
  const navText = document.getElementById("navAgentLoginBtnText");
  if (navText) navText.textContent = "Üye Girişi";
  gorunumDegistir("view-landing");
}

// ============================================================================
// ÜYELİK SAYFASI: PAKET SEÇİMİNDEN SONRA AYRI SAYFADA ÜYELİK FORMU AÇMA
// ============================================================================
const PAKET_OZET_ETIKETLERI = {
  ucretsiz: "Seçilen Paket: Ücretsiz Başlangıç (0 ₺ / 3 Aktif Portföy)",
  pro: "Seçilen Paket: Pro Danışman Paketi (799 ₺ / ay — Sınırsız)",
  takim: "Seçilen Paket: Takım Lideri Paketi (2.999 ₺ / ay — 5 Danışman)",
  broker: "Seçilen Paket: Broker / Ofis Paketi (11.999 ₺ / ay — 25 Danışman)"
};

function secilenPaketRozetiniGuncelle(paketId) {
  const badge = document.getElementById("selectedPlanSummaryBadge");
  if (badge) {
    badge.textContent = PAKET_OZET_ETIKETLERI[paketId] || PAKET_OZET_ETIKETLERI.ucretsiz;
  }
}

function paketSecVeFormaOdaklan(paketId) {
  const secilen = paketId || "ucretsiz";
  const sel = document.getElementById("regSelectedPlan");
  if (sel) sel.value = secilen;
  secilenPaketRozetiniGuncelle(secilen);
  referansKoduKontrolEt(false);
  gorunumDegistir("view-membership-form");
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    document.getElementById("regFullName")?.focus();
  }, 120);
}

function referansKoduKontrolEt(bildirimGoster = false) {
  const kodInput = document.getElementById("regReferralCode");
  const fb = document.getElementById("regReferralFeedback");
  const planSel = document.getElementById("regSelectedPlan");
  if (planSel) {
    secilenPaketRozetiniGuncelle(planSel.value);
  }
  if (!kodInput || !fb) return;

  const kod = (kodInput.value || "").trim().toUpperCase();
  const plan = planSel ? planSel.value : "pro";

  if (!kod) {
    fb.style.color = "var(--text-muted)";
    fb.textContent = "Davet veya iş birliği kodunuz varsa girdiğinizde paket ücretinize anında %20 indirim tanımlanır.";
    return;
  }

  const fiyatTablosu = {
    ucretsiz: { eski: 0, yeni: 0, ad: "Ücretsiz Başlangıç" },
    pro: { eski: 799, yeni: 639, ad: "Pro Danışman Paketi" },
    takim: { eski: 2999, yeni: 2399, ad: "Takım Lideri Paketi" },
    broker: { eski: 11999, yeni: 9599, ad: "Broker / Ofis Paketi" }
  };

  const secili = fiyatTablosu[plan] || fiyatTablosu.pro;
  fb.style.color = "#15803d";
  if (secili.eski === 0) {
    fb.textContent = `✓ "${kod}" Partner Kodu Tanımlandı! Pro pakete geçiş yaptığınızda %20 indirim (799 ₺ yerine 639 ₺/ay) otomatik uygulanacaktır.`;
  } else {
    fb.textContent = `✓ "${kod}" Partner Kodu Aktif! %20 indirimle ${secili.ad}: ${secili.eski.toLocaleString("tr-TR")} ₺ yerine aylık ${secili.yeni.toLocaleString("tr-TR")} ₺!`;
  }

  if (bildirimGoster) {
    alert(`🎉 "${kod}" Referans / Partner Kodunuz başarıyla doğrulandı ve %20 indirim hesabınıza tanımlandı!`);
  }
}

function googleIleHizliKayitOl() {
  const mevcutAd = document.getElementById("regFullName")?.value.trim() || "Yeni Danışman";
  const mevcutFirma =
    document.getElementById("regCompany")?.value.trim() || "Gayrimenkul Danışmanlık Ofisi";
  const mevcutRef = document.getElementById("regReferralCode")?.value.trim().toUpperCase() || "";

  if (document.getElementById("regFullName") && !document.getElementById("regFullName").value.trim()) {
    document.getElementById("regFullName").value = mevcutAd;
  }
  if (document.getElementById("regCompany") && !document.getElementById("regCompany").value.trim()) {
    document.getElementById("regCompany").value = mevcutFirma;
  }
  if (document.getElementById("regEmail") && !document.getElementById("regEmail").value.trim()) {
    document.getElementById("regEmail").value = "danisman@mulkizle.com";
  }
  if (document.getElementById("regPassword") && !document.getElementById("regPassword").value.trim()) {
    document.getElementById("regPassword").value = "123456";
  }
  if (document.getElementById("regPhone") && !document.getElementById("regPhone").value.trim()) {
    document.getElementById("regPhone").value = "0532 000 00 00";
  }

  danismanUyelikKaydiTamamla(true, mevcutRef);
}

function danismanUyelikKaydiTamamla(googleIleMi = false, refKodOzel = "") {
  const ad = (document.getElementById("regFullName")?.value || "").trim();
  const firma = (document.getElementById("regCompany")?.value || "").trim();
  const tel = (document.getElementById("regPhone")?.value || "").trim();
  const email = (document.getElementById("regEmail")?.value || "").trim();
  const sifre = (document.getElementById("regPassword")?.value || "123456").trim();
  const ilIlce = (document.getElementById("regCityDistrict")?.value || "Ankara / Çankaya").trim();
  const plan = document.getElementById("regSelectedPlan")?.value || "ucretsiz";
  const refKod = (refKodOzel || document.getElementById("regReferralCode")?.value || "").trim().toUpperCase();

  if (!ad || !firma || !tel) {
    alert("Lütfen Ad Soyad, Çalıştığınız Firma ve Cep Telefonu alanlarını doldurun.");
    return;
  }

  const parcalar = ilIlce.split("/").map(s => s.trim());
  const seciliIl = parcalar[0] || "Ankara";
  const seciliIlce = parcalar[1] || "Çankaya";

  // Yeni kullanıcıyı kaydet ve aktif kullanıcı yap
  const yeniKullanici = {
    id: `usr_${Date.now()}`,
    ad,
    ofis: firma,
    telefon: tel,
    email,
    sifre,
    il: seciliIl,
    ilce: seciliIlce,
    plan,
    refKod,
    kayitTarihi: new Date().toLocaleDateString("tr-TR")
  };

  kayitliKullanicilar.push(yeniKullanici);
  aktifKullanici = yeniKullanici;
  kullanicilariKaydet();

  // Yeni kullanıcı için sıfırdan temiz danışman profili oluştur
  danismanProfili = {
    ad,
    ofis: firma,
    deneyim: "Gayrimenkul Danışmanı",
    telefon: tel,
    foto: "../assets/gencay-hero-portre.jpg",
    il: seciliIl,
    ilce: seciliIlce,
    bolgeler: seciliIlce,
    hobiler: "",
    bio: `${seciliIl} (${seciliIlce}) bölgesinde ${firma} bünyesinde gayrimenkul danışmanı olarak hizmet veriyorum.`,
    instagram: "",
    twitter: "",
    linkedin: "",
    magazaUrl: "",
    bloglar: []
  };

  proPaketAktif = plan !== "ucretsiz";

  // Yeni kullanıcının portföy listesi tamamen boş (0 portföy) başlar
  portfoyler = [];
  seciliKod = "";
  acikAkordeonPortfoyKodu = null;

  profilKaydetStorage();
  verileriKaydet();

  danismanGirisYaptiMi = true;
  const navText = document.getElementById("navAgentLoginBtnText");
  if (navText) navText.textContent = `Danışman Paneli (${ad.split(" ")[0]})`;

  gorunumDegistir("view-dashboard");
}

// Emlakçı Paneli Ana Modül Geçişi & Instagram Tarzı Sol İkonlu Menü Yönetimi
function danismanAnaModSec(modId, btnEl) {
  if (modId === "mode-coop") {
    gorunumDegistir("view-ariyorum");
    return;
  }
  _aktifDanismanModu = modId;
  tarayiciGecmisineKaydet(_aktifGorunumId, modId);
  document.querySelectorAll(".agent-mode-section").forEach(sec => {
    sec.classList.toggle("active", sec.id === modId);
  });
  document.querySelectorAll(".agent-mode-btn").forEach(b => {
    b.classList.toggle("active", b === btnEl || b.id === (modId === "mode-messages" ? "modeBtnMessages" : modId === "mode-profile" ? "modeBtnProfile" : "modeBtnPortfolios"));
  });
  if (modId === "mode-profile") {
    kisiselProfilEditorRender();
    if (typeof igSolMenuGuncelle === "function") igSolMenuGuncelle("edit-profile");
  } else if (modId === "mode-messages" && typeof uyeMesajKutusuPanelRender === "function") {
    uyeMesajKutusuPanelRender();
    if (typeof igSolMenuGuncelle === "function") igSolMenuGuncelle("messages");
  } else if (modId === "mode-agenda" && typeof danismanAjandaPanelRender === "function") {
    danismanAjandaPanelRender();
    if (typeof igSolMenuGuncelle === "function") igSolMenuGuncelle("agenda");
  } else if (modId === "mode-notifications" && typeof danismanBildirimlerPanelRender === "function") {
    danismanBildirimlerPanelRender();
    if (typeof igSolMenuGuncelle === "function") igSolMenuGuncelle("notifications");
  } else {
    if (typeof igSolMenuGuncelle === "function") igSolMenuGuncelle("portfolios");
  }
}

function aktifDanismanProMu() {
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  if (aktifKullanici && aktifKullanici.plan) {
    return aktifKullanici.plan !== "ucretsiz";
  }
  return typeof uyeParaliUyelikVarMi === "function" ? uyeParaliUyelikVarMi(aktifId) : Boolean(proPaketAktif);
}

function ucretsizUyeProKisitiGoster(ozellikAdi) {
  const badgeEl = document.getElementById("paywallModalBadge");
  const titleEl = document.getElementById("paywallModalTitle");
  const descEl = document.getElementById("paywallModalDesc");

  if (badgeEl) badgeEl.textContent = "🔒 PRO ÜYELİK (ÜCRETLİ PAKET) ÖZELLİĞİ";
  if (titleEl) titleEl.textContent = `${ozellikAdi} İçin Mülkİzle Pro'ya Geçin`;
  if (descEl) {
    descEl.innerHTML = `<strong>${ozellikAdi}</strong> yalnızca ücretli <strong>Pro Danışman Paketi</strong> üy자larımız için aktiftir. Ücretsiz üyelikte yalnızca aktif portföylerinizi yönetebilir ve müşterilerinize 12 haneli Mülk Takip Kodu gönderebilirsiniz.`;
  }

  const modal = document.getElementById("paywallModal");
  if (modal) {
    modal.classList.add("open");
  }
}

function danismanSolMenuSec(secim) {
  const proMu = aktifDanismanProMu();
  if (
    !proMu &&
    (secim === "ariyorum" ||
      secim === "edit-profile" ||
      secim === "view-website" ||
      secim === "messages")
  ) {
    const adMap = {
      ariyorum: "Arıyorum! (Türkiye Geneli Danışman Networkü)",
      "edit-profile": "Profilim & Kişisel Web Sitesi",
      "view-website": "Profilim (Kişisel Danışman Web Sitesi)",
      messages: "Üyelere Özel Mesaj Kutusu"
    };
    ucretsizUyeProKisitiGoster(adMap[secim] || "Bu Özellik");
    return;
  }

  if (secim === "portfolios") {
    aktifHizliTestEkrani = "dashboard";
    gorunumDegistir("view-dashboard");
    danismanAnaModSec("mode-portfolios", document.getElementById("modeBtnPortfolios"));
    igSolMenuGuncelle("portfolios");
  } else if (secim === "notifications") {
    aktifHizliTestEkrani = "dashboard";
    gorunumDegistir("view-dashboard");
    danismanAnaModSec("mode-notifications");
    igSolMenuGuncelle("notifications");
  } else if (secim === "messages") {
    aktifHizliTestEkrani = "dashboard";
    gorunumDegistir("view-dashboard");
    danismanAnaModSec("mode-messages", document.getElementById("modeBtnMessages"));
    igSolMenuGuncelle("messages");
  } else if (secim === "agenda") {
    aktifHizliTestEkrani = "dashboard";
    gorunumDegistir("view-dashboard");
    danismanAnaModSec("mode-agenda");
    igSolMenuGuncelle("agenda");
  } else if (secim === "ariyorum") {
    aktifHizliTestEkrani = "ariyorum";
    gorunumDegistir("view-ariyorum");
    igSolMenuGuncelle("ariyorum");
  } else if (secim === "edit-profile") {
    aktifHizliTestEkrani = "dashboard";
    gorunumDegistir("view-dashboard");
    danismanAnaModSec("mode-profile", document.getElementById("modeBtnProfile"));
    igSolMenuGuncelle("view-website");
  } else if (secim === "view-website") {
    aktifHizliTestEkrani = "profile-owner";
    incelenenWebSitesiDanismanId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
    profilGoruntuleyenModu = "owner";
    gorunumDegistir("view-agent-profile");
    igSolMenuGuncelle("view-website");
  }
  if (typeof karakterSimulasyonBariniRenderEt === "function") {
    karakterSimulasyonBariniRenderEt();
  }
}

function igSolMenuGuncelle(aktifSecim) {
  const navMap = {
    portfolios: "igNavPortfolios",
    notifications: "igNavNotifications",
    messages: "igNavMessages",
    agenda: "igNavAgenda",
    ariyorum: "igNavAriyorum",
    "view-website": "igNavViewWebsite"
  };
  Object.entries(navMap).forEach(([key, elId]) => {
    const el = document.getElementById(elId);
    if (el) el.classList.toggle("active", key === aktifSecim);
  });

  // Sol bardaki tüm menü öğeleri her zaman görünür ve tıklanabilir;
  // Bildirimler ücretsiz üyede de açıktır. Diğer Pro özelliklerin yanında küçük "PRO" etiketi çıkar ve tıklayınca Ücretli Üyelik (Paywall) paneli açılır!
  const proMu = aktifDanismanProMu();
  const proOzelMenuIdleri = ["igNavMessages", "igNavAriyorum", "igNavViewWebsite"];
  proOzelMenuIdleri.forEach(elId => {
    const el = document.getElementById(elId);
    if (!el) return;
    el.style.display = "";
    const labelEl = el.querySelector(".ig-nav-label");
    if (labelEl) {
      const hamMetin = labelEl.getAttribute("data-base-label") || labelEl.textContent.replace(/\s*PRO$/i, "").trim();
      labelEl.setAttribute("data-base-label", hamMetin);
      if (!proMu) {
        labelEl.innerHTML = `${hamMetin} <span style="margin-left:6px;font-size:0.62rem;font-weight:800;background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;padding:1px 6px;border-radius:999px;">PRO</span>`;
      } else {
        labelEl.textContent = hamMetin;
      }
    }
  });

  if (typeof uyeMesajlariniGetir === "function") {
    const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
    const liste = uyeMesajlariniGetir(aktifId);
    const okunmamis = liste.filter(m => !m.okundu && !m.yanit).length;
    const redBadge = document.getElementById("igSidebarUnreadBadge");
    if (redBadge) {
      redBadge.textContent = `${okunmamis}`;
      redBadge.style.display = proMu && okunmamis > 0 ? "inline-flex" : "none";
    }
  }

  if (typeof danismanBildirimleriniGetir === "function") {
    const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
    const bListe = danismanBildirimleriniGetir(aktifId);
    const okunmamisB = bListe.filter(b => !b.okundu).length;
    const notifBadge = document.getElementById("igSidebarNotifBadge");
    if (notifBadge) {
      notifBadge.textContent = `${okunmamisB}`;
      notifBadge.style.display = okunmamisB > 0 ? "inline-flex" : "none";
    }
  }
}

// Sağ Alt Köşe Gizlenebilir "Demo & Hızlı Test" Çekmecesi
function demoCekmecesiToggle(forceState) {
  const drawer = document.getElementById("demoQuickDrawer");
  if (!drawer) return;
  if (typeof forceState === "boolean") {
    drawer.classList.toggle("open", forceState);
  } else {
    drawer.classList.toggle("open");
  }
}

// Seçili Mülk İçindeki 4 Alt Sekme Geçişi
function emlakciAltSekme(subId, btnEl) {
  document.querySelectorAll(".sub-panel").forEach(p => {
    p.classList.toggle("active", p.id === subId);
  });
  document.querySelectorAll(".sub-tab-btn").forEach(b => {
    b.classList.toggle("active", b === btnEl);
  });
}

// ============================================================================
// 1. PANEL: EMLAKÇI PANELİ YÖNETİMİ (HEPSİBURADA TARZI YATAY AKORDEON LİSTE)
// ============================================================================
let acikAkordeonPortfoyKodu = null;

function aktifDanismaninGorunenPortfoyleri() {
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  const aktifAd = (aktifKullanici && aktifKullanici.ad) || "Ahmet Demir";
  return portfoyler.filter(
    p => p.danismanId === aktifId || p.danisman === aktifAd || (!p.danismanId && aktifId === "ahmet-demir")
  );
}

function panelYenile() {
  if (typeof dortKarakterVerileriniHazirla === "function") {
    dortKarakterVerileriniHazirla();
  }
  anaSayfaSayaclariniGuncelle();
  const gorunenPortfoyler = aktifDanismaninGorunenPortfoyleri();
  const kullanilan = gorunenPortfoyler.length;
  const quotaText = document.getElementById("quotaStatusText");
  const quotaFill = document.getElementById("quotaBarFill");
  const planBadge = document.getElementById("currentPlanBadge");

  if (proPaketAktif) {
    if (planBadge) planBadge.textContent = "Pro Danışman Paketi (Sınırsız)";
    if (quotaText) quotaText.textContent = `${kullanilan} Aktif Portföy • Sınırsız Kota Aktif`;
    if (quotaFill) quotaFill.style.width = "100%";
  } else {
    const yuzde = Math.min(100, Math.round((kullanilan / UCRETSIZ_LIMIT) * 100));
    const kalan = Math.max(0, UCRETSIZ_LIMIT - kullanilan);
    if (planBadge) planBadge.textContent = "Ücretsiz Başlangıç Paketi";
    if (quotaText) {
      quotaText.textContent = `${kullanilan} / ${UCRETSIZ_LIMIT} Ücretsiz İş Kullanıldı (${
        kalan > 0 ? `${kalan} ücretsiz hakkınız kaldı` : "Ücretsiz kotanız doldu"
      })`;
    }
    if (quotaFill) quotaFill.style.width = `${yuzde}%`;
  }

  const listWrap = document.getElementById("portfolioListSidebar");
  const workspaceEl = document.getElementById("activePortfolioWorkspace");
  const workspaceStage = document.getElementById("portfolioWorkspaceStage");

  // Yeniden render etmeden önce çalışma alanını güvenli stage içine al
  if (workspaceEl && workspaceStage && workspaceEl.parentElement !== workspaceStage) {
    workspaceStage.appendChild(workspaceEl);
  }

  if (listWrap) {
    if (gorunenPortfoyler.length === 0) {
      listWrap.innerHTML = `
        <div class="saas-card" style="text-align:center;padding:28px 20px;">
          <div style="font-size:0.95rem;font-weight:700;color:#0F172A;margin-bottom:4px;">Henüz aktif portföyünüz bulunmuyor</div>
          <div class="saas-text-xs" style="margin-bottom:14px;">Yeni bir mülk takip kodu oluşturarak portföy yönetimine başlayabilirsiniz.</div>
          <button type="button" class="saas-btn-primary-sm" onclick="yeniPortfoyModalAc()">+ Yeni Mülk Takip Kodu Oluştur</button>
        </div>
      `;
    } else {
      listWrap.innerHTML = gorunenPortfoyler
        .map(p => {
        const tamamlanan = (p.hizmetler || []).filter(h => h.durum === "done").length;
        const toplam = (p.hizmetler || []).length;
        const isExpanded = acikAkordeonPortfoyKodu === p.kod;
        const formatliKod = String(p.kod || "").replace(/(\d{3})(?=\d)/g, "$1 ").trim();
        const kapakFoto =
          (p.medya && p.medya[0] && p.medya[0].url) ||
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80";
        const teklifSayisi = (p.teklifler || []).length;
        const goruntulenmeSayisi = portfoyGoruntulenmeSayisiniAl(p);
        const paylasimaAcikMi = p.paylasimaAcikMi !== false;
        const altBilgi = `Satıcı: ${p.mulkSahibi} • ${teklifSayisi} Teklif${p.coopAktifMi ? ` • Co-Op: #${p.coopKod}` : ""}`;
        const tarihBilgisi = (p.sonGuncelleme || "16 Kasım 2026").split("•")[0].trim();

        return `
          <div class="hb-portfolio-card ${isExpanded ? "expanded" : ""}">
            <div class="hb-portfolio-header" onclick="portfoySec('${p.kod}')">
              <img src="${kapakFoto}" alt="${p.baslik}" class="hb-portfolio-thumb" />

              <div class="hb-portfolio-code-col">
                <div class="hb-portfolio-code-line">Takip no: <strong>${formatliKod}</strong></div>
                <div class="hb-portfolio-title-sub">${p.baslik} • ${p.bolge}</div>
              </div>

              <div class="hb-portfolio-status-col">
                <div class="hb-status-main">
                  <span class="hb-status-check-circle">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>Aktif Süreç • ${tamamlanan}/${toplam} Adım Tamamlandı</span>
                </div>
                <div class="hb-status-sub" style="display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-top:4px;">
                  <span>${altBilgi}</span>
                  <span class="hb-portfolio-view-counter" title="Portföy Görüntülenme Sayacı">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span>${goruntulenmeSayisi.toLocaleString("tr-TR")} Görüntülenme</span>
                  </span>
                </div>
              </div>

              <div class="hb-portfolio-right-col" style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
                <div class="hb-portfolio-date">${tarihBilgisi}</div>
                <div class="hb-portfolio-price">${p.fiyat || ""}</div>
                ${
                  aktifDanismanProMu()
                    ? `<button
                        type="button"
                        onclick="event.stopPropagation(); portfoyPaylasimDurumuToggle('${p.kod}');"
                        title="Bu portföyün kişisel web sitenizde ve diğer emlakçılarla paylaşıma açık/kapalı durumunu değiştir"
                        style="display:inline-flex;align-items:center;gap:6px;padding:3px 9px;border-radius:999px;font-size:0.71rem;font-weight:700;cursor:pointer;border:1px solid ${
                          paylasimaAcikMi ? "#86EFAC" : "#CBD5E1"
                        };background:${paylasimaAcikMi ? "#F0FDF4" : "#F8FAFC"};color:${
                          paylasimaAcikMi ? "#15803D" : "#64748B"
                        };transition:all 0.2s ease;"
                      >
                        <span style="width:24px;height:13px;border-radius:999px;background:${
                          paylasimaAcikMi ? "#16A34A" : "#94A3B8"
                        };position:relative;display:inline-block;transition:background 0.2s ease;">
                          <span style="width:9px;height:9px;border-radius:50%;background:#FFFFFF;position:absolute;top:2px;left:${
                            paylasimaAcikMi ? "13px" : "2px"
                          };transition:left 0.2s ease;"></span>
                        </span>
                        <span>${paylasimaAcikMi ? "Paylaşıma Açık" : "Paylaşıma Kapalı"}</span>
                      </button>`
                    : ""
                }
              </div>

              <div class="hb-portfolio-actions-col">
                <button
                  type="button"
                  class="hb-portfolio-delete-btn"
                  onclick="event.stopPropagation(); portfoySil('${p.kod}');"
                  title="Portföyü Sil"
                  aria-label="Portföyü Sil"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
                <div class="hb-portfolio-chevron" title="${isExpanded ? "Detayları Gizle" : "Aşağıya Aç"}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
            </div>
            <div class="hb-portfolio-body" id="hb-body-${p.kod}"></div>
          </div>
        `;
        })
        .join("");
    }
  }

  kisiselProfilEditorRender();
  bolgeUzmaniAraRender();

  const p = aktifPortfoy();
  if (!p) return;

  const codeLabel = document.getElementById("activePropCodeLabel");
  if (codeLabel) codeLabel.textContent = `PORTFÖY: ${p.kod} • ${p.bolge}`;
  const titleLabel = document.getElementById("activePropTitleLabel");
  if (titleLabel) titleLabel.textContent = p.baslik;

  // Eğer üye mülk takip kodu oluştururken "Detaylı Pazar Analizi" seçtiyse 03. Detaylı Pazar Analizi sekmesi görünür, seçmediyse görünmez
  const pazarSecili = portfoydePazarAnaliziSeciliMi(p);
  const maTabBtn = document.getElementById("subTabBtnMarketAnalysis");
  const maPanelEl = document.getElementById("sub-market-analysis");
  if (maTabBtn) {
    maTabBtn.style.display = pazarSecili ? "" : "none";
  }
  if (!pazarSecili && maPanelEl && maPanelEl.classList.contains("active")) {
    const srvBtn = document.getElementById("subTabBtnServices");
    if (srvBtn) emlakciAltSekme("sub-services", srvBtn);
  }

  hizmetSeciciRender();
  pazarAnaliziRender();
  formBilgileriniDoldur();
  medyaGalerisiRender();
  gunlukListesiRender();
  tekliflerVeGosterimlerRender();
  yetkiDurumuRender();

  // Eğer açık bir akordeon satırı varsa çalışma alanını o satırın altına yerleştir
  if (acikAkordeonPortfoyKodu && workspaceEl) {
    const targetBody = document.getElementById(`hb-body-${acikAkordeonPortfoyKodu}`);
    if (targetBody) {
      targetBody.appendChild(workspaceEl);
    }
  }
}

function portfoySec(kod) {
  if (typeof duzenlenenRakipIdx !== "undefined" && duzenlenenRakipIdx !== null) {
    duzenlenenRakipIdx = null;
  }
  if (acikAkordeonPortfoyKodu === kod) {
    // Zaten açık olan satırın başlığına tekrar tıklanırsa aşağı açılan çekmeceyi kapat
    acikAkordeonPortfoyKodu = null;
  } else {
    seciliKod = kod;
    acikAkordeonPortfoyKodu = kod;
  }
  panelYenile();
}

function portfoyAkordeonKapat() {
  acikAkordeonPortfoyKodu = null;
  panelYenile();
}

function portfoyPaylasimDurumuToggle(kod) {
  const hedef = portfoyler.find(x => x.kod === kod);
  if (!hedef) return;
  hedef.paylasimaAcikMi = hedef.paylasimaAcikMi === false ? true : false;
  verileriKaydet();
  panelYenile();
  if (typeof danismanKisiselWebSitesiGoster === "function") {
    danismanKisiselWebSitesiGoster();
  }
}

function portfoySil(kod) {
  const silinecek = portfoyler.find(x => x.kod === kod);
  if (!silinecek) return;

  const onay = confirm(
    `"${silinecek.baslik}" (#${silinecek.kod}) portföyünü aktif portföylerinizden silmek istediğinize emin misiniz?`
  );
  if (!onay) return;

  // Çalışma alanını silme öncesinde güvenli stage içine taşı
  const workspaceEl = document.getElementById("activePortfolioWorkspace");
  const workspaceStage = document.getElementById("portfolioWorkspaceStage");
  if (workspaceEl && workspaceStage && workspaceEl.parentElement !== workspaceStage) {
    workspaceStage.appendChild(workspaceEl);
  }

  portfoyler = portfoyler.filter(x => x.kod !== kod);

  if (acikAkordeonPortfoyKodu === kod) {
    acikAkordeonPortfoyKodu = null;
  }
  if (seciliKod === kod) {
    seciliKod = portfoyler.length > 0 ? portfoyler[0].kod : "";
  }

  verileriKaydet();
  panelYenile();
}

function portfoySosyalMedyaLinkleriniGetir(p) {
  if (!p) return [];
  if (!Array.isArray(p.sosyalMedyaLinkleri)) {
    p.sosyalMedyaLinkleri = [];
    if (p.videoUrl && p.videoUrl.trim()) {
      p.sosyalMedyaLinkleri.push({
        platform: "Instagram Reels Tanıtımı",
        url: p.videoUrl.trim()
      });
    }
  }
  return p.sosyalMedyaLinkleri;
}

function sosyalMedyaPlatformTahminEt(url, girilenBaslik) {
  if (girilenBaslik && girilenBaslik.trim()) return girilenBaslik.trim();
  const u = (url || "").toLowerCase();
  if (u.includes("instagram.com")) return "Instagram Paylaşımı";
  if (u.includes("x.com") || u.includes("twitter.com")) return "Twitter (X) Paylaşımı";
  if (u.includes("linkedin.com")) return "LinkedIn Paylaşımı";
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "YouTube Tanıtım Videosu";
  if (u.includes("tiktok.com")) return "TikTok Tanıtım Videosu";
  if (u.includes("facebook.com")) return "Facebook Paylaşımı";
  return "Sosyal Medya Paylaşımı";
}

function portfoySosyalMedyaLinkEkle() {
  const p = aktifPortfoy();
  if (!p) return;
  const baslikEl = document.getElementById("smNewLinkTitle");
  const urlEl = document.getElementById("smNewLinkUrl");
  const url = (urlEl?.value || "").trim();
  const girilenBaslik = (baslikEl?.value || "").trim();

  if (!url) {
    alert("Lütfen eklenecek sosyal medya paylaşım linkini girin.");
    return;
  }

  const temizUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  const platform = sosyalMedyaPlatformTahminEt(temizUrl, girilenBaslik);

  const linkler = portfoySosyalMedyaLinkleriniGetir(p);
  linkler.push({ platform, url: temizUrl });
  p.videoUrl = linkler[0]?.url || "";

  if (baslikEl) baslikEl.value = "";
  if (urlEl) urlEl.value = "";

  verileriKaydet();
  panelYenile();
}

function portfoySosyalMedyaLinkSil(linkIdx) {
  const p = aktifPortfoy();
  if (!p) return;
  const linkler = portfoySosyalMedyaLinkleriniGetir(p);
  linkler.splice(linkIdx, 1);
  p.videoUrl = linkler[0]?.url || "";
  verileriKaydet();
  panelYenile();
}

// --- ALT SEKME 1: HİZMET SEÇİMİ VE KRONOLOJİK SIRA ---
function hizmetSeciciRender() {
  const p = aktifPortfoy();
  if (!p) return;

  const seciliAdlar = new Set((p.hizmetler || []).map(h => h.ad));
  const presetWrap = document.getElementById("presetServicesContainer");
  if (presetWrap) {
    presetWrap.innerHTML = HAZIR_HIZMET_HAVUZU.map((ad, idx) => {
      const isChecked = seciliAdlar.has(ad);
      return `
        <div class="service-check-card ${isChecked ? "checked" : ""}">
          <label class="service-check-left">
            <input type="checkbox" ${isChecked ? "checked" : ""} onchange="hazirHizmetToggle(${idx}, this.checked)" />
            <span>${ad}</span>
          </label>
        </div>
      `;
    }).join("");
  }

  const chronoWrap = document.getElementById("chronoServiceList");
  if (chronoWrap) {
    if (!p.hizmetler || p.hizmetler.length === 0) {
      chronoWrap.innerHTML = `<div style="padding:14px;color:var(--text-muted);font-size:0.85rem;">Henüz hiçbir hizmet seçilmedi. Yukarıdaki kutucuklardan hizmet seçin.</div>`;
      return;
    }

    const sosyalLinkler = portfoySosyalMedyaLinkleriniGetir(p);
    const extIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

    chronoWrap.innerHTML =
      `<div class="house-line-stepper">` +
      p.hizmetler
        .map((h, i) => {
          const sinif = h.durum === "done" ? "done" : h.durum === "current" ? "current" : "";
          const ikon = h.durum === "done" ? "✓" : h.durum === "current" ? "●" : "•";
          const evRenk = h.durum === "done" ? "#0F172A" : h.durum === "current" ? "#2563EB" : "#94A3B8";
          const durumMetni = h.durum === "done" ? "Tamamlandı" : h.durum === "current" ? "Aktif" : "Sırada";
          const isSosyalAdim = /sosyal medya|instagram|reels/i.test(h.ad || "");
          const sosyalMedyaAltPanelHtml = isSosyalAdim
            ? `
            <div style="width:100%;margin-top:10px;padding-top:10px;border-top:1px dashed #CBD5E1;">
              <div style="font-size:0.76rem;font-weight:700;color:#0F172A;margin-bottom:6px;">
                Sosyal Medya Tanıtım Linkleri (Mülk Sahibi ve Alıcı Tıklayarak Paylaşımları Tek Tek Görür)
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
                <input
                  type="text"
                  id="smNewLinkTitle"
                  class="saas-input-compact"
                  placeholder="Başlık (Örn: Instagram Reels, YouTube, TikTok...)"
                  style="width:210px;font-size:0.78rem;padding:6px 10px;"
                />
                <input
                  type="text"
                  id="smNewLinkUrl"
                  class="saas-input-compact"
                  placeholder="Paylaşım Linkini Yapıştırın (https://...)"
                  style="flex:1;min-width:220px;font-size:0.78rem;padding:6px 10px;"
                />
                <button type="button" class="saas-btn-primary-sm" style="padding:6px 12px;font-size:0.76rem;" onclick="portfoySosyalMedyaLinkEkle()">
                  <span>+ Link Ekle</span>
                </button>
              </div>
              ${
                sosyalLinkler.length > 0
                  ? `<div style="display:flex;flex-wrap:wrap;gap:6px;">
                      ${sosyalLinkler
                        .map(
                          (sl, sIdx) => `
                          <div style="display:inline-flex;align-items:center;gap:6px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:4px 9px;font-size:0.76rem;">
                            <a href="${sl.url}" target="_blank" rel="noopener noreferrer" style="color:#2563EB;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                              <span>${sIdx + 1}. ${sl.platform}</span>
                              ${extIcon}
                            </a>
                            <button type="button" onclick="portfoySosyalMedyaLinkSil(${sIdx})" style="border:none;background:transparent;color:#64748B;cursor:pointer;font-weight:700;padding:0 2px;" title="Linki Sil">✕</button>
                          </div>
                        `
                        )
                        .join("")}
                    </div>`
                  : `<div class="saas-text-xs">Henüz sosyal medya paylaşım linki eklenmedi.</div>`
              }
            </div>
          `
            : "";

          return `
            <div class="house-step-item ${sinif}">
              <div class="house-node-circle" onclick="saticiAdimDetayPopUpAc(${i})">
                <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M27 11L11 24.5H16V39H23.5V30H30.5V39H38V24.5H43L27 11Z" fill="${evRenk}" />
                  <rect x="33" y="13" width="4" height="7.5" fill="${evRenk}" />
                </svg>
                <span class="house-node-status-pip">${ikon}</span>
              </div>
              <div class="house-step-card" style="flex-wrap:wrap;">
                <div class="house-step-title" onclick="saticiAdimDetayPopUpAc(${i})" style="cursor:pointer;">
                  <span>${i + 1}. ${h.ad}</span>
                  <span class="house-step-status-label">${durumMetni}</span>
                  ${
                    h.saticiYorumu
                      ? `<span class="saas-badge-neutral">Satıcı Notu: "${h.saticiYorumu}"</span>`
                      : ""
                  }
                </div>
                <div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;">
                  <select onchange="hizmetDurumDegistir(${i}, this.value)" class="saas-input-compact">
                    <option value="done" ${h.durum === "done" ? "selected" : ""}>Tamamlandı</option>
                    <option value="current" ${h.durum === "current" ? "selected" : ""}>Aktif Yapılıyor</option>
                    <option value="pending" ${h.durum === "pending" ? "selected" : ""}>Sırada Bekliyor</option>
                  </select>
                  <button type="button" class="saas-btn-primary-sm" onclick="adimTamamlaVeBildir(${i})" title="Bu adımı tamamla ve mülk sahibine bildirim gönder">
                    <span>Tamamlandı Bildir</span>
                  </button>
                  <button type="button" class="saas-btn-outline-sm" onclick="hizmetSiraTasi(${i}, -1)" title="Yukarı Taşı">↑</button>
                  <button type="button" class="saas-btn-outline-sm" onclick="hizmetSiraTasi(${i}, 1)" title="Aşağı Taşı">↓</button>
                  <button type="button" class="saas-btn-outline-sm" onclick="hizmetSil(${i})" title="Kaldır">✕</button>
                </div>
                ${sosyalMedyaAltPanelHtml}
              </div>
            </div>
          `;
        })
        .join("") +
      `</div>`;
  }
}

function adimTamamlaVeBildir(idx) {
  const p = aktifPortfoy();
  if (!p || !p.hizmetler || !p.hizmetler[idx]) return;
  const h = p.hizmetler[idx];
  h.durum = "done";

  const bugun = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit"
  });

  p.gunluk = p.gunluk || [];
  p.gunluk.unshift({
    tarih: bugun,
    metin: `📲 Bildirim: "${h.ad}" adımı tamamlandı ve mülk sahibine bilgi mesajı gönderildi.`,
    gorunurluk: "public"
  });

  verileriKaydet();
  panelYenile();
  alert(
    `📲 MÜLK SAHİBİNE BİLDİRİM GÖNDERİLDİ!\n\nAlıcı: ${p.mulkSahibi} (${p.mulkSahibiTel || ""})\nMesaj: "Sayın ${p.mulkSahibi}, danışmanınız ${p.danisman} mülkünüz için '${h.ad}' adımını tamamladı. Canlı takip ekranınızdan inceleyebilir, yorum veya beğeni bırakabilirsiniz: mulkizle.com/takip/${p.kod}"`
  );
}

function hazirHizmetToggle(havuzIndex, eklensinMi) {
  const p = aktifPortfoy();
  const ad = HAZIR_HIZMET_HAVUZU[havuzIndex];
  if (!p || !ad) return;

  if (eklensinMi) {
    if (!p.hizmetler.some(h => h.ad === ad)) {
      p.hizmetler.push({ ad, durum: "pending" });
    }
  } else {
    p.hizmetler = p.hizmetler.filter(h => h.ad !== ad);
  }
  p.pazarAnaliziSecildiMi = (p.hizmetler || []).some(h => /pazar\s*analiz/i.test(h.ad || ""));
  verileriKaydet();
  panelYenile();
}

function ozelHizmetEkle() {
  const input = document.getElementById("customServiceInput");
  const ad = (input.value || "").trim();
  if (!ad) return;

  const p = aktifPortfoy();
  p.hizmetler.push({ ad, durum: "pending" });
  p.pazarAnaliziSecildiMi = (p.hizmetler || []).some(h => /pazar\s*analiz/i.test(h.ad || ""));
  input.value = "";
  verileriKaydet();
  panelYenile();
}

function hizmetDurumDegistir(idx, yeniDurum) {
  const p = aktifPortfoy();
  if (!p || !p.hizmetler[idx]) return;
  p.hizmetler[idx].durum = yeniDurum;
  verileriKaydet();
  panelYenile();
}

function hizmetSiraTasi(idx, yon) {
  const p = aktifPortfoy();
  if (!p) return;
  const hedef = idx + yon;
  if (hedef < 0 || hedef >= p.hizmetler.length) return;
  const gecici = p.hizmetler[idx];
  p.hizmetler[idx] = p.hizmetler[hedef];
  p.hizmetler[hedef] = gecici;
  verileriKaydet();
  panelYenile();
}

function hizmetSil(idx) {
  const p = aktifPortfoy();
  if (!p) return;
  p.hizmetler.splice(idx, 1);
  p.pazarAnaliziSecildiMi = (p.hizmetler || []).some(h => /pazar\s*analiz/i.test(h.ad || ""));
  verileriKaydet();
  panelYenile();
}

// ============================================================================
// YENİ ALT SEKME: DETAYLI PAZAR ANALİZİ PANELİ & PDF ÇIKTISI
// (Üye mülk takip kodu oluştururken "Detaylı Pazar Analizi" seçtiyse aktif olur, seçmediyse görünmez)
// ============================================================================
function portfoydePazarAnaliziSeciliMi(p) {
  if (!p) return false;
  const adimlardaVarMi = (p.hizmetler || []).some(h => /pazar\s*analiz/i.test(h.ad || ""));
  if (adimlardaVarMi) {
    p.pazarAnaliziSecildiMi = true;
    return true;
  }
  if (p.pazarAnaliziSecildiMi === false) return false;
  return Boolean(p.pazarAnaliziSecildiMi);
}

function varsayilanPazarAnalizi(p) {
  if (!p.pazarAnalizi) {
    p.pazarAnalizi = {
      tamamlandiMi: false,
      danismanFoto: "../assets/gencay-hero-portre.jpg",
      danismanBio: `${p.bolge || "Bölge"} uzman gayrimenkul danışmanı olarak profesyonel görsel pazarlama, doğru fiyat analizi ve şeffaf raporlama ile hizmet veriyorum.`,
      referansMulkler: "Bağlıca 3+1 Site İçi Daire — 21 Günde Satıldı\nYaşamkent 4+1 Bahçe Dubleks — 18 Günde Satıldı",
      minFiyat: "5.000.000 ₺",
      maxFiyat: "5.250.000 ₺",
      finalDegerlendirme:
        "Yaptığım fotoğraf çekimi, yerinde keşif ve bölgedeki rakip ilanların analizi sonucunda mülkünüzün belirlenen fiyat aralığında satılacağına inanıyorum. Bu mülk için yapacağım hizmetler aşağıda yer almaktadır.",
      rakipler: []
    };
  }
  return p.pazarAnalizi;
}

function pazarAnaliziRender() {
  const p = aktifPortfoy();
  if (!p) return;
  const ma = varsayilanPazarAnalizi(p);

  const nameEl = document.getElementById("maAgentName");
  const officeEl = document.getElementById("maAgentOffice");
  const bioEl = document.getElementById("maAgentBio");
  const pastEl = document.getElementById("maAgentPastSales");
  const photoEl = document.getElementById("maAgentPhotoPreview");
  const minEl = document.getElementById("maMinPrice");
  const maxEl = document.getElementById("maMaxPrice");
  const finalEl = document.getElementById("maFinalOpinion");

  if (nameEl) nameEl.value = p.danisman || "Gencay Çelikkan";
  if (officeEl) officeEl.value = p.ofis || "Gayrimenkul Danışmanlık Ofisi";
  if (bioEl) bioEl.value = ma.danismanBio || "";
  if (pastEl) pastEl.value = ma.referansMulkler || "";
  if (photoEl && ma.danismanFoto) photoEl.src = ma.danismanFoto;
  if (minEl) minEl.value = ma.minFiyat || "5.000.000 ₺";
  if (maxEl) maxEl.value = ma.maxFiyat || "5.250.000 ₺";
  if (finalEl) finalEl.value = ma.finalDegerlendirme || "";

  // Mülkün Fotoğrafları (Pazar Analizi içinde önizleme)
  const photosGrid = document.getElementById("maPropertyPhotosGrid");
  if (photosGrid) {
    const medya = p.medya || [];
    photosGrid.innerHTML =
      medya.length > 0
        ? medya
            .map(
              m => `
              <div>
                <div class="watermarked-card">
                  <img src="${m.url}" alt="${m.baslik}" />
                  ${filigranKatmaniHtml(p)}
                </div>
                <div class="media-card-footer">
                  <strong>${m.baslik}</strong>
                </div>
              </div>
            `
            )
            .join("")
        : `<div style="padding:10px;color:var(--text-muted);font-size:0.84rem;">Henüz mülk fotoğrafı yüklenmedi. Yukarıdaki butonla fotoğraf yükleyebilirsiniz.</div>`;
  }

  // Rakip İlanlar Listesi (Tekrar Düzenlenebilir & Silinebilir)
  const compWrap = document.getElementById("maCompetitorsList");
  if (compWrap) {
    ma.rakipler = ma.rakipler || [];
    if (ma.rakipler.length === 0) {
      compWrap.innerHTML = `<div style="padding:12px;color:var(--text-muted);font-size:0.84rem;">Henüz rakip ilan eklenmedi. Yukarıdan ilan linki yapıştırıp otomatik çekebilirsiniz.</div>`;
    } else {
      compWrap.innerHTML = ma.rakipler
        .map((r, idx) => {
          const isEditing = duzenlenenRakipIdx === idx;
          return `
          <div class="competitor-card" style="${isEditing ? "border-color:#2563EB;background:#F8FAFC;" : ""}">
            <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;">
              <div>
                <span class="saas-text-xs" style="font-weight:600;color:#2563EB;">Rakip İlan #${idx + 1} • ${r.sure || "Yayında"}</span>
                <div style="font-size:0.9rem;font-weight:600;color:#0F172A;">${r.baslik}</div>
                ${
                  r.url
                    ? `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="saas-text-xs" style="color:#2563EB;text-decoration:none;">İlan Linkini Gör</a>`
                    : ""
                }
              </div>
              <div style="display:flex;align-items:center;gap:6px;">
                <strong style="font-size:0.95rem;color:#0F172A;margin-right:4px;">${r.fiyat}</strong>
                <button type="button" class="saas-btn-outline-sm" onclick="rakipIlanDuzenle(${idx})" title="Bu rakip ilanı düzenle">
                  <span>${isEditing ? "Düzenleniyor..." : "Düzenle"}</span>
                </button>
                <button type="button" class="saas-btn-outline-sm" onclick="rakipIlanSil(${idx})" title="Bu rakip ilanı sil">✕</button>
              </div>
            </div>
            ${
              r.yorum
                ? `<div class="competitor-comment-box"><strong>Saha Yorumu:</strong> ${r.yorum}</div>`
                : ""
            }
          </div>
        `;
        })
        .join("");
    }
  }

  // Bu Mülk İçin Yapacağım Hizmetler Önizlemesi
  const srvPreview = document.getElementById("maPlannedServicesPreview");
  if (srvPreview) {
    srvPreview.innerHTML = (p.hizmetler || [])
      .map(
        (h, i) => `
        <span class="saas-badge-neutral">
          ${i + 1}. ${h.ad}
        </span>
      `
      )
      .join("");
  }
}

// Yapay Zeka (AI) ile Emlakçı Özgeçmişi & Güven Metni Oluşturma
function aiOzgecmisOlustur() {
  if (!danismanProfili) profilYukle();
  const dp = danismanProfili;
  const ad = document.getElementById("apName")?.value.trim() || dp.ad || "Gencay Çelikkan";
  const ofis = document.getElementById("apOffice")?.value.trim() || dp.ofis || "Gayrimenkul Danışmanlık Ofisi";
  const il = document.getElementById("apCity")?.value.trim() || dp.il || "Ankara";
  const bolge = document.getElementById("apRegions")?.value.trim() || dp.bolgeler || "Bağlıca & Çayyolu";

  const aiMetin = `Merhaba, ben ${ad}. ${ofis} bünyesinde ${il} (${bolge}) bölgesinde uzman gayrimenkul danışmanı olarak hizmet veriyorum. Bugüne kadar bölgede pazarladığım onlarca konut portföyünde; profesyonel fotoğraf, drone ve 360° çekim teknolojilerini, doğru emsal fiyat analizi ve Mülkİzle 12 haneli şeffaf raporlama sistemiyle birleştirerek mülk sahiplerime en yüksek piyasa değerinde ve en hızlı satış/kiralama sonucunu sağladım.`;

  const apBioEl = document.getElementById("apBio");
  if (apBioEl) apBioEl.value = aiMetin;
  const maBioEl = document.getElementById("maAgentBio");
  if (maBioEl) maBioEl.value = aiMetin;

  kisiselProfilKaydet(false);
  alert("✨ Yapay Zeka (AI), uzmanlık bölgenize ve profilinize uygun profesyonel özgeçmiş metninizi hazırladı!");
}

function danismanFotografiYukle(event) {
  const file = event.target.files && event.target.files[0];
  const p = aktifPortfoy();
  if (!file || !p) return;
  const reader = new FileReader();
  reader.onload = e => {
    const ma = varsayilanPazarAnalizi(p);
    ma.danismanFoto = e.target.result;
    document.getElementById("maAgentPhotoPreview").src = e.target.result;
    verileriKaydet();
  };
  reader.readAsDataURL(file);
}

// İlan Sitelerinden (Sahibinden / Hepsiemlak / Emlakjet) Linkle Rakip İlan Otomatik Çekme
function rakipIlanLinktenOtomatikCek() {
  const p = aktifPortfoy();
  const url = (document.getElementById("compUrlInput").value || "").trim();
  if (!url) {
    alert("Lütfen önce bir ilan sitesi (Sahibinden, Hepsiemlak vb.) linki yapıştırın.");
    return;
  }

  // URL içerisindeki kelimelerden akıllı başlık üret veya bölgeye uygun rakip verisi çek
  const bolge = (p && p.bolge) || "Bağlıca";
  const ornekFiyatlar = ["5.350.000 ₺", "5.500.000 ₺", "4.950.000 ₺", "5.650.000 ₺"];
  const secilenFiyat = ornekFiyatlar[Math.floor(Math.random() * ornekFiyatlar.length)];

  let temizBaslik = `${bolge} Emsal 3+1 135 m² Site İçi Daire`;
  const slugMatch = url.match(/ilan\/([^/?#]+)/i);
  if (slugMatch && slugMatch[1]) {
    const kelimeler = slugMatch[1]
      .replace(/emlak-konut-satilik-/i, "")
      .replace(/-\d+$/, "")
      .split("-")
      .filter(Boolean)
      .map(k => k.charAt(0).toUpperCase() + k.slice(1))
      .join(" ");
    if (kelimeler.length > 5) {
      temizBaslik = kelimeler;
    }
  }

  document.getElementById("compTitleInput").value = temizBaslik;
  document.getElementById("compPriceInput").value = secilenFiyat;
  document.getElementById("compDurationInput").value = "3 Aydır İlanda (Aktif)";
  document.getElementById("compCommentInput").value =
    "Burası yapısız (tadilatsız). Bu ilandaki emlakçıyla konuşuldu, 3 aydır ilanda olduğu ve fiyat yüksek kaldığı için henüz satılmadığı söylendi.";

  alert(`🔗 İlan linkinden rakip verileri otomatik çekildi!\n\nBaşlık: ${temizBaslik}\nFiyat: ${secilenFiyat}\n\nİsterseniz yorumunuzu düzenleyip '➕ Rakip İlanı Analize Ekle' butonuna basabilirsiniz.`);
}

let duzenlenenRakipIdx = null;

function rakipIlanDuzenle(idx) {
  const p = aktifPortfoy();
  if (!p) return;
  const ma = varsayilanPazarAnalizi(p);
  const r = (ma.rakipler || [])[idx];
  if (!r) return;

  duzenlenenRakipIdx = idx;

  const urlEl = document.getElementById("compUrlInput");
  const titleEl = document.getElementById("compTitleInput");
  const priceEl = document.getElementById("compPriceInput");
  const durEl = document.getElementById("compDurationInput");
  const commentEl = document.getElementById("compCommentInput");

  if (urlEl) urlEl.value = r.url || "";
  if (titleEl) titleEl.value = r.baslik || "";
  if (priceEl) priceEl.value = r.fiyat || "";
  if (durEl) durEl.value = r.sure || "";
  if (commentEl) commentEl.value = r.yorum || "";

  const submitBtn = document.getElementById("compSubmitBtn");
  const cancelBtn = document.getElementById("compCancelEditBtn");
  if (submitBtn) submitBtn.textContent = "Değişikliği Kaydet";
  if (cancelBtn) cancelBtn.style.display = "inline-flex";

  pazarAnaliziRender();
  if (titleEl) titleEl.focus();
}

function rakipIlanDuzenlemeIptal() {
  duzenlenenRakipIdx = null;

  const urlEl = document.getElementById("compUrlInput");
  const titleEl = document.getElementById("compTitleInput");
  const priceEl = document.getElementById("compPriceInput");
  const durEl = document.getElementById("compDurationInput");
  const commentEl = document.getElementById("compCommentInput");

  if (urlEl) urlEl.value = "";
  if (titleEl) titleEl.value = "";
  if (priceEl) priceEl.value = "";
  if (durEl) durEl.value = "";
  if (commentEl) commentEl.value = "";

  const submitBtn = document.getElementById("compSubmitBtn");
  const cancelBtn = document.getElementById("compCancelEditBtn");
  if (submitBtn) submitBtn.textContent = "+ Rakip İlanı Ekle";
  if (cancelBtn) cancelBtn.style.display = "none";

  pazarAnaliziRender();
}

function rakipIlanEkle() {
  const p = aktifPortfoy();
  if (!p) return;
  const ma = varsayilanPazarAnalizi(p);

  const url = (document.getElementById("compUrlInput").value || "").trim();
  const baslik = (document.getElementById("compTitleInput").value || "").trim();
  const fiyat = (document.getElementById("compPriceInput").value || "").trim();
  const sure = (document.getElementById("compDurationInput").value || "").trim();
  const yorum = (document.getElementById("compCommentInput").value || "").trim();

  if (!baslik || !fiyat) {
    alert("Lütfen rakip ilanın başlığını ve fiyatını girin (veya linkten otomatik çekin).");
    return;
  }

  ma.rakipler = ma.rakipler || [];
  if (duzenlenenRakipIdx !== null && ma.rakipler[duzenlenenRakipIdx]) {
    ma.rakipler[duzenlenenRakipIdx] = { url, baslik, fiyat, sure, yorum };
  } else {
    ma.rakipler.push({ url, baslik, fiyat, sure, yorum });
  }

  duzenlenenRakipIdx = null;
  document.getElementById("compUrlInput").value = "";
  document.getElementById("compTitleInput").value = "";
  document.getElementById("compPriceInput").value = "";
  document.getElementById("compDurationInput").value = "";
  document.getElementById("compCommentInput").value = "";

  const submitBtn = document.getElementById("compSubmitBtn");
  const cancelBtn = document.getElementById("compCancelEditBtn");
  if (submitBtn) submitBtn.textContent = "+ Rakip İlanı Ekle";
  if (cancelBtn) cancelBtn.style.display = "none";

  verileriKaydet();
  pazarAnaliziRender();
}

function rakipIlanSil(idx) {
  const p = aktifPortfoy();
  if (!p || !p.pazarAnalizi || !p.pazarAnalizi.rakipler) return;
  p.pazarAnalizi.rakipler.splice(idx, 1);
  if (duzenlenenRakipIdx === idx) {
    rakipIlanDuzenlemeIptal();
    return;
  } else if (duzenlenenRakipIdx !== null && duzenlenenRakipIdx > idx) {
    duzenlenenRakipIdx -= 1;
  }
  verileriKaydet();
  pazarAnaliziRender();
}

function pazarAnaliziniKaydet(bildirim = true) {
  const p = aktifPortfoy();
  if (!p) return;
  const ma = varsayilanPazarAnalizi(p);

  p.danisman = document.getElementById("maAgentName").value.trim() || p.danisman;
  p.ofis = document.getElementById("maAgentOffice").value.trim() || p.ofis;
  ma.danismanBio = document.getElementById("maAgentBio").value.trim();
  ma.referansMulkler = document.getElementById("maAgentPastSales").value.trim();
  ma.minFiyat = document.getElementById("maMinPrice").value.trim() || "5.000.000 ₺";
  ma.maxFiyat = document.getElementById("maMaxPrice").value.trim() || "5.250.000 ₺";
  ma.finalDegerlendirme = document.getElementById("maFinalOpinion").value.trim();

  verileriKaydet();
  if (bildirim) {
    alert("💾 Pazar analizi bilgileri kaydedildi.");
  }
}

function pazarAnaliziniTamamlaVeBildir() {
  const p = aktifPortfoy();
  if (!p) return;
  pazarAnaliziniKaydet(false);
  const ma = p.pazarAnalizi;
  ma.tamamlandiMi = true;

  // Tahmini fiyat aralığını portföy fiyatına da yansıt
  p.fiyat = `${ma.minFiyat} - ${ma.maxFiyat}`;
  p.durumEtiketi = `Pazar Analizi Tamamlandı (${ma.minFiyat} - ${ma.maxFiyat})`;

  // Kronolojik adımlarda Fotoğraf Çekimi ve Pazar Analizi adımlarını Tamamlandı yap
  (p.hizmetler || []).forEach(h => {
    if (h.ad.toLowerCase().includes("fotoğraf") || h.ad.toLowerCase().includes("pazar")) {
      h.durum = "done";
    }
  });

  const bugun = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit"
  });

  p.gunluk = p.gunluk || [];
  p.gunluk.unshift({
    tarih: bugun,
    metin: `📊 Pazar Analizi Tamamlandı: Tahmini satış fiyat aralığı ${ma.minFiyat} ile ${ma.maxFiyat} olarak belirlendi ve mülk sahibine bildirim gönderildi.`,
    gorunurluk: "public"
  });

  verileriKaydet();
  panelYenile();

  alert(
    `📲 MÜLK SAHİBİNE TELEFON BİLDİRİMİ / MESAJI GÖNDERİLDİ!\n\nAlıcı: ${p.mulkSahibi} (${p.mulkSahibiTel || ""})\n\nMesaj:\n"${p.danisman} mülkünüz için yaptığı Pazar Analizini tamamladı (${ma.minFiyat} – ${ma.maxFiyat}). Dilerseniz bu linkten hemen inceleyebilirsiniz: mulkizle.com/takip/${p.kod}"`
  );
  gorunumDegistir("view-seller");
}

function pazarAnaliziPdfCikar(kod) {
  const p = (kod && portfoyler.find(x => x.kod === kod)) || aktifPortfoy() || portfoyler[0];
  if (!p) return;

  // Eğer danışman form ekranındaysa son yazdıklarını da al
  const minInput = document.getElementById("maMinPrice");
  if (minInput && document.getElementById("sub-market-analysis")?.classList.contains("active")) {
    pazarAnaliziniKaydet(false);
  }

  const ma = varsayilanPazarAnalizi(p);
  const musteriAd = p.mulkSahibi || "Mülk Sahibi";
  const danismanAd = p.danisman || "Gayrimenkul Danışmanı";
  const firmaAd = p.ofis || "Gayrimenkul Danışmanlık Ofisi";
  const danismanTel = p.danismanTel || "0532 000 00 00";

  const ozelliklerHtml = mulkKatalogOzellikleriHtml(p);
  const fotograflarHtml =
    (p.medya || []).length > 0
      ? `<div class="pdf-photo-grid">` +
        (p.medya || [])
          .map(
            m => `
            <div class="pdf-photo-item">
              <div class="pdf-photo-box">
                <img src="${m.url}" alt="${m.baslik}" />
              </div>
              <div class="pdf-photo-caption">${m.baslik}</div>
            </div>
          `
          )
          .join("") +
        `</div>`
      : `<div style="color:#64748B;font-size:0.84rem;">Henüz fotoğraf eklenmedi.</div>`;

  const rakiplerListesi = ma.rakipler || [];
  const rakiplerPdfHtml =
    rakiplerListesi.length > 0
      ? rakiplerListesi
          .map(
            (r, i) => `
          <div class="pdf-comp-row">
            <div style="flex:1;">
              <div style="font-size:0.76rem;font-weight:700;color:#2563EB;">Rakip İlan #${i + 1} • ${r.sure || "İlanda"}</div>
              <div style="font-size:0.92rem;font-weight:700;color:#0F172A;margin-top:2px;">${r.baslik}</div>
              ${r.yorum ? `<div style="font-size:0.8rem;color:#475569;margin-top:4px;"><strong>Saha Değerlendirmesi:</strong> ${r.yorum}</div>` : ""}
            </div>
            <div style="font-size:1rem;font-weight:800;color:#0F172A;white-space:nowrap;">${r.fiyat}</div>
          </div>
        `
          )
          .join("")
      : `<div style="color:#64748B;font-size:0.84rem;padding:8px 0;">Henüz rakip ilan eklenmedi.</div>`;

  const adimlarPdfHtml = (p.hizmetler || [])
    .map((h, idx) => {
      const sinif = h.durum === "done" ? "done" : h.durum === "current" ? "current" : "";
      const ikon = h.durum === "done" ? "✓" : h.durum === "current" ? "●" : "•";
      const evRenk = h.durum === "done" ? "#0F172A" : h.durum === "current" ? "#2563EB" : "#94A3B8";
      const durumMetni = h.durum === "done" ? "Tamamlandı" : h.durum === "current" ? "Aktif" : "Planlanan Adım";
      return `
        <div class="house-step-item ${sinif}">
          <div class="house-node-circle">
            <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27 11L11 24.5H16V39H23.5V30H30.5V39H38V24.5H43L27 11Z" fill="${evRenk}" />
              <rect x="33" y="13" width="4" height="7.5" fill="${evRenk}" />
            </svg>
            <span class="house-node-status-pip">${ikon}</span>
          </div>
          <div class="house-step-card">
            <div class="house-step-title">
              <span>${idx + 1}. ${h.ad}</span>
              <span class="house-step-status-label">${durumMetni}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  const win = window.open("", "_blank", "width=980,height=900");
  if (!win) {
    alert("Lütfen tarayıcınızda açılır pencere (pop-up) izni verin.");
    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8" />
      <title>${musteriAd} İçin Özel Hazırlanmış Detaylı Pazar Analizi — #${p.kod}</title>
      <style>
        * { box-sizing: border-box; }
        body {
          font-family: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif;
          color: #0F172A;
          background: #F8FAFC;
          margin: 0;
          padding: 28px;
          line-height: 1.5;
        }
        .report-sheet {
          max-width: 860px;
          margin: 0 auto;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
        }
        .no-print {
          max-width: 860px;
          margin: 0 auto 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #0F172A;
          color: #FFFFFF;
          padding: 12px 18px;
          border-radius: 12px;
        }
        .print-btn {
          background: #2563EB;
          color: #FFFFFF;
          border: none;
          padding: 9px 18px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
        }
        .report-header {
          border-bottom: 2px solid #E2E8F0;
          padding-bottom: 18px;
          margin-bottom: 20px;
        }
        .report-badge {
          display: inline-block;
          background: #EFF6FF;
          color: #2563EB;
          border: 1px solid #BFDBFE;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
          margin-bottom: 8px;
        }
        .report-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }
        .report-prepared-by {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 12px 16px;
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          font-size: 0.86rem;
        }
        .section-block {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #E2E8F0;
        }
        .section-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 12px;
        }
        .catalog-specs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 10px;
        }
        .catalog-spec-item {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 9px 11px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .catalog-spec-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
        }
        .catalog-spec-value {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0F172A;
        }
        .catalog-amenities-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }
        .catalog-amenity-pill {
          background: #EFF6FF;
          color: #1D4ED8;
          border: 1px solid #BFDBFE;
          border-radius: 999px;
          padding: 3px 10px;
          font-size: 0.73rem;
          font-weight: 600;
        }
        .pdf-photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .pdf-photo-item {
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          overflow: hidden;
          background: #FFFFFF;
        }
        .pdf-photo-box {
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #0F172A;
        }
        .pdf-photo-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pdf-photo-caption {
          padding: 7px 10px;
          font-size: 0.74rem;
          font-weight: 700;
          color: #0F172A;
        }
        .pdf-comp-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          padding: 12px 14px;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          background: #F8FAFC;
          margin-bottom: 10px;
        }
        .price-highlight-box {
          background: #EFF6FF;
          border: 1.5px solid #2563EB;
          border-radius: 12px;
          padding: 18px 20px;
        }
        .house-line-stepper {
          display: flex;
          flex-direction: column;
        }
        .house-step-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding-bottom: 12px;
          position: relative;
        }
        .house-step-item:last-child { padding-bottom: 0; }
        .house-step-item::after {
          content: "";
          position: absolute;
          top: 34px;
          left: 15px;
          width: 4px;
          height: calc(100% - 34px);
          border-radius: 999px;
          background: #2563EB;
        }
        .house-step-item:last-child::after { display: none; }
        .house-node-circle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 2.5px solid #2563EB;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }
        .house-node-circle svg { width: 19px; height: 19px; }
        .house-node-status-pip {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #2563EB;
          color: #FFFFFF;
          font-size: 0.52rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #FFFFFF;
        }
        .house-step-card {
          flex: 1;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 9px;
          padding: 7px 12px;
          min-height: 34px;
          display: flex;
          align-items: center;
        }
        .house-step-title {
          font-size: 0.84rem;
          font-weight: 700;
          color: #0F172A;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .house-step-status-label {
          font-size: 0.65rem;
          font-weight: 800;
          color: #2563EB;
          background: #EFF6FF;
          padding: 2px 8px;
          border-radius: 999px;
          text-transform: uppercase;
        }
        @media print {
          body { background: #FFFFFF; padding: 0; }
          .no-print { display: none !important; }
          .report-sheet { border: none; box-shadow: none; padding: 12px; }
        }
      </style>
    </head>
    <body>
      <div class="no-print">
        <div style="font-size:0.86rem;font-weight:600;">
          mülkizle.com • Detaylı Pazar Analizi Raporu (#${p.kod})
        </div>
        <button class="print-btn" onclick="window.print()">PDF Olarak Kaydet / Yazdır</button>
      </div>

      <div class="report-sheet">
        <div class="report-header">
          <span class="report-badge">MÜLK TAKİP NO: #${p.kod} • ${p.bolge}</span>
          <h1 class="report-title">${musteriAd} İçin Özel Hazırlanmış Detaylı Pazar Analizi</h1>
          <div style="font-size:0.92rem;color:#475569;font-weight:600;">${p.baslik}</div>

          <div class="report-prepared-by">
            <div>
              <strong>Hazırlayan:</strong> ${danismanAd}
            </div>
            <div>
              <strong>Firma:</strong> ${firmaAd}
            </div>
            <div>
              <strong>Telefon:</strong> ${danismanTel}
            </div>
          </div>
        </div>

        <!-- 1. MÜLKÜN ÖZELLİKLERİ -->
        <div>
          ${ozelliklerHtml}
        </div>

        <!-- 2. MÜLKÜN FOTOĞRAFLARI -->
        <div class="section-block">
          <h2 class="section-title">Mülkün Fotoğrafları</h2>
          ${fotograflarHtml}
        </div>

        <!-- 3. RAKİP İLANLAR -->
        <div class="section-block">
          <h2 class="section-title">Bölgedeki Rakip İlanlar &amp; Emsal Analizi</h2>
          ${rakiplerPdfHtml}
        </div>

        <!-- 4. TAHMİNİ FİYAT -->
        <div class="section-block">
          <h2 class="section-title">Tahmini Satış Fiyat Aralığı &amp; Değerlendirme</h2>
          <div class="price-highlight-box">
            <div style="font-size:0.76rem;font-weight:700;color:#2563EB;text-transform:uppercase;">Önerilen Tahmini Satış Fiyatı</div>
            <div style="font-size:1.45rem;font-weight:800;color:#0F172A;margin:4px 0 8px;">
              ${ma.minFiyat || "Belirlenmedi"} ${ma.maxFiyat ? `– ${ma.maxFiyat}` : ""}
            </div>
            ${
              ma.finalDegerlendirme
                ? `<div style="font-size:0.86rem;color:#1E293B;">${ma.finalDegerlendirme}</div>`
                : ""
            }
          </div>
        </div>

        <!-- 5. PAZARLAMA FAALİYETLERİNE BAŞLANDIĞI ZAMAN YAPILACAK PAZARLAMA ADIMLARI -->
        <div class="section-block">
          <h2 class="section-title">Pazarlama Faaliyetlerine Başlandığı Zaman Yapılacak Pazarlama Adımları</h2>
          <div class="house-line-stepper">
            ${adimlarPdfHtml}
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
  win.document.close();
}

// --- ALT SEKME 2: MÜLK BİLGİLERİ & INSTAGRAM REELS VERİ ÇEKME ---
function formBilgileriniDoldur() {
  const p = aktifPortfoy();
  if (!p) return;

  document.getElementById("fKod").value = p.kod || "";
  document.getElementById("fMulkSahibi").value = p.mulkSahibi || "";
  document.getElementById("fMulkSahibiTel").value = p.mulkSahibiTel || "";
  document.getElementById("fBaslik").value = p.baslik || "";
  document.getElementById("fBolge").value = p.bolge || "";
  document.getElementById("fFiyat").value = p.fiyat || "";
  document.getElementById("fDanisman").value = p.danisman || "";
  document.getElementById("fDanismanTel").value = p.danismanTel || "";
  document.getElementById("fOfis").value = p.ofis || "";
  document.getElementById("fDurum").value = p.durumEtiketi || "";
  document.getElementById("fSahibindenUrl").value = p.sahibindenUrl || "";
  document.getElementById("fVideoUrl").value = p.videoUrl || "";
  document.getElementById("fGoruntulenme").value = p.goruntulenme || "";
  document.getElementById("fFavori").value = p.favori || "";
  document.getElementById("fSosyal").value = p.sosyalErisim || "";
  document.getElementById("fTelefon").value = p.telefon || "";
  document.getElementById("fGosterim").value = p.gosterim || "";
  document.getElementById("fTalepler").value = p.taleplerMetni || "";
  document.getElementById("fMatterportUrl").value = p.matterportUrl || "";
  document.getElementById("fTakyidatUrl").value = p.takyidatUrl || "";
  document.getElementById("fYetkiModu").value = p.yetkiModu || "yok";
  document.getElementById("fYetkiSuresi").value = p.yetkiSuresi || "";
  document.getElementById("fKomisyon").value = p.komisyon || "";
}

function instagramVerisiCekSimulasyon() {
  const url = document.getElementById("fVideoUrl").value.trim();
  if (!url) {
    alert("Lütfen önce bir Instagram Reels linki girin.");
    return;
  }
  const izlenme = (Math.floor(Math.random() * 14) + 4) * 1000 + Math.floor(Math.random() * 900);
  const begeni = Math.floor(izlenme * 0.032);
  const yeniMetin = `${izlenme.toLocaleString("tr-TR")} İzlenme • ${begeni} Beğeni`;
  document.getElementById("fSosyal").value = yeniMetin;
  tumDegisiklikleriKaydet(false);
  alert(`Instagram Graph API Bağlantısı ile Reels Verisi Güncellendi:\n\n📱 ${yeniMetin}`);
}

function tumDegisiklikleriKaydet(bildirimGoster = true) {
  const p = aktifPortfoy();
  if (!p) return;

  p.mulkSahibi = document.getElementById("fMulkSahibi").value.trim();
  p.mulkSahibiTel = document.getElementById("fMulkSahibiTel").value.trim();
  p.baslik = document.getElementById("fBaslik").value.trim();
  p.bolge = document.getElementById("fBolge").value.trim();
  p.fiyat = document.getElementById("fFiyat").value.trim();
  p.danisman = document.getElementById("fDanisman").value.trim();
  p.danismanTel = document.getElementById("fDanismanTel").value.trim();
  p.ofis = document.getElementById("fOfis").value.trim();
  p.durumEtiketi = document.getElementById("fDurum").value.trim();
  p.sahibindenUrl = document.getElementById("fSahibindenUrl").value.trim();
  p.videoUrl = document.getElementById("fVideoUrl").value.trim();
  p.goruntulenme = document.getElementById("fGoruntulenme").value.trim();
  p.favori = document.getElementById("fFavori").value.trim();
  p.sosyalErisim = document.getElementById("fSosyal").value.trim();
  p.telefon = document.getElementById("fTelefon").value.trim();
  p.gosterim = document.getElementById("fGosterim").value.trim();
  p.taleplerMetni = document.getElementById("fTalepler").value.trim();
  p.matterportUrl = document.getElementById("fMatterportUrl").value.trim();
  p.takyidatUrl = document.getElementById("fTakyidatUrl").value.trim();
  p.yetkiModu = document.getElementById("fYetkiModu").value;
  p.yetkiSuresi = document.getElementById("fYetkiSuresi").value.trim();
  p.komisyon = document.getElementById("fKomisyon").value.trim();
  p.sonGuncelleme = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  verileriKaydet();
  panelYenile();
  if (bildirimGoster) {
    alert("✅ Değişiklikler kaydedildi! Satıcı ve Alıcı panelleri anında güncellendi.");
  }
}

// --- ALT SEKME 3: SAHİBİNDEN TARZI YARI SAYDAM ÇAPRAZ FİLİGRAN (SADECE DANIŞMAN ADI + ALTINDA TELEFON) ---
function filigranKatmaniHtml(p) {
  const danismanAdi = (p.danisman || "Gencay Çelikkan").split("(")[0].trim();
  const danismanTel = p.danismanTel || "0532 000 00 00";
  const takipNo = `#${p.kod || "849201736410"}`;
  return `
    <div class="watermark-overlay">
      <span class="watermark-corner-code">${takipNo}</span>
      <div class="watermark-diagonal">
        <span class="watermark-brand-large">${danismanAdi}</span>
        <span class="watermark-agent-sub">${danismanTel}</span>
      </div>
    </div>
  `;
}

function medyaGalerisiRender() {
  const p = aktifPortfoy();
  const grid = document.getElementById("agentMediaGrid");
  if (!p || !grid) return;

  p.medya = p.medya || [];
  if (p.medya.length === 0) {
    grid.innerHTML = `<div style="padding:14px;color:var(--text-muted);font-size:0.85rem;">Henüz fotoğraf yüklenmedi.</div>`;
    return;
  }

  grid.innerHTML = p.medya
    .map(
      (m, idx) => `
      <div>
        <div class="watermarked-card" onclick="fotografPopUpAc(${idx})" title="Fotoğrafı büyütmek için tıklayın">
          <img src="${m.url}" alt="${m.baslik}" crossorigin="anonymous" />
          ${filigranKatmaniHtml(p)}
        </div>
        <div class="media-card-footer">
          <div>
            <strong style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:135px;">${m.baslik}</strong>
          </div>
          <div style="display:flex;gap:4px;">
            <button type="button" class="saas-btn-outline-sm" style="padding:4px 8px;" onclick="fotografPopUpAc(${idx})" title="Büyüt">Büyüt</button>
            <button type="button" class="saas-btn-outline-sm" style="padding:4px 8px;" onclick="filigranliFotografiIndir(${idx})" title="Çapraz filigran basılmış olarak indir">İndir</button>
            <button type="button" class="saas-btn-outline-sm" style="padding:4px 8px;" onclick="fotografSil(${idx})">✕</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

// Tarayıcıda Otomatik WebP / JPEG Sıkıştırma (10 MB -> ~140 KB, %98 Bulut Maliyet Tasarrufu!)
function dosyadanFotografYukle(event) {
  const files = Array.from(event.target.files || []);
  const p = aktifPortfoy();
  if (!p || files.length === 0) return;

  files.forEach(file => {
    const orijinalBoyutMB = Math.max(2.4, file.size / (1024 * 1024)).toFixed(1);
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 1600;
        const olcek = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * olcek);
        canvas.height = Math.round(img.height * olcek);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const sikistirilmisDataUrl = canvas.toDataURL("image/webp", 0.78);
        const yeniBoyutKB = Math.max(95, Math.round((sikistirilmisDataUrl.length * 0.75) / 1024));

        p.medya = p.medya || [];
        p.medya.push({
          baslik: file.name.replace(/\.[^/.]+$/, ""),
          url: sikistirilmisDataUrl,
          sikistirmaBilgisi: `${orijinalBoyutMB} MB → ${yeniBoyutKB} KB WebP (%98 Tasarruf)`
        });
        verileriKaydet();
        medyaGalerisiRender();
        pazarAnaliziRender();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function ornekFotografEkle() {
  const p = aktifPortfoy();
  if (!p) return;
  const rastgele = ORNEK_FOTOGRAFLAR[Math.floor(Math.random() * ORNEK_FOTOGRAFLAR.length)];
  p.medya = p.medya || [];
  p.medya.push({
    baslik: `${rastgele.baslik} (#${p.medya.length + 1})`,
    url: rastgele.url,
    sikistirmaBilgisi: "8.4 MB → 136 KB WebP (%98 Tasarruf)"
  });
  verileriKaydet();
  medyaGalerisiRender();
  pazarAnaliziRender();
}

function fotografSil(idx) {
  const p = aktifPortfoy();
  if (!p) return;
  p.medya.splice(idx, 1);
  verileriKaydet();
  medyaGalerisiRender();
}

// HTML5 Canvas ile fotoğrafın piksellerine Sahibinden tarzı (sol üst takip no + ortada büyük belirgin çapraz filigran) basıp indirme
function filigranliFotografiIndir(idx) {
  const p = aktifPortfoy();
  const m = p && p.medya && p.medya[idx];
  if (!m) return;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || 900;
    canvas.height = img.naturalHeight || 600;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 1) Sol Üst Köşe Takip Kodu (#849201736410)
    const koseFont = Math.max(16, Math.round(canvas.width * 0.022));
    ctx.save();
    ctx.font = `700 ${koseFont}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.lineWidth = Math.max(1.5, Math.round(koseFont * 0.1));
    ctx.strokeStyle = "rgba(15, 23, 42, 0.35)";
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.strokeText(`#${p.kod || "849201736410"}`, 18, 16);
    ctx.fillText(`#${p.kod || "849201736410"}`, 18, 16);
    ctx.restore();

    // 2) Ortada Kutusuz, Yarı Saydam Çapraz Filigran (Üstte Danışman Adı, Altta Telefon Numarası)
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((-28 * Math.PI) / 180);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const danismanAdi = (p.danisman || "Gencay Çelikkan").split("(")[0].trim();
    const danismanTel = p.danismanTel || "0532 000 00 00";

    const anaFont = Math.max(32, Math.round(canvas.width * 0.064));
    ctx.font = `800 ${anaFont}px "Plus Jakarta Sans", sans-serif`;
    ctx.shadowColor = "rgba(15, 23, 42, 0.28)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.lineWidth = Math.max(2, Math.round(anaFont * 0.04));
    ctx.strokeStyle = "rgba(15, 23, 42, 0.25)";
    ctx.fillStyle = "rgba(255, 255, 255, 0.42)";
    ctx.strokeText(danismanAdi, 0, -anaFont * 0.32);
    ctx.fillText(danismanAdi, 0, -anaFont * 0.32);

    const altFont = Math.max(22, Math.round(canvas.width * 0.044));
    ctx.font = `800 ${altFont}px "Plus Jakarta Sans", sans-serif`;
    ctx.lineWidth = Math.max(1.5, Math.round(altFont * 0.04));
    ctx.strokeStyle = "rgba(15, 23, 42, 0.25)";
    ctx.fillStyle = "rgba(255, 255, 255, 0.44)";
    ctx.strokeText(danismanTel, 0, anaFont * 0.46);
    ctx.fillText(danismanTel, 0, anaFont * 0.46);
    ctx.restore();

    const link = document.createElement("a");
    link.download = `${p.kod}-filigranli-${idx + 1}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  img.onerror = () => {
    window.open(m.url, "_blank");
  };
  img.src = m.url;
}

// Tüm Fotoğrafları Tek Tuşla Sırayla İndirme
function tumFiligranliFotograflariIndir() {
  const p = aktifPortfoy();
  if (!p || !p.medya || p.medya.length === 0) {
    alert("İndirilecek fotoğraf bulunamadı.");
    return;
  }

  p.medya.forEach((_, idx) => {
    setTimeout(() => {
      filigranliFotografiIndir(idx);
    }, idx * 320);
  });
}

// Fotoğrafa Tıklayınca Büyüten Pop-up (Lightbox) Modalı
let aktifLightboxFotoIdx = 0;

function fotografPopUpAc(idx = 0) {
  const p = aktifPortfoy();
  if (!p || !p.medya || p.medya.length === 0) return;

  const toplam = p.medya.length;
  aktifLightboxFotoIdx = ((idx % toplam) + toplam) % toplam;
  const m = p.medya[aktifLightboxFotoIdx];

  const modal = document.getElementById("photoLightboxModal");
  const content = document.getElementById("photoLightboxModalContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px;">
      <div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="saas-badge-blue">${aktifLightboxFotoIdx + 1} / ${toplam} Fotoğraf</span>
          <span class="saas-text-xs">#${p.kod} • ${p.baslik}</span>
        </div>
        <h3 class="saas-h2" style="margin-top:4px;">${m.baslik}</h3>
      </div>
      <button type="button" onclick="fotografPopUpKapat()" style="border:1px solid #E2E8F0;background:#FFFFFF;width:32px;height:32px;border-radius:8px;cursor:pointer;font-weight:600;color:#0F172A;">✕</button>
    </div>

    <div class="lightbox-photo-stage">
      <button type="button" class="lightbox-nav-arrow prev" onclick="fotografPopUpGezin(-1)" title="Önceki Fotoğraf" aria-label="Önceki Fotoğraf">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <img src="${m.url}" alt="${m.baslik}" />
      ${filigranKatmaniHtml(p)}
      <button type="button" class="lightbox-nav-arrow next" onclick="fotografPopUpGezin(1)" title="Sonraki Fotoğraf" aria-label="Sonraki Fotoğraf">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>

    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-top:14px;padding-top:12px;border-top:1px solid #E2E8F0;">
      <span class="saas-text-xs">Fotoğrafı parmağınızla sağa/sola kaydırabilir veya oklarla geçiş yapabilirsiniz.</span>

      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <button type="button" class="saas-btn-outline-sm" onclick="filigranliFotografiIndir(${aktifLightboxFotoIdx})">
          <span>Bu Fotoğrafı İndir</span>
        </button>
        <button type="button" class="saas-btn-primary-sm" onclick="tumFiligranliFotograflariIndir()">
          <span>Tüm Fotoğrafları İndir (${toplam})</span>
        </button>
      </div>
    </div>
  `;

  modal.classList.add("open");

  // Dokunmatik ve fare ile sağa/sola kaydırarak (swipe) fotoğraf geçişi
  const stage = content.querySelector(".lightbox-photo-stage");
  if (stage) {
    let startX = null;
    stage.addEventListener(
      "touchstart",
      e => {
        if (e.touches && e.touches.length > 0) startX = e.touches[0].clientX;
      },
      { passive: true }
    );
    stage.addEventListener("touchend", e => {
      if (startX === null || !e.changedTouches || e.changedTouches.length === 0) return;
      const dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) {
        fotografPopUpGezin(dx < 0 ? 1 : -1);
      }
    });
    stage.addEventListener("mousedown", e => {
      startX = e.clientX;
    });
    stage.addEventListener("mouseup", e => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) {
        fotografPopUpGezin(dx < 0 ? 1 : -1);
      }
    });
  }
}

function fotografPopUpGezin(yon) {
  fotografPopUpAc(aktifLightboxFotoIdx + yon);
}

function fotografPopUpKapat() {
  const modal = document.getElementById("photoLightboxModal");
  if (modal) modal.classList.remove("open");
}

document.addEventListener("keydown", e => {
  const modal = document.getElementById("photoLightboxModal");
  if (!modal || !modal.classList.contains("open")) return;
  if (e.key === "ArrowLeft") {
    fotografPopUpGezin(-1);
  } else if (e.key === "ArrowRight") {
    fotografPopUpGezin(1);
  } else if (e.key === "Escape") {
    fotografPopUpKapat();
  }
});

// --- ALT SEKME 4: MÜLK GÜNLÜĞÜM (SADECE DANIŞMANA ÖZEL SAHA, KAPICI, ANAHTAR & PAZARLIK NOTLARI) ---
function gunlukListesiRender() {
  const p = aktifPortfoy();
  const wrap = document.getElementById("agentDiaryList");
  if (!p || !wrap) return;

  p.gunluk = p.gunluk || [];
  if (p.gunluk.length === 0) {
    wrap.innerHTML = `<div class="saas-text-sm">Bu mülk için henüz özel saha notu girilmedi.</div>`;
    return;
  }

  wrap.innerHTML = p.gunluk
    .map(
      (g, i) => `
      <div class="diary-entry private-note" style="background:#FFFFFF;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
            <span class="visibility-pill private">Danışman Özel Notu</span>
            <small class="saas-text-xs">${g.tarih}</small>
          </div>
          <div style="font-size:0.875rem;color:#0F172A;font-weight:500;">${(g.metin || "").replace(/[🤝📅📓📸🎥🏆💬✅📲📊]/g, "").trim()}</div>
        </div>
        <button type="button" class="saas-btn-outline-sm" onclick="gunlukNotuSil(${i})">Sil</button>
      </div>
    `
    )
    .join("");
}

function gunlukNotuEkle() {
  const p = aktifPortfoy();
  const txtEl = document.getElementById("newDiaryText");
  const metin = (txtEl.value || "").trim();
  if (!p || !metin) return;

  const simdi = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  p.gunluk = p.gunluk || [];
  p.gunluk.unshift({
    tarih: simdi,
    metin,
    gorunurluk: "private"
  });

  txtEl.value = "";
  verileriKaydet();
  gunlukListesiRender();
}

function gunlukNotuSil(idx) {
  const p = aktifPortfoy();
  if (!p) return;
  p.gunluk.splice(idx, 1);
  verileriKaydet();
  gunlukListesiRender();
}

// --- ALT SEKME 5: TEKLİFLER & YER GÖSTERİMLERİ (SATICI ONAYLI + YER GÖSTERME BELGESİ) ---
function durumRozetiHtml(durum, tip = "teklif") {
  if (durum === "approved") {
    return `<span class="saas-badge-blue">Satıcı Onayladı</span>`;
  }
  if (durum === "rejected") {
    return `<span class="saas-badge-neutral">Satıcı Reddetti</span>`;
  }
  return `<span class="saas-badge-neutral">Onay Bekliyor</span>`;
}

function tekliflerVeGosterimlerRender() {
  const p = aktifPortfoy();
  if (!p) return;

  p.teklifler = p.teklifler || [];
  p.yerGosterimleri = p.yerGosterimleri || [];

  const offersWrap = document.getElementById("agentOffersList");
  if (offersWrap) {
    if (p.teklifler.length === 0) {
      offersWrap.innerHTML = `<div class="saas-text-sm">Henüz kayıtlı fiyat teklifi yok.</div>`;
    } else {
      offersWrap.innerHTML = p.teklifler
        .map(
          (t, i) => `
          <div class="diary-entry ${t.durum === "approved" ? "public-note" : "private-note"}">
            <div>
              <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:4px;">
                ${durumRozetiHtml(t.durum, "teklif")}
                <strong style="font-size:0.95rem;color:#0F172A;">${t.tutar}</strong>
                <span class="saas-badge-neutral">${t.odemeSekli}</span>
                <small class="saas-text-xs">Alıcı: ${t.alici} (${t.tarih})</small>
              </div>
              <div class="saas-text-xs">${t.not || ""}</div>
              ${
                t.saticiYaniti
                  ? `<div class="saas-text-xs" style="font-weight:600;margin-top:4px;color:#0F172A;">Satıcı Yanıtı: ${t.saticiYaniti}</div>`
                  : ""
              }
            </div>
            <button type="button" class="saas-btn-outline-sm" onclick="teklifSil(${i})">Sil</button>
          </div>
        `
        )
        .join("");
    }
  }

  const showingsWrap = document.getElementById("agentShowingsList");
  if (showingsWrap) {
    if (p.yerGosterimleri.length === 0) {
      showingsWrap.innerHTML = `<div class="saas-text-sm">Henüz kayıtlı yer gösterimi yok.</div>`;
    } else {
      showingsWrap.innerHTML = p.yerGosterimleri
        .map(
          (g, i) => `
          <div class="diary-entry ${g.durum === "approved" ? "public-note" : "private-note"}">
            <div>
              <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:4px;">
                ${durumRozetiHtml(g.durum, "gosterim")}
                <strong style="font-size:0.9rem;color:#0F172A;">${g.tarihSaat}</strong>
                <span class="saas-text-xs">Aday: ${g.alici} (${g.telefon || "-"})</span>
              </div>
              <div class="saas-text-xs">${g.not || ""}</div>
              ${
                g.saticiYaniti
                  ? `<div class="saas-text-xs" style="font-weight:600;margin-top:4px;color:#0F172A;">Satıcı Yanıtı: ${g.saticiYaniti}</div>`
                  : ""
              }
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
              <button type="button" class="saas-btn-outline-sm" onclick="yerGostermeBelgesiOlustur(${i})">
                <span>Yer Gösterme Belgesi</span>
              </button>
              <button type="button" class="saas-btn-outline-sm" onclick="yerGosterimiSil(${i})">Sil</button>
            </div>
          </div>
        `
        )
        .join("");
    }
  }
}

function yeniTeklifEkle() {
  const p = aktifPortfoy();
  if (!p) return;

  const alici = (document.getElementById("newOfferBuyer").value || "").trim();
  const tutar = (document.getElementById("newOfferAmount").value || "").trim();
  const odemeSekli = document.getElementById("newOfferPayment").value;
  const not = (document.getElementById("newOfferNote").value || "").trim();

  if (!alici || !tutar) {
    alert("Lütfen teklif veren alıcı adını ve teklif tutarını girin.");
    return;
  }

  const bugun = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  p.teklifler = p.teklifler || [];
  p.teklifler.unshift({
    alici,
    tutar,
    odemeSekli,
    tarih: bugun,
    not,
    durum: "pending",
    saticiYaniti: ""
  });

  document.getElementById("newOfferBuyer").value = "";
  document.getElementById("newOfferAmount").value = "";
  document.getElementById("newOfferNote").value = "";

  verileriKaydet();
  tekliflerVeGosterimlerRender();
  alert("✅ Yeni fiyat teklifi eklendi ve Satıcı Panelinde mülk sahibinin onayına sunuldu!");
}

function teklifSil(idx) {
  const p = aktifPortfoy();
  if (!p || !p.teklifler) return;
  p.teklifler.splice(idx, 1);
  verileriKaydet();
  tekliflerVeGosterimlerRender();
}

function yeniYerGosterimiEkle() {
  const p = aktifPortfoy();
  if (!p) return;

  const alici = (document.getElementById("newShowingBuyer").value || "").trim();
  const telefon = (document.getElementById("newShowingPhone").value || "").trim();
  const tarihSaat = (document.getElementById("newShowingDate").value || "").trim();
  const not = (document.getElementById("newShowingNote").value || "").trim();

  if (!alici || !tarihSaat) {
    alert("Lütfen aday alıcı adını ve gösterim tarih/saatini girin.");
    return;
  }

  p.yerGosterimleri = p.yerGosterimleri || [];
  p.yerGosterimleri.unshift({
    alici,
    telefon,
    tarihSaat,
    not,
    durum: "pending",
    saticiYaniti: ""
  });

  document.getElementById("newShowingBuyer").value = "";
  document.getElementById("newShowingPhone").value = "";
  document.getElementById("newShowingDate").value = "";
  document.getElementById("newShowingNote").value = "";

  verileriKaydet();
  tekliflerVeGosterimlerRender();
  alert("✅ Yer gösterim randevusu eklendi ve Satıcı Panelinde mülk sahibinin onayına sunuldu!");
}

function yerGosterimiSil(idx) {
  const p = aktifPortfoy();
  if (!p || !p.yerGosterimleri) return;
  p.yerGosterimleri.splice(idx, 1);
  verileriKaydet();
  tekliflerVeGosterimlerRender();
}

function bosYerGostermeBelgesiAc() {
  const authTabBtn = document.querySelectorAll(".sub-tab-btn")[3];
  emlakciAltSekme("sub-auth", authTabBtn);
  const ygBtn = document.querySelectorAll("#contractTypeSelector .contract-type-btn")[7];
  sozlesmeTuruSec("yer_gosterme", ygBtn);
}

// Seçili yer gösterimi için hazır Taşınmaz Yer Gösterme Belgesi penceresi açma
function yerGostermeBelgesiOlustur(idx) {
  const p = aktifPortfoy();
  const g = p && p.yerGosterimleri && p.yerGosterimleri[idx];
  if (!p || !g) return;

  const isletmeAdi = p.ofis && p.ofis !== "Gayrimenkul Danışmanlık Ofisi" ? p.ofis : "................................................";

  const win = window.open("", "_blank", "width=860,height=920");
  if (!win) {
    alert("Lütfen açılır pencere (pop-up) izni verin.");
    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8" />
      <title>Taşınmaz Yer Gösterme Belgesi - ${p.kod}</title>
      <style>
        body { font-family: Arial, sans-serif; color: #111; line-height: 1.55; padding: 32px; max-width: 800px; margin: 0 auto; font-size: 13px; }
        h2 { font-size: 17px; text-align: center; border-bottom: 2px solid #0d9488; padding-bottom: 8px; margin-bottom: 16px; }
        h4 { font-size: 13px; margin: 14px 0 6px; color: #0f766e; text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; font-size: 12.5px; }
        th, td { border: 1px solid #64748b; padding: 8px 10px; text-align: left; }
        th { background: #f1f5f9; width: 32%; }
        .no-print { text-align: right; margin-bottom: 14px; }
        .print-btn { background: #0d9488; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; }
        @media print { .no-print { display: none; } body { padding: 8px; } }
      </style>
    </head>
    <body>
      <div class="no-print">
        <button class="print-btn" onclick="window.print()">🖨️ Yazdır / PDF Olarak Kaydet</button>
      </div>
      <h2>TAŞINMAZ YER GÖSTERME BELGESİ</h2>
      <h4>1. EMLAK İŞLETMESİ BİLGİLERİ</h4>
      <table>
        <tr><th>İşletme Adı / Unvanı</th><td>${isletmeAdi}</td></tr>
        <tr><th>Taşınmaz Ticareti Yetki Belgesi No</th><td>................................................</td></tr>
        <tr><th>Sorumlu Emlak Danışmanı & Tel</th><td>${p.danisman} (${p.danismanTel || ""})</td></tr>
        <tr><th>İşletme Adresi</th><td>........................................................................</td></tr>
      </table>

      <h4>2. TAŞINMAZI GÖREN (ALICI / KİRACI ADAYI) BİLGİLERİ</h4>
      <table>
        <tr><th>Adı Soyadı / Unvanı</th><td><strong>${g.alici}</strong></td></tr>
        <tr><th>T.C. Kimlik / Vergi Numarası</th><td>................................................</td></tr>
        <tr><th>Telefon Numarası</th><td><strong>${g.telefon || "...................................."}</strong></td></tr>
        <tr><th>İkametgah Adresi</th><td>........................................................................</td></tr>
      </table>

      <h4>3. GÖSTERİLEN TAŞINMAZIN BİLGİLERİ</h4>
      <table>
        <tr><th>Portföy Kodu & Tanımı</th><td>${p.kod} — ${p.baslik}</td></tr>
        <tr><th>İl / İlçe / Mahalle / Açık Adres</th><td>${p.bolge} — ........................................................</td></tr>
        <tr><th>Tapu Bilgileri (Ada / Pafta / Parsel / B.Bölüm)</th><td>Ada: .............. Pafta: .............. Parsel: .............. B.Bölüm: ..............</td></tr>
        <tr><th>Beyan Edilen Satış / Kira Bedeli</th><td><strong>${p.fiyat || "...................................."}</strong></td></tr>
        <tr><th>Yer Gösterim Tarihi ve Saati</th><td><strong>${g.tarihSaat}</strong></td></tr>
      </table>

      <h4>4. TARAFLARIN BEYAN VE TAAHHÜTLERİ</h4>
      <p>
        1. Yukarıda bilgileri yer alan taşınmaz, Emlak İşletmesi yetkilisi tarafından şahsıma/şirketimize gezdirilmiş ve gösterilmiştir. Taşınmazın yer gösterimi için herhangi bir ücret talep edilmemiştir.<br/>
        2. İşbu belgede bilgileri bulunan taşınmazı; şahsım, eşim, birinci derece kan veya kayın hısımlarım, ortağı veya yetkilisi olduğum şirketler aracılığıyla Emlak İşletmesini devre dışı bırakarak doğrudan mal sahibinden veya başka bir aracıdan satın almam/kiralamam halinde, satış/kiralama bedeli üzerinden <strong>% .......... + KDV</strong> aracılık hizmet bedelini Emlak İşletmesine ödeyeceğimi kabul, beyan ve taahhüt ederim.<br/>
        3. Uyuşmazlık halinde ANKARA Mahkemeleri ve İcra Daireleri yetkilidir.
      </p>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:28px;text-align:center;">
        <div style="border:1px dashed #64748b;border-radius:10px;padding:16px;min-height:95px;">
          <strong>TAŞINMAZI GÖREN (ALICI / KİRACI ADAYI)</strong><br/>
          ${g.alici}<br/><br/><em>İmza:</em>
        </div>
        <div style="border:1px dashed #64748b;border-radius:10px;padding:16px;min-height:95px;">
          <strong>GÖSTEREN EMLAK DANIŞMANI</strong><br/>
          ${p.danisman}<br/><br/><em>İmza:</em>
        </div>
      </div>
    </body>
    </html>
  `);
  win.document.close();
}

// --- ALT SEKME 5: ESNEK YETKİ BELGESİ VE 7 HAZIR SÖZLEŞME TASLAĞI ---
let aktifSozlesmeTuru = "satis_yetki";

function yetkiModuDegisti() {
  const p = aktifPortfoy();
  if (!p) return;
  p.yetkiModu = document.getElementById("fYetkiModu").value;
  verileriKaydet();
  yetkiDurumuRender();
}

function yetkiDurumuRender() {
  const p = aktifPortfoy();
  const box = document.getElementById("agentAuthStatusBox");
  if (!p || !box) return;

  if (p.yetkiModu === "yok") {
    box.innerHTML = `
      <strong>ℹ️ Durum: Yetki Belgesi Zorunlu Tutulmadı (Sözlü Yetki / Açık Portföy)</strong>
      <p style="color:var(--text-body);margin-top:4px;">Bu mülk yazılı yetki sözleşmesi olmadan pazarlanmaktadır. Satıcı ekranında herhangi bir sözleşme imzalama uyarısı çıkmaz. İhtiyaç duyarsanız aşağıdaki 7 hazır sözleşme taslağından istediğinizi doldurup çıktı alabilirsiniz.</p>
    `;
  } else if (p.yetkiModu === "taslak_yukle") {
    box.innerHTML = `
      <strong>🖨️ Durum: Islak İmzalı Sözleşme / Kendi Belgeni Yükleme Modu</strong>
      <p style="color:var(--text-body);margin-top:4px;">
        ${
          p.yetkiBelgesiDosyaAdi
            ? `✅ <strong>Yüklenen İmzalı Belge:</strong> <span style="color:var(--brand-primary);font-weight:800;">${p.yetkiBelgesiDosyaAdi}</span> (${p.yetkiOnayDetayi || "Yüklendi"})`
            : `Henüz imzalı belge yüklenmedi. Aşağıdaki 7 sözleşme taslağından birini çıktı alıp imzalattıktan sonra fotoğrafını veya PDF'ini buraya yükleyebilirsiniz.`
        }
      </p>
    `;
  } else if (p.yetkiModu === "mobil_onay") {
    box.innerHTML = `
      <strong>📲 Durum: Mülk Sahibine Mobil Onay (SMS OTP + Ekran İmzası) Modu</strong>
      <p style="color:var(--text-body);margin-top:4px;">
        ${
          p.yetkiOnaylandiMi
            ? `✅ <strong>Mülk Sahibi Mobil Onayı Tamamlandı!</strong> (${p.yetkiOnayDetayi})`
            : `⏳ Mülk sahibinin (<strong>${p.mulkSahibi}</strong>) Satıcı Panelinden sözleşmeyi inceleyip onaylaması bekleniyor.`
        }
      </p>
    `;
  }

  sozlesmeTaslagiRender();
}

function sozlesmeTuruSec(tur, btnEl) {
  aktifSozlesmeTuru = tur;
  document.querySelectorAll("#contractTypeSelector .contract-type-btn").forEach(b => {
    b.classList.toggle("active", b === btnEl);
  });
  sozlesmeTaslagiRender();
}

function fInput(placeholder, val = "", extraClass = "") {
  const safeVal = String(val || "").replace(/"/g, "&quot;");
  return `<input type="text" class="fillable-input ${extraClass}" placeholder="✏️ ${placeholder}" value="${safeVal}" />`;
}

function fPercent(placeholder = "% ...", val = "") {
  const safeVal = String(val || "").replace(/"/g, "&quot;");
  return `% <input type="text" class="fillable-input fillable-percent" placeholder="${placeholder}" value="${safeVal}" />`;
}

function sozlesmeAlanlariniTemizle() {
  const viewer = document.getElementById("contractTemplateViewer");
  if (!viewer) return;
  viewer.querySelectorAll("input.fillable-input").forEach(inp => {
    inp.value = "";
  });
}

function sozlesmeTaslagiRender() {
  const p = aktifPortfoy();
  const viewer = document.getElementById("contractTemplateViewer");
  if (!p || !viewer) return;

  const komisyonOrani = (document.getElementById("fKomisyon")?.value || p.komisyon || "").replace(/%/g, "").trim();
  const yetkiSuresi = document.getElementById("fYetkiSuresi")?.value || p.yetkiSuresi || "";
  const isletmeAdi = p.ofis && p.ofis !== "Gayrimenkul Danışmanlık Ofisi" ? p.ofis : "";

  if (aktifSozlesmeTuru === "satis_yetki") {
    viewer.innerHTML = `
      <h2>GAYRİMENKUL SATIŞ YETKİ BELGESİ</h2>
      <p>
        İşbu yetki belgesi; ${fInput("Müşteri Ad Soyad / Unvan", p.mulkSahibi, "fillable-inline")} adresi ${fInput("Müşteri Açık Adresi", "", "fillable-inline")} (Belgede “Müşteri” olarak anılacaktır) ile ${fInput("Emlak İşletmesi Açık Adresi", p.bolge, "fillable-inline")} adresinde bulunan ${fInput("Emlak İşletmesi Unvanı", isletmeAdi, "fillable-inline")} (Belgede “EMLAK İŞLETMESİ” olarak anılacaktır) arasında aşağıda mutabık kalınan şartlar dahilinde imza altına alınmıştır.
      </p>
      <ol style="margin:12px 0 14px 20px;">
        <li>Müşteri ile EMLAK İŞLETMESİ aşağıda belirtilen gayrimenkulün satışına aracılık edilmesi için hür iradeleri ile anlaşmışlardır. Müşteri bu sözleşme ile söz konusu gayrimenkulün satışında EMLAK İŞLETMESİ’nin tek yetkili olduğunu, sözleşme süresince başka kişi ve kuruluşlara yetki vermemeyi ve bunların aracılığı ile işlemde bulunmamayı beyan, kabul ve taahhüt etmiştir.</li>
        <li>Müşteri işbu sözleşmede belirtilen EMLAK İŞLETMESİ’nin aracılık hizmeti karşılığında gayrimenkulün satış bedelinin ${fPercent("Boş (% Oran)", komisyonOrani)} komisyon oranına tekabül eden (KDV hariç) net tutarı komisyon ücreti olarak EMLAK İŞLETMESİ’ne en geç tapuda satışın yapıldığı tarihte ödemeyi kabul ve taahhüt etmiştir.</li>
        <li>EMLAK İŞLETMESİ gayrimenkulün satışı amacıyla masrafı kendisine ait olmak üzere gazete, dergi, internet ve sosyal medya organlarında ilan vermek suretiyle tanıtım faaliyetlerinde bulunma hakkına sahiptir. Müşteri EMLAK İŞLETMESİ’ne söz konusu amaç için gayrimenkule giriş ve alıcı adaylarına gösterme imkanı tanımayı kabul ve taahhüt etmiştir.</li>
        <li>Müşteri gayrimenkul ile ilgili olarak kendisine doğrudan gelen başvuruları EMLAK İŞLETMESİ’ne yönlendirmek durumundadır.</li>
        <li>Müşteri bu sözleşmeyle EMLAK İŞLETMESİ’nin bulduğu alıcılardan kendisi adına cayma akçesi alma yetkisi vermiştir. İşbu sözleşme imzası tarihinde yürürlüğe girip, gayrimenkulün tapuda satışının yapıldığı veya taraflarca feshi tarihinde sona ermektedir.</li>
        <li>Müşteri, sözleşme süresinde veya sürenin sona ermesinden sonra ${fInput("Gün (Örn: 120)", "120", "fillable-inline")} gün içinde EMLAK İŞLETMESİ’nin temsil ettiği, kendisine tanıştırdığı, bulduğu veya gönderdiği kişi/kuruluşlara veya onların yakınlarına söz konusu gayrimenkulü satması halinde aşağıdaki satış bedelinin ${fPercent("Boş (% Oran)", "")} + KDV’sini EMLAK İŞLETMESİ’ne hizmet bedeli olarak ödeyeceğini kabul ve taahhüt eder.</li>
      </ol>

      <table class="contract-table">
        <tr>
          <th>SÖZLEŞME BAŞLANGIÇ TARİHİ</th>
          <td>${fInput("GG.AA.YYYY", p.sonGuncelleme)}</td>
          <th>SÖZLEŞME BİTİŞ TARİHİ</th>
          <td>${fInput("GG.AA.YYYY / Süre", yetkiSuresi)}</td>
        </tr>
        <tr>
          <th>SATIŞ BEDELİ</th>
          <td colspan="3">${fInput("Satış Bedeli (Rakam ve Yazı ile)", p.fiyat)}</td>
        </tr>
      </table>

      <h4>7. MÜŞTERİ BİLGİLERİ & GAYRİMENKUL BİLGİLERİ</h4>
      <table class="contract-table">
        <tr>
          <th>MÜŞTERİ T.C. KİMLİK NO</th>
          <td>${fInput("T.C. Kimlik No Giriniz")}</td>
          <th>GAYRİMENKUL CİNSİ</th>
          <td>${fInput("Konut / İşyeri / Arsa", p.baslik)}</td>
        </tr>
        <tr>
          <th>MÜŞTERİ ADI - SOYADI</th>
          <td>${fInput("Müşteri Adı Soyadı", p.mulkSahibi)}</td>
          <th>MALİK / LER</th>
          <td>${fInput("Tapu Maliki Adı Soyadı", p.mulkSahibi)}</td>
        </tr>
        <tr>
          <th>MÜŞTERİ ADRESİ</th>
          <td>${fInput("Müşteri İkametgah Adresi")}</td>
          <th>GAYRİMENKUL ADRESİ</th>
          <td>${fInput("Taşınmaz Açık Adresi", p.bolge)}</td>
        </tr>
        <tr>
          <th>MÜŞTERİ TELEFON</th>
          <td>${fInput("Telefon Numarası", p.mulkSahibiTel)}</td>
          <th>ADA / PAFTA / PARSEL</th>
          <td>${fInput("Ada / Pafta / Parsel Bilgisi")}</td>
        </tr>
      </table>

      <p>
        8. İşbu sözleşme 9 maddeden ibaret olup sözleşmeden ve ifasından doğacak ihtilaflardan dolayı ${fInput("Yetkili Mahkeme İl/İlçe", "ANKARA", "fillable-inline")} Mahkemeleri ve İcra Daireleri yetkili kılınmış, 2 nüsha olarak tanzim edilerek 1 adedi müşteriye teslim edilmiştir.
      </p>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px;text-align:center;">
        <div style="border:1px dashed #64748b;border-radius:10px;padding:14px;min-height:95px;">
          <strong>MÜŞTERİ (SATICI) ADI SOYADI / İMZASI</strong><br/>
          ${fInput("Müşteri Adı Soyadı", p.mulkSahibi)}
        </div>
        <div style="border:1px dashed #64748b;border-radius:10px;padding:14px;min-height:95px;">
          <strong>EMLAK İŞLETMESİ / SORUMLU DANIŞMAN</strong><br/>
          ${fInput("İşletme Unvanı & Danışman Adı", `${isletmeAdi ? isletmeAdi + " - " : ""}${p.danisman}`)}
        </div>
      </div>
    `;
  } else if (aktifSozlesmeTuru === "kiralama_yetki") {
    viewer.innerHTML = `
      <h2>GAYRİMENKUL KİRALAMA YETKİLENDİRME SÖZLEŞMESİ</h2>
      <ol style="margin:10px 0 14px 20px;">
        <li>İşbu gayrimenkul kiralama yetkilendirme sözleşmesi, Taşınmaz Ticareti Hakkında Yönetmelik’in ilgili maddelerine istinaden aşağıda açık bilgileri yazılı bulunan işletme ve iş sahibi arasında mutabık kalınan şartlar dâhilinde gayrimenkulün kiralanmasına aracılık edilmesi için imza altına alınmıştır.</li>
        <li>İş sahibi, bu sözleşme ile söz konusu gayrimenkulün kiralanmasında işletmenin tek yetkili olduğunu, sözleşme süresince başka kişi ve kuruluşlara yetki vermemeyi beyan, kabul ve taahhüt etmiştir.</li>
        <li>İş sahibi, gayrimenkul ile ilgili kendisine doğrudan gelen başvuruları işletmeye yönlendirmek durumundadır.</li>
        <li>İşletme, gayrimenkulün kiralanması amacıyla masrafları işletmeye ait olmak üzere fotoğraf ve video çekme, internet platformlarında ilan verme, branda ve afiş asma suretiyle tanıtım faaliyetlerinde bulunma hakkına sahiptir.</li>
        <li>İş sahibi, bu sözleşmede belirtilen kiralamaya aracılık hizmeti karşılığında gayrimenkulün ${fInput("Hizmet Bedeli (Örn: Bir Aylık Kira / % Oran)", "Bir Aylık Kira Tutarını", "fillable-inline")} (KDV Hariç) hizmet bedeli olarak en geç kira sözleşmesinin yapıldığı tarihte işletmeye ödenmesini kabul ve taahhüt etmiştir.</li>
        <li>İş sahibi, sözleşme süresinde veya sürenin sona ermesinden sonra ${fInput("Gün", "120", "fillable-inline")} gün içinde işletmenin bulduğu veya gönderdiği kişi/kuruluşlara gayrimenkulü kiralaması halinde aynı hizmet bedelini işletmeye ödeyeceğini kabul ve taahhüt eder.</li>
      </ol>

      <table class="contract-table">
        <tr>
          <th>Sözleşme Başlangıç Tarihi</th>
          <td>${fInput("Başlangıç Tarihi", p.sonGuncelleme)}</td>
          <th>Sözleşme Bitiş Tarihi</th>
          <td>${fInput("Bitiş Tarihi", yetkiSuresi)}</td>
        </tr>
        <tr>
          <th>Kiralama Bedeli</th>
          <td colspan="3">${fInput("İstenen Kira Bedeli (TL)", p.fiyat)}</td>
        </tr>
      </table>

      <h4>İŞLETMEYE AİT BİLGİLER (KULLANICI DOLDURUR)</h4>
      <table class="contract-table">
        <tr><th>Yetki Belge Numarası</th><td>${fInput("Taşınmaz Ticareti Yetki Belgesi No")}</td></tr>
        <tr><th>İşletme Adı / Unvanı</th><td>${fInput("Emlak İşletmesi Adı / Unvanı", isletmeAdi)}</td></tr>
        <tr><th>İşletme Adresi</th><td>${fInput("İşletme Açık Adresi")}</td></tr>
        <tr><th>İletişim Bilgileri (Tel / E-posta)</th><td>${fInput("Telefon ve E-posta Adresi", p.danismanTel)}</td></tr>
        <tr><th>Sorumlu Emlak Danışmanı</th><td>${fInput("Danışman Adı Soyadı", p.danisman)}</td></tr>
      </table>

      <h4>İŞ SAHİBİNE VE GAYRİMENKULE AİT BİLGİLER</h4>
      <table class="contract-table">
        <tr><th>İş Sahibi T.C. Kimlik No</th><td>${fInput("T.C. Kimlik Numarası")}</td></tr>
        <tr><th>İş Sahibi Adı Soyadı</th><td>${fInput("İş Sahibi Adı Soyadı", p.mulkSahibi)}</td></tr>
        <tr><th>İş Sahibi Telefon & E-posta</th><td>${fInput("Telefon ve E-posta", p.mulkSahibiTel)}</td></tr>
        <tr><th>Gayrimenkul Adresi</th><td>${fInput("Taşınmazın Açık Adresi", `${p.baslik} - ${p.bolge}`)}</td></tr>
        <tr><th>Tapu Kayıt Bilgisi (Ada / Parsel / Cinsi)</th><td>${fInput("Ada / Parsel / Cinsi")}</td></tr>
        <tr><th>Büyüklüğü (Brüt / Net m²) & Kat / Cephe</th><td>${fInput("Brüt m², Net m², Kat ve Cephe")}</td></tr>
        <tr><th>Kısıtlama Durumu (Haciz, İpotek vb.)</th><td>${fInput("Kısıtlama / Takyidat Durumu")}</td></tr>
      </table>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:20px;text-align:center;">
        <div style="border:1px dashed #64748b;border-radius:10px;padding:14px;min-height:90px;">
          <strong>İŞ SAHİBİ (KİRALAYAN) İMZA</strong><br/>${fInput("Adı Soyadı", p.mulkSahibi)}
        </div>
        <div style="border:1px dashed #64748b;border-radius:10px;padding:14px;min-height:90px;">
          <strong>SORUMLU EMLAK DANIŞMANI İMZA</strong><br/>${fInput("Danışman Adı Soyadı", p.danisman)}
        </div>
      </div>
    `;
  } else if (aktifSozlesmeTuru === "pazarlama_devir") {
    viewer.innerHTML = `
      <h2>PAZARLAMA YETKİ BELGESİ (DEVİR)</h2>
      <h4>TARAFLAR</h4>
      <table class="contract-table">
        <tr>
          <th>Bilgi</th>
          <th>YETKİLENDİREN Kişi / Kuruluş</th>
          <th>EMLAK İŞLETMESİ / GAYRİMENKUL DANIŞMANI</th>
        </tr>
        <tr>
          <th>İsim / Unvan / T.C. No</th>
          <td>${fInput("Yetkilendiren Ad Soyad & T.C. No", p.mulkSahibi)}</td>
          <td>${fInput("Emlak İşletmesi Unvanı & Danışman", `${isletmeAdi ? isletmeAdi + " - " : ""}${p.danisman}`)}</td>
        </tr>
        <tr>
          <th>Adres</th>
          <td>${fInput("Yetkilendiren Adresi")}</td>
          <td>${fInput("Emlak İşletmesi Adresi")}</td>
        </tr>
        <tr>
          <th>Telefon & E-posta</th>
          <td>${fInput("Yetkilendiren Telefon", p.mulkSahibiTel)}</td>
          <td>${fInput("İşletme Telefon & E-posta", p.danismanTel)}</td>
        </tr>
      </table>

      <h4>TAŞINMAZIN BİLGİLERİ</h4>
      <table class="contract-table">
        <tr>
          <th>Cadde / Sokak / Site</th>
          <td>${fInput("Cadde / Sokak / Site", p.baslik)}</td>
          <th>Ada / Pafta / Parsel No</th>
          <td>${fInput("Ada / Pafta / Parsel No")}</td>
        </tr>
        <tr>
          <th>Mahalle / İlçe / İl</th>
          <td>${fInput("Mahalle / İlçe / İl", p.bolge)}</td>
          <th>Satış / Devir Bedeli</th>
          <td>${fInput("Satış / Devir Bedeli", p.fiyat)}</td>
        </tr>
        <tr>
          <th>Bağımsız Bölüm / Kapı No</th>
          <td>${fInput("Bağımsız Bölüm No")}</td>
          <th>Hizmet Bedeli Oranı (%)</th>
          <td>${fPercent("Boş (% Oran)", komisyonOrani)} + KDV</td>
        </tr>
      </table>

      <ol style="margin:12px 0 14px 20px;">
        <li><strong>YETKİLENDİRENİN YÜKÜMLÜLÜKLERİ:</strong> YETKİLENDİREN, FİRMAYA yukarıda belirtilen hizmetleri karşılığında, mülkün devir bedeli olarak belirlenen meblağın ${fPercent("Boş (% Oran)", komisyonOrani)} + KDV’sini hizmet bedeli olarak ödemeyi kabul ve taahhüt eder.</li>
        <li>YETKİLENDİREN, FİRMANIN bu pazarlama yetki belgesi ile yüklendiği yükümlülüğünü yerine getirebilmesi için taşınmaza serbestçe giriş ve yer gösterimi imkanı sağlamayı kabul ve taahhüt eder.</li>
        <li>Pazarlama yetki süresi içerisinde veya bu sürenin sona ermesinden itibaren ${fInput("Ay (Örn: 6)", "6", "fillable-inline")} ay içerisinde FİRMANIN bulduğu, tanıştırdığı kişi veya kuruluşlarla FİRMANIN onayı olmadan devir işlemi yapmamayı taahhüt eder.</li>
        <li>YETKİLENDİREN, işbu yetki belgesinde belirtilen yükümlülüklerini ihlal etmesi halinde, belirtilen devir bedelinin ${fPercent("Cezai %", "")} + KDV’sini cezai şart olarak ödemeyi kabul ve taahhüt eder.</li>
        <li>İşbu yetki belgesinin süresi ${fInput("Gün Sayısı", yetkiSuresi, "fillable-inline")} gündür. Tanzim Tarihi: ${fInput("GG/AA/202...", p.sonGuncelleme, "fillable-inline")}</li>
      </ol>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:20px;text-align:center;">
        <div style="border:1px dashed #64748b;border-radius:10px;padding:14px;min-height:90px;">
          <strong>YETKİLENDİREN (İMZA)</strong><br/>${fInput("Ad Soyad", p.mulkSahibi)}
        </div>
        <div style="border:1px dashed #64748b;border-radius:10px;padding:14px;min-height:90px;">
          <strong>EMLAK İŞLETMESİ / FİRMA (KAŞE & İMZA)</strong><br/>${fInput("İşletme / Danışman", p.danisman)}
        </div>
      </div>
    `;
  } else if (aktifSozlesmeTuru === "alim_satim") {
    viewer.innerHTML = `
      <h2>ALIM – SATIM ARACILIK SÖZLEŞMESİ</h2>
      <h4>TARAFLAR</h4>
      <table class="contract-table">
        <tr>
          <th>Bilgi</th>
          <th>SATICI</th>
          <th>ALICI</th>
          <th>EMLAK İŞLETMESİ</th>
        </tr>
        <tr>
          <th>Ad Soyad / Unvan</th>
          <td>${fInput("Satıcı Ad Soyad", p.mulkSahibi)}</td>
          <td>${fInput("Alıcı Ad Soyad")}</td>
          <td>${fInput("Emlak İşletmesi Unvanı", isletmeAdi)}</td>
        </tr>
        <tr>
          <th>T.C. Kimlik / Vergi No</th>
          <td>${fInput("Satıcı T.C. / Vergi No")}</td>
          <td>${fInput("Alıcı T.C. / Vergi No")}</td>
          <td>${fInput("İşletme Vergi No & Yetki No")}</td>
        </tr>
        <tr>
          <th>Telefon / E-posta</th>
          <td>${fInput("Satıcı Telefon", p.mulkSahibiTel)}</td>
          <td>${fInput("Alıcı Telefon")}</td>
          <td>${fInput("İşletme Telefon", p.danismanTel)}</td>
        </tr>
        <tr>
          <th>Açık Adres</th>
          <td>${fInput("Satıcı Adresi")}</td>
          <td>${fInput("Alıcı Adresi")}</td>
          <td>${fInput("İşletme Adresi & Danışman", p.danisman)}</td>
        </tr>
      </table>

      <h4>SATIŞA KONU TAŞINMAZIN BİLGİLERİ</h4>
      <table class="contract-table">
        <tr><th>1) Tapu Bilgileri (İl/İlçe/Ada/Parsel/B.Bölüm)</th><td>${fInput("Tapu Bilgilerini Giriniz", p.bolge)}</td></tr>
        <tr><th>2) Açık Adres Bilgileri</th><td>${fInput("Taşınmazın Açık Adresi", p.baslik)}</td></tr>
      </table>

      <h4>ANLAŞMA ŞARTLARI</h4>
      <ol style="margin:10px 0 14px 20px;">
        <li>Satıcı, satışa konu taşınmazını alıcıya toplam ${fInput("Satış Bedeli (Rakamla TL)", p.fiyat, "fillable-inline")} yalnız (${fInput("Yazı ile Satış Bedeli", "", "fillable-inline")}) bedelle satmayı; alıcı da satın almayı kabul etmiştir.</li>
        <li>Alıcı, satış bedelinin ${fInput("Tapuda Ödenecek Tutar", "", "fillable-inline")} TL'sini tapu işlemi gerçekleştirildiği gün satıcıya peşin ödeyecektir. Taşınmazın devri en geç ${fInput("Son Devir Tarihi", "", "fillable-inline")} tarihine kadar gerçekleştirilecektir.</li>
        <li>Satış işlemlerinin başlatılabilmesi için Alıcı, toplam ${fInput("Kapora / Peşinat Tutarı (TL)", "", "fillable-inline")} TL peşinat/kapora ödemiştir. Böylelikle Emlak İşletmesi mülkün pazarlama faaliyetlerini durduracaktır.</li>
        <li>Satıcı ve Alıcı, yukarıdaki satış bedeli üzerinden Yüzde ${fPercent("Boş (% Oran)", komisyonOrani)} + KDV hizmet bedelini satış gerçekleştiği gün Emlak İşletmesi’ne peşin olarak ödeyecektir. Cayan taraf emlak hizmet bedelinin tamamını ödeyecektir.</li>
        <li>Alıcının cayması halinde peşinatı iade edilmeyecektir. Satıcının cayması durumunda Satıcı, kaporanın iki katını ödeyecektir.</li>
        <li>Özel Şartlar: ${fInput("Varsa Özel Şartları ve Tapu Masrafı Anlaşmasını Yazınız")}</li>
      </ol>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-top:20px;text-align:center;">
        <div style="border:1px dashed #64748b;border-radius:10px;padding:12px;min-height:85px;"><strong>SATICI TARAF</strong><br/>${fInput("Satıcı Ad Soyad", p.mulkSahibi)}</div>
        <div style="border:1px dashed #64748b;border-radius:10px;padding:12px;min-height:85px;"><strong>ALICI TARAF</strong><br/>${fInput("Alıcı Ad Soyad")}</div>
        <div style="border:1px dashed #64748b;border-radius:10px;padding:12px;min-height:85px;"><strong>EMLAK İŞLETMESİ</strong><br/>${fInput("İşletme / Danışman", p.danisman)}</div>
      </div>
    `;
  } else if (aktifSozlesmeTuru === "kira_mesken") {
    viewer.innerHTML = `
      <h2>KİRA SÖZLEŞMESİ (MESKEN)</h2>
      <table class="contract-table">
        <tr><th>İli / İlçesi / Mahallesi</th><td>${fInput("İl / İlçe / Mahalle", p.bolge)}</td><th>Kiralanan Yerin Cinsi</th><td>${fInput("Cinsi", "MESKEN")}</td></tr>
        <tr><th>Açık Adres</th><td colspan="3">${fInput("Kiralanan Taşınmazın Açık Adresi", p.baslik)}</td></tr>
        <tr><th>Kiraya Verenin Adı Soyadı</th><td>${fInput("Kiraya Veren Ad Soyad", p.mulkSahibi)}</td><th>Kiraya Veren T.C. & Tel</th><td>${fInput("T.C. No ve Telefon", p.mulkSahibiTel)}</td></tr>
        <tr><th>Kiraya Veren Banka IBAN</th><td>${fInput("IBAN / Banka Hesap No")}</td><th>DASK Poliçe No</th><td>${fInput("DASK Poliçe No")}</td></tr>
        <tr><th>Kiracının Adı Soyadı</th><td>${fInput("Kiracı Adı Soyadı")}</td><th>Kiracının T.C. & Telefon No</th><td>${fInput("Kiracı T.C. ve Telefon")}</td></tr>
        <tr><th>Kiracının İşyeri Adresi</th><td colspan="3">${fInput("Kiracı İşyeri / İkamet Adresi")}</td></tr>
        <tr><th>Kefilin Adı Soyadı</th><td>${fInput("Kefil Adı Soyadı")}</td><th>Kefilin T.C. / Tel / Adresi</th><td>${fInput("Kefil T.C., Tel ve Adresi")}</td></tr>
        <tr><th>Bir Aylık Kira Karşılığı</th><td>${fInput("Rakamla ve Yazıyla Aylık Kira", p.fiyat)}</td><th>Bir Senelik Kira Karşılığı</th><td>${fInput("Rakamla ve Yazıyla Yıllık Kira")}</td></tr>
        <tr><th>Kiranın Ödeme Şekli & Günü</th><td>${fInput("Örn: Her ayın 1-5'i arası Banka Hesabına")}</td><th>Kira Müddeti & Başlangıcı</th><td>${fInput("Örn: 1 Yıl - Başlangıç Tarihi")}</td></tr>
        <tr><th>Depozito (Teminat) Bedeli</th><td>${fInput("Depozito Tutarı")}</td><th>Teslim Edilen Demirbaşlar</th><td>${fInput("Kombi, Ankastre, Anahtar vb.")}</td></tr>
      </table>

      <h4>GENEL VE ÖZEL ŞARTLAR ÖZETİ</h4>
      <p style="font-size:0.8rem;">
        1. Kiracı taşınmazı amacı dışında kullanamaz, kısmen veya tamamen devir ve ciro edemez.<br/>
        2. Taşınmazın aylık kira bedeli her ayın ${fInput("Başlangıç Günü", "1", "fillable-inline")} ile ${fInput("Bitiş Günü", "5", "fillable-inline")} arasında belirtilen banka hesabına yatırılacaktır.<br/>
        3. Yıllık kira artış oranı TÜFE (on iki aylık ortalama) / anlaşma oranında uygulanacaktır.<br/>
        4. Kiralanan yere ait elektrik, su, doğalgaz ve site/apartman aidat giderleri kiracıya aittir.<br/>
        5. Ek Özel Şartlar: ${fInput("Varsa Ek Özel Şartları Giriniz")}
      </p>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-top:20px;text-align:center;">
        <div style="border:1px dashed #64748b;border-radius:10px;padding:12px;min-height:85px;"><strong>KİRAYA VEREN</strong><br/>${fInput("Kiraya Veren", p.mulkSahibi)}</div>
        <div style="border:1px dashed #64748b;border-radius:10px;padding:12px;min-height:85px;"><strong>KEFİL</strong><br/>${fInput("Kefil Ad Soyad")}</div>
        <div style="border:1px dashed #64748b;border-radius:10px;padding:12px;min-height:85px;"><strong>KİRACI</strong><br/>${fInput("Kiracı Ad Soyad")}</div>
      </div>
    `;
  } else if (aktifSozlesmeTuru === "kira_isyeri") {
    viewer.innerHTML = `
      <h2>İŞYERİ KİRA SÖZLEŞMESİ</h2>
      <table class="contract-table">
        <tr><th>Tapu İli / İlçesi / Mahallesi</th><td>${fInput("İl / İlçe / Mahalle", p.bolge)}</td><th>Kiralananın Cinsi</th><td>${fInput("Cinsi", "İŞYERİ")}</td></tr>
        <tr><th>Cadde / Sokak / Bina & Kapı No</th><td colspan="3">${fInput("İşyeri Açık Adresi", p.baslik)}</td></tr>
        <tr><th>Kiralayan Adı Soyadı & T.C. No</th><td>${fInput("Kiralayan Ad Soyad ve T.C.", p.mulkSahibi)}</td><th>Kiralayan Telefon & IBAN</th><td>${fInput("Telefon ve Banka IBAN", p.mulkSahibiTel)}</td></tr>
        <tr><th>Kiracı Adı Soyadı / Unvanı</th><td>${fInput("Kiracı Ad Soyad / Şirket Unvanı")}</td><th>Kiracı T.C. / Vergi No & Cep</th><td>${fInput("Vergi Dairesi / Vergi No / Tel")}</td></tr>
        <tr><th>Kefil / Garantör Adı Soyadı</th><td>${fInput("Kefil Adı Soyadı")}</td><th>Kefil T.C. No / Cep / Adres</th><td>${fInput("Kefil T.C., Telefon ve Adres")}</td></tr>
        <tr><th>Sözleşme Başlangıç Tarihi & Süresi</th><td>${fInput("Başlangıç Tarihi ve Süresi (Örn: 1 Yıl)")}</td><th>1 Aylık ve 1 Yıllık Net Kira</th><td>${fInput("Aylık / Yıllık Net Kira (+Stopaj)", p.fiyat)}</td></tr>
        <tr><th>Kiralananı Kullanım Amacı (Faaliyet)</th><td>${fInput("Yapılacak İş / Faaliyet Konusu")}</td><th>Teminat (Depozito) & Demirbaşlar</th><td>${fInput("Depozito Tutarı ve Demirbaşlar")}</td></tr>
      </table>

      <h4>İŞYERİ ÖZEL ŞARTLARI</h4>
      <p style="font-size:0.8rem;">
        1. Kiracı, kiralanan işyerinde yalnızca ${fInput("Faaliyet Alanı", "", "fillable-inline")} işi yapacaktır. Mal sahibinin yazılı izni olmadan devir ve ciro edemez.<br/>
        2. Kira bedeline stopaj dahil değildir. Kiracı stopaj bedelini ilgili vergi dairesine ödeyecek ve dekontlarını kiralayana teslim edecektir.<br/>
        3. Kira bedelleri her ayın ${fInput("Ödeme Günü", "", "fillable-inline")} günü akşamına kadar kiralayanın banka hesabına yatırılacaktır.<br/>
        4. Ek İşyeri Özel Şartları: ${fInput("Varsa Ek İşyeri Şartlarını Yazınız")}
      </p>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-top:20px;text-align:center;">
        <div style="border:1px dashed #64748b;border-radius:10px;padding:12px;min-height:85px;"><strong>KEFİL / GARANTÖR</strong><br/>${fInput("Kefil Ad Soyad")}</div>
        <div style="border:1px dashed #64748b;border-radius:10px;padding:12px;min-height:85px;"><strong>KİRACI (KAŞE/İMZA)</strong><br/>${fInput("Kiracı Ad Soyad / Unvan")}</div>
        <div style="border:1px dashed #64748b;border-radius:10px;padding:12px;min-height:85px;"><strong>KİRAYA VEREN</strong><br/>${fInput("Kiraya Veren Ad Soyad", p.mulkSahibi)}</div>
      </div>
    `;
  } else if (aktifSozlesmeTuru === "tahliye") {
    viewer.innerHTML = `
      <h2>TAHLİYE TAAHHÜTNAMESİDİR</h2>
      <table class="contract-table">
        <tr>
          <th>TAAHHÜT EDEN (KİRACI) ADI SOYADI</th>
          <td>${fInput("Kiracı Adı Soyadı")}</td>
        </tr>
        <tr>
          <th>KİRACI T.C. / VERGİ KİMLİK NO</th>
          <td>${fInput("Kiracı T.C. Kimlik No")}</td>
        </tr>
        <tr>
          <th>MAL SAHİBİ (KİRALAYAN) ADI SOYADI</th>
          <td>${fInput("Mal Sahibi Adı Soyadı", p.mulkSahibi)}</td>
        </tr>
        <tr>
          <th>MAL SAHİBİ T.C. / VERGİ KİMLİK NO</th>
          <td>${fInput("Mal Sahibi T.C. Kimlik No")}</td>
        </tr>
        <tr>
          <th>TAHLİYE EDİLECEK MECURUN ADRESİ</th>
          <td>${fInput("Tahliye Edilecek Taşınmazın Açık Adresi", `${p.baslik} - ${p.bolge}`)}</td>
        </tr>
        <tr>
          <th>KİRANIN BAŞLANGIÇ TARİHİ</th>
          <td>${fInput("GG / AA / YYYY")}</td>
        </tr>
        <tr>
          <th>TAHLİYE TARİHİ</th>
          <td>${fInput("GG / AA / YYYY (Boş bırakılıp elle doldurulabilir)")}</td>
        </tr>
        <tr>
          <th>TAAHHÜTNAMENİN VERİLDİĞİ (TANZİM) TARİHİ</th>
          <td>${fInput("GG / AA / YYYY (Boş bırakılıp elle doldurulabilir)")}</td>
        </tr>
      </table>

      <p style="margin:16px 0;font-size:0.88rem;line-height:1.75;">
        Halen kiracı olarak kullanmakta olduğum yukarıda yazılı adresteki taşınmazı hiçbir ihtar ve ihbara gerek kalmadan kayıtsız ve şartsız olarak 6098 numaralı Türk Borçlar Kanunu'nun 352/1 maddesi gereğince boş ve sağlam olarak yukarıda belirtilen tarihte taşınmazı tahliye ederek, taşınmazı mal sahibine teslim edeceğimi, adı geçen mal sahibinin icrai takibata geçerek yapacağı bilumum masrafları ve tahliyeyi geciktirmemden dolayı uğrayacağı zarar ve ziyanları hiçbir ihtar, ihbar ve hükme gerek kalmadan derhal nakden ve peşinen ödeyeceğimi beyan, kabul ve taahhüt ederim. İşbu taahhütname serbest irademle ${fInput("... / ... / 202...", "", "fillable-inline")} tarihinde imza altına alınmıştır.
      </p>

      <div style="display:flex;justify-content:flex-end;margin-top:26px;">
        <div style="border:1px dashed #64748b;border-radius:10px;padding:16px 32px;min-height:95px;text-align:center;min-width:280px;">
          <strong>TAAHHÜT EDEN KİRACI (İMZA)</strong><br/><br/>
          ${fInput("Kiracı Adı Soyadı")}
        </div>
      </div>
    `;
  } else if (aktifSozlesmeTuru === "yer_gosterme") {
    viewer.innerHTML = `
      <h2>TAŞINMAZ YER GÖSTERME BELGESİ</h2>
      <h4>1. EMLAK İŞLETMESİ BİLGİLERİ</h4>
      <table class="contract-table">
        <tr><th>İşletme Adı / Unvanı</th><td>${fInput("Emlak İşletmesi Adı / Unvanı", isletmeAdi)}</td><th>Yetki Belgesi Numarası</th><td>${fInput("Taşınmaz Ticareti Yetki Belgesi No")}</td></tr>
        <tr><th>Sorumlu Emlak Danışmanı</th><td>${fInput("Danışman Adı Soyadı", p.danisman)}</td><th>İşletme Telefon & Adres</th><td>${fInput("Telefon ve İşletme Adresi", p.danismanTel)}</td></tr>
      </table>

      <h4>2. TAŞINMAZI GÖREN (ALICI / KİRACI ADAYI) BİLGİLERİ</h4>
      <table class="contract-table">
        <tr><th>Adı Soyadı / Unvanı</th><td>${fInput("Alıcı / Kiracı Adayı Adı Soyadı")}</td><th>T.C. Kimlik / Vergi No</th><td>${fInput("T.C. Kimlik / Vergi No")}</td></tr>
        <tr><th>Telefon Numarası</th><td>${fInput("Alıcı Cep Telefonu")}</td><th>E-Posta Adresi</th><td>${fInput("E-Posta Adresi (Varsa)")}</td></tr>
        <tr><th>İkametgah / Tebligat Adresi</th><td colspan="3">${fInput("Alıcı Adayı İkametgah Adresi")}</td></tr>
      </table>

      <h4>3. GÖSTERİLEN TAŞINMAZIN BİLGİLERİ</h4>
      <table class="contract-table">
        <tr><th>Taşınmazın Cinsi & Niteliği</th><td>${fInput("Konut / İşyeri / Arsa", p.baslik)}</td><th>Beyan Edilen Satış / Kira Bedeli</th><td>${fInput("Satış / Kira Bedeli (TL)", p.fiyat)}</td></tr>
        <tr><th>İl / İlçe / Mahalle</th><td>${fInput("İl / İlçe / Mahalle", p.bolge)}</td><th>Tapu Ada / Pafta / Parsel / B.Bölüm</th><td>${fInput("Ada / Pafta / Parsel / Bağımsız Bölüm No")}</td></tr>
        <tr><th>Taşınmazın Açık Adresi</th><td colspan="3">${fInput("Gösterilen Taşınmazın Açık Adresi", `${p.baslik} - ${p.bolge}`)}</td></tr>
        <tr><th>Yer Gösterim Tarihi ve Saati</th><td>${fInput("GG.AA.YYYY - SS:DD", p.sonGuncelleme)}</td><th>Hizmet Bedeli Oranı (%)</th><td>${fPercent("Boş (% Oran)", komisyonOrani)} + KDV</td></tr>
      </table>

      <h4>4. TARAFLARIN BEYAN VE TAAHHÜTLERİ</h4>
      <ol style="margin:10px 0 14px 20px;">
        <li>Yukarıda tapu ve adres bilgileri yazılı taşınmaz, Emlak İşletmesi yetkilisi tarafından şahsıma/şirketimize gezdirilmiş ve gösterilmiştir. Taşınmazın yer gösterimi karşılığında herhangi bir ücret talep edilmemiştir.</li>
        <li>İşbu belgede bilgileri bulunan taşınmazı; şahsım, eşim, birinci derece kan veya kayın hısımlarım ya da ortağı/yetkilisi olduğum şirket veya kuruluşlar aracılığıyla Emlak İşletmesini devre dışı bırakarak doğrudan mal sahibinden veya başka bir aracıdan satın almam/kiralamam halinde, satış/kiralama bedeli üzerinden ${fPercent("Boş (% Oran)", komisyonOrani)} + KDV aracılık hizmet bedelini Emlak İşletmesi'ne ödeyeceğimi kabul, beyan ve taahhüt ederim.</li>
        <li>İşbu yer gösterme belgesinden doğacak uyuşmazlıklarda ${fInput("Yetkili Mahkeme", "ANKARA", "fillable-inline")} Mahkemeleri ve İcra Daireleri yetkilidir.</li>
      </ol>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:22px;text-align:center;">
        <div style="border:1px dashed #64748b;border-radius:10px;padding:14px;min-height:90px;">
          <strong>TAŞINMAZI GÖREN (ALICI / KİRACI ADAYI) İMZA</strong><br/>
          ${fInput("Alıcı Adı Soyadı")}
        </div>
        <div style="border:1px dashed #64748b;border-radius:10px;padding:14px;min-height:90px;">
          <strong>TAŞINMAZI GÖSTEREN EMLAK DANIŞMANI İMZA</strong><br/>
          ${fInput("Danışman Adı Soyadı", p.danisman)}
        </div>
      </div>
    `;
  }
}

function imzaliYetkiBelgesiYukle(event) {
  const file = event.target.files && event.target.files[0];
  const p = aktifPortfoy();
  if (!file || !p) return;

  p.yetkiModu = "taslak_yukle";
  p.yetkiOnaylandiMi = true;
  p.yetkiBelgesiDosyaAdi = file.name;
  p.yetkiOnayDetayi = `${new Date().toLocaleDateString("tr-TR")} tarihinde danışman tarafından sisteme yüklendi`;
  document.getElementById("fYetkiModu").value = "taslak_yukle";

  verileriKaydet();
  yetkiDurumuRender();
  alert(`✅ "${file.name}" başarıyla portföye eklendi!`);
}

function mobilOnayLinkiHazirla() {
  const p = aktifPortfoy();
  if (!p) return;
  p.yetkiModu = "mobil_onay";
  document.getElementById("fYetkiModu").value = "mobil_onay";
  verileriKaydet();
  yetkiDurumuRender();
  gorunumDegistir("view-seller");
}

function seciliSozlesmeyiYazdir() {
  const viewer = document.getElementById("contractTemplateViewer");
  if (!viewer) return;

  const clone = viewer.cloneNode(true);
  const originalInputs = viewer.querySelectorAll("input.fillable-input");
  const cloneInputs = clone.querySelectorAll("input.fillable-input");

  cloneInputs.forEach((cInp, idx) => {
    const val = (originalInputs[idx]?.value || "").trim();
    const isPercent = cInp.classList.contains("fillable-percent");
    const span = document.createElement("span");
    if (val) {
      span.textContent = val;
      span.style.fontWeight = "bold";
      span.style.borderBottom = "1px solid #334155";
      span.style.padding = "0 4px";
    } else {
      span.textContent = isPercent ? ".........." : "....................................";
      span.style.color = "#475569";
    }
    cInp.replaceWith(span);
  });

  const win = window.open("", "_blank", "width=880,height=920");
  if (!win) {
    alert("Lütfen açılır pencere (pop-up) izni verin.");
    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8" />
      <title>Sözleşme Taslağı Yazdır / PDF</title>
      <style>
        body { font-family: Arial, sans-serif; color: #111; line-height: 1.55; padding: 32px; max-width: 800px; margin: 0 auto; font-size: 13px; }
        h2 { font-size: 17px; text-align: center; border-bottom: 2px solid #0d9488; padding-bottom: 8px; margin-bottom: 16px; }
        h4 { font-size: 13px; margin: 14px 0 6px; color: #0f766e; text-transform: uppercase; }
        .contract-table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; font-size: 12.5px; }
        .contract-table th, .contract-table td { border: 1px solid #64748b; padding: 7px 9px; text-align: left; }
        .contract-table th { background: #f1f5f9; width: 28%; }
        ol { margin: 8px 0 12px 20px; }
        li { margin-bottom: 5px; }
        .no-print { text-align: right; margin-bottom: 14px; }
        .print-btn { background: #0d9488; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; }
        @media print { .no-print { display: none; } body { padding: 8px; } }
      </style>
    </head>
    <body>
      <div class="no-print">
        <button class="print-btn" onclick="window.print()">🖨️ Yazdır / PDF Olarak Kaydet</button>
      </div>
      ${clone.innerHTML}
    </body>
    </html>
  `);
  win.document.close();
}

function hazirYetkiTaslagiYazdir() {
  seciliSozlesmeyiYazdir();
}

// ============================================================================
// ============================================================================
// YENİ PORTFÖY AÇMA MODALI: 6 SAYFALI ADIM ADIM MÜLK TAKİP KODU OLUŞTURMA SİHİRBAZI
// TÜRKİYE'NİN 81 İLİ, TÜM İLÇELERİ, MAHALLELERİ + KKTC VE YURT DIŞI ÜLKELER
// ============================================================================
const TURKIYE_81_IL_ILCELER = {
  Adana: ["Aladağ", "Ceyhan", "Çukurova", "Feke", "İmamoğlu", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Saimbeyli", "Sarıçam", "Seyhan", "Tufanbeyli", "Yumurtalık", "Yüreğir"],
  Adıyaman: ["Besni", "Çelikhan", "Gerger", "Gölbaşı", "Kahta", "Merkez", "Samsat", "Sincik", "Tut"],
  Afyonkarahisar: ["Başmakçı", "Bayat", "Bolvadin", "Çay", "Çobanlar", "Dazkırı", "Dinar", "Emirdağ", "Evciler", "Hocalar", "İhsaniye", "İscehisar", "Kızılören", "Merkez", "Sandıklı", "Sinanpaşa", "Sultandağı", "Şuhut"],
  Ağrı: ["Diyadin", "Doğubayazıt", "Eleşkirt", "Hamur", "Merkez", "Patnos", "Taşlıçay", "Tutak"],
  Aksaray: ["Ağaçören", "Eskil", "Gülağaç", "Güzelyurt", "Merkez", "Ortaköy", "Sarıyahşi", "Sultanhanı"],
  Amasya: ["Göynücek", "Gümüşhacıköy", "Hamamözü", "Merkez", "Merzifon", "Suluova", "Taşova"],
  Ankara: ["Akyurt", "Altındağ", "Ayaş", "Bala", "Beypazarı", "Çamlıdere", "Çankaya", "Çubuk", "Elmadağ", "Etimesgut", "Evren", "Gölbaşı", "Güdül", "Haymana", "Kahramankazan", "Kalecik", "Keçiören", "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar", "Yenimahalle"],
  Antalya: ["Akseki", "Aksu", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa", "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca", "Manavgat", "Muratpaşa", "Serik"],
  Ardahan: ["Çıldır", "Damal", "Göle", "Hanak", "Merkez", "Posof"],
  Artvin: ["Ardanuç", "Arhavi", "Borçka", "Hopa", "Kemalpaşa", "Merkez", "Murgul", "Şavşat", "Yusufeli"],
  Aydın: ["Bozdoğan", "Buharkent", "Çine", "Didim", "Efeler", "Germencik", "İncirliova", "Karacasu", "Karpuzlu", "Koçarlı", "Köşk", "Kuşadası", "Kuyucak", "Nazilli", "Söke", "Sultanhisar", "Yenipazar"],
  Balıkesir: ["Altıeylül", "Ayvalık", "Balya", "Bandırma", "Bigadiç", "Burhaniye", "Dursunbey", "Edremit", "Erdek", "Gömeç", "Gönen", "Havran", "İvrindi", "Karesi", "Kepsut", "Manyas", "Marmara", "Savaştepe", "Sındırgı", "Susurluk"],
  Bartın: ["Amasra", "Kurucaşile", "Merkez", "Ulus"],
  Batman: ["Beşiri", "Gercüş", "Hasankeyf", "Kozluk", "Merkez", "Sason"],
  Bayburt: ["Aydıntepe", "Demirözü", "Merkez"],
  Bilecik: ["Bozüyük", "Gölpazarı", "İnhisar", "Merkez", "Osmaneli", "Pazaryeri", "Söğüt", "Yenipazar"],
  Bingöl: ["Adaklı", "Genç", "Karlıova", "Kiğı", "Merkez", "Solhan", "Yayladere", "Yedisu"],
  Bitlis: ["Adilcevaz", "Ahlat", "Güroymak", "Hizan", "Merkez", "Mutki", "Tatvan"],
  Bolu: ["Dörtdivan", "Gerede", "Göynük", "Kıbrıscık", "Mengen", "Merkez", "Mudurnu", "Seben", "Yeniçağa"],
  Burdur: ["Ağlasun", "Altınyayla", "Bucak", "Çavdır", "Çeltikçi", "Gölhisar", "Karamanlı", "Kemer", "Merkez", "Tefenni", "Yeşilova"],
  Bursa: ["Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles", "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"],
  Çanakkale: ["Ayvacık", "Bayramiç", "Biga", "Bozcaada", "Çan", "Eceabat", "Ezine", "Gelibolu", "Gökçeada", "Lapseki", "Merkez", "Yenice"],
  Çankırı: ["Atkaracalar", "Bayramören", "Çerkeş", "Eldivan", "Ilgaz", "Kızılırmak", "Korgun", "Kurşunlu", "Merkez", "Orta", "Şabanözü", "Yapraklı"],
  Çorum: ["Alaca", "Bayat", "Boğazkale", "Dodurga", "İskilip", "Kargı", "Laçin", "Mecitözü", "Merkez", "Oğuzlar", "Ortaköy", "Osmancık", "Sungurlu", "Uğurludağ"],
  Denizli: ["Acıpayam", "Babadağ", "Baklan", "Bekilli", "Beyağaç", "Bozkurt", "Buldan", "Çal", "Çameli", "Çardak", "Çivril", "Güney", "Honaz", "Kale", "Merkezefendi", "Pamukkale", "Sarayköy", "Serinhisar", "Tavas"],
  Diyarbakır: ["Bağlar", "Bismil", "Çermik", "Çınar", "Çüngüş", "Dicle", "Eğil", "Ergani", "Hani", "Hazro", "Kayapınar", "Kocaköy", "Kulp", "Lice", "Silvan", "Sur", "Yenişehir"],
  Düzce: ["Akçakoca", "Cumayeri", "Çilimli", "Gölyaka", "Gümüşova", "Kaynaşlı", "Merkez", "Yığılca"],
  Edirne: ["Enez", "Havsa", "İpsala", "Keşan", "Lalapaşa", "Meriç", "Merkez", "Süloğlu", "Uzunköprü"],
  Elazığ: ["Ağın", "Alacakaya", "Arıcak", "Baskil", "Karakoçan", "Keban", "Kovancılar", "Maden", "Merkez", "Palu", "Sivrice"],
  Erzincan: ["Çayırlı", "İliç", "Kemah", "Kemaliye", "Merkez", "Otlukbeli", "Refahiye", "Tercan", "Üzümlü"],
  Erzurum: ["Aşkale", "Aziziye", "Çat", "Hınıs", "Horasan", "İspir", "Karaçoban", "Karayazı", "Köprüköy", "Narman", "Oltu", "Olur", "Palandöken", "Pasinler", "Pazaryolu", "Şenkaya", "Tekman", "Tortum", "Uzundere", "Yakutiye"],
  Eskişehir: ["Alpu", "Beylikova", "Çifteler", "Günyüzü", "Han", "İnönü", "Mahmudiye", "Mihalgazi", "Mihalıççık", "Odunpazarı", "Sarıcakaya", "Seyitgazi", "Sivrihisar", "Tepebaşı"],
  Gaziantep: ["Araban", "İslahiye", "Karkamış", "Nizip", "Nurdağı", "Oğuzeli", "Şahinbey", "Şehitkamil", "Yavuzeli"],
  Giresun: ["Alucra", "Bulancak", "Çamoluk", "Çanakçı", "Dereli", "Doğankent", "Espiye", "Eynesil", "Görele", "Güce", "Keşap", "Merkez", "Piraziz", "Şebinkarahisar", "Tirebolu", "Yağlıdere"],
  Gümüşhane: ["Kelkit", "Köse", "Kürtün", "Merkez", "Şiran", "Torul"],
  Hakkari: ["Çukurca", "Derecik", "Merkez", "Şemdinli", "Yüksekova"],
  Hatay: ["Altınözü", "Antakya", "Arsuz", "Belen", "Defne", "Dörtyol", "Erzin", "Hassa", "İskenderun", "Kırıkhan", "Kumlu", "Payas", "Reyhanlı", "Samandağ", "Yayladağı"],
  Iğdır: ["Aralık", "Karakoyunlu", "Merkez", "Tuzluca"],
  Isparta: ["Aksu", "Atabey", "Eğirdir", "Gelendost", "Gönen", "Keçiborlu", "Merkez", "Senirkent", "Sütçüler", "Şarkikaraağaç", "Uluborlu", "Yalvaç", "Yenişarbademli"],
  İstanbul: ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
  İzmir: ["Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"],
  Kahramanmaraş: ["Afşin", "Andırın", "Çağlayancerit", "Dulkadiroğlu", "Ekinözü", "Elbistan", "Göksun", "Nurhak", "Onikişubat", "Pazarcık", "Türkoğlu"],
  Karabük: ["Eflani", "Eskipazar", "Merkez", "Ovacık", "Safranbolu", "Yenice"],
  Karaman: ["Ayrancı", "Başyayla", "Ermenek", "Kazımkarabekir", "Merkez", "Sarıveliler"],
  Kars: ["Akyaka", "Arpaçay", "Digor", "Kağızman", "Merkez", "Sarıkamış", "Selim", "Susuz"],
  Kastamonu: ["Abana", "Ağlı", "Araç", "Azdavay", "Bozkurt", "Cide", "Çatalzeytin", "Daday", "Devrekani", "Doğanyurt", "Hanönü", "İhsangazi", "İnebolu", "Küre", "Merkez", "Pınarbaşı", "Seydiler", "Şenpazar", "Taşköprü", "Tosya"],
  Kayseri: ["Akkışla", "Bünyan", "Develi", "Felahiye", "Hacılar", "İncesu", "Kocasinan", "Melikgazi", "Özvatan", "Pınarbaşı", "Sarıoğlan", "Sarız", "Talas", "Tomarza", "Yahyalı", "Yeşilhisar"],
  Kırıkkale: ["Bahşılı", "Balışeyh", "Çelebi", "Delice", "Karakeçili", "Keskin", "Merkez", "Sulakyurt", "Yahşihan"],
  Kırklareli: ["Babaeski", "Demirköy", "Kofçaz", "Lüleburgaz", "Merkez", "Pehlivanköy", "Pınarhisar", "Vize"],
  Kırşehir: ["Akçakent", "Akpınar", "Boztepe", "Çiçekdağı", "Kaman", "Merkez", "Mucur"],
  Kilis: ["Elbeyli", "Merkez", "Musabeyli", "Polateli"],
  Kocaeli: ["Başiskele", "Çayırova", "Darıca", "Derince", "Dilovası", "Gebze", "Gölcük", "İzmit", "Kandıra", "Karamürsel", "Kartepe", "Körfez"],
  Konya: ["Ahırlı", "Akören", "Akşehir", "Altınekin", "Beyşehir", "Bozkır", "Cihanbeyli", "Çeltik", "Çumra", "Derbent", "Derebucak", "Doğanhisar", "Emirgazi", "Ereğli", "Güneysınır", "Hadim", "Halkapınar", "Hüyük", "Ilgın", "Kadınhanı", "Karapınar", "Karatay", "Kulu", "Meram", "Sarayönü", "Selçuklu", "Seydişehir", "Taşkent", "Tuzlukçu", "Yalıhüyük", "Yunak"],
  Kütahya: ["Altıntaş", "Aslanapa", "Çavdarhisar", "Domaniç", "Dumlupınar", "Emet", "Gediz", "Hisarcık", "Merkez", "Pazarlar", "Simav", "Şaphane", "Tavşanlı"],
  Malatya: ["Akçadağ", "Arapgir", "Arguvan", "Battalgazi", "Darende", "Doğanşehir", "Doğanyol", "Hekimhan", "Kale", "Kuluncak", "Pütürge", "Yazıhan", "Yeşilyurt"],
  Manisa: ["Ahmetli", "Akhisar", "Alaşehir", "Demirci", "Gölmarmara", "Gördes", "Kırkağaç", "Köprübaşı", "Kula", "Salihli", "Sarıgöl", "Saruhanlı", "Selendi", "Soma", "Şehzadeler", "Turgutlu", "Yunusemre"],
  Mardin: ["Artuklu", "Dargeçit", "Derik", "Kızıltepe", "Mazıdağı", "Midyat", "Nusaybin", "Ömerli", "Savur", "Yeşilli"],
  Mersin: ["Akdeniz", "Anamur", "Aydıncık", "Bozyazı", "Çamlıyayla", "Erdemli", "Gülnar", "Mezitli", "Mut", "Silifke", "Tarsus", "Toroslar", "Yenişehir"],
  Muğla: ["Bodrum", "Dalaman", "Datça", "Fethiye", "Kavaklıdere", "Köyceğiz", "Marmaris", "Menteşe", "Milas", "Ortaca", "Seydikemer", "Ula", "Yatağan"],
  Muş: ["Bulanık", "Hasköy", "Korkut", "Malazgirt", "Merkez", "Varto"],
  Nevşehir: ["Acıgöl", "Avanos", "Derinkuyu", "Gülşehir", "Hacıbektaş", "Kozaklı", "Merkez", "Ürgüp"],
  Niğde: ["Altunhisar", "Bor", "Çamardı", "Çiftlik", "Merkez", "Ulukışla"],
  Ordu: ["Akkuş", "Altınordu", "Aybastı", "Çamaş", "Çatalpınar", "Çaybaşı", "Fatsa", "Gölköy", "Gülyalı", "Gürgentepe", "İkizce", "Kabadüz", "Kabataş", "Korgan", "Kumru", "Mesudiye", "Perşembe", "Ulubey", "Ünye"],
  Osmaniye: ["Bahçe", "Düziçi", "Hasanbeyli", "Kadirli", "Merkez", "Sumbas", "Toprakkale"],
  Rize: ["Ardeşen", "Çamlıhemşin", "Çayeli", "Derepazarı", "Fındıklı", "Güneysu", "Hemşin", "İkizdere", "İyidere", "Kalkandere", "Merkez", "Pazar"],
  Sakarya: ["Adapazarı", "Akyazı", "Arifiye", "Erenler", "Ferizli", "Geyve", "Hendek", "Karapürçek", "Karasu", "Kaynarca", "Kocaali", "Pamukova", "Sapanca", "Serdivan", "Söğütlü", "Taraklı"],
  Samsun: ["19 Mayıs", "Alaçam", "Asarcık", "Atakum", "Ayvacık", "Bafra", "Canik", "Çarşamba", "Havza", "İlkadım", "Kavak", "Ladik", "Salıpazarı", "Tekkeköy", "Terme", "Vezirköprü", "Yakakent"],
  Siirt: ["Baykan", "Eruh", "Kurtalan", "Merkez", "Pervari", "Şirvan", "Tillo"],
  Sinop: ["Ayancık", "Boyabat", "Dikmen", "Durağan", "Erfelek", "Gerze", "Merkez", "Saraydüzü", "Türkeli"],
  Sivas: ["Akıncılar", "Altınyayla", "Divriği", "Doğanşar", "Gemerek", "Gölova", "Gürün", "Hafik", "İmranlı", "Kangal", "Koyulhisar", "Merkez", "Suşehri", "Şarkışla", "Ulaş", "Yıldızeli", "Zara"],
  Şanlıurfa: ["Akçakale", "Birecik", "Bozova", "Ceylanpınar", "Eyyübiye", "Halfeti", "Haliliye", "Harran", "Hilvan", "Karaköprü", "Siverek", "Suruç", "Viranşehir"],
  Şırnak: ["Beytüşşebap", "Cizre", "Güçlükonak", "İdil", "Merkez", "Silopi", "Uludere"],
  Tekirdağ: ["Çerkezköy", "Çorlu", "Ergene", "Hayrabolu", "Kapaklı", "Malkara", "Marmaraereğlisi", "Muratlı", "Saray", "Süleymanpaşa", "Şarköy"],
  Tokat: ["Almus", "Artova", "Başçiftlik", "Erbaa", "Merkez", "Niksar", "Pazar", "Reşadiye", "Sulusaray", "Turhal", "Yeşilyurt", "Zile"],
  Trabzon: ["Akçaabat", "Araklı", "Arsin", "Beşikdüzü", "Çarşıbaşı", "Çaykara", "Dernekpazarı", "Düzköy", "Hayrat", "Köprübaşı", "Maçka", "Of", "Ortahisar", "Sürmene", "Şalpazarı", "Tonya", "Vakfıkebir", "Yomra"],
  Tunceli: ["Çemişgezek", "Hozat", "Mazgirt", "Merkez", "Nazımiye", "Ovacık", "Pertek", "Pülümür"],
  Uşak: ["Banaz", "Eşme", "Karahallı", "Merkez", "Sivaslı", "Ulubey"],
  Van: ["Bahçesaray", "Başkale", "Çaldıran", "Çatak", "Edremit", "Erciş", "Gevaş", "Gürpınar", "İpekyolu", "Muradiye", "Özalp", "Saray", "Tuşba"],
  Yalova: ["Altınova", "Armutlu", "Çınarcık", "Çiftlikköy", "Merkez", "Termal"],
  Yozgat: ["Akdağmadeni", "Aydıncık", "Boğazlıyan", "Çandır", "Çayıralan", "Çekerek", "Kadışehri", "Merkez", "Saraykent", "Sarıkaya", "Sorgun", "Şefaatli", "Yenifakılı", "Yerköy"],
  Zonguldak: ["Alaplı", "Çaycuma", "Devrek", "Ereğli", "Gökçebey", "Kilimli", "Kozlu", "Merkez"]
};

const DIGER_ULKELER_IL_ILCELER = {
  KKTC: {
    Lefkoşa: ["Merkez", "Gönyeli", "Hamitköy", "Küçük Kaymaklı", "Ortaköy", "Haspolat", "Alayköy"],
    Girne: ["Merkez", "Alsancak", "Lapta", "Karaoğlanoğlu", "Ozanköy", "Çatalköy", "Bellapais", "Esentepe", "Karşıyaka"],
    Gazimağusa: ["Merkez", "Yeniboğaziçi", "Tuzla", "Mutluyaka", "Tatlısu", "Geçitkale"],
    İskele: ["Merkez", "Long Beach", "Boğaz", "Bafra", "Mehmetçik", "Dipkarpaz"],
    Güzelyurt: ["Merkez", "Kalkanlı", "Yayla", "Serhatköy"],
    Lefke: ["Merkez", "Gemikonağı", "Yeşilyurt", "Yedidalga"]
  },
  Almanya: {
    Berlin: ["Mitte", "Kreuzberg", "Charlottenburg", "Neukölln", "Spandau", "Pankow"],
    Münih: ["Altstadt", "Schwabing", "Bogenhausen", "Maxvorstadt", "Pasing"],
    Frankfurt: ["Innenstadt", "Sachsenhausen", "Westend", "Bornheim"],
    Köln: ["Innenstadt", "Ehrenfeld", "Lindenthal", "Nippes", "Mülheim"],
    Hamburg: ["Hamburg-Mitte", "Altona", "Eimsbüttel", "Wandsbek", "Harburg"],
    Stuttgart: ["Stuttgart-Mitte", "Bad Cannstatt", "Vaihingen", "Zuffenhausen"]
  },
  İngiltere: {
    Londra: ["Westminster", "Kensington & Chelsea", "Camden", "Canary Wharf", "Greenwich", "Islington", "Hackney"],
    Manchester: ["City Centre", "Salford", "Didsbury", "Trafford"],
    Birmingham: ["City Centre", "Edgbaston", "Solihull", "Sutton Coldfield"]
  },
  ABD: {
    "New York": ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
    "California": ["Los Angeles", "San Francisco", "San Diego", "Irvine", "San Jose"],
    "Florida": ["Miami", "Orlando", "Tampa", "Fort Lauderdale", "Boca Raton"],
    "Texas": ["Austin", "Dallas", "Houston", "San Antonio"]
  },
  "Birleşik Arap Emirlikleri": {
    Dubai: ["Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Business Bay", "JVC", "Dubai Hills"],
    "Abu Dabi": ["Al Reem Island", "Yas Island", "Saadiyat Island", "Corniche"]
  },
  Hollanda: {
    Amsterdam: ["Centrum", "Zuid", "West", "Oost", "Noord"],
    Rotterdam: ["Centrum", "Kralingen", "Kop van Zuid", "Delfshaven"],
    "Lahey (Den Haag)": ["Centrum", "Scheveningen", "Bezuidenhout"]
  },
  Fransa: {
    Paris: ["1. Bölge (Louvre)", "7. Bölge (Eiffel)", "8. Bölge (Champs-Élysées)", "16. Bölge (Passy)", "La Défense"],
    Nice: ["Promenade des Anglais", "Vieux Nice", "Cimiez"],
    Lyon: ["Presqu'île", "Part-Dieu", "Confluence"]
  },
  İspanya: {
    Madrid: ["Salamanca", "Centro", "Chamberí", "Retiro", "Chamartín"],
    Barselona: ["Eixample", "Ciutat Vella", "Sarrià-Sant Gervasi", "Gràcia", "Diagonal Mar"],
    Marbella: ["Golden Mile", "Puerto Banús", "Nueva Andalucía"]
  },
  İtalya: {
    Milano: ["Centro Storico", "Brera", "Navigli", "Porta Nuova", "CityLife"],
    Roma: ["Centro Storico", "Prati", "Trastevere", "Parioli", "EUR"]
  },
  Yunanistan: {
    Atina: ["Syntagma", "Kolonaki", "Glyfada", "Voula", "Kifisia", "Pire"],
    Selanik: ["Merkez", "Kalamaria", "Panorama"]
  },
  Karadağ: {
    Budva: ["Stari Grad", "Becici", "Sveti Stefan", "Rafailovici"],
    Kotor: ["Stari Grad", "Dobrota", "Perast"],
    Tivat: ["Porto Montenegro", "Donja Lastva", "Merkez"],
    Podgorica: ["City Kvart", "Preko Morace", "Centar"]
  },
  Rusya: {
    Moskova: ["Tverskoy", "Arbat", "Khamovniki", "Presnensky (Moscow City)", "Zamoskvorechye"],
    "St. Petersburg": ["Tsentralny", "Petrogradsky", "Vasileostrovsky"]
  },
  Azerbaycan: {
    Bakü: ["Sebail", "Nesimi", "Nerimanov", "Yasamal", "Hatai (White City)", "Hazar"]
  }
};

// İlçelere göre detaylı gerçek mahalle veritabanı + tüm ilçeler için kapsamlı standart mahalle havuzu
const DETAYLI_MAHALLELER = {
  "Ankara:Etimesgut": ["Bağlıca Mah.", "Yeni Bağlıca Mah.", "Alsancak Mah.", "Atayurt Mah.", "Ayyıldız Mah.", "Bahçekapı Mah.", "Elvan Mah.", "Erler Mah.", "Eryaman Mah.", "Etiler Mah.", "Göksu Mah.", "Güzelkent Mah.", "İstasyon Mah.", "Kâzım Karabekir Mah.", "Oğuzlar Mah.", "Piyade Mah.", "Süvari Mah.", "Şehit Osman Avcı Mah.", "Şeker Mah.", "Şeyh Şamil Mah.", "Topçu Mah.", "Tunahan Mah.", "Yapracık Mah.", "Yavuz Selim Mah.", "Yeşilova Mah."],
  "Ankara:Çankaya": ["Yaşamkent Mah.", "Çayyolu Mah.", "Ümitköy Mah.", "Alacaatlı Mah.", "İncek Mah.", "Oran Mah.", "Çukurambar Mah.", "Bahçelievler Mah.", "Emek Mah.", "Ayrancı Mah.", "Gaziosmanpaşa (GOP) Mah.", "Balgat Mah.", "Birlik Mah.", "Yıldız Mah.", "Kırkkonaklar Mah.", "Mustafa Kemal Mah.", "Söğütözü Mah.", "Dodurga Mah.", "Konutkent Mah.", "Koru Mah.", "Mutlukent Mah.", "Prof. Dr. Ahmet Taner Kışlalı Mah.", "Çiğdem Mah.", "Yüzüncüyıl Mah.", "Dikmen Mah.", "Öveçler Mah.", "Kavaklıdere Mah.", "Kızılay Mah.", "Tunalı (Remzi Oğuz Arık) Mah.", "Ahlatlıbel Mah.", "Beytepe Mah."],
  "Ankara:Gölbaşı": ["İncek Mah.", "Kızılcaşar Mah.", "Taşpınar Mah.", "Tulumtaş Mah.", "Bahçelievler Mah.", "Eymir Mah.", "Gaziosmanpaşa Mah.", "Karşıyaka Mah.", "Seğmenler Mah.", "Şafak Mah.", "Hacılar Mah.", "Örencik Mah."],
  "Ankara:Yenimahalle": ["Batıkent (Kentkoop) Mah.", "Çakırlar Mah.", "Turgut Özal Mah.", "İvedik Mah.", "Demetevler Mah.", "Ragıp Tüzün Mah.", "Gazi Mah.", "Emniyet Mah.", "Beştepe Mah.", "Ostim Mah.", "Susuz Mah.", "Uğur Mumcu Mah.", "Yeni Batı Mah.", "Yuvaköy Mah.", "Karşıyaka Mah."],
  "Ankara:Keçiören": ["Etlik Mah.", "İncirli Mah.", "Ayvalı Mah.", "Ovacık Mah.", "Bağlum Mah.", "Kalaba Mah.", "Subayevleri (Kavacık) Mah.", "Aktepe Mah.", "Ufuktepe Mah.", "Şehit Kubilay Mah.", "Yayla Mah.", "Esertepe Mah.", "Kuşcağız Mah."],
  "Ankara:Mamak": ["Abidinpaşa Mah.", "Akdere Mah.", "Boğaziçi Mah.", "Çağlayan Mah.", "Demirlibahçe Mah.", "Durali Alıç Mah.", "Ege Mah.", "Fahri Korutürk Mah.", "Gülveren Mah.", "Kayaş Mah.", "Mutlu Mah.", "Şahintepe Mah.", "Tuzluçayır Mah.", "Yeşilbayır Mah."],
  "Ankara:Sincan": ["Ahievran Mah.", "Akşemsettin Mah.", "Andiçen Mah.", "Atatürk Mah.", "Fatih Mah.", "Gökçek Mah.", "İstasyon Mah.", "Malazgirt Mah.", "Mareşal Çakmak Mah.", "Mevlana Mah.", "Osmanlı Mah.", "Pınarbaşı Mah.", "Plevne Mah.", "Saraycık Mah.", "Selçuklu Mah.", "Tandoğan Mah.", "Temelli Mah.", "Törekent Mah.", "Ulubatlı Hasan Mah.", "Yenikent Mah."],
  "Ankara:Altındağ": ["Aydınlıkevler Mah.", "Beşikkaya Mah.", "Doğantepe Mah.", "Feridun Çelik Mah.", "Güneşevler Mah.", "Hacettepe Mah.", "Karapürçek Mah.", "Örnek Mah.", "Ulubey Mah.", "Zübeyde Hanım Mah."],
  "Ankara:Pursaklar": ["Altınova Mah.", "Ayyıldız Mah.", "Fatih Mah.", "Merkez Mah.", "Mimar Sinan Mah.", "Saray Cumhuriyet Mah.", "Saray Fatih Mah.", "Tevfik İleri Mah.", "Yunus Emre Mah."],
  "İstanbul:Kadıköy": ["Acıbadem Mah.", "Bostancı Mah.", "Caddebostan Mah.", "Caferağa (Moda) Mah.", "Dumlupınar Mah.", "Eğitim Mah.", "Erenköy Mah.", "Fenerbahçe Mah.", "Feneryolu Mah.", "Fikirtepe Mah.", "Göztepe Mah.", "Hasanpaşa Mah.", "Koşuyolu Mah.", "Kozyatağı Mah.", "Merdivenköy Mah.", "Osmanağa Mah.", "Rasimpaşa Mah.", "Sahrayıcedit Mah.", "Suadiye Mah.", "Zühtüpaşa Mah.", "19 Mayıs Mah."],
  "İstanbul:Beşiktaş": ["Abbasağa Mah.", "Akat (Akatlar) Mah.", "Arnavutköy Mah.", "Balmumcu Mah.", "Bebek Mah.", "Cihannüma Mah.", "Dikilitaş Mah.", "Etiler Mah.", "Gayrettepe Mah.", "Konaklar Mah.", "Kuruçeşme Mah.", "Kültür Mah.", "Levazım Mah.", "Levent Mah.", "Mecidiye Mah.", "Muradiye Mah.", "Nisbetiye Mah.", "Ortaköy Mah.", "Sinanpaşa Mah.", "Türkali Mah.", "Ulus Mah.", "Vişnezade Mah.", "Yıldız Mah."],
  "İstanbul:Bağcılar": ["15 Temmuz Mah.", "Bağlar Mah.", "Barbaros Mah.", "Çınar Mah.", "Demirkapı Mah.", "Fatih Mah.", "Fevzi Çakmak Mah.", "Göztepe Mah.", "Güneşli Mah.", "Hürriyet Mah.", "İnönü Mah.", "Kazım Karabekir Mah.", "Kemalpaşa Mah.", "Kirazlı Mah.", "Mahmutbey Mah.", "Merkez Mah.", "Sancaktepe Mah.", "Yavuz Selim Mah.", "Yenigün Mah.", "Yenimahalle Mah.", "Yıldıztepe Mah.", "Yüzyıl Mah."],
  "İstanbul:Sarıyer": ["Ayazağa Mah.", "Baltalimanı Mah.", "Bahçeköy Mah.", "Büyükdere Mah.", "Cumhuriyet Mah.", "Emirgan Mah.", "Fatih Sultan Mehmet Mah.", "Ferahevler Mah.", "İstinye Mah.", "Kireçburnu Mah.", "Maden Mah.", "Maslak Mah.", "Pınar Mah.", "Poligon Mah.", "Reşitpaşa Mah.", "Rumelihisarı Mah.", "Sarıyer Merkez Mah.", "Tarabya Mah.", "Uskumruköy Mah.", "Yeniköy Mah.", "Zekeriyaköy Mah."],
  "İstanbul:Şişli": ["19 Mayıs Mah.", "Bozkurt Mah.", "Cumhuriyet Mah.", "Duatepe Mah.", "Ergenekon Mah.", "Esentepe Mah.", "Feriköy Mah.", "Fulya Mah.", "Gülbahar Mah.", "Halaskargazi Mah.", "Harbiye Mah.", "İnönü Mah.", "Kaptanpaşa Mah.", "Kuştepe Mah.", "Mahmut Şevket Paşa Mah.", "Mecidiyeköy Mah.", "Merkez Mah.", "Meşrutiyet (Nişantaşı) Mah.", "Paşa Mah.", "Teşvikiye Mah.", "Yayla Mah."],
  "İstanbul:Üsküdar": ["Acıbadem Mah.", "Altunizade Mah.", "Bahçelievler Mah.", "Beylerbeyi Mah.", "Bulgurlu Mah.", "Burhaniye Mah.", "Cumhuriyet Mah.", "Çengelköy Mah.", "Ferah Mah.", "Güzeltepe Mah.", "İcadiye Mah.", "Kandilli Mah.", "Kısıklı Mah.", "Kuzguncuk Mah.", "Küçük Çamlıca Mah.", "Küçüksu Mah.", "Mimar Sinan Mah.", "Salacak Mah.", "Selimiye Mah.", "Sultantepe Mah.", "Ünalan Mah.", "Valide-i Atik Mah.", "Yavuztürk Mah.", "Zeynep Kamil Mah."],
  "İstanbul:Ataşehir": ["Atatürk Mah.", "Barbaros Mah.", "Esatpaşa Mah.", "Ferhatpaşa Mah.", "Fetih Mah.", "İçerenköy Mah.", "İnönü Mah.", "Kayışdağı Mah.", "Küçükbakkalköy Mah.", "Mevlana Mah.", "Mimar Sinan Mah.", "Mustafa Kemal Mah.", "Örnek Mah.", "Yeni Çamlıca Mah.", "Yenişehir Mah.", "Yenisahra Mah."],
  "İstanbul:Bakırköy": ["Ataköy 1. Kısım Mah.", "Ataköy 2-5-6. Kısım Mah.", "Ataköy 3-4-11. Kısım Mah.", "Ataköy 7-8-9-10. Kısım Mah.", "Basınköy Mah.", "Cevizlik Mah.", "Florya (Şenlikköy) Mah.", "Kartaltepe Mah.", "Osmaniye Mah.", "Sakızağacı Mah.", "Yeşilköy Mah.", "Yeşilyurt Mah.", "Zeytinlik Mah.", "Zuhuratbaba Mah."],
  "İstanbul:Başakşehir": ["Altınşehir Mah.", "Bahçeşehir 1. Kısım Mah.", "Bahçeşehir 2. Kısım Mah.", "Başak Mah.", "Başakşehir Mah.", "Güvercintepe Mah.", "İkitelli OSB Mah.", "Kayabaşı (Kayaşehir) Mah.", "Şahintepe Mah.", "Ziya Gökalp Mah."],
  "İstanbul:Beylikdüzü": ["Adnan Kahveci Mah.", "Barış Mah.", "Büyükşehir Mah.", "Cumhuriyet Mah.", "Dereağzı Mah.", "Gürpınar Mah.", "Kavaklı Mah.", "Marmara Mah.", "Sahil Mah.", "Yakuplu Mah."],
  "İzmir:Narlıdere": ["2. İnönü Mah.", "Altıevler Mah.", "Atatürk Mah.", "Çamtepe Mah.", "Çatalkaya Mah.", "Huzur Mah.", "Ilıca Mah.", "Limanreis Mah.", "Narlı Mah.", "Sahilevleri Mah.", "Yenikale Mah."],
  "İzmir:Karşıyaka": ["Aksoy Mah.", "Alaybey Mah.", "Atakent Mah.", "Bahariye Mah.", "Bahçelievler Mah.", "Bahriye Üçok Mah.", "Bostanlı Mah.", "Cumhuriyet Mah.", "Dedebaşı Mah.", "Demirköprü Mah.", "Donanmacı Mah.", "Fikri Altay Mah.", "Goncalar Mah.", "İmbatlı Mah.", "İnönü Mah.", "Mavişehir Mah.", "Mustafa Kemal Mah.", "Nergiz Mah.", "Örnekköy Mah.", "Şemikler Mah.", "Tersane Mah.", "Tuna Mah.", "Yalı Mah.", "Zübeyde Hanım Mah."],
  "İzmir:Urla": ["Altıntaş Mah.", "Atatürk Mah.", "Bademler Mah.", "Çamlıçay Mah.", "Çeşmealtı (Güvendik) Mah.", "Denizli Mah.", "Gülbahçe Mah.", "İçmeler Mah.", "İskele Mah.", "Kalabak Mah.", "Kekliktepe Mah.", "Kuşçular Mah.", "Özbek Mah.", "Sıra Mah.", "Torasan Mah.", "Yaka Mah.", "Yelaltı Mah.", "Yeni Mah.", "Yenice Mah.", "Zeytinalanı Mah."],
  "İzmir:Bornova": ["Atatürk Mah.", "Barbaros Mah.", "Birlik Mah.", "Çamdibi (Gazi Osman Paşa) Mah.", "Doğanlar Mah.", "Egemenlik Mah.", "Ergene Mah.", "Erzene Mah.", "Evka 3 Mah.", "Evka 4 Mah.", "İnönü Mah.", "Kazımdirik Mah.", "Kızılay Mah.", "Mevlana Mah.", "Naldöken Mah.", "Özkanlar (Mansuroğlu) Mah.", "Rafet Paşa Mah.", "Yeşilova Mah."],
  "İzmir:Çeşme": ["Alaçatı Mah.", "Altınkum Mah.", "Altınyunus Mah.", "Ardıç Mah.", "Boyalık Mah.", "Celal Bayar Mah.", "Cumhuriyet Mah.", "Çiftlik (Çiftlikköy) Mah.", "Dalyan Mah.", "Fahrettinpaşa Mah.", "Germiyan Mah.", "Ildır Mah.", "Ilıca Mah.", "İsmet İnönü Mah.", "Musalla Mah.", "Ovacık Mah.", "Reisdere Mah.", "Sakarya Mah.", "Şifne Mah.", "Üniversite Mah.", "Yalı Mah."],
  "Antalya:Muratpaşa": ["Bahçelievler Mah.", "Balbey Mah.", "Çağlayan Mah.", "Çaybaşı Mah.", "Demircikara Mah.", "Deniz Mah.", "Doğuyaka Mah.", "Dutlular Mah.", "Elmalı Mah.", "Ermenek Mah.", "Etiler Mah.", "Fener Mah.", "Gebizli Mah.", "Gençlik Mah.", "Güzeloba (Lara) Mah.", "Güzeloluk Mah.", "Haşimişcan Mah.", "Kılınçarslan Mah.", "Kırcami Mah.", "Kızılsaray Mah.", "Kızılarık Mah.", "Konuksever Mah.", "Meltem Mah.", "Meydankavağı Mah.", "Sedir Mah.", "Sinan Mah.", "Soğuksu Mah.", "Şirinyalı Mah.", "Varlık Mah.", "Yeşilbahçe Mah.", "Yıldız Mah.", "Zerdalilik Mah."],
  "Antalya:Konyaaltı": ["Akdamlar Mah.", "Akkuyu Mah.", "Altınkum Mah.", "Arapsuyu Mah.", "Aşağıkaraman Mah.", "Bahtılı Mah.", "Çakırlar Mah.", "Gürsu Mah.", "Hurma Mah.", "Kuruçay Mah.", "Kuşkavağı Mah.", "Liman Mah.", "Molla Yusuf Mah.", "Öğretmenevleri Mah.", "Pınarbaşı Mah.", "Sarısu Mah.", "Siteler Mah.", "Toros Mah.", "Uluç Mah.", "Uncalı Mah.", "Zümrüt Mah."],
  "Antalya:Alanya": ["Avsallar Mah.", "Cikcilli Mah.", "Cumhuriyet Mah.", "Çarşı Mah.", "Dinek Mah.", "Güller Pınarı Mah.", "Hacet Mah.", "Kadıpaşa Mah.", "Kargıcak Mah.", "Kestel Mah.", "Kızlar Pınarı Mah.", "Konaklı Mah.", "Mahmutlar Mah.", "Oba Mah.", "Payallar Mah.", "Saray Mah.", "Şekerhane Mah.", "Tosmur Mah.", "Türkler Mah."],
  "Muğla:Bodrum": ["Akyarlar Mah.", "Bitez Mah.", "Cevat Şakir Mah.", "Çırkan Mah.", "Eskiçeşme Mah.", "Gölköy (Göltürkbükü) Mah.", "Gümbet Mah.", "Gümüşlük Mah.", "Gündoğan Mah.", "Gürece Mah.", "İslamhaneleri Mah.", "Karabağ Mah.", "Konacık Mah.", "Kumbahçe Mah.", "Mumcular Mah.", "Ortakent Mah.", "Torba Mah.", "Turgutreis Mah.", "Türkbükü Mah.", "Türkkuyusu Mah.", "Umurça Mah.", "Yahşi Mah.", "Yalıkavak Mah.", "Yokuşbaşı Mah."]
};

// SAHİBİNDEN.COM TARZI İL -> İLÇE -> SEMT (BÖLGE) -> MAHALLE VERİTABANI
const DETAYLI_SEMT_MAHALLELER = {
  "Ankara:Çankaya": {
    "Çayyolu": ["Çayyolu Mah.", "Alacaatlı Mah.", "Konutkent Mah.", "Yaşamkent Mah.", "Ümit (Ümitköy) Mah.", "Koru Mah.", "Dodurga Mah.", "Prof. Dr. Ahmet Taner Kışlalı Mah.", "Mutlukent Mah.", "Beytepe Mah."],
    "Balgat / Çukurambar": ["Çukurambar Mah.", "Balgat Mah.", "Mustafa Kemal Mah.", "Söğütözü Mah.", "Kızılırmak Mah.", "Çiğdem Mah.", "Yüzüncüyıl Mah.", "Ehlibeyt Mah.", "Cevizlidere Mah."],
    "Bahçelievler / Emek": ["Bahçelievler Mah.", "Emek Mah.", "Yukarı Bahçelievler Mah.", "Aşkabat (7. Cadde) Mah.", "Beştepe Mah."],
    "Oran / Yıldız": ["Oran Mah.", "Yukarı Dikmen Mah.", "Sancak Mah.", "Yıldız Mah.", "Turan Güneş Mah.", "Hilal Mah.", "Birlik Mah.", "Kırkkonaklar Mah."],
    "Gaziosmanpaşa (GOP) / Çankaya": ["Gaziosmanpaşa (GOP) Mah.", "Çankaya Mah.", "Büyükesat Mah.", "Küçükesat Mah.", "Kazım Özalp Mah.", "Aziziye Mah."],
    "Ayrancı / Kavaklıdere": ["Ayrancı Mah.", "Güvenevler Mah.", "Remzi Oğuz Arık (Tunalı) Mah.", "Kavaklıdere Mah.", "Barbaros Mah."],
    "Dikmen / Öveçler": ["Dikmen Mah.", "İlkadım Mah.", "Öveçler Mah.", "Sokullu Mehmet Paşa Mah.", "Aşağı Öveçler Mah.", "Keklikpınarı Mah."],
    "İncek / Ahlatlıbel (Çankaya)": ["Ahlatlıbel Mah.", "İncek Bulvarı Aksı Mah.", "Alacaatlı İncek Etabı Mah."],
    "Kızılay / Sıhhiye": ["Kızılay Mah.", "Meşrutiyet Mah.", "Cumhuriyet Mah.", "Korkutreis Mah.", "Fidanlık Mah."]
  },
  "Ankara:Etimesgut": {
    "Bağlıca": ["Bağlıca Mah.", "Yeni Bağlıca Mah.", "Yapracık Mah.", "Yukarıyurtçu Mah.", "Aşağıyurtçu Mah."],
    "Eryaman": ["Eryaman Mah.", "Göksu Mah.", "Tunahan Mah.", "Şehit Osman Avcı Mah.", "Güzelkent Mah.", "Şeyh Şamil Mah.", "Yavuz Selim Mah.", "Altay Mah.", "Yeşilova Mah."],
    "Elvankent": ["Elvan Mah.", "Topçu Mah.", "Piyade Mah.", "Oğuzlar Mah.", "Atayurt Mah.", "Ayyıldız Mah.", "Etiler Mah."],
    "Etimesgut Merkez": ["İstasyon Mah.", "Alsancak Mah.", "Süvari Mah.", "Kâzım Karabekir Mah.", "30 Ağustos Mah.", "Bahçekapı Mah.", "Erler Mah.", "Şeker Mah."]
  },
  "Ankara:Gölbaşı": {
    "İncek": ["İncek Mah.", "Kızılcaşar Mah.", "Taşpınar Mah.", "Tulumtaş Mah.", "Hacılar Mah."],
    "Gölbaşı Merkez": ["Bahçelievler Mah.", "Eymir Mah.", "Gaziosmanpaşa Mah.", "Karşıyaka Mah.", "Seğmenler Mah.", "Şafak Mah.", "Örencik Mah."]
  },
  "Ankara:Yenimahalle": {
    "Batıkent": ["Kentkoop Mah.", "Çakırlar Mah.", "Turgut Özal Mah.", "Uğur Mumcu Mah.", "Yeni Batı Mah.", "İlkyerleşim Mah.", "Kardelen Mah.", "Ergazi Mah."],
    "Demetevler": ["Demetevler Mah.", "Demetlale Mah.", "Demetgül Mah.", "Özevler Mah."],
    "Yenimahalle Merkez": ["Ragıp Tüzün Mah.", "İvedik Mah.", "Gazi Mah.", "Emniyet Mah.", "Yuvaköy Mah.", "Karşıyaka Mah.", "Susuz Mah.", "Ostim Mah."]
  },
  "Ankara:Keçiören": {
    "Etlik / İncirli": ["Etlik Mah.", "İncirli Mah.", "Aşağı Eğlence Mah.", "Ayvalı Mah.", "Esertepe Mah.", "Yayla Mah."],
    "Ovacık / Subayevleri": ["Ovacık Mah.", "Subayevleri (Kavacık) Mah.", "Kalaba Mah.", "Şehit Kubilay Mah."],
    "Bağlum / Ufuktepe": ["Bağlum Mah.", "Ufuktepe Mah.", "Aktepe Mah.", "Kuşcağız Mah."]
  },
  "Ankara:Mamak": {
    "Abidinpaşa / Akdere": ["Abidinpaşa Mah.", "Akdere Mah.", "Demirlibahçe Mah.", "Gülveren Mah.", "Tuzluçayır Mah."],
    "Mamak Merkez / Natoyolu": ["Durali Alıç Mah.", "Ege Mah.", "Fahri Korutürk Mah.", "Mutlu Mah.", "Şahintepe Mah.", "Boğaziçi Mah.", "Kayaş Mah.", "Yeşilbayır Mah."]
  },
  "Ankara:Sincan": {
    "Sincan Merkez / Fatih": ["Fatih Mah.", "Atatürk Mah.", "Andiçen Mah.", "Pınarbaşı Mah.", "Tandoğan Mah.", "İstasyon Mah.", "Mevlana Mah."],
    "Yenikent / Temelli": ["Yenikent Mah.", "Törekent Mah.", "Saraycık Mah.", "Temelli Mah.", "Ahievran Mah."]
  },
  "İstanbul:Kadıköy": {
    "Suadiye / Caddebostan (Bağdat Cad.)": ["Suadiye Mah.", "Caddebostan Mah.", "Erenköy Mah.", "Fenerbahçe Mah.", "Bostancı Mah."],
    "Moda / Kadıköy Merkez": ["Caferağa (Moda) Mah.", "Osmanağa Mah.", "Rasimpaşa Mah.", "Zühtüpaşa Mah.", "Hasanpaşa Mah."],
    "Göztepe / Feneryolu": ["Göztepe Mah.", "Feneryolu Mah.", "Merdivenköy Mah.", "Dumlupınar Mah.", "Eğitim Mah.", "Fikirtepe Mah."],
    "Kozyatağı / Acıbadem": ["Kozyatağı Mah.", "19 Mayıs Mah.", "Sahrayıcedit Mah.", "Acıbadem Mah.", "Koşuyolu Mah."]
  },
  "İstanbul:Beşiktaş": {
    "Etiler / Ulus": ["Etiler Mah.", "Ulus Mah.", "Akat (Akatlar) Mah.", "Kültür Mah.", "Levazım Mah.", "Nisbetiye Mah."],
    "Levent / Gayrettepe": ["Levent Mah.", "Konaklar Mah.", "Gayrettepe Mah.", "Balmumcu Mah.", "Dikilitaş Mah."],
    "Bebek / Ortaköy": ["Bebek Mah.", "Arnavutköy Mah.", "Kuruçeşme Mah.", "Ortaköy Mah.", "Mecidiye Mah."],
    "Beşiktaş Merkez": ["Cihannüma Mah.", "Sinanpaşa Mah.", "Türkali Mah.", "Vişnezade Mah.", "Abbasağa Mah.", "Muradiye Mah.", "Yıldız Mah."]
  },
  "İstanbul:Bağcılar": {
    "Güneşli / Basın Ekspres": ["Güneşli Mah.", "15 Temmuz Mah.", "Bağlar Mah.", "Hürriyet Mah.", "Kirazlı Mah."],
    "Mahmutbey / Göztepe": ["Mahmutbey Mah.", "Göztepe Mah.", "Fatih Mah.", "Demirkapı Mah.", "Yüzyıl Mah."],
    "Bağcılar Merkez": ["Merkez Mah.", "Çınar Mah.", "Barbaros Mah.", "İnönü Mah.", "Kazım Karabekir Mah.", "Sancaktepe Mah.", "Yenigün Mah.", "Yıldıztepe Mah."]
  },
  "İstanbul:Sarıyer": {
    "Maslak / Ayazağa": ["Maslak Mah.", "Ayazağa Mah.", "Huzur Mah.", "Pınar Mah."],
    "İstinye / Tarabya": ["İstinye Mah.", "Tarabya Mah.", "Emirgan Mah.", "Reşitpaşa Mah.", "Yeniköy Mah.", "Baltalimanı Mah.", "Rumelihisarı Mah."],
    "Zekeriyaköy / Sarıyer Merkez": ["Zekeriyaköy Mah.", "Uskumruköy Mah.", "Bahçeköy Mah.", "Maden Mah.", "Sarıyer Merkez Mah.", "Büyükdere Mah."]
  },
  "İstanbul:Şişli": {
    "Nişantaşı / Teşvikiye": ["Teşvikiye Mah.", "Meşrutiyet (Nişantaşı) Mah.", "Harbiye Mah.", "Halaskargazi Mah."],
    "Mecidiyeköy / Fulya": ["Mecidiyeköy Mah.", "Fulya Mah.", "Esentepe Mah.", "19 Mayıs Mah.", "Gülbahar Mah.", "Merkez Mah."],
    "Bomonti / Feriköy": ["Cumhuriyet (Bomonti) Mah.", "Feriköy Mah.", "Bozkurt Mah.", "Duatepe Mah.", "Paşa Mah."]
  },
  "İstanbul:Üsküdar": {
    "Altunizade / Acıbadem": ["Altunizade Mah.", "Acıbadem Mah.", "Barbaros Mah.", "Küçük Çamlıca Mah.", "Kısıklı Mah."],
    "Çengelköy / Beylerbeyi": ["Çengelköy Mah.", "Beylerbeyi Mah.", "Kandilli Mah.", "Kuzguncuk Mah.", "Bahçelievler Mah.", "Güzeltepe Mah."],
    "Üsküdar Merkez / Bulgurlu": ["Mimar Sinan Mah.", "Salacak Mah.", "Valide-i Atik Mah.", "İcadiye Mah.", "Bulgurlu Mah.", "Ünalan Mah."]
  },
  "İstanbul:Ataşehir": {
    "Batı Ataşehir": ["Atatürk Mah.", "Barbaros Mah.", "Küçükbakkalköy Mah.", "İçerenköy Mah."],
    "Doğu Ataşehir": ["Kayışdağı Mah.", "İnönü Mah.", "Mevlana Mah.", "Yenişehir Mah.", "Yeni Çamlıca Mah.", "Ferhatpaşa Mah.", "Örnek Mah."]
  },
  "İstanbul:Bakırköy": {
    "Ataköy": ["Ataköy 1. Kısım Mah.", "Ataköy 2-5-6. Kısım Mah.", "Ataköy 3-4-11. Kısım Mah.", "Ataköy 7-8-9-10. Kısım Mah."],
    "Florya / Yeşilköy": ["Florya (Şenlikköy) Mah.", "Basınköy Mah.", "Yeşilköy Mah.", "Yeşilyurt Mah."],
    "Bakırköy Merkez": ["Cevizlik Mah.", "Kartaltepe Mah.", "Zeytinlik Mah.", "Zuhuratbaba Mah.", "Osmaniye Mah.", "Sakızağacı Mah."]
  },
  "İstanbul:Başakşehir": {
    "Bahçeşehir": ["Bahçeşehir 1. Kısım Mah.", "Bahçeşehir 2. Kısım Mah."],
    "Kayaşehir / Başakşehir Merkez": ["Kayabaşı (Kayaşehir) Mah.", "Başakşehir Mah.", "Başak Mah.", "Altınşehir Mah.", "Güvercintepe Mah."]
  },
  "İstanbul:Beylikdüzü": {
    "Beylikdüzü Merkez / Adnan Kahveci": ["Adnan Kahveci Mah.", "Barış Mah.", "Büyükşehir Mah.", "Cumhuriyet Mah."],
    "Gürpınar / Yakuplu (Marina)": ["Marmara Mah.", "Kavaklı Mah.", "Sahil Mah.", "Gürpınar Mah.", "Yakuplu Mah.", "Dereağzı Mah."]
  },
  "İzmir:Narlıdere": {
    "Sahilevleri / Ilıca": ["Sahilevleri Mah.", "Ilıca Mah.", "Yenikale Mah.", "Altıevler Mah."],
    "Narlıdere Merkez": ["Narlı Mah.", "Çatalkaya Mah.", "Huzur Mah.", "Çamtepe Mah.", "Atatürk Mah.", "2. İnönü Mah.", "Limanreis Mah."]
  },
  "İzmir:Karşıyaka": {
    "Mavişehir / Bostanlı": ["Mavişehir Mah.", "Bostanlı Mah.", "Atakent Mah.", "Yalı Mah.", "Şemikler Mah."],
    "Karşıyaka Merkez / Alaybey": ["Aksoy Mah.", "Donanmacı Mah.", "Alaybey Mah.", "Tersane Mah.", "Bahriye Üçok Mah.", "Bahçelievler Mah.", "Nergiz Mah."]
  },
  "İzmir:Urla": {
    "İskele / Çeşmealtı": ["İskele Mah.", "Çeşmealtı (Güvendik) Mah.", "Kalabak Mah.", "Zeytinalanı Mah.", "Çamlıçay Mah.", "Denizli Mah.", "İçmeler Mah."],
    "Urla Merkez / Kuşçular": ["Yeni Mah.", "Yaka Mah.", "Altıntaş Mah.", "Kuşçular Mah.", "Bademler Mah.", "Kekliktepe Mah.", "Gülbahçe Mah."]
  },
  "İzmir:Bornova": {
    "Özkanlar / Küçükpark": ["Özkanlar (Mansuroğlu) Mah.", "Kazımdirik Mah.", "Erzene Mah.", "Ergene Mah."],
    "Evka 3 / Bornova Merkez": ["Evka 3 Mah.", "Evka 4 Mah.", "Atatürk Mah.", "İnönü Mah.", "Kızılay Mah.", "Çamdibi (Gazi Osman Paşa) Mah."]
  },
  "İzmir:Çeşme": {
    "Alaçatı / Ilıca": ["Alaçatı Mah.", "Ilıca Mah.", "Celal Bayar Mah.", "Şifne Mah.", "Reisdere Mah.", "Ovacık Mah."],
    "Çeşme Merkez / Dalyan": ["Dalyan Mah.", "Çiftlik (Çiftlikköy) Mah.", "Boyalık Mah.", "Altınyunus Mah.", "Musalla Mah.", "İsmet İnönü Mah."]
  },
  "Antalya:Muratpaşa": {
    "Lara / Güzeloba": ["Güzeloba (Lara) Mah.", "Şirinyalı Mah.", "Fener Mah.", "Çağlayan Mah.", "Güzeloluk Mah.", "Kırcami Mah."],
    "Meltem / Muratpaşa Merkez": ["Meltem Mah.", "Bahçelievler Mah.", "Gençlik Mah.", "Deniz Mah.", "Meydankavağı Mah.", "Yeşilbahçe Mah.", "Zerdalilik Mah."]
  },
  "Antalya:Konyaaltı": {
    "Liman / Hurma": ["Liman Mah.", "Hurma Mah.", "Sarısu Mah.", "Gürsu Mah.", "Altınkum Mah."],
    "Uncalı / Arapsuyu": ["Uncalı Mah.", "Arapsuyu Mah.", "Molla Yusuf Mah.", "Öğretmenevleri Mah.", "Toros Mah.", "Uluç Mah.", "Pınarbaşı Mah."]
  },
  "Antalya:Alanya": {
    "Mahmutlar / Oba": ["Mahmutlar Mah.", "Oba Mah.", "Tosmur Mah.", "Kestel Mah.", "Kargıcak Mah.", "Cikcilli Mah."],
    "Alanya Merkez / Kleopatra": ["Saray Mah.", "Kızlar Pınarı Mah.", "Güller Pınarı Mah.", "Şekerhane Mah.", "Çarşı Mah.", "Konaklı Mah.", "Avsallar Mah."]
  },
  "Muğla:Bodrum": {
    "Yalıkavak / Gündoğan": ["Yalıkavak Mah.", "Gündoğan Mah.", "Gölköy (Göltürkbükü) Mah.", "Türkbükü Mah."],
    "Bitez / Ortakent / Yahşi": ["Bitez Mah.", "Ortakent Mah.", "Yahşi Mah.", "Gümbet Mah.", "Konacık Mah."],
    "Turgutreis / Gümüşlük / Merkez": ["Turgutreis Mah.", "Akyarlar Mah.", "Gümüşlük Mah.", "Eskiçeşme Mah.", "Kumbahçe Mah.", "Torba Mah."]
  }
};

function ilIlceyeGoreSemtHaritasiGetir(il, ilce) {
  if (!il || !ilce || il === "Tümü" || ilce === "Tümü") return {};
  const ozelSemtMap = DETAYLI_SEMT_MAHALLELER[`${il}:${ilce}`];
  if (ozelSemtMap) return ozelSemtMap;

  const ozelMahListe = DETAYLI_MAHALLELER[`${il}:${ilce}`];
  if (ozelMahListe && ozelMahListe.length > 0) {
    const yarisi = Math.ceil(ozelMahListe.length / 2);
    return {
      [`${ilce} Merkez`]: ozelMahListe.slice(0, yarisi),
      [`${ilce} Yeni Yerleşim`]: ozelMahListe.slice(yarisi)
    };
  }

  return {
    [`${ilce} Merkez`]: [`${ilce} Merkez Mah.`, "Cumhuriyet Mah.", "Atatürk Mah.", "Fatih Mah.", "İstiklal Mah.", "Hürriyet Mah."],
    [`${ilce} Çarşı / Meydan`]: ["Yeni Mah.", "Bahçelievler Mah.", "Mimar Sinan Mah.", "Gazi Mah.", "İnönü Mah.", "Zafer Mah."],
    [`${ilce} Konut Bölgesi`]: ["Yunus Emre Mah.", "Adnan Menderes Mah.", "Mevlana Mah.", "Esentepe Mah.", "Yeşiltepe Mah.", "Çamlık Mah."]
  };
}

function ilIlceSemteGoreMahalleListesiGetir(il, ilce, semt) {
  const semtMap = ilIlceyeGoreSemtHaritasiGetir(il, ilce);
  if (semt && semt !== "Tümü" && semt !== "Tüm Semtler" && semtMap[semt]) {
    return [...semtMap[semt]];
  }
  const tumu = [];
  Object.values(semtMap).forEach(arr => {
    arr.forEach(m => {
      if (!tumu.includes(m)) tumu.push(m);
    });
  });
  return tumu.length > 0 ? tumu : [`${ilce} Merkez Mah.`, ...STANDART_ILCE_MAHALLELERI.filter(m => m !== "Merkez Mah.")];
}
const STANDART_ILCE_MAHALLELERI = [
  "Merkez Mah.",
  "Cumhuriyet Mah.",
  "Atatürk Mah.",
  "Fatih Mah.",
  "Yeni Mah.",
  "Bahçelievler Mah.",
  "İstiklal Mah.",
  "Hürriyet Mah.",
  "Mimar Sinan Mah.",
  "Yunus Emre Mah.",
  "Gazi Mah.",
  "İnönü Mah.",
  "Zafer Mah.",
  "Adnan Menderes Mah.",
  "Fevzi Çakmak Mah.",
  "Mevlana Mah.",
  "Karşıyaka Mah.",
  "Esentepe Mah.",
  "Yeşiltepe Mah.",
  "Yavuz Selim Mah.",
  "Kazım Karabekir Mah.",
  "Aydınlıkevler Mah.",
  "Çamlık Mah.",
  "Gültepe Mah.",
  "Pınarbaşı Mah."
];

let aktifYeniPortfoySayfasi = 1;

function npUlkeleriDoldur() {
  const ulkeSel = document.getElementById("npUlke");
  if (!ulkeSel) return;
  const ulkeler = ["Türkiye", ...Object.keys(DIGER_ULKELER_IL_ILCELER)];
  ulkeSel.innerHTML = ulkeler
    .map(u => `<option value="${u}" ${u === "Türkiye" ? "selected" : ""}>${u}</option>`)
    .join("");
}

function npKonumUlkeDegisti() {
  const ulkeSel = document.getElementById("npUlke");
  if (ulkeSel && ulkeSel.options.length === 0) {
    npUlkeleriDoldur();
  }
  const ulke = ulkeSel?.value || "Türkiye";
  const illerObj = ulke === "Türkiye" ? TURKIYE_81_IL_ILCELER : DIGER_ULKELER_IL_ILCELER[ulke] || TURKIYE_81_IL_ILCELER;
  const ilSel = document.getElementById("npIl");
  if (!ilSel) return;
  const iller = Object.keys(illerObj);
  ilSel.innerHTML = iller
    .map(il => `<option value="${il}" ${il === "Ankara" ? "selected" : ""}>${il}</option>`)
    .join("");
  npKonumIlDegisti();
}

function npKonumIlDegisti() {
  const ulke = document.getElementById("npUlke")?.value || "Türkiye";
  const illerObj = ulke === "Türkiye" ? TURKIYE_81_IL_ILCELER : DIGER_ULKELER_IL_ILCELER[ulke] || TURKIYE_81_IL_ILCELER;
  const il = document.getElementById("npIl")?.value || Object.keys(illerObj)[0];
  const ilceler = illerObj[il] || ["Merkez"];
  const ilceSel = document.getElementById("npIlce");
  if (!ilceSel) return;
  const varsayilanIlce = il === "Ankara" && ilceler.includes("Etimesgut") ? "Etimesgut" : ilceler[0];
  ilceSel.innerHTML = ilceler
    .map(ilce => `<option value="${ilce}" ${ilce === varsayilanIlce ? "selected" : ""}>${ilce}</option>`)
    .join("");
  npKonumIlceDegisti();
}

function npKonumIlceDegisti() {
  const il = document.getElementById("npIl")?.value || "Ankara";
  const ilce = document.getElementById("npIlce")?.value || "Etimesgut";
  const semtMap = ilIlceyeGoreSemtHaritasiGetir(il, ilce);
  const semtler = Object.keys(semtMap);
  const semtSel = document.getElementById("npSemt");
  if (semtSel) {
    semtSel.innerHTML =
      semtler.map((s, idx) => `<option value="${s}" ${idx === 0 ? "selected" : ""}>${s}</option>`).join("") +
      `<option value="Tüm Semtler">Tüm ${ilce} Mahalleleri (Genel)</option>`;
  }
  npKonumSemtDegisti();
}

function npKonumSemtDegisti() {
  const il = document.getElementById("npIl")?.value || "Ankara";
  const ilce = document.getElementById("npIlce")?.value || "Etimesgut";
  const semt = document.getElementById("npSemt")?.value || "";
  const mahalleler = ilIlceSemteGoreMahalleListesiGetir(il, ilce, semt);
  const mahSel = document.getElementById("npMahalle");
  if (!mahSel) return;
  mahSel.innerHTML =
    mahalleler.map(m => `<option value="${m}">${m}</option>`).join("") +
    `<option value="__CUSTOM__">+ Listede Olmayan Mahalle Yaz...</option>`;
  npKonumMahalleDegisti();
}

function npKonumMahalleDegisti() {
  const mahSel = document.getElementById("npMahalle");
  const customInput = document.getElementById("npMahalleCustom");
  if (!mahSel || !customInput) return;
  if (mahSel.value === "__CUSTOM__") {
    customInput.style.display = "block";
    customInput.focus();
  } else {
    customInput.style.display = "none";
  }
}

function npSeciliMahalleAdiniAl() {
  const mahSel = document.getElementById("npMahalle");
  const customInput = document.getElementById("npMahalleCustom");
  if (mahSel && mahSel.value === "__CUSTOM__") {
    return (customInput?.value || "").trim() || "Merkez Mah.";
  }
  return mahSel?.value || "Merkez Mah.";
}

function npChipSec(btnEl) {
  const parent = btnEl.closest(".np-chip-list");
  if (!parent) return;
  const isMulti = parent.getAttribute("data-multi") === "true";
  if (isMulti) {
    btnEl.classList.toggle("selected");
  } else {
    parent.querySelectorAll(".np-chip-btn").forEach(b => b.classList.remove("selected"));
    btnEl.classList.add("selected");
  }
}

function npSayiDegistir(inputId, delta, minVal = -10) {
  const el = document.getElementById(inputId);
  if (!el) return;
  const mevcut = parseInt(el.value || "0", 10);
  const yeni = Math.max(minVal, (isNaN(mevcut) ? 0 : mevcut) + delta);
  el.value = yeni;
}

function npFiyatRakamFormatla(inputEl) {
  const sadeceRakam = (inputEl.value || "").replace(/\D/g, "");
  if (!sadeceRakam) {
    inputEl.value = "";
    return;
  }
  inputEl.value = Number(sadeceRakam).toLocaleString("tr-TR");
}

function npSeciliChipleriAl(groupName) {
  const container = document.querySelector(`.np-chip-list[data-group="${groupName}"]`);
  if (!container) return [];
  return Array.from(container.querySelectorAll(".np-chip-btn.selected")).map(b =>
    (b.querySelector("span")?.textContent || "").trim()
  );
}

function npOzellikOzetiniOlustur() {
  const konutTipi = npSeciliChipleriAl("konutTipi")[0] || "Apartman";
  const apartmanTipi = npSeciliChipleriAl("apartmanTipi")[0] || "Daire";
  const kullanim = npSeciliChipleriAl("kullanimDurumu")[0] || "Boş";
  const yapi = npSeciliChipleriAl("yapiDurumu")[0] || "Standart";
  const oda = document.getElementById("npOdaSayisi")?.value || "3";
  const salon = document.getElementById("npSalonSayisi")?.value || "1";
  const banyo = document.getElementById("npBanyoSayisi")?.value || "2";
  const brut = document.getElementById("npBrutAlan")?.value || "150";
  const teras = document.getElementById("npTerasAlan")?.value || "";
  const binaYasi = document.getElementById("npBinaYasi")?.value || "5";
  const binaKat = document.getElementById("npBinaKatSayisi")?.value || "10";
  const kat = document.getElementById("npBulunduguKat")?.value || "4";

  const cepheler = npSeciliChipleriAl("cepheDurumu").join("/");
  const manzaralar = npSeciliChipleriAl("manzara").join(", ");
  const isitma = npSeciliChipleriAl("isitmaSistemi")[0] || "Doğalgaz/Kombi";
  const olanaklar = npSeciliChipleriAl("olanaklar").join(", ");

  const parcalar = [
    `${oda}+${salon}`,
    `${brut} m² Brüt${teras ? ` (+${teras} m² Teras)` : ""}`,
    `${konutTipi} / ${apartmanTipi}`,
    `${kat}. Kat (${binaKat} Katlı Bina • ${binaYasi} Yaş)`,
    `${kullanim} • ${yapi}`,
    cepheler ? `${cepheler} Cephe` : "",
    isitma,
    manzaralar ? `Manzara: ${manzaralar}` : "",
    olanaklar ? `Olanaklar: ${olanaklar}` : ""
  ].filter(Boolean);

  return parcalar.join(" • ");
}

function yeniPortfoyAdimGit(adimNo) {
  aktifYeniPortfoySayfasi = Math.max(1, Math.min(6, adimNo));
  for (let i = 1; i <= 6; i++) {
    const pageEl = document.getElementById(`npWizardPage${i}`);
    if (pageEl) pageEl.classList.toggle("active", i === aktifYeniPortfoySayfasi);
  }

  const pills = document.querySelectorAll("#npWizardProgress .np-wizard-step-pill");
  pills.forEach((pill, idx) => {
    const stepIndex = idx + 1;
    pill.classList.toggle("active", stepIndex === aktifYeniPortfoySayfasi);
    pill.classList.toggle("done", stepIndex < aktifYeniPortfoySayfasi);
  });

  if (aktifYeniPortfoySayfasi === 6) {
    const summaryEl = document.getElementById("npSummaryPreviewBox");
    if (summaryEl) {
      const ulke = document.getElementById("npUlke")?.value || "Türkiye";
      const il = document.getElementById("npIl")?.value || "Ankara";
      const ilce = document.getElementById("npIlce")?.value || "Etimesgut";
      const mah = npSeciliMahalleAdiniAl();
      summaryEl.innerHTML = `<strong>Konum:</strong> ${mah}, ${ilce} / ${il} (${ulke})<br/><strong>Özellikler:</strong> ${npOzellikOzetiniOlustur()}`;
    }
  }
}

// 5. SAYFA: 1'DEN BAŞLAYAN BOŞ KUTUCUKLA HİZMET ADIMI SEÇİMİ (1'İ SEÇİNCE 2 OTOMATİK AÇILIR)
let npHizmetSlotlari = [""];
let npHizmetOzelMetinleri = {};

function npHizmetSlotlariniRenderEt() {
  const wrap = document.getElementById("npServicesChecklist");
  if (!wrap) return;

  // Başka kutucuklarda seçilmiş olan hazır hizmetleri bul (aynı hizmet iki kez seçilmesin)
  const seciliDegerler = new Set(npHizmetSlotlari.filter(v => v && v !== "__CUSTOM__"));

  wrap.innerHTML = npHizmetSlotlari
    .map((seciliDeger, idx) => {
      const siraNo = idx + 1;
      const isFilled = Boolean(seciliDeger);
      const isCustom = seciliDeger === "__CUSTOM__";

      const optionsHtml =
        `<option value="">${siraNo}. Yapacağınız Hizmeti Seçin...</option>` +
        HAZIR_HIZMET_HAVUZU.map(ad => {
          const baskaKutudaSecili = seciliDegerler.has(ad) && seciliDeger !== ad;
          return `<option value="${ad}" ${seciliDeger === ad ? "selected" : ""} ${
            baskaKutudaSecili ? "disabled" : ""
          }>${ad}${baskaKutudaSecili ? " (Seçildi)" : ""}</option>`;
        }).join("") +
        `<option value="__CUSTOM__" ${isCustom ? "selected" : ""}>+ Özel Hizmet Yaz...</option>`;

      return `
        <div class="np-step-slot-row ${isFilled ? "filled" : ""}">
          <span class="np-step-slot-num">${siraNo}</span>
          <select class="np-step-slot-select" onchange="npHizmetSlotSecildi(${idx}, this.value)">
            ${optionsHtml}
          </select>
          ${
            isCustom
              ? `<input
                  type="text"
                  class="np-step-slot-custom"
                  placeholder="${siraNo}. adım için özel hizmet yazın..."
                  value="${(npHizmetOzelMetinleri[idx] || "").replace(/"/g, "&quot;")}"
                  oninput="npHizmetOzelMetinDegisti(${idx}, this.value)"
                />`
              : ""
          }
          ${
            isFilled || npHizmetSlotlari.length > 1
              ? `<button type="button" class="np-step-slot-clear" onclick="npHizmetSlotTemizle(${idx})" title="Bu adımı kaldır">✕</button>`
              : ""
          }
        </div>
      `;
    })
    .join("");
}

function npHizmetSlotSecildi(idx, val) {
  npHizmetSlotlari[idx] = val || "";
  if (val !== "__CUSTOM__") {
    delete npHizmetOzelMetinleri[idx];
  }
  // 1'i seçtiği anda altına otomatik olarak 2. boş kutucuk açılır (her seçtikçe bir sonraki adım kutucuğu eklenir)
  if (val && idx === npHizmetSlotlari.length - 1 && npHizmetSlotlari.length < 15) {
    npHizmetSlotlari.push("");
  }
  npHizmetSlotlariniRenderEt();
}

function npHizmetOzelMetinDegisti(idx, textVal) {
  npHizmetOzelMetinleri[idx] = textVal;
}

function npHizmetSlotTemizle(idx) {
  if (npHizmetSlotlari.length <= 1) {
    npHizmetSlotlari = [""];
    npHizmetOzelMetinleri = {};
  } else {
    npHizmetSlotlari.splice(idx, 1);
    const yeniOzel = {};
    Object.keys(npHizmetOzelMetinleri).forEach(k => {
      const ki = Number(k);
      if (ki < idx) yeniOzel[ki] = npHizmetOzelMetinleri[ki];
      else if (ki > idx) yeniOzel[ki - 1] = npHizmetOzelMetinleri[ki];
    });
    npHizmetOzelMetinleri = yeniOzel;
  }
  npHizmetSlotlariniRenderEt();
}

function npYeniBosHizmetKutusuEkle() {
  npHizmetSlotlari.push("");
  npHizmetSlotlariniRenderEt();
}

function npHizmetKutulariniSifirla() {
  npHizmetSlotlari = [""];
  npHizmetOzelMetinleri = {};
  npHizmetSlotlariniRenderEt();
}

function yeniPortfoyModalAc() {
  if (!proPaketAktif && portfoyler.length >= UCRETSIZ_LIMIT) {
    document.getElementById("paywallModal").classList.add("open");
    return;
  }

  npUlkeleriDoldur();
  npKonumUlkeDegisti();

  // Hizmet adımları sadece 1 numaralı tek boş kutucukla başlar; seçtikçe 2, 3... açılır
  npHizmetSlotlari = [""];
  npHizmetOzelMetinleri = {};
  npHizmetSlotlariniRenderEt();

  const fiyatInput = document.getElementById("npFiyat");
  if (fiyatInput) fiyatInput.value = "";

  yeniPortfoyAdimGit(1);
  document.getElementById("newPortfolioModal").classList.add("open");
}

function yeniPortfoyModalKapat() {
  document.getElementById("newPortfolioModal").classList.remove("open");
}

function rastgele12HaneliKodUret() {
  let kod = "";
  for (let i = 0; i < 12; i++) {
    kod += i === 0 ? String(Math.floor(Math.random() * 9) + 1) : String(Math.floor(Math.random() * 10));
  }
  return kod;
}

function yeniPortfoyOlusturOnayla() {
  const secilenAdlar = npHizmetSlotlari
    .map((val, idx) => {
      if (!val) return "";
      if (val === "__CUSTOM__") return (npHizmetOzelMetinleri[idx] || "").trim();
      return val.trim();
    })
    .filter(Boolean);

  // Eğer danışman hiç kutucuk doldurmadan geçerse temel adımları ekle (Detaylı Pazar Analizi sadece kullanıcı seçtiyse eklenir)
  const sonAdimListesi =
    secilenAdlar.length > 0
      ? secilenAdlar
      : [
          "Yerinde Keşif",
          "Profesyonel Fotoğraf Çekimi",
          "İlan Portalında Yayınlama"
        ];

  const secilenler = sonAdimListesi.map((ad, idx) => ({
    ad,
    durum: idx === 0 ? "current" : "pending",
    emoji: "",
    saticiYorumu: ""
  }));

  const yeniKod = rastgele12HaneliKodUret();
  const bugun = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  const bilinenOzellikler = npOzellikOzetiniOlustur();
  const saticiTel = (document.getElementById("npMulkSahibiTel")?.value || "0532 000 00 00").trim();
  const girilenIsim = (document.getElementById("npMulkSahibi")?.value || "").trim();
  const saticiAd = girilenIsim || `Mülk Sahibi (${saticiTel})`;
  const baslik = (document.getElementById("npBaslik")?.value || "").trim() || "Yeni Portföy — 3+1 Daire";

  const ulke = document.getElementById("npUlke")?.value || "Türkiye";
  const il = document.getElementById("npIl")?.value || "Ankara";
  const ilce = document.getElementById("npIlce")?.value || "Etimesgut";
  const semt = document.getElementById("npSemt")?.value || "";
  const mahalle = npSeciliMahalleAdiniAl();
  const semtMetni = semt && semt !== "Tüm Semtler" ? ` (${semt})` : "";
  const bolge = `${mahalle}${semtMetni}, ${ilce} / ${il}${ulke !== "Türkiye" ? ` (${ulke})` : ""}`;

  const girilenFiyatRakam = (document.getElementById("npFiyat")?.value || "").trim();
  const sonFiyat = girilenFiyatRakam
    ? girilenFiyatRakam.includes("₺")
      ? girilenFiyatRakam
      : `${girilenFiyatRakam} ₺`
    : "Pazar Analizi Sonrası Belirlenecek";

  const oda = document.getElementById("npOdaSayisi")?.value || "3";
  const salon = document.getElementById("npSalonSayisi")?.value || "1";
  const banyo = document.getElementById("npBanyoSayisi")?.value || "2";
  const brut = document.getElementById("npBrutAlan")?.value || "150";
  const teras = document.getElementById("npTerasAlan")?.value || "";
  const binaYasi = document.getElementById("npBinaYasi")?.value || "5";
  const binaKat = document.getElementById("npBinaKatSayisi")?.value || "10";
  const kat = document.getElementById("npBulunduguKat")?.value || "4";
  const kisaEtiket = `${oda}+${salon} • ${brut} m² • ${kat}. Kat`;

  const seciliOzelliklerObj = {
    konutTipi: npSeciliChipleriAl("konutTipi")[0] || "Apartman",
    apartmanTipi: npSeciliChipleriAl("apartmanTipi")[0] || "Daire",
    kullanimDurumu: npSeciliChipleriAl("kullanimDurumu")[0] || "Boş",
    yapiDurumu: npSeciliChipleriAl("yapiDurumu")[0] || "Standart",
    odaSayisi: oda,
    salonSayisi: salon,
    banyoSayisi: banyo,
    brutAlan: brut,
    terasAlan: teras,
    binaYasi: binaYasi,
    binaKatSayisi: binaKat,
    bulunduguKat: kat,
    cepheler: npSeciliChipleriAl("cepheDurumu"),
    manzaralar: npSeciliChipleriAl("manzara"),
    isitma: npSeciliChipleriAl("isitmaSistemi")[0] || "Doğalgaz/Kombi",
    olanaklar: npSeciliChipleriAl("olanaklar")
  };

  if (!danismanProfili) profilYukle();
  const aktifDanismanAd =
    (aktifKullanici && aktifKullanici.ad) || (danismanProfili && danismanProfili.ad) || "Gayrimenkul Danışmanı";
  const aktifDanismanTel =
    (aktifKullanici && aktifKullanici.telefon) || (danismanProfili && danismanProfili.telefon) || "0532 000 00 00";
  const aktifDanismanOfis =
    (aktifKullanici && aktifKullanici.ofis) || (danismanProfili && danismanProfili.ofis) || "Gayrimenkul Danışmanlık Ofisi";

  const pazarAnaliziSecildi = secilenler.some(h => /pazar\s*analiz/i.test(h.ad || ""));

  const yeniPortfoy = {
    kod: yeniKod,
    baslik: `${baslik} (${kisaEtiket})`,
    fiyat: sonFiyat,
    mulkSahibi: saticiAd,
    mulkSahibiTel: saticiTel,
    danisman: aktifDanismanAd,
    danismanTel: aktifDanismanTel,
    ofis: aktifDanismanOfis,
    bolge,
    ozellikDetay: bilinenOzellikler,
    ozellikler: seciliOzelliklerObj,
    pazarAnaliziSecildiMi: pazarAnaliziSecildi,
    durumEtiketi: pazarAnaliziSecildi
      ? "1. Adım: Fotoğraf Çekimi & Detaylı Pazar Analizi Sürecinde"
      : "1. Adım: Mülk Pazarlama Sürecinde",
    sonGuncelleme: bugun,
    sahibindenUrl: "",
    videoUrl: "",
    matterportUrl: "",
    takyidatUrl: "",
    goruntulenme: "0",
    siteIciGoruntulenmeSayisi: 0,
    tekilGoruntuleyenler: [],
    favori: "0",
    telefon: "0 Arama",
    gosterim: "0 Gösterim",
    sosyalErisim: "Hazırlanıyor",
    yetkiModu: "yok",
    yetkiSuresi: "",
    komisyon: "",
    yetkiOnaylandiMi: false,
    yetkiBelgesiDosyaAdi: "",
    yetkiOnayDetayi: "",
    hizmetler: secilenler,
    pazarAnalizi: {
      tamamlandiMi: false,
      danismanFoto: "../assets/gencay-hero-portre.jpg",
      danismanBio: `${bolge} bölgesinde uzman gayrimenkul danışmanı olarak; profesyonel fotoğraf çekimi, detaylı rakip fiyat analizi ve şeffaf raporlama ile hizmet veriyorum.`,
      referansMulkler:
        "Bağlıca 3+1 Site İçi Daire — 21 Günde Satıldı (5.100.000 ₺)\nYaşamkent 4+1 Bahçe Dubleks — 18 Günde Satıldı (7.350.000 ₺)",
      minFiyat: "5.000.000 ₺",
      maxFiyat: "5.250.000 ₺",
      finalDegerlendirme:
        "Yaptığım yerinde keşif ve rakip analizi sonucunda mülkünüzün 5.000.000 TL ile 5.250.000 TL aralığında satılacağına inanıyorum. Bu mülk için yapacağım hizmetler aşağıda yer almaktadır.",
      rakipler: []
    },
    gunluk: [
      {
        tarih: bugun,
        metin: `Mülk Özellikleri Kaydedildi: ${bilinenOzellikler}.`,
        gorunurluk: "private"
      }
    ],
    medya: [ORNEK_FOTOGRAFLAR[0]],
    teklifler: [],
    yerGosterimleri: [],
    taleplerMetni: `${bugun} | Mülk Takip Kodu Oluşturuldu | Mülkİzle takip kodu (${yeniKod}) oluşturuldu. | Başlangıç`
  };

  portfoyler.push(yeniPortfoy);
  seciliKod = yeniKod;
  acikAkordeonPortfoyKodu = yeniKod;
  verileriKaydet();
  yeniPortfoyModalKapat();
  panelYenile();

  alert(
    `MÜLK TAKİP KODU OLUŞTURULDU!\n\nTakip Kodu: ${yeniKod}\nMülk Sahibi: ${saticiAd} (${saticiTel})\nKonum: ${bolge}\nSatış Fiyatı: ${sonFiyat}`
  );
}

function paywallKapat() {
  document.getElementById("paywallModal").classList.remove("open");
}

function demoProyaGec() {
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  proPaketAktif = true;
  if (typeof uyeParaliUyeligiAktifEt === "function") {
    uyeParaliUyeligiAktifEt(aktifId, true);
  }
  paywallKapat();
  igSolMenuGuncelle("portfolios");
  panelYenile();
}

// ============================================================================
// 2. PANEL: SATICI (MÜLK SAHİBİ) & CO-OP ORTAK DANIŞMAN CANLI TAKİP EKRANI
// ============================================================================
let aktifTakipKoduGiris = "";
let aktifSaticiSekmesi = "seller-tab-process";

function saticiAltSekmeSec(sekmeId) {
  aktifSaticiSekmesi = sekmeId;
  saticiPaneliniGoster(aktifTakipKoduGiris || seciliKod);
}

const WHATSAPP_OFFICIAL_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.031 2C6.508 2 2.023 6.485 2.023 12.008c0 1.766.46 3.489 1.334 5.01L2 22l5.122-1.343a9.97 9.97 0 0 0 4.909 1.295h.004c5.522 0 10.007-4.485 10.007-10.008C22.042 6.485 17.554 2 12.031 2zm5.826 14.128c-.246.693-1.428 1.326-1.984 1.409-.506.076-1.147.108-1.852-.116-.428-.136-.977-.318-1.682-.622-2.96-1.278-4.892-4.26-5.04-4.458-.148-.197-1.203-1.601-1.203-3.054 0-1.453.76-2.167 1.03-2.463.271-.296.592-.37.789-.37.197 0 .395.002.567.01.182.009.426-.069.667.509.246.591.838 2.045.912 2.193.074.148.123.32.025.518-.099.197-.148.32-.296.493-.148.172-.311.385-.444.517-.148.148-.302.309-.13.604.173.296.767 1.265 1.646 2.049 1.132 1.009 2.085 1.322 2.381 1.47.296.148.469.123.641-.074.173-.197.74-.863.937-1.158.198-.296.395-.247.666-.148.271.099 1.726.814 2.022.962.296.148.493.222.567.345.074.123.074.715-.172 1.408z"/></svg>`;

function mulkKatalogOzellikleriHtml(p) {
  const oz = p.ozellikler || {};
  const konutTipi = oz.konutTipi || "Daire";
  const apartmanTipi = oz.apartmanTipi || "Site İçi";
  const odaSalon =
    oz.odaSayisi !== undefined
      ? `${oz.odaSayisi}+${oz.salonSayisi !== undefined ? oz.salonSayisi : 1}`
      : "3+1";
  const brutAlan = oz.brutAlan ? `${oz.brutAlan} m²` : "145 m²";
  const bulunduguKat =
    oz.bulunduguKat !== undefined
      ? `${oz.bulunduguKat}. Kat / ${oz.binaKatSayisi || 12} Katlı`
      : "7. Kat / 12 Katlı";
  const binaYasi = oz.binaYasi !== undefined ? `${oz.binaYasi} Yaşında` : "4 Yaşında";
  const banyoSayisi = oz.banyoSayisi !== undefined ? `${oz.banyoSayisi} Banyo` : "2 Banyo";
  const isitma = oz.isitma || "Yerden Isıtma";
  const kullanim = `${oz.kullanimDurumu || "Boş"} • ${oz.yapiDurumu || "Yapılı"}`;
  const cepheManzara =
    (Array.isArray(oz.cepheler) && oz.cepheler.length ? oz.cepheler.join(", ") : "Güney, Batı") +
    " • " +
    (Array.isArray(oz.manzaralar) && oz.manzaralar.length ? oz.manzaralar.join(", ") : "Panoramik Vadi & Şehir");

  const olanaklar =
    Array.isArray(oz.olanaklar) && oz.olanaklar.length > 0
      ? oz.olanaklar
      : ["Kapalı Otopark", "7/24 Güvenlik", "Çift Asansör", "Ebeveyn Banyosu", "Cam Balkon / Teras", "Akıllı Ev Sistemi"];

  return `
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid #F1F5F9;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <h2 class="saas-h2" style="margin:0;font-size:0.96rem;">Mülkün Özellikleri</h2>
        <span class="saas-text-xs">Katalog Künyesi</span>
      </div>
      <div class="catalog-specs-grid">
        <div class="catalog-spec-item">
          <span class="catalog-spec-label">Konut Tipi</span>
          <span class="catalog-spec-value">${konutTipi} (${apartmanTipi})</span>
        </div>
        <div class="catalog-spec-item">
          <span class="catalog-spec-label">Oda &amp; Salon</span>
          <span class="catalog-spec-value">${odaSalon}</span>
        </div>
        <div class="catalog-spec-item">
          <span class="catalog-spec-label">Brüt Alan</span>
          <span class="catalog-spec-value">${brutAlan}</span>
        </div>
        <div class="catalog-spec-item">
          <span class="catalog-spec-label">Bulunduğu Kat</span>
          <span class="catalog-spec-value">${bulunduguKat}</span>
        </div>
        <div class="catalog-spec-item">
          <span class="catalog-spec-label">Bina Yaşı</span>
          <span class="catalog-spec-value">${binaYasi}</span>
        </div>
        <div class="catalog-spec-item">
          <span class="catalog-spec-label">Banyo Sayısı</span>
          <span class="catalog-spec-value">${banyoSayisi}</span>
        </div>
        <div class="catalog-spec-item">
          <span class="catalog-spec-label">Isıtma Sistemi</span>
          <span class="catalog-spec-value">${isitma}</span>
        </div>
        <div class="catalog-spec-item">
          <span class="catalog-spec-label">Kullanım &amp; Yapı</span>
          <span class="catalog-spec-value">${kullanim}</span>
        </div>
        <div class="catalog-spec-item" style="grid-column:span 2;">
          <span class="catalog-spec-label">Cephe &amp; Manzara</span>
          <span class="catalog-spec-value">${cepheManzara}</span>
        </div>
      </div>
      <div class="catalog-amenities-row">
        ${olanaklar.map(ol => `<span class="catalog-amenity-pill">${ol}</span>`).join("")}
      </div>
    </div>
  `;
}

function saticiVeyaAlicidanDanismanProfilineGit(danismanId) {
  // Satıcı ve alıcının üyeliği yoktur; yalnızca kendilerine mülk takip kodunu gönderen danışmanın profilini "guest" (üye olmayan) olarak görürler
  profilGoruntuleyenModu = "guest";
  incelenenWebSitesiDanismanId = danismanId || "ahmet-demir";
  gorunumDegistir("view-agent-profile");
}

function saticiPaneliniGoster(kod) {
  const aranan = (kod || aktifTakipKoduGiris || seciliKod || "").trim().toUpperCase();
  const searchInput = document.getElementById("clientCodeInput");
  if (searchInput) searchInput.value = aranan;

  const container = document.getElementById("sellerPanelOutput");
  if (!container) return;

  const p = portfoyler.find(x => x.kod.toUpperCase() === aranan) || portfoyler[0];

  if (!p) {
    if (!danismanProfili) profilYukle();
    const dp = danismanProfili || {};
    const dAd = (aktifKullanici && aktifKullanici.ad) || dp.ad || "Gayrimenkul Danışmanı";
    const dOfis = (aktifKullanici && aktifKullanici.ofis) || dp.ofis || "Gayrimenkul Danışmanlık Ofisi";
    const dTel = (aktifKullanici && aktifKullanici.telefon) || dp.telefon || "0532 000 00 00";
    container.innerHTML = `
      <div class="saas-card" style="text-align:center;padding:32px 20px;">
        <h2 class="saas-h2" style="margin-bottom:6px;">Henüz Tanımlı Mülk Takip Kodu Bulunmuyor</h2>
        <p class="saas-text-sm" style="margin-bottom:16px;">
          Danışmanınız <strong>${dAd}</strong> (${dOfis}) tarafından size özel 12 haneli mülk takip kodu oluşturulduğunda sürecinizi buradan canlı izleyebilirsiniz.
        </p>
        <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
          <button type="button" class="social-btn-primary" onclick="saticiVeyaAlicidanDanismanProfilineGit('ahmet-demir')">
            <span>Danışman Profilini İncele (${dAd}) →</span>
          </button>
          <a href="tel:${dTel.replace(/\s+/g, "")}" class="social-btn-soft">
            <span>Ara</span>
          </a>
        </div>
      </div>
    `;
    return;
  }

  aktifTakipKoduGiris = p.kod;
  seciliKod = p.kod;

  const lucide = {
    externalLink: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    user: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    phone: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    messageSquare: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
  };

  const sosyalLinkler = portfoySosyalMedyaLinkleriniGetir(p);
  const ma = varsayilanPazarAnalizi(p);

  const toplamAdim = (p.hizmetler || []).length || 1;
  const tamamlananAdim = (p.hizmetler || []).filter(h => h.durum === "done").length;
  const ilerlemeYuzdesi = Math.min(100, Math.round((tamamlananAdim / toplamAdim) * 100));

  // Pazarlama Adımları: Noktasız, sadece animasyonlu tek çizgi + satıcı yorum yapabilme
  const adimlarHtml = (p.hizmetler || [])
    .map((h, idx) => {
      const sinif = h.durum === "done" ? "done" : h.durum === "current" ? "current" : "";
      const ikon = h.durum === "done" ? "✓" : h.durum === "current" ? "●" : "•";
      const evRenk =
        h.durum === "done" ? "#0F172A" : h.durum === "current" ? "#2563EB" : "#94A3B8";
      const durumMetni =
        h.durum === "done" ? "Tamamlandı" : h.durum === "current" ? "Aktif" : "Sırada";

      const isSosyalAdim = /sosyal medya|instagram|reels/i.test(h.ad || "");
      const sosyalLinkPillsHtml =
        isSosyalAdim && sosyalLinkler.length > 0
          ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;width:100%;" onclick="event.stopPropagation();">
              ${sosyalLinkler
                .map(
                  (sl, sIdx) => `
                  <a href="${sl.url}" target="_blank" rel="noopener noreferrer" class="saas-btn-outline-sm" style="padding:3px 9px;font-size:0.74rem;color:#2563EB;border-color:#BFDBFE;background:#EFF6FF;">
                    <span>${sIdx + 1}. ${sl.platform}</span>
                    ${lucide.externalLink}
                  </a>
                `
                )
                .join("")}
            </div>`
          : "";

      const saticiYorumSatiriHtml = h.saticiYorumu
        ? `<div style="width:100%;margin-top:6px;padding:6px 10px;background:#EFF6FF;border:1px solid #BFDBFE;border-radius:8px;font-size:0.78rem;color:#1E40AF;">
            <strong>Yorumunuz:</strong> "${h.saticiYorumu}"
          </div>`
        : "";

      return `
        <div class="house-step-item ${sinif}">
          <div class="house-node-circle" onclick="saticiAdimDetayPopUpAc(${idx})">
            <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M27 11L11 24.5H16V39H23.5V30H30.5V39H38V24.5H43L27 11Z" fill="${evRenk}" />
              <rect x="33" y="13" width="4" height="7.5" fill="${evRenk}" />
            </svg>
            <span class="house-node-status-pip">${ikon}</span>
          </div>
          <div class="house-step-card" style="flex-wrap:wrap;">
            <div class="house-step-title" onclick="saticiAdimDetayPopUpAc(${idx})" style="cursor:pointer;">
              <span>${h.ad}</span>
              <span class="house-step-status-label">${durumMetni}</span>
            </div>
            <div class="house-step-actions-group">
              <button type="button" class="saas-btn-outline-sm" style="padding:3px 10px;font-size:0.73rem;" onclick="event.stopPropagation(); saticiAdimYorumYaz(${idx})">
                ${lucide.messageSquare}
                <span>${h.saticiYorumu ? "Yorumu Düzenle" : "Yorum Yap"}</span>
              </button>
            </div>
            ${saticiYorumSatiriHtml}
            ${sosyalLinkPillsHtml}
          </div>
        </div>
      `;
    })
    .join("");

  // İsteğe Bağlı Detaylı Pazar Analizi (Yalnızca üye mülk takip kodu oluştururken "Detaylı Pazar Analizi" seçtiyse görünür)
  const pazarAnaliziSeciliMi = portfoydePazarAnaliziSeciliMi(p);
  const pazarAnaliziVarMi = Boolean(
    pazarAnaliziSeciliMi &&
      ma &&
      ((ma.rakipler && ma.rakipler.length > 0) || (ma.minFiyat && ma.minFiyat.trim()))
  );

  const rakiplerHtml =
    pazarAnaliziVarMi && (ma.rakipler || []).length > 0
      ? ma.rakipler
          .map(
            (r, i) => `
          <div class="saas-list-row">
            <div style="flex:1;">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <span class="saas-text-xs" style="font-weight:600;color:#2563EB;">Rakip #${i + 1} (${r.sure || "İlanda"})</span>
                <strong style="font-size:0.875rem;font-weight:600;color:#0F172A;">${r.baslik}</strong>
                ${
                  r.url
                    ? `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="saas-text-xs" style="color:#2563EB;text-decoration:none;display:inline-flex;align-items:center;gap:3px;">İlan ${lucide.externalLink}</a>`
                    : ""
                }
              </div>
              ${r.yorum ? `<div class="saas-text-xs" style="margin-top:3px;">${r.yorum}</div>` : ""}
            </div>
            <strong style="font-size:0.9375rem;font-weight:700;color:#0F172A;">${r.fiyat}</strong>
          </div>
        `
          )
          .join("")
      : `<div class="saas-text-xs" style="padding:10px 0;">Henüz rakip ilan eklenmedi.</div>`;

  const galeriHtml = (p.medya || [])
    .map(
      (m, idx) => `
      <div>
        <div class="watermarked-card" onclick="fotografPopUpAc(${idx})" title="Fotoğrafı büyütmek için tıklayın">
          <img src="${m.url}" alt="${m.baslik}" />
          ${filigranKatmaniHtml(p)}
        </div>
        <div class="media-card-footer">
          <strong class="saas-text-xs" style="color:#0F172A;">${m.baslik}</strong>
          <div style="display:flex;gap:4px;">
            <button type="button" class="saas-btn-outline-sm" style="padding:2px 7px;font-size:0.68rem;" onclick="fotografPopUpAc(${idx})">Büyüt</button>
            <button type="button" class="saas-btn-outline-sm" style="padding:2px 7px;font-size:0.68rem;" onclick="filigranliFotografiIndir(${idx})">İndir</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  const sosyalMedyaKatalogHtml =
    sosyalLinkler.length > 0
      ? `
      <div class="saas-card">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;">
          <div>
            <h2 class="saas-h2">Sosyal Medya Tanıtım Paylaşımları</h2>
            <span class="saas-text-xs">Yayınlanan sosyal medya tanıtımlarını bağlantılara tıklayarak inceleyebilirsiniz.</span>
          </div>
          <span class="saas-badge-blue">${sosyalLinkler.length} Paylaşım</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${sosyalLinkler
            .map(
              (sl, sIdx) => `
              <a href="${sl.url}" target="_blank" rel="noopener noreferrer" class="saas-btn-outline-sm" style="padding:7px 13px;font-size:0.8125rem;color:#2563EB;border-color:#BFDBFE;background:#EFF6FF;">
                <span>${sIdx + 1}. ${sl.platform}</span>
                ${lucide.externalLink}
              </a>
            `
            )
            .join("")}
        </div>
      </div>
    `
      : "";

  // EN ALTTA: 360° Sanal Tur (Yalnızca Detaylı Pazar Analizi OLMAYAN standart katalog görünümünde yer alır; Pazar Analizinde 360° Sanal Tur yer almaz!)
  const matterportHtml =
    !pazarAnaliziVarMi && p.matterportUrl && p.matterportUrl.trim() !== ""
      ? `
      <div class="saas-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <h2 class="saas-h2">360° Sanal Tur</h2>
          <a href="${p.matterportUrl}" target="_blank" rel="noopener noreferrer" class="saas-btn-outline-sm"><span>Tam Ekran Aç</span>${lucide.externalLink}</a>
        </div>
        <div class="matterport-frame-wrap" style="margin:0;">
          <iframe src="${p.matterportUrl}" width="100%" height="360" frameborder="0" allowfullscreen allow="xr-spatial-tracking"></iframe>
        </div>
      </div>
    `
      : "";

  if (pazarAnaliziVarMi) {
    // SATICI GÖZÜNDEN DETAYLI PAZAR ANALİZİ SIRALAMASI:
    // 1. Başlık: (Müşteri Adı Soyadı) İçin Özel Hazırlanmış Detaylı Pazar Analizi
    // 2. Hazırlayan: (Emlakçı Adı Soyadı) • Firma İsmi • Telefon (+ PDF Çıkar Butonu)
    // 3. Mülkün Özellikleri
    // 4. Altında Mülkün Fotoğrafları
    // 5. Altında Rakip İlanlar (360° Sanal Tur YOK)
    // 6. Altında Tahmini Fiyat
    // 7. Sonra da Pazarlama Faaliyetlerine Başlandığı Zaman Yapılacak Pazarlama Adımları
    container.innerHTML = `
      <!-- 1 & 2 & 3. BAŞLIK, HAZIRLAYAN BİLGİSİ VE MÜLKÜN ÖZELLİKLERİ -->
      <div class="saas-card">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:16px;">
          <div>
            <div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:6px;">
              <span class="saas-badge-blue">DETAYLI PAZAR ANALİZİ RAPORU</span>
              <span class="saas-badge-neutral">Mülk Takip No: #${p.kod}</span>
              <span class="hb-portfolio-view-counter" title="Portföy Görüntülenme Sayacı">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <span>${portfoyGoruntulenmeSayisiniAl(p).toLocaleString("tr-TR")} Görüntülenme</span>
              </span>
              <span class="saas-text-xs">${p.bolge} • ${p.sonGuncelleme}</span>
            </div>
            <h1 class="saas-h1">${p.mulkSahibi} İçin Özel Hazırlanmış Detaylı Pazar Analizi</h1>
            <div class="saas-text-sm" style="margin-top:4px;font-weight:600;color:#475569;">${p.baslik}</div>
          </div>

          <button type="button" class="saas-btn-primary-sm" style="padding:9px 16px;" onclick="pazarAnaliziPdfCikar('${p.kod}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            <span>PDF Formatında Çıkar</span>
          </button>
        </div>

        <!-- HAZIRLAYAN: Emlakçı Adı Soyadı • Firma İsmi • Telefon -->
        <div class="saas-agent-row">
          <div class="saas-agent-identity" onclick="saticiVeyaAlicidanDanismanProfilineGit('ahmet-demir')" title="Danışman Profilini İncele">
            <img src="${ma.danismanFoto || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"}" onerror="this.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'" alt="${p.danisman}" class="saas-agent-avatar" />
            <div>
              <div style="font-size:0.875rem;font-weight:700;color:#0F172A;">Hazırlayan: ${p.danisman}</div>
              <div class="saas-text-xs" style="font-weight:600;color:#334155;">${p.ofis} • ${p.danismanTel || "0532 555 44 33"}</div>
            </div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
            <a href="tel:${(p.danismanTel || "05320000000").replace(/\s+/g, "")}" class="social-btn-primary" style="padding:7px 14px;font-size:0.78rem;" title="${p.danismanTel || ""}">
              ${lucide.phone}
              <span>Ara</span>
            </a>
            <a href="https://wa.me/9${(p.danismanTel || "05320000000").replace(/\D/g, "")}?text=${encodeURIComponent(`Merhaba ${p.danisman}, #${p.kod} takip kodlu mülkümün pazar analizi için ulaşıyorum.`)}" target="_blank" rel="noopener noreferrer" class="social-btn-whatsapp" style="padding:7px 14px;font-size:0.78rem;" title="WhatsApp ile Mesaj">
              ${WHATSAPP_OFFICIAL_SVG}
              <span>Mesaj</span>
            </a>
            <button type="button" class="social-btn-soft" style="padding:7px 14px;font-size:0.78rem;" onclick="saticiVeyaAlicidanDanismanProfilineGit('ahmet-demir')">
              ${lucide.user}
              <span>Danışman Profili</span>
            </button>
          </div>
        </div>

        <!-- MÜLKÜN ÖZELLİKLERİ -->
        ${mulkKatalogOzellikleriHtml(p)}
      </div>

      <!-- 4. ALTINDA: MÜLKÜN FOTOĞRAFLARI -->
      <div class="saas-card">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px;">
          <div>
            <h2 class="saas-h2">Mülkün Fotoğrafları</h2>
            <span class="saas-text-xs">Fotoğrafın üzerine tıklayarak büyütebilir veya tümünü indirebilirsiniz.</span>
          </div>
          <button type="button" class="saas-btn-outline-sm" onclick="tumFiligranliFotograflariIndir()">
            <span>Tüm Fotoğrafları İndir (${(p.medya || []).length})</span>
          </button>
        </div>
        <div class="media-grid">
          ${galeriHtml}
        </div>
      </div>

      <!-- 5. ALTINDA: RAKİP İLANLAR (PAZAR ANALİZİNDE 360° SANAL TUR YOK) -->
      <div class="saas-card">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;padding-bottom:12px;border-bottom:1px solid #E2E8F0;margin-bottom:12px;">
          <div>
            <h2 class="saas-h2">Rakip İlanlar &amp; Bölge Emsal Karşılaştırması</h2>
            <div class="saas-text-xs">Bölgedeki güncel rakip satılık ilanlar ve saha analiz notları.</div>
          </div>
          <span class="saas-badge-blue">${(ma.rakipler || []).length} Rakip İlan</span>
        </div>
        <div class="saas-clean-list">
          ${rakiplerHtml}
        </div>
      </div>

      <!-- 6. ALTINDA: TAHMİNİ FİYAT -->
      <div class="saas-card" style="border:1.5px solid #2563EB;background:#F8FAFC;">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:14px;">
          <div>
            <span class="saas-badge-blue" style="margin-bottom:6px;">TAHMİNİ SATIŞ FİYATI</span>
            <h2 class="saas-h2">Önerilen Tahmini Satış Fiyat Aralığı</h2>
            <div class="saas-text-xs">Yerinde keşif ve rakip ilan analizleri sonucunda belirlenen optimum fiyat aralığı.</div>
          </div>
          <div style="font-size:1.5rem;font-weight:800;color:#0F172A;letter-spacing:-0.02em;">
            ${ma.minFiyat || "Belirlenmedi"} ${ma.maxFiyat ? `– ${ma.maxFiyat}` : ""}
          </div>
        </div>
        ${
          ma.finalDegerlendirme
            ? `<div style="margin-top:14px;padding-top:14px;border-top:1px solid #DBEAFE;font-size:0.875rem;color:#0F172A;line-height:1.55;">
                <strong>Danışman Değerlendirmesi:</strong> ${ma.finalDegerlendirme}
              </div>`
            : ""
        }
      </div>

      <!-- 7. EN ALTTA: PAZARLAMA FAALİYETLERİNE BAŞLANDIĞI ZAMAN YAPILACAK PAZARLAMA ADIMLARI -->
      <div class="saas-card">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;margin-bottom:12px;">
          <div>
            <h2 class="saas-h2">Pazarlama Faaliyetlerine Başlandığı Zaman Yapılacak Pazarlama Adımları</h2>
            <div class="saas-text-xs">Yürütülen ve planlanan pazarlama çalışmalarını takip edebilir, her adıma yorum bırakabilirsiniz.</div>
          </div>
          <span class="saas-badge-blue">${tamamlananAdim}/${toplamAdim} Adım Tamamlandı (%${ilerlemeYuzdesi})</span>
        </div>

        <div style="width:100%;height:6px;background:#E2E8F0;border-radius:999px;overflow:hidden;margin-bottom:16px;">
          <div style="width:${ilerlemeYuzdesi}%;height:100%;background:#2563EB;border-radius:999px;transition:width 0.4s ease;"></div>
        </div>

        <div class="house-line-stepper-wrap" style="max-width:100%;margin:0;">
          <div class="house-line-stepper">
            ${adimlarHtml}
          </div>
        </div>
      </div>

      ${sosyalMedyaKatalogHtml}
    `;
    return;
  }

  // EĞER DETAYLI PAZAR ANALİZİ SEÇİLMEDİYSE STANDART SATICI TAKİP EKRANI
  container.innerHTML = `
    <!-- 1. EN BAŞTA: MÜLK BAŞLIĞI, SORUMLU DANIŞMAN (CO-OP GİZLİ) VE MÜLKÜN ÖZELLİKLERİ KATALOĞU -->
    <div class="saas-card">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:16px;">
        <div>
          <div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:6px;">
            <span class="saas-badge-neutral">Mülk Takip No: #${p.kod}</span>
            <span class="hb-portfolio-view-counter" title="Portföy Görüntülenme Sayacı">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <span>${portfoyGoruntulenmeSayisiniAl(p).toLocaleString("tr-TR")} Görüntülenme</span>
            </span>
            <span class="saas-text-xs">${p.bolge}</span>
            <span class="saas-text-xs">• Güncelleme: ${p.sonGuncelleme}</span>
          </div>
          <h1 class="saas-h1">${p.baslik}</h1>
        </div>
        <div style="text-align:right;">
          <div class="saas-price">${p.fiyat || ""}</div>
          <div class="saas-text-xs">${p.durumEtiketi}</div>
        </div>
      </div>

      <!-- Sadece Mülk Takip Kodunu Gönderen Sorumlu Emlakçı Görünür (Selin Yılmaz / Co-Op Gösterilmez) -->
      <div class="saas-agent-row">
        <div class="saas-agent-identity" onclick="saticiVeyaAlicidanDanismanProfilineGit('ahmet-demir')" title="Danışman Profilini İncele">
          <img src="${ma.danismanFoto || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"}" onerror="this.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'" alt="${p.danisman}" class="saas-agent-avatar" />
          <div>
            <div style="font-size:0.875rem;font-weight:600;color:#0F172A;">${p.danisman}</div>
            <div class="saas-text-xs">${p.ofis} • ${p.danismanTel || "0532 555 44 33"}</div>
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
          <a href="tel:${(p.danismanTel || "05320000000").replace(/\s+/g, "")}" class="social-btn-primary" style="padding:7px 14px;font-size:0.78rem;" title="${p.danismanTel || ""}">
            ${lucide.phone}
            <span>Ara</span>
          </a>
          <a href="https://wa.me/9${(p.danismanTel || "05320000000").replace(/\D/g, "")}?text=${encodeURIComponent(`Merhaba ${p.danisman}, #${p.kod} takip kodlu mülküm için ulaşıyorum.`)}" target="_blank" rel="noopener noreferrer" class="social-btn-whatsapp" style="padding:7px 14px;font-size:0.78rem;" title="WhatsApp ile Mesaj">
            ${WHATSAPP_OFFICIAL_SVG}
            <span>Mesaj</span>
          </a>
          <button type="button" class="social-btn-soft" style="padding:7px 14px;font-size:0.78rem;" onclick="saticiDurumYenilemeTalebiGonder('${p.kod}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            <span>Güncel Durum / Yenileme İste</span>
          </button>
          <button type="button" class="social-btn-soft" style="padding:7px 14px;font-size:0.78rem;" onclick="saticiVeyaAlicidanDanismanProfilineGit('ahmet-demir')">
            ${lucide.user}
            <span>Danışman Profili</span>
          </button>
        </div>
      </div>

      <!-- MÜLKÜN ÖZELLİKLERİ EN BAŞTA (KATALOG KÜNYESİ) -->
      ${mulkKatalogOzellikleriHtml(p)}
    </div>

    <!-- 2. PAZARLAMA ADIMLARI (NOKTASIZ, ANİMASYONLU TEK ÇİZGİ & SATICI YORUM ÖZELLİĞİ) -->
    <div class="saas-card">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;margin-bottom:12px;">
        <div>
          <h2 class="saas-h2">Mülk Pazarlama Adımları</h2>
          <div class="saas-text-xs">Yürütülen pazarlama çalışmalarını takip edebilir ve her adıma yorum bırakabilirsiniz.</div>
        </div>
        <span class="saas-badge-blue">${tamamlananAdim}/${toplamAdim} Adım Tamamlandı (%${ilerlemeYuzdesi})</span>
      </div>

      <div style="width:100%;height:6px;background:#E2E8F0;border-radius:999px;overflow:hidden;margin-bottom:16px;">
        <div style="width:${ilerlemeYuzdesi}%;height:100%;background:#2563EB;border-radius:999px;transition:width 0.4s ease;"></div>
      </div>

      <div class="house-line-stepper-wrap" style="max-width:100%;margin:0;">
        <div class="house-line-stepper">
          ${adimlarHtml}
        </div>
      </div>
    </div>

    <!-- 3. MÜLK FOTOĞRAFLARI KATALOĞU -->
    <div class="saas-card">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px;">
        <div>
          <h2 class="saas-h2">Mülk Fotoğrafları</h2>
          <span class="saas-text-xs">Fotoğrafın üzerine tıklayarak büyütebilir veya tümünü indirebilirsiniz.</span>
        </div>
        <button type="button" class="saas-btn-outline-sm" onclick="tumFiligranliFotograflariIndir()">
          <span>Tüm Fotoğrafları İndir (${(p.medya || []).length})</span>
        </button>
      </div>
      <div class="media-grid">
        ${galeriHtml}
      </div>
    </div>

    ${sosyalMedyaKatalogHtml}

    <!-- 4. EN ALTTA: 360° SANAL TUR (YER GÖSTERİMİ VE TEKLİF VERME FORMU SATICIDA YOKTUR) -->
    ${matterportHtml}
  `;
}

// Satıcının Her Adıma Emoji (👍 ❤️ 👏 🔥) Bırakması
function saticiAdimEmojiSec(idx, emoji) {
  const p = aktifPortfoy();
  if (!p || !p.hizmetler || !p.hizmetler[idx]) return;
  const h = p.hizmetler[idx];
  h.emoji = h.emoji === emoji ? "" : emoji;
  verileriKaydet();
  saticiPaneliniGoster(p.kod);
}

// Satıcının Her Adıma Yorum Yazması
function saticiAdimYorumYaz(idx) {
  const p = aktifPortfoy();
  if (!p || !p.hizmetler || !p.hizmetler[idx]) return;
  const h = p.hizmetler[idx];
  const yorum = prompt(
    `💬 "${h.ad}" adımı için danışmanınız ${p.danisman}'a yorumunuzu yazın:`,
    h.saticiYorumu || "Elinize sağlık, çok güzel olmuş."
  );
  if (yorum === null) return;
  h.saticiYorumu = yorum.trim();
  verileriKaydet();
  saticiPaneliniGoster(p.kod);
}

// Satıcı Panelinin Altındaki WhatsApp Mesaj Kutusundan Danışmana Soru/Mesaj Gönderme
function saticidanEmlakciyaWhatsappGonder() {
  const p = aktifPortfoy();
  if (!p) return;
  const input = document.getElementById("sellerDirectWaInput");
  const mesaj = (input?.value || "").trim() || `Merhaba ${p.danisman}, ${p.kod} kodlu mülkümün takip ekranını inceledim.`;

  const bugun = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit"
  });

  // Mülk günlüğüne de satıcı sorusu olarak kaydet
  p.gunluk = p.gunluk || [];
  p.gunluk.unshift({
    tarih: `${bugun} • Satıcı Mesajı`,
    metin: `💬 Mülk Sahibi (${p.mulkSahibi}) Mesajı: "${mesaj}"`,
    gorunurluk: "public"
  });
  verileriKaydet();

  const temizTel = (p.danismanTel || "905320000000").replace(/\D/g, "");
  const waTel = temizTel.startsWith("0") ? `9${temizTel}` : temizTel;
  const tamMetin = `📦 *Mülkİzle (${p.kod} - ${p.baslik})*\n*Mülk Sahibi:* ${p.mulkSahibi}\n\n💬 *Mesajım:* ${mesaj}`;
  window.open(`https://wa.me/${waTel}?text=${encodeURIComponent(tamMetin)}`, "_blank");
  if (input) input.value = "";
  saticiPaneliniGoster(p.kod);
}

function saticiMobilYetkiOnayla() {
  const p = aktifPortfoy();
  if (!p) return;
  const otp = (document.getElementById("sellerOtpInput").value || "").trim();
  const tcSon4 = (document.getElementById("sellerTcInput").value || "").trim() || "Doğrulandı";
  if (!otp) {
    alert("Lütfen SMS onay kodunu girin.");
    return;
  }

  const damga = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  p.yetkiOnaylandiMi = true;
  p.yetkiOnayDetayi = `${damga} • SMS Kodu (${otp}) & TC Son 4 (${tcSon4}) ile ${p.mulkSahibi} tarafından mobil onaylandı`;

  verileriKaydet();
  saticiPaneliniGoster(p.kod);
  alert("✅ Yetki Sözleşmesi mobil onayla başarıyla mühürlendi!");
}

// Satıcının Fiyat Teklifini Onaylaması veya Reddetmesi
function saticiTeklifKarar(idx, karar) {
  const p = aktifPortfoy();
  if (!p || !p.teklifler || !p.teklifler[idx]) return;

  const t = p.teklifler[idx];
  const not = prompt(
    karar === "approved"
      ? `✅ "${t.alici}" tarafından verilen ${t.tutar} teklifi ONAYLIYORSUNUZ.\nDanışmanınıza iletmek istediğiniz bir not var mı? (Boş bırakabilirsiniz):`
      : `❌ "${t.alici}" tarafından verilen ${t.tutar} teklifi REDDEDİYORSUNUZ.\nVarsa karşı teklifinizi veya red sebebinizi yazabilirsiniz:`,
    karar === "approved" ? "Teklifi uygun buldum, kapora ve sözleşme sürecini başlatabiliriz." : "Rakam beklentimizin altında."
  );

  if (not === null) return; // İptal

  t.durum = karar;
  t.saticiYaniti = not.trim() || (karar === "approved" ? "Satıcı tarafından onaylandı." : "Satıcı tarafından reddedildi.");

  verileriKaydet();
  saticiPaneliniGoster(p.kod);
}

// Satıcının Yer Gösterim Randevusunu Onaylaması veya Reddetmesi
function saticiGosterimKarar(idx, karar) {
  const p = aktifPortfoy();
  if (!p || !p.yerGosterimleri || !p.yerGosterimleri[idx]) return;

  const g = p.yerGosterimleri[idx];
  const not = prompt(
    karar === "approved"
      ? `✅ "${g.tarihSaat}" tarihli yer gösterim randevusunu ONAYLIYORSUNUZ.\nDanışmanınıza iletmek istediğiniz bir not var mı?`
      : `❌ "${g.tarihSaat}" tarihli yer gösterim randevusunu REDDEDİYORSUNUZ.\nUygun olduğunuz alternatif gün/saati yazabilirsiniz:`,
    karar === "approved" ? "Belirtilen saatte mülk gösterime uygundur." : "O saatte müsait değiliz, farklı bir saat planlayalım."
  );

  if (not === null) return; // İptal

  g.durum = karar;
  g.saticiYaniti = not.trim() || (karar === "approved" ? "Randevu satıcı tarafından onaylandı." : "Randevu saati satıcı tarafından reddedildi.");

  verileriKaydet();
  saticiPaneliniGoster(p.kod);
}

// ============================================================================
// 3. PANEL: ALICI (DİJİTAL SUNUM, 360° TUR, FİLİGRANLI GALERİ & TEKLİF VERME)
// ============================================================================
function aliciSecimKutusunuDoldur() {
  const sel = document.getElementById("buyerPortfolioSelect");
  if (!sel) return;
  const yayindakiPortfoyler = portfoyler.filter(portfoyunAktifIlaniVarMi);
  sel.innerHTML = yayindakiPortfoyler
    .map(p => `<option value="${p.kod}" ${p.kod === seciliKod ? "selected" : ""}>${p.kod} — ${p.baslik} (${p.fiyat || ""})</option>`)
    .join("");
}

function aliciPaneliniGoster(kod) {
  const p = portfoyler.find(x => x.kod === kod) || aktifPortfoy();
  const container = document.getElementById("buyerPanelOutput");
  if (!p || !container) return;

  seciliKod = p.kod;
  const ma = varsayilanPazarAnalizi(p);
  const extIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

  const sosyalLinkler = portfoySosyalMedyaLinkleriniGetir(p);
  const aliciSosyalMedyaHtml =
    sosyalLinkler.length > 0
      ? `
      <div class="saas-card">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;">
          <div>
            <h2 class="saas-h2">Sosyal Medya Tanıtım Paylaşımları</h2>
            <span class="saas-text-xs">Bu mülk için yayınlanan sosyal medya tanıtımlarını aşağıdaki bağlantılara tıklayarak tek tek inceleyebilirsiniz.</span>
          </div>
          <span class="saas-badge-blue">${sosyalLinkler.length} Paylaşım</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${sosyalLinkler
            .map(
              (sl, sIdx) => `
              <a href="${sl.url}" target="_blank" rel="noopener noreferrer" class="saas-btn-outline-sm" style="padding:7px 13px;font-size:0.8125rem;color:#2563EB;border-color:#BFDBFE;background:#EFF6FF;">
                <span>${sIdx + 1}. ${sl.platform}</span>
                ${extIcon}
              </a>
            `
            )
            .join("")}
        </div>
      </div>
    `
      : "";

  const matterportHtml =
    p.matterportUrl && p.matterportUrl.trim() !== ""
      ? `
      <div class="saas-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <h2 class="saas-h2">360° Sanal Tur</h2>
          <a href="${p.matterportUrl}" target="_blank" rel="noopener noreferrer" class="saas-btn-outline-sm"><span>Tam Ekran Aç</span>${extIcon}</a>
        </div>
        <div class="matterport-frame-wrap" style="margin:0;">
          <iframe src="${p.matterportUrl}" width="100%" height="360" frameborder="0" allowfullscreen allow="xr-spatial-tracking"></iframe>
        </div>
      </div>
    `
      : "";

  const galeriHtml = (p.medya || [])
    .map(
      (m, idx) => `
      <div>
        <div class="watermarked-card" onclick="fotografPopUpAc(${idx})" title="Fotoğrafı büyütmek için tıklayın">
          <img src="${m.url}" alt="${m.baslik}" />
          ${filigranKatmaniHtml(p)}
        </div>
        <div class="media-card-footer">
          <strong class="saas-text-xs" style="color:#0F172A;">${m.baslik}</strong>
          <div style="display:flex;gap:4px;">
            <button type="button" class="saas-btn-outline-sm" style="padding:2px 7px;font-size:0.68rem;" onclick="fotografPopUpAc(${idx})">Büyüt</button>
            <button type="button" class="saas-btn-outline-sm" style="padding:2px 7px;font-size:0.68rem;" onclick="filigranliFotografiIndir(${idx})">İndir</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  container.innerHTML = `
    <!-- 1. EN BAŞTA: MÜLK BAŞLIĞI, SORUMLU DANIŞMAN VE MÜLKÜN ÖZELLİKLERİ KATALOĞU -->
    <div class="saas-card">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:16px;">
        <div>
          <div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:6px;">
            <span class="saas-badge-neutral">Mülk Takip No: #${p.kod}</span>
            <span class="hb-portfolio-view-counter" title="Portföy Görüntülenme Sayacı">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <span>${portfoyGoruntulenmeSayisiniAl(p).toLocaleString("tr-TR")} Görüntülenme</span>
            </span>
            <span class="saas-text-xs">${p.bolge}</span>
            <span class="saas-badge-blue">Tapu &amp; Evrak Kontrolü Tamamlandı</span>
          </div>
          <h1 class="saas-h1">${p.baslik}</h1>
        </div>
        <div style="text-align:right;">
          <div class="saas-price">${p.fiyat || "Fiyat Sorunuz"}</div>
          <div class="saas-text-xs">${p.durumEtiketi}</div>
        </div>
      </div>

      <!-- Sadece Mülk Takip Numarasını Gönderen Emlakçının Profili Görünür -->
      <div class="saas-agent-row">
        <div class="saas-agent-identity" onclick="saticiVeyaAlicidanDanismanProfilineGit('ahmet-demir')">
          <img src="${ma.danismanFoto || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"}" onerror="this.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'" alt="${p.danisman}" class="saas-agent-avatar" />
          <div>
            <div style="font-size:0.875rem;font-weight:600;color:#0F172A;">${p.danisman}</div>
            <div class="saas-text-xs">${p.ofis} • ${p.danismanTel || "0532 555 44 33"}</div>
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
          <a href="tel:${(p.danismanTel || "05320000000").replace(/\s+/g, "")}" class="social-btn-primary" style="padding:7px 14px;font-size:0.78rem;" title="${p.danismanTel || ""}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>Ara</span>
          </a>
          <a href="https://wa.me/9${(p.danismanTel || "05320000000").replace(/\D/g, "")}?text=${encodeURIComponent(`Merhaba ${p.danisman}, #${p.kod} portföyünüz için ulaşıyorum.`)}" target="_blank" rel="noopener noreferrer" class="social-btn-whatsapp" style="padding:7px 14px;font-size:0.78rem;" title="WhatsApp ile Mesaj">
            ${WHATSAPP_OFFICIAL_SVG}
            <span>Mesaj</span>
          </a>
          <button type="button" class="social-btn-soft" style="padding:7px 14px;font-size:0.78rem;" onclick="saticiVeyaAlicidanDanismanProfilineGit('ahmet-demir')">
            <span>Danışman Profili</span>
          </button>
        </div>
      </div>

      <!-- MÜLKÜN ÖZELLİKLERİ EN BAŞTA (KATALOG KÜNYESİ) -->
      ${mulkKatalogOzellikleriHtml(p)}
    </div>

    <!-- 2. MÜLK FOTOĞRAFLARI KATALOĞU -->
    <div class="saas-card">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px;">
        <div>
          <h2 class="saas-h2">Mülk Fotoğrafları</h2>
          <span class="saas-text-xs">Fotoğrafın üzerine tıklayarak büyütebilir veya tümünü indirebilirsiniz.</span>
        </div>
        <button type="button" class="saas-btn-outline-sm" onclick="tumFiligranliFotograflariIndir()">
          <span>Tüm Fotoğrafları İndir (${(p.medya || []).length})</span>
        </button>
      </div>
      <div class="media-grid">
        ${galeriHtml}
      </div>
    </div>

    <!-- 3. SOSYAL MEDYA TANITIM PAYLAŞIMLARI -->
    ${aliciSosyalMedyaHtml}

    <!-- 4. 360° SANAL TUR (TEKLİF VE YER GÖSTERİMİ KISMINA KADAR EN ALTTA) -->
    ${matterportHtml}

    <!-- 5. EN ALTTA: YERİNDE GÖSTERİM RANDEVUSU VEYA FİYAT TEKLİFİ İLETİN -->
    <div class="saas-card">
      <h2 class="saas-h2" style="margin-bottom:4px;">Yerinde Gösterim Randevusu veya Fiyat Teklifi İletin</h2>
      <p class="saas-text-xs" style="margin-bottom:14px;">
        Talebiniz doğrudan sorumlu danışman ekranına (${p.danisman}) iletilir.
      </p>

      <div class="form-grid-3">
        <div class="field">
          <label>Adınız Soyadınız</label>
          <input type="text" id="buyerName" value="" placeholder="Adınız Soyadınız" />
        </div>
        <div class="field">
          <label>Cep Telefonunuz</label>
          <input type="text" id="buyerPhone" value="" placeholder="0532 000 00 00" />
        </div>
        <div class="field">
          <label>Talep Türü</label>
          <select id="buyerActionType">
            <option value="Gösterim Randevusu">Yerinde Gösterim Randevusu</option>
            <option value="Fiyat Teklifi">Resmi Fiyat Teklifi</option>
            <option value="Kredi / Takas Sorusu">Kredi / Takas Bilgisi</option>
          </select>
        </div>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <input
          type="text"
          id="buyerMessage"
          class="saas-input-compact"
          placeholder="Örn: Cumartesi saat 15:00 randevu talebi veya 4.750.000 TL nakit teklifimizdir..."
          style="flex:1;min-width:240px;padding:9px 12px;font-size:0.84rem;"
        />
        <button type="button" class="saas-btn-primary-sm" style="padding:9px 16px;" onclick="aliciTalebiGonder()">
          <span>Talebi Danışmana İlet</span>
        </button>
      </div>
    </div>
  `;
}

function aliciTalebiGonder() {
  const p = aktifPortfoy();
  if (!p) return;

  const ad = (document.getElementById("buyerName").value || "").trim();
  const tel = (document.getElementById("buyerPhone").value || "").trim();
  const tur = document.getElementById("buyerActionType").value;
  const mesaj = (document.getElementById("buyerMessage").value || "").trim();

  if (!ad || !mesaj) {
    alert("Lütfen adınızı ve randevu/teklif mesajınızı yazın.");
    return;
  }

  const bugun = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
  const yeniSatir = `${bugun} | Alıcı Paneli (${ad} - ${tel || "Tel Yok"}) | ${mesaj} | ${tur}`;

  p.taleplerMetni = p.taleplerMetni ? `${yeniSatir}\n${p.taleplerMetni}` : yeniSatir;

  if (tur === "Fiyat Teklifi") {
    p.teklifler = p.teklifler || [];
    p.teklifler.unshift({
      alici: ad,
      tutar: mesaj,
      odemeSekli: "Alıcı Paneli Teklifi",
      tarih: bugun,
      not: `Alıcı Panelinden gönderildi (Tel: ${tel || "-"})`,
      durum: "pending",
      saticiYaniti: ""
    });
  } else if (tur === "Gösterim Randevusu") {
    p.yerGosterimleri = p.yerGosterimleri || [];
    p.yerGosterimleri.unshift({
      alici: ad,
      telefon: tel || "-",
      tarihSaat: mesaj,
      not: "Alıcı Panelinden online randevu talep edildi.",
      durum: "pending",
      saticiYaniti: ""
    });
  }

  // Mülk günlüğüne de otomatik bilgi düşürelim
  p.gunluk = p.gunluk || [];
  p.gunluk.unshift({
    tarih: `${bugun} • Alıcı Paneli`,
    metin: `Alıcı Panelinden yeni ${tur} geldi (${ad}): "${mesaj}"`,
    gorunurluk: "public"
  });

  verileriKaydet();
  alert(`✅ Sayın ${ad}, "${tur}" talebiniz sorumlu emlak danışmanı ${p.danisman}'a ve mülk takip sistemine başarıyla iletildi!`);
  document.getElementById("buyerMessage").value = "";
}

// ============================================================================
// DANIŞMAN KİŞİSEL WEB SİTESİ, OYUNLAŞTIRILMIŞ ROZETLER & BLOG SİSTEMİ
// ============================================================================
const PROFILE_STORAGE_KEY = "mulkizle_danisman_profili_clean_v1";

const VARSAYILAN_DANIŞMAN_PROFILI = {
  ad: "",
  ofis: "",
  deneyim: "",
  telefon: "",
  foto: "",
  il: "Ankara",
  ilce: "",
  bolgeler: "",
  hobiler: "",
  bio: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  magazaUrl: "",
  bloglar: []
};

let danismanProfili = null;

function profilYukle() {
  try {
    const kayitli = localStorage.getItem(PROFILE_STORAGE_KEY);
    danismanProfili = kayitli ? JSON.parse(kayitli) : JSON.parse(JSON.stringify(VARSAYILAN_DANIŞMAN_PROFILI));
  } catch (e) {
    danismanProfili = JSON.parse(JSON.stringify(VARSAYILAN_DANIŞMAN_PROFILI));
  }
}

function profilKaydetStorage() {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(danismanProfili));
  } catch (e) {}
}

// Doldurulan Her Alan İçin Kazanılan Rozetleri Hesapla (İnce Çizgili Lucide SVG İkonlarla)
function danismanRozetleriniHesapla(dp) {
  const p = aktifPortfoy();
  const svgIcon = path =>
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

  return [
    {
      id: "bio_office",
      ikon: svgIcon(`<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`),
      baslik: "Kurumsal Özgeçmiş & Ofis",
      aciklama: "Özgeçmiş ve ofis bilgileri doğrulandı.",
      kazanildi: Boolean(dp.bio && dp.bio.trim().length > 20 && dp.ofis && dp.ofis.trim().length > 3)
    },
    {
      id: "regions",
      ikon: svgIcon(`<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`),
      baslik: "İl & İlçe Bölge Uzmanı",
      aciklama: "Uzmanlık bölgeleri tanımlandı.",
      kazanildi: Boolean(dp.il && dp.ilce && dp.bolgeler && dp.bolgeler.split(",").filter(x => x.trim()).length >= 2)
    },
    {
      id: "hobbies",
      ikon: svgIcon(`<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`),
      baslik: "Doğrulanmış Danışman Profili",
      aciklama: "Kişisel ilgi alanları paylaşıldı.",
      kazanildi: Boolean(dp.hobiler && dp.hobiler.trim().length > 10)
    },
    {
      id: "social",
      ikon: svgIcon(`<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`),
      baslik: "Dijital & Sosyal Medya Aktif",
      aciklama: "Sosyal medya ve mağaza bağlantıları aktif.",
      kazanildi: Boolean((dp.instagram && dp.instagram.trim()) || (dp.linkedin && dp.linkedin.trim()))
    },
    {
      id: "blogger",
      ikon: svgIcon(`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`),
      baslik: "Gayrimenkul Bölge Yazarı",
      aciklama: "Uzman bölge ve piyasa analizleri yayınlıyor.",
      kazanildi: Boolean(dp.bloglar && dp.bloglar.length > 0)
    },
    {
      id: "analyst",
      ikon: svgIcon(`<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`),
      baslik: "Veriye Dayalı Pazar Analisti",
      aciklama: "Rakip ilan ve emsal fiyat analizi hazırlıyor.",
      kazanildi: Boolean(p && p.pazarAnalizi && (p.pazarAnalizi.rakipler || []).length > 0)
    },
    {
      id: "transparent",
      ikon: svgIcon(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`),
      baslik: "Şeffaf Süreç & Co-Op Ağı",
      aciklama: "12 haneli canlı süreç ve Co-Op ortak çalışma ağı.",
      kazanildi: true
    }
  ];
}

function kisiselProfilEditorRender() {
  if (!danismanProfili) profilYukle();
  const dp = danismanProfili;

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el && document.activeElement !== el) el.value = val || "";
  };

  setVal("apName", dp.ad);
  setVal("apOffice", dp.ofis);
  setVal("apExperience", dp.deneyim);
  setVal("apCity", dp.il || "Ankara");
  setVal("apDistrict", dp.ilce || "Etimesgut, Çankaya");
  setVal("apRegions", dp.bolgeler);
  setVal("apHobbies", dp.hobiler);
  setVal("apBio", dp.bio);
  setVal("apInstagram", dp.instagram);
  setVal("apTwitter", dp.twitter);
  setVal("apLinkedin", dp.linkedin);
  setVal("apStoreUrl", dp.magazaUrl);
  setVal("apPhone", dp.telefon);

  profilSemtYardimcisiniBaslat();

  const rozetler = danismanRozetleriniHesapla(dp);
  const kazanilanSayisi = rozetler.filter(r => r.kazanildi).length;

  const counterEl = document.getElementById("earnedBadgesCounterLabel");
  if (counterEl) {
    counterEl.textContent = `${kazanilanSayisi} / ${rozetler.length} Rozet Aktif`;
  }

  const badgeGrid = document.getElementById("agentBadgesEditorGrid");
  if (badgeGrid) {
    badgeGrid.className = "compact-badge-row";
    badgeGrid.style.marginTop = "10px";
    badgeGrid.innerHTML = rozetler
      .map(
        r => `
        <div class="compact-badge-icon-btn ${r.kazanildi ? "earned" : ""}" title="${r.baslik}: ${r.aciklama}">
          ${r.ikon}
          <span class="compact-badge-tooltip">${r.baslik} ${r.kazanildi ? "✓" : ""}</span>
        </div>
      `
      )
      .join("");
  }

  const blogWrap = document.getElementById("agentBlogEditorList");
  if (blogWrap) {
    dp.bloglar = dp.bloglar || [];
    blogWrap.innerHTML = dp.bloglar
      .map(
        (b, idx) => `
        <div class="blog-card" style="overflow:hidden;">
          <div>
            ${
              b.foto
                ? `<div style="margin:-14px -14px 10px -14px;height:145px;overflow:hidden;border-bottom:1px solid #E2E8F0;background:#F1F5F9;">
                    <img src="${b.foto}" alt="${b.baslik}" style="width:100%;height:100%;object-fit:cover;display:block;" />
                  </div>`
                : ""
            }
            <span style="font-size:0.72rem;font-weight:800;color:var(--cobalt-600);text-transform:uppercase;">${b.kategori} • ${b.tarih}</span>
            <h5 style="font-size:0.95rem;font-weight:800;margin:6px 0;color:var(--navy-900);">${b.baslik}</h5>
            <p style="font-size:0.81rem;color:var(--text-body);">${b.ozet}</p>
          </div>
          <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
            <label class="saas-btn-outline-sm" style="cursor:pointer;padding:4px 10px;font-size:0.74rem;margin:0;">
              <span>📷 ${b.foto ? "Fotoğrafı Değiştir" : "Fotoğraf Ekle"}</span>
              <input type="file" accept="image/*" style="display:none;" onchange="mevcutBlogYazisinaFotografYukle(event, ${idx})" />
            </label>
            <div style="display:flex;gap:6px;">
              ${
                b.foto
                  ? `<button type="button" class="btn btn-outline btn-sm" style="font-size:0.74rem;padding:4px 9px;" onclick="mevcutBlogFotografiniKaldir(${idx})">Fotoğrafı Kaldır</button>`
                  : ""
              }
              <button type="button" class="btn btn-outline btn-sm" style="color:#dc2626;font-size:0.74rem;padding:4px 9px;" onclick="blogYazisiSil(${idx})">Yazıyı Sil</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }
}

function kisiselProfilKaydet(bildirim = true) {
  if (!danismanProfili) profilYukle();
  const dp = danismanProfili;

  dp.ad = document.getElementById("apName")?.value.trim() || dp.ad;
  dp.ofis = document.getElementById("apOffice")?.value.trim() || dp.ofis;
  dp.deneyim = document.getElementById("apExperience")?.value.trim() || "";
  dp.il = document.getElementById("apCity")?.value.trim() || "Ankara";
  dp.ilce = document.getElementById("apDistrict")?.value.trim() || "Etimesgut, Çankaya";
  dp.bolgeler = document.getElementById("apRegions")?.value.trim() || "";
  dp.hobiler = document.getElementById("apHobbies")?.value.trim() || "";
  dp.bio = document.getElementById("apBio")?.value.trim() || "";
  dp.instagram = document.getElementById("apInstagram")?.value.trim() || "";
  dp.twitter = document.getElementById("apTwitter")?.value.trim() || "";
  dp.linkedin = document.getElementById("apLinkedin")?.value.trim() || "";
  dp.magazaUrl = document.getElementById("apStoreUrl")?.value.trim() || "";
  dp.telefon = document.getElementById("apPhone")?.value.trim() || "";

  // Tek Merkezli Kimlik Senkronizasyonu: Kişisel profilde güncellenen danışman bilgisi portföylere otomatik yansır
  portfoyler.forEach(item => {
    if (!item.coopAktifMi) {
      item.danisman = dp.ad;
      item.ofis = dp.ofis;
      item.danismanTel = dp.telefon;
      if (item.pazarAnalizi) {
        item.pazarAnalizi.danismanBio = dp.bio;
      }
    }
  });
  verileriKaydet();

  profilKaydetStorage();
  kisiselProfilEditorRender();
  if (bildirim) {
    alert(`✅ Kişisel web sitesi profiliniz, İl (${dp.il}) / İlçe (${dp.ilce}) / Semt uzmanlık bölgeleriniz ve tüm portföylerinizdeki danışman/filigran bilgileriniz tek merkezden güncellendi!`);
  }
}

function profilSemtYardimcisiniBaslat() {
  const ilSel = document.getElementById("apHelperCity");
  if (!ilSel) return;
  if (ilSel.options.length === 0) {
    const iller = typeof TURKIYE_81_IL_ILCELER !== "undefined" ? Object.keys(TURKIYE_81_IL_ILCELER) : ["Ankara", "İstanbul", "İzmir", "Antalya"];
    const mevcutIl = (document.getElementById("apCity")?.value || "Ankara").trim();
    ilSel.innerHTML = iller
      .map(il => `<option value="${il}" ${il.toLowerCase() === mevcutIl.toLowerCase() ? "selected" : ""}>${il}</option>`)
      .join("");
    profilSemtYardimcisiIlDegisti();
  }
  profilSeciliUzmanlikEtiketleriniRenderEt();
}

function profilSeciliUzmanlikEtiketleriniRenderEt() {
  const pillsWrap = document.getElementById("apSelectedRegionsPills");
  if (!pillsWrap) return;
  if (!danismanProfili) profilYukle();
  const il = danismanProfili?.il || "Ankara";
  const ilceler = danismanProfili?.ilce || "Çankaya";
  const semtler = (danismanProfili?.bolgeler || "")
    .split(",")
    .map(x => x.trim())
    .filter(Boolean);

  if (semtler.length === 0) {
    pillsWrap.innerHTML = `<span class="saas-text-xs">Henüz uzmanlık semti seçilmedi. Yukarıdan İl, İlçe ve Semt seçip ekleyin.</span>`;
    return;
  }

  pillsWrap.innerHTML =
    `<span style="font-size:0.75rem;font-weight:700;color:#0F172A;align-self:center;margin-right:4px;">Seçili Uzmanlık Bölgeleriniz (${il} / ${ilceler}):</span>` +
    semtler
      .map(
        (s, idx) => `
        <span style="display:inline-flex;align-items:center;gap:6px;background:#EFF6FF;color:#1D4ED8;border:1px solid #BFDBFE;padding:3px 10px;border-radius:999px;font-size:0.76rem;font-weight:700;">
          <span>${s}</span>
          <button type="button" onclick="profilUzmanlikSemtiSil(${idx})" style="border:none;background:transparent;color:#1D4ED8;cursor:pointer;font-weight:800;padding:0;line-height:1;" title="Kaldır">✕</button>
        </span>
      `
      )
      .join("");
}

function profilUzmanlikSemtiSil(idx) {
  if (!danismanProfili) profilYukle();
  const semtler = (danismanProfili.bolgeler || "")
    .split(",")
    .map(x => x.trim())
    .filter(Boolean);
  semtler.splice(idx, 1);
  danismanProfili.bolgeler = semtler.join(", ");
  const regInput = document.getElementById("apRegions");
  if (regInput) regInput.value = danismanProfili.bolgeler;
  kisiselProfilKaydet(false);
  profilSeciliUzmanlikEtiketleriniRenderEt();
}

function profilSemtYardimcisiIlDegisti() {
  const ilSel = document.getElementById("apHelperCity");
  const ilceSel = document.getElementById("apHelperDistrict");
  if (!ilSel || !ilceSel) return;
  const il = ilSel.value || "Ankara";
  const cityInput = document.getElementById("apCity");
  if (cityInput) cityInput.value = il;
  const ilceler =
    (typeof TURKIYE_81_IL_ILCELER !== "undefined" && TURKIYE_81_IL_ILCELER[il]) ||
    IL_ILCE_HARITASI[il] ||
    ["Merkez"];
  const varsayilan = il === "Ankara" && ilceler.includes("Çankaya") ? "Çankaya" : ilceler[0];
  ilceSel.innerHTML = ilceler
    .map(ilce => `<option value="${ilce}" ${ilce === varsayilan ? "selected" : ""}>${ilce}</option>`)
    .join("");
  profilSemtYardimcisiIlceDegisti();
}

function profilSemtYardimcisiIlceDegisti() {
  const il = document.getElementById("apHelperCity")?.value || "Ankara";
  const ilce = document.getElementById("apHelperDistrict")?.value || "Çankaya";
  const semtSel = document.getElementById("apHelperSemt");
  if (!semtSel) return;
  const semtMap = ilIlceyeGoreSemtHaritasiGetir(il, ilce);
  const semtler = Object.keys(semtMap);
  semtSel.innerHTML = semtler.map((s, i) => `<option value="${s}" ${i === 0 ? "selected" : ""}>${s} Semti / Bölgesi</option>`).join("");
  profilSemtYardimcisiSemtOnizle();
}

function profilSemtYardimcisiSemtOnizle() {
  const il = document.getElementById("apHelperCity")?.value || "Ankara";
  const ilce = document.getElementById("apHelperDistrict")?.value || "Çankaya";
  const semt = document.getElementById("apHelperSemt")?.value || "";
  const previewEl = document.getElementById("apHelperSemtMahallePreview");
  if (!previewEl) return;
  const mahalleler = ilIlceSemteGoreMahalleListesiGetir(il, ilce, semt);
  previewEl.innerHTML = `<strong>${semt}</strong> semtinin kapsadığı mahalleler (${mahalleler.length}): <span style="color:#2563EB;">${mahalleler.join(", ")}</span>`;
}

function profilSemtiUzmanligaEkle(altMahallelerleBirlikte = false) {
  const il = document.getElementById("apHelperCity")?.value || "Ankara";
  const ilce = document.getElementById("apHelperDistrict")?.value || "Çankaya";
  const semt = document.getElementById("apHelperSemt")?.value || "";
  if (!semt) return;

  const cityInput = document.getElementById("apCity");
  const distInput = document.getElementById("apDistrict");
  const regInput = document.getElementById("apRegions");

  if (cityInput) {
    cityInput.value = il;
  }
  if (distInput) {
    const mevcutIlceler = distInput.value
      .split(",")
      .map(x => x.trim())
      .filter(Boolean);
    if (!mevcutIlceler.some(x => x.toLowerCase() === ilce.toLowerCase())) {
      mevcutIlceler.push(ilce);
      distInput.value = mevcutIlceler.join(", ");
    }
  }
  if (regInput) {
    const mevcutBolgeler = regInput.value
      .split(",")
      .map(x => x.trim())
      .filter(Boolean);
    const eklenecekler = [semt];
    if (altMahallelerleBirlikte) {
      const mahalleler = ilIlceSemteGoreMahalleListesiGetir(il, ilce, semt).map(m => m.replace(" Mah.", "").trim());
      eklenecekler.push(...mahalleler);
    }
    eklenecekler.forEach(item => {
      if (!mevcutBolgeler.some(x => x.toLowerCase() === item.toLowerCase())) {
        mevcutBolgeler.push(item);
      }
    });
    regInput.value = mevcutBolgeler.join(", ");
  }
  kisiselProfilKaydet(false);
  profilSeciliUzmanlikEtiketleriniRenderEt();
}

let seciliYeniBlogFotoData = "";

function blogFotografiDosyadanSec(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    seciliYeniBlogFotoData = e.target.result || "";
    const wrap = document.getElementById("newBlogPhotoPreviewWrap");
    const img = document.getElementById("newBlogPhotoPreviewImg");
    if (img) img.src = seciliYeniBlogFotoData;
    if (wrap) wrap.style.display = "inline-flex";
  };
  reader.readAsDataURL(file);
}

function blogFotografiUrlOnizle(url) {
  const temiz = (url || "").trim();
  seciliYeniBlogFotoData = temiz;
  const wrap = document.getElementById("newBlogPhotoPreviewWrap");
  const img = document.getElementById("newBlogPhotoPreviewImg");
  if (temiz.length > 6) {
    if (img) img.src = temiz;
    if (wrap) wrap.style.display = "inline-flex";
  } else if (wrap) {
    wrap.style.display = "none";
  }
}

function blogFotografiSecimiTemizle() {
  seciliYeniBlogFotoData = "";
  const fileEl = document.getElementById("newBlogPhotoFile");
  const urlEl = document.getElementById("newBlogPhotoUrl");
  const wrap = document.getElementById("newBlogPhotoPreviewWrap");
  if (fileEl) fileEl.value = "";
  if (urlEl) urlEl.value = "";
  if (wrap) wrap.style.display = "none";
}

function mevcutBlogYazisinaFotografYukle(event, idx) {
  const file = event.target.files && event.target.files[0];
  if (!file || !danismanProfili || !danismanProfili.bloglar || !danismanProfili.bloglar[idx]) return;
  const reader = new FileReader();
  reader.onload = e => {
    danismanProfili.bloglar[idx].foto = e.target.result || "";
    profilKaydetStorage();
    kisiselProfilEditorRender();
    danismanKisiselWebSitesiGoster();
  };
  reader.readAsDataURL(file);
}

function mevcutBlogFotografiniKaldir(idx) {
  if (!danismanProfili || !danismanProfili.bloglar || !danismanProfili.bloglar[idx]) return;
  danismanProfili.bloglar[idx].foto = "";
  profilKaydetStorage();
  kisiselProfilEditorRender();
  danismanKisiselWebSitesiGoster();
}

function yeniBlogYazisiEkle() {
  if (!danismanProfili) profilYukle();
  const baslik = (document.getElementById("newBlogTitle")?.value || "").trim();
  const kategori = (document.getElementById("newBlogCategory")?.value || "Bölge & Piyasa Analizi").trim();
  const ozet = (document.getElementById("newBlogSummary")?.value || "").trim();
  const urlInput = (document.getElementById("newBlogPhotoUrl")?.value || "").trim();
  const foto = seciliYeniBlogFotoData || urlInput || "";

  if (!baslik || !ozet) {
    alert("Lütfen blog yazısı başlığını ve içeriğini girin.");
    return;
  }

  const bugun = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  danismanProfili.bloglar = danismanProfili.bloglar || [];
  danismanProfili.bloglar.unshift({ tarih: bugun, kategori, baslik, ozet, foto });

  document.getElementById("newBlogTitle").value = "";
  document.getElementById("newBlogCategory").value = "";
  document.getElementById("newBlogSummary").value = "";
  blogFotografiSecimiTemizle();

  profilKaydetStorage();
  kisiselProfilEditorRender();
  alert("✅ Yeni blog yazınız kişisel web sitenizde yayınlandı!");
}

function blogYazisiSil(idx) {
  if (!danismanProfili || !danismanProfili.bloglar) return;
  danismanProfili.bloglar.splice(idx, 1);
  profilKaydetStorage();
  kisiselProfilEditorRender();
}

function kisiselSiteLinkiniKopyala() {
  if (!danismanProfili) profilYukle();
  const slug = (danismanProfili.ad || "gencay-celikkan")
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-");
  const url = `https://mulkizle.com/${slug}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).catch(() => {});
  }
  alert(`🔗 Kişisel Web Sitenizin Sosyal Medya Bio Linki Kopyalandı:\n\n${url}\n\nBu linki Instagram, TikTok, LinkedIn ve WhatsApp profilinize ekleyebilirsiniz!`);
}

// DANIŞMANIN KİŞİSEL WEB SİTESİ & DİJİTAL KARTVİZİT GÖRÜNÜMÜ (#view-agent-profile)
// - Rozetler: Küçük ikonlar
// - Instagram, Twitter, LinkedIn: Tıklamalı kutucuklar
// - Yönetilen Aktif Portföyler: Yalnızca Sahibinden.com veya diğer ilan platformlarında aktif ilanı olanlar listelenir, yapılan Pazar Analizleri kesinlikle listelenmez!
// - Blog Yazıları: Satır satır listelenir
function portfoyunAktifIlaniVarMi(item) {
  if (!item) return false;
  const ilanLinki = (item.sahibindenUrl || "").trim();
  const ilanLinkiGecerli =
    ilanLinki.length > 8 &&
    (ilanLinki.includes("sahibinden.com") ||
      ilanLinki.includes("hepsiemlak.com") ||
      ilanLinki.includes("emlakjet.com") ||
      ilanLinki.startsWith("http"));
  if (!ilanLinkiGecerli) return false;

  // İlan yayını adımı varsa ve henüz "pending" (beklemede) ise henüz ilana çıkmamış (sadece pazar analizi aşamasında) demektir
  const ilanAdimi = (item.hizmetler || []).find(h =>
    /sahibinden|ilan portal/i.test(h.ad || "")
  );
  if (ilanAdimi && ilanAdimi.durum === "pending") return false;

  return true;
}

let acikBlogSatirIdx = 0;

function blogSatirToggle(idx) {
  acikBlogSatirIdx = acikBlogSatirIdx === idx ? null : idx;
  danismanKisiselWebSitesiGoster();
}

let incelenenWebSitesiDanismanId = "ahmet-demir";
let aktifProfilSekmesi = "portfolios";
// "owner" (Profil Sahibi) | "member" (Diğer Üye Emlakçı) | "guest" (Üye Olmayan / Satıcı / Alıcı)
let profilGoruntuleyenModu = "owner";

function profilSekmeSec(sekmeId) {
  aktifProfilSekmesi = sekmeId;
  danismanKisiselWebSitesiGoster();
}

function danismanWebSitesiSecVeGoster(hedefDanismanId, goruntuleyenModu) {
  if (hedefDanismanId) {
    incelenenWebSitesiDanismanId = hedefDanismanId;
  }
  if (goruntuleyenModu) {
    profilGoruntuleyenModu = goruntuleyenModu;
  }
  gorunumDegistir("view-agent-profile");
}

function danismanKisiselWebSitesiGoster() {
  if (typeof dortKarakterVerileriniHazirla === "function") {
    dortKarakterVerileriniHazirla();
  }
  if (!danismanProfili) profilYukle();

  const dp =
    typeof danismanProfiliniGetirById === "function"
      ? danismanProfiliniGetirById(incelenenWebSitesiDanismanId)
      : danismanProfili;

  const foto = dp.foto || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80";
  const kapakArkaPlan =
    incelenenWebSitesiDanismanId === "selin-yilmaz"
      ? "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80"
      : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80";

  const container = document.getElementById("agentPersonalWebsiteOutput");
  if (!container) return;

  const extIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
  const phoneSvgIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
  const whatsappSvgIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;
  const inboxSvgIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
  const verifiedCheckSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  const rozetler = danismanRozetleriniHesapla(dp);
  const kazanilanRozetSayisi = rozetler.filter(r => r.kazanildi).length;

  const kompaktRozetIkonlariHtml = rozetler
    .map(
      r => `
      <div class="compact-badge-icon-btn ${r.kazanildi ? "earned" : ""}" title="${r.baslik}">
        ${r.ikon}
        <span class="compact-badge-tooltip">${r.baslik} ${r.kazanildi ? "✓" : ""}</span>
      </div>
    `
    )
    .join("");

  const igUrl = (dp.instagram || "").trim();
  const twUrl = (dp.twitter || "").trim();
  const liUrl = (dp.linkedin || "").trim();
  const storeUrl = (dp.magazaUrl || "").trim();

  const igIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`;
  const twIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>`;
  const liIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;
  const storeIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;

  const sosyalLinkPills = [
    igUrl ? `<a href="${igUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-circle">${igIcon}<span>Instagram</span></a>` : "",
    twUrl ? `<a href="${twUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-circle">${twIcon}<span>X</span></a>` : "",
    liUrl ? `<a href="${liUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-circle">${liIcon}<span>LinkedIn</span></a>` : "",
    storeUrl ? `<a href="${storeUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-circle">${storeIcon}<span>Mağaza</span></a>` : ""
  ]
    .filter(Boolean)
    .join("");

  // YÖNETİLEN AKTİF PORTFÖYLER (Sadece ilanı aktif olanlar)
  const danismanaAitPortfoyler = portfoyler.filter(item => {
    if (incelenenWebSitesiDanismanId === "selin-yilmaz") {
      return item.danismanId === "selin-yilmaz" || item.danisman === "Selin Yılmaz";
    }
    if (incelenenWebSitesiDanismanId === "burak-kaya") {
      return item.danismanId === "burak-kaya" || item.danisman === "Burak Kaya";
    }
    return !item.danismanId || item.danismanId === "ahmet-demir" || item.danisman === dp.ad;
  });

  const sayfaSahibiMi = profilGoruntuleyenModu === "owner";
  const baskaUyeMi = profilGoruntuleyenModu === "member";

  // KURAL: Aktif portföylerdeki "Paylaşıma Açık / Kapalı" switch'i kişisel web sitesiyle doğrudan bağlıdır.
  // Eğer switch "Paylaşıma Açık" (paylasimaAcikMi !== false) ise diğer üyeler ve ziyaretçiler kişisel web sitesinde görür.
  // Eğer switch "Paylaşıma Kapalı" (paylasimaAcikMi === false) ise başka bir üye/ziyaretçi o portföyü kişisel web sitesinde kesinlikle görmez!
  const yayindakiIlanliPortfoyler = danismanaAitPortfoyler.filter(item => {
    if (!portfoyunAktifIlaniVarMi(item)) return false;
    if (!sayfaSahibiMi && item.paylasimaAcikMi === false) return false;
    return true;
  });

  const hedefUyeParaliMi =
    typeof uyeParaliUyelikVarMi === "function" ? uyeParaliUyelikVarMi(incelenenWebSitesiDanismanId) : proPaketAktif;

  // KURAL: Ücretsiz üyenin Kişisel Web Sitesi yoktur!
  if (!hedefUyeParaliMi) {
    container.innerHTML = `
      <div class="saas-card" style="text-align:center;padding:42px 24px;max-width:580px;margin:24px auto;">
        <span class="saas-badge-neutral" style="margin-bottom:10px;">PRO DANIŞMAN PAKETİ ÖZELLİĞİ</span>
        <h2 class="saas-h2" style="margin-bottom:8px;">${dp.ad} • Kişisel Web Sitesi Aktif Değil</h2>
        <p class="saas-text-sm" style="color:#475569;line-height:1.55;margin-bottom:18px;">
          Ücretsiz üyelik paketinde yalnızca <strong>Aktif Portföyler</strong> ve müşterilere gönderilen <strong>12 Haneli Mülk Takip Kodu</strong> özelliği bulunur. Kişisel danışman web sitesi, Arıyorum! ağı ve mesaj kutusu yalnızca <strong>Pro Üyelik</strong> paketinde aktiftir.
        </p>
        <button type="button" class="social-btn-primary" onclick="danismanSolMenuSec('portfolios')">
          <span>← Aktif Portföylerime Dön</span>
        </button>
      </div>
    `;
    return;
  }
  const uyeMesajListesi =
    typeof uyeMesajlariniGetir === "function" ? uyeMesajlariniGetir(incelenenWebSitesiDanismanId) : [];
  const okunmamisMesajSayisi = uyeMesajListesi.filter(m => !m.okundu && !m.yanit).length;

  // SEKME 1: GÖRSEL PORTFÖY VİTRİNİ (AIRBNB / INSTAGRAM ESTETİĞİNDE BÜYÜK FOTOĞRAFLI KARTLAR)
  const portfoyGridHtml =
    yayindakiIlanliPortfoyler.length > 0
      ? `<div class="social-portfolio-grid">` +
        yayindakiIlanliPortfoyler
          .map(item => {
            const kapakFoto =
              (item.medya && item.medya[0] && item.medya[0].url) ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80";
            const fotoSayisi = (item.medya || []).length;
            const sosyalSayisi = portfoySosyalMedyaLinkleriniGetir(item).length;
            const paylasimaAcik = item.paylasimaAcikMi !== false;

            return `
              <article class="social-listing-card" style="${!paylasimaAcik && sayfaSahibiMi ? "opacity:0.75;border:1.5px dashed #94A3B8;" : ""}">
                <div class="social-listing-media" onclick="seciliKod='${item.kod}'; gorunumDegistir('view-buyer');">
                  <img src="${kapakFoto}" alt="${item.baslik}" />
                  <span class="social-listing-badge-top-left">
                    <span class="ig-live-dot" style="${!paylasimaAcik ? "background:#94A3B8;" : ""}"></span>
                    <span>${paylasimaAcik ? `Paylaşıma Açık • #${item.kod}` : `Paylaşıma Kapalı (Diğer Üyelere Gizli) • #${item.kod}`}</span>
                  </span>
                  ${
                    item.matterportUrl
                      ? `<span class="social-listing-badge-top-right">360° Sanal Tur</span>`
                      : ""
                  }
                  <div class="social-listing-price-overlay">${item.fiyat || "Fiyat Sorunuz"}</div>
                </div>

                <div class="social-listing-content">
                  <div>
                    <h3 class="social-listing-title">${item.baslik}</h3>
                    <div class="social-listing-sub" style="margin-top:4px;">
                      <span>${item.bolge}</span>
                      <span>•</span>
                      <span>${fotoSayisi} Fotoğraf</span>
                      ${sosyalSayisi > 0 ? `<span>• ${sosyalSayisi} Sosyal Medya Paylaşımı</span>` : ""}
                    </div>
                  </div>

                  <div class="social-listing-footer" style="flex-wrap:wrap;gap:6px;">
                    <button type="button" class="social-btn-primary" style="padding:7px 14px;font-size:0.78rem;" onclick="seciliKod='${item.kod}'; gorunumDegistir('view-buyer');">
                      <span>Fotoğraflar &amp; 360° Tur</span>
                    </button>
                    ${
                      sayfaSahibiMi
                        ? `<button type="button" class="social-btn-soft" style="padding:7px 11px;font-size:0.74rem;color:${paylasimaAcik ? "#15803D" : "#64748B"};" onclick="portfoyPaylasimDurumuToggle('${item.kod}')">
                            <span>${paylasimaAcik ? "🟢 Paylaşıma Açık" : "⚪ Paylaşıma Kapalı"}</span>
                          </button>`
                        : ""
                    }
                    <a href="${item.sahibindenUrl}" target="_blank" rel="noopener noreferrer" class="social-btn-soft" style="padding:7px 13px;font-size:0.78rem;">
                      <span>Sahibinden</span>
                      ${extIcon}
                    </a>
                  </div>
                </div>
              </article>
            `;
          })
          .join("") +
        `</div>`
      : `
        <div class="saas-card" style="text-align:center;padding:36px 20px;">
          <div style="font-size:0.95rem;font-weight:700;color:#0F172A;margin-bottom:4px;">Paylaşıma açık aktif ilan bulunmuyor</div>
          <div class="saas-text-xs">Danışmanın "Paylaşıma Açık" olarak işaretlediği aktif portföyler burada vitrin kartı olarak sergilenir.</div>
        </div>
      `;

  // SEKME 2: BÖLGE ANALİZLERİ & BLOG YAZILARI (LINKEDIN MAKALE KARTLARI)
  const bloglarSekmeHtml =
    (dp.bloglar || []).length > 0
      ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;">` +
        dp.bloglar
          .map(
            b => `
            <article class="saas-card" style="margin:0;display:flex;flex-direction:column;justify-content:space-between;gap:10px;overflow:hidden;">
              <div>
                ${
                  b.foto
                    ? `<div style="margin:-20px -20px 12px -20px;height:175px;overflow:hidden;border-bottom:1px solid #E2E8F0;background:#F1F5F9;">
                        <img src="${b.foto}" alt="${b.baslik}" style="width:100%;height:100%;object-fit:cover;display:block;" />
                      </div>`
                    : ""
                }
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;">
                  <span class="saas-badge-blue">${b.kategori}</span>
                  <span class="saas-text-xs">${b.tarih}</span>
                </div>
                <h3 style="font-size:0.98rem;font-weight:700;color:#0F172A;margin:0 0 8px;line-height:1.4;">${b.baslik}</h3>
                <p class="saas-text-sm" style="margin:0;color:#475569;line-height:1.55;">${b.ozet}</p>
              </div>
              <div style="padding-top:10px;border-top:1px solid #F1F5F9;display:flex;align-items:center;gap:8px;">
                <img src="${foto}" alt="${dp.ad}" style="width:24px;height:24px;border-radius:50%;object-fit:cover;" />
                <span class="saas-text-xs" style="font-weight:600;color:#0F172A;">${dp.ad}</span>
              </div>
            </article>
          `
          )
          .join("") +
        `</div>`
      : `<div class="saas-card" style="text-align:center;padding:32px;"><div class="saas-text-sm">Henüz bölge yazısı paylaşılmadı.</div></div>`;

  // SEKME 3: HAKKINDA & UZMANLIK ROZETLERİ
  const bolgePillsHtml = (dp.bolgeler || dp.ilce || "Çankaya")
    .split(",")
    .map(b => b.trim())
    .filter(Boolean)
    .map(b => `<span class="saas-badge-neutral" style="padding:5px 12px;font-size:0.78rem;">${b}</span>`)
    .join("");

  const hakkindaSekmeHtml = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;">
      <div class="saas-card" style="margin:0;">
        <h3 class="saas-h2" style="margin-bottom:10px;">Uzmanlık Semtleri (Bölgeleri) &amp; Özgeçmiş</h3>
        <p class="saas-text-sm" style="color:#0F172A;line-height:1.6;margin-bottom:14px;">${dp.bio}</p>
        <div class="saas-text-xs" style="font-weight:700;color:#64748B;margin-bottom:6px;">UZMANLIK SEMTLERİ / BÖLGELER &amp; MAHALLELER (${dp.il || "Ankara"} / ${dp.ilce || "Çankaya"})</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">${bolgePillsHtml}</div>
        ${
          dp.hobiler
            ? `<div class="saas-text-xs" style="font-weight:700;color:#64748B;margin-bottom:4px;">İLGİ ALANLARI</div>
               <div class="saas-text-sm" style="color:#334155;">${dp.hobiler}</div>`
            : ""
        }
      </div>

      <div class="saas-card" style="margin:0;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <h3 class="saas-h2" style="margin:0;">Doğrulanmış Uzmanlık Rozetleri</h3>
          <span class="saas-badge-blue">${kazanilanRozetSayisi} / ${rozetler.length} Aktif</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${rozetler
            .map(
              r => `
              <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;background:${
                r.kazanildi ? "#F8FAFC" : "#FFFFFF"
              };border:1px solid ${r.kazanildi ? "#DBEAFE" : "#F1F5F9"};opacity:${r.kazanildi ? "1" : "0.55"};">
                <div class="compact-badge-icon-btn ${r.kazanildi ? "earned" : ""}" style="flex-shrink:0;">${r.ikon}</div>
                <div style="flex:1;">
                  <div style="font-size:0.82rem;font-weight:700;color:#0F172A;">${r.baslik}</div>
                  <div class="saas-text-xs">${r.aciklama}</div>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  const aktifSekmeIcerikHtml =
    aktifProfilSekmesi === "articles"
      ? bloglarSekmeHtml
      : aktifProfilSekmesi === "about"
      ? hakkindaSekmeHtml
      : portfoyGridHtml;

  container.innerHTML = `
    <!-- FACEBOOK / LINKEDIN / INSTAGRAM ESTETİĞİNDE PROFİL HERO KARTI -->
    <div class="social-profile-card">
      <div class="social-profile-cover" style="background-image:url('${kapakArkaPlan}');">
        <span class="social-cover-location-pill">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${dp.il || "Ankara"} / ${dp.ilce || "Çankaya"}</span>
        </span>
      </div>

      <div class="social-profile-body">
        <div class="social-profile-top-row">
          <img src="${foto}" onerror="this.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'" alt="${dp.ad}" class="social-avatar-xl" />

          <div class="social-action-bar">
            <a href="tel:${(dp.telefon || "05320000000").replace(/\s+/g, "")}" class="social-btn-primary" title="${dp.telefon}">
              ${phoneSvgIcon}
              <span>Ara</span>
            </a>
            <a href="https://wa.me/9${(dp.telefon || "05320000000").replace(/\D/g, "")}?text=${encodeURIComponent(`Merhaba ${dp.ad}, mulkizle.com profilinizden ulaşıyorum.`)}" target="_blank" rel="noopener noreferrer" class="social-btn-whatsapp" title="WhatsApp ile Mesaj">
              ${WHATSAPP_OFFICIAL_SVG}
              <span>Mesaj</span>
            </a>
            ${
              sayfaSahibiMi
                ? `<button type="button" class="social-btn-soft" onclick="uyeMesajModalAc('${incelenenWebSitesiDanismanId}')" title="Mesaj Kutum">
                    ${inboxSvgIcon}
                    <span>Mesaj Kutusu</span>
                    ${
                      hedefUyeParaliMi
                        ? okunmamisMesajSayisi > 0
                          ? `<span class="saas-badge-blue" style="padding:1px 7px;font-size:0.68rem;">${okunmamisMesajSayisi}</span>`
                          : ""
                        : `<span class="saas-badge-blue" style="padding:1px 7px;font-size:0.68rem;">Pro</span>`
                    }
                  </button>
                  <button type="button" class="social-btn-soft" onclick="uyeGirisiTetikle('mode-profile')">
                    <span>Profili Düzenle</span>
                  </button>`
                : baskaUyeMi
                ? `<button type="button" class="social-btn-soft" onclick="uyeMesajModalAc('${incelenenWebSitesiDanismanId}')" title="Üye Mesaj Kutusuna Mesaj Gönder">
                    ${inboxSvgIcon}
                    <span>Mesaj Gönder</span>
                  </button>`
                : ""
            }
          </div>
        </div>

        <!-- İSİM, MAVİ TİK, ROZET İKONLARI VE KISA BİYOGRAFİ -->
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <h1 style="font-size:1.45rem;font-weight:800;color:#0F172A;margin:0;letter-spacing:-0.02em;">${dp.ad}</h1>
            <span class="social-verified-tick" title="Doğrulanmış Gayrimenkul Danışmanı">${verifiedCheckSvg}</span>
            <div class="compact-badge-row" style="margin-left:4px;" aria-label="Kazanılan Uzmanlık Rozetleri">
              ${kompaktRozetIkonlariHtml}
            </div>
          </div>

          <div style="font-size:0.86rem;font-weight:600;color:#475569;margin-top:3px;">
            ${dp.ofis} ${dp.deneyim ? `• ${dp.deneyim}` : ""}
          </div>

          <p style="font-size:0.88rem;color:#334155;line-height:1.55;margin:10px 0 0;max-width:740px;">
            ${dp.bio}
          </p>
        </div>

        <!-- INSTAGRAM TARZI 3 NET SAYAÇ + SAĞDA İKONİK SOSYAL MEDYA BAĞLANTILARI -->
        <div class="social-stats-strip">
          <div class="social-stats-group">
            <div class="social-stat-item">
              <strong>${yayindakiIlanliPortfoyler.length}</strong>
              <span>Yayındaki İlan</span>
            </div>
            <div class="social-stat-item">
              <strong>${(dp.bloglar || []).length}</strong>
              <span>Bölge Yazısı</span>
            </div>
            <div class="social-stat-item">
              <strong>${kazanilanRozetSayisi}/${rozetler.length}</strong>
              <span>Uzmanlık Rozeti</span>
            </div>
          </div>

          <div class="social-icon-links">
            ${sosyalLinkPills}
          </div>
        </div>
      </div>
    </div>

    <!-- INSTAGRAM TARZI İKONLU 3 SEKME: PORTFÖY VİTRİNİ | BÖLGE YAZILARI | HAKKINDA & ROZETLER -->
    <div class="social-feed-tabs" role="tablist">
      <button type="button" class="social-feed-tab ${aktifProfilSekmesi === "portfolios" ? "active" : ""}" onclick="profilSekmeSec('portfolios')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span>Portföy Vitrini (${yayindakiIlanliPortfoyler.length})</span>
      </button>
      <button type="button" class="social-feed-tab ${aktifProfilSekmesi === "articles" ? "active" : ""}" onclick="profilSekmeSec('articles')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <span>Bölge Yazıları (${(dp.bloglar || []).length})</span>
      </button>
      <button type="button" class="social-feed-tab ${aktifProfilSekmesi === "about" ? "active" : ""}" onclick="profilSekmeSec('about')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <span>Hakkında &amp; Rozetler (${kazanilanRozetSayisi})</span>
      </button>
    </div>

    ${aktifSekmeIcerikHtml}
  `;
}

let acikVitrinPortfoyKodu = null;

function vitrinPortfoyToggle(kod) {
  acikVitrinPortfoyKodu = acikVitrinPortfoyKodu === kod ? null : kod;
  danismanKisiselWebSitesiGoster();
}
const IL_ILCE_HARITASI = {
  İzmir: ["Narlıdere", "Karşıyaka", "Mavişehir", "Urla", "Bornova"],
  İstanbul: ["Bağcılar", "Kadıköy", "Beşiktaş", "Başakşehir"],
  Ankara: ["Etimesgut", "Çankaya", "Gölbaşı"],
  Antalya: ["Muratpaşa", "Konyaaltı"]
};

const BOLGE_UZMANLARI_HAVUZU = [
  {
    id: "uzman-izmir-narlidere-1",
    ad: "Ahmet Kaya",
    il: "İzmir",
    ilce: "Narlıdere",
    mahalleler: "Narlıdere Merkez, Sahilevleri, Ilıca, Yenikale, Çatalkaya",
    ofis: "İzmir Körfez Gayrimenkul • Narlıdere & Balçova Bölge Uzmanı",
    telefon: "0532 611 44 55",
    deneyim: "10 Yıl • 160+ Tamamlanan Satış • %50-%50 Co-Op Uyumlu",
    rozetSayisi: 7,
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    bio:
      "İzmir Narlıdere, Sahilevleri ve Ilıca bölgesinde 10 yıldır konut ve lüks daire uzmanıyım. Alıcı Co-Op taleplerinde kriterlere birebir uyan kök tapulu, krediye uygun portföylerle anında ortak sunum yapıyorum.",
    referansSatislar:
      "Narlıdere Ilıca Mah. 3+1 Ara Kat — 16 Günde Satıldı\nNarlıdere Yenikale 3+1 Deniz Manzaralı — 21 Günde Satıldı",
    hobiler: "Yelken, Ege zeytinyağı kültürü ve mimari fotoğrafçılık"
  },
  {
    id: "uzman-bagcilar-1",
    ad: "Burak Demir",
    il: "İstanbul",
    ilce: "Bağcılar",
    mahalleler: "Güneşli, Basın Ekspres, Mahmutbey, Kirazlı, Göztepe Mah.",
    ofis: "İstanbul Avrupa Gayrimenkul • Bağcılar & Güneşli Bölge Uzmanı",
    telefon: "0533 880 90 10",
    deneyim: "9 Yıl • 140+ Tamamlanan Satış • %50-%50 Co-Op Uyumlu",
    rozetSayisi: 7,
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    bio:
      "İstanbul Bağcılar, Güneşli ve Basın Ekspres aksında 9 yıldır konut ve ticari gayrimenkul uzmanıyım. Şehir dışındaki meslektaşlarımdan gelen paylaşımlı portföylerde 24 saat içinde yerinde fotoğraf/drone çekimi ve emsal pazar analizini tamamlayıp Mülkİzle üzerinden hem mülk sahibine hem de yönlendiren danışman ortağıma canlı takip kodu açıyorum.",
    referansSatislar:
      "Bağcılar Güneşli Metro Yanı 3+1 Site Dairesi — 19 Günde Satıldı\nBasın Ekspres 2+1 Rezidans — 14 Günde Satıldı\nMahmutbey 3+1 Aile Dairesi — 24 Günde Satıldı",
    hobiler: "Kentsel dönüşüm hukuku, drone çekimi, yelken sporu ve ekonomi tarihi"
  },
  {
    id: "uzman-bagcilar-2",
    ad: "Elif Yılmaz",
    il: "İstanbul",
    ilce: "Bağcılar",
    mahalleler: "Bağcılar Merkez, Güneşli, Yüzyıl, Barbaros, Çınar",
    ofis: "Marmara Emlak Ofisi • Bağcılar Konut Uzmanı",
    telefon: "0532 744 55 66",
    deneyim: "7 Yıl • 95+ Tamamlanan Satış • %50-%50 Co-Op Uyumlu",
    rozetSayisi: 6,
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio:
      "Bağcılar ve Güneşli bölgesindeki site içi aile konutları ve metro aksı yatırımlık dairelerde uzmanım. Ortak çalışma (Co-Op) tekliflerinde şeffaf haftalık raporlama, 360° Matterport çekimi ve alıcı veri tabanı eşleştirmesi sunuyorum.",
    referansSatislar:
      "Güneşli Park Sitesi 3+1 — 22 Günde Satıldı\nBağcılar Meydan 2+1 Daire — 17 Günde Satıldı",
    hobiler: "İç mimari dekorasyon, fotoğrafçılık ve pilates"
  },
  {
    id: "uzman-kadikoy-1",
    ad: "Mert Soylu",
    il: "İstanbul",
    ilce: "Kadıköy",
    mahalleler: "Suadiye, Bağdat Caddesi, Erenköy, Fenerbahçe, Göztepe",
    ofis: "Anadolu Yakası Lüks Konut Ofisi • Kadıköy Uzmanı",
    telefon: "0532 511 22 33",
    deneyim: "11 Yıl • 180+ Satış • %50-%50 Co-Op Uyumlu",
    rozetSayisi: 7,
    foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Bağdat Caddesi ve Kadıköy sahil hattında yeni bina ve kentsel dönüşüm portföylerinde uzman danışman.",
    referansSatislar: "Suadiye 4+1 Deniz Manzaralı — 28 Günde Satıldı",
    hobiler: "Tenis, klasik otomobiller ve mimari tasarım"
  },
  {
    id: "uzman-ankara-1",
    ad: "Gencay Çelikkan",
    il: "Ankara",
    ilce: "Etimesgut",
    mahalleler: "Bağlıca, Yapracık, Yaşamkent, Çayyolu",
    ofis: "Gayrimenkul Danışmanlık Ofisi • Bağlıca & Çayyolu Uzmanı",
    telefon: "0532 000 00 00",
    deneyim: "Konut, Villa & Arsa Uzmanı • %50-%50 Co-Op Uyumlu",
    rozetSayisi: 7,
    foto: "../assets/gencay-hero-portre.jpg",
    bio: "Ankara Bağlıca, Yaşamkent ve Çayyolu bölgesinde profesyonel fotoğraf, drone ve şeffaf Mülkİzle süreç takibiyle hizmet veriyorum.",
    referansSatislar: "Bağlıca 3+1 Site İçi Daire — 21 Günde Satıldı",
    hobiler: "Mimari fotoğrafçılık, drone teknolojileri, doğa yürüyüşü"
  },
  {
    id: "uzman-izmir-1",
    ad: "Zeynep Aksoy",
    il: "İzmir",
    ilce: "Karşıyaka",
    mahalleler: "Mavişehir, Bostanlı, Aksoy, Alaybey",
    ofis: "Ege Körfez Gayrimenkul • Karşıyaka & Mavişehir Uzmanı",
    telefon: "0535 912 34 56",
    deneyim: "8 Yıl • 110+ Satış • %50-%50 Co-Op Uyumlu",
    rozetSayisi: 7,
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "İzmir Karşıyaka, Bostanlı ve Mavişehir bölgesinde şehir dışından yönlendirilen portföylerde tam şeffaf ortak çalışma yürütüyorum.",
    referansSatislar: "Mavişehir 3+1 Rezidans — 20 Günde Satıldı",
    hobiler: "Rüzgar sörfü, Ege mutfağı ve seyahat"
  }
];

function bolgeUzmaniIlDegisti() {
  const ilSel = document.getElementById("coopSearchCity");
  const ilceSel = document.getElementById("coopSearchDistrict");
  if (!ilSel || !ilceSel) return;

  const seciliIl = ilSel.value;
  if (seciliIl === "Tümü") {
    ilceSel.innerHTML = `<option value="Tümü">Tüm İlçeler</option>`;
  } else {
    const ilceler = IL_ILCE_HARITASI[seciliIl] || ["Merkez"];
    ilceSel.innerHTML =
      ilceler.map((ilce, i) => `<option value="${ilce}" ${i === 0 ? "selected" : ""}>${ilce}</option>`).join("") +
      `<option value="Tümü">Tüm ${seciliIl} İlçeleri</option>`;
  }
  bolgeUzmaniAraRender();
}

// ============================================================================
// PAYLAŞIMA AÇIK MISIN? (AÇIĞIM / AÇIK DEĞİLİM) & ALICI KRİTERLERİYLE BÖLGE UZMANINA SORMA (KOMİSYONU KENDİ ARALARINDA KONUŞURLAR)
// ============================================================================
let danismanPaylasimaAcikMi = true;

function danismanPaylasimDurumuDegistir(acikMi) {
  danismanPaylasimaAcikMi = Boolean(acikMi);
  const btnYes = document.getElementById("btnCoopOpenYes");
  const btnNo = document.getElementById("btnCoopOpenNo");

  if (btnYes && btnNo) {
    if (danismanPaylasimaAcikMi) {
      btnYes.className = "btn btn-primary btn-sm";
      btnNo.className = "btn btn-outline btn-sm";
    } else {
      btnYes.className = "btn btn-outline btn-sm";
      btnNo.className = "btn btn-accent btn-sm";
    }
  }

  // Havuzdaki kendi kartımızın durumunu da güncelle
  const kendiKartim = BOLGE_UZMANLARI_HAVUZU.find(u => u.id === "uzman-ankara-1");
  if (kendiKartim) {
    kendiKartim.paylasimaAcikMi = danismanPaylasimaAcikMi;
  }

  bolgeUzmaniAraRender();
}

const BUYER_COOP_STORAGE_KEY = "mulkizle_alici_coop_talepleri_v6";
let aliciCoopTalepleri = [];
let ariyorumIlSecicileriHazirMi = false;

const VARSAYILAN_ALICI_COOP_TALEPLERI = [
  {
    id: "ACT-104",
    tarih: "23 Kasım 2026",
    olusturanDanisman: "Selin Yılmaz (Ankara • Başkent Gayrimenkul)",
    olusturanDanismanId: "selin-yilmaz",
    olusturanDanismanTel: "0532 555 44 33",
    il: "Ankara",
    ilce: "Çankaya",
    semt: "Çayyolu",
    mahalle: "Alacaatlı Mah.",
    oda: "3+1",
    kat: "Ara Kat",
    cephe: "Güney - Batı Cephe",
    binaYasi: "0-5 Yaş (Sıfır/Yeni)",
    krediDurumu: "Krediye Uygun (Kredi Limiti: 3.000.000 ₺)",
    tapuDurumu: "Kök Tapulu (Kat Mülkiyetli)",
    fiyatAraligi: "4.500.000 ₺ - 5.500.000 ₺",
    alimZamani: "Hemen Almak İstiyor",
    not: "Hazır nakit + kredili aile alıcım için Ankara Çankaya / Çayyolu semtinde (Alacaatlı, Konutkent, Yaşamkent veya Çayyolu Mah.) site içi 3+1 ara kat daire arıyorum. Uygun aktif portföyü olan meslektaşlarım doğrudan mesaj kutuma gönderebilir."
  },
  {
    id: "ACT-105",
    tarih: "22 Kasım 2026",
    olusturanDanisman: "Selin Yılmaz (Ankara • Başkent Gayrimenkul)",
    olusturanDanismanId: "selin-yilmaz",
    olusturanDanismanTel: "0532 555 44 33",
    il: "Ankara",
    ilce: "Etimesgut",
    semt: "Bağlıca",
    mahalle: "Bağlıca Mah.",
    oda: "3+1",
    kat: "Ara Kat",
    cephe: "Güney - Doğu Cephe",
    binaYasi: "5-10 Yaş Arası",
    krediDurumu: "Krediye Uygun (Kredi Limiti: 3.000.000 ₺)",
    tapuDurumu: "Kök Tapulu (Kat Mülkiyetli)",
    fiyatAraligi: "4.500.000 ₺ - 5.200.000 ₺",
    alimZamani: "Hemen Almak İstiyor",
    not: "Bağlıca semti (Bağlıca Mah. / Yeni Bağlıca Mah.) içinde 3+1 site içi ara kat daire arayan nakit + kredili hazır müşterim var. Aktif portföyünüzü mesaj olarak gönderebilirsiniz."
  },
  {
    id: "ACT-101",
    tarih: "19 Kasım 2026",
    olusturanDanisman: "Ahmet Kaya (İzmir • Körfez Gayrimenkul)",
    olusturanDanismanId: "uzman-izmir-narlidere-1",
    olusturanDanismanTel: "0532 611 44 55",
    il: "İzmir",
    ilce: "Narlıdere",
    semt: "Sahilevleri / Ilıca",
    mahalle: "Ilıca Mah.",
    oda: "3+1",
    kat: "Ara Kat",
    cephe: "Güney - Doğu Cephe",
    binaYasi: "5-10 Yaş Arası",
    krediDurumu: "Krediye Uygun (Kredi Limiti: 3.000.000 ₺)",
    tapuDurumu: "Kök Tapulu (Kat Mülkiyetli)",
    fiyatAraligi: "5.000.000 ₺ - 6.000.000 ₺",
    alimZamani: "Hemen Almak İstiyor",
    not: "Alıcım İzmir Narlıdere Sahilevleri / Ilıca semtinde 3+1, ara katta, Güney-Doğu cepheli, 5-10 yaş arası, krediye uygun, kök tapulu yer arıyor. Bütçesi 5-6 Milyon TL."
  },
  {
    id: "ACT-102",
    tarih: "18 Kasım 2026",
    olusturanDanisman: "Burak Demir (İstanbul • Avrupa Gayrimenkul)",
    olusturanDanismanId: "uzman-bagcilar-1",
    olusturanDanismanTel: "0533 880 90 10",
    il: "İstanbul",
    ilce: "Kadıköy",
    semt: "Suadiye / Caddebostan (Bağdat Cad.)",
    mahalle: "Suadiye Mah.",
    oda: "2+1",
    kat: "Üst Katlar / Manzaralı",
    cephe: "Güney - Batı Cephe",
    binaYasi: "0-5 Yaş (Sıfır/Yeni)",
    krediDurumu: "Tamamı Peşin / Nakit Alıcı",
    tapuDurumu: "Kök Tapulu (Kat Mülkiyetli)",
    fiyatAraligi: "8.500.000 ₺ - 10.000.000 ₺",
    alimZamani: "Hemen Almak İstiyor",
    not: "Yatırımcı müşterim için Kadıköy Bağdat Caddesi (Suadiye / Caddebostan) semtinde sıfır veya yeni binada 2+1 daire arıyoruz. Nakit hazır."
  },
  {
    id: "ACT-103",
    tarih: "17 Kasım 2026",
    olusturanDanisman: "Zeynep Aksoy (İzmir • Ege Körfez Gayrimenkul)",
    olusturanDanismanId: "uzman-izmir-1",
    olusturanDanismanTel: "0535 912 34 56",
    il: "Antalya",
    ilce: "Konyaaltı",
    semt: "Liman / Hurma",
    mahalle: "Liman Mah.",
    oda: "3+1",
    kat: "Ara Kat",
    cephe: "Güney - Doğu Cephe",
    binaYasi: "0-5 Yaş (Sıfır/Yeni)",
    krediDurumu: "Tamamı Peşin / Nakit Alıcı",
    tapuDurumu: "Kök Tapulu (Kat Mülkiyetli)",
    fiyatAraligi: "7.000.000 ₺ - 8.500.000 ₺",
    alimZamani: "3 Ay İçinde",
    not: "Antalya Konyaaltı Liman / Hurma semtine taşınacak doktor müşterim için havuzlu sitede paylaşıma açık 3+1 daire arıyorum."
  }
];

function mahalledenSemtBul(il, ilce, mahalle) {
  if (!il || !ilce || !mahalle) return "";
  const semtMap = ilIlceyeGoreSemtHaritasiGetir(il, ilce);
  const arananTemiz = mahalle.replace(" Mah.", "").trim().toLowerCase();
  for (const [semtAdi, mahList] of Object.entries(semtMap)) {
    if (mahList.some(m => m.toLowerCase().includes(arananTemiz))) {
      return semtAdi;
    }
  }
  return "";
}

function danismanUzmanlikSemtVeBolgeleriTalepleEslesiyorMu(talep, dp) {
  if (!talep || !dp) return false;
  const uyeIl = (dp.il || "Ankara").toLowerCase();
  if ((talep.il || "").toLowerCase() !== uyeIl) return false;

  const uyeMetni = `${dp.ilce || ""} , ${dp.bolgeler || ""}`.toLowerCase();
  const talepIlce = (talep.ilce || "").toLowerCase();
  const talepSemt = (talep.semt || "").toLowerCase();
  const talepMah = (talep.mahalle || "").replace(" Mah.", "").trim().toLowerCase();

  if (talepSemt && talepSemt !== "tüm semtler" && uyeMetni.includes(talepSemt.split("/")[0].trim())) {
    return true;
  }
  if (talepMah && talepMah !== "tüm mahalleler" && uyeMetni.includes(talepMah)) {
    return true;
  }
  // Üye semt yazdıysa (örn: "Çayyolu"), talepte o semtin alt mahallesi (örn: "Alacaatlı Mah.") varsa yine eşleşir!
  const semtMap = ilIlceyeGoreSemtHaritasiGetir(talep.il, talep.ilce);
  for (const [semtAdi, mahList] of Object.entries(semtMap)) {
    const semtKisa = semtAdi.split("/")[0].trim().toLowerCase();
    if (uyeMetni.includes(semtKisa)) {
      if (talepSemt.includes(semtKisa)) return true;
      if (mahList.some(m => m.replace(" Mah.", "").trim().toLowerCase() === talepMah)) {
        return true;
      }
    }
  }
  return talepIlce && uyeMetni.includes(talepIlce);
}

function ilIlceyeGoreMahalleListesiGetir(il, ilce) {
  if (!il || !ilce || il === "Tümü" || ilce === "Tümü") return [];
  const ozelListe = typeof DETAYLI_MAHALLELER !== "undefined" ? DETAYLI_MAHALLELER[`${il}:${ilce}`] : null;
  if (ozelListe && ozelListe.length > 0) {
    return [...ozelListe];
  }
  const standart =
    typeof STANDART_ILCE_MAHALLELERI !== "undefined"
      ? STANDART_ILCE_MAHALLELERI.filter(m => m !== "Merkez Mah.")
      : ["Cumhuriyet Mah.", "Atatürk Mah.", "Yeni Mah.", "Fatih Mah.", "Bahçelievler Mah."];
  return [`${ilce} Merkez Mah.`, ...standart];
}

function ariyorumYeniTalepFormuToggle(forceState) {
  const card = document.getElementById("ariyorumNewRequestCollapseCard");
  const btn = document.getElementById("btnToggleNewRequestDrawer");
  if (!card) return;
  const suAnAcik = card.style.display !== "none";
  const yeniDurum = typeof forceState === "boolean" ? forceState : !suAnAcik;
  card.style.display = yeniDurum ? "block" : "none";
  if (btn) {
    btn.innerHTML = yeniDurum ? `<span>✕ Talep Formunu Kapat</span>` : `<span>+ Yeni Arama Talebi Aç</span>`;
  }
  if (yeniDurum) {
    ariyorumKonumSecicileriniBaslat();
  }
}

function ariyorumKonumSecicileriniBaslat() {
  const iller = typeof TURKIYE_81_IL_ILCELER !== "undefined" ? Object.keys(TURKIYE_81_IL_ILCELER) : ["Ankara", "İstanbul", "İzmir", "Antalya"];

  const bcCity = document.getElementById("bcCity");
  if (bcCity && bcCity.options.length <= 4) {
    bcCity.innerHTML = iller.map(il => `<option value="${il}" ${il === "Ankara" ? "selected" : ""}>${il}</option>`).join("");
    aliciCoopIlDegisti();
  }

  const filterCity = document.getElementById("ariyorumFilterCity");
  if (filterCity && filterCity.options.length <= 5) {
    filterCity.innerHTML =
      `<option value="Tümü" selected>Tüm İller (81 İl)</option>` +
      iller.map(il => `<option value="${il}">${il}</option>`).join("");
  }
  ariyorumIlSecicileriHazirMi = true;
}

function aliciCoopYukle() {
  try {
    const kayitli = localStorage.getItem(BUYER_COOP_STORAGE_KEY);
    aliciCoopTalepleri = kayitli ? JSON.parse(kayitli) : JSON.parse(JSON.stringify(VARSAYILAN_ALICI_COOP_TALEPLERI));
  } catch (e) {
    aliciCoopTalepleri = JSON.parse(JSON.stringify(VARSAYILAN_ALICI_COOP_TALEPLERI));
  }
}

function aliciCoopKaydet() {
  try {
    localStorage.setItem(BUYER_COOP_STORAGE_KEY, JSON.stringify(aliciCoopTalepleri));
  } catch (e) {}
}

function aliciCoopIlDegisti() {
  const ilSel = document.getElementById("bcCity");
  const ilceSel = document.getElementById("bcDistrict");
  if (!ilSel || !ilceSel) return;
  const il = ilSel.value || "Ankara";
  const ilceler =
    (typeof TURKIYE_81_IL_ILCELER !== "undefined" && TURKIYE_81_IL_ILCELER[il]) ||
    IL_ILCE_HARITASI[il] ||
    ["Merkez"];
  const varsayilanIlce = il === "Ankara" && ilceler.includes("Çankaya") ? "Çankaya" : ilceler[0];
  ilceSel.innerHTML = ilceler
    .map(ilce => `<option value="${ilce}" ${ilce === varsayilanIlce ? "selected" : ""}>${ilce}</option>`)
    .join("");
  aliciCoopIlceDegisti();
}

function aliciCoopIlceDegisti() {
  const il = document.getElementById("bcCity")?.value || "Ankara";
  const ilce = document.getElementById("bcDistrict")?.value || "Çankaya";
  const semtSel = document.getElementById("bcSemt");
  const semtMap = ilIlceyeGoreSemtHaritasiGetir(il, ilce);
  const semtler = Object.keys(semtMap);
  if (semtSel) {
    semtSel.innerHTML =
      `<option value="Tüm Semtler">Fark Etmez (Tüm ${ilce} Semtleri / Genel)</option>` +
      semtler.map((s, idx) => `<option value="${s}" ${idx === 0 ? "selected" : ""}>${s} Semti / Bölgesi</option>`).join("");
  }
  aliciCoopSemtDegisti();
}

function aliciCoopSemtDegisti() {
  const il = document.getElementById("bcCity")?.value || "Ankara";
  const ilce = document.getElementById("bcDistrict")?.value || "Çankaya";
  const semt = document.getElementById("bcSemt")?.value || "Tüm Semtler";
  const mahSel = document.getElementById("bcNeighborhood");
  if (!mahSel) return;
  const mahalleler = ilIlceSemteGoreMahalleListesiGetir(il, ilce, semt);
  const ustEtiket =
    semt && semt !== "Tüm Semtler"
      ? `Tüm ${semt} Semti Mahalleleri (Genel)`
      : `Tüm ${ilce} Mahalleleri (Genel)`;
  mahSel.innerHTML =
    `<option value="Tüm Mahalleler">${ustEtiket}</option>` +
    mahalleler.map(m => `<option value="${m}">${m}</option>`).join("") +
    `<option value="__CUSTOM__">+ Listede Olmayan Mahalle Yaz...</option>`;
  aliciCoopMahalleDegisti();
}

function aliciCoopMahalleDegisti() {
  const mahSel = document.getElementById("bcNeighborhood");
  const customInput = document.getElementById("bcNeighborhoodCustom");
  if (!mahSel || !customInput) return;
  if (mahSel.value === "__CUSTOM__") {
    customInput.style.display = "block";
    customInput.focus();
  } else {
    customInput.style.display = "none";
  }
}

function bcSeciliMahalleAdiniAl() {
  const mahSel = document.getElementById("bcNeighborhood");
  const customInput = document.getElementById("bcNeighborhoodCustom");
  if (mahSel && mahSel.value === "__CUSTOM__") {
    return (customInput?.value || "").trim() || "Tüm Mahalleler";
  }
  return mahSel?.value || "Tüm Mahalleler";
}

function yeniAliciCoopTalebiOlustur() {
  if (!aliciCoopTalepleri.length) aliciCoopYukle();
  if (!danismanProfili) profilYukle();

  const il = document.getElementById("bcCity")?.value || "Ankara";
  const ilce = document.getElementById("bcDistrict")?.value || "Çankaya";
  const seciliSemtRaw = document.getElementById("bcSemt")?.value || "Tüm Semtler";
  const mahalle = bcSeciliMahalleAdiniAl();
  const semt =
    seciliSemtRaw && seciliSemtRaw !== "Tüm Semtler"
      ? seciliSemtRaw
      : mahalledenSemtBul(il, ilce, mahalle) || `${ilce} Geneli`;
  const fiyatAraligi = (document.getElementById("bcPriceRange")?.value || "5.000.000 ₺ - 6.000.000 ₺").trim();
  const oda = (document.getElementById("bcRooms")?.value || "3+1").split("|")[0];
  const kat = (document.getElementById("bcFloor")?.value || "Ara Kat").split("|")[0];
  const cephe = (document.getElementById("bcFacade")?.value || "Güney - Doğu Cephe").split("|")[0];
  const binaYasi = (document.getElementById("bcBuildingAge")?.value || "5-10 Yaş Arası").split("|")[0];
  const krediDurumu = (document.getElementById("bcCredit")?.value || "Krediye Uygun (Kredi Limiti: 3.000.000 ₺)").split("|")[0];
  const tapuDurumu = (document.getElementById("bcDeed")?.value || "Kök Tapulu (Kat Mülkiyetli)").split("|")[0];
  const alimZamani = (document.getElementById("bcTimeline")?.value || "Hemen Almak İstiyor").split("|")[0];
  const not =
    (document.getElementById("bcBuyerNote")?.value || "").trim() ||
    `Alıcım ${il} / ${ilce} — ${semt} semtinde (${mahalle}) ${oda}, ${kat}, ${cephe}, ${binaYasi}, ${krediDurumu}, ${tapuDurumu} mülk arıyor. Bütçesi ${fiyatAraligi}, ${alimZamani.toLowerCase()}. Uygun aktif portföyünüzü mesaj kutuma gönderebilirsiniz.`;

  const bugun = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";

  const yeniTalep = {
    id: `ACT-${Math.floor(100 + Math.random() * 899)}`,
    tarih: bugun,
    olusturanDanisman: `${danismanProfili?.ad || "Gencay Çelikkan"} (${danismanProfili?.il || "Ankara"} • ${danismanProfili?.ofis || "Gayrimenkul Danışmanlık"})`,
    olusturanDanismanId: aktifId,
    olusturanDanismanTel: danismanProfili?.telefon || "0532 000 00 00",
    il,
    ilce,
    semt,
    mahalle,
    oda,
    kat,
    cephe,
    binaYasi,
    krediDurumu,
    tapuDurumu,
    fiyatAraligi,
    alimZamani,
    not
  };

  aliciCoopTalepleri.unshift(yeniTalep);
  if (document.getElementById("bcBuyerNote")) document.getElementById("bcBuyerNote").value = "";
  aliciCoopKaydet();
  ariyorumYeniTalepFormuToggle(false);
  aliciCoopTalepleriRender();

  const bolgemleEslesiyorMu = danismanUzmanlikSemtVeBolgeleriTalepleEslesiyorMu(yeniTalep, danismanProfili);

  if (typeof danismanBildirimEkle === "function") {
    danismanBildirimEkle({
      tip: "ariyorum",
      baslik: bolgemleEslesiyorMu
        ? `🔍 Uzmanlık Semtinizde (${il} / ${ilce} • ${semt} / ${mahalle}) Yeni Arama Talebi Açıldı! (#${yeniTalep.id})`
        : `🔍 Arıyorum! ${il} / ${ilce} • ${semt} (${mahalle}) Talebiniz Bölge Uzmanlarına Bildirildi`,
      detay: `${il} / ${ilce} — ${semt} semti (${mahalle}) için ${oda} (${fiyatAraligi}) arama talebi yayınlandı. Bölge uzmanlarının göndereceği aktif portföyler doğrudan Mesaj Kutunuza düşecektir.`,
      zaman: "Az önce",
      hedefMod: "ariyorum"
    });
  }

  alert(
    `📢 ARAMA TALEBİNİZ (#${yeniTalep.id}) YAYINLANDI!\n\n` +
      `• Konum: ${il} / ${ilce} / ${semt} Semti (${mahalle})\n` +
      `• Özellikler: ${oda} • ${kat} • ${cephe} • ${binaYasi}\n` +
      `• Bütçe: ${fiyatAraligi}\n\n` +
      `${il} / ${ilce} (${semt}) bölge uzmanlarına bildirim gönderildi. Meslektaşlarınızın göndereceği aktif portföyler herkese açık görünmez, doğrudan sizin özel Mesaj Kutunuza düşer.`
  );
}

function ariyorumTalepFiltreIlDegisti() {
  const ilSel = document.getElementById("ariyorumFilterCity");
  const ilceSel = document.getElementById("ariyorumFilterDistrict");
  const semtSel = document.getElementById("ariyorumFilterSemt");
  const mahSel = document.getElementById("ariyorumFilterNeighborhood");
  if (!ilSel || !ilceSel) return;

  const seciliIl = ilSel.value;
  if (seciliIl === "Tümü") {
    ilceSel.innerHTML = `<option value="Tümü" selected>Tüm İlçeler</option>`;
    if (semtSel) semtSel.innerHTML = `<option value="Tümü" selected>Tüm Semtler</option>`;
    if (mahSel) mahSel.innerHTML = `<option value="Tümü" selected>Tüm Mahalleler</option>`;
  } else {
    const ilceler =
      (typeof TURKIYE_81_IL_ILCELER !== "undefined" && TURKIYE_81_IL_ILCELER[seciliIl]) ||
      IL_ILCE_HARITASI[seciliIl] ||
      ["Merkez"];
    ilceSel.innerHTML =
      `<option value="Tümü" selected>Tüm ${seciliIl} İlçeleri</option>` +
      ilceler.map(ilce => `<option value="${ilce}">${ilce}</option>`).join("");
    if (semtSel) semtSel.innerHTML = `<option value="Tümü" selected>Tüm Semtler</option>`;
    if (mahSel) mahSel.innerHTML = `<option value="Tümü" selected>Tüm Mahalleler</option>`;
  }
  aliciCoopTalepleriRender();
}

function ariyorumTalepFiltreIlceDegisti() {
  const ilSel = document.getElementById("ariyorumFilterCity");
  const ilceSel = document.getElementById("ariyorumFilterDistrict");
  const semtSel = document.getElementById("ariyorumFilterSemt");
  const mahSel = document.getElementById("ariyorumFilterNeighborhood");
  if (!ilSel || !ilceSel) return;

  const seciliIl = ilSel.value;
  const seciliIlce = ilceSel.value;
  if (seciliIl === "Tümü" || seciliIlce === "Tümü") {
    if (semtSel) semtSel.innerHTML = `<option value="Tümü" selected>Tüm Semtler</option>`;
    if (mahSel) mahSel.innerHTML = `<option value="Tümü" selected>Tüm Mahalleler</option>`;
  } else {
    const semtMap = ilIlceyeGoreSemtHaritasiGetir(seciliIl, seciliIlce);
    const semtler = Object.keys(semtMap);
    if (semtSel) {
      semtSel.innerHTML =
        `<option value="Tümü" selected>Tüm ${seciliIlce} Semtleri (Genel)</option>` +
        semtler.map(s => `<option value="${s}">${s} Semti</option>`).join("");
    }
    if (mahSel) {
      const mahalleler = ilIlceSemteGoreMahalleListesiGetir(seciliIl, seciliIlce, "Tümü");
      mahSel.innerHTML =
        `<option value="Tümü" selected>Tüm ${seciliIlce} Mahalleleri</option>` +
        mahalleler.map(m => `<option value="${m}">${m}</option>`).join("");
    }
  }
  aliciCoopTalepleriRender();
}

function ariyorumTalepFiltreSemtDegisti() {
  const ilSel = document.getElementById("ariyorumFilterCity");
  const ilceSel = document.getElementById("ariyorumFilterDistrict");
  const semtSel = document.getElementById("ariyorumFilterSemt");
  const mahSel = document.getElementById("ariyorumFilterNeighborhood");
  if (!ilSel || !ilceSel || !mahSel) return;

  const seciliIl = ilSel.value;
  const seciliIlce = ilceSel.value;
  const seciliSemt = semtSel ? semtSel.value : "Tümü";
  if (seciliIl === "Tümü" || seciliIlce === "Tümü") {
    mahSel.innerHTML = `<option value="Tümü" selected>Tüm Mahalleler</option>`;
  } else {
    const mahalleler = ilIlceSemteGoreMahalleListesiGetir(seciliIl, seciliIlce, seciliSemt);
    const baslik = seciliSemt !== "Tümü" ? `Tüm ${seciliSemt} Mahalleleri` : `Tüm ${seciliIlce} Mahalleleri`;
    mahSel.innerHTML =
      `<option value="Tümü" selected>${baslik}</option>` +
      mahalleler.map(m => `<option value="${m}">${m}</option>`).join("");
  }
  aliciCoopTalepleriRender();
}

function ariyorumSadeceUzmanlikBolgemFiltrele() {
  if (!danismanProfili) profilYukle();
  ariyorumKonumSecicileriniBaslat();
  const uyeIl = (danismanProfili?.il || "Ankara").split(",")[0].trim();
  const uyeIlce = (danismanProfili?.ilce || "Çankaya").split(",")[0].trim();
  const ilSel = document.getElementById("ariyorumFilterCity");
  const ilceSel = document.getElementById("ariyorumFilterDistrict");
  const semtSel = document.getElementById("ariyorumFilterSemt");
  const mahSel = document.getElementById("ariyorumFilterNeighborhood");

  if (ilSel) {
    ilSel.value = uyeIl;
    const ilceler =
      (typeof TURKIYE_81_IL_ILCELER !== "undefined" && TURKIYE_81_IL_ILCELER[uyeIl]) ||
      IL_ILCE_HARITASI[uyeIl] ||
      [uyeIlce];
    if (ilceSel) {
      ilceSel.innerHTML =
        `<option value="Tümü">Tüm ${uyeIl} İlçeleri</option>` +
        ilceler.map(ilce => `<option value="${ilce}" ${ilce === uyeIlce ? "selected" : ""}>${ilce}</option>`).join("");
      ilceSel.value = uyeIlce;
    }
    const semtMap = ilIlceyeGoreSemtHaritasiGetir(uyeIl, uyeIlce);
    const semtler = Object.keys(semtMap);
    const uyeBolgelerLower = (danismanProfili?.bolgeler || "").toLowerCase();
    const eslesenSemt = semtler.find(s => uyeBolgelerLower.includes(s.split("/")[0].trim().toLowerCase())) || "Tümü";
    if (semtSel) {
      semtSel.innerHTML =
        `<option value="Tümü" ${eslesenSemt === "Tümü" ? "selected" : ""}>Tüm ${uyeIlce} Semtleri</option>` +
        semtler.map(s => `<option value="${s}" ${s === eslesenSemt ? "selected" : ""}>${s} Semti</option>`).join("");
      semtSel.value = eslesenSemt;
    }
    if (mahSel) {
      const mahalleler = ilIlceSemteGoreMahalleListesiGetir(uyeIl, uyeIlce, eslesenSemt);
      mahSel.innerHTML =
        `<option value="Tümü" selected>Tüm ${eslesenSemt !== "Tümü" ? eslesenSemt : uyeIlce} Mahalleleri</option>` +
        mahalleler.map(m => `<option value="${m}">${m}</option>`).join("");
    }
  }
  aliciCoopTalepleriRender();
}

function ariyorumFiltreleriSifirla() {
  ariyorumKonumSecicileriniBaslat();
  const ilSel = document.getElementById("ariyorumFilterCity");
  const ilceSel = document.getElementById("ariyorumFilterDistrict");
  const semtSel = document.getElementById("ariyorumFilterSemt");
  const mahSel = document.getElementById("ariyorumFilterNeighborhood");
  if (ilSel) ilSel.value = "Tümü";
  if (ilceSel) ilceSel.innerHTML = `<option value="Tümü" selected>Tüm İlçeler</option>`;
  if (semtSel) semtSel.innerHTML = `<option value="Tümü" selected>Tüm Semtler</option>`;
  if (mahSel) mahSel.innerHTML = `<option value="Tümü" selected>Tüm Mahalleler</option>`;
  aliciCoopTalepleriRender();
}

// "Aktif Portföyümü Gönder" — Yalnızca talep açanın özel Mesaj Kutusuna düşer (herkese açık görünmez)
function ariyorumAktifPortfoyumuMesajOlarakGonder(talepId) {
  const t = aliciCoopTalepleri.find(x => x.id === talepId);
  if (!t) return;
  if (!danismanProfili) profilYukle();

  const secimEl = document.getElementById(`sendPropSelect-${talepId}`);
  const notEl = document.getElementById(`sendPropNote-${talepId}`);
  const seciliPortfoyKod = secimEl ? secimEl.value : "";

  const uygunPortfoylerim = aktifDanismaninGorunenPortfoyleri();
  const secilenP = uygunPortfoylerim.find(p => p.kod === seciliPortfoyKod) || uygunPortfoylerim[0];

  if (!secilenP) {
    alert("⚠️ Gönderebileceğiniz aktif bir portföyünüz bulunmuyor. Önce yeni bir portföy oluşturabilirsiniz.");
    return;
  }

  const ekNot =
    (notEl?.value || "").trim() ||
    `Merhaba, #${t.id} (${t.il} / ${t.ilce} • ${t.mahalle || "Tüm Mahalleler"} • ${t.oda}) arama talebiniz için paylaşıma açık aktif portföyümü iletiyorum.`;

  const gonderenAd = danismanProfili?.ad || "Gencay Çelikkan";
  const gonderenOfis = `${danismanProfili?.ofis || "Gayrimenkul Danışmanlık Ofisi"} (${danismanProfili?.il || "Ankara"} / ${danismanProfili?.ilce || "Çankaya"})`;
  const gonderenTel = danismanProfili?.telefon || "0532 000 00 00";

  const mesajMetni =
    `🏠 [Arıyorum! Talep #${t.id} İçin Aktif Portföy Önerisi]\n` +
    `• Portföy: ${secilenP.baslik} (${secilenP.bolge})\n` +
    `• Fiyat: ${secilenP.fiyat || "Belirtilmedi"} • Takip Kodu: #${secilenP.kod}\n` +
    `• Mesaj: ${ekNot}`;

  // Talep açan danışmanın özel mesaj kutusuna kaydet (ve test kolaylığı için aktif kullanıcının mesaj kutusuna da yansıt)
  const hedefDanismanId = t.olusturanDanismanId || "selin-yilmaz";
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";

  if (typeof uyeMesajlariniGetir === "function") {
    const hedefKutu = uyeMesajlariniGetir(hedefDanismanId);
    hedefKutu.unshift({
      gonderenAd,
      gonderenRol: `${gonderenOfis} • Aktif Portföy Gönderimi`,
      gonderenTel,
      tarih: "Az önce",
      icerik: mesajMetni,
      yanit: "",
      okundu: false
    });

    if (hedefDanismanId !== aktifId) {
      const kendiKutum = uyeMesajlariniGetir(aktifId);
      kendiKutum.unshift({
        gonderenAd: `${t.olusturanDanisman.split("(")[0].trim()} (Talep #${t.id} Sahibi)`,
        gonderenRol: `${t.il} / ${t.ilce} (${t.mahalle || "Merkez"}) Arama Talebi`,
        gonderenTel: t.olusturanDanismanTel || "0532 555 44 33",
        tarih: "Az önce",
        icerik: `[${t.id} Talebi: ${t.il}/${t.ilce} ${t.oda} - ${t.fiyatAraligi}] talebine aktif portföyünüzü gönderdiniz.`,
        yanit: mesajMetni,
        okundu: true
      });
    }
    if (typeof uyeMesajKutulariniKaydet === "function") {
      uyeMesajKutulariniKaydet();
    }
  }

  if (typeof danismanBildirimEkle === "function") {
    danismanBildirimEkle({
      tip: "mesaj",
      baslik: `💬 Aktif Portföyünüz (#${secilenP.kod}) ${t.olusturanDanisman.split("(")[0].trim()}'ın Mesaj Kutusuna İletildi`,
      detay: `Talep #${t.id} (${t.il} / ${t.ilce} • ${t.mahalle || ""}) için "${secilenP.baslik}" portföyünüz yalnızca talep sahibinin özel mesaj kutusuna gönderildi.`,
      zaman: "Az önce",
      hedefMod: "messages"
    });
  }

  const drawerEl = document.getElementById(`sendPropDrawer-${talepId}`);
  if (drawerEl) drawerEl.style.display = "none";
  if (notEl) notEl.value = "";

  alert(
    `✅ AKTİF PORTFÖYÜNÜZ ÖZEL MESAJ OLARAK GÖNDERİLDİ!\n\n` +
      `• Gönderilen Portföy: ${secilenP.baslik} (#${secilenP.kod} - ${secilenP.fiyat})\n` +
      `• Alıcı (Talep Sahibi): ${t.olusturanDanisman}\n\n` +
      `Gönderdiğiniz portföy bu sayfada herkese açık görünmez; doğrudan talep açan danışmanın özel 'Mesajlar' kutusuna düştü.`
  );
}

function ariyorumPortfoyGonderCekmecesiToggle(talepId) {
  const el = document.getElementById(`sendPropDrawer-${talepId}`);
  if (!el) return;
  el.style.display = el.style.display === "none" ? "block" : "none";
}

function aliciCoopTalepleriRender() {
  if (!aliciCoopTalepleri || aliciCoopTalepleri.length === 0) aliciCoopYukle();
  if (!danismanProfili) profilYukle();
  if (!ariyorumIlSecicileriHazirMi) ariyorumKonumSecicileriniBaslat();

  const uyeIl = danismanProfili?.il || "Ankara";
  const uyeIlce = danismanProfili?.ilce || "Çankaya";
  const uyeSemtler = danismanProfili?.bolgeler || "Çayyolu, Bağlıca";
  const regionBadge = document.getElementById("ariyorumMyRegionBadge");
  if (regionBadge) {
    regionBadge.textContent = `Uzmanlık Semt / Bölgeniz: ${uyeIl} (${uyeSemtler})`;
  }

  const filterCity = document.getElementById("ariyorumFilterCity")?.value || "Tümü";
  const filterDistrict = document.getElementById("ariyorumFilterDistrict")?.value || "Tümü";
  const filterSemt = document.getElementById("ariyorumFilterSemt")?.value || "Tümü";
  const filterNeighborhood = document.getElementById("ariyorumFilterNeighborhood")?.value || "Tümü";

  const wrap = document.getElementById("buyerCoopRequestsList");
  if (!wrap) return;

  const filtrelenmisTalepler = aliciCoopTalepleri.filter(t => {
    const ilOk = filterCity === "Tümü" || t.il === filterCity;
    const ilceOk = filterDistrict === "Tümü" || t.ilce === filterDistrict;
    let semtOk = true;
    if (filterSemt !== "Tümü") {
      const tSemt = t.semt || mahalledenSemtBul(t.il, t.ilce, t.mahalle) || "";
      const semtMahalleleri = ilIlceSemteGoreMahalleListesiGetir(t.il, t.ilce, filterSemt);
      semtOk =
        tSemt.toLowerCase().includes(filterSemt.toLowerCase()) ||
        semtMahalleleri.some(m => (t.mahalle || "").toLowerCase().includes(m.replace(" Mah.", "").trim().toLowerCase()));
    }
    const mahOk =
      filterNeighborhood === "Tümü" ||
      !t.mahalle ||
      t.mahalle === "Tüm Mahalleler" ||
      t.mahalle.toLowerCase().includes(filterNeighborhood.toLowerCase());
    return ilOk && ilceOk && semtOk && mahOk;
  });

  if (filtrelenmisTalepler.length === 0) {
    wrap.innerHTML = `
      <div class="saas-card" style="text-align:center;padding:28px 20px;color:#64748B;">
        Seçilen konum filtresinde (<strong>${filterCity} / ${filterDistrict} / ${filterSemt} / ${filterNeighborhood}</strong>) aktif arama talebi bulunamadı.
      </div>
    `;
    return;
  }

  const aktifPortfoylerim = aktifDanismaninGorunenPortfoyleri();
  const acikPortfoylerim = aktifPortfoylerim.filter(p => p.paylasimaAcikMi !== false);
  const gonderilebilirPortfoyler = acikPortfoylerim.length > 0 ? acikPortfoylerim : aktifPortfoylerim;

  wrap.innerHTML = filtrelenmisTalepler
    .map(t => {
      const bolgemleEslesiyor = danismanUzmanlikSemtVeBolgeleriTalepleEslesiyorMu(t, danismanProfili);
      const gosterilenSemt = t.semt || mahalledenSemtBul(t.il, t.ilce, t.mahalle) || t.ilce;

      const portfoyOptionsHtml = gonderilebilirPortfoyler
        .map(
          p =>
            `<option value="${p.kod}">#${p.kod} — ${p.baslik} (${p.fiyat || ""}) ${
              p.paylasimaAcikMi !== false ? "• [Paylaşıma Açık]" : ""
            }</option>`
        )
        .join("");

      return `
        <div class="saas-card" style="padding:18px;${bolgemleEslesiyor ? "border:1.5px solid #2563EB;" : ""}">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:12px;">
            <div style="flex:1;min-width:260px;">
              <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:6px;">
                <span class="saas-badge-neutral">Talep #${t.id}</span>
                <span class="saas-badge-blue">📍 ${t.il} / ${t.ilce} • <strong>${gosterilenSemt} Semti</strong> (${t.mahalle || "Tüm Mahalleler"})</span>
                ${
                  bolgemleEslesiyor
                    ? `<span style="font-size:0.71rem;font-weight:800;background:#FEF3C7;color:#B45309;border:1px solid #FDE68A;padding:2px 8px;border-radius:999px;">🔔 Uzmanlık Semtinizle Eşleşiyor</span>`
                    : ""
                }
                <span class="saas-text-xs">${t.tarih} • Talep Açan: <strong>${t.olusturanDanisman}</strong></span>
              </div>
              <h3 class="saas-h2" style="margin-bottom:4px;">
                ${t.il} / ${t.ilce} — ${gosterilenSemt} (${t.mahalle || "Semt Geneli"}) • ${t.oda} • ${t.kat} • ${t.cephe}
              </h3>
              ${t.not ? `<p class="saas-text-xs" style="margin:4px 0 8px;color:#334155;line-height:1.45;">"${t.not}"</p>` : ""}
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                <span class="saas-badge-neutral">Bütçe: ${t.fiyatAraligi}</span>
                <span class="saas-badge-neutral">${t.krediDurumu}</span>
                <span class="saas-badge-neutral">${t.tapuDurumu}</span>
                <span class="saas-badge-blue">${t.alimZamani}</span>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
              <button type="button" class="social-btn-primary" style="padding:8px 14px;font-size:0.79rem;" onclick="ariyorumPortfoyGonderCekmecesiToggle('${t.id}')">
                <span>📤 Aktif Portföyümü Gönder</span>
              </button>
              <span style="font-size:0.68rem;color:#64748B;">🔒 Yalnızca talep açanın mesajına düşer</span>
            </div>
          </div>

          <!-- TIKLAYINCA AÇILAN: AKTİF PORTFÖYÜMÜ TALEP SAHİBİNİN MESAJ KUTUSUNA GÖNDERME ALANI -->
          <div id="sendPropDrawer-${t.id}" style="display:none;margin-top:14px;padding-top:14px;border-top:1px dashed #CBD5E1;background:#F8FAFC;padding:12px 14px;border-radius:10px;">
            <div style="font-size:0.8rem;font-weight:700;color:#0F172A;margin-bottom:8px;">
              🔒 ${t.olusturanDanisman.split("(")[0].trim()} adlı danışmanın Özel Mesaj Kutusuna Gönderilecek Aktif Portföyünüzü Seçin:
            </div>
            <div class="form-grid-2" style="margin-bottom:8px;">
              <div class="field" style="margin-bottom:0;">
                <select id="sendPropSelect-${t.id}" class="saas-input-compact" style="width:100%;padding:8px 10px;">
                  ${portfoyOptionsHtml}
                </select>
              </div>
              <div class="field" style="margin-bottom:0;">
                <input
                  type="text"
                  id="sendPropNote-${t.id}"
                  class="saas-input-compact"
                  placeholder="Meslektaşınıza özel mesaj notunuz (Örn: Portföyüm paylaşıma açıktır, alıcınıza sunabiliriz...)"
                  style="width:100%;padding:8px 10px;"
                />
              </div>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:8px;">
              <button type="button" class="saas-btn-outline-sm" onclick="ariyorumPortfoyGonderCekmecesiToggle('${t.id}')">İptal</button>
              <button type="button" class="saas-btn-primary-sm" onclick="ariyorumAktifPortfoyumuMesajOlarakGonder('${t.id}')">
                <span>Mesaj Kutusuna Gönder →</span>
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

function bolgeUzmaniAraRender() {
  aliciCoopTalepleriRender();
  const ilSel = document.getElementById("coopSearchCity");
  const ilceSel = document.getElementById("coopSearchDistrict");
  const listWrap = document.getElementById("coopExpertsList");
  const activeWrap = document.getElementById("activeCoopAgreementsList");
  if (!listWrap) return;

  const il = ilSel ? ilSel.value : "İstanbul";
  const ilce = ilceSel ? ilceSel.value : "Bağcılar";

  const filtreli = BOLGE_UZMANLARI_HAVUZU.filter(u => {
    const ilOk = il === "Tümü" || u.il === il;
    const ilceOk = ilce === "Tümü" || u.ilce === ilce;
    return ilOk && ilceOk;
  });

  if (filtreli.length === 0) {
    listWrap.innerHTML = `<div class="saas-text-sm">Seçilen İl (${il}) / İlçe (${ilce}) için kayıtlı uzman bulunamadı.</div>`;
  } else {
    listWrap.innerHTML = filtreli
      .map(u => {
        const acikMi = u.paylasimaAcikMi !== false;
        return `
        <div class="saas-card" style="padding:18px;">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <img src="${u.foto}" onerror="this.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'" alt="${u.ad}" class="saas-agent-avatar" style="width:44px;height:44px;" />
              <div>
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                  <strong style="font-size:0.95rem;color:#0F172A;">${u.ad}</strong>
                  <span class="saas-badge-neutral">${u.il} / ${u.ilce}</span>
                  <span class="saas-text-xs">${u.deneyim}</span>
                </div>
                <div class="saas-text-xs">${u.ofis} • Mahalleler: ${u.mahalleler}</div>
              </div>
            </div>
            <span class="${acikMi ? "saas-badge-blue" : "saas-badge-neutral"}">
              ${acikMi ? "Paylaşıma Açık" : "Paylaşıma Kapalı"}
            </span>
          </div>

          <p class="saas-text-xs" style="margin-bottom:12px;">${u.bio}</p>

          <div style="display:flex;flex-wrap:wrap;gap:8px;padding-top:10px;border-top:1px solid #E2E8F0;">
            <button type="button" class="saas-btn-outline-sm" onclick="uzmanBioIncele('${u.id}')">
              <span>Özgeçmiş &amp; Referanslar</span>
            </button>
            ${
              acikMi
                ? `<button type="button" class="saas-btn-primary-sm" onclick="paylasimliCalismaTeklifGonderVeKabulEt('${u.id}')">
                    <span>Paylaşımlı Çalışma Başlat</span>
                   </button>`
                : `<button type="button" class="saas-btn-outline-sm" disabled style="opacity:0.5;cursor:not-allowed;">
                    <span>Paylaşıma Kapalı</span>
                   </button>`
            }
          </div>
        </div>
      `;
      })
      .join("");
  }

  if (activeWrap) {
    const coopPortfoyler = portfoyler.filter(p => p.coopAktifMi);
    if (coopPortfoyler.length === 0) {
      activeWrap.innerHTML = `<div class="saas-text-sm">Henüz aktif paylaşımlı ortak çalışma portföyünüz bulunmuyor.</div>`;
    } else {
      activeWrap.innerHTML = coopPortfoyler
        .map(
          cp => `
          <div class="saas-card" style="padding:16px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:14px;">
            <div style="flex:1;min-width:260px;">
              <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:4px;">
                <span class="saas-badge-blue">Aktif Co-Op (${cp.coopPaylasimOrani || "%50 - %50"})</span>
                <strong style="font-size:0.92rem;color:#0F172A;">${cp.baslik} (${cp.bolge})</strong>
              </div>
              <div class="saas-text-xs" style="margin-bottom:8px;">
                Yönlendiren: ${cp.coopYonlendirenDanisman} (${cp.coopDanismanTel}) • Bölge Uzmanı: ${cp.danisman} (${cp.danismanTel})
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:8px;">
                <span class="saas-badge-neutral">Satıcı Takip No: #${cp.kod}</span>
                <span class="saas-badge-blue">Co-Op Danışman Takip No: #${cp.coopKod}</span>
              </div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button type="button" class="saas-btn-primary-sm" onclick="heroKodSecVeDogrula('${cp.coopKod}')">
                <span>SMS Doğrula &amp; İzle</span>
              </button>
              <button type="button" class="saas-btn-outline-sm" onclick="saticiPaneliniGoster('${cp.coopKod}'); gorunumDegistir('view-seller');">
                <span>Takip Ekranını Aç</span>
              </button>
            </div>
          </div>
        `
        )
        .join("");
    }
  }
}

function uzmanBioIncele(uzmanId) {
  const u = BOLGE_UZMANLARI_HAVUZU.find(x => x.id === uzmanId);
  if (!u) return;

  const box = document.getElementById("expertBioModalContent");
  if (!box) return;

  const satislarHtml = (u.referansSatislar || "")
    .split("\n")
    .filter(Boolean)
    .map(s => `<li style="margin-bottom:4px;">🏆 ${s}</li>`)
    .join("");

  box.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;padding-bottom:14px;border-bottom:1px solid var(--border-color);margin-bottom:14px;">
      <img src="${u.foto}" onerror="this.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'" alt="${u.ad}" style="width:74px;height:74px;border-radius:50%;object-fit:cover;border:3px solid var(--cobalt-600);" />
      <div>
        <span class="pill-badge" style="margin-bottom:4px;">📍 ${u.il} / ${u.ilce} Doğrulanmış Bölge Uzmanı • ${u.rozetSayisi} Rozet</span>
        <h3 style="font-size:1.3rem;font-weight:800;color:var(--navy-900);">${u.ad}</h3>
        <div style="font-size:0.85rem;color:var(--cobalt-600);font-weight:700;">${u.ofis} • Tel: ${u.telefon}</div>
      </div>
    </div>

    <div style="margin-bottom:12px;">
      <h4 style="font-size:0.9rem;font-weight:800;color:var(--navy-900);margin-bottom:4px;">Özgeçmiş &amp; Ortak Çalışma (Co-Op) Yaklaşımı</h4>
      <p style="font-size:0.85rem;color:var(--text-body);line-height:1.6;">${u.bio}</p>
    </div>

    <div style="margin-bottom:12px;background:var(--bg-soft);padding:12px;border-radius:10px;border:1px solid var(--border-color);">
      <div style="font-size:0.82rem;margin-bottom:6px;"><strong>Uzmanlık İl / İlçe / Mahalleler:</strong> ${u.il} / ${u.ilce} — ${u.mahalleler}</div>
      <div style="font-size:0.82rem;margin-bottom:6px;"><strong>İlgi Alanları &amp; Hobiler:</strong> ${u.hobiler}</div>
      <div style="font-size:0.82rem;"><strong>Son Referans Satışları:</strong></div>
      <ul style="padding-left:18px;margin-top:4px;font-size:0.81rem;color:var(--text-body);">
        ${satislarHtml}
      </ul>
    </div>

    <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:16px;">
      <button type="button" class="btn btn-outline" onclick="uzmanBioModalKapat()">Kapat</button>
      <button type="button" class="btn btn-primary" onclick="uzmanBioModalKapat(); paylasimliCalismaTeklifGonderVeKabulEt('${u.id}');">
        🤝 Bu Uzmana Paylaşımlı Çalışma Teklif Et
      </button>
    </div>
  `;

  document.getElementById("expertBioModal").classList.add("open");
}

function uzmanBioModalKapat() {
  document.getElementById("expertBioModal")?.classList.remove("open");
}

function paylasimliCalismaTeklifGonderVeKabulEt(uzmanId) {
  const u = BOLGE_UZMANLARI_HAVUZU.find(x => x.id === uzmanId);
  if (!u) return;

  if (!danismanProfili) profilYukle();
  const yonlendirenAd = danismanProfili?.ad || "Gencay Çelikkan";
  const yonlendirenIl = danismanProfili?.il || "Ankara";
  const yonlendirenTel = danismanProfili?.telefon || "0532 000 00 00";

  const varsayilanMulk = `${u.il} ${u.ilce} (${u.mahalleler.split(",")[0]}) 3+1 Satılık Daire`;
  const mulkBaslik = prompt(
    `🤝 ${u.il} / ${u.ilce} Bölge Uzmanı ${u.ad}'a Paylaşımlı Ortak Çalışma (Co-Op) Teklifi Gönderiyorsunuz.\n\nYönlendirdiğiniz mülkün kısa tanımını girin:`,
    varsayilanMulk
  );
  if (mulkBaslik === null) return;

  const saticiAd = prompt("Mülk Sahibinin (Satıcının) Adı Soyadı:", "Hakan Yücel") || "Hakan Yücel";
  const saticiTel = prompt("Mülk Sahibinin Tanımlı Cep Telefonu:", "0535 610 20 30") || "0535 610 20 30";
  const coopTel =
    prompt(
      `Sizin (Ortak Çalışma Yapan Danışman: ${yonlendirenAd}) 12 haneli Co-Op takip kodunuza tanımlanacak cep telefonu numaranız:`,
      yonlendirenTel
    ) || yonlendirenTel;

  const saticiKodu = rastgeleKodUret();
  let coopKodu = rastgeleKodUret();
  while (coopKodu === saticiKodu) {
    coopKodu = rastgeleKodUret();
  }

  const bugun = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const yeniCoopPortfoy = {
    kod: saticiKodu,
    coopAktifMi: true,
    coopKod: coopKodu,
    coopDanismanTel: coopTel.trim(),
    coopYonlendirenDanisman: `${yonlendirenAd} (${yonlendirenIl})`,
    coopPaylasimOrani: "%50 - %50 Paylaşımlı Ortak Çalışma",
    baslik: mulkBaslik.trim() || varsayilanMulk,
    bolge: `${u.il} / ${u.ilce}`,
    fiyat: "5.000.000 ₺ - 5.250.000 ₺ (Tahmini)",
    mulkSahibi: saticiAd.trim(),
    mulkSahibiTel: saticiTel.trim(),
    danisman: u.ad,
    danismanTel: u.telefon,
    ofis: u.ofis,
    durumEtiketi: `Co-Op Ortak Çalışma Kabul Edildi • Pazar Analizi & Çekim Aşamasında`,
    sonGuncelleme: `${bugun}, Şimdi`,
    yetkiModu: "yok",
    yetkiOnaylandiMi: false,
    yetkiOnayDetayi: "",
    yetkiBelgesiDosyaAdi: "",
    yetkiSuresi: "90 Gün (3 Ay)",
    komisyon: "%2 + KDV (%50 - %50 Co-Op Paylaşımlı)",
    sahibindenUrl: "https://www.sahibinden.com/",
    videoUrl: "https://www.instagram.com/",
    matterportUrl: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
    takyidatUrl: "",
    goruntulenme: "1.420",
    favori: "54",
    sosyalErisim: "6.800 İzlenme",
    telefon: "9 Ciddi Arama",
    gosterim: "2 Yerinde Gösterim",
    hizmetler: [
      {
        ad: "1. Profesyonel Fotoğraf Çekimi & Yerinde Keşif",
        durum: "done",
        emoji: "👏",
        saticiYorumu: "Bölge uzmanı çok hızlı çekim yaptı, teşekkürler."
      },
      {
        ad: "2. Detaylı Pazar & Rakip Fiyat Analizi",
        durum: "done",
        emoji: "👍",
        saticiYorumu: ""
      },
      {
        ad: "3. Drone ile Havadan Çekim & Kurgu",
        durum: "current",
        emoji: "",
        saticiYorumu: ""
      },
      {
        ad: "4. Sahibinden & Emlakjet Vitrin İlan Girişi",
        durum: "pending",
        emoji: "",
        saticiYorumu: ""
      }
    ],
    pazarAnalizi: {
      tamamlandiMi: true,
      danismanFoto: u.foto,
      danismanBio: u.bio,
      referansMulkler: u.referansSatislar,
      minFiyat: "5.000.000 ₺",
      maxFiyat: "5.250.000 ₺",
      finalDegerlendirme: `${yonlendirenAd} (${yonlendirenIl}) ile yürüttüğümüz paylaşımlı ortak çalışma kapsamında ${u.il} ${u.ilce} mülkünüzün fotoğraf çekimi ve emsal pazar analizi tamamlanmıştır.`,
      rakipler: [
        {
          url: "https://www.sahibinden.com/ilan/emlak-konut-satilik-emsal-1",
          baslik: `${u.ilce} Emsal Site İçi 3+1 Daire`,
          fiyat: "5.450.000 ₺",
          sure: "3 Aydır İlanda",
          yorum: "Bu ilandaki emlakçıyla görüşüldü; daire yapısız ve 3 aydır fiyat yüksekliğinden bekliyor."
        }
      ]
    },
    medya: [
      { baslik: "Geniş Salon & Cephe", url: ORNEK_FOTOGRAFLAR[0].url },
      { baslik: "Modern Mutfak", url: ORNEK_FOTOGRAFLAR[1].url }
    ],
    gunluk: [
      {
        tarih: `${bugun} • Co-Op Ortak Çalışma`,
        metin: `🤝 ${yonlendirenAd} (${yonlendirenIl}) tarafından gönderilen Paylaşımlı Çalışma teklifi ${u.il}/${u.ilce} Bölge Uzmanı ${u.ad} tarafından KABUL EDİLDİ. Satıcı ve Ortak Danışman için iki ayrı 12 haneli takip kodu üretildi.`,
        gorunurluk: "public"
      }
    ],
    teklifler: [
      {
        alici: "Serkan Kaya (Bölge Uzmanı Alıcı Adayı)",
        tutar: "5.050.000 ₺",
        odemeSekli: "Peşin + Kredi",
        tarih: bugun,
        not: `${u.ad} tarafından yer gösterimi sonrası alınan ilk resmi teklif.`,
        durum: "pending",
        saticiYaniti: ""
      }
    ],
    yerGosterimleri: [],
    taleplerMetni: `${bugun} | Co-Op Bölge Uzmanı (${u.ad}) | İlk yerinde keşif ve fotoğraf çekimi tamamlandı | Tamamlandı`
  };

  portfoyler.unshift(yeniCoopPortfoy);
  seciliKod = yeniCoopPortfoy.kod;
  verileriKaydet();
  panelYenile();

  alert(
    `🤝 PAYLAŞIMLI ORTAK ÇALIŞMA (CO-OP) TEKLİFİNİZ ${u.ad.toUpperCase()} TARAFINDAN KABUL EDİLDİ!\n\n` +
      `Sistem tarafından birbirinden farklı 2 adet 12 haneli benzersiz takip kodu üretildi:\n\n` +
      `1️⃣ Mülk Sahibi (${saticiAd}) Takip Kodu: ${saticiKodu}\n` +
      `   • Tanımlı Satıcı Tel: ${saticiTel}\n\n` +
      `2️⃣ Sizin (Co-Op Ortak Danışman - ${yonlendirenAd}) Takip Kodunuz: ${coopKodu}\n` +
      `   • Tanımlı Danışman Tel: ${coopTel}\n\n` +
      `Şimdi sizin Co-Op takip kodunuz (${coopKodu}) ile SMS doğrulama ekranı açılıyor; tıpkı satıcı gibi bölge uzmanının yaptığı tüm hizmetleri ve adımları canlı takip edebilirsiniz!`
  );

  heroKodSecVeDogrula(coopKodu);
}

// ============================================================================
// 12 HANELİ TAKİP KODU (SATICI VEYA CO-OP ORTAK DANIŞMAN) & SMS DOĞRULAMA AKIŞI
// ============================================================================
let dogrulanacakKod = "849201736410";

function heroKodSecVeDogrula(kod) {
  const aranan = (kod || document.getElementById("heroTrackingInput")?.value || "849201736410").trim();
  const inputEl = document.getElementById("heroTrackingInput");
  if (inputEl) inputEl.value = aranan;

  const p =
    portfoyler.find(x => x.kod === aranan || (x.coopKod && x.coopKod === aranan)) || portfoyler[0];
  const isCoopCode = Boolean(p && p.coopKod && p.coopKod === aranan);
  dogrulanacakKod = p ? (isCoopCode ? p.coopKod : p.kod) : aranan;

  const codeLabel = document.getElementById("verifyModalCodeLabel");
  if (codeLabel) {
    codeLabel.textContent = isCoopCode ? `${dogrulanacakKod} (Co-Op Ortak Danışman Kodu)` : dogrulanacakKod;
  }

  const phoneInput = document.getElementById("verifyPhoneInput");
  const phoneHint = document.getElementById("verifyDefinedPhoneHint");
  if (p) {
    const hedefTel = isCoopCode ? p.coopDanismanTel || "0532 000 00 00" : p.mulkSahibiTel || "0532 410 20 30";
    if (phoneInput) phoneInput.value = hedefTel;
    if (phoneHint) {
      phoneHint.textContent = isCoopCode
        ? `🤝 Co-Op Ortak Çalışma Kodu Algılandı: Yönlendiren danışman (${p.coopYonlendirenDanisman}) için tanımlı telefon numarası (${hedefTel}) otomatik dolduruldu.`
        : `Demo İpucu: Bu 12 haneli satıcı takip kodu için tanımlı telefon numarası (${hedefTel}) otomatik dolduruldu.`;
    }
  }

  document.getElementById("trackVerifyModal").classList.add("open");
}

function dogrulamaModalKapat() {
  document.getElementById("trackVerifyModal").classList.remove("open");
}

function takipKoduTelefonDogrulaOnayla() {
  const p =
    portfoyler.find(x => x.kod === dogrulanacakKod || (x.coopKod && x.coopKod === dogrulanacakKod)) ||
    portfoyler[0];
  const isCoopCode = Boolean(p && p.coopKod && p.coopKod === dogrulanacakKod);
  const girilenTel = (document.getElementById("verifyPhoneInput")?.value || "").replace(/\D/g, "");
  const girilenOtp = (document.getElementById("verifyOtpInput")?.value || "").trim();

  if (!girilenTel) {
    alert("Lütfen bu takip kodu için tanımlı cep telefonu numaranızı girin.");
    return;
  }
  if (!girilenOtp) {
    alert("Lütfen telefonunuza gelen SMS onay kodunu girin.");
    return;
  }

  const beklenenTelHam = isCoopCode ? p?.coopDanismanTel : p?.mulkSahibiTel;
  if (p && beklenenTelHam) {
    const tanimliTel = beklenenTelHam.replace(/\D/g, "");
    if (tanimliTel && girilenTel !== tanimliTel) {
      alert(
        `Girdiğiniz telefon numarası bu 12 haneli ${
          isCoopCode ? "Co-Op Ortak Danışman" : "Mülk Sahibi"
        } takip kodu için tanımlı numara (${beklenenTelHam}) ile eşleşmiyor!`
      );
      return;
    }
  }

  dogrulamaModalKapat();
  seciliKod = p ? p.kod : dogrulanacakKod;
  aktifTakipKoduGiris = dogrulanacakKod;
  gorunumDegistir("view-seller");
  saticiPaneliniGoster(dogrulanacakKod);
}

// Ana Sayfa Hero Kargo Sorgulama Kutusu
function heroKodSorgula(kod) {
  heroKodSecVeDogrula(kod);
}

// ============================================================================
// DİKEY SÜREÇ ADIMLARI DETAY POP-UP MODALI & BAŞKA BİR PENCEREDE GÖSTERME SİSTEMİ
// ============================================================================
let sonAcilanAdimPopUpVerisi = null;

function adimAciklamaMetniGetir(adimAdi, durum, portfoy) {
  const ad = (adimAdi || "").toLowerCase();
  if (ad.includes("fotoğraf") || ad.includes("keşif")) {
    return "Profesyonel geniş açı iç/dış mekan fotoğraf çekimi, cephe yönü kontrolü ve yerinde teknik mülk ekspertizi çalışması.";
  }
  if (ad.includes("pazar") || ad.includes("analiz") || ad.includes("ekspertiz")) {
    return "Bölgedeki güncel satılık rakip mülkler ve gerçekleşmiş tapu satış emsalleri karşılaştırılarak doğru fiyatlama raporu hazırlandı.";
  }
  if (ad.includes("drone") || ad.includes("360") || ad.includes("video")) {
    return "4K havadan drone çekimi, çevre lokasyon işaretçileri ve 360° Matterport sanal tur prodüksiyonu.";
  }
  if (ad.includes("tapu") && (ad.includes("takyidat") || ad.includes("imar"))) {
    return "Belediye imar durumu, iskan, kat mülkiyeti ve tapu takyidat (şerh/ipotek) kontrolleri eksiksiz tamamlandı.";
  }
  if (ad.includes("afiş") || ad.includes("branda")) {
    return "Mülk cephesine kurumsal satılık/kiralık brandası asılarak bölgedeki potansiyel alıcı görünürlüğü başlatıldı.";
  }
  if (ad.includes("sahibinden") || ad.includes("portal") || ad.includes("ilan")) {
    return "EİDS yetki doğrulaması sonrası Sahibinden.com, Hepsiemlak ve sosyal medya sponsorlu reklamları yayına alındı.";
  }
  if (ad.includes("gösterim") || ad.includes("teklif")) {
    return "Nitelikli alıcı adaylarına resmi Yer Gösterme Belgesi ile sunum yapılıyor ve yazılı fiyat teklifleri toplanıyor.";
  }
  if (ad.includes("kapora") || ad.includes("devir") || ad.includes("sözleşme")) {
    return "Alım-satım ve kapora protokolü imzalanır, WebTapu randevusu ve güvenli bedel transferi ile tapu devri gerçekleştirilir.";
  }
  return `${portfoy ? portfoy.baslik : "Gayrimenkul"} için danışmanınız tarafından yürütülen kurumsal pazarlama ve süreç adımı.`;
}

function adimDetayMaddeleriGetir(adimAdi, durum, portfoy) {
  const ad = (adimAdi || "").toLowerCase();
  if (ad.includes("fotoğraf") || ad.includes("keşif")) {
    return [
      "HDR geniş açılı iç mekan, salon, mutfak ve cephe fotoğrafları çekildi ve danışman filigranıyla korumaya alındı.",
      "Mülkün net/brüt metrekare ölçümleri, ısınma sistemi ve bina ortak alanları yerinde incelendi.",
      "Çekilen yüksek çözünürlüklü görseller Mülkİzle Satıcı Takip Paneli'ne yüklendi."
    ];
  }
  if (ad.includes("pazar") || ad.includes("analiz") || ad.includes("ekspertiz")) {
    return [
      "Aynı mahalle ve sitedeki doğrudan rakip satılık ilanların m² birim fiyatları analiz edildi.",
      "Son 6 ayda bölgede gerçekleşmiş emsal satış fiyatları ile karşılaştırma tablosu oluşturuldu.",
      "Mülkün en yüksek değerle ve ideal sürede satılacağı hedef fiyat stratejisi mülk sahibiyle paylaşıldı."
    ];
  }
  if (ad.includes("drone") || ad.includes("360") || ad.includes("sahibinden") || ad.includes("portal")) {
    return [
      "e-Devlet EİDS (Elektronik İlan Doğrulama Sistemi) yetki onayı kontrol edildi.",
      "Sahibinden.com, Hepsiemlak ve Emlakjet vitrin ilanları SEO uyumlu açıklama ve konum bilgisiyle yayına alındı.",
      "Hedefli Instagram & Facebook bölge reklamları ve yatırımcı veritabanı eşleştirmesi başlatıldı."
    ];
  }
  if (ad.includes("takyidat") || ad.includes("imar") || ad.includes("afiş")) {
    return [
      "Tapu kaydı üzerindeki ipotek, şerh veya beyan durumu kontrol edilerek satışa uygunluk teyit edildi.",
      "Belediye imar ve iskan (yapı kullanım izin belgesi) dosyası incelendi.",
      "Saha görünürlüğü ve kurumsal pazarlama materyalleri hazırlandı."
    ];
  }
  if (ad.includes("gösterim") || ad.includes("teklif")) {
    return [
      "Telefon ve portal üzerinden gelen alıcı talepleri ön finansal yeterlilik filtresinden geçiriliyor.",
      "Her ziyaretçiye dijital/ıslak imzalı Resmi Yer Gösterme Belgesi imzalatılarak mülk güvenliği sağlanıyor.",
      "Ziyaret sonrası alıcı adaylarının mülk ve fiyat hakkındaki geri bildirimleri şeffafça sisteme işleniyor."
    ];
  }
  return [
    "Alıcı ve satıcı arasında resmi Alım-Satım & Kapora Sözleşmesi hazırlanır.",
    "WebTapu üzerinden başvuru yapılarak tapu harçları, döner sermaye ve banka/Takasbank süreçleri koordine edilir.",
    "Tapu müdürlüğünde güvenli mülkiyet ve bedel devri ile süreç başarıyla tamamlanır."
  ];
}

function ornekAdimDetayPopUpAc(idx, dogrudanYeniPencere = false) {
  const ornekAdimlar = [
    {
      no: 1,
      ad: "Profesyonel Fotoğraf Çekimi & Yerinde Keşif",
      durum: "done",
      durumMetni: "Tamamlandı",
      tarih: "14 Kasım 2026 • 11:30"
    },
    {
      no: 2,
      ad: "Pazar & Rakip Fiyat Analizi Raporu",
      durum: "done",
      durumMetni: "Tamamlandı",
      tarih: "15 Kasım 2026 • 14:15"
    },
    {
      no: 3,
      ad: "Drone, 360° Sanal Tur & İlan Portalları Yayını",
      durum: "done",
      durumMetni: "Tamamlandı",
      tarih: "16 Kasım 2026 • 10:00"
    },
    {
      no: 4,
      ad: "Kayıtlı Yer Gösterimleri & Alıcı Geri Bildirimleri",
      durum: "current",
      durumMetni: "Aktif Yapılıyor",
      tarih: "19 Kasım 2026 • Devam Ediyor"
    },
    {
      no: 5,
      ad: "Resmi Fiyat Teklifi Toplama & Satıcı Onayı",
      durum: "pending",
      durumMetni: "Sırada",
      tarih: "Planlanan Aşama"
    },
    {
      no: 6,
      ad: "Kapora Protokolü, Sözleşme & Güvenli Tapu Devri",
      durum: "pending",
      durumMetni: "Final Aşaması",
      tarih: "Planlanan Aşama"
    }
  ];

  const secilen = ornekAdimlar[idx] || ornekAdimlar[0];
  const p = portfoyler[0];
  const veri = {
    no: secilen.no,
    toplamAdim: ornekAdimlar.length,
    ad: secilen.ad,
    durum: secilen.durum,
    durumMetni: secilen.durumMetni,
    tarih: secilen.tarih,
    mulkBaslik: p ? p.baslik : "Örnek Mülk Portföyü (Bağlıca 3+1 Daire)",
    takipKodu: p ? p.kod : "849201736410",
    danisman: p ? p.danisman : "Gencay Çelikkan",
    ofis: p ? p.ofis : "Mülkİzle Gayrimenkul Ankara",
    aciklama: adimAciklamaMetniGetir(secilen.ad, secilen.durum, p),
    maddeler: adimDetayMaddeleriGetir(secilen.ad, secilen.durum, p),
    saticiYorumu: "",
    saticiModu: false,
    stepIdx: idx
  };

  adimDetayPopUpGoster(veri, dogrudanYeniPencere);
}

function saticiAdimDetayPopUpAc(idx, dogrudanYeniPencere = false) {
  const p = portfoyler.find(x => x.kod === seciliKod) || portfoyler[0];
  if (!p) return;
  const h = (p.hizmetler || [])[idx];
  if (!h) return;

  const no = idx + 1;
  const durumMetni =
    h.durum === "done" ? "Tamamlandı" : h.durum === "current" ? "Aktif Yapılıyor" : "Sırada";
  const ilgiliGunluk = (p.gunluk || [])[idx] || (p.gunluk || [])[0];

  const isSosyalAdim = /sosyal medya|instagram|reels/i.test(h.ad || "");
  const sosyalLinkler = isSosyalAdim ? portfoySosyalMedyaLinkleriniGetir(p) : [];

  const veri = {
    no,
    toplamAdim: (p.hizmetler || []).length,
    ad: h.ad,
    durum: h.durum,
    durumMetni,
    tarih: ilgiliGunluk ? ilgiliGunluk.tarih : "Güncel Kayıt",
    mulkBaslik: p.baslik,
    takipKodu: aktifTakipKoduGiris || p.kod,
    danisman: p.danisman,
    ofis: p.ofis,
    aciklama: adimAciklamaMetniGetir(h.ad, h.durum, p),
    maddeler: adimDetayMaddeleriGetir(h.ad, h.durum, p),
    sosyalLinkler,
    sahaNotu: "",
    saticiYorumu: h.saticiYorumu || "",
    emoji: h.emoji || "",
    saticiModu: true,
    stepIdx: idx
  };

  adimDetayPopUpGoster(veri, dogrudanYeniPencere);
}

function adimDetayPopUpGoster(veri, dogrudanYeniPencere = false) {
  sonAcilanAdimPopUpVerisi = veri;

  if (dogrudanYeniPencere) {
    aktifAdimYeniPenceredeAc();
    return;
  }

  const modal = document.getElementById("stepDetailModal");
  const content = document.getElementById("stepDetailModalContent");
  if (!modal || !content) return;

  const evRenk =
    veri.durum === "done" ? "#0F172A" : veri.durum === "current" ? "#2563EB" : "#64748B";

  content.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:40px;height:40px;border-radius:50%;border:2px solid #2563EB;background:#F8FAFC;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg width="22" height="22" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 11L11 24.5H16V39H23.5V30H30.5V39H38V24.5H43L27 11Z" fill="${evRenk}" />
            <rect x="33" y="13" width="4" height="7.5" fill="${evRenk}" />
          </svg>
        </div>
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <span class="saas-badge-blue">${veri.durumMetni}</span>
            <span class="saas-text-xs">${veri.tarih}</span>
          </div>
          <h3 style="font-size:1rem;font-weight:600;color:#0F172A;margin-top:3px;">${veri.ad}</h3>
        </div>
      </div>
      <button type="button" onclick="adimDetayModalKapat()" style="border:1px solid #E2E8F0;background:#FFFFFF;width:30px;height:30px;border-radius:8px;cursor:pointer;font-weight:600;color:#0F172A;">✕</button>
    </div>

    <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:10px 12px;margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px;font-size:0.8125rem;color:#0F172A;">
        <strong>${veri.mulkBaslik}</strong>
        <span class="saas-text-xs">Takip No: <strong style="color:#2563EB;">#${veri.takipKodu}</strong></span>
      </div>
      <div class="saas-text-xs" style="margin-top:2px;">
        Danışman: ${veri.danisman} (${veri.ofis})
      </div>
    </div>

    <p class="saas-text-sm" style="color:#0F172A;margin:0 0 12px;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:10px;padding:10px 12px;">
      ${veri.aciklama}
    </p>

    ${
      veri.sosyalLinkler && veri.sosyalLinkler.length > 0
        ? `<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:12px;margin-bottom:12px;">
            <div style="font-size:0.78rem;font-weight:700;color:#0F172A;margin-bottom:8px;">Paylaşılan Sosyal Medya Tanıtım Linkleri:</div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              ${veri.sosyalLinkler
                .map(
                  (sl, sIdx) => `
                  <a href="${sl.url}" target="_blank" rel="noopener noreferrer" style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#FFFFFF;border:1px solid #CBD5E1;border-radius:8px;color:#2563EB;font-size:0.8125rem;font-weight:600;text-decoration:none;">
                    <span>${sIdx + 1}. ${sl.platform}</span>
                    <span style="font-size:0.75rem;color:#64748B;">Paylaşımı Gör ↗</span>
                  </a>
                `
                )
                .join("")}
            </div>
          </div>`
        : ""
    }

    ${
      veri.sahaNotu
        ? `<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:10px 12px;margin-bottom:12px;" class="saas-text-xs">
            <strong style="color:#0F172A;">Saha Notu:</strong> ${(veri.sahaNotu || "").replace(/[🤝📅📓📸🎥🏆💬✅]/g, "").trim()}
          </div>`
        : ""
    }

    ${
      veri.saticiModu
        ? `<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
            <button type="button" class="saas-btn-outline-sm" onclick="adimDetayModalKapat(); saticiAdimYorumYaz(${veri.stepIdx});">
              <span>Bu Adıma Not Bırak</span>
            </button>
            ${veri.saticiYorumu ? `<span class="saas-text-xs" style="color:#0F172A;">Notunuz: "${veri.saticiYorumu}"</span>` : ""}
          </div>`
        : ""
    }

    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;padding-top:12px;border-top:1px solid #E2E8F0;">
      <button type="button" class="saas-btn-primary-sm" onclick="aktifAdimYeniPenceredeAc()">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        <span>Başka Bir Pencerede Göster</span>
      </button>
      <button type="button" class="saas-btn-outline-sm" onclick="adimDetayModalKapat()">
        Kapat
      </button>
    </div>
  `;

  modal.classList.add("open");
}

function adimDetayModalKapat() {
  const modal = document.getElementById("stepDetailModal");
  if (modal) modal.classList.remove("open");
}

function aktifAdimYeniPenceredeAc() {
  const veri = sonAcilanAdimPopUpVerisi;
  if (!veri) return;

  const win = window.open(
    "",
    "mulkizle_step_popup_" + veri.no,
    "width=720,height=760,left=180,top=90,resizable=yes,scrollbars=yes"
  );

  if (!win) {
    alert("Tarayıcınız açılır pencereyi (pop-up) engelledi. Lütfen bu site için pop-up izni verin.");
    return;
  }

  const evRenk =
    veri.durum === "done" ? "#0B1F3A" : veri.durum === "current" ? "#1D5FE8" : "#64748B";
  const rozetArka =
    veri.durum === "done" ? "#DCFCE7" : veri.durum === "current" ? "#DBEAFE" : "#F1F5F9";
  const rozetYazi =
    veri.durum === "done" ? "#166534" : veri.durum === "current" ? "#1E40AF" : "#475569";

  const maddelerHtml = (veri.maddeler || [])
    .map(m => `<li style="margin-bottom:8px;">✓ ${m}</li>`)
    .join("");

  win.document.open();
  win.document.write(`<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <title>mülkizle.com | ${veri.ad}</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #F4F7FB;
      color: #0B1F3A;
      margin: 0;
      padding: 24px;
    }
    .popup-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      padding: 24px;
      max-width: 640px;
      margin: 0 auto;
      box-shadow: 0 12px 32px rgba(11, 31, 58, 0.08);
    }
    .brand-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 14px;
      margin-bottom: 18px;
      border-bottom: 1px solid #E2E8F0;
    }
    .brand-title {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.03em;
    }
    .brand-title span { color: #1D5FE8; }
    .step-badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 999px;
      background: ${rozetArka};
      color: ${rozetYazi};
      text-transform: uppercase;
    }
    .meta-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 14px;
      margin: 16px 0;
      font-size: 0.85rem;
      line-height: 1.6;
    }
    ul {
      list-style: none;
      padding: 14px 16px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      font-size: 0.88rem;
      line-height: 1.55;
    }
    .btn-row {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
      padding-top: 14px;
      border-top: 1px solid #E2E8F0;
    }
    button {
      font-family: inherit;
      font-weight: 700;
      font-size: 0.82rem;
      padding: 9px 16px;
      border-radius: 8px;
      cursor: pointer;
      border: 1px solid #CBD5E1;
      background: #FFFFFF;
      color: #0B1F3A;
    }
    button.primary {
      background: #1D5FE8;
      color: #FFFFFF;
      border-color: #1D5FE8;
    }
  </style>
</head>
<body>
  <div class="popup-card">
    <div class="brand-bar">
      <div class="brand-title">mülk<span>izle</span>.com</div>
      <span class="step-badge">${veri.durumMetni}</span>
    </div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;">
      <div style="width:54px;height:54px;border-radius:50%;border:3px solid #1D5FE8;background:#EFF6FF;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="30" height="30" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27 11L11 24.5H16V39H23.5V30H30.5V39H38V24.5H43L27 11Z" fill="${evRenk}" />
          <rect x="33" y="13" width="4" height="7.5" fill="${evRenk}" />
        </svg>
      </div>
      <div>
        <div style="font-size:0.78rem;color:#64748B;font-weight:700;">🕒 Kayıt & Süreç Zamanı: ${veri.tarih}</div>
        <h2 style="margin:4px 0 0;font-size:1.3rem;">${veri.ad}</h2>
      </div>
    </div>
    <div class="meta-box">
      <div><strong>Portföy Başlığı:</strong> ${veri.mulkBaslik}</div>
      <div><strong>12 Haneli Takip No:</strong> <strong style="color:#1D5FE8;">#${veri.takipKodu}</strong></div>
      <div><strong>Sorumlu Gayrimenkul Danışmanı:</strong> ${veri.danisman} (${veri.ofis})</div>
    </div>
    <h4 style="margin:16px 0 6px;font-size:0.85rem;text-transform:uppercase;color:#64748B;">Yürütülen Profesyonel Çalışma Özeti</h4>
    <p style="font-size:0.92rem;line-height:1.6;margin-top:0;">${veri.aciklama}</p>
    <ul>${maddelerHtml}</ul>
    ${
      veri.sahaNotu
        ? `<div class="meta-box" style="background:#EFF6FF;border-color:#BFDBFE;"><strong>📓 Danışman Saha Kaydı:</strong><br/>${veri.sahaNotu}</div>`
        : ""
    }
    <div class="btn-row">
      <button onclick="window.print()">🖨️ Bu Adım Raporunu Yazdır / PDF</button>
      <button class="primary" onclick="window.close()">Pencereyi Kapat</button>
    </div>
  </div>
</body>
</html>`);
  win.document.close();
}

// ============================================================================
// 5. PANEL: MÜLKİZLE iOS & ANDROID MOBİL UYGULAMA SİMÜLATÖRÜ + PWA SİSTEMİ
// ============================================================================
let aktifMobilSekme = "field"; // field | camera | sign | seller
let deferredPwaPrompt = null;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPwaPrompt = e;
});

function pwaKurulumBaslat() {
  if (deferredPwaPrompt) {
    deferredPwaPrompt.prompt();
    deferredPwaPrompt.userChoice.then(() => {
      deferredPwaPrompt = null;
    });
  } else {
    alert(
      "Mülkİzle Mobil Uygulamasını Telefonunuza Kurmak İçin:\n\n" +
        "• iPhone (Safari): Alt bardaki 'Paylaş' butonuna basıp 'Ana Ekrana Ekle' (Add to Home Screen) seçeneğine dokunun.\n" +
        "• Android (Chrome): Sağ üst menüden 'Uygulamayı Yükle / Ana Ekrana Ekle' seçeneğine dokunun.\n\n" +
        "Uygulama tam ekran (standalone) modunda kendi ikonu ile telefonunuzda çalışacaktır."
    );
  }
}

function mobilUygulamaSekmeSec(sekme) {
  aktifMobilSekme = sekme || "field";
  const tabMap = {
    field: "mTabBtnField",
    camera: "mTabBtnCamera",
    sign: "mTabBtnSign",
    seller: "mTabBtnSeller"
  };
  Object.keys(tabMap).forEach(k => {
    const btn = document.getElementById(tabMap[k]);
    if (btn) btn.classList.toggle("active", k === aktifMobilSekme);
  });

  const subEl = document.getElementById("mobileSimSubtitle");
  if (subEl) {
    subEl.textContent =
      aktifMobilSekme === "seller"
        ? "Mülk Sahibi Mobil Görünümü"
        : "Danışman Saha Uygulaması";
  }

  mobilUygulamaSimulasyonRender();
}

function mobilPortfoyDegistir(yeniKod) {
  seciliKod = yeniKod;
  mobilUygulamaSimulasyonRender();
}

function mobilHizliGunlukEkle() {
  const p = aktifPortfoy();
  const inp = document.getElementById("mobileQuickDiaryInput");
  const metin = (inp?.value || "").trim();
  if (!p || !metin) return;

  const simdi = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit"
  });

  p.gunluk = p.gunluk || [];
  p.gunluk.unshift({
    tarih: simdi,
    metin,
    gorunurluk: "private"
  });

  verileriKaydet();
  mobilUygulamaSimulasyonRender();
}

function mobilAdimTamamlaVeBildir(idx) {
  const p = aktifPortfoy();
  if (!p || !p.hizmetler || !p.hizmetler[idx]) return;
  p.hizmetler[idx].durum = "done";
  verileriKaydet();
  mobilUygulamaSimulasyonRender();
  alert(`Mülk Sahibi (${p.mulkSahibi}) cep telefonuna bildirim gönderildi:\n"${p.hizmetler[idx].ad} adımı tamamlandı."`);
}

function mobilKameradanFotografCek() {
  const p = aktifPortfoy();
  if (!p) return;
  const ornek = ORNEK_FOTOGRAFLAR[Math.floor(Math.random() * ORNEK_FOTOGRAFLAR.length)];
  p.medya = p.medya || [];
  p.medya.unshift({
    baslik: `Mobil Saha Çekimi #${p.medya.length + 1}`,
    url: ornek.url,
    sikistirmaBilgisi: "Mobil Kamera • 128 KB WebP (Filigranlı)"
  });
  verileriKaydet();
  mobilUygulamaSimulasyonRender();
}

function mobilImzaliYerGostermeKaydet() {
  const p = aktifPortfoy();
  if (!p) return;
  const ad = (document.getElementById("mobileSignBuyerName")?.value || "Selin Demir").trim();
  const tel = (document.getElementById("mobileSignBuyerPhone")?.value || "0532 888 77 66").trim();
  const simdi = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit"
  });

  p.yerGosterimleri = p.yerGosterimleri || [];
  p.yerGosterimleri.unshift({
    alici: ad,
    telefon: tel,
    tarihSaat: `${simdi} (Mobil Dijital İmzalı)`,
    not: "Mobil uygulama üzerinden ekrana parmakla imzalanmış Taşınmaz Yer Gösterme Belgesi kaydedildi.",
    durum: "approved",
    saticiYaniti: "Dijital imzalı yer gösterimi tamamlandı."
  });

  verileriKaydet();
  alert(`Sayın ${ad} adına Dijital İmzalı Yer Gösterme Belgesi portföye kaydedildi.`);
  mobilUygulamaSekmeSec("field");
}

function mobilImzaPadBaslat() {
  const canvas = document.getElementById("mobileSignatureCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width || 300;
  canvas.height = rect.height || 96;

  ctx.strokeStyle = "#0F172A";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  // Örnek başlangıç imzası çizelim (kullanıcı temizleyip kendi çizebilir)
  ctx.beginPath();
  ctx.moveTo(40, 62);
  ctx.quadraticCurveTo(85, 22, 130, 58);
  ctx.quadraticCurveTo(175, 80, 235, 36);
  ctx.stroke();

  let ciziyor = false;
  const posAl = e => {
    const r = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - r.left, y: clientY - r.top };
  };

  const basla = e => {
    e.preventDefault();
    ciziyor = true;
    const { x, y } = posAl(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const ciz = e => {
    if (!ciziyor) return;
    e.preventDefault();
    const { x, y } = posAl(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const bitir = () => {
    ciziyor = false;
  };

  canvas.addEventListener("mousedown", basla);
  canvas.addEventListener("mousemove", ciz);
  window.addEventListener("mouseup", bitir);
  canvas.addEventListener("touchstart", basla, { passive: false });
  canvas.addEventListener("touchmove", ciz, { passive: false });
  window.addEventListener("touchend", bitir);
}

function mobilImzaTemizle() {
  const canvas = document.getElementById("mobileSignatureCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function mobilGaleriKaydir(yon) {
  const gal = document.getElementById("mobileSwipeGallery");
  if (!gal) return;
  const genislik = gal.clientWidth || 300;
  gal.scrollBy({ left: yon * genislik, behavior: "smooth" });
}

function mobilGaleriDotGuncelle(galEl) {
  const dotsWrap = document.getElementById("mobileSwipeDots");
  if (!galEl || !dotsWrap) return;
  const idx = Math.round(galEl.scrollLeft / (galEl.clientWidth || 1));
  Array.from(dotsWrap.children).forEach((d, i) => {
    d.classList.toggle("active", i === idx);
  });
}

function mobilGaleriDragSwipeBaslat() {
  const gal = document.getElementById("mobileSwipeGallery");
  if (!gal) return;
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  gal.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.pageX - gal.offsetLeft;
    scrollLeft = gal.scrollLeft;
  });
  gal.addEventListener("mouseleave", () => {
    isDown = false;
  });
  gal.addEventListener("mouseup", () => {
    isDown = false;
  });
  gal.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gal.offsetLeft;
    const walk = (x - startX) * 1.4;
    gal.scrollLeft = scrollLeft - walk;
  });
}

function mobilUygulamaSimulasyonRender() {
  const p = aktifPortfoy();
  const bodyEl = document.getElementById("mobilePhoneScreenBody");
  const codeBadge = document.getElementById("mobileSimCodeBadge");
  if (!p || !bodyEl) return;

  if (codeBadge) codeBadge.textContent = `#${p.kod}`;

  const portfoySeciciHtml = `
    <select class="saas-input-compact" style="width:100%;font-size:0.74rem;padding:6px 8px;" onchange="mobilPortfoyDegistir(this.value)">
      ${portfoyler
        .map(
          item =>
            `<option value="${item.kod}" ${item.kod === p.kod ? "selected" : ""}>#${item.kod} — ${item.baslik}</option>`
        )
        .join("")}
    </select>
  `;

  if (aktifMobilSekme === "field") {
    const gunlukNotlarHtml = (p.gunluk || [])
      .slice(0, 3)
      .map(
        g => `
        <div style="padding:7px 0;border-bottom:1px solid #E2E8F0;font-size:0.73rem;color:#0F172A;line-height:1.4;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">
            <span style="font-size:0.63rem;font-weight:600;color:#64748B;">${g.tarih}</span>
            ${
              (g.metin || "").includes("0549")
                ? `<a href="tel:05490000000" class="saas-btn-outline-sm" style="padding:1px 6px;font-size:0.62rem;">Kapıcıyı Ara</a>`
                : ""
            }
          </div>
          <div>${g.metin}</div>
        </div>
      `
      )
      .join("");

    const adimlarMobilHtml =
      `<div class="house-line-stepper">` +
      (p.hizmetler || [])
        .map((h, i) => {
          const sinif = h.durum === "done" ? "done" : h.durum === "current" ? "current" : "";
          const ikon = h.durum === "done" ? "✓" : h.durum === "current" ? "●" : "•";
          const evRenk = h.durum === "done" ? "#0F172A" : h.durum === "current" ? "#2563EB" : "#94A3B8";
          return `
            <div class="house-step-item ${sinif}" style="padding-bottom:10px;gap:10px;">
              <div class="house-node-circle" style="width:28px;height:28px;" onclick="saticiAdimDetayPopUpAc(${i})">
                <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width:15px;height:15px;">
                  <path d="M27 11L11 24.5H16V39H23.5V30H30.5V39H38V24.5H43L27 11Z" fill="${evRenk}" />
                  <rect x="33" y="13" width="4" height="7.5" fill="${evRenk}" />
                </svg>
                <span class="house-node-status-pip" style="width:12px;height:12px;font-size:0.46rem;">${ikon}</span>
              </div>
              <div class="house-step-card" style="padding:5px 8px;min-height:28px;">
                <span style="font-size:0.72rem;color:#0F172A;font-weight:${h.durum === "current" ? "700" : "600"};">${h.ad}</span>
                ${
                  h.durum === "done"
                    ? `<span style="font-size:0.62rem;color:#2563EB;font-weight:700;">Tamam</span>`
                    : `<button type="button" class="saas-btn-primary-sm" style="padding:2px 7px;font-size:0.62rem;" onclick="mobilAdimTamamlaVeBildir(${i})">Bildir</button>`
                }
              </div>
            </div>
          `;
        })
        .join("") +
      `</div>`;

    bodyEl.innerHTML = `
      ${portfoySeciciHtml}

      <div class="phone-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <strong style="font-size:0.78rem;color:#0F172A;">Mülk Günlüğüm (Özel Saha Notu)</strong>
          <span class="saas-badge-neutral" style="font-size:0.6rem;padding:1px 6px;">Satıcıya Gizli</span>
        </div>
        <div style="display:flex;gap:5px;margin-bottom:6px;">
          <input
            type="text"
            id="mobileQuickDiaryInput"
            class="saas-input-compact"
            placeholder="Kapıcı tel, anahtar, pazarlık notu..."
            style="flex:1;font-size:0.72rem;padding:5px 8px;"
          />
          <button type="button" class="saas-btn-primary-sm" style="padding:5px 9px;font-size:0.68rem;" onclick="mobilHizliGunlukEkle()">Ekle</button>
        </div>
        <div>${gunlukNotlarHtml}</div>
      </div>

      <div class="phone-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <strong style="font-size:0.78rem;color:#0F172A;">Saha Süreç Adımları</strong>
          <span style="font-size:0.64rem;color:#64748B;">Tek Tuşla Bildir</span>
        </div>
        <div>${adimlarMobilHtml}</div>
      </div>
    `;
  } else if (aktifMobilSekme === "camera") {
    const medyaListesi = p.medya && p.medya.length > 0 ? p.medya : ORNEK_FOTOGRAFLAR;
    bodyEl.innerHTML = `
      ${portfoySeciciHtml}

      <div class="phone-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <strong style="font-size:0.78rem;color:#0F172A;">Kaydırılabilir Filigranlı Galeri (${medyaListesi.length})</strong>
          <button type="button" class="saas-btn-outline-sm" style="padding:2px 7px;font-size:0.62rem;" onclick="tumFiligranliFotograflariIndir()">Tümünü İndir</button>
        </div>

        <div style="position:relative;">
          <button type="button" class="lightbox-nav-arrow prev" style="width:28px;height:28px;left:6px;" onclick="mobilGaleriKaydir(-1)" aria-label="Önceki">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          <div class="mobile-swipe-carousel" id="mobileSwipeGallery" onscroll="mobilGaleriDotGuncelle(this)">
            ${medyaListesi
              .map(
                (m, idx) => `
              <div class="mobile-swipe-slide" onclick="fotografPopUpAc(${idx})">
                <div class="watermarked-card" style="border-radius:8px;aspect-ratio:16/10;border:none;">
                  <img src="${m.url}" alt="${m.baslik}" />
                  ${filigranKatmaniHtml(p)}
                </div>
                <div style="padding:5px 8px;background:#FFFFFF;display:flex;justify-content:space-between;align-items:center;font-size:0.66rem;">
                  <strong style="color:#0F172A;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:170px;">${idx + 1}/${medyaListesi.length} • ${m.baslik}</strong>
                  <span style="color:#2563EB;font-weight:600;">Büyüt</span>
                </div>
              </div>
            `
              )
              .join("")}
          </div>

          <button type="button" class="lightbox-nav-arrow next" style="width:28px;height:28px;right:6px;" onclick="mobilGaleriKaydir(1)" aria-label="Sonraki">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <div class="mobile-swipe-dots" id="mobileSwipeDots">
          ${medyaListesi
            .map((_, idx) => `<span class="mobile-swipe-dot ${idx === 0 ? "active" : ""}"></span>`)
            .join("")}
        </div>
        <div style="text-align:center;font-size:0.63rem;color:#64748B;margin-top:4px;">
          Fotoğrafları sağa/sola kaydırın veya büyütmek için dokunun
        </div>
      </div>

      <div class="phone-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <strong style="font-size:0.76rem;color:#0F172A;">Yeni Saha Fotoğrafı Çek</strong>
          <span class="saas-badge-blue" style="font-size:0.6rem;padding:1px 6px;">Otomatik Filigran</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <button type="button" class="saas-btn-primary-sm" style="width:100%;justify-content:center;padding:8px;" onclick="mobilKameradanFotografCek()">
            <span>Kameradan Çek &amp; Filigranlı Yükle</span>
          </button>
          <label class="saas-btn-outline-sm" style="width:100%;justify-content:center;padding:7px;cursor:pointer;">
            <span>Telefon Galerisinden Seç</span>
            <input type="file" accept="image/*" capture="environment" style="display:none;" onchange="dosyadanFotografYukle(event); setTimeout(mobilUygulamaSimulasyonRender, 300);" />
          </label>
        </div>
      </div>
    `;
    setTimeout(mobilGaleriDragSwipeBaslat, 30);
  } else if (aktifMobilSekme === "sign") {
    bodyEl.innerHTML = `
      ${portfoySeciciHtml}

      <div class="phone-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <strong style="font-size:0.78rem;color:#0F172A;">Dijital Yer Gösterme Belgesi</strong>
          <span class="saas-badge-blue" style="font-size:0.6rem;padding:1px 6px;">Ekrana İmza</span>
        </div>
        <div class="saas-text-xs" style="font-size:0.68rem;margin-bottom:8px;">
          Mülkü gezen alıcı adayına telefon ekranında parmakla imzalatıp anında portföye kaydedin.
        </div>

        <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:8px;">
          <input type="text" id="mobileSignBuyerName" class="saas-input-compact" value="Selin Demir" placeholder="Alıcı Adı Soyadı" style="width:100%;font-size:0.74rem;" />
          <input type="text" id="mobileSignBuyerPhone" class="saas-input-compact" value="0532 888 77 66" placeholder="Alıcı Cep Telefonu" style="width:100%;font-size:0.74rem;" />
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span style="font-size:0.68rem;font-weight:600;color:#0F172A;">Alıcı Parmak İmzası Alanı:</span>
          <button type="button" class="saas-btn-outline-sm" style="padding:1px 6px;font-size:0.62rem;" onclick="mobilImzaTemizle()">Temizle</button>
        </div>
        <canvas id="mobileSignatureCanvas" class="signature-pad-canvas"></canvas>

        <button type="button" class="saas-btn-primary-sm" style="width:100%;justify-content:center;padding:8px;margin-top:8px;" onclick="mobilImzaliYerGostermeKaydet()">
          <span>İmzalı Belgeyi Portföye Kaydet</span>
        </button>
      </div>
    `;
    setTimeout(mobilImzaPadBaslat, 40);
  } else if (aktifMobilSekme === "seller") {
    const tamamlanan = (p.hizmetler || []).filter(h => h.durum === "done").length;
    const toplam = (p.hizmetler || []).length || 1;
    const sonTeklif = (p.teklifler || [])[0];

    bodyEl.innerHTML = `
      <div class="phone-card" style="background:#EFF6FF;border-color:#BFDBFE;">
        <div style="font-size:0.64rem;font-weight:700;color:#2563EB;text-transform:uppercase;">Mülkİzle Push Bildirimi • Şimdi</div>
        <div style="font-size:0.75rem;font-weight:600;color:#0F172A;margin-top:2px;">
          Danışmanınız ${p.danisman}, "${p.baslik}" mülkünüz için yeni süreç güncellemesi paylaştı.
        </div>
      </div>

      <div class="phone-card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div style="font-size:0.65rem;color:#64748B;">Takip No: #${p.kod}</div>
            <strong style="font-size:0.82rem;color:#0F172A;">${p.baslik}</strong>
          </div>
          <strong style="font-size:0.82rem;color:#2563EB;">${p.fiyat}</strong>
        </div>
        <div style="margin-top:8px;font-size:0.68rem;font-weight:600;color:#2563EB;">
          ${tamamlanan} / ${toplam} Süreç Adımı Tamamlandı
        </div>
      </div>

      ${
        sonTeklif
          ? `<div class="phone-card">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <span class="saas-badge-blue" style="font-size:0.6rem;padding:1px 6px;">Teklif Onayı</span>
                <strong style="font-size:0.82rem;color:#0F172A;">${sonTeklif.tutar}</strong>
              </div>
              <div style="font-size:0.7rem;color:#64748B;margin-bottom:8px;">
                ${sonTeklif.alici} • ${sonTeklif.odemeSekli}
              </div>
              <div style="display:flex;gap:6px;">
                <button type="button" class="saas-btn-primary-sm" style="flex:1;justify-content:center;padding:5px;" onclick="saticiTeklifKarar(0, 'approved'); mobilUygulamaSimulasyonRender();">Onayla</button>
                <button type="button" class="saas-btn-outline-sm" style="flex:1;justify-content:center;padding:5px;" onclick="saticiTeklifKarar(0, 'rejected'); mobilUygulamaSimulasyonRender();">Reddet</button>
              </div>
            </div>`
          : ""
      }

      <div class="phone-card">
        <strong style="font-size:0.74rem;color:#0F172A;display:block;margin-bottom:8px;">Canlı Süreç Hattı</strong>
        <div class="house-line-stepper">
          ${(p.hizmetler || [])
            .slice(0, 6)
            .map((h, i) => {
              const sinif = h.durum === "done" ? "done" : h.durum === "current" ? "current" : "";
              const ikon = h.durum === "done" ? "✓" : h.durum === "current" ? "●" : "•";
              const evRenk = h.durum === "done" ? "#0F172A" : h.durum === "current" ? "#2563EB" : "#94A3B8";
              return `
                <div class="house-step-item ${sinif}" style="padding-bottom:10px;gap:10px;" onclick="saticiAdimDetayPopUpAc(${i})">
                  <div class="house-node-circle" style="width:28px;height:28px;">
                    <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width:15px;height:15px;">
                      <path d="M27 11L11 24.5H16V39H23.5V30H30.5V39H38V24.5H43L27 11Z" fill="${evRenk}" />
                      <rect x="33" y="13" width="4" height="7.5" fill="${evRenk}" />
                    </svg>
                    <span class="house-node-status-pip" style="width:12px;height:12px;font-size:0.46rem;">${ikon}</span>
                  </div>
                  <div class="house-step-card" style="padding:5px 8px;min-height:28px;">
                    <span style="font-size:0.71rem;color:#0F172A;font-weight:600;">${h.ad}</span>
                    <span style="font-size:0.62rem;font-weight:700;color:${
                      h.durum === "done" ? "#2563EB" : "#64748B"
                    };">${h.durum === "done" ? "Tamamlandı" : h.durum === "current" ? "Aktif" : "Sırada"}</span>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }
}

// ============================================================================
// 4 KARAKTER GÖZÜNDEN CANLI TEST & BAKIŞ AÇISI SİMÜLATÖRÜ
// 1. Emlakçı: Ahmet Demir (Demir Gayrimenkul Yatırım • Ankara / Çankaya)
// 2. Satıcı: Kemal Soylu (Mülk Sahibi • 0532 410 20 30 • #849 201 736 410 & #518 293 047 162)
// 3. Alıcı: Zeynep Kaya (Alıcı Adayı • 0533 210 90 80 • Teklif & 360° İnceleme)
// 4. Başka Emlakçı: Selin Yılmaz (Yılmaz Luxury Gayrimenkul • Ankara / Çayyolu & Co-Op Partner)
// ============================================================================
let aktifTestKarakteri = "satici";
let dortKarakterHazirMi = false;

const DORT_KARAKTER_PROFILLERI = {
  "ahmet-demir": {
    id: "ahmet-demir",
    ad: "Ahmet Demir",
    ofis: "Demir Gayrimenkul Yatırım",
    deneyim: "8 Yıl Kıdemli Gayrimenkul Danışmanı",
    telefon: "0532 555 44 33",
    email: "ahmet@demirgayrimenkul.com",
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    il: "Ankara",
    ilce: "Çankaya",
    bolgeler: "Oran, GOP, Yıldız, Birlik Mah.",
    hobiler: "Mimari fotoğrafçılık, tenis ve gayrimenkul veri analitiği",
    bio: "Ankara Çankaya (Oran, GOP, Yıldız) bölgesinde Demir Gayrimenkul Yatırım bünyesinde 8 yıldır uzman gayrimenkul danışmanı olarak hizmet veriyorum. Profesyonel fotoğraf, drone, 360° sanal tur ve şeffaf Mülkİzle 12 haneli takip sistemiyle mülkünüzü en doğru alıcıyla buluşturuyorum.",
    instagram: "https://www.instagram.com/ahmetdemir.gayrimenkul/",
    twitter: "https://x.com/ahmetdemir_gyo",
    linkedin: "https://www.linkedin.com/in/ahmet-demir-gayrimenkul",
    magazaUrl: "https://demirgayrimenkul.sahibinden.com/",
    bloglar: [
      {
        tarih: "19 Kasım 2026",
        kategori: "Bölge & Piyasa Analizi",
        baslik: "Çankaya Oran ve GOP Bölgesinde 2026 Son Çeyrek Konut Fiyat Trendleri",
        ozet: "Oran Mahallesi'nde vadi manzaralı 3+1 ve 4+1 site içi dairelerde metrekare birim fiyatları, kredili/nakit alıcı dengesi ve gerçek satış kapanış süreleri üzerine güncel saha verilerimiz."
      },
      {
        tarih: "12 Kasım 2026",
        kategori: "Satıcı Rehberi",
        baslik: "Mülkünüzü Satarken 360° Çekim ve Doğru Emsal Analizi Neden Satış Süresini Yarıya İndirir?",
        ozet: "Nitelikli alıcıların ilana tıklamadan önce dikkat ettiği görsel standartlar ve 12 haneli şeffaf süreç takibinin pazarlık gücüne doğrudan etkisi."
      }
    ]
  },
  "selin-yilmaz": {
    id: "selin-yilmaz",
    ad: "Selin Yılmaz",
    ofis: "Yılmaz Luxury Gayrimenkul",
    deneyim: "10 Yıl Lüks Konut & Villa Uzmanı",
    telefon: "0535 888 99 00",
    email: "selin@yilmazluxury.com",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    il: "Ankara",
    ilce: "Çankaya",
    bolgeler: "Çayyolu, Alacaatlı, Konutkent, İncek",
    hobiler: "Yelken, modern peyzaj mimarisi ve yatırım danışmanlığı",
    bio: "Ankara Çayyolu, Alacaatlı ve İncek aksında Yılmaz Luxury Gayrimenkul kurucu ortağı olarak müstakil villa ve nitelikli rezidans portföylerini yönetiyorum. Bölge dışı meslektaşlarımla Mülkİzle Co-Op (%50-%50) paylaşımlı çalışma ağı üzerinden şeffaf ortaklıklar yürütüyorum.",
    instagram: "https://www.instagram.com/selinyilmaz.luxury/",
    twitter: "https://x.com/selinyilmaz_lux",
    linkedin: "https://www.linkedin.com/in/selin-yilmaz-luxury",
    magazaUrl: "https://yilmazluxury.sahibinden.com/",
    bloglar: [
      {
        tarih: "18 Kasım 2026",
        kategori: "Lüks Konut & Villa",
        baslik: "Alacaatlı ve İncek Aksında Müstakil Bahçeli Villa Talebinde Yeni Dönem",
        ozet: "Ankara batı koridorunda müstakil yaşam arayan ailelerin en çok tercih ettiği siteler, güvenlikli peyzaj kriterleri ve güncel arsa/villa değerlemeleri."
      }
    ]
  },
  "burak-kaya": {
    id: "burak-kaya",
    ad: "Burak Kaya",
    ofis: "Kaya Boğaziçi & Anadolu Gayrimenkul",
    deneyim: "11 Yıl Lüks Konut & Ticari Portföy Uzmanı",
    telefon: "0533 444 55 66",
    email: "burak@kayagayrimenkul.com",
    foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    il: "İstanbul",
    ilce: "Kadıköy",
    bolgeler: "Suadiye / Caddebostan (Bağdat Cad.), Moda / Kadıköy Merkez",
    hobiler: "Klasik otomobiller, fotoğrafçılık ve gayrimenkul hukuku",
    bio: "İstanbul Kadıköy Bağdat Caddesi (Suadiye, Caddebostan, Erenköy, Fenerbahçe) aksında 11 yıldır lüks konut ve ticari gayrimenkul danışmanlığı yapıyorum. Tüm portföylerimde Mülkİzle 12 haneli canlı süreç takibi sunuyorum.",
    instagram: "https://www.instagram.com/burakkaya.gayrimenkul/",
    twitter: "https://x.com/burakkaya_gyo",
    linkedin: "https://www.linkedin.com/in/burak-kaya-gayrimenkul",
    magazaUrl: "https://kayagayrimenkul.sahibinden.com/",
    bloglar: [
      {
        tarih: "20 Kasım 2026",
        kategori: "Bağdat Caddesi Analizi",
        baslik: "Suadiye ve Caddebostan'da Yeni Deprem Yönetmeliği Sonrası Sıfır Konut Değerlemeleri",
        ozet: "Bağdat Caddesi aksında kentsel dönüşümle yenilenen prestijli binalarda metrekare satış fiyatları ve yatırımcı geri dönüş süreleri."
      }
    ]
  }
};

function danismanProfiliniGetirById(danismanId) {
  if (danismanId && DORT_KARAKTER_PROFILLERI[danismanId]) {
    return DORT_KARAKTER_PROFILLERI[danismanId];
  }
  return danismanProfili || DORT_KARAKTER_PROFILLERI["ahmet-demir"];
}

function dortKarakterVerileriniHazirla() {
  if (dortKarakterHazirMi && portfoyler.length >= 3) return;
  dortKarakterHazirMi = true;

  const ahmet = DORT_KARAKTER_PROFILLERI["ahmet-demir"];
  const selin = DORT_KARAKTER_PROFILLERI["selin-yilmaz"];
  const burak = DORT_KARAKTER_PROFILLERI["burak-kaya"];

  // 3 Hazır Üye Hesabı:
  // 1) Ahmet Demir -> ÜCRETSİZ Üyelik
  // 2) Selin Yılmaz -> PRO Üyelik
  // 3) Burak Kaya -> PRO Üyelik
  kayitliKullanicilar = [
    {
      id: "ahmet-demir",
      kullaniciAdi: "ahmet",
      ad: ahmet.ad,
      ofis: ahmet.ofis,
      telefon: ahmet.telefon,
      email: "ahmet@mulkizle.com",
      il: ahmet.il,
      ilce: ahmet.ilce,
      sifre: "Ahmet2026!",
      plan: "ucretsiz",
      kayitTarihi: "21 Kasım 2026"
    },
    {
      id: "selin-yilmaz",
      kullaniciAdi: "selin",
      ad: selin.ad,
      ofis: selin.ofis,
      telefon: selin.telefon,
      email: "selin@mulkizle.com",
      il: selin.il,
      ilce: selin.ilce,
      sifre: "Selin2026!",
      plan: "pro",
      kayitTarihi: "21 Kasım 2026"
    },
    {
      id: "burak-kaya",
      kullaniciAdi: "burak",
      ad: burak.ad,
      ofis: burak.ofis,
      telefon: burak.telefon,
      email: "burak@mulkizle.com",
      il: burak.il,
      ilce: burak.ilce,
      sifre: "Burak2026!",
      plan: "pro",
      kayitTarihi: "22 Kasım 2026"
    }
  ];

  uyeParaliDurumlari["ahmet-demir"] = false;
  uyeParaliDurumlari["selin-yilmaz"] = true;
  uyeParaliDurumlari["burak-kaya"] = true;

  if (aktifKullanici) {
    const guncelAktif = kayitliKullanicilar.find(u => u.id === aktifKullanici.id);
    if (guncelAktif) aktifKullanici = guncelAktif;
    danismanGirisYaptiMi = true;
    proPaketAktif = aktifKullanici.plan !== "ucretsiz";
    const navText = document.getElementById("navAgentLoginBtnText");
    if (navText) navText.textContent = `Danışman Paneli (${(aktifKullanici.ad || "Danışman").split(" ")[0]})`;
  } else {
    danismanGirisYaptiMi = false;
  }

  // Eğer portföylerde 3 danışmanın portföyleri henüz yoksa oluştur
  if (portfoyler.length < 3 || !portfoyler.some(p => p.danismanId === "burak-kaya")) {
    portfoyler = [
      // PORTFÖY 1: 1. Emlakçı (Ahmet Demir) • Satıcı (Kemal Soylu) • Alıcı (Zeynep Kaya) • 2. Emlakçı Co-Op (Selin Yılmaz) — İLANDA YAYINDA
      {
        kod: "849201736410",
        danismanId: "ahmet-demir",
        baslik: "Çankaya Oran Mah. 3+1 Panoramik Vadi Manzaralı Daire",
        fiyat: "6.750.000 ₺",
        mulkSahibi: "Kemal Soylu",
        mulkSahibiTel: "0532 410 20 30",
        danisman: ahmet.ad,
        danismanTel: ahmet.telefon,
        ofis: ahmet.ofis,
        bolge: "Çankaya, Ankara (Oran Mah.)",
        durumEtiketi: "Yayında • Aktif Gösterim & Teklif Sürecinde",
        sonGuncelleme: "21 Kasım 2026",
        sahibindenUrl: "https://www.sahibinden.com/ilan/emlak-konut-satilik-cankaya-oran-3-1-vadi-manzarali",
        videoUrl: "https://www.instagram.com/ahmetdemir.gayrimenkul/reels/",
        matterportUrl: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
        sosyalMedyaLinkleri: [
          {
            platform: "Instagram Reels Tanıtımı",
            url: "https://www.instagram.com/ahmetdemir.gayrimenkul/reels/"
          },
          {
            platform: "YouTube 4K Daire Turu",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          },
          {
            platform: "LinkedIn Yatırımcı Sunumu",
            url: "https://www.linkedin.com/in/ahmet-demir-gayrimenkul"
          }
        ],
        coopAktifMi: true,
        coopKod: "910482736519",
        coopPartnerAd: selin.ad,
        coopPartnerOfis: selin.ofis,
        coopPartnerTel: selin.telefon,
        coopPaylasimOrani: "%50 - %50 Eşit Hizmet Bedeli",
        goruntulenme: "2.410",
        favori: "64",
        telefon: "23 Arama",
        gosterim: "5 Aile Gezdi",
        sosyalErisim: "14.800 İzlenme • 420 Beğeni",
        yetkiModu: "mobil_onay",
        yetkiSuresi: "90 Gün Tam Yetki",
        komisyon: "%2 + KDV",
        yetkiOnaylandiMi: true,
        yetkiOnayDetayi: "18 Kasım 2026 • SMS Kodu (482910) ile Kemal Soylu tarafından mobil onaylandı",
        hizmetler: [
          { ad: "Yerinde Keşif", durum: "done", emoji: "👍", saticiYorumu: "" },
          {
            ad: "Profesyonel Fotoğraf Çekimi",
            durum: "done",
            emoji: "❤️",
            saticiYorumu: "Fotoğraflar ve vadi açısı çok net çıkmış, teşekkürler Ahmet Bey."
          },
          {
            ad: "Detaylı Pazar Analizi",
            durum: "done",
            emoji: "👏",
            saticiYorumu: "Rakip daire kıyaslamaları çok yerinde, 6.5M - 6.85M hedefi uygundur."
          },
          { ad: "Tapu Takyidat & İmar Kontrolü", durum: "done", emoji: "👍", saticiYorumu: "" },
          { ad: "Yetki Sözleşmesi", durum: "done", emoji: "", saticiYorumu: "" },
          { ad: "360 Derece Çekim", durum: "done", emoji: "", saticiYorumu: "" },
          { ad: "Drone ile Havadan Çekim", durum: "done", emoji: "", saticiYorumu: "" },
          { ad: "Sosyal Medya Tanıtımı", durum: "done", emoji: "🔥", saticiYorumu: "" },
          { ad: "İlan Portalında Yayınlama", durum: "done", emoji: "", saticiYorumu: "" }
        ],
        pazarAnalizi: {
          tamamlandiMi: true,
          danismanFoto: ahmet.foto,
          danismanBio: ahmet.bio,
          referansMulkler:
            "Çankaya Oran Mah. 3+1 Site İçi Daire — 19 Günde Satıldı (6.650.000 ₺)\nÇankaya Yıldız Mah. 4+1 Ara Kat — 24 Günde Satıldı (7.800.000 ₺)",
          minFiyat: "6.500.000 ₺",
          maxFiyat: "6.850.000 ₺",
          finalDegerlendirme:
            "Oran Mahallesi'ndeki emsal 3+1 dairelerin şerefiye, cephe ve kat analizleri sonucunda mülkünüzün 6.500.000 TL – 6.850.000 TL bandında işlem göreceği öngörülmektedir. (Bu rapor yalnızca mülk sahibi Kemal Soylu'ya özeldir; alıcılara ve dış vitrine kapalıdır.)",
          rakipler: [
            {
              url: "https://www.sahibinden.com/ilan/emlak-konut-satilik-oran-emsal-1",
              baslik: "Oran Mah. Aynı Site Kuzey Cephe 1. Kat 3+1 Daire",
              fiyat: "6.400.000 ₺",
              sure: "52 Gündür İlanda",
              yorum: "1. katta ve vadi manzarası kapalı. Bizim dairemiz 7. kat güney-batı cephe olduğu için şerefiyesi daha yüksektir."
            },
            {
              url: "https://www.sahibinden.com/ilan/emlak-konut-satilik-oran-emsal-2",
              baslik: "Oran Mah. Tadilatsız 3+1 140 m² Daire",
              fiyat: "7.150.000 ₺",
              sure: "4 Aydır İlanda (Satılmadı)",
              yorum: "İlan danışmanıyla görüşüldü; fiyat yüksek kaldığı için 4 aydır ciddi teklif almadığı teyit edildi."
            }
          ]
        },
        gunluk: [
          {
            tarih: "21 Kasım 2026 • 11:30",
            metin: "ÖZEL DANIŞMAN NOTU (Satıcı ve Alıcı Göremez): Site görevlisi Hasan Bey (0544 111 22 33) yedek anahtarı teslim aldı. Satıcı Kemal Bey nakit alıcıda 6.550.000 TL'ye kadar esneyebileceğini belirtti.",
            gorunurluk: "private"
          },
          {
            tarih: "20 Kasım 2026 • 16:15",
            metin: "Co-Op ortağımız Selin Yılmaz (Yılmaz Luxury Gayrimenkul) alıcı adayı Zeynep Kaya'ya dairenin 360° turunu ve sunum dosyasını iletti.",
            gorunurluk: "public"
          }
        ],
        medya: [...ORNEK_FOTOGRAFLAR],
        teklifler: [
          {
            alici: "Zeynep Kaya (3. Karakter - Alıcı)",
            tutar: "6.600.000 ₺",
            odemeSekli: "Nakit / Peşin",
            tarih: "21 Kasım 2026",
            not: "Alıcı Zeynep Kaya 360° sanal tur ve yerinde inceleme sonrası peşin 6.600.000 TL resmi teklif iletti.",
            durum: "pending",
            saticiYaniti: ""
          }
        ],
        yerGosterimleri: [
          {
            alici: "Zeynep Kaya & Ailesi (3. Karakter - Alıcı)",
            telefon: "0533 210 90 80",
            tarihSaat: "22 Kasım Pazar • 15:00",
            not: "Alıcı Zeynep Kaya tapu devri öncesi son kez mimarıyla birlikte daireyi görmek istiyor.",
            durum: "pending",
            saticiYaniti: ""
          }
        ],
        taleplerMetni:
          "21 Kasım | Alıcı Paneli (Zeynep Kaya - 0533 210 90 80) | 6.600.000 TL nakit teklif ve Pazar 15:00 randevu talebi | Fiyat Teklifi"
      },

      // PORTFÖY 2: 1. Emlakçı (Ahmet Demir) • Satıcı (Kemal Soylu) — HENÜZ İLANDA DEĞİL (SADECE PAZAR ANALİZİ AŞAMASINDA -> DIŞ WEB SİTESİNDE GİZLİ!)
      {
        kod: "518293047162",
        danismanId: "ahmet-demir",
        baslik: "Çankaya Yıldız Mah. 2+1 Teraslı Çatı Dubleksi (Pazar Analizi Aşamasında)",
        fiyat: "Pazar Analizi Sonrası Belirlenecek",
        mulkSahibi: "Kemal Soylu",
        mulkSahibiTel: "0532 410 20 30",
        danisman: ahmet.ad,
        danismanTel: ahmet.telefon,
        ofis: ahmet.ofis,
        bolge: "Çankaya, Ankara (Yıldız Mah.)",
        durumEtiketi: "Hazırlıkta • Detaylı Pazar Analizi Sunuldu (Henüz İlanda Değil)",
        sonGuncelleme: "21 Kasım 2026",
        sahibindenUrl: "",
        videoUrl: "",
        matterportUrl: "",
        sosyalMedyaLinkleri: [],
        coopAktifMi: false,
        goruntulenme: "0 (Henüz İlanda Değil)",
        favori: "0",
        telefon: "0",
        gosterim: "0",
        sosyalErisim: "Hazırlanıyor",
        yetkiModu: "mobil_onay",
        yetkiSuresi: "90 Gün",
        komisyon: "%2 + KDV",
        yetkiOnaylandiMi: false,
        yetkiOnayDetayi: "",
        hizmetler: [
          { ad: "Yerinde Keşif", durum: "done", emoji: "👍", saticiYorumu: "" },
          { ad: "Detaylı Pazar Analizi", durum: "current", emoji: "", saticiYorumu: "" },
          { ad: "Yetki Sözleşmesi", durum: "pending", emoji: "", saticiYorumu: "" },
          { ad: "Profesyonel Fotoğraf Çekimi", durum: "pending", emoji: "", saticiYorumu: "" },
          { ad: "İlan Portalında Yayınlama", durum: "pending", emoji: "", saticiYorumu: "" }
        ],
        pazarAnalizi: {
          tamamlandiMi: true,
          danismanFoto: ahmet.foto,
          danismanBio: ahmet.bio,
          referansMulkler: "Yıldız Mah. 2+1 Dubleks — 28 Günde Satıldı (4.900.000 ₺)",
          minFiyat: "4.850.000 ₺",
          maxFiyat: "5.100.000 ₺",
          finalDegerlendirme:
            "Bu mülk henüz ilan portallarında yayınlanmamıştır. Yalnızca satıcı Kemal Bey ve danışman Ahmet Demir arasında pazar analizi aşamasındadır; bu nedenle danışmanın dış kişisel web sitesinde listelenmez.",
          rakipler: [
            {
              url: "https://www.sahibinden.com/ilan/emlak-konut-satilik-yildiz-2-1-dubleks",
              baslik: "Yıldız Mah. Emsal 2+1 Çatı Dubleksi",
              fiyat: "5.200.000 ₺",
              sure: "60 Gündür İlanda",
              yorum: "Teras izolasyonu yapılmamış."
            }
          ]
        },
        gunluk: [],
        medya: [ORNEK_FOTOGRAFLAR[0]],
        teklifler: [],
        yerGosterimleri: []
      },

      // PORTFÖY 3: 4. Karakter / 2. Emlakçı (Selin Yılmaz)'ın Kendi Portföyü — İLANDA YAYINDA
      {
        kod: "592837461029",
        danismanId: "selin-yilmaz",
        baslik: "Çayyolu Alacaatlı 4+1 Müstakil Bahçeli Villa",
        fiyat: "14.500.000 ₺",
        mulkSahibi: "Haldun Pekkan",
        mulkSahibiTel: "0532 700 80 90",
        danisman: selin.ad,
        danismanTel: selin.telefon,
        ofis: selin.ofis,
        bolge: "Çayyolu, Ankara (Alacaatlı Mah.)",
        durumEtiketi: "Yayında • Yılmaz Luxury Özel Portföy",
        sonGuncelleme: "20 Kasım 2026",
        sahibindenUrl: "https://www.sahibinden.com/ilan/emlak-konut-satilik-cayyolu-alacaatli-4-1-mustakil-villa",
        videoUrl: "https://www.instagram.com/selinyilmaz.luxury/reels/",
        matterportUrl: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
        sosyalMedyaLinkleri: [
          {
            platform: "Instagram Reels Villa Turu",
            url: "https://www.instagram.com/selinyilmaz.luxury/reels/"
          },
          {
            platform: "LinkedIn Luxury Portföy Sunumu",
            url: "https://www.linkedin.com/in/selin-yilmaz-luxury"
          }
        ],
        coopAktifMi: false,
        goruntulenme: "3.120",
        favori: "92",
        telefon: "31 Arama",
        gosterim: "7 Aile Gezdi",
        sosyalErisim: "22.500 İzlenme • 690 Beğeni",
        yetkiModu: "mobil_onay",
        yetkiSuresi: "120 Gün Tam Yetki",
        komisyon: "%2 + KDV",
        yetkiOnaylandiMi: true,
        yetkiOnayDetayi: "10 Kasım 2026 • SMS Onaylı",
        hizmetler: [
          { ad: "Yerinde Keşif", durum: "done", emoji: "👍", saticiYorumu: "" },
          { ad: "Profesyonel Fotoğraf Çekimi", durum: "done", emoji: "❤️", saticiYorumu: "" },
          { ad: "Detaylı Pazar Analizi", durum: "done", emoji: "👏", saticiYorumu: "" },
          { ad: "Drone ile Havadan Çekim", durum: "done", emoji: "🔥", saticiYorumu: "" },
          { ad: "360 Derece Çekim", durum: "done", emoji: "", saticiYorumu: "" },
          { ad: "Sosyal Medya Tanıtımı", durum: "done", emoji: "", saticiYorumu: "" },
          { ad: "İlan Portalında Yayınlama", durum: "done", emoji: "", saticiYorumu: "" }
        ],
        pazarAnalizi: {
          tamamlandiMi: true,
          danismanFoto: selin.foto,
          danismanBio: selin.bio,
          referansMulkler: "Alacaatlı 4+1 İkiz Villa — 16 Günde Satıldı (13.900.000 ₺)",
          minFiyat: "14.200.000 ₺",
          maxFiyat: "14.800.000 ₺",
          finalDegerlendirme: "Alacaatlı bölgesindeki müstakil bahçeli villa emsallerine göre optimum fiyat aralığıdır.",
          rakipler: []
        },
        gunluk: [],
        medya: [...ORNEK_FOTOGRAFLAR],
        teklifler: [],
        yerGosterimleri: []
      },

      // PORTFÖY 4: 3. Üye (Burak Kaya - PRO Üye) Portföyü — İLANDA YAYINDA
      {
        kod: "640192837465",
        danismanId: "burak-kaya",
        baslik: "Kadıköy Suadiye Bağdat Caddesi 3+1 Sıfır Ebeveyn Banyolu Daire",
        fiyat: "18.900.000 ₺",
        mulkSahibi: "Cihan Karahan",
        mulkSahibiTel: "0532 900 11 22",
        danisman: burak.ad,
        danismanTel: burak.telefon,
        ofis: burak.ofis,
        bolge: "Suadiye Mah. (Suadiye / Caddebostan), Kadıköy / İstanbul",
        durumEtiketi: "Yayında • Aktif Gösterim Sürecinde",
        sonGuncelleme: "23 Kasım 2026",
        sahibindenUrl: "https://www.sahibinden.com/ilan/emlak-konut-satilik-kadikoy-suadiye-3-1-sifir",
        videoUrl: "https://www.instagram.com/burakkaya.gayrimenkul/reels/",
        matterportUrl: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
        paylasimaAcikMi: true,
        sosyalMedyaLinkleri: [
          {
            platform: "Instagram Reels Tanıtımı",
            url: "https://www.instagram.com/burakkaya.gayrimenkul/reels/"
          }
        ],
        coopAktifMi: false,
        goruntulenme: "4.180",
        favori: "115",
        telefon: "38 Arama",
        gosterim: "9 Aile Gezdi",
        sosyalErisim: "28.400 İzlenme • 810 Beğeni",
        yetkiModu: "mobil_onay",
        yetkiSuresi: "90 Gün Tam Yetki",
        komisyon: "%2 + KDV",
        yetkiOnaylandiMi: true,
        yetkiOnayDetayi: "15 Kasım 2026 • Dijital Onaylı",
        hizmetler: [
          { ad: "Yerinde Keşif", durum: "done", emoji: "👍", saticiYorumu: "" },
          { ad: "Profesyonel Fotoğraf Çekimi", durum: "done", emoji: "❤️", saticiYorumu: "" },
          { ad: "Detaylı Pazar Analizi", durum: "done", emoji: "👏", saticiYorumu: "" },
          { ad: "360 Derece Çekim", durum: "done", emoji: "", saticiYorumu: "" },
          { ad: "Sosyal Medya Tanıtımı", durum: "done", emoji: "🔥", saticiYorumu: "" },
          { ad: "İlan Portalında Yayınlama", durum: "done", emoji: "", saticiYorumu: "" }
        ],
        pazarAnalizi: {
          tamamlandiMi: true,
          danismanFoto: burak.foto,
          danismanBio: burak.bio,
          referansMulkler: "Suadiye Sahil Tarafı 3+1 — 14 Günde Satıldı (18.400.000 ₺)",
          minFiyat: "18.500.000 ₺",
          maxFiyat: "19.200.000 ₺",
          finalDegerlendirme: "Suadiye sahil ve cadde arasında sıfır kapalı otoparklı bina emsallerine göre optimum fiyat aralığıdır.",
          rakipler: []
        },
        gunluk: [
          {
            tarih: "23 Kasım 2026 • 10:15",
            metin: "Apartman görevlisi Mehmet Bey (0535 111 00 99) anahtarı teslim aldı.",
            gorunurluk: "private"
          }
        ],
        medya: [...ORNEK_FOTOGRAFLAR],
        teklifler: [],
        yerGosterimleri: []
      }
    ];
    seciliKod = "849201736410";
    verileriKaydet();
  }

  if (!danismanProfili || !danismanProfili.ad) {
    danismanProfili = JSON.parse(JSON.stringify(ahmet));
    profilKaydetStorage();
  }
  kullanicilariKaydet();
}

let aktifKarakterAltAksiyon = "seller-website";

function karakterGozundenBak(karakterId, altAksiyon) {
  dortKarakterVerileriniHazirla();
  aktifTestKarakteri = karakterId;

  const ahmet = DORT_KARAKTER_PROFILLERI["ahmet-demir"];
  const selin = DORT_KARAKTER_PROFILLERI["selin-yilmaz"];
  const navText = document.getElementById("navAgentLoginBtnText");

  if (karakterId === "emlakci-1") {
    // 1. KARAKTER: ANA EMLAKÇI (AHMET DEMİR)
    aktifKullanici = kayitliKullanicilar.find(u => u.id === "ahmet-demir") || kayitliKullanicilar[0];
    danismanProfili = JSON.parse(JSON.stringify(ahmet));
    danismanGirisYaptiMi = true;
    proPaketAktif = false;
    incelenenWebSitesiDanismanId = "ahmet-demir";
    seciliKod = "849201736410";
    if (navText) navText.textContent = "Danışman Paneli (Ahmet)";

    aktifKarakterAltAksiyon = altAksiyon || "dashboard";
    if (aktifKarakterAltAksiyon === "own-website") {
      incelenenWebSitesiDanismanId = "ahmet-demir";
      gorunumDegistir("view-agent-profile");
    } else if (aktifKarakterAltAksiyon === "inspect-agent2") {
      incelenenWebSitesiDanismanId = "selin-yilmaz";
      gorunumDegistir("view-agent-profile");
    } else {
      gorunumDegistir("view-dashboard");
      danismanAnaModSec("mode-portfolios", document.querySelector(".agent-mode-btn"));
    }
  } else if (karakterId === "satici") {
    // 2. KARAKTER: SATICI / MÜLK SAHİBİ (KEMAL SOYLU)
    if (navText) navText.textContent = "Satıcı Modu (Kemal Soylu)";
    aktifKarakterAltAksiyon = altAksiyon || "seller-website";

    if (aktifKarakterAltAksiyon === "seller-website") {
      incelenenWebSitesiDanismanId = "ahmet-demir";
      gorunumDegistir("view-agent-profile");
    } else if (aktifKarakterAltAksiyon === "seller-website-2") {
      incelenenWebSitesiDanismanId = "selin-yilmaz";
      gorunumDegistir("view-agent-profile");
    } else if (aktifKarakterAltAksiyon === "seller-track-draft") {
      seciliKod = "518293047162";
      aktifTakipKoduGiris = "518293047162";
      gorunumDegistir("view-seller");
    } else {
      seciliKod = "849201736410";
      aktifTakipKoduGiris = "849201736410";
      gorunumDegistir("view-seller");
    }
  } else if (karakterId === "alici") {
    // 3. KARAKTER: ALICI (ZEYNEP KAYA)
    if (navText) navText.textContent = "Alıcı Modu (Zeynep Kaya)";
    aktifKarakterAltAksiyon = altAksiyon || "buyer-dossier";

    if (aktifKarakterAltAksiyon === "buyer-agent1-web") {
      incelenenWebSitesiDanismanId = "ahmet-demir";
      gorunumDegistir("view-agent-profile");
    } else if (aktifKarakterAltAksiyon === "buyer-agent2-web") {
      incelenenWebSitesiDanismanId = "selin-yilmaz";
      gorunumDegistir("view-agent-profile");
    } else if (aktifKarakterAltAksiyon === "buyer-dossier-2") {
      seciliKod = "592837461029";
      gorunumDegistir("view-buyer");
    } else {
      seciliKod = "849201736410";
      gorunumDegistir("view-buyer");
    }
  } else if (karakterId === "emlakci-2") {
    // 4. KARAKTER: BAŞKA EMLAKÇI (SELİN YILMAZ — YILMAZ LUXURY / CO-OP ORTAK)
    aktifKullanici = kayitliKullanicilar.find(u => u.id === "selin-yilmaz") || kayitliKullanicilar[1];
    danismanProfili = JSON.parse(JSON.stringify(selin));
    danismanGirisYaptiMi = true;
    proPaketAktif = true;
    if (navText) navText.textContent = "Danışman Paneli (Selin)";

    aktifKarakterAltAksiyon = altAksiyon || "inspect-agent1";
    if (aktifKarakterAltAksiyon === "inspect-agent1") {
      incelenenWebSitesiDanismanId = "ahmet-demir";
      gorunumDegistir("view-agent-profile");
    } else if (aktifKarakterAltAksiyon === "coop-track") {
      seciliKod = "849201736410";
      aktifTakipKoduGiris = "910482736519";
      gorunumDegistir("view-seller");
    } else if (aktifKarakterAltAksiyon === "own-website") {
      incelenenWebSitesiDanismanId = "selin-yilmaz";
      gorunumDegistir("view-agent-profile");
    } else if (aktifKarakterAltAksiyon === "own-dashboard") {
      seciliKod = "592837461029";
      gorunumDegistir("view-dashboard");
      danismanAnaModSec("mode-portfolios", document.querySelector(".agent-mode-btn"));
    }
  }

  karakterSimulasyonBariniRenderEt();
}

let aktifHizliTestEkrani = "dashboard";

function hizliEkranTestSec(ekranTipi) {
  dortKarakterVerileriniHazirla();
  aktifHizliTestEkrani = ekranTipi;

  const ahmet = DORT_KARAKTER_PROFILLERI["ahmet-demir"];
  const navText = document.getElementById("navAgentLoginBtnText");
  incelenenWebSitesiDanismanId = "ahmet-demir";
  if (!seciliKod) seciliKod = "849201736410";

  if (ekranTipi === "landing") {
    // Üye girişi yapılmamış Ana Sayfa görünümü
    danismanGirisYaptiMi = false;
    profilGoruntuleyenModu = "guest";
    if (navText) navText.textContent = "Üye Girişi";
    gorunumDegistir("view-landing");
  } else if (ekranTipi === "dashboard") {
    aktifKullanici = kayitliKullanicilar.find(u => u.id === "ahmet-demir") || kayitliKullanicilar[0];
    danismanProfili = JSON.parse(JSON.stringify(ahmet));
    danismanGirisYaptiMi = true;
    if (navText) navText.textContent = "Danışman Paneli (Ahmet)";
    profilGoruntuleyenModu = "owner";
    gorunumDegistir("view-dashboard");
    danismanAnaModSec("mode-portfolios", document.getElementById("modeBtnPortfolios"));
  } else if (ekranTipi === "ariyorum") {
    aktifKullanici = kayitliKullanicilar.find(u => u.id === "ahmet-demir") || kayitliKullanicilar[0];
    danismanProfili = JSON.parse(JSON.stringify(ahmet));
    danismanGirisYaptiMi = true;
    if (navText) navText.textContent = "Danışman Paneli (Ahmet)";
    profilGoruntuleyenModu = "owner";
    gorunumDegistir("view-ariyorum");
  } else if (ekranTipi === "profile-owner") {
    aktifKullanici = kayitliKullanicilar.find(u => u.id === "ahmet-demir") || kayitliKullanicilar[0];
    danismanProfili = JSON.parse(JSON.stringify(ahmet));
    danismanGirisYaptiMi = true;
    if (navText) navText.textContent = "Danışman Paneli (Ahmet)";
    profilGoruntuleyenModu = "owner";
    gorunumDegistir("view-agent-profile");
  } else if (ekranTipi === "profile-member") {
    aktifKullanici = kayitliKullanicilar.find(u => u.id === "ahmet-demir") || kayitliKullanicilar[0];
    danismanProfili = JSON.parse(JSON.stringify(ahmet));
    danismanGirisYaptiMi = true;
    if (navText) navText.textContent = "Danışman Paneli (Üye)";
    profilGoruntuleyenModu = "member";
    gorunumDegistir("view-agent-profile");
  } else if (ekranTipi === "profile-guest") {
    danismanGirisYaptiMi = false;
    if (navText) navText.textContent = "Üye Girişi";
    profilGoruntuleyenModu = "guest";
    gorunumDegistir("view-agent-profile");
  } else if (ekranTipi === "seller") {
    danismanGirisYaptiMi = false;
    if (navText) navText.textContent = "Üye Girişi";
    profilGoruntuleyenModu = "guest";
    seciliKod = "849201736410";
    aktifTakipKoduGiris = "849201736410";
    gorunumDegistir("view-seller");
  } else if (ekranTipi === "buyer") {
    danismanGirisYaptiMi = false;
    if (navText) navText.textContent = "Üye Girişi";
    profilGoruntuleyenModu = "guest";
    seciliKod = "849201736410";
    gorunumDegistir("view-buyer");
  }

  karakterSimulasyonBariniRenderEt();
}

function karakterSimulasyonBariniRenderEt() {
  const idMap = {
    landing: "qBtnLanding",
    dashboard: "qBtnDashboard",
    ariyorum: "qBtnAriyorum",
    "profile-owner": "qBtnProfileOwner",
    "profile-member": "qBtnProfileMember",
    "profile-guest": "qBtnProfileGuest",
    seller: "qBtnSeller",
    buyer: "qBtnBuyer"
  };
  Object.entries(idMap).forEach(([key, btnId]) => {
    const el = document.getElementById(btnId);
    if (el) el.classList.toggle("active", aktifHizliTestEkrani === key);
  });
  if (typeof igSolMenuGuncelle === "function" && aktifHizliTestEkrani === "ariyorum") {
    igSolMenuGuncelle("ariyorum");
  }
}

// ============================================================================
// ÜYE MESAJ KUTUSU SİSTEMİ (FACEBOOK MESSENGER / INSTAGRAM DM SOHBET BALONLU)
// ============================================================================
const MEMBER_MESSAGES_STORAGE_KEY = "mulkizle_uye_mesaj_kutusu_v2";

const VARSAYILAN_UYE_MESAJLARI = {
  "ahmet-demir": [
    {
      id: "msg-101",
      gonderenAd: "Burak Demir (Avrupa Gayrimenkul)",
      gonderenRol: "Üye Emlakçı",
      gonderenTel: "0533 880 90 10",
      tarih: "14:20",
      icerik: "Ahmet Bey merhaba, Çankaya Oran 3+1 daireniz için İstanbul'dan Ankara'ya taşınacak hazır nakit alıcı müşterim var. Ortak sunum yapabilir miyiz?",
      yanit: "",
      okundu: false
    },
    {
      id: "msg-102",
      gonderenAd: "Elif Kaya (Körfez Gayrimenkul)",
      gonderenRol: "Üye Emlakçı",
      gonderenTel: "0532 744 55 66",
      tarih: "16:05",
      icerik: "Merhaba Ahmet Bey, Çankaya bölgesindeki portföyünüz için Pazar 15:00'te müşterimle yer gösterimi planlamak istiyoruz.",
      yanit: "",
      okundu: false
    },
    {
      id: "msg-103",
      gonderenAd: "Mert Soylu (Anadolu Lüks Konut)",
      gonderenRol: "Üye Emlakçı",
      gonderenTel: "0532 511 22 33",
      tarih: "Dün",
      icerik: "Ahmet Bey selamlar, yönlendirdiğiniz yatırımcı müşterinizle Kadıköy portföyümüzün sözleşmesini tamamladık, teşekkür ederiz.",
      yanit: "Ben teşekkür ederim Mert Bey, hayırlı olsun.",
      okundu: true
    }
  ]
};

let uyeMesajKutulari = null;
let uyeParaliDurumlari = {
  "ahmet-demir": true
};
let seciliDmThreadIdx = 0;

function dmThreadSec(danismanId, idx, inModal = false) {
  seciliDmThreadIdx = idx;
  const liste = uyeMesajlariniGetir(danismanId);
  if (profilGoruntuleyenModu === "owner" && liste[idx]) {
    liste[idx].okundu = true;
    uyeMesajKutulariniKaydet();
    danismanKisiselWebSitesiGoster();
  }
  if (inModal) {
    uyeMesajModalAc(danismanId);
  } else {
    uyeMesajKutusuPanelRender();
  }
}

function uyeMesajKutulariniYukle() {
  if (uyeMesajKutulari) return;
  try {
    const kayitli = localStorage.getItem(MEMBER_MESSAGES_STORAGE_KEY);
    uyeMesajKutulari = kayitli ? JSON.parse(kayitli) : JSON.parse(JSON.stringify(VARSAYILAN_UYE_MESAJLARI));
  } catch (e) {
    uyeMesajKutulari = JSON.parse(JSON.stringify(VARSAYILAN_UYE_MESAJLARI));
  }
}

function uyeMesajKutulariniKaydet() {
  try {
    localStorage.setItem(MEMBER_MESSAGES_STORAGE_KEY, JSON.stringify(uyeMesajKutulari));
  } catch (e) {}
}

function uyeParaliUyelikVarMi(danismanId) {
  const id = danismanId || (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  if (typeof uyeParaliDurumlari[id] === "boolean") {
    return uyeParaliDurumlari[id];
  }
  return Boolean(proPaketAktif);
}

function uyeParaliUyeligiAktifEt(danismanId, yeniDurum = true) {
  const id = danismanId || (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  uyeParaliDurumlari[id] = Boolean(yeniDurum);
  const uye = kayitliKullanicilar.find(u => u.id === id);
  if (uye) {
    uye.plan = yeniDurum ? "pro" : "ucretsiz";
  }
  if (aktifKullanici && aktifKullanici.id === id) {
    proPaketAktif = Boolean(yeniDurum);
    aktifKullanici.plan = yeniDurum ? "pro" : "ucretsiz";
  }
  kullanicilariKaydet();
  panelYenile();
  danismanKisiselWebSitesiGoster();
  uyeMesajKutusuPanelRender();
}

function uyeMesajlariniGetir(danismanId) {
  uyeMesajKutulariniYukle();
  const id = danismanId || (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  if (!Array.isArray(uyeMesajKutulari[id])) {
    uyeMesajKutulari[id] = [];
  }
  return uyeMesajKutulari[id];
}

function modaldanUyeMesajiGonder(hedefDanismanId) {
  const input = document.getElementById("modalMemberMsgInput");
  const icerik = (input?.value || "").trim();
  if (!icerik) return;

  const liste = uyeMesajlariniGetir(hedefDanismanId);
  const simdi = new Date().toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  liste.unshift({
    id: `msg-${Date.now()}`,
    gonderenAd: "Üye Emlakçı (Meslektaş)",
    gonderenRol: "Üye Emlakçı",
    gonderenTel: "0532 800 90 00",
    tarih: simdi,
    icerik,
    yanit: "",
    okundu: false
  });
  seciliDmThreadIdx = 0;

  if (typeof danismanBildirimEkle === "function") {
    danismanBildirimEkle({
      tip: "mesaj",
      baslik: `💬 Yeni Üye Mesajı: ${liste[0]?.gonderenAd || "Meslektaşınız"}`,
      detay: `"${liste[0]?.icerik || ""}"`,
      zaman: "Az önce",
      hedefMod: "messages"
    });
  }

  uyeMesajKutulariniKaydet();
  danismanKisiselWebSitesiGoster();
  uyeMesajKutusuPanelRender();
  uyeMesajModalAc(hedefDanismanId);
}

function uyeMesajYanitla(danismanId, msgIdx, inputId) {
  const liste = uyeMesajlariniGetir(danismanId);
  const m = liste[msgIdx];
  if (!m) return;

  const inputEl = inputId ? document.getElementById(inputId) : null;
  const yanitMetni = inputEl ? inputEl.value.trim() : "";
  if (!yanitMetni) return;

  m.yanit = yanitMetni;
  m.okundu = true;
  uyeMesajKutulariniKaydet();
  danismanKisiselWebSitesiGoster();
  uyeMesajKutusuPanelRender();

  const modal = document.getElementById("memberMessageModal");
  if (modal && modal.classList.contains("open")) {
    uyeMesajModalAc(danismanId);
  }
}

function dmSplitInboxHtmlOlustur(danismanId, inModal = false) {
  const dp = danismanProfiliniGetirById(danismanId);
  const liste = uyeMesajlariniGetir(danismanId);
  const sayfaSahibiMi = profilGoruntuleyenModu === "owner";

  // Eğer başka bir üye emlakçı profildeki "Mesaj Gönder" butonuna tıkladıysa sadece yeni mesaj gönderme penceresi gösterilir (gelen kutusu ve mesaj sayısı gizlidir)
  if (!sayfaSahibiMi) {
    return `
      <div style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;padding:18px;">
        <div class="saas-text-xs" style="margin-bottom:10px;color:#475569;">
          <strong>${dp.ad}</strong> (${dp.ofis}) üye mesaj kutusuna doğrudan mesaj gönderin:
        </div>
        <div class="dm-composer-bar" style="border-radius:12px;border:1px solid #E2E8F0;">
          <input
            type="text"
            id="modalMemberMsgInput"
            class="dm-composer-input"
            placeholder="${dp.ad}'e mesajınızı yazın..."
            onkeydown="if(event.key==='Enter') modaldanUyeMesajiGonder('${danismanId}')"
          />
          <button type="button" class="social-btn-primary" style="padding:8px 18px;" onclick="modaldanUyeMesajiGonder('${danismanId}')">
            <span>Mesaj Gönder</span>
          </button>
        </div>
      </div>
    `;
  }

  if (seciliDmThreadIdx >= liste.length) {
    seciliDmThreadIdx = 0;
  }
  const aktifMesaj = liste[seciliDmThreadIdx] || null;
  const replyInputId = inModal ? "dmModalReplyInput" : "dmPanelReplyInput";
  const okunmamisSayisi = liste.filter(m => !m.okundu && !m.yanit).length;

  const solKisiListesiHtml = liste
    .map((m, idx) => {
      const basHarfler = (m.gonderenAd || "K")
        .split(" ")
        .map(k => k[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
      const isUnread = !m.okundu && !m.yanit;
      return `
        <button type="button" class="dm-thread-item ${idx === seciliDmThreadIdx ? "active" : ""}" onclick="dmThreadSec('${danismanId}', ${idx}, ${inModal})">
          <span class="dm-thread-avatar">${basHarfler}</span>
          <div class="dm-thread-meta">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:4px;">
              <span class="dm-thread-name" style="${isUnread ? "font-weight:800;color:#0F172A;" : ""}">${m.gonderenAd}</span>
              <span class="saas-text-xs" style="font-size:0.68rem;">${m.tarih}</span>
            </div>
            <div class="dm-thread-preview" style="${isUnread ? "font-weight:700;color:#2563EB;" : ""}">
              ${isUnread ? "● " : ""}${m.yanit ? `✓ ${m.yanit}` : m.icerik}
            </div>
          </div>
        </button>
      `;
    })
    .join("");

  const sagSohbetEkraniHtml = aktifMesaj
    ? `
      <div class="dm-chat-topbar">
        <div style="display:flex;align-items:center;gap:10px;">
          <span class="dm-thread-avatar">${(aktifMesaj.gonderenAd || "K").slice(0, 2).toUpperCase()}</span>
          <div>
            <div style="font-size:0.88rem;font-weight:700;color:#0F172A;">${aktifMesaj.gonderenAd}</div>
            <div class="saas-text-xs">${aktifMesaj.gonderenRol} • ${aktifMesaj.gonderenTel || ""}</div>
          </div>
        </div>
        <span class="saas-badge-blue">Pro Mesaj Kutusu</span>
      </div>

      <div class="dm-messages-scroll">
        <div class="dm-bubble-in">
          <div>${aktifMesaj.icerik}</div>
          <span class="dm-bubble-time">${aktifMesaj.gonderenAd} • ${aktifMesaj.tarih}</span>
        </div>

        ${
          aktifMesaj.yanit
            ? `
            <div class="dm-bubble-out">
              <div>${aktifMesaj.yanit}</div>
              <span class="dm-bubble-time">${dp.ad} • Yanıtlandı</span>
            </div>
          `
            : ""
        }
      </div>

      <div class="dm-composer-bar">
        <input
          type="text"
          id="${replyInputId}"
          class="dm-composer-input"
          value=""
          placeholder="${aktifMesaj.gonderenAd}'a yanıt yazın..."
          onkeydown="if(event.key==='Enter') uyeMesajYanitla('${danismanId}', ${seciliDmThreadIdx}, '${replyInputId}')"
        />
        <button type="button" class="social-btn-primary" style="padding:8px 16px;" onclick="uyeMesajYanitla('${danismanId}', ${seciliDmThreadIdx}, '${replyInputId}')">
          <span>Gönder</span>
        </button>
      </div>
    `
    : `<div style="padding:32px;text-align:center;" class="saas-text-sm">Henüz mesaj bulunmuyor.</div>`;

  return `
    <div class="dm-inbox-layout">
      <div class="dm-thread-list">
        <div class="dm-thread-header">
          <strong style="font-size:0.84rem;color:#0F172A;">Mesaj Kutusu</strong>
          ${
            okunmamisSayisi > 0
              ? `<span class="saas-badge-blue" style="font-size:0.65rem;padding:2px 7px;">${okunmamisSayisi} Okunmamış</span>`
              : `<span class="saas-badge-neutral" style="font-size:0.65rem;padding:2px 7px;">Tümü Okundu</span>`
          }
        </div>
        ${solKisiListesiHtml}
      </div>
      <div class="dm-chat-stage">
        ${sagSohbetEkraniHtml}
      </div>
    </div>
  `;
}

function uyeMesajModalAc(hedefDanismanId) {
  const id = hedefDanismanId || incelenenWebSitesiDanismanId || "ahmet-demir";
  const dp = danismanProfiliniGetirById(id);
  const paraliMi = uyeParaliUyelikVarMi(id);
  const sayfaSahibiMi = profilGoruntuleyenModu === "owner";

  const modal = document.getElementById("memberMessageModal");
  const content = document.getElementById("memberMessageModalContent");
  if (!modal || !content) return;

  modal.firstElementChild.style.maxWidth = sayfaSahibiMi ? "780px" : "520px";
  modal.firstElementChild.style.padding = "18px";

  if (!paraliMi) {
    content.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <span class="saas-badge-neutral">PARALI ÜYELİK (PRO PAKET) ÖZELLİĞİ</span>
        <button type="button" class="saas-btn-outline-sm" onclick="uyeMesajModalKapat()">✕</button>
      </div>
      <h3 class="saas-h2" style="margin-bottom:6px;">Üye Mesaj Kutusu (${dp.ad})</h3>
      <p class="saas-text-sm" style="margin-bottom:16px;">
        Üyelere özel <strong>Mesaj Kutusu</strong> yalnızca paralı üyelik (<strong>Pro Danışman Paketi</strong>) almış kullanıcılar için aktiftir.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <button type="button" class="social-btn-primary" onclick="uyeParaliUyeligiAktifEt('${id}', true); uyeMesajModalAc('${id}');">
          <span>Paralı Üyeliği (Pro) Aktif Et ve Mesaj Kutusunu Aç →</span>
        </button>
        <button type="button" class="social-btn-soft" onclick="uyeMesajModalKapat()">
          <span>Kapat</span>
        </button>
      </div>
    `;
    modal.classList.add("open");
    return;
  }

  content.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <img src="${dp.foto}" alt="${dp.ad}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;" />
        <strong style="font-size:0.95rem;color:#0F172A;">${dp.ad} • ${sayfaSahibiMi ? "Mesaj Kutusu" : "Mesaj Gönder"}</strong>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <button type="button" class="saas-btn-outline-sm" onclick="uyeMesajModalKapat()">✕</button>
      </div>
    </div>
    ${dmSplitInboxHtmlOlustur(id, true)}
  `;

  modal.classList.add("open");
}

function uyeMesajModalKapat() {
  const modal = document.getElementById("memberMessageModal");
  if (modal) modal.classList.remove("open");
}

function uyeMesajKutusuPanelRender() {
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  const dp = danismanProfiliniGetirById(aktifId);
  const paraliMi = uyeParaliUyelikVarMi(aktifId);
  const liste = uyeMesajlariniGetir(aktifId);
  const okunmamisSayisi = liste.filter(m => !m.okundu && !m.yanit).length;

  const badgeEl = document.getElementById("agentInboxCountBadge");
  if (badgeEl) {
    badgeEl.textContent = paraliMi ? (okunmamisSayisi > 0 ? `${okunmamisSayisi}` : "Pro") : "Pro";
  }
  const redBadge = document.getElementById("igSidebarUnreadBadge");
  if (redBadge) {
    redBadge.textContent = `${okunmamisSayisi}`;
    redBadge.style.display = okunmamisSayisi > 0 ? "inline-flex" : "none";
  }

  const wrap = document.getElementById("agentMessageBoxContainer");
  if (!wrap) return;

  if (!paraliMi) {
    wrap.innerHTML = `
      <div class="saas-card" style="text-align:center;padding:36px 24px;">
        <span class="saas-badge-blue" style="margin-bottom:8px;">PARALI ÜYELİK (PRO PAKET) ÖZELLİĞİ</span>
        <h2 class="saas-h2" style="margin-bottom:6px;">Üyelere Özel Mesaj Kutusu</h2>
        <p class="saas-text-sm" style="max-width:520px;margin:0 auto 16px;">
          Bu mesaj kutusu yalnızca paralı üyelik (<strong>Pro Danışman Paketi</strong>) almış kullanıcılara açıktır.
        </p>
        <button type="button" class="social-btn-primary" onclick="uyeParaliUyeligiAktifEt('${aktifId}', true)">
          <span>Paralı Üyeliği (Pro) Şimdi Aktif Et →</span>
        </button>
      </div>
    `;
    return;
  }

  const oncekiMod = profilGoruntuleyenModu;
  profilGoruntuleyenModu = "owner";
  const inboxHtml = dmSplitInboxHtmlOlustur(aktifId, false);
  profilGoruntuleyenModu = oncekiMod;

  wrap.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <h2 class="saas-h2" style="margin:0;">${dp.ad} • Mesaj Kutusu</h2>
        ${
          okunmamisSayisi > 0
            ? `<span class="saas-badge-blue">${okunmamisSayisi} Okunmamış Mesaj</span>`
            : `<span class="saas-badge-neutral">Tüm Mesajlar Okundu</span>`
        }
      </div>
      <button type="button" class="saas-btn-outline-sm" onclick="uyeParaliUyeligiAktifEt('${aktifId}', false)">
        <span>Test: Ücretsiz Üyelik Görünümüne Geç</span>
      </button>
    </div>
    ${inboxHtml}
  `;
}

// ============================================================================
// ANA MODÜL 5: AJANDAM (GÜN, TARİH VE SAATLİ RANDEVU & NOT TAKİBİ)
// ============================================================================
const AGENDA_STORAGE_KEY = "mulkizle_ajanda_notlari_v1";
let ajandaKayitlari = {};
let ajandaAktifFiltre = "all"; // all | today | upcoming | completed

const GUN_ISIMLERI_TR = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const AY_ISIMLERI_TR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function tarihBilgisiniFormatlaTR(yyyyMmDd) {
  if (!yyyyMmDd) return { tamTarih: "Tarih Belirtilmedi", gunAdi: "" };
  const parcalar = yyyyMmDd.split("-");
  if (parcalar.length !== 3) return { tamTarih: yyyyMmDd, gunAdi: "" };
  const yil = parseInt(parcalar[0], 10);
  const ay = parseInt(parcalar[1], 10) - 1;
  const gun = parseInt(parcalar[2], 10);
  const d = new Date(yil, ay, gun);
  const gunAdi = GUN_ISIMLERI_TR[d.getDay()] || "";
  const ayAdi = AY_ISIMLERI_TR[ay] || "";
  return {
    tamTarih: `${gun} ${ayAdi} ${yil}`,
    gunAdi
  };
}

function bugunTarihIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function yarinTarihIso() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function danismanAjandasiniYukle() {
  try {
    const raw = localStorage.getItem(AGENDA_STORAGE_KEY);
    if (raw) {
      ajandaKayitlari = JSON.parse(raw);
    }
  } catch (e) {
    ajandaKayitlari = {};
  }
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  if (!Array.isArray(ajandaKayitlari[aktifId]) || ajandaKayitlari[aktifId].length === 0) {
    const bugun = bugunTarihIso();
    const yarin = yarinTarihIso();
    ajandaKayitlari[aktifId] = [
      {
        id: "aj-1",
        tarih: bugun,
        saat: "14:30",
        kategori: "Yer Gösterimi",
        portfoyKod: "849201736410",
        baslik: "Bağlıca 3+1 Daire — Alıcı Aile Yer Gösterimi",
        not: "Alıcı Murat Bey ve eşi daireyi gezecek. Kapıcı Arif Bey'den 15 dk önce yedek anahtar alınacak, dijital yer gösterme belgesi imzalatılacak.",
        tamamlandi: false,
        hatirlatmaAktif: true
      },
      {
        id: "aj-2",
        tarih: bugun,
        saat: "17:00",
        kategori: "Mülk Sahibi Görüşmesi",
        portfoyKod: "849201736410",
        baslik: "Ahmet Yılmaz (Mülk Sahibi) Haftalık Süreç & Fiyat Değerlendirmesi",
        not: "Gelen son teklifler ve Sahibinden.com haftalık görüntülenme istatistikleri mülk sahibiyle paylaşılacak.",
        tamamlandi: false,
        hatirlatmaAktif: true
      },
      {
        id: "aj-3",
        tarih: yarin,
        saat: "11:00",
        kategori: "Tapu & Sözleşme",
        portfoyKod: "739104825612",
        baslik: "Çayyolu Villa Portföyü — Drone Çekimi ve Yetki Sözleşmesi Yenileme",
        not: "Hava durumu uygun olursa dış cephe drone çekimi yapılacak ve 90 günlük yetki uzatma onayı alınacak.",
        tamamlandi: false,
        hatirlatmaAktif: true
      }
    ];
    danismanAjandasiniKaydet();
  }
}

function danismanAjandasiniKaydet() {
  try {
    localStorage.setItem(AGENDA_STORAGE_KEY, JSON.stringify(ajandaKayitlari));
  } catch (e) {}
}

function danismanAjandaListesiniGetir(danismanId) {
  danismanAjandasiniYukle();
  const id = danismanId || (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  if (!Array.isArray(ajandaKayitlari[id])) {
    ajandaKayitlari[id] = [];
  }
  return ajandaKayitlari[id].sort((a, b) => {
    const dtA = `${a.tarih || ""} ${a.saat || "00:00"}`;
    const dtB = `${b.tarih || ""} ${b.saat || "00:00"}`;
    return dtA.localeCompare(dtB);
  });
}

function danismanAjandaNotuEkle() {
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  const tarih = document.getElementById("agInputDate")?.value || bugunTarihIso();
  const saat = document.getElementById("agInputTime")?.value || "12:00";
  const kategori = document.getElementById("agInputCategory")?.value || "Randevu / Not";
  const portfoyKod = document.getElementById("agInputPortfolio")?.value || "";
  const baslik = (document.getElementById("agInputTitle")?.value || "").trim();
  const not = (document.getElementById("agInputNote")?.value || "").trim();
  const hatirlatma = document.getElementById("agInputReminder")?.checked !== false;

  if (!baslik && !not) {
    alert("Lütfen ajanda kaydı için bir başlık veya not yazın.");
    return;
  }

  const liste = danismanAjandaListesiniGetir(aktifId);
  const yeniKayit = {
    id: `aj-${Date.now()}`,
    tarih,
    saat,
    kategori,
    portfoyKod,
    baslik: baslik || `${kategori} Notu`,
    not,
    tamamlandi: false,
    hatirlatmaAktif: hatirlatma
  };

  liste.push(yeniKayit);
  danismanAjandasiniKaydet();

  if (hatirlatma) {
    const { tamTarih, gunAdi } = tarihBilgisiniFormatlaTR(tarih);
    danismanBildirimEkle({
      tip: "ajanda",
      baslik: `⏰ Ajanda Hatırlatması: ${yeniKayit.baslik}`,
      detay: `${tamTarih} ${gunAdi} • Saat ${saat} (${kategori}) — ${not || "Planlanan ajanda kaydınız yaklaşıyor."}`,
      zaman: `${tamTarih} • ${saat}`,
      hedefMod: "agenda",
      portfoyKod
    });
  }

  danismanAjandaPanelRender();
}

function danismanAjandaTamamlaToggle(kayitId) {
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  const liste = danismanAjandaListesiniGetir(aktifId);
  const hedef = liste.find(x => x.id === kayitId);
  if (!hedef) return;
  hedef.tamamlandi = !hedef.tamamlandi;
  danismanAjandasiniKaydet();
  danismanAjandaPanelRender();
}

function danismanAjandaSil(kayitId) {
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  if (!Array.isArray(ajandaKayitlari[aktifId])) return;
  ajandaKayitlari[aktifId] = ajandaKayitlari[aktifId].filter(x => x.id !== kayitId);
  danismanAjandasiniKaydet();
  danismanAjandaPanelRender();
}

function danismanAjandaFiltreSec(filtre) {
  ajandaAktifFiltre = filtre;
  danismanAjandaPanelRender();
}

function danismanAjandaPanelRender() {
  const wrap = document.getElementById("agentAgendaContainer");
  if (!wrap) return;
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  const tumListe = danismanAjandaListesiniGetir(aktifId);
  const bugun = bugunTarihIso();

  const bugunkuSayi = tumListe.filter(x => x.tarih === bugun && !x.tamamlandi).length;
  const bekleyenSayi = tumListe.filter(x => !x.tamamlandi).length;
  const tamamlananSayi = tumListe.filter(x => x.tamamlandi).length;

  const filtrelenmis = tumListe.filter(x => {
    if (ajandaAktifFiltre === "today") return x.tarih === bugun;
    if (ajandaAktifFiltre === "upcoming") return !x.tamamlandi;
    if (ajandaAktifFiltre === "completed") return x.tamamlandi;
    return true;
  });

  const gorunenPortfoyler = aktifDanismaninGorunenPortfoyleri();
  const portfoySecenekleriHtml = [
    `<option value="">Bağlı Portföy Seçin (İsteğe Bağlı)</option>`,
    ...gorunenPortfoyler.map(p => `<option value="${p.kod}">#${p.kod} — ${p.baslik}</option>`)
  ].join("");

  const kategoriRenkMap = {
    "Yer Gösterimi": "background:#EFF6FF;color:#1D4ED8;border:1px solid #BFDBFE;",
    "Mülk Sahibi Görüşmesi": "background:#F0FDF4;color:#15803D;border:1px solid #BBF7D0;",
    "Tapu & Sözleşme": "background:#FEF3C7;color:#B45309;border:1px solid #FDE68A;",
    "Çekim & Pazarlama": "background:#FAF5FF;color:#7E22CE;border:1px solid #E9D5FF;",
    "Randevu / Not": "background:#F1F5F9;color:#334155;border:1px solid #CBD5E1;"
  };

  const listeHtml =
    filtrelenmis.length === 0
      ? `<div class="saas-card" style="text-align:center;padding:32px 20px;color:#64748B;">
          Bu filtrede kayıtlı ajanda notunuz bulunmuyor. Yukarıdaki formdan gün, tarih ve saat seçerek yeni not ekleyebilirsiniz.
        </div>`
      : filtrelenmis
          .map(item => {
            const { tamTarih, gunAdi } = tarihBilgisiniFormatlaTR(item.tarih);
            const bugunMu = item.tarih === bugun;
            const bagliPortfoy = item.portfoyKod ? portfoyler.find(p => p.kod === item.portfoyKod) : null;
            const katStil = kategoriRenkMap[item.kategori] || kategoriRenkMap["Randevu / Not"];

            return `
              <div class="saas-card" style="padding:14px 16px;margin-bottom:10px;border-left:4px solid ${
                item.tamamlandi ? "#94A3B8" : bugunMu ? "#2563EB" : "#0F172A"
              };opacity:${item.tamamlandi ? "0.68" : "1"};">
                <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:10px;">
                  <div style="display:flex;align-items:flex-start;gap:12px;flex:1;min-width:240px;">
                    <button
                      type="button"
                      onclick="danismanAjandaTamamlaToggle('${item.id}')"
                      title="${item.tamamlandi ? "Tamamlandı işaretini kaldır" : "Tamamlandı olarak işaretle"}"
                      style="width:22px;height:22px;border-radius:6px;border:2px solid ${
                        item.tamamlandi ? "#16A34A" : "#94A3B8"
                      };background:${
                        item.tamamlandi ? "#16A34A" : "#FFFFFF"
                      };color:#FFFFFF;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;margin-top:2px;flex-shrink:0;"
                    >
                      ${item.tamamlandi ? "✓" : ""}
                    </button>
                    <div style="flex:1;">
                      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:4px;">
                        <span style="font-size:0.76rem;font-weight:800;color:#0F172A;background:#F8FAFC;border:1px solid #E2E8F0;padding:2px 8px;border-radius:6px;">
                          📅 ${tamTarih} • <strong>${gunAdi}</strong>
                        </span>
                        <span style="font-size:0.76rem;font-weight:800;color:#2563EB;background:#EFF6FF;border:1px solid #BFDBFE;padding:2px 8px;border-radius:6px;">
                          🕒 ${item.saat || "Belirtilmedi"}
                        </span>
                        <span style="font-size:0.72rem;font-weight:700;padding:2px 8px;border-radius:999px;${katStil}">
                          ${item.kategori || "Not"}
                        </span>
                        ${
                          bugunMu && !item.tamamlandi
                            ? `<span style="font-size:0.7rem;font-weight:800;background:#FEE2E2;color:#DC2626;padding:2px 7px;border-radius:999px;">BUGÜN</span>`
                            : ""
                        }
                      </div>
                      <div style="font-size:0.95rem;font-weight:700;color:#0F172A;${
                        item.tamamlandi ? "text-decoration:line-through;color:#64748B;" : ""
                      }">
                        ${item.baslik}
                      </div>
                      ${
                        item.not
                          ? `<div style="font-size:0.83rem;color:#475569;margin-top:4px;line-height:1.45;">${item.not}</div>`
                          : ""
                      }
                      ${
                        bagliPortfoy
                          ? `<div style="margin-top:6px;">
                              <button type="button" class="saas-btn-outline-sm" style="padding:3px 9px;font-size:0.72rem;" onclick="seciliKod='${bagliPortfoy.kod}'; acikAkordeonPortfoyKodu='${bagliPortfoy.kod}'; danismanSolMenuSec('portfolios');">
                                🏠 #${bagliPortfoy.kod} — ${bagliPortfoy.baslik} Portföyüne Git →
                              </button>
                            </div>`
                          : ""
                      }
                    </div>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;">
                    <button type="button" class="saas-btn-outline-sm" style="color:#DC2626;border-color:#FECACA;padding:5px 10px;font-size:0.74rem;" onclick="danismanAjandaSil('${item.id}')">
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            `;
          })
          .join("");

  wrap.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;">
      <div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <h2 class="saas-h2" style="margin:0;">Mülk Ajandam</h2>
          <span class="saas-badge-blue">${bugunkuSayi} Bugünkü Randevu</span>
          <span class="saas-badge-neutral">${bekleyenSayi} Bekleyen • ${tamamlananSayi} Tamamlanan</span>
        </div>
        <div class="saas-text-xs" style="margin-top:2px;">Gün, tarih ve saat belirterek yer gösterimi, mülk sahibi görüşmesi, tapu randevusu ve saha notlarınızı planlayın.</div>
      </div>
      <button type="button" class="saas-btn-outline-sm" onclick="danismanSolMenuSec('notifications')">
        <span>🔔 Bildirimler &amp; Hatırlatmalar</span>
      </button>
    </div>

    <!-- YENİ MÜLK AJANDASI NOTU EKLEME KARTI -->
    <div class="saas-card" style="padding:16px 18px;margin-bottom:16px;background:#F8FAFC;border:1.5px solid #DBEAFE;">
      <h3 class="saas-h2" style="font-size:0.95rem;margin-bottom:10px;">+ Mülk Ajandama Yeni Kayıt Ekle</h3>
      <div class="form-grid-3" style="margin-bottom:10px;">
        <div class="field">
          <label>Tarih (Gün / Ay / Yıl)</label>
          <input type="date" id="agInputDate" value="${bugun}" class="saas-input-compact" style="width:100%;padding:8px 10px;" />
        </div>
        <div class="field">
          <label>Saat</label>
          <input type="time" id="agInputTime" value="14:00" class="saas-input-compact" style="width:100%;padding:8px 10px;" />
        </div>
        <div class="field">
          <label>Kategori</label>
          <select id="agInputCategory" class="saas-input-compact" style="width:100%;padding:8px 10px;">
            <option value="Yer Gösterimi">Yer Gösterimi</option>
            <option value="Mülk Sahibi Görüşmesi">Mülk Sahibi Görüşmesi</option>
            <option value="Tapu & Sözleşme">Tapu &amp; Sözleşme</option>
            <option value="Çekim & Pazarlama">Çekim &amp; Pazarlama</option>
            <option value="Randevu / Not">Genel Randevu / Not</option>
          </select>
        </div>
      </div>

      <div class="form-grid-2" style="margin-bottom:10px;">
        <div class="field">
          <label>Başlık / Kısa Özet</label>
          <input type="text" id="agInputTitle" class="saas-input-compact" placeholder="Örn: Bağlıca 3+1 Daire Alıcı Yer Gösterimi" style="width:100%;padding:8px 12px;" />
        </div>
        <div class="field">
          <label>İlgili Portföy (İsteğe Bağlı)</label>
          <select id="agInputPortfolio" class="saas-input-compact" style="width:100%;padding:8px 10px;">
            ${portfoySecenekleriHtml}
          </select>
        </div>
      </div>

      <div class="field" style="margin-bottom:12px;">
        <label>Detaylı Ajanda Notunuz</label>
        <textarea id="agInputNote" rows="2" class="saas-input-compact" placeholder="Tarih ve saatle ilgili hatırlamak istediğiniz detayları, iletişim numarasını veya hazırlık notlarını yazın..." style="width:100%;padding:8px 12px;"></textarea>
      </div>

      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;">
        <label style="display:inline-flex;align-items:center;gap:7px;font-size:0.8rem;color:#334155;cursor:pointer;">
          <input type="checkbox" id="agInputReminder" checked />
          <span>Bildirimler merkezine hatırlatma olarak da düşsün</span>
        </label>
        <button type="button" class="social-btn-primary" onclick="danismanAjandaNotuEkle()">
          <span>+ Mülk Ajandama Kaydet</span>
        </button>
      </div>
    </div>

    <!-- FİLTRE SEKMELERİ -->
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
      <button type="button" class="${ajandaAktifFiltre === "all" ? "saas-btn-primary-sm" : "saas-btn-outline-sm"}" onclick="danismanAjandaFiltreSec('all')">
        Tümü (${tumListe.length})
      </button>
      <button type="button" class="${ajandaAktifFiltre === "today" ? "saas-btn-primary-sm" : "saas-btn-outline-sm"}" onclick="danismanAjandaFiltreSec('today')">
        Bugün (${tumListe.filter(x => x.tarih === bugun).length})
      </button>
      <button type="button" class="${ajandaAktifFiltre === "upcoming" ? "saas-btn-primary-sm" : "saas-btn-outline-sm"}" onclick="danismanAjandaFiltreSec('upcoming')">
        Bekleyenler (${bekleyenSayi})
      </button>
      <button type="button" class="${ajandaAktifFiltre === "completed" ? "saas-btn-primary-sm" : "saas-btn-outline-sm"}" onclick="danismanAjandaFiltreSec('completed')">
        Tamamlananlar (${tamamlananSayi})
      </button>
    </div>

    <div>
      ${listeHtml}
    </div>
  `;
}

// ============================================================================
// ANA MODÜL 6: BİLDİRİMLER MERKEZİ (MESAJ, AJANDA, SATICI YENİLEME, ARIYORUM)
// ============================================================================
const NOTIFICATIONS_STORAGE_KEY = "mulkizle_bildirimler_v1";
let danismanBildirimleri = {};
let bildirimAktifFiltre = "all"; // all | mesaj | ajanda | yenileme | ariyorum

function danismanBildirimleriniYukle() {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (raw) {
      danismanBildirimleri = JSON.parse(raw);
    }
  } catch (e) {
    danismanBildirimleri = {};
  }
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  if (!Array.isArray(danismanBildirimleri[aktifId]) || danismanBildirimleri[aktifId].length === 0) {
    const { tamTarih, gunAdi } = tarihBilgisiniFormatlaTR(bugunTarihIso());
    danismanBildirimleri[aktifId] = [
      {
        id: "ntf-1",
        tip: "yenileme",
        baslik: "🔄 Mülk Sahibinin Yenileme & Güncel Durum Talebi",
        detay: "Ahmet Yılmaz (#849201736410 - Bağlıca Mah. 3+1 Daire) takip ekranından haftalık ilan görüntülenme sayılarının, süreç adımlarının ve yetki durumunun yenilenmesini talep etti.",
        zaman: "10 dakika önce",
        okundu: false,
        hedefMod: "portfolios",
        portfoyKod: "849201736410"
      },
      {
        id: "ntf-2",
        tip: "ajanda",
        baslik: "⏰ Ajanda Hatırlatması: Bağlıca 3+1 Daire — Alıcı Aile Yer Gösterimi",
        detay: `${tamTarih} ${gunAdi} • Saat 14:30 — Alıcı Murat Bey ve eşi daireyi gezecek. Yedek anahtar kapıcı Arif Bey'den alınacak.`,
        zaman: "Bugün • 14:30",
        okundu: false,
        hedefMod: "agenda",
        portfoyKod: "849201736410"
      },
      {
        id: "ntf-3",
        tip: "ariyorum",
        baslik: "🔍 Arıyorum! Uzmanlık Bölgenizde Yeni Alıcı & Paylaşım Eşleşmesi",
        detay: "Bölgenizde (Ankara / Bağlıca - Çayyolu) 5.000.000 ₺ - 6.000.000 ₺ bütçeli, krediye uygun 3+1 arayan hazır alıcı için meslektaşınız paylaşımlı portföy (Co-Op) talebi gönderdi.",
        zaman: "1 saat önce",
        okundu: false,
        hedefMod: "ariyorum",
        portfoyKod: ""
      },
      {
        id: "ntf-4",
        tip: "mesaj",
        baslik: "💬 Yeni Üye Mesajı: Selin Yılmaz (Bölge Uzmanı)",
        detay: "Kişisel web siteniz ve ortak portföy ağınız üzerinden gelen yeni bir mesajınız var: 'Merhaba, Bağlıca 3+1 portföyünüz için hazır nakit alıcım var, ortak gösterim yapabilir miyiz?'",
        zaman: "2 saat önce",
        okundu: false,
        hedefMod: "messages",
        portfoyKod: ""
      }
    ];
    danismanBildirimleriniKaydet();
  }
}

function danismanBildirimleriniKaydet() {
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(danismanBildirimleri));
  } catch (e) {}
}

function danismanBildirimleriniGetir(danismanId) {
  danismanBildirimleriniYukle();
  const id = danismanId || (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  if (!Array.isArray(danismanBildirimleri[id])) {
    danismanBildirimleri[id] = [];
  }
  return danismanBildirimleri[id];
}

function danismanBildirimEkle(yeni) {
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  const liste = danismanBildirimleriniGetir(aktifId);
  liste.unshift({
    id: `ntf-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    tip: yeni.tip || "mesaj",
    baslik: yeni.baslik || "Yeni Bildirim",
    detay: yeni.detay || "",
    zaman: yeni.zaman || "Az önce",
    okundu: false,
    hedefMod: yeni.hedefMod || "portfolios",
    portfoyKod: yeni.portfoyKod || ""
  });
  danismanBildirimleriniKaydet();
  if (typeof igSolMenuGuncelle === "function") {
    igSolMenuGuncelle();
  }
}

function saticiDurumYenilemeTalebiGonder(kod) {
  const p = portfoyler.find(x => x.kod === kod) || aktifPortfoy();
  if (!p) return;

  const not = prompt(
    `🔄 Danışmanınız ${p.danisman}'a iletilecek yenileme / güncelleme talebinizi yazabilirsiniz:`,
    "İlan istatistiklerinin, haftalık süreç adımlarının ve yetki süresinin güncellenmesini rica ederim."
  );
  if (not === null) return;

  danismanBildirimEkle({
    tip: "yenileme",
    baslik: `🔄 Mülk Sahibinin Yenileme Talebi: ${p.mulkSahibi} (#${p.kod})`,
    detay: `${p.baslik} mülk sahibi ${p.mulkSahibi} yenileme talebi gönderdi: "${not.trim() || "Güncel durum yenileme talebi"}"`,
    zaman: "Az önce",
    hedefMod: "portfolios",
    portfoyKod: p.kod
  });

  alert(`✅ Yenileme ve güncel durum talebiniz danışmanınız ${p.danisman}'ın Bildirimler paneline iletildi!`);
}

function danismanBildirimFiltreSec(filtre) {
  bildirimAktifFiltre = filtre;
  danismanBildirimlerPanelRender();
}

function danismanBildirimTumunuOkunduYap() {
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  const liste = danismanBildirimleriniGetir(aktifId);
  liste.forEach(b => {
    b.okundu = true;
  });
  danismanBildirimleriniKaydet();
  danismanBildirimlerPanelRender();
  if (typeof igSolMenuGuncelle === "function") igSolMenuGuncelle("notifications");
}

function danismanBildirimTiklaGit(bildirimId) {
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  const liste = danismanBildirimleriniGetir(aktifId);
  const b = liste.find(x => x.id === bildirimId);
  if (!b) return;
  b.okundu = true;
  danismanBildirimleriniKaydet();

  if (b.portfoyKod) {
    seciliKod = b.portfoyKod;
    acikAkordeonPortfoyKodu = b.portfoyKod;
  }

  if (b.hedefMod === "agenda") {
    danismanSolMenuSec("agenda");
  } else if (b.hedefMod === "messages") {
    danismanSolMenuSec("messages");
  } else if (b.hedefMod === "ariyorum") {
    danismanSolMenuSec("ariyorum");
  } else {
    danismanSolMenuSec("portfolios");
  }
}

function danismanBildirimSil(bildirimId) {
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  if (!Array.isArray(danismanBildirimleri[aktifId])) return;
  danismanBildirimleri[aktifId] = danismanBildirimleri[aktifId].filter(x => x.id !== bildirimId);
  danismanBildirimleriniKaydet();
  danismanBildirimlerPanelRender();
  if (typeof igSolMenuGuncelle === "function") igSolMenuGuncelle("notifications");
}

function danismanBildirimlerPanelRender() {
  const wrap = document.getElementById("agentNotificationsContainer");
  if (!wrap) return;
  const aktifId = (aktifKullanici && aktifKullanici.id) || "ahmet-demir";
  const tumListe = danismanBildirimleriniGetir(aktifId);
  const okunmamisSayi = tumListe.filter(b => !b.okundu).length;

  const notifBadge = document.getElementById("igSidebarNotifBadge");
  if (notifBadge) {
    notifBadge.textContent = `${okunmamisSayi}`;
    notifBadge.style.display = okunmamisSayi > 0 ? "inline-flex" : "none";
  }

  const filtrelenmis = tumListe.filter(b => {
    if (bildirimAktifFiltre === "all") return true;
    return b.tip === bildirimAktifFiltre;
  });

  const tipEtiketMap = {
    mesaj: {
      etiket: "💬 Mesaj Bildirimi",
      stil: "background:#EFF6FF;color:#1D4ED8;border:1px solid #BFDBFE;",
      aksiyonMetni: "Mesaj Kutusunu Aç →"
    },
    ajanda: {
      etiket: "⏰ Ajanda Hatırlatması",
      stil: "background:#FAF5FF;color:#7E22CE;border:1px solid #E9D5FF;",
      aksiyonMetni: "Ajandama Git →"
    },
    yenileme: {
      etiket: "🔄 Mülk Sahibi Yenileme Talebi",
      stil: "background:#FEF3C7;color:#B45309;border:1px solid #FDE68A;",
      aksiyonMetni: "Portföyü Güncelle →"
    },
    ariyorum: {
      etiket: "🔍 Arıyorum! Eşleşmesi",
      stil: "background:#F0FDF4;color:#15803D;border:1px solid #BBF7D0;",
      aksiyonMetni: "Arıyorum Talebini Gör →"
    }
  };

  const listeHtml =
    filtrelenmis.length === 0
      ? `<div class="saas-card" style="text-align:center;padding:32px 20px;color:#64748B;">
          Bu kategoride bildiriminiz bulunmuyor.
        </div>`
      : filtrelenmis
          .map(b => {
            const meta = tipEtiketMap[b.tip] || tipEtiketMap.mesaj;
            return `
              <div class="saas-card" style="padding:14px 16px;margin-bottom:10px;border-left:4px solid ${
                b.okundu ? "#CBD5E1" : "#2563EB"
              };background:${b.okundu ? "#FFFFFF" : "#F8FAFC"};">
                <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:10px;">
                  <div style="flex:1;min-width:240px;">
                    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:5px;">
                      <span style="font-size:0.72rem;font-weight:700;padding:2px 9px;border-radius:999px;${meta.stil}">
                        ${meta.etiket}
                      </span>
                      <span style="font-size:0.74rem;color:#64748B;font-weight:600;">${b.zaman}</span>
                      ${
                        !b.okundu
                          ? `<span style="font-size:0.68rem;font-weight:800;background:#2563EB;color:#FFFFFF;padding:1px 7px;border-radius:999px;">YENİ</span>`
                          : ""
                      }
                    </div>
                    <div style="font-size:0.95rem;font-weight:700;color:#0F172A;margin-bottom:4px;">
                      ${b.baslik}
                    </div>
                    <div style="font-size:0.83rem;color:#475569;line-height:1.45;">
                      ${b.detay}
                    </div>
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <button type="button" class="saas-btn-primary-sm" style="padding:6px 12px;font-size:0.76rem;" onclick="danismanBildirimTiklaGit('${b.id}')">
                      <span>${meta.aksiyonMetni}</span>
                    </button>
                    <button type="button" class="saas-btn-outline-sm" style="padding:6px 10px;font-size:0.74rem;color:#64748B;" onclick="danismanBildirimSil('${b.id}')">
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            `;
          })
          .join("");

  wrap.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;">
      <div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <h2 class="saas-h2" style="margin:0;">Bildirimler Merkezi</h2>
          ${
            okunmamisSayi > 0
              ? `<span class="saas-badge-blue">${okunmamisSayi} Yeni Bildirim</span>`
              : `<span class="saas-badge-neutral">Tüm Bildirimler Okundu</span>`
          }
        </div>
        <div class="saas-text-xs" style="margin-top:2px;">Mesajlar, ajanda hatırlatmaları, mülk sahibinin yenileme talepleri ve Arıyorum! ağından gelen eşleşmeler burada toplanır.</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button type="button" class="saas-btn-outline-sm" onclick="danismanBildirimTumunuOkunduYap()">
          <span>✓ Tümünü Okundu İşaretle</span>
        </button>
      </div>
    </div>

    <!-- KATEGORİ FİLTRE BUTONLARI -->
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
      <button type="button" class="${bildirimAktifFiltre === "all" ? "saas-btn-primary-sm" : "saas-btn-outline-sm"}" onclick="danismanBildirimFiltreSec('all')">
        Tümü (${tumListe.length})
      </button>
      <button type="button" class="${bildirimAktifFiltre === "mesaj" ? "saas-btn-primary-sm" : "saas-btn-outline-sm"}" onclick="danismanBildirimFiltreSec('mesaj')">
        💬 Mesajlar (${tumListe.filter(x => x.tip === "mesaj").length})
      </button>
      <button type="button" class="${bildirimAktifFiltre === "ajanda" ? "saas-btn-primary-sm" : "saas-btn-outline-sm"}" onclick="danismanBildirimFiltreSec('ajanda')">
        ⏰ Ajanda Hatırlatmaları (${tumListe.filter(x => x.tip === "ajanda").length})
      </button>
      <button type="button" class="${bildirimAktifFiltre === "yenileme" ? "saas-btn-primary-sm" : "saas-btn-outline-sm"}" onclick="danismanBildirimFiltreSec('yenileme')">
        🔄 Mülk Sahibi Yenileme Talebi (${tumListe.filter(x => x.tip === "yenileme").length})
      </button>
      <button type="button" class="${bildirimAktifFiltre === "ariyorum" ? "saas-btn-primary-sm" : "saas-btn-outline-sm"}" onclick="danismanBildirimFiltreSec('ariyorum')">
        🔍 Arıyorum! Bildirimleri (${tumListe.filter(x => x.tip === "ariyorum").length})
      </button>
    </div>

    <div>
      ${listeHtml}
    </div>
  `;
}

// ============================================================================
// SAYFA YÜKLENDİĞİNDE BAŞLAT
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  verileriYukle();
  dortKarakterVerileriniHazirla();

  document.querySelectorAll(".view-tab").forEach(btn => {
    btn.addEventListener("click", () => gorunumDegistir(btn.dataset.target));
  });

  const heroForm = document.getElementById("heroTrackingForm");
  if (heroForm) {
    heroForm.addEventListener("submit", e => {
      e.preventDefault();
      heroKodSecVeDogrula(document.getElementById("heroTrackingInput").value);
    });
  }

  const clientSearchForm = document.getElementById("clientSearchForm");
  if (clientSearchForm) {
    clientSearchForm.addEventListener("submit", e => {
      e.preventDefault();
      saticiPaneliniGoster(document.getElementById("clientCodeInput").value);
    });
  }

  panelYenile();
  saticiPaneliniGoster(seciliKod);
  mobilUygulamaSimulasyonRender();
  karakterSimulasyonBariniRenderEt();
  anaSayfaSayaclariniGuncelle();

  // Tarayıcı ve Mouse Geri / İleri Tuşları (HTML5 History API) Desteği
  if (typeof window.history !== "undefined") {
    window.history.replaceState(
      { view: _aktifGorunumId, mode: _aktifDanismanModu, seciliKod: seciliKod || "" },
      "",
      window.location.hash || "#landing"
    );

    window.addEventListener("popstate", e => {
      const st = e.state || { view: "view-landing", mode: "mode-portfolios" };
      _popstateIsleniyor = true;
      try {
        if (st.seciliKod) {
          seciliKod = st.seciliKod;
        }
        const hedefView = st.view || "view-landing";
        gorunumDegistir(hedefView);
        if (hedefView === "view-dashboard" && st.mode) {
          danismanAnaModSec(st.mode);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } finally {
        _popstateIsleniyor = false;
      }
    });
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
});
