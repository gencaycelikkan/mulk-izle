# 🏠 Mülkİzle (`mulkizle.com`) — Gayrimenkul Süreç Takip, Dijital Sunum ve Danışman Ağı Platformu

> **Kurucu & Ürün Vizyonu:** Gencay Çelikkan  
> **Kategori:** PropTech SaaS / Gayrimenkul Pazarlama, Canlı Süreç Takibi ve Danışman İş Birliği Platformu

**Mülkİzle (`mulkizle.com`)**, gayrimenkul danışmanı, mülk sahibi (satıcı) ve potansiyel alıcıyı şeffaf bir dijital ekosistemde buluşturan yeni nesil bir **PropTech** platformudur. Kargo takip sistemlerinin anlaşılır süreç deneyimini gayrimenkul pazarlamasına uyarlayarak mülk sahiplerine **"Mülküm için bugün ne yapıldı?"** sorusunun yanıtını tek bir takip kodu ile canlı olarak sunar.

---

## 🚀 Platformda Bugüne Kadar Geliştirilen Tüm Özellikler ve Modüller

### 1. 🔍 Ana Sayfa, Canlı Platform Sayaçları ve Kargo Tipi Mülk Sorgulama (`#view-landing`)
- **Mülk Takip Kodu & Linki ile Hızlı Sorgulama:**
  - Mülk sahipleri veya alıcılar, kendilerine iletilen takip kodu (örn. `MLK-4829`, `MLK-9041`) ile üye olmadan mülklerinin güncel durumunu sorgulayabilir.
  - Sorgulama ekranında **Satıcı (Mülk Sahibi) Görünümü** veya **Alıcı (Vitrin & Teklif) Görünümü** seçilerek ilgili panele doğrudan geçiş yapılır.
- **Canlı Platform Sayaç Şeridi (`#homeLiveCountersStrip`):**
  - **Aktif Kullanıcı Sayısı (`#homeActiveUsersCount`):** Sistemde kayıtlı aktif emlak danışmanı sayısını canlı olarak çeker.
  - **Aktif Portföy Sayısı (`#homeActivePortfoliosCount`):** Platformda takip edilen aktif portföylerin toplam sayısını canlı olarak gösterir.
  - **Toplam Portföy Görüntülenme Sayısı (`#homeTotalPortfolioViewsCount`):** Sahibinden.com'dan manuel girilen rakamlardan tamamen bağımsız olarak, yalnızca **site içi gerçek tekil portföy görüntülenmelerinin** toplamını canlı hesaplar.
- **Tekil (Unique) Site İçi Portföy Görüntülenme Sayacı (`p.siteIciGoruntulenmeSayisi` & `p.tekilGoruntuleyenler`):**
  - **Danışman Kendi Portföyünü Görüntülediğinde Sayılmaz:** Üye kendi portföyünü *Aktif Portföylerim* veya diğer sekmelerden incelediğinde görüntülenme sayacı artmaz.
  - **Tekil Ziyaretçi Kuralı (1 Kişi = 1 Görüntülenme):** Bir alıcı, satıcı veya başka bir ziyaretçi takip linki/kodu ile ya da portföy kartından mülkü ilk kez görüntülediğinde sayaç `+1` artar. Aynı kişinin tekrarlayan görüntülemeleri mükerrer sayılmaz.
- **Kurumsal Bilgi Sekmeleri (Ziyaretçi Modu):**
  - *Ana Sayfa*, *Biz Kimiz?*, *Üyelik Avantajları* ve *Sözleşmeler* sekmeleri üye girişi öncesinde ziyaretçilere platformu tanıtır; üye girişi yapıldığında ise arayüz sadeleşerek doğrudan danışman çalışma alanına dönüşür.

---

### 2. 📱 Instagram Tarzı Saydam Sol Navigasyon Barı (`#igLeftSidebar`)
- **Yalnızca Üye Girişi Yapıldığında Aktif Olur:**
  - Site ana sayfasında (ziyaretçi görünümünde) gizlidir; danışman giriş yaptığında tüm çalışma sayfalarında ve danışmanın kendi profil sayfasında sol kenarda sabit olarak görünür.
