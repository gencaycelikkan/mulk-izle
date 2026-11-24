# 🚀 Mülkİzle (`mulkizle.com`) — Son Güncellemeler ve Sürüm Notları

Bu dosya projede yapılan yeni özellikleri, arayüz eklemelerini ve yapısal değişiklikleri abinizle ve ekiple şeffaf şekilde takip edebilmek için oluşturulmuştur.

---

## 📅 24 Kasım 2026 — Yeni Eklenen Özellikler ve Düzenlemeler

### 1. 🔑 Manuel Test İçin 3 Hazır Üye Hesabı (1 Ücretsiz + 2 Pro) & Hızlı Geçiş Barının Kaldırılması
* Üstteki simülasyon / hızlı ekran geçiş barı ve sağ alt test çekmecesi kaldırılarak gerçek kullanıcı giriş/çıkış akışına geçildi.
* Manuel test için 3 farklı danışman hesabı tanımlandı:
  1. **Ahmet Demir (Ücretsiz Üye):** Kullanıcı Adı: `ahmet` | Şifre: `Ahmet2026!`
  2. **Selin Yılmaz (Pro Üye 1):** Kullanıcı Adı: `selin` | Şifre: `Selin2026!`
  3. **Burak Kaya (Pro Üye 2):** Kullanıcı Adı: `burak` | Şifre: `Burak2026!`

### 2. 🔒 Ücretsiz Üye vs. Pro Üye Yetki Ayrımı & Paywall Penceresi
* **Ücretsiz Üyelik:** Aktif portföylerini yönetebilir, müşterilerine 12 haneli mülk takip kodu gönderebilir ve **Bildirimler** sekmesini kullanabilir.
* **Pro Özellikler (`Mesajlar`, `Mülk Ajandam`, `Arıyorum!`, `Profilim`):** Ücretsiz üyede sol barda yanlarında **`PRO`** etiketiyle görünür; tıklandığında doğrudan **Ücretli Üyelik (Pro Paket)** tanıtım ve geçiş penceresi açılır.

### 3. 🧭 Sol Bar & İsimlendirme Sadeleştirmeleri
* Aktif portföylerin içindeki özel saha notları alanının adı **"Kişisel Notlar"** olarak güncellendi.
* Sol bardaki randevu ve takvim modülünün adı **"Mülk Ajandam"** olarak güncellendi.
* Sol bardaki *"Profil & Blog Düzenle"* sekmesi kaldırıldı; *"Kişisel Web Sitemi Gör"* sekmesinin adı **"Profilim"** olarak sadeleştirildi (düzenleme işlemi Profilim sayfasının içindeki *"Profili Düzenle"* butonuyla yapılır).
* Aktif portföylerdeki **"Paylaşıma Açık / Paylaşıma Kapalı"** switch'i danışmanın **Profilim (Kişisel Web Sitesi)** vitriniyle doğrudan bağlandı: switch kapalıysa diğer üyeler veya ziyaretçiler o portföyü danışmanın profilinde göremez.

### 4. 📦 5'li Yan Yana Ödeme Planları, 2 Adımlı Üyelik Akışı & Yeni Kurumsal Sayfalar
* **Ücretsiz Üyelik Limiti (3 Aktif Portföy):** Ücretsiz üyelik hakkı 3 aktif portföy olarak güncellendi.
* **5 Ödeme Planı Yan Yana (`#view-membership`):** *Ücretsiz üyelik, Pro, Takım Lideri Paketi, Broker / Ofis Paketi ve Kurumsal & Şube (25+)* paketleri sayfada 5 sütun halinde yan yana dizildi.
* **Paket Seçiminden Sonra Ayrı Sayfada Açılan Üyelik Formu (`#view-membership-form`):** *"Üye Ol"* sayfasında önce paket seçilir; herhangi bir pakete tıklandığında seçilen paket rozetiyle birlikte ayrı bir sayfada **"Yeni Danışman / Ofis Üyelik Formu"** açılır.
* **"Neden Mülkİzle?" (`#view-why-mulkizle`) ve "Hizmetlerimiz" (`#view-services`) Sayfaları:** Üst menüye eklendi; Danışmanlar, Mülk Sahipleri ve Alıcılar için faydalar ile Pro pakette sunulan 6 ana hizmet detaylandırıldı.
* **Kişisel Web Sitesi URL Yapısı:** Danışman kişisel web sitesi adresleri `/d/` olmadan doğrudan **`mulkizle.com/adiniz`** formatına geçirildi.
* **Üye Girişi Penceresi (`#agentLoginModal`):** Sağ üst köşedeki **`✕`** butonuyla kapanacak, sade **"Üye Girişi"** başlığı ve **"Giriş Yap"** butonuyla çalışacak şekilde temizlendi.
* **Preline UI / Tabler SaaS Tasarım Modernizasyonu & Mouse Geri/İleri Tuşu Desteği:** Tüm sayfalara modern SaaS kart/tipografi katmanı ve tarayıcı/mouse Geri-İleri tuşlarıyla sayfa geçişi sağlayan HTML5 `History API` (`pushState` / `popstate`) desteği eklendi.

