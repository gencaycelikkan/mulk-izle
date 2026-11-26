# 📋 Mülkİzle (`mulkizle.com`) — Ortak Yapılacaklar Listesi (TODO) & Adım Adım Yol Haritası

Bu dosya **Gencay (İçerik & Emlak Kurgusu)** ve **Abisi (UI/UX & Mobil Uygulama)** arasındaki ortak görev takip tablosudur.
* Tamamlanan maddelerin başındaki `[ ]` işaretini `[x]` olarak güncelleyebilirsiniz.
* Dağınıklığı önlemek için her oturumda **tek bir ekran / tek bir özellik** seçilip tamamlandıktan sonra bir sonrakine geçilir.

---

## 🚨 Öncelikli Yeni Özellik Talepleri (Gencay — Sıradaki Geliştirmeler)

- [x] **1. Tekil Alıcı Mülk Takip Kodu Sistemi (Aynı Portföy İçin Her Alıcıya Ayrı Kod):**
  - Aynı portföy için birden fazla alıcıya **aynı mülk takip kodu gitmeyecek**; her alıcıya özel tekil takip kodu üretilecek (böylece hangi alıcının incelediği, teklif verdiği veya yer gösterimi onayladığı kişi bazlı takip edilecek).
- [x] **2. "Potansiyel Alıcılarım" Havuzu (Satılan Portföyün Alıcılarını Aktarma):**
  - Bir portföy için birden fazla alıcıya mülk takip kodu atıldığında ve o portföy satıldığında (veya kapatıldığında), o portföyle ilgilenmiş diğer tüm alıcıların iletişim ve bütçe/tercih bilgileri otomatik olarak danışmanın **"Potansiyel Alıcılarım"** bölümüne aktarılacak; sol menüde/panelde böyle özel bir bölüm açılacak.
- [x] **3. Mülk Arama ve Portföy Sistemine "Arsa" Kategorisi Eklenmesi:**
  - Mülk arama (`Arıyorum!`) ve portföy oluşturma ekranlarına Konut dışında **İmarlı Arsa** (İl/İlçe/Semt/Mahalle + Ada/Parsel, İmar Tipi, Hisseli Tapu, Alan $m^2$, Hmax, Maksimum Kat İzni, TAKS, KAKS/Emsal, Yapılaşma Durumu, Olanaklar ve Manzara) seçeneği eklendi.
- [x] **4. Arıyorum!'dan Mesajla Gelen Portföyün Tıklanabilir Olması:**
  - `Arıyorum!` talebine karşılık bir danışman **"📤 Aktif Portföyümü Gönder"** dediğinde ve bu portföy talep sahibinin **Mesajlar** kutusuna düştüğünde, mesaj içindeki portföy kartı/kodu **tıklanabilir** olacak; tıklandığında ilgili portföyün detay/katalog ekranı açılacak.
- [x] **5. Üye Olma ve Üye Girişi Ekranlarına "Ben Robot Değilim" Kutucuğu:**
  - Yeni Danışman / Ofis Üyelik Formuna (`#view-membership-form`) ve Üye Girişi penceresine (`#agentLoginModal`) bot/spam koruması için **"Ben robot değilim"** onay kutucuğu eklendi.

---

## 🧭 "%70 Görsel Anlatım / %30 Kısa Metin" 7 Adımlı Çalışma Programı

> **Tasarım Prensibi:** Hiçbir sayfada uzun paragraflar veya yorucu metin duvarları olmayacak. Her özellik **%70 görsel bileşenlerle** (mini ekran maketleri, canlı ilerleme çubukları, ikonlu durum etiketleri, görsel kartlar) ve **%30 tek cümlelik net başlıklarla** anlatılacak.

- [x] **1. ADIM: Vitrin & Tanıtım Sayfaları (%70 Görsel Dönüşüm Tamamlandı ✅)**
  - *Ana Sayfa:* 3 Adımda Nasıl Çalışır? (mini ekran maketli), görsel etiketli 3 değer kartı, tek tıkla açılan kısa SSS ve arka planda aktif çalışan (görünümde gizli) sayaçlar.
  - *Neden Mülkİzle?:* Danışman, Mülk Sahibi ve Alıcı kartlarına mini ekran maketleri, tek satırlık maddeler ve doğrudan canlı önizleme butonları eklendi.
  - *Hizmetlerimiz:* 6 Bento kartına `ÜCRETSİZ + PRO` / `PRO PAKET` rozetleri ve görsel mini widget önizlemeleri eklendi.
  - *Biz Kimiz? & Global Footer:* 4'lü görsel güven kartı (KVKK, SMS Kilit, TürkPatent/Filigran, 81 İl Ağı), iletişim şeridi ve 4 sütunlu kurumsal Footer eklendi.