- **Saydam (Glassmorphism) & Hover ile Genişleyen Tasarım:**
  - Varsayılan durumda dar ve ikon odaklı (`60px`), fare üzerine geldiğinde (`hover`) yumuşak bir geçişle genişleyerek (`210px`) menü başlıklarını gösteren modern, yarı saydam (`backdrop-filter: blur`) tasarım.
  - İkonlar arası ferah boşluklar ve optimize edilmiş tipografi ile hızlı erişim sağlar:
    1. 🏠 **Ana Sayfa** (Mülk Durumu Sorgulama ekranı)
    2. ➕ **Yeni Mülk Takip Kodu Oluştur** (Hızlı portföy ve takip kodu sihirbazı)
    3. 🌐 **Kişisel Web Sitemi Gör** (Danışmanın kendi dijital kartvizit & portföy vitrini)
    4. 📁 **Portföylerim** (Aktif portföyler, süreç yönetimi ve medya merkezi)
    5. 🔎 **Arıyorum!** (Bölge uzmanı arama & ortak çalışma / paylaşım ağı — bağımsız tam sayfa görünümü)
    6. 📄 **Sözleşmeler** (Hazır gayrimenkul sözleşme şablonları merkezi)

---

### 3. 🛠️ Danışman (Emlakçı) Yönetim Paneli (`#view-consultant`)
- **Yeni Mülk Takip Kodu Oluşturma Sihirbazı (`#quickPortfolioCreatorCard`):**
  - Mülk başlığı, fiyat, konum, işlem türü (Satılık / Kiralık), mülk tipi (Daire, Villa, Arsa, Ticari vb.), m², oda sayısı, kat, bina yaşı, ısıtma, tapu durumu ve detaylı katalog özelliklerini tek ekrandan kaydetme.
  - **Özelleştirilebilir Pazarlama & Hizmet Adımları:** Profesyonel fotoğraf/video, drone çekimi, 360° sanal tur, branda afiş, komşu mektubu, el ilanı, açık davet (Open House), sosyal medya reklamları ve **Detaylı Pazar Analizi** adımlarını seçip kronolojik sıraya dizme veya özel adım ekleme.
- **Mavi Dikey Çizgili & Ev İkonlu Süreç Takip Tasarımı (`.house-line-stepper`):**
  - Tüm süreç takibi ekranlarında (Danışman paneli, Satıcı paneli, Pazar Analizi ve Mobil Önizleme) adımlar arasındaki nokta/daire kalabalığı kaldırılarak, ev ikonlarını birbirine bağlayan **4px kalınlığında temiz mavi dikey çizgi** standardı uygulanmıştır.
- **01. Süreç & Mülk Günlüğü (İkili Not Yapısı):**
  - 👁️ **Satıcının Göreceği Not:** Yapılan saha çalışmalarının tarih/saat damgalı olarak mülk sahibi ekranında görünmesini sağlar.
  - 🔒 **Sadece Bana Özel (Gizli Not):** Danışmanın özel pazarlık ve strateji notlarıdır; satıcı veya alıcı ekranlarında kesinlikle görünmez.
- **02. Medya, Çapraz Filigran (Watermark) & 360° Sanal Tur:**
  - Yüklenen mülk fotoğraflarına HTML5 Canvas ile otomatik çapraz filigran (**Danışman Adı Soyadı + Telefon**) basma ve filigranlı görseli indirme.
  - Matterport / Kuula 360° sanal tur bağlantısı ve tanıtım videosu ekleme.
  - Sahibinden.com ilan görüntülenme/favori ve Instagram Reels izlenme/beğeni verilerini güncelleme.
- **03. Detaylı Pazar Analizi (Koşullu Modül & PDF Çıktısı):**
  - **Koşullu Aktivasyon (`portfoydePazarAnaliziSeciliMi`):** Danışman yalnızca mülk takip kodu oluştururken (veya hizmet adımlarında) **"Detaylı Pazar Analizi"** seçeneğini işaretlediğinde bu sekme ve satıcı ekranındaki pazar analizi görünümü aktif olur; seçilmezse gizlenir.
  - Bölgedeki rakip/emsal ilanları (başlık, m², fiyat, durum, kaynak link) ekleme, önerilen tahmini satış fiyat aralığı (`Min - Max`) ve danışman değerleme notu oluşturma.
  - Tek tıkla **PDF Formatında Çıkarma (`pazarAnaliziPdfCikar`)** desteği.
