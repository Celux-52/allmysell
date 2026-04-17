# AllMySell Python Automation Engine

Bu klasör, AllMySell projesi için geliştirilen otomatik araçların (botların) ve web kazıma (scraping) işlemlerinin bir **FastAPI** sunucusu üzerinden çalıştırılmasını sağlar. 

Next.js tabanlı ana web uygulaması (dashboard), bu FastAPI sunucusuna HTTP istekleri göndererek botları başlatır, durdurur ve anlık durumlarını sorgular.

## Kurulum ve Çalıştırma

### 1- Windows Script'i ile (Önerilen)
Klasör içindeki `start_bots.cmd` dosyasına çift tıklayarak veya terminal üzerinden çalıştırarak bot motorunu başlatabilirsiniz:
```bash
cd python
./start_bots.cmd
```
Bu script şunları otomatik yapar:
1. `venv` (Virtual Environment) oluşturur.
2. `requirements.txt` içindeki paketleri kurar.
3. FastAPI sunucusunu 8000 portunda başlatır.

### 2- Manuel Kurulum (Mac/Linux/Windows)
Eğer scripti kullanamıyorsanız:
```bash
cd python
python -m venv venv
# Windows için:
venv\Scripts\activate
# Mac/Linux için:
# source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoint'leri

Sunucu varsayılan olarak `http://localhost:8000` adresinde ayağa kalkar.
Tüm istekler headers içerisinde `x-api-key: dev_secret_key` taşımalıdır.

| Metot | Endpoint | Açıklama |
|-------|----------|----------|
| GET | `/` | API Durum Kontrolü |
| GET | `/api/bots/status` | Tüm çalışan botların anlık durumu |
| POST | `/api/bots/trend-hunter/start` | Trend bulucu botu (scraping) arka planda başlat |
| POST | `/api/bots/ebay-sync/start` | eBay eşitleme botunu arka planda başlat |
| POST | `/api/bots/{bot_id}/stop` | Çalışan bir botu durdur |

## Next.js Entegrasyonu
Next.js uygulaması üzerindeki `app/dashboard/automation` sayfasında yer alan arayüz, next.js server-side endpointleri üzerinden (`/api/automation/...`) doğrudan bu sunucuya bağlanarak haberleşir.

## Botların Geliştirilmesi
Kendi Python scraping (örn: BeautifulSoup, Selenium, vb.) mantığınızı `main.py` içerisindeki `run_trend_hunter_bot` veya `run_ebay_sync_bot` fonksiyonları içerisine entegre edebilirsiniz. İşlem sonuçlarını veritabanına doğrudan kaydetmek için `supabase` python kütüphanesi hazır kuruludur.
