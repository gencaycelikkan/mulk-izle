# 🚀 Mülkİzle (`mulkizle.com`) — Son Güncellemeler ve Sürüm Notları

Bu dosya projede yapılan yeni özellikleri, arayüz eklemelerini ve yapısal değişiklikleri abinizle ve ekiple şeffaf şekilde takip edebilmek için oluşturulmuştur.

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