- **04. Gelen Alıcı Talepleri & Randevu/Teklif Yönetimi:**
  - Alıcı vitrininden gelen **Yerinde Gösterim Randevusu** ve **Resmi Fiyat Teklifi** taleplerini görüntüleme, onaylama ve satıcı ekranına yansıtma.
- **05. Esnek Yetki Sözleşmesi Yönetimi:**
  - Sözlü yetki (belgesiz), hazır PDF sözleşme taslağı yazdırma, ıslak imzalı belge yükleme veya SMS OTP mobil onay seçenekleri.

---

### 4. 📊 Satıcı (Mülk Sahibi) Canlı Takip ve Detaylı Pazar Analizi Görünümü (`#view-seller`)
- **Canlı Pazarlama Süreci Takibi:**
  - Mülk sahibi, danışmanın tamamladığı ve sırada bekleyen pazarlama adımlarını mavi dikey çizgili ev ikonlu süreç akışında canlı olarak takip eder.
  - Danışmanın paylaştığı saha notlarını, sosyal medya / ilan performans istatistiklerini ve mülke gelen alıcı tekliflerini şeffaf biçimde inceler.
- **Mülk Sahibine Özel Detaylı Pazar Analizi Raporu & PDF İndirme:**
  - Eğer portföyde *Detaylı Pazar Analizi* seçiliyse, satıcı özel rapor görünümünde şu standart akışı inceler ve **PDF Formatında Çıkar** butonuyla indirebilir:
    1. **Özel Başlık:** *"[Mülk Sahibi Adı Soyadı] İçin Özel Hazırlanmış Detaylı Pazar Analizi"*
    2. **Hazırlayan Bilgisi:** *Hazırlayan: [Danışman Adı Soyadı] — [Firma İsmi] — [Telefon]*
    3. **Mülkün Özellikleri:** Oda sayısı, m², kat, bina yaşı, ısıtma, tapu durumu ve tüm teknik detaylar.
    4. **Mülkün Fotoğrafları:** Mülke ait görsel galeri (Pazar analizi raporunda 360° sanal tur yer almaz, odak tamamen değerleme ve görsellerdir).
    5. **Rakip İlanlar & Bölge Emsal Karşılaştırması:** Bölgedeki rakip mülklerin m² ve fiyat karşılaştırma tablosu.
    6. **Tahmini Fiyat & Değerleme:** Önerilen tahmini satış fiyat aralığı, bölge m² birim fiyat ortalaması ve danışman uzman değerlendirmesi.
    7. **Pazarlama Faaliyetlerine Başlandığında Yapılacak Pazarlama Adımları:** Yetki onayı sonrası uygulanacak tüm pazarlama adımlarının mavi dikey çizgili yol haritası.

---

### 5. 🤝 Alıcı Vitrin, 360° Sanal Tur ve Teklif Paneli (`#view-buyer`)
- Potansiyel alıcıların takip kodu veya paylaşım linki ile ulaştığı modern dijital mülk sunum sayfası.
- Mülkün katalog özelliklerini, çapraz filigranlı fotoğraf galerisini ve varsa **360° sanal turunu** inceleme.
- **Yerinde Gösterim Randevusu** veya **Resmi Fiyat Teklifi** formunu doldurarak doğrudan danışman ve mülk sahibine talep iletme.

---

### 6. 🌐 Kişisel Web Sitemi Gör — Danışman Dijital Kartvizit & Portföy Vitrini (`#view-profile-page`)
- Her emlak danışmanı için otomatik oluşturulan, paylaşılabilir kişisel mikro web sitesi (`mulkizle.com/danisman/...`).
- **Sosyal Medya & Dijital Kimlik Entegrasyonu:**
  - Profil fotoğrafı, kapak görseli, unvan, uzmanlık bölgeleri, biyografi, başarı istatistikleri, Instagram, LinkedIn, YouTube, TikTok, Facebook ve Sahibinden/Hepsiemlak mağaza bağlantıları.
