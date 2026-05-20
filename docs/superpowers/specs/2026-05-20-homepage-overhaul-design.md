# AllMySell Ana Sayfa Overhaul Tasarım Şartnamesi (Design Specification)

Bu doküman, AllMySell ana sayfasının (Landing Page) tamamen fütüristik, modern ve animasyonlu bir **Cyber-SaaS** tasarım diline dönüştürülmesi için hazırlanan teknik tasarım planını içerir.

## 🛠️ Tasarım Stili ve Renk Paleti (Cyber-SaaS)
* **Arka Plan:** Derin uzay laciverti (`#02040a`), saf siyah (`#000000`).
* **Vurgu Renkleri:** Neon Turuncu (`#F97316` / AllMySell ana rengi), Mor/Eflatun (`#A855F7`), Zümrüt Yeşili (`#10B981`).
* **Buzlu Cam (Glassmorphism):** Yarı şeffaf paneller, ince sınır çizgileri (`border-white/5` veya `border-white/10`), `backdrop-blur-xl` arka plan bulanıklığı.

---

## 📺 Adım Adım Yapılacak Geliştirmeler

### 1. Global Siber Atmosfer & Arka Plan
* **Siber Izgara (Cyber Grid):** Sayfanın arka planına süzülen yarı şeffaf bir 3D grid deseni yerleştirilecek.
* **Glow Orbs (Işık Küreleri):** Ekranın farklı köşelerinde yavaşça renk değiştiren ve hareket eden büyük blur efektli turuncu ve mor ışık küreleri yer alacak.
* **Dinamik Partiküller:** `Particles` bileşeni güncellenerek daha optimize ve akıcı bir şekilde çalışması sağlanacak.

### 2. Hero (Giriş) Bölümü (`HeroSection.tsx`)
* **Yapay Zeka Çekirdeği Görseli (Hero Visual):** `generate_image` ile oluşturulacak ultra premium fütüristik bir "Yapay Zeka Analiz Çekirdeği" görseli Hero alanının sağ tarafına (veya mobil uyumlu şekilde merkeze) yerleştirilecek.
* **Akıcı Giriş Animasyonları:**
  * Harf harf parlayan "ALLMYSELL" başlığı.
  * Butonlarda hover durumunda genişleyen neon mor/turuncu gölge dalgaları (`box-shadow: 0 0 30px rgba(249, 115, 22, 0.4)`).
  * Framer Motion ile scroll-reveal (yukarı doğru süzülerek ekrana gelme) animasyonları.

### 3. Komuta Merkezi Panel Simülatörü (`HomePageSections.tsx`)
* **Canlı Dashboard Görseli:** Ekran görüntüsündeki boş taslak şema yerine, yapay zekanın Etsy ve eBay sniper ekranlarını, ürün listelerini ve grafiklerini içeren canlı bir **Futuristic E-com Sniper Dashboard** görseli üretilip entegre edilecek.
* **Neon Sınır Çizgisi Akışı:** Dashboard panelinin çevresinden parlayarak akan neon bir ışık demeti (`BorderBeam`) eklenecek.
* **3D Tilt Efekti:** Kullanıcı fareyi üzerine getirdiğinde panel hafifçe 3D perspektifle farenin yönüne doğru yatacak.

### 4. Operasyonel Avantajlar (Operational Advantage)
* **Magic Cards Entegrasyonu:** Kartlar, farenin hareketine göre neon turuncu ve mor renkte parlayan dinamik sınırlara kavuşacak.
* **Mikro İkon Animasyonları:** Lucide ikonları, hover olunduğunda dönme, büyüme veya nabız gibi atma (pulse) hareketleri yapacak.

### 5. Deneyim Paylaşım (Testimonial) Formu
* **Terminal Arayüzü:** Form alanı, yeşil ve turuncu parlayan fütüristik bir terminal ekranına dönüştürülecek.
* **Giriş Animasyonları:** Yazı kutularına tıklandığında (focus) sınır çizgileri neon mor-turuncu geçişli bir gradyanla parlayacak.

---

## 🔬 Doğrulama ve Test Planı
* **Performans:** Google Lighthouse testinde 90+ puan hedefi. `Framer Motion` animasyonlarının GPU hızlandırmalı çalışması sağlanacak (`will-change`).
* **Mobil Uyumluluk:** Responsive tasarım testleri (iPhone, iPad, Masaüstü).
* **i18n Uyumluluğu:** Türkçe ve İngilizce dillerinin arayüzde bozulmadan çalışması sağlanacak.