---

## 📅 23 Kasım 2026 — Yeni Eklenen Özellikler

### 1. 🔔 Bildirimler Merkezi (Üye / Danışman Paneli & Sol Bar)
* **Sol Navigasyon Barı (`#igLeftSidebar`):** Çan ikonu ve üzerinde okunmamış bildirim sayısını gösteren kırmızı rozet (`#igSidebarNotifBadge`) eklendi.
* **4 Farklı Bildirim Kategorisi & Filtreleme (`#mode-notifications`):**
  1. **💬 Mesajlar:** Diğer üye emlakçılardan kişisel web sitesi veya ortak çalışma ağı üzerinden gelen mesaj bildirimleri *(Tıklayınca doğrudan Mesaj Kutusu açılır)*.
  2. **⏰ Ajanda Hatırlatmaları:** Danışmanın kendi ajandasına eklediği gün, tarih ve saatli randevuların hatırlatmaları *(Tıklayınca Ajandam ekranı açılır)*.
  3. **🔄 Mülk Sahibinin Yenileme Talebi:** Satıcının kendi takip ekranındaki **"Güncel Durum / Yenileme İste"** butonuna basarak gönderdiği güncelleme talepleri *(Tıklayınca ilgili portföy yönetim ekranı açılır)*.
  4. **🔍 Arıyorum! Bildirimleri:** Danışmanın uzmanlık bölgesiyle ilgili gelen yeni alıcı/paylaşım (Co-Op) eşleşmeleri ve taleplere gelen cevaplar *(Tıklayınca Arıyorum! sayfası açılır)*.
* **Hızlı İşlemler:** *"Tümünü Okundu İşaretle"*, kategori bazlı filtreleme ve tekil bildirim silme fonksiyonları eklendi.

---

### 2. 📅 Ajandam & Saha Planlayıcı (Üye / Danışman Paneli & Sol Bar)
* **Sol Navigasyon Barı (`#igLeftSidebar`):** Takvim ikonu ile **"Ajandam"** (`#igNavAgenda`) menü öğesi eklendi.
* **Gün, Tarih ve Saatli Not & Randevu Girişi (`#mode-agenda`):**
  * Tarih (`YYYY-AA-GG`) seçildiğinde otomatik olarak Türkçe tarih ve **gün adı** (*Örn: 23 Kasım 2026 • Pazartesi*) hesaplanır.
  * **Saat seçimi** (*Örn: 14:30*) ve **Kategori** (*Yer Gösterimi, Mülk Sahibi Görüşmesi, Tapu & Sözleşme, Çekim & Pazarlama, Genel Randevu / Not*) desteği eklendi.
  * **Portföy Bağlantısı:** İsteğe bağlı olarak aktif bir portföyle ilişkilendirilebilir; ajanda kartından tek tıkla ilgili portföy kartına geçiş yapılabilir.
  * **Bildirim Entegrasyonu:** Yeni ajanda notu kaydedilirken *"Bildirimler merkezine ajanda hatırlatması olarak da düşsün"* kutucuğu işaretliyse otomatik olarak Bildirimler'e düşer.
  * **Durum Filtreleri:** *Tümü, Bugün, Bekleyenler, Tamamlananlar* sekmeleri ve tamamlandı (`✓`) işaretleme kutucuğu eklendi.

---

