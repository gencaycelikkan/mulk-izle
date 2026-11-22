# 📦 Mülkİzle (`mulkizle.com`) — Proje Dokümantasyonu ve Yol Haritası (v2)

> **Kurucu Fikir:** Gencay Çelikkan  
> **Konsept:** Emlak danışmanı, satıcı (mülk sahibi) ve potansiyel alıcıyı tek platformda buluşturan; kargo takibi gibi özelleştirilebilir pazarlama süreci, çapraz filigranlı medya, 360° sanal tur, mülk günlüğü ve esnek yetki sözleşmesi sunan PropTech SaaS uygulaması.

---

## 1. Üç Panelli Sistem Mimarisi

1. **🛠️ 1. Panel — Emlakçı (Danışman) Yönetim Paneli:**
   * **Hızlı Hizmet Seçici & Kronolojik Sıralama:** Mülk takip kartı açarken yapılacak hizmetler (Branda asılması, Drone çekimi, 360° Matterport, El ilanı dağıtımı, Reels videosu vb.) kutucuklarla seçilir; listede olmayan özel hizmetler eklenir ve kronolojik sıraya dizilir.
   * **Otomatik Çapraz Filigranlı (Watermark) Medya & 360° Tur:** Yüklenen fotoğraf ve videoların üzerine çapraz şekilde **Danışman Adı Soyadı + Telefon Numarası** basılır (HTML5 Canvas ile filigranlı PNG olarak indirilebilir). Matterport 360° linki gömülebilir.
   * **Mülk Günlüğüm (İkili Not Yapısı):**
     * 🔒 *Sadece Bana Özel (Gizli Not):* Danışmanın kendi strateji/pazarlık ajandasıdır, satıcı göremez.
     * 👁️ *Satıcının Göreceği Not:* Yapılan saha çalışmalarının (branda asıldı, el ilanı dağıtıldı vb.) satıcı ekranında kronolojik görünmesini sağlar.
   * **Esnek Yetki Belgesi Yönetimi (Zorunlu Değil!):**
     1. *Sözlü Yetki / Yetki Belgesi Yok:* Yetki belgesi imzalanmadan pazarlanan mülkler için zorunluluk yoktur.
     2. *Hazır Sözleşme Taslağını PDF / Çıktı Al:* Seçilen hizmetleri içeren resmi sözleşme taslağını tek tıkla yazdırıp ıslak imza alma.
     3. *İmzalı Belgeyi Kendim Yükleyeceğim:* Islak imzalı sözleşmenin fotoğrafını/PDF'ini sisteme yükleme.
     4. *Mobil Onay (SMS OTP):* Mülk sahibinin kendi ekranından SMS doğrulama kodu ile onaylaması.

2. **🏠 2. Panel — Satıcı (Mülk Sahibi) Canlı Takip Paneli:**
   * Sadece o mülk için seçilen **kronolojik hizmet adımlarını** kargo takip çubuğunda canlı izler.
   * Sahibinden görüntülenme/favori (emlakçı tarafından girilir) ve Instagram Reels izlenme/beğeni (Instagram Graph API veya manuel) istatistiklerini görür.
   * Danışmanın **Satıcıya Açık Mülk Günlüğü** notlarını, **360° sanal turu**, **çapraz filigranlı fotoğrafları** ve **gelen alıcı taleplerini** takip eder.
   * İsteğe bağlı olarak bekleyen yetki sözleşmesini mobil onaylar veya PDF taslağını indirir.

3. **🤝 3. Panel — Alıcı (Vitrin, 360° Tur & Teklif) Paneli:**
   * Potansiyel alıcının mülkün **çapraz filigranlı fotoğraflarını**, **360° Matterport sanal turunu** ve fiyat/bölge bilgilerini incelediği dijital sunum ekranıdır.
   * Alıcı bu ekrandan **"🏠 Yerinde Gösterim Randevusu"** veya **"💰 Resmi Fiyat Teklifi"** gönderdiğinde talep anında Emlakçı ve Satıcı panellerine düşer.

---

## 2. Veri Kaynakları ve API Durumu

* **Sahibinden.com Verileri:** Sahibinden.com'un dışarıya açık resmi bir API'si olmadığından görüntülenme ve favori sayıları emlak danışmanı tarafından panelden güncellenir.
* **Instagram Reels Verileri:** İşletme/Profesyonel Instagram hesapları için **Instagram Graph API** üzerinden Reels izlenme ve beğeni sayıları otomatik çekilebilir veya danışman tarafından manuel girilebilir.
* **Mobil Onay & Kimlik Doğrulama:** Netgsm / İleti Merkezi SMS OTP + TÜBİTAK Zaman Damgası ve e-Devlet EİDS çapraz kontrolü veya ıslak imzalı belge yükleme ile çalışır.
