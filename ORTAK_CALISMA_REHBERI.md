# 🤝 Mülkİzle (`mulkizle.com`) — Ortak Çalışma ve GitHub Rehberi

Bu belge, **İçerik & Emlak İş Kurgusu (Gencay)** ile **UI/UX, Tasarım & Mobil Uygulama Entegrasyonu (Abisi)** süreçlerinin birbirine karışmadan, kod çakışması (conflict) yaşanmadan hızlı ve düzenli ilerlemesi için hazırlanmıştır.

---

## 1. Görev ve Sorumluluk Paylaşımı

| Alan | Sorumlu | Odaklanacağı Konular | Ana Çalışma Dosyaları |
| :--- | :--- | :--- | :--- |
| **İçerik, Sektörel Kurgu & Metinler** | **Gencay** | • Sayfa metinleri, başlıklar, tanıtım ve kurumsal yazılar<br>• Emlakçı hizmet havuzu (`HAZIR_HIZMET_HAVUZU`) ve süreç adımları<br>• 8'li Sözleşme / Yetki Belgesi metinleri ve hukuki şablonlar<br>• Paket isimleri, fiyatlandırma, özellik listeleri<br>• Örnek portföy verileri ve emlak iş akışı kuralları | • `sözleşmeler/` klasörü<br>• `app.js` içindeki veri/metin blokları (Hizmet havuzu, varsayılan portföyler, sözleşme şablonları)<br>• `index.html` içindeki statik metinler<br>• `TODO.md` (İçerik & iş kurgusu talepleri) |
| **UI/UX, Tasarım & Mobil Uygulama** | **Abisi** | • Renk paleti, tipografi, kart/buton tasarımları, modern SaaS estetiği<br>• Mobil uyumluluk (Responsive CSS - telefon/tablet görünümleri)<br>• iOS & Android mobil uygulama paketlemesi (Capacitor / WebView / Native)<br>• Gerçek telefon donanımı entegrasyonları (Filigranlı kamera, dokunmatik imza, Push bildirim, GPS)<br>• PWA (`manifest.json`, `sw.js`) geliştirmeleri | • `styles.css` (Tüm görsel tasarım ve mobil medya sorguları)<br>• `manifest.json` ve `sw.js`<br>• Eklenecek `android/` ve `ios/` mobil uygulama klasörleri<br>• `index.html` ve `app.js` içindeki UI bileşenleri ve mobil fonksiyonlar |

---

## 2. Projeyi İlk Kez Bilgisayara Kurma (Clone)

Projeye GitHub üzerinden davet kabul edildikten sonra bilgisayara indirmek için terminalde **sadece ilk seferde** şu komut çalıştırılır:

```bash
git clone https://github.com/gencaycelikkan/mulk-izle.git
cd mulk-izle
```

### Yerel Sunucuda (`localhost`) Çalıştırma
Proje saf HTML/CSS/JS mimarisinde olduğu için herhangi bir yerel HTTP sunucusuyla anında açılabilir:

* **Node.js ile:**
  ```bash
  npx serve -l 8080
  ```
* **Python ile:**
  ```bash
  python -m http.server 8080
  ```
* **VS Code / Antigravity ile:** "Live Server" eklentisiyle veya asistana *"localhostta başlat"* diyerek `http://localhost:8080` adresinden görüntülenebilir.

---

## 3. Günlük Altın Çalışma Kuralları (Çakışmayı Önlemek İçin)

İki kişi aynı proje üzerinde çalışırken kodların birbirini ezmemesi için şu **3 adımlı döngü** uygulanır:

### Adım 1: Kod Yazmaya Başlamadan HEMEN ÖNCE (`git pull`)
Bilgisayarı açıp tek bir satır bile değiştirmeden önce GitHub'daki en güncel hali bilgisayara çekin:
```bash
git pull
```
*(Böylece diğerinizin yaptığı son tasarım veya içerik değişiklikleri anında ekranınıza gelir).*

### Adım 2: Değişiklikleri Yapma ve Test Etme
* `http://localhost:8080` üzerinde üstteki **"Hızlı Ekran Geçişi"** barını kullanarak hem Danışman Panelini, hem Satıcı/Alıcı ekranlarını, hem de Kişisel Web Sitesi görünümlerini kontrol edin.

### Adım 3: İşi Bitirince GitHub'a Gönderme (`add` → `commit` → `push`)
Bir özelliği veya içerik düzenlemesini bitirdiğinizde bekletmeden GitHub'a gönderin:
```bash
git add .
git commit -m "Yapılan değişikliği özetleyen kısa not (Örn: Mobil menü CSS düzenlendi)"
git push
```
Gönderdikten sonra diğerinize *"Yeni değişiklikleri gönderdim, `git pull` yapabilirsin"* diye haber verin.

---

## 4. Çakışma (Conflict) Yaşamamak İçin Pratik İpuçları

1. **Aynı Anda Aynı Dosyanın Aynı Satırlarına Dokunmayın:**
   * Görsel tasarım ve mobil ekran düzeltmeleri mümkün olduğunca **`styles.css`** üzerinden yapılmalıdır.
   * Gencay `index.html` içinde büyük bir metin güncellemesi yaparken, abisi `styles.css` üzerinde çalışırsa **sıfır çakışma** yaşanır.
2. **Büyük Değişikliklerden Önce Haberleşin:**
   * Eğer `index.html` veya `app.js` içinde baştan aşağı büyük bir yapısal değişiklik yapılacaksa başlamadan önce haberleşin, o işlem bitip `push` edilene kadar diğer kişi o dosyada değişiklik yapmasın.
3. **İstekleri ve Yapılacakları `TODO.md` Dosyasına Yazın:**
   * Gencay bir ekranda yeni bir buton veya tasarım düzeltmesi istediğinde `TODO.md` içindeki **"UI/UX & Mobil İstekleri"** kısmına ekler.
   * Abisi bir bileşenin içine gerçek emlak metni veya sözleşme maddesi gerektiğinde `TODO.md` içindeki **"İçerik & Metin İstekleri"** kısmına ekler.