### 3. 📷 Kişisel Blog Yazılarım & Bölge Analizlerim — Fotoğraf Desteği
* **Yeni Blog Yazısı Formu (`#mode-profile`):**
  * Danışman blog yazısı veya bölge analizi paylaşırken isterse **"📷 Bilgisayardan Fotoğraf Seç"** butonuyla cihazından görsel yükleyebilir veya görsel URL'si yapıştırabilir.
  * Yayınlamadan önce fotoğrafın küçük önizlemesi görünür ve istenirse kaldırılabilir (fotoğraf zorunlu değildir, sadece metin olarak da yayınlanabilir).
* **Mevcut Yazıları Güncelleme:**
  * Daha önce yayınlanmış blog yazılarının altına **"📷 Fotoğraf Ekle / Fotoğrafı Değiştir"** ve **"Fotoğrafı Kaldır"** butonları eklendi.
* **Kişisel Web Sitesi Vitrini (`#view-agent-profile`):**
  * Fotoğraf eklenen blog yazıları, danışmanın Kişisel Web Sitesindeki **"Bölge Yazıları"** sekmesinde üst kısmında kapak fotoğrafıyla sergilenir.

---

### 4. 🤝 Portföy Bazlı "Paylaşıma Açık / Kapalı" Switch & Arıyorum! (81 İl • İlçe • Semt • Mahalle + Özel Mesajla Portföy Gönderimi)
* **Aktif Portföylerim — Portföy Bazlı Paylaşım Switch'i (`#mode-portfolios`):**
  * Her aktif portföy kartının üzerinde o portföye özel **"Paylaşıma Açık / Paylaşıma Kapalı"** switch'i yer alır.
* **Sahibinden Tarzı `İl → İlçe → Semt (Bölge) → Mahalle` 4 Kademeli Konum Yapısı:**
  * **Profil & Uzmanlık Bölgesi (`#mode-profile`):** Danışman uzmanlığını **Semt (Bölge)** olarak seçtiğinde (*Örn: Çankaya → Çayyolu Semti*), o semte bağlı tüm alt mahalleleri (*Alacaatlı, Konutkent, Yaşamkent, Ümitköy, Çayyolu, Koru vb.*) otomatik olarak kapsar. Profil düzenleme ekranına hızlı **"Semt (Bölge) Seçerek Uzmanlığıma Ekle"** aracı eklendi.
  * **Yeni Mülk Takip Kodu Sihirbazı (`#newPortfolioModal`):** Konum seçimi `İl → İlçe → Semt / Bölge → Mahalle` olarak 4 kademeye çıkarıldı.
  * **Arıyorum! Tıklayınca Açılan Talep Formu & 4'lü Filtreleme (`#view-ariyorum`):**
    * Talep açma ekranı sağ üstteki **"+ Yeni Arama Talebi Aç"** butonuna tıklayınca açılır.
    * Hem talep açarken hem de mevcut talepleri filtrelerken **İl (81 İl) • İlçe • Semt / Bölge • Mahalle** seçilebilir. Semt genel seçildiğinde o semtin tüm mahalleleri de altında listelenir.
    * Üye `"Çayyolu"` semtinde uzmanım dediğinde, `"Alacaatlı Mah."` veya `"Konutkent Mah."` için açılan bir talep otomatik olarak **"🔔 Uzmanlık Semtinizle Eşleşiyor"** olarak işaretlenir ve bildirimlerine düşer.
* **"📤 Aktif Portföyümü Gönder" (Herkese Açık Görünmez, Talep Açanın Mesaj Kutusuna Düşer):**
  * Her talebin yanında **"📤 Aktif Portföyümü Gönder"** butonu yer alır. Danışman aktif portföyünü seçip gönderdiğinde kimse görmez; doğrudan **talep açan danışmanın özel Mesaj Kutusuna** düşer.

---

### 5. 🤝 Ortak Çalışma ve Görev Takip Dosyaları
* **`ORTAK_CALISMA_REHBERI.md`:** Gencay (İçerik & Emlak İş Kurgusu) ve Abisi (UI/UX, Tasarım & Mobil Uygulama) arasındaki görev/dosya sınırlarını ve GitHub (`pull` → `commit` → `push`) çalışma düzenini anlatan rehber eklendi.
* **`TODO.md`:** UI/UX, Mobil Uygulama ve İçerik yapılacaklar listesi ile karşılıklı istek/not köşesi eklendi.
