# 📋 Mülkİzle (`mulkizle.com`) — Ortak Yapılacaklar Listesi (TODO)

Bu dosya **Gencay (İçerik & Emlak Kurgusu)** ve **Abisi (UI/UX & Mobil Uygulama)** arasındaki ortak görev takip tablosudur.
* Tamamlanan maddelerin başındaki `[ ]` işaretini `[x]` olarak güncelleyebilirsiniz.
* Birbirinizden istediğiniz tasarım veya metin taleplerini ilgili başlığın altına ekleyebilirsiniz.

---

## 🎨 1. UI/UX ve Tasarım Görevleri (Abisi)

### Genel Arayüz & Responsive (Mobil Uyum)
- [ ] Tüm ekranların gerçek mobil telefon çözünürlüklerinde (`375px` - `430px`) taşma veya kayma olmadan görünmesinin kontrol edilmesi (`styles.css`)
- [ ] Üst menü ve Danışman Sol Navigasyon (`#igLeftSidebar`) menüsünün mobil cihazlarda alt bar (bottom navigation) veya açılır çekmece (drawer) olarak optimize edilmesi
- [ ] **Ana Sayfa (Girişsiz):** Hero alanı, 12 haneli takip kodu sorgulama kutusu ve paket kartlarının görsel hiyerarşisinin iyileştirilmesi
- [ ] **Danışman Paneli:** Yatay akordeon portföy listesinin ve 5 alt sekmenin (`Süreç & Mülk Günlüğü`, `Mülk`, `Detaylı Pazar Analizi`, `Teklifler & Yer Gösterimi`, `Sözleşmeler`) mobilde rahat kullanılabilir hale getirilmesi
- [ ] **Satıcı & Alıcı Takip Ekranları:** Kargo takip tarzı zaman çizelgesi (timeline) ve süreç adımlarının görsel tasarımının parlatılması
- [ ] **Kişisel Web Sitesi Görünümü:** Danışman dijital vitrin sayfasının (Sahibi / Diğer Üye / Üye Olmayan görünümleri) tasarım kontrolü

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

## 💬 4. Karşılıklı İstek & Not Köşesi

> **Kullanım:** Gencay tasarım/buton ihtiyacı duyduğunda aşağıya yazar; Abisi bir ekran için metin/içerik ihtiyacı duyduğunda aşağıya yazar.

### Gencay'dan → Abisine (UI / Mobil İstekleri)
- [ ] *(Örnek: Şu ekrandaki buton mobilde çok küçük kalıyor, büyütelim)*

### Abisinden → Gencay'a (İçerik / Metin İstekleri)
- [ ] *(Örnek: Mobil uygulama açılış ekranı için 1 cümlelik slogan lazım)*