- [x] **2. ADIM: Üye Ol (5'li Paket Seçimi) → Ayrı Sayfada Üyelik Formu & Üye Girişi (Tamamlandı ✅)**
  - 5'li paket kartlarına görsel ikonlar, kullanıcı/portföy kota rozetleri ve 2 adımlı görsel ilerleme çubuğu (`1. Paket Seçimi → 2. Üyelik Formu`) eklendi.
  - Ayrı sayfada açılan üyelik formuna **Seçilen Paket Görsel Özet Barı** ve hem üyelik formuna hem de Üye Girişi penceresine **"Ben robot değilim" (`Mülkİzle Shield`)** doğrulama kutucuğu eklendi.
- [x] **3. ADIM: Yeni Mülk Takip Kodu Oluşturma Sihirbazı (`+` Butonu) & Arıyorum! İmarlı Arsa Seçimi (Tamamlandı ✅)**
  - En başta İl • İlçe • Semt • Mahalle + Ada / Parsel seçimi ile `🏠 Konut` ve `🗺️ İmarlı Arsa` (İmar Tipi, Hisseli Tapu, Alan $m^2$, Hmax, Kat İzni, TAKS, KAKS/Emsal, Yapılaşma Durumu, Olanaklar, Manzara) seçenekleri hem Yeni Portföy Sihirbazına hem de `Arıyorum!` talep açma ekranına eklendi.
- [x] **4. ADIM: Aktif Portföylerim, Tekil Alıcı Kodları & "Müşteri & Referans Havuzum" Bölümü (Tamamlandı ✅)**
  - Her portföy içinde her alıcıya ayrı 12 haneli tekil takip kodu üretme, kişi bazlı inceleme sayacı, WhatsApp'tan kod gönderme ve tekil alıcı koduyla giriş doğrulaması eklendi.
  - Sol menüye **"Müşteri & Referans Havuzum"** (`#igNavPotentialBuyers`) eklendi; bir portföy satıldığında **Mülk Sahibi (Satıcı)** ve **Evi Satın Alan Alıcı** otomatik olarak **"Referans Müşterilerim (Ev Sattıklarım / Aldırdıklarım)"** sekmesine (WhatsApp Bayram tebriği, hal-hatır sorma şablonları, arama kutusu ve telefonla arama takibiyle), evi alamayan diğer alıcılar ise eski mülkün özellikleri ve notlarıyla **"Potansiyel Alıcılarım"** sekmesine aktarılıyor.
- [x] **5. ADIM: Mülk Sahibi (Satıcı) & Alıcı Katalog Ekranları (Tamamlandı ✅)** (*%70 görsel 4'lü performans şeridi, zaman tüneli, gelen teklif onay/red ve yer gösterimi randevu kartları, galeri ve tek sayfa katalog künyesi*)
- [x] **6. ADIM: Danışman Günlük Operasyon Araçları (Tamamlandı ✅)** (*Bildirimler, Mesajlar [tıklanabilir görsel portföy kartı dahil], Mülk Ajandam 4'lü görsel özet barları*)
- [x] **7. ADIM: Pro Network Özellikleri (Tamamlandı ✅)** (*Arıyorum! [Günlük 5 talep spam limiti + Taleplerim sekmesi + Konut/Arsa/Tarla filtreli görsel talep kartları] ve Profilim `mulkizle.com/adiniz` [Arıyorum! özelliği kişisel web sitesinden gizlendi]*)

---

## 🏗️ Sıradaki Büyük Vizyon: İnşaat Projeleri & Satış Ofisleri Özel Paketi (Ayrı Fiyatlandırma)

> **Not:** Müteahhit / İnşaat Firması Satış Ofisleri ve birden fazla şantiyenin satış ofisini işleten Kurumsal Emlak Ofisleri (Örn: *Realty World Çizgi Gayrimenkul gibi 4 ayrı şantiyenin satış ofisini yöneten ofisler*) için bireysel paketlerden bağımsız, **daire (bağımsız bölüm) sayısına göre ayrı fiyatlandırılacak** kurumsal modül yol haritası:

- [ ] **1. İki Farklı İşletme Modu ("Müteahhit Kendi Satış Ofisi" vs. "Çoklu Proje Yöneten Yetkili Emlak Ofisi"):**
  - **Mod A — Müteahhit Kendi Satış Ofisi:** Tek veya çoklu projesini kendi bünyesindeki satış müdürü, satış danışmanları ve şantiye şefiyle yönetir.
  - **Mod B — Çoklu Şantiye Yöneten Emlak Ofisi (Örn: 4 Ayrı Şantiyenin Satış Ofisini İşleten Broker/Ofis):**
    - Üstte **"🏗️ Aktif Şantiye / Proje Seçici"** barı yer alır (`1. Şantiye: Çizgi Panorama` | `2. Şantiye: Bağlıca Konakları` | `3. Şantiye: İncek Prestij` | `4. Şantiye: Gölbaşı Villaları`).
    - **Her Şantiyenin Müteahhidine Özel İzole Patron Kodu / Ekranı:** 1. şantiyenin müteahhidi girdiğinde **sadece kendi şantiyesinin** satışlarını, sıcak müşterilerini ve haftalık raporunu görür; emlak ofisinin yönettiği diğer 3 şantiyeyi kesinlikle göremez!
    - **Ortak Alıcı Havuzu & Çapraz Proje Önerisi (Cross-Sell):** 1. şantiyeye gelen alıcıya daire uymadıysa, satış müdürü tek tıkla o müşteriyi kendi işlettiği 2. veya 3. şantiyeye yönlendirebilir.
- [ ] **2. 4 Rol & Yetki İzolasyonu + Silinemez "Kara Kutu" Denetim Logu (Audit Log):**
  - **👑 1. Müteahhit (Patron Ekranı):** Karmaşık form doldurmaz; sadece 4 büyük KPI kartını (Gelen Müşteri, Sıcak/Opsiyonlu/Satılan Daire, Danışman Performans Tablosu) görür ve tek tuşla **Haftalık PDF / WhatsApp Raporu** alır.
  - **🎼 2. Satış Ofisi Müdürü (Orkestra Şefi):** Tüm satış danışmanlarının müşterilerini görür, kendi VIP müşterilerini girebilir, müşterileri satış danışmanlarına **atama/devretme** yetkisine sahiptir ve hangi emlakçının "Onaylı Paydaş" olacağına karar verir.
  - **🧑‍💼 3. Satış Danışmanı (Sorumlu):** Yalnızca **kendi müşterilerini** görür (müşteri listesini kopyalayıp götüremez). Kayıt açarken girdiği telefon numarası başka bir danışmanda kayıtlıysa sistem **"⛔ Bu müşteri [Tarih/Saat] itibarıyla [Danışman Adı] adına kayıtlıdır, mükerrer kayıt açılamaz!"** uyarısı verir. Kayıt silemez ve başka danışmana devredemez.
  - **ヘルメット 4. Şantiye Şefi (Saha & Teslim Sorumlusu):** Müşteri bütçelerini ve satış fiyatlarını görmez. Sadece genel inşaat aşamalarını ve daire bazlı termin/eksik checklist'ini yönetir.
  - **🛡️ Silinemez Kara Kutu Log:** Birden fazla müdür veya danışman olduğunda; kimin hangi gün/saatte kayıt açtığı, kimin hangi müşteriyi hangi danışmana devrettiği veya pasife/silinenlere aldığı saniyesi saniyesine değiştirilemez log tablosunda tutulur.
- [ ] **3. Satış Ofisi Özel CRM & Stok Daire Matrisi Bağlantısı:**
  - Müşteri Adı Soyadı, Cep Telefonu, **🌡️ Sıcak / Ilık / Soğuk Alıcı** kategorizasyonu, kayıt gün/saati, kaydı açan satış sorumlusu, zaman damgalı görüşme geçmişi ve geri arama (follow-up) hatırlatması.
  - Müşteri kartında ilgilendiği **Blok / Kat / Daire No veya Daire Tipi (`2+1`, `3+1`, `4+1`, `Ticari`)** seçimi doğrudan **Canlı Blok / Daire Stok Matrisi (`🟢 Satışta` | `🟡 Opsiyonlu` | `🔴 Satıldı`)** ile entegre çalışır.
- [ ] **4. Emlakçı Kavgalarını Bitiren "Proje Paylaşım Şalteri" & "Onaylı Paydaş Emlakçı + Fiziki Gösterim Çift Onayı":**
  - Satış Ofisi Müdürü projeyi **`🔒 Paylaşıma Kapalı`** veya **`🤝 Sadece Yetki Verdiğim Paydaş Emlakçılara Açık`** olarak ayarlar.
  - Sırf WhatsApp'tan katalog attı diye müşteri sahiplenilmesini önlemek için: Paydaş emlakçı Mülkİzle'den müşteri adı/telefonu ve randevu saatini girerek **"⏳ Ön Kayıt / Takip Talebi"** açar; ancak müşteri emlakçıyla birlikte satış ofisine fiziki olarak gelip Satış Ofisi Sorumlusu ekrandan **"✓ Müşteri Satış Ofisine Geldi / Eşleşmeyi Onayla"** butonuna basmadığı sürece o kayıt resmiyet kazanmaz. Onaylandığında ise emlakçı 12 haneli ortak takip koduyla müşterisinin satış sürecini canlı izler.
- [ ] **5. İki Katmanlı İnşaat Termin Planı ("İç Termin Sayacı" vs. "Müşteri Kontrollü Takvim") & Online Proje Kataloğu:**
  - Proje açılırken standart inşaat adımları (*Ruhsat → Hafriyat → Temel → 1. Kat Betonu → Kaba İnşaat → Pencere & Dış Cephe → İnce İşçilik → Peyzaj → İskan & Teslim*) ve termin tarihleri seçilir.
  - **Katman 1 (Ekip İçi Gerçek Gün Sayacı):** Müteahhit, Müdür ve Şantiye Şefi kalan günleri ve iç gecikmeyi canlı sayaçla görür.
  - **Katman 2 (Alıcı Online Kataloğu — Gri Bölge Çözümü):** Müşterilerin %80 gecikmeden korkmaması için alıcı ekranında korkutucu kırmızı "Gecikti" alarmı çıkmaz; dönem/ay bazlı hedef gösterilir ve gecikme olduğunda Müdür tek tıkla kurumsal revize açıklaması (*Hava muhalefeti / Beton kürlenme güvenliği / Resmi kurum trafo-iskan süreci*) yayınlar.
  - Şantiye şefi veya satış ofisi bir adımın (Örn: *1. Kat Betonu Atıldı*) fotoğrafını yükleyip **Satış Müdürü "✓ Onayla & Katalogda Yayınla"** dediğinde tüm alıcıların 12 haneli Online Proje Kataloğundaki zaman tünelinde o adım fotoğraflı olarak tamamlanır.
- [ ] **6. Şantiye Şefi "Fotoğraflı Daire Teslim Checklist'i" ("Fotoğraf Yoksa Tamamlandı Yok!" Kuralı):**
  - Teslim aşamasına gelen her dairenin (`Örn: A Blok Daire 12`) içinde 7 maddelik teslim kontrol listesi (*1. Vestiyer & İç Kapılar, 2. Mutfak Dolabı & Ankastre, 3. Banyo & Duşakabin, 4. Parke & Süpürgelik, 5. PVC & Cam Balkon, 6. Kombi & Tesisat Testi, 7. İnce Temizlik*) yer alır.
  - Satış ofisi dairede eksik gördüğünde (*"Vestiyer takılmamış"*) tek tıkla girer; şantiye şefinin ekranına aciliyet sırasıyla düşer.
  - Şantiye şefi takılan vestiyerin **gerçek fotoğrafını çekip yüklemeden** o maddeyi `✓ Tamamlandı` olarak işaretleyemez! Böylece şantiye şefi telefon trafiğinden kurtulur, yanlış/eksik daire teslimi sıfırlanır.
- [ ] **7. Daire (Bağımsız Bölüm) Sayısına Göre Ayrı Fiyatlandırma (`1-30 Daire` | `31-100 Daire` | `101-300+ Daire`):**
  - Sabit paket yerine projenin daire sayısına göre kademeli fiyatlandırma + ekranda **"Daire Başına Aylık Maliyeti Gösteren Canlı Hesaplayıcı Kaydıracı (Slider)"** ve enflasyona karşı **Yıllık Peşin / 2-3 Yıllık Peşin Proje Lisansı** modeli.

---

## 🎨 1. UI/UX ve Tasarım Görevleri (Abisi)

### Genel Arayüz & Responsive (Mobil Uyum)
- [x] Tüm ekranların gerçek mobil telefon çözünürlüklerinde (`375px` - `430px`) taşma veya kayma olmadan görünmesinin kontrol edilmesi (`styles.css`)
- [x] Üst menü ve Danışman Sol Navigasyon (`#igLeftSidebar`) menüsünün mobil cihazlarda **Öneri 1 (Instagram/LinkedIn Modeli: Üst barda `Bildirimler + Mesajlar + Profilim + Çıkış`, Alt sabit barda `Portföyler + Arıyorum! + [＋ Kod Aç] + Müşteriler + Ajandam`)** olarak optimize edilmesi
- [x] **Ana Sayfa (Girişsiz):** Hero alanı, 12 haneli takip kodu sorgulama kutusu ve paket kartlarının görsel hiyerarşisinin iyileştirilmesi
- [x] **Danışman Paneli:** Yatay akordeon portföy listesinin ve 5 alt sekmenin (`Süreç & Mülk Günlüğü`, `Mülk`, `Detaylı Pazar Analizi`, `Teklifler & Yer Gösterimi`, `Sözleşmeler`) mobilde rahat kullanılabilir hale getirilmesi
- [x] **Satıcı & Alıcı Takip Ekranları:** Kargo takip tarzı zaman çizelgesi (timeline) ve süreç adımlarının görsel tasarımının parlatılması
- [x] **Kişisel Web Sitesi Görünümü:** Danışman dijital vitrin sayfasının (Sahibi / Diğer Üye / Üye Olmayan görünümleri) tasarım kontrolü

---

## 📱 2. Mobil Uygulama & Donanım Entegrasyonu (Abisi)

### PWA & Market Uygulaması (iOS / Android)
- [ ] Mevcut PWA altyapısının (`manifest.json` ve `sw.js`) gerçek mobil tarayıcılarda (Safari & Chrome "Ana Ekrana Ekle") test edilmesi
- [ ] Web uygulamasının **Capacitor** (veya tercih edilen hibrit/native mimari) ile iOS (`ios/`) ve Android (`android/`) projelerine sarılması
- [ ] Şu an `view-mobile-app` sekmesinde simülatör olarak çalışan 4 temel mobil özelliğin gerçek telefon donanımıyla bağlanması:
  - [ ] **Filigranlı Kamera:** Telefon kamerasından veya galeriden çekilen fotoğrafa Canvas üzerinde otomatik `mülkizle.com` + takip kodu filigranı basıp kaydetme
  - [ ] **Ekrana Dijital İmza:** Yer gösterme belgesi için telefon ekranında dokunmatik (touch) imza canvas'ının gerçek mobilde pürüzsüz çalışması ve PDF/görsel çıktısına eklenmesi
  - [ ] **Anlık Bildirimler (Push Notifications):** Danışman bir adımı tamamladığında mülk sahibine bildirim gönderilmesi altyapısı
  - [ ] **Saha & Hızlı Günlük:** Sahadayken tek dokunuşla sesli/yazılı mülk günlüğü notu ekleme deneyimi

---

## ✍️ 3. İçerik, Metinler ve Emlak İş Kurgusu (Gencay)

### Sayfa Metinleri & Kurumsal İçerik
- [ ] **Ana Sayfa (Landing):** Başlıklar, alt açıklamalar, değer önerileri ve "Nasıl Çalışır?" adımlarının metin kontrolü
- [ ] **Üyelik & Paketler:** Ücretsiz limit (4 portföy), Bireysel Danışman, Ofis ve 25+ Kurumsal paket fiyatlarının ve özellik maddelerinin son kontrolü
- [ ] **Biz Kimiz? (`view-about`):** Kurumsal tanıtım yazısı, vizyon ve iletişim bilgilerinin güncellenmesi

### Sektörel Veriler & Sözleşmeler
- [ ] **Hizmet Havuzu (`HAZIR_HIZMET_HAVUZU`):** Emlakçının seçebileceği standart pazarlama ve aracılık adımlarının isim ve sıralama kontrolü
- [ ] **8'li Sözleşmeler & Yetki Belgeleri:** `sözleşmeler/` klasöründeki sözleşme metinlerinin ve sistem içindeki dijital onay şablonlarının hukuki/sektörel kontrolü
- [ ] **Yeni Portföy Sihirbazı & Pazar Analizi:** Konut/Arsa/İşyeri özellik seçeneklerinin ve pazar analizi metinlerinin gözden geçirilmesi
- [ ] **Arıyorum! & Co-Op (Ortak Çalışma):** Emlakçılar arası portföy/alıcı paylaşım ekranındaki bilgilendirme metinlerinin netleştirilmesi

---

## 🛡️ 4. Canlıya Geçince Yapılacaklar (Veri Güvenliği, Bulut Veritabanı & KVKK Altyapısı)

> **Not:** Bu bölüm `mulkizle.com` gerçek sunucuya ve veritabanına bağlanırken (bkz. `ORTAK_CALISMA_REHBERI.md` Bölüm 5 ve `KVKK_AYDINLATMA_METNI.md`) sırasıyla tamamlanacak teknik güvenlik listesidir.

- [ ] **1. Bulut Veritabanı & Satır Bazlı Güvenlik (Supabase / Firebase RLS):**
  - `localStorage` yapısının Supabase (Avrupa/Frankfurt sunucusu) veya Firebase'e taşınması.
  - Mülk sahibi telefon numaraları ve kişisel notların yalnızca portföy sahibi danışman (`danisman_id`) tarafından okunabilmesini sağlayan **Row Level Security (RLS)** kurallarının yazılması.
  - Danışman şifrelerinin `Bcrypt / Auth` ile şifrelenerek (hashlenerek) saklanması.
  - **12 Haneli Takip Kodu Sıfır Çakışma Garantisi (`UNIQUE INDEX` + Rol Ön Eki):** Veritabanındaki `tracking_codes` tablosunda `code CHAR(12) PRIMARY KEY / UNIQUE` kısıtı tanımlanarak farklı danışmanların satıcı (`8/5` ön ekli), tekil alıcı (`3/4` ön ekli) ve Co-Op (`9` ön ekli) kodlarının sistem genelinde (ve geçmişte silinmiş kodlar dahil) çakışma ihtimalinin fiziksel olarak `%0` yapılması.
- [ ] **2. Cloudflare & 256-Bit SSL + Bot/Brute-Force Koruması:**
  - `mulkizle.com` alan adının Cloudflare arkasına alınarak zorunlu `HTTPS (256-Bit SSL)` aktif edilmesi.
  - 12 haneli takip kodu sorgulama ve giriş ekranlarına IP bazlı deneme limiti (Rate Limiting) ve gerçek Cloudflare Turnstile / reCAPTCHA bağlanması.
- [ ] **3. Gerçek WhatsApp Business API / SMS OTP Entegrasyonu:**
  - Üye girişi, yeni üyelik ve 12 haneli mülk takip kodu doğrulamasındaki tek kullanımlık doğrulama kodlarının gerçek WhatsApp API veya kurumsal SMS servisiyle gönderilmesi.
- [ ] **4. KVKK Onay Zaman Damgası (Timestamp) & Otomatik Veri İmha Politikası:**
  - Danışmanın üyelik formunda baştan sona scroll yaparak onayladığı KVKK metninin onay tarihi, saati ve IP adresinin veritabanına (`kvkk_approved_at`) kaydedilmesi.
  - Kapatılan veya satılan portföylerdeki müşteri telefon numaralarını yasal süre sonunda otomatik maskeleyen/anonimleştiren temizlik kuralının (`cron job`) kurulması.
- [ ] **5. Sadece Admin Yetkisine Özel "Anonim Bölge & Mülk Özellikleri Kapanış İstatistik Tablosu":**
  - Portföy silme anketinden (*Satıldı / Satılmadı*) toplanan kimliksiz daire/arsa/tarla özellikleri ve kapanış fiyat bandı (`₺/m²`) tablosunu (`#anonimBolgeEmsalTabloCard` / `anonim_bolge_emsal_havuzu`) sitede **hiçbir normal veya Pro üye görmeyecek**.
  - Bu tablo arka planda toplanmaya devam edecek ve canlıya geçildiğinde yalnızca **Süper Admin (`role = 'admin'`)** panelinde görüntülenecek; daha sonra karar verilecek stratejiye göre *Detaylı Pazar Analizi* veya *Arıyorum!* modüllerinde nasıl kullanılacağı belirlenecek.

---

## 💬 5. Karşılıklı İstek & Not Köşesi

> **Kullanım:** Gencay tasarım/buton ihtiyacı duyduğunda aşağıya yazar; Abisi bir ekran için metin/içerik ihtiyacı duyduğunda aşağıya yazar.

### Gencay'dan → Abisine (UI / Mobil İstekleri)
- [ ] *(Örnek: Şu ekrandaki buton mobilde çok küçük kalıyor, büyütelim)*

### Abisinden → Gencay'a (İçerik / Metin İstekleri)
- [ ] *(Örnek: Mobil uygulama açılış ekranı için 1 cümlelik slogan lazım)*