- **Canlı Portföy Vitrini:**
  - Danışmanın aktif portföyleri, fotoğrafları, fiyatları ve site içi tekil görüntülenme sayaçlarıyla birlikte ziyaretçilere listelenir.
- **Mobil Kartvizit & QR Kod:**
  - Tek tıkla WhatsApp paylaşımı, vCard rehbere kaydetme ve QR kod ile hızlı erişim.

---

### 7. 🔎 "Arıyorum!" — Bölge Uzmanı Ara & Danışmanlar Arası Ortak Çalışma Ağı (`#view-ariyorum`)
- Sol navigasyon barından bağımsız bir sayfa olarak açılan **Danışman İş Birliği (Co-Broking & Referral)** merkezi.
- **2 Ana Sekmeli Yapı:**
  1. **Ortak Çalışma & Paylaşımlı İlanlar (`Paylaşımlı Portföy & Müşteri Ağı`):**
     - Danışmanların **"Portföyüm Var, Alıcı Arıyorum"** veya **"Hazır Alıcım Var, Portföy Arıyorum"** ilanları açarak komisyon paylaşımı (%50-%50 vb.) ile ortak satış yapmasını sağlar.
  2. **Bölge Uzmanı Ara (`Danışman Rehberi`):**
     - İl, ilçe ve uzmanlık alanına (Konut, Lüks Villa, Ticari, Arsa) göre sistemdeki doğrulanmış bölge uzmanı danışmanları filtreleme, profillerini inceleme ve doğrudan ortak çalışma teklifi gönderme.

---

### 8. 📄 Hazır Gayrimenkul Sözleşmeleri Merkezi (`#view-contracts` & `sözleşmeler/`)
- Emlak danışmanlarının günlük operasyonlarında ihtiyaç duyduğu resmi sözleşme şablonlarını indirme ve yazdırma merkezi:
  - *Alım Satım Aracılık Sözleşmesi*
  - *Pazarlama / Satış Yetki Belgesi*
  - *Kiralama Yetki Belgesi*
  - *Konut & İşyeri Kira Kontratı*
  - *Tahliye Taahhütnamesi*

---

## 🗂️ Proje Dosya Yapısı

```text
mulk-izle/
├── index.html                                   # Ana uygulama arayüzü ve tüm görünüm (View) şablonları
├── styles.css                                   # Modern Glassmorphism, sol sidebar, stepper ve responsive stiller
├── app.js                                       # Tüm iş mantığı, durum yönetimi (LocalStorage), PDF üretici ve sayaçlar
├── manifest.json                                # PWA (Progressive Web App) yapılandırması
├── sw.js                                        # Service Worker (çevrimdışı önbellekleme desteği)
├── logo.jpg                                     # Mülkİzle marka logosu
├── mulkizle_turkpatent_591x591.jpg              # TürkPatent marka tescil görseli
├── sözleşmeler/                                 # İndirilebilir resmi .docx sözleşme şablonları
├── MULKIZLE_PROJE_REHBERI.md                    # İlk konsept ve mimari rehberi
├── KARGO_SITELERI_TEMA_VE_UX_ARASTIRMASI.md     # Kargo takip UX/UI araştırma raporu
├── TURKIYE_INFLUENCER_EMLAKCILAR_ANALIZI.md     # Türkiye gayrimenkul sosyal medya & influencer analizi
└── README.md                                    # Proje genel dokümantasyonu ve özellik özeti
```

---

## 💻 Kurulum ve Yerel Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için herhangi bir derleme (build) adımına ihtiyaç yoktur. Doğrudan bir HTTP sunucusu ile çalıştırabilirsiniz:

```bash
# Python ile hızlı başlatma:
python -m http.server 8090

# Veya Node.js (npx serve) ile başlatma:
npx serve -l 8090
```

Ardından tarayıcınızda **`http://localhost:8090`** adresini açarak uygulamayı deneyimleyebilirsiniz.
