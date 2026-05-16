# 🚀 AllMySell AI Intelligence Systems - Technical Guide

Bu dosya, AllMySell platformunun kalbi olan **Smart Research** ve **Etsy Sniper** botlarının çalışma mantığını, kullanılan yapay zeka mimarisini ve stabilite standartlarını özetler.

---

## 🧠 1. Mimari Genel Bakış
Sistem, "Single-Model Dependancy" (Tek Modele Bağımlılık) riskini ortadan kaldıran **Multi-Model Consensus (Çoklu Model Konsensüsü)** yapısı üzerine kurulmuştur. 

### Temel Modüller:
1.  **Smart Research (Akıllı Araştırma):** İnternet verisi, Google Trends ve Yapay Zeka analizini birleştirerek pazar analizi yapar.
2.  **Etsy Sniper (Etsy Avcısı):** Spesifik Etsy listelemelerini derinlemesine analiz ederek "Sat/Satma" kararı verir ve strateji üretir.

---

## 🤖 2. Yapay Zeka Katmanı (AI Stack)
Sistem, maliyet ve performans dengesini korumak için Mayıs 2026'nın en güncel modellerini kullanır.

### Kullanılan Modeller (Priority List):
-   **Primary:** `google/gemini-2.0-flash-001` (Dünyanın en hızlı ve zeki modellerinden biri).
-   **Reasoning:** `meta-llama/llama-3.3-70b-instruct` (Derin analiz ve mantık yürütme).
-   **Backup:** `openai/gpt-4o-mini` & `deepseek/deepseek-chat` (Kesintisiz hizmet için yedekler).

### Registry Yönetimi:
Tüm modeller `lib/ai/models.ts` üzerinden merkezi olarak yönetilir. Bir model piyasadan kalkarsa veya hata verirse, tek bir satır değişikliğiyle tüm platform güncellenebilir.

---

## 🛡️ 3. Stabilite ve Resilience (Dayanıklılık)
SaaS panelinin müşteri kaybetmemesi için şu önlemler alınmıştır:

-   **Tiered Failover:** Bir AI sağlayıcısı (OpenRouter) hata verirse veya kota dolarsa, sistem otomatik olarak sıradaki diğer 5 modele sırayla istek atar.
-   **Timeout Management:** 
    -   Bireysel AI istekleri: **20 Saniye**
    -   Toplam işlem limiti: **55 Saniye**
-   **Strict JSON Extraction:** AI'dan gelen ham metinlerin içindeki JSON verisi, özel regex ve temizleme algoritmalarıyla sökülür. Bu sayede "hatalı format" nedeniyle panellerin çökmesi engellenir.

---

## ⚡ 4. Performans Optimizasyonları
Platform, Vercel ve DigitalOcean gibi modern cloud ortamları için optimize edilmiştir:

1.  **On-Demand Execution:** Arka planda bakiye tüketen gereksiz "Cron Job"lar kaldırılmıştır. Sistem sadece müşteri istediğinde çalışır.
2.  **Hobby Plan Friendly:** Vercel'in 10 saniyelik limitlerini aşmamak için işlemler mümkün olan en hızlı modellerle (Flash serisi) yapılır.
3.  **Clean Architecture:** Blog ve TikTok gibi artık kullanılmayan eski modüller sistemden tamamen temizlenerek kod karmaşası bitirilmiştir.

---

## 🛠️ 5. Kurulum ve Bakım Notları
-   **API Key:** `OPENROUTER_API_KEY` her zaman pozitif bakiyeli (min $5) olmalıdır.
-   **Database:** Supabase/PostgreSQL şeması `prisma db push` ile her zaman senkron tutulmalıdır.
-   **Deployment:** DigitalOcean geçişi, AI analiz sürelerinin 60 saniyeye kadar çıkmasına izin vererek sistemin "daha zeki" raporlar üretmesini sağlar.

---

*Bu sistem, Celux-52 (AllMySell) için "Absolute Stability" prensipleriyle Antigravity AI tarafından optimize edilmiştir.*
