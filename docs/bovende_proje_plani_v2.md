# Bovende.com Proje Planı & Teknik Yol Haritası

## 1. Marka Vizyonu ve Kapsam
**Bovende.com**, Allmysell çatısı altında geliştirilen, yapay zeka (AI) destekli bir eğitim teknolojileri (EdTech) ve SaaS platformudur. Farklı seviyelerdeki öğrenme ihtiyaçlarını tek bir noktada toplayarak, kullanıcıların bilgi edinme ve ezberleme süreçlerini oyunlaştırma ve otomasyonla hızlandırmayı amaçlar.

## 2. Temel Modüller (Özellikler)

### 2.1. Tematik Kelime Bulma Oyunu (Çocuklar & Başlangıç)
* **Amaç:** Çocukların temel kelime dağarcığını eğlenerek geliştirmesi.
* **İşleyiş:** Kullanıcı belirli bir niş (hayvanlar, meslekler, sayılar vb.) seçer. Sistem, bu kelimeleri öğretmek için oyunlaştırılmış bir arayüz sunar.
* **Geliştirme Metodu:** Cline ve OpenRouter üzerinden hızlı kodlama süreci.

### 2.2. Teknik Terminoloji ve Doküman Analizi (Akademik & Profesyonel)
* **Amaç:** Teknik metinlerin (örneğin uçak teknolojisi gibi alanlardaki PDF'lerin) içindeki ağır terminolojinin kolayca öğrenilmesi.
* **İşleyiş:** Kullanıcı makale veya PDF yükler. Yapay zeka metni analiz ederek terimleri ayıklar; otomatik olarak mini sınavlar, bilmeceler ve çeviri egzersizleri üretir.
* **Zamanlama:** Florida merkezli şirket kurulumu ve resmi operasyonların başlamasıyla devreye alınacak.

### 2.3. Derin Metin Ezberleme Asistanı (Özel İhtiyaçlar)
* **Amaç:** Belirli bir cümleyi, yazıyı veya uzun bir metni kelimesi kelimesine ezberlemek.
* **İşleyiş:** Kuran-ı Kerim ayetlerinden tiyatro repliklerine kadar her türlü metin için "aralıklı tekrar" ve kelime eksiltme yöntemleriyle hafıza desteği sağlar.
* **Altyapı:** Mevcut Supabase veritabanı yapısı üzerine inşa edilecek.

## 3. Teknik Mimari (Modern SaaS Stack)

| Bileşen | Teknoloji / Platform | Görevi |
| :--- | :--- | :--- |
| **Alan Adı (Domain)** | **Namecheap** | bovende.com tescili ve alan adı yönetimi. |
| **Frontend** | **Vercel + Next.js** | Minimalist ve premium UI tasarımı, hızlı deployment. |
| **Backend & Auth** | **Supabase** | Kullanıcı yönetimi, veritabanı (PostgreSQL) ve dosya depolama. |
| **AI Otomasyonu** | **DigitalOcean + n8n** | PDF analizi ve AI iş akışlarının yönetilmesi. |
| **AI Modelleri** | **OpenRouter (Cline)** | GPT-4, Claude vb. modellerin maliyet odaklı kullanımı. |
| **Güvenlik & DNS** | **Cloudflare** | Namecheap'ten yönlendirilen DNS'lerin yönetimi, SSL ve hızlandırma. |
| **Ödeme** | **Stripe** | Global abonelik ve ödeme altyapısı (Florida LLC üzerinden). |

## 4. Uygulama ve Geliştirme Yol Haritası

1.  **Kurulum:** Namecheap üzerinden alınan alan adının Cloudflare'e yönlendirilmesi ve Supabase'de bağımsız proje oluşturulması.
2.  **MVP Geliştirme:** Cline (OpenRouter) kullanılarak temel kullanıcı arayüzü ve 1. özellik (Çocuklar için oyun) kodlanacak.
3.  **Kurumsallaşma:** Florida şirketinin açılmasıyla Stripe entegrasyonu tamamlanacak ve 2. özellik (PDF Analizi) yayına alınacak.
4.  **Entegrasyon:** n8n iş akışları ile yapay zeka modellerinin veri işleme kapasitesi maksimuma çıkarılacak.
