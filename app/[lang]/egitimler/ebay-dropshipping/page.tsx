import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShoppingCart, TrendingUp, ShieldCheck, Rocket, ChevronRight, ShieldAlert, Truck, DollarSign, Users, Megaphone, Activity } from 'lucide-react';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'eBay Dropshipping Course & Consulting 2026',
      description: 'Learn how to build a highly profitable, automated eBay dropshipping business without inventory. Complete 6-module course and 1-on-1 consulting by Allmysell LLC.',
      keywords: 'ebay dropshipping course, dropshipping 2026, sell on ebay, dropshipping consulting, ecommerce training',
    },
    back: 'Back to Home',
    tag: 'E-Commerce Training & Consulting',
    title: 'Zero to Automated Empire: eBay Dropshipping 2026',
    subtitle: 'Stop guessing. Start building a data-driven global dropshipping business that runs on complete autopilot.',
    ctaPrimary: 'Apply for Consulting',
    ctaSecondary: 'Read Modules in Blog',
    intro: 'In 2026, traditional retail is dying while automated dropshipping is scaling globally. Our exclusive 6-module training package and 1-on-1 strategic consulting will teach you exactly how to find winning products, bypass strict eBay algorithms, and automate your entire fulfillment process.',
    modulesTitle: 'What You Will Learn',
    modules: [
      { id: 1, title: 'Platform Mastery', desc: 'Understanding the 2026 eBay ecosystem and the Dropshipping business model.' },
      { id: 2, title: 'Safe Account Setup', desc: 'Step-by-step Payoneer integration and "Cookie Warming" to avoid suspensions.' },
      { id: 3, title: 'Winning Products', desc: 'Data-driven sourcing using Zik Analytics to find high-demand, low-competition items.' },
      { id: 4, title: 'Cassini SEO', desc: 'Hacking the eBay search algorithm with perfect titles and Item Specifics for max visibility.' },
      { id: 5, title: 'Order Fulfillment', desc: 'Automating orders, managing tracking numbers, and handling returns safely.' },
      { id: 6, title: 'Scaling to $10k+', desc: 'Smashing selling limits, Promoted Listings, and hiring Virtual Assistants (VAs).' },
    ],
    risksTitle: 'Common Pitfalls & How We Solve Them',
    risksSubtitle: 'Do not fall for fake "get rich quick" schemes. Here are the 50 critical problems that cause 90% of dropshippers to fail, and exactly how our hands-on consulting prevents them. Click on any problem to see our solution:',
    risks: [
      {
        category: 'Policy & Account Suspension Risks',
        icon: 'ShieldAlert',
        problems: [
          { title: 'Violating eBay Dropshipping policy', solution: 'We audit your account structure to ensure 100% compliance with eBay\'s 2026 B2B supplier policies.' },
          { title: 'Sourcing from Amazon/Walmart (biggest mistake)', solution: 'We connect you with authorized wholesale suppliers that provide valid tracking and invoices accepted by eBay.' },
          { title: 'Sudden account suspensions and restrictions', solution: 'We guide you through the MC011 restriction appeals and preemptively "warm up" your cookies to avoid algorithmic flags.' },
          { title: 'Listings removed due to policy violations', solution: 'Our team reviews your entire inventory catalog to filter out VeRO (Verified Rights Owner) violations automatically.' },
          { title: 'Wrong category selection causing removals', solution: 'We use AI-assisted tools to accurately map your items to the exact Cassini-approved categories.' },
          { title: 'Using misleading titles and item descriptions', solution: 'We optimize your listings with high-converting, policy-compliant SEO titles that set accurate expectations.' },
          { title: 'Stock photos that do not match the product', solution: 'We source genuine lifestyle imagery from suppliers to prevent "Item Not As Described" (INAD) claims.' },
          { title: 'Incorrectly stating handling time', solution: 'We set up dynamic shipping policies that adjust handling time based on supplier historical data.' }
        ]
      },
      {
        category: 'Supplier & Shipping Issues',
        icon: 'Truck',
        problems: [
          { title: 'Supplier failing to ship the product', solution: 'We implement backup-supplier API routing. If supplier A fails, the order is automatically routed to supplier B.' },
          { title: 'Extremely long shipping times (3+ weeks)', solution: 'We only partner you with US/EU-based warehouses guaranteeing 3-5 day delivery times.' },
          { title: 'Business pausing during Chinese New Year', solution: 'We build diversified supply chains so your store remains operational year-round, regardless of local holidays.' },
          { title: 'Wrong or low-quality products being delivered', solution: 'We provide you with a vetted list of premium suppliers with sub-1% defect rates.' },
          { title: 'Item is listed but out of stock at supplier', solution: 'We integrate real-time inventory sync software that automatically ends listings when stock hits zero.' },
          { title: 'Supplier refusing to handle returns', solution: 'We negotiate Return Merchandise Authorization (RMA) agreements with suppliers on your behalf.' },
          { title: '5x higher shipping fees for remote locations', solution: 'We configure precise exclusion lists in your eBay shipping settings to avoid shipping to unprofitable zones.' },
          { title: 'Supplier company shutting down suddenly', solution: 'We never rely on a single source. Our strategies involve constant supplier diversification.' },
          { title: 'Late upload of tracking numbers', solution: 'We deploy automation bots that fetch and upload tracking numbers to eBay within 12 hours.' },
          { title: 'High rate of Item-Not-Received (INR) complaints', solution: 'We implement automated customer messaging that updates buyers proactively before they can complain.' },
          { title: 'Orders arriving in retailer branded packaging', solution: 'We strictly use dropship-friendly suppliers who offer blind dropshipping with unbranded packaging.' }
        ]
      },
      {
        category: 'Cost & Profit Margin Issues',
        icon: 'DollarSign',
        problems: [
          { title: 'Extremely low profit margins', solution: 'We teach you how to find high-ticket, low-competition items using Zik Analytics to ensure 20%+ net margins.' },
          { title: 'High eBay commissions (13.25% - 13.6%)', solution: 'We optimize your Store Subscription level to reduce final value fees based on your sales volume.' },
          { title: 'Losing money due to offering free shipping', solution: 'We build pricing models that perfectly bake the shipping cost into the item price without losing search rank.' },
          { title: 'Failing to calculate global shipping costs', solution: 'We help you properly configure the eBay International Shipping (EIS) program to handle global logistics at zero risk to you.' },
          { title: 'Losing $0.5 - $10 on every product sold', solution: 'We provide proprietary Excel calculators to project exact net profit before you list a single item.' },
          { title: 'Forgetting to factor in processing fees', solution: 'Our financial models automatically account for Payoneer/PayPal currency conversion and processing fees.' },
          { title: 'Express shipping costs suddenly tripling', solution: 'We establish flat-rate shipping contracts with our vetted suppliers to guarantee consistent costs.' },
          { title: 'Ignoring tax and currency conversion fees', solution: 'We consult on proper tax exemption setups and optimal withdrawal methods to minimize banking fees.' }
        ]
      },
      {
        category: 'Customer Service Problems',
        icon: 'Users',
        problems: [
          { title: 'Failing to reply to customer questions quickly', solution: 'We set you up with automated CRM templates and VA workflows to guarantee 1-hour response times.' },
          { title: 'Mismanaging return/refund requests', solution: 'We provide you with proven script templates that convert angry refunders into satisfied customers.' },
          { title: 'Customer satisfaction rate dropping below 95%', solution: 'We implement automated feedback request sequences to bury any rare negative reviews.' },
          { title: 'High complaint and defect rates (2%+)', solution: 'Our consulting monitors your Seller Dashboard weekly to proactively resolve issues before they become defects.' },
          { title: 'Message response time exceeding 48 hours', solution: 'We help you outsource your CS to trained Virtual Assistants (VAs) who monitor your store 24/7.' },
          { title: 'High return rate (exceeding 5%)', solution: 'We eliminate high-return categories (like sizing-dependent clothing) from your business model.' },
          { title: 'Inability to resolve negative feedback', solution: 'We give you direct access to our feedback revision tactics to legitimately remove unjustified bad reviews.' },
          { title: 'Frequent dispute and claim cases being opened', solution: 'We ensure all tracking is API-synced so eBay automatically closes "Item Not Received" cases in your favor.' }
        ]
      },
      {
        category: 'Traffic & Advertising Pitfalls',
        icon: 'Megaphone',
        problems: [
          { title: 'Listings being hidden in eBay search (throttling)', solution: 'We maintain your Top Rated Seller status, which mathematically guarantees premium search placement.' },
          { title: 'Listings suppressed due to high defect rates', solution: 'We audit your account health and pause risky listings before algorithmic suppression kicks in.' },
          { title: 'Low priority given to slow shipping listings', solution: 'We optimize your shipping policies to show "Fast \'N Free" badges, skyrocketing your organic traffic.' },
          { title: 'Wasting money on Promoted Listings (low ROI)', solution: 'We structure dynamic ad campaigns (Standard & Advanced) that only trigger on highly profitable conversions.' },
          { title: 'Poor title SEO resulting in zero traffic', solution: 'Our experts craft Cassini-optimized titles using the highest-searched long-tail keywords in your niche.' },
          { title: 'Low quality photos decreasing conversion rates', solution: 'We use AI upscaling and background removal tools to make your listings look like premium brands.' }
        ]
      },
      {
        category: 'Competition & Risk Management',
        icon: 'Activity',
        problems: [
          { title: '90% of sellers failing in their first year', solution: 'Our hands-on mentorship ensures you bypass the trial-and-error phase entirely.' },
          { title: 'Inventory management turning into a nightmare', solution: 'We onboard you onto industry-leading automation software (AutoDS/Trackerbot) for hands-free management.' },
          { title: 'Dependency on a single supplier', solution: 'We build a 3-tier supplier redundancy system. If one goes down, your business doesn\'t feel a thing.' },
          { title: 'Technical issues, API errors, and sync problems', solution: 'As a tech-first agency, our engineering team troubleshoots any software integration errors you face.' },
          { title: 'Delays in account verification processes', solution: 'We guide you step-by-step through Payoneer and eBay KYC documents to get approved instantly.' },
          { title: 'Accounts closed due to false-positive fraud', solution: 'We know exactly what triggers eBay\'s fraud bots and configure your VPN/IP setup to stay completely safe.' },
          { title: 'Market saturation and fierce seller competition', solution: 'We teach you how to find untapped micro-niches that large sellers ignore.' },
          { title: 'Sudden income drops due to seasonal fluctuations', solution: 'We diversify your product catalog across multiple verticals (Home, Auto, Garden) to ensure stable year-round ARR.' }
        ]
      }
    ],
    featuresTitle: 'Why Work With Us?',
    features: [
      { title: 'Algorithm Focused', desc: 'We don\'t teach outdated tactics. We teach you how to read Cassini data.' },
      { title: 'Zero Inventory Risk', desc: 'Learn to sell high-profit products without touching a single box.' },
      { title: '1-on-1 Mentorship', desc: 'Direct consulting to help you scale when you hit roadblocks.' }
    ],
    pricingTitle: 'Ready to build your digital asset?',
    pricingDesc: 'Whether you want to learn through our free modules or require hands-on technical consulting to scale your existing store, we are here to partner with you.',
    pricingCta: 'Contact Us for Pricing'
  },
  tr: {
    meta: {
      title: 'eBay Dropshipping Eğitimi ve Danışmanlığı 2026',
      description: 'Stoksuz e-ticaretin zirvesi eBay dropshipping ile sıfırdan otomatik bir işletme kurmayı öğrenin. Allmysell LLC güvencesiyle 6 modüllük eğitim ve birebir danışmanlık.',
      keywords: 'ebay dropshipping eğitimi, stoksuz e ticaret, ebay satıcı hesabı, ebay danışmanlık, zik analytics eğitimi',
    },
    back: 'Ana Sayfaya Dön',
    tag: 'E-Ticaret Eğitimi & Danışmanlık',
    title: 'Sıfırdan Otomatik İmparatorluğa: eBay Dropshipping 2026',
    subtitle: 'Tahmin etmeyi bırakın. Veriye dayalı, tam otonom çalışan global bir dropshipping işletmesi kurmaya bugün başlayın.',
    ctaPrimary: 'Danışmanlık İçin Başvurun',
    ctaSecondary: 'Modülleri Blogda Oku',
    intro: '2026 yılında geleneksel ticaret yavaşlarken, otonom dropshipping global çapta büyümeye devam ediyor. Hazırladığımız 6 modüllük özel eğitim paketi ve birebir stratejik danışmanlık hizmetimizle; karlı ürünleri bulmayı, katı eBay algoritmalarını (Cassini) aşmayı ve tüm sipariş süreçlerinizi otomatize etmeyi öğreneceksiniz.',
    modulesTitle: 'Neler Öğreneceksiniz?',
    modules: [
      { id: 1, title: 'Platform Hakimiyeti', desc: '2026 eBay ekosistemini ve modern Dropshipping iş modelinin temellerini anlamak.' },
      { id: 2, title: 'Güvenli Hesap Kurulumu', desc: 'Suspend (kapatılma) riskini sıfıra indiren Payoneer entegrasyonu ve "Çerez Isıtma".' },
      { id: 3, title: 'Kazanan Ürün Avı', desc: 'Zik Analytics kullanarak yüksek talepli ve karlı ürünleri veriye dayalı bulma.' },
      { id: 4, title: 'Cassini SEO ve Listeleme', desc: 'Mükemmel başlıklar ve Item Specifics ile eBay arama algoritmasını hackleme.' },
      { id: 5, title: 'Sipariş ve İade Yönetimi', desc: 'Siparişleri otomatik geçme, takip numarası yönetimi ve kriz anında iade stratejileri.' },
      { id: 6, title: 'Ölçekleme (Scaling)', desc: 'Satış limitlerini artırma, Promoted Listings reklamları ve Sanal Asistan (VA) yönetimi.' },
    ],
    risksTitle: 'Dropshipping\'de Karşılaşacağınız Riskler ve Çözümlerimiz',
    risksSubtitle: 'İnternetteki sahte "zengin olma" hayallerine inanmayın. İşte dropshipperların %90\'ının başarısız olmasına sebep olan 50 kritik problem ve Allmysell danışmanlığının bu sorunları nasıl çözdüğü. (Çözümü görmek için maddelere tıklayın)',
    risks: [
      {
        category: 'Politika & Hesap Askıya Alınma Riskleri',
        icon: 'ShieldAlert',
        problems: [
          { title: 'eBay Dropshipping politikasını bilmemek/ihlal etmek', solution: 'Hesap açılışından itibaren tüm mağazanızı 2026 eBay B2B tedarikçi politikalarına %100 uyumlu şekilde yapılandırıyoruz.' },
          { title: 'Amazon/Walmart\'tan sipariş verip eBay\'de satmak', solution: 'Sizi Amazon yasaklarına takılmayan, fatura ve geçerli takip numarası sağlayan toptancı tedarikçilerle (Wholesale) entegre ediyoruz.' },
          { title: 'Hesabın aniden askıya alınma (Suspension) riski', solution: 'MC011 kısıtlamalarına karşı önlem alıyor, algoritmik banlardan kaçınmak için çerez ısıtma (cookie warming) taktiklerini uyguluyoruz.' },
          { title: 'İhlal nedeniyle listelerin yayından kaldırılması', solution: 'Kataloglarınızı VeRO (Marka Hakları) ihlallerine karşı otomatik tarama yazılımlarıyla koruma altına alıyoruz.' },
          { title: 'Yanlış kategori seçimi (Listing removal)', solution: 'Yapay zeka destekli araçlarımızla ürünlerinizi Cassini algoritmasının en sevdiği, doğru ve kârlı kategorilere yerleştiriyoruz.' },
          { title: 'Yanıltıcı (Misleading) başlık ve açıklamalar kullanmak', solution: 'Listelemelerinizi beklentileri doğru yöneten, SEO uyumlu ve politika ihlali yaratmayan başlıklarla optimize ediyoruz.' },
          { title: 'Stok fotoğrafı kullanıp farklı ürün göndermek', solution: 'Tedarikçilerden orijinal ürün fotoğrafları temin ederek INAD (Açıklamadan Farklı Ürün) şikayetlerini sıfıra indiriyoruz.' },
          { title: 'Kargolama süresini (Handling time) yanlış belirtmek', solution: 'Tedarikçi geçmiş verilerine dayanarak, eBay metriklerinizi bozmayacak dinamik kargolama (Handling) süreleri belirliyoruz.' }
        ]
      },
      {
        category: 'Tedarikçi & Kargo Problemleri',
        icon: 'Truck',
        problems: [
          { title: 'Tedarikçinin ürünü göndermemesi', solution: 'Yedek tedarikçi (Backup Supplier) API sistemleri kuruyoruz. A tedarikçisi patlarsa, sipariş otomatik olarak B tedarikçisine kayar.' },
          { title: '3 haftayı aşan uzun kargo süreleri', solution: 'Yalnızca ABD ve Avrupa depolarından 3-5 gün içinde teslimat garantisi veren, güvenilir lojistik ağlarıyla çalışmanızı sağlıyoruz.' },
          { title: 'Çin Yeni Yılı nedeniyle işlerin 3 hafta durması', solution: 'Tedarik zincirinizi yerel tatillerden etkilenmeyecek şekilde global depolarla (Global Warehousing) çeşitlendiriyoruz.' },
          { title: 'Yanlış veya düşük kaliteli ürün gönderilmesi', solution: 'Sadece kusur (defect) oranı %1\'in altında olan, önceden denetlenmiş premium toptancılar listemizi sizinle paylaşıyoruz.' },
          { title: 'Ürünün stokta olmaması (Listed but unavailable)', solution: 'Stok sıfırlandığı an eBay listenizi otomatik olarak kapatan, gerçek zamanlı API stok senkronizasyon yazılımları kuruyoruz.' },
          { title: 'Tedarikçinin kargoyu açmayı reddetmesi', solution: 'Sizin adınıza tedarikçilerle İade Yetkilendirme (RMA) anlaşmaları yapıyor, iade sürecini otonom hale getiriyoruz.' },
          { title: 'Uzak bölgelere 5 katı daha fazla kargo ücreti', solution: 'eBay kargo ayarlarınızda "Exclusion List" (Hariç Tutulanlar) kurarak, zararına gönderim yapılacak uzak eyaletleri/ülkeleri engelliyoruz.' },
          { title: 'Tedarikçi şirketinin aniden kapanması', solution: 'Tek tedarikçiye bağlı kalmayan, en az 3 farklı dikeyde yedekli bir iş modeli kurguluyoruz.' },
          { title: 'Takip numarasının geç yüklenmesi (Policy violation)', solution: 'Tedarikçiden takip numarasını alıp eBay\'e 12 saat içinde otomatik yükleyen bot (Trackerbot vb.) sistemleri entegre ediyoruz.' },
          { title: 'Yüksek oranda "Ürün ulaşmadı" (Item-not-received) şikayeti', solution: 'Müşteriye kargo durumunu önceden bildiren otomatik mesaj dizileri kurarak şikayet oranını minimize ediyoruz.' },
          { title: 'Rakip marka kutusuyla gönderim yapılması', solution: 'Ürünlerinizi "Blind Dropshipping" (Markasız Kutu) yöntemiyle gönderen dropship-dostu tedarikçilerle eşleştiriyoruz.' }
        ]
      },
      {
        category: 'Maliyet & Kâr Marjı Problemleri',
        icon: 'DollarSign',
        problems: [
          { title: 'Çok düşük kâr marjı (Başarısızlığın #1 sebebi)', solution: 'Zik Analytics danışmanlığımızla size rekabeti düşük, kâr marjı %20\'nin üzerinde olan High-Ticket ürünleri bulmayı öğretiyoruz.' },
          { title: 'eBay\'in %13.25 - 13.6 arasındaki yüksek komisyonları', solution: 'Satış hacminize göre en uygun eBay Mağaza Aboneliğine (Store Subscription) geçmenizi sağlayarak komisyon yükünüzü hafifletiyoruz.' },
          { title: 'Ücretsiz kargo seçeneğiyle kârı sıfırlayıp zarar etmek', solution: 'Arama sıralamasını kaybetmeden kargo maliyetini ürün fiyatına gizleme (Bake-in) stratejileri kuruyoruz.' },
          { title: 'Global kargo maliyetlerini hesaplamamak', solution: 'Sizi eBay International Shipping (EIS) programına entegre ederek tüm global kargo risklerini ve maliyetlerini eBay\'e devrediyoruz.' },
          { title: 'Ürün başına $0.5 - $10 zarar etmek', solution: 'Listeleme yapmadan önce net kârı kuruşu kuruşuna gösteren, Allmysell\'e özel gelişmiş Excel finansal modelleme araçlarını sunuyoruz.' },
          { title: 'Ödeme altyapısı kesintilerini (Processing fees) atlamak', solution: 'Finansal modellerimize Payoneer/PayPal kur çevrim (conversion) ve işlem ücretlerini otomatik olarak dahil ediyoruz.' },
          { title: 'Hızlı kargo (Express) seçeneğinde fiyatın 3\'e katlanması', solution: 'Doğruladığımız tedarikçilerle "Flat-Rate" (Sabit Fiyat) kargo anlaşmaları yaparak kargo maliyet sürprizlerini ortadan kaldırıyoruz.' },
          { title: 'Vergi (Tax) ve kur dönüşüm maliyetlerini hesap etmemek', solution: 'Vergi muafiyeti (Tax Exemption) başvurularınızı yönetiyor, banka kesintilerini minimuma indiren para çekme stratejileri sunuyoruz.' }
        ]
      },
      {
        category: 'Müşteri Hizmeti Problemleri',
        icon: 'Users',
        problems: [
          { title: 'Müşteri sorularına hızlı cevap verememe', solution: 'Otonom CRM şablonları ve hazır yanıt sistemleriyle 1 saat içinde cevap verme (Response Time) standartları kuruyoruz.' },
          { title: 'İade (Return/Refund) taleplerini yönetememek', solution: 'Öfkeli müşterileri sakinleştiren ve iadeleri iptale çeviren, kanıtlanmış müşteri iletişim senaryoları (Script) sağlıyoruz.' },
          { title: 'Müşteri memnuniyeti oranının %95\'in altına düşmesi', solution: 'Sipariş sonrası otomatik feedback isteme zincirleri kurarak nadir gelen kötü yorumları olumlu yorum yağmuruyla gizliyoruz.' },
          { title: 'Yüksek şikayet oranı (Defect rate %2+)', solution: 'Danışmanlarımız Seller Dashboard\'unuzu haftalık denetleyerek, şikayetler metriklerinizi bozmadan önce müdahale eder.' },
          { title: 'Mesajlara yanıt verme süresinin 48 saati aşması', solution: 'Müşteri hizmetlerinizi 7/24 yönetecek eğitimli Sanal Asistan (VA) bulma ve işe alma süreçlerinizi yönetiyoruz.' },
          { title: 'İade oranının yüksek olması (%5+ kabul sınırı)', solution: 'Beden/ölçü gerektiren, iade riski yüksek (Giyim, Ayakkabı vb.) kategorileri iş modelinizden tamamen çıkarıyoruz.' },
          { title: 'Negatif geri bildirimlere profesyonel cevap verememek', solution: 'Haksız yere verilen kötü yorumları yasal eBay politikalarını kullanarak kaldırtma (Feedback Revision) stratejilerini veriyoruz.' },
          { title: 'Sıkça anlaşmazlık (Dispute/Claim) dosyalarının açılması', solution: 'API destekli kargo entegrasyonumuz sayesinde "Ulaşmadı" iddialarında eBay\'in davayı otomatik olarak lehinize kapatmasını sağlıyoruz.' }
        ]
      },
      {
        category: 'Reklam & Trafik Problemleri',
        icon: 'Megaphone',
        problems: [
          { title: 'Listelerin eBay arama motorunda gizlenmesi (Throttling)', solution: 'Sizi Top Rated Seller statüsünde tutarak Cassini algoritmasının listelemelerinizi her zaman üst sıralarda göstermesini (matematiksel olarak) garantiliyoruz.' },
          { title: 'Defect oranı yüksek olduğu için listelerin arka sıralara atılması', solution: 'Hesap sağlığınızı sürekli denetliyor, riskli ürünleri algoritma sizi cezalandırmadan önce yayından kaldırıyoruz.' },
          { title: 'Yavaş kargolu ürünlere düşük arama önceliği verilmesi', solution: 'Kargo ayarlarınızı optimize edip listelerinize "Fast \'N Free" rozeti kazandırarak organik trafiğinizi roketliyoruz.' },
          { title: 'Sponsorlu listelemelere (Promoted listings) boşuna para harcamak', solution: 'Yalnızca yüksek kâr marjlı satışlarda tetiklenen, ROI odaklı dinamik reklam kampanyaları (Standard & Advanced) kuruyoruz.' },
          { title: 'Kötü başlık SEO\'su nedeniyle az trafik almak', solution: 'Nişinizdeki en çok aranan (Long-tail) anahtar kelimeleri analiz ederek, doğrudan alıcıyı hedefleyen mükemmel SEO başlıkları yazıyoruz.' },
          { title: 'Düşük kaliteli fotoğraflar nedeniyle dönüşümün (Conversion) azalması', solution: 'Yapay zeka (AI) destekli görsel iyileştirme araçlarıyla tedarikçi fotoğraflarını premium bir markaya aitmiş gibi gösteriyoruz.' }
        ]
      },
      {
        category: 'Rekabet & Risk Yönetimi',
        icon: 'Activity',
        problems: [
          { title: 'Satıcıların %90\'ının başarısız olması (Gerçek bir istatistik)', solution: 'Birebir mentorluğumuz sayesinde deneme-yanılma aşamasını tamamen atlıyor, sadece çalışan sistemleri uyguluyorsunuz.' },
          { title: 'Stok ve envanter yönetiminin kabusa dönüşmesi', solution: 'Mağazanızı AutoDS, Trackerbot gibi endüstri standardı otomasyon yazılımlarına entegre ederek el değmeden yönetmenizi sağlıyoruz.' },
          { title: 'Tek bir tedarikçiye bağımlı kalmak (Diversification olmaması)', solution: 'Yedekli (3-Tier) tedarikçi sistemleri kuruyoruz. Biri iflas etse bile mağazanız operasyonlarına kesintisiz devam eder.' },
          { title: 'Yazılımsal API hataları ve senkronizasyon (Sync) problemleri', solution: 'Bir yazılım ajansı (Allmysell LLC) olarak, entegrasyonlarda yaşadığınız tüm teknik hataları mühendis ekibimizle anında çözüyoruz.' },
          { title: 'Hesap doğrulama (Verification) süreçlerinin çok uzaması', solution: 'Payoneer ve eBay KYC (Müşterini Tanı) evrak süreçlerini adım adım yöneterek hesaplarınızın anında onaylanmasını sağlıyoruz.' },
          { title: 'Hatalı dolandırıcılık (Fraud) şüphesiyle kapanmalar', solution: 'eBay güvenlik botlarının neye tepki verdiğini biliyor, IP/VPN ve çerez (Cookie) yönetimini riskleri sıfırlayacak şekilde yapılandırıyoruz.' },
          { title: 'Pazar doygunluğu (Çok fazla satıcı rekabeti)', solution: 'Devasa satıcıların göz ardı ettiği, rekabetin düşük olduğu gizli mikro-nişleri (Micro-niches) nasıl bulacağınızı öğretiyoruz.' },
          { title: 'Mevsimsel dalgalanmalar nedeniyle gelirlerin aniden düşmesi', solution: 'Ürün kataloğunuzu Ev, Oto, Bahçe gibi farklı dikeylere dağıtarak, yılın 12 ayı boyunca stabil ve artan bir gelir modeli (ARR) kuruyoruz.' }
        ]
      }
    ],
    featuresTitle: 'Neden Bizimle Çalışmalısınız?',
    features: [
      { title: 'Algoritma Odaklı', desc: 'Eskimiş taktikler değil, doğrudan güncel Cassini arama motoru verilerini okumayı öğretiyoruz.' },
      { title: 'Sıfır Stok Riski', desc: 'Tek bir kutuya bile dokunmadan yüksek kar marjlı ürünleri satmayı ve lojistiği yönetmeyi öğrenin.' },
      { title: 'Birebir Mentorluk', desc: 'Büyüme duvarına çarptığınızda veya mağazanızı ölçeklerken yanınızda yer alan doğrudan stratejik danışmanlık.' }
    ],
    pricingTitle: 'Dijital Varlığınızı İnşa Etmeye Hazır Mısınız?',
    pricingDesc: 'İster ücretsiz blog modüllerimiz üzerinden öğrenin, isterseniz mevcut mağazanızı devasa boyutlara ulaştırmak için teknik danışmanlığımızdan yararlanın. Büyüme partneriniz olmaya hazırız.',
    pricingCta: 'Fiyatlandırma İçin İletişime Geçin'
  },
  ru: {
    meta: {
      title: 'Курс и Консалтинг по eBay Dropshipping 2026',
      description: 'Узнайте, как построить прибыльный автоматизированный бизнес на eBay dropshipping без склада. Полный 6-модульный курс и индивидуальный консалтинг от Allmysell LLC.',
      keywords: 'ebay dropshipping обучение, дропшиппинг 2026, аккаунт продавца ebay, консалтинг дропшиппинг, zik analytics',
    },
    back: 'На Главную',
    tag: 'E-Commerce Обучение и Консалтинг',
    title: 'От Нуля до Автоматизированной Империи: eBay Dropshipping 2026',
    subtitle: 'Хватит угадывать. Начните строить глобальный бизнес dropshipping на основе данных и полной автоматизации уже сегодня.',
    ctaPrimary: 'Подать заявку на консалтинг',
    ctaSecondary: 'Читать модули в блоге',
    intro: 'В 2026 году традиционный ритейл замедляется, в то время как автоматизированный дропшиппинг масштабируется по всему миру. Наш эксклюзивный 6-модульный пакет обучения и индивидуальный консалтинг научат вас находить прибыльные товары, обходить алгоритмы eBay (Cassini) и полностью автоматизировать обработку заказов.',
    modulesTitle: 'Чему вы научитесь',
    modules: [
      { id: 1, title: 'Освоение Платформы', desc: 'Понимание экосистемы eBay 2026 года и основ современной бизнес-модели Dropshipping.' },
      { id: 2, title: 'Безопасная Настройка Аккаунта', desc: 'Интеграция Payoneer и "прогрев cookie" для предотвращения блокировок (Suspend).' },
      { id: 3, title: 'Поиск Прибыльных Товаров', desc: 'Поиск востребованных и высокомаржинальных товаров на основе данных с помощью Zik Analytics.' },
      { id: 4, title: 'SEO Cassini и Листинг', desc: 'Оптимизация заголовков и Item Specifics для взлома поискового алгоритма eBay.' },
      { id: 5, title: 'Обработка Заказов и Возвраты', desc: 'Автоматизация заказов, управление трек-номерами и стратегии безопасных возвратов.' },
      { id: 6, title: 'Масштабирование ($10k+)', desc: 'Увеличение лимитов продаж, реклама Promoted Listings и управление виртуальными ассистентами (VA).' },
    ],
    risksTitle: 'Риски в Dropshipping и Наши Решения',
    risksSubtitle: 'Не верьте сказкам о быстром обогащении. Вот 50 критических проблем, из-за которых 90% дропшипперов терпят неудачу, и то, как наш консалтинг решает каждую из них. Нажмите на проблему, чтобы увидеть решение:',
    risks: [
      {
        category: 'Риски Политики и Блокировки Аккаунта',
        icon: 'ShieldAlert',
        problems: [
          { title: 'Незнание или нарушение правил eBay Dropshipping', solution: 'Мы настраиваем магазин в полном соответствии с политиками оптовых B2B-поставщиков eBay 2026 года.' },
          { title: 'Дропшиппинг с Amazon/Walmart (главная ошибка)', solution: 'Мы подключаем вас к авторизованным оптовым поставщикам с легальными инвойсами и трек-номерами.' },
          { title: 'Риск внезапной блокировки аккаунта (Suspension)', solution: 'Мы предотвращаем ограничения MC011 и применяем правильный прогрев cookie (cookie warming).' },
          { title: 'Удаление листингов из-за нарушений прав (VeRO)', solution: 'Мы защищаем ваш каталог с помощью ПО для автоматического сканирования брендовых нарушений VeRO.' },
          { title: 'Выбор неверной категории товара', solution: 'С помощью ИИ-инструментов мы размещаем ваши товары в правильных и прибыльных категориях Cassini.' },
          { title: 'Использование вводящих в заблуждение заголовков', solution: 'Мы создаем оптимизированные по SEO заголовки, не нарушающие правила площадки.' },
          { title: 'Стоковые фото, не соответствующие товару', solution: 'Мы получаем оригинальные lifestyle-фотографии от поставщиков для исключения жалоб INAD.' },
          { title: 'Неверное указание времени обработки (Handling time)', solution: 'Мы настраиваем динамические сроки отправки на основе реальной статистики поставщиков.' }
        ]
      },
      {
        category: 'Проблемы с Поставщиками и Доставкой',
        icon: 'Truck',
        problems: [
          { title: 'Поставщик не отправляет товар вовремя', solution: 'Мы внедряем API резервных поставщиков. Если поставщик А подвел, заказ уходит поставщику Б.' },
          { title: 'Слишком долгая доставка (более 3 недель)', solution: 'Мы работаем только со складами в США и ЕС с гарантированной доставкой за 3-5 дней.' },
          { title: 'Остановка бизнеса во время Китайского Нового Года', solution: 'Мы диверсифицируем цепочки поставок через склады в США и Европе, работающие круглый год.' },
          { title: 'Доставка бракованного или не того товара', solution: 'Мы предоставляем проверенный список премиум-поставщиков с уровнем брака менее 1%.' },
          { title: 'Товар распродан у поставщика (Out of Stock)', solution: 'Мы подключаем API синхронизации остатков в реальном времени, автоматически закрывающее листинг.' },
          { title: 'Отказ поставщика принимать возврат', solution: 'Мы заключаем официальные соглашения RMA с поставщиками для автоматизации возвратов.' },
          { title: 'Высокая стоимость доставки в удаленные регионы', solution: 'Мы настраиваем списки исключений (Exclusion List) в eBay, чтобы исключить невыгодные зоны.' },
          { title: 'Внезапное закрытие компании поставщика', solution: 'Мы строим бизнес с резервированием по 3 разным поставщикам одновременно.' },
          { title: 'Задержка загрузки трек-номера', solution: 'Мы интегрируем ботов (AutoDS/Trackerbot), загружающих трек-номера в eBay в течение 12 часов.' },
          { title: 'Частые жалобы «Товар не получен» (INR)', solution: 'Мы настраиваем автоуведомления клиентов о статусе посылки до того, как они начнут жаловаться.' },
          { title: 'Доставка в брендовой упаковке ритейлера', solution: 'Мы работаем с поставщиками, предлагающими "Blind Dropshipping" в нейтральных коробках.' }
        ]
      },
      {
        category: 'Затраты и Маржинальность',
        icon: 'DollarSign',
        problems: [
          { title: 'Слишком низкая маржа прибыли', solution: 'Мы учим находить товары с чистой маржой более 20% с помощью Zik Analytics.' },
          { title: 'Высокие комиссии eBay (13.25% - 13.6%)', solution: 'Мы подбираем оптимальную подписку на магазин (Store Subscription) для снижения комиссий.' },
          { title: 'Убытки из-за бесплатной доставки', solution: 'Мы закладываем стоимость доставки в цену товара без потери поискового ранжирования.' },
          { title: 'Ошибки в расчете международной доставки', solution: 'Мы подключаем программу eBay International Shipping (EIS), снимающую риски международной доставки.' },
          { title: 'Убыток $0.5 - $10 на каждой продаже', solution: 'Мы предоставляем авторские финансовые Excel-калькуляторы для точного расчета чистой прибыли.' },
          { title: 'Игнорирование комиссий платежных систем', solution: 'Наши модели автоматически учитывают конвертацию валют и сборы Payoneer.' },
          { title: 'Внезапный рост тарифов экспресс-доставки', solution: 'Мы фиксируем единые тарифы (Flat-Rate) с проверенными партнерами.' },
          { title: 'Налоги и скрытые комиссии банков', solution: 'Мы консультируем по оформлению Tax Exemption и оптимальным методам вывода средств.' }
        ]
      },
      {
        category: 'Служба Поддержки Клиентов',
        icon: 'Users',
        problems: [
          { title: 'Медленные ответы на вопросы покупателей', solution: 'Мы настраиваем CRM-шаблоны для ответов клиентам в течение 1 часа.' },
          { title: 'Сложности с обработкой возвратов и рефандов', solution: 'Мы даем проверенные скрипты общения, превращающие споры в довольных клиентов.' },
          { title: 'Падение рейтинга удовлетворенности ниже 95%', solution: 'Мы внедряем автоматические цепочки запроса отзывов, нивелирующие редкий негатив.' },
          { title: 'Высокий процент дефектов аккаунта (Defect Rate 2%+)', solution: 'Наши консультанты еженедельно проверяют Dashboard для устранения проблем до начисления дефектов.' },
          { title: 'Время ответа на сообщения более 48 часов', solution: 'Мы помогаем нанять обученных виртуальных ассистентов (VA) для поддержки 24/7.' },
          { title: 'Высокий уровень возвратов (более 5%)', solution: 'Мы исключаем проблемные категории (одежда, обувь с размерами) из вашей модели.' },
          { title: 'Неумение удалять несправедливые негативные отзывы', solution: 'Мы обучаем официальным процедурам Feedback Revision для легального удаления плохих отзывов.' },
          { title: 'Частое открытие диспутов и жалоб', solution: 'Благодаря API-синхронизации трекинга eBay автоматически закрывает споры в вашу пользу.' }
        ]
      },
      {
        category: 'Реклама и Трафик',
        icon: 'Megaphone',
        problems: [
          { title: 'Пессимизация листингов в поиске (Throttling)', solution: 'Мы удерживаем статус Top Rated Seller, что гарантирует приоритет алгоритма Cassini.' },
          { title: 'Падение показов из-за высокого уровня дефектов', solution: 'Мы аудируем здоровье аккаунта и снимаем рискованные товары до санкций алгоритма.' },
          { title: 'Низкий приоритет товаров с медленной доставкой', solution: 'Мы оптимизируем политику доставки для получения бейджа "Fast \'N Free".' },
          { title: 'Слив бюджета на Promoted Listings', solution: 'Мы настраиваем динамические рекламные кампании с оплатой только за реальные продажи.' },
          { title: 'Слабое SEO в названиях и отсутствие просмотров', solution: 'Наши эксперты подбирают высокочастотные Long-tail ключи для максимального охвата.' },
          { title: 'Низкая конверсия из-за некачественных фото', solution: 'Мы используем нейросети для улучшения качества и создания премиального вида фото.' }
        ]
      },
      {
        category: 'Конкуренция и Управление Рисками',
        icon: 'Activity',
        problems: [
          { title: '90% продавцов терпят неудачу в первый год', solution: 'Наше менторство позволяет миновать метод проб и ошибок и сразу запускать рабочую систему.' },
          { title: 'Хаос в управлении складскими остатками', solution: 'Мы автоматизируем магазин через передовые инструменты (AutoDS, Trackerbot).' },
          { title: 'Зависимость от одного поставщика', solution: 'Мы строим 3-уровневую систему резервных поставщиков.' },
          { title: 'Технические сбои и ошибки API синхронизации', solution: 'Наша инженерная команда Allmysell LLC оперативно решает любые интеграционные ошибки.' },
          { title: 'Затягивание верификации аккаунтов Payoneer/eBay', solution: 'Мы пошагово сопровождаем вас в прохождении KYC проверок без задержек.' },
          { title: 'Блокировки из-за ложных подозрений в мошенничестве', solution: 'Мы настраиваем правильное окружение (чистый IP/VPN, Cookies) для безопасности.' },
          { title: 'Высокая конкуренция и демпинг цен', solution: 'Мы учим находить свободные микро-ниши с высокой прибылью.' },
          { title: 'Сезонные просадки выручки', solution: 'Мы распределяем каталог по всесезонным категориям (Дом, Авто, Сад) для стабильного дохода.' }
        ]
      }
    ],
    featuresTitle: 'Почему выбирают нас?',
    features: [
      { title: 'Фокус на Алгоритмах', desc: 'Мы учим работать с актуальными данными поисковой системы Cassini 2026 года.' },
      { title: 'Без Риска Заморозки Денег в Складе', desc: 'Продавайте прибыльные товары без необходимости предварительной закупки.' },
      { title: 'Индивидуальное Менторство', desc: 'Прямые консультации для быстрого масштабирования и решения тупиковых ситуаций.' }
    ],
    pricingTitle: 'Готовы построить свой цифровой актив?',
    pricingDesc: 'Изучайте наши бесплатные материалы в блоге или воспользуйтесь персональным консалтингом для быстрого масштабирования магазина.',
    pricingCta: 'Связаться для консультации'
  },
  uz: {
    meta: {
      title: 'eBay Dropshipping Kursi va Konsaltingi 2026',
      description: 'Omborsiz e-tijorat orqali noldan avtomatlashtirilgan eBay biznesini qurishni o\'rganing. Allmysell LLC dan 6 modulli to\'liq kurs va 1-ga-1 konsalting.',
      keywords: 'ebay dropshipping kursi, omborsiz savdo, ebay sotuvchi hisobi, ebay konsalting, zik analytics kursi',
    },
    back: 'Bosh Sahifaga Qaytish',
    tag: 'E-Tijorat Ta\'limi & Konsalting',
    title: 'Noldan Avtomatlashgan Imperiyagacha: eBay Dropshipping 2026',
    subtitle: 'Taxmin qilishni to\'xtating. Ma\'lumotlarga asoslangan, to\'liq avtopilotda ishlaydigan global biznesingizni bugunoq quring.',
    ctaPrimary: 'Konsalting Uchun Ariza Qoldirish',
    ctaSecondary: 'Modullarni Blogda O\'qish',
    intro: '2026 yilda an\'anaviy savdo sekinlashayotgan bir paytda, avtomatlashtirilgan dropshipping butun dunyo bo\'ylab o\'smoqda. Bizning 6 modulli maxsus ta\'lim paketimiz va 1-ga-1 strategik konsalting xizmatimiz orqali yuqori daromadli mahsulotlarni topishni, qat\'iy eBay Cassini algoritmlarini to\'g\'ri boshqarishni va buyurtmalarni avtomatlashtirishni o\'rganasiz.',
    modulesTitle: 'Nimani O\'rganasiz',
    modules: [
      { id: 1, title: 'Platformani O\'zlashtirish', desc: '2026 yilgi eBay ekotizimi va zamonaviy Dropshipping biznes modelining asoslari.' },
      { id: 2, title: 'Xavfsiz Hisob Ochish', desc: 'Bloklanish (Suspend) xavfini nolga tushiruvchi Payoneer integratsiyasi va "Kuki Isitish".' },
      { id: 3, title: 'G\'olib Mahsulotlarni Topish', desc: 'Zik Analytics yordamida yuqori talabga ega va past raqobatli mahsulotlarni tahlil qilish.' },
      { id: 4, title: 'Cassini SEO va Listelash', desc: 'Mukammal sarlavhalar va Item Specifics orqali qidiruv tizimida yuqoriga ko\'tarilish.' },
      { id: 5, title: 'Buyurtmalar va Qaytarishlar', desc: 'Buyurtmalarni avtomatlashtirish, trek-raqamlarni boshqarish va xavfsiz qaytarish strategiyalari.' },
      { id: 6, title: 'Masshtablash ($10k+)', desc: 'Savdo limitlarini oshirish, Promoted Listings reklamalari va Virtual Yordamchilarni (VA) boshqarish.' },
    ],
    risksTitle: 'Dropshippingda Duch Kelinadigan Xatarlar va Bizning Yechimlarimiz',
    risksSubtitle: 'Tez boyib ketish haqidagi yolg\'on va\'dalarga ishonmang. Mana dropshipperlarning 90 foizi muvaffaqiyatsizlikka uchrashiga sabab bo\'ladigan 50 ta muhim muammo va bizning konsalting ularni qanday hal qiladi (Yechimni ko\'rish uchun bosing):',
    risks: [
      {
        category: 'Siyosat va Hisob Bloklanishi Xatarlari',
        icon: 'ShieldAlert',
        problems: [
          { title: 'eBay Dropshipping siyosatini bilmaslik yoki buzish', solution: 'Biz hisobingizni 2026 yilgi eBay B2B yetkazib beruvchilar siyosatiga 100% mos ravishda sozlaymiz.' },
          { title: 'Amazon/Walmart dan sotib olib eBay da sotish (katta xato)', solution: 'Sizni qonuniy faktura va to\'g\'ri trek-raqam beruvchi ulgurji B2B yetkazib beruvchilar bilan bog\'laymiz.' },
          { title: 'Hisobning to\'satdan bloklanishi (Suspend)', solution: 'MC011 cheklovlariga qarshi choralar ko\'ramiz va algoritmlar bloklamasligi uchun cookie isitish taktikalarini qo\'llaymiz.' },
          { title: 'Mualliflik huquqi buzilishi (VeRO)', solution: 'Katalogingizni VeRO qoidalariga qarshi avtomatik skanerlash dasturlari bilan himoya qilamiz.' },
          { title: 'Noto\'g\'ri kategoriya tanlash', solution: 'Sun\'iy intellekt vositalarimiz orqali mahsulotlaringizni eng to\'g\'ri va daromadli kategoriyalarga joylashtiramiz.' },
          { title: 'Chalg\'ituvchi sarlavha va tavsiflar', solution: 'Listelaringizni xaridor kutuvlariga mos keladigan va siyosatni buzmaydigan SEO sarlavhalar bilan optimallashtiramiz.' },
          { title: 'Mahsulotga mos kelmaydigan stok rasmlari', solution: 'Yetkazib beruvchilardan original rasmlarni olib, INAD (Mos kelmaslik) shikoyatlarini yo\'qotamiz.' },
          { title: 'Yetkazib berish vaqtini (Handling time) noto\'g\'ri ko\'rsatish', solution: 'Yetkazib beruvchining haqiqiy statistikasi asosida dinamik jo\'natish vaqtlarini belgilaymiz.' }
        ]
      },
      {
        category: 'Yetkazib Beruvchi va Yuk Tashish Muammolari',
        icon: 'Truck',
        problems: [
          { title: 'Yetkazib beruvchining mahsulotni jo\'natmasligi', solution: 'Zaxira yetkazib beruvchi (Backup Supplier) API tizimini o\'rnatamiz. Agar birinchisi bajarmasa, buyurtma ikkinchisiga o\'tadi.' },
          { title: '3 haftadan oshadigan uzoq yetkazib berish', solution: 'Faqat AQSh va Yevropa omborlaridan 3-5 kunlik tezkor yetkazib beruvchilar bilan ishlashingizni ta\'minlaymiz.' },
          { title: 'Xitoy Yangi Yilida biznes to\'xtab qolishi', solution: 'Yetkazib berish zanjirini mahalliy bayramlarga bog\'lanmagan global omborlar orqali diversifikatsiya qilamiz.' },
          { title: 'Noto\'g\'ri yoki past sifatli mahsulot yuborilishi', solution: 'Faqatgina nuqson darajasi 1% dan past bo\'lgan, tekshirilgan premium ulgurji yetkazib beruvchilar ro\'yxatini beramiz.' },
          { title: 'Mahsulot yetkazib beruvchida tugab qolishi', solution: 'Zaxira nolga tushgan paytda listeni avtomatik yopadigan real vaqtdagi API sinxronizatsiya dasturlarini ulaymiz.' },
          { title: 'Yetkazib beruvchining qaytarishni qabul qilmasligi', solution: 'Sizning nomingizdan yetkazib beruvchilar bilan rasmiy RMA shartnomalarini tuzamiz.' },
          { title: 'Uzoq hududlarga yuqori yetkazib berish narxlari', solution: 'eBay da "Exclusion List" ni to\'g\'ri sozlab, zararga ishlovchi uzoq zonalarga yetkazishni cheklaymiz.' },
          { title: 'Yetkazib beruvchi kompaniyaning to\'satdan yopilishi', solution: 'Bitta manbaga tayanmay, kamida 3 xil yetkazib beruvchi bilan ishlaydigan tizim quramiz.' },
          { title: 'Trek-raqamning kech yuklanishi', solution: 'Trek-raqamlarni olib, eBay ga 12 soat ichida yuklovchi avtomatlashtirilgan botlarni ulaymiz.' },
          { title: '"Mahsulot yetib bormadi" (INR) shikoyatlari', solution: 'Mijozlarga yetkazib berish holatini oldindan xabar qiluvchi avtomatik xabarlar zanjirini o\'rnatamiz.' },
          { title: 'Boshqa brend qutisida jo\'natilishi', solution: 'Mahsulotlarni neytral qutilarda jo\'natuvchi "Blind Dropshipping" yetkazib beruvchilari bilan ishlaymiz.' }
        ]
      },
      {
        category: 'Xarajatlar va Foyda Marjasi Muammolari',
        icon: 'DollarSign',
        problems: [
          { title: 'Juda past foyda marjasi', solution: 'Zik Analytics orqali sof foydasi 20% dan yuqori bo\'lgan yuqori qiymatli tovarlarni topishni o\'rgatamiz.' },
          { title: 'eBay ning yuqori komissiyalari (13.25% - 13.6%)', solution: 'Savdo hajmiga mos do\'kon obunasi (Store Subscription) orqali komissiyalarni kamaytiramiz.' },
          { title: 'Bepul yetkazib berish sababli zararga kirish', solution: 'Qidiruv reytingini yo\'qotmasdan yetkazib berish xarajatini narxga to\'g\'ri qo\'shish strategiyasini quramiz.' },
          { title: 'Global yetkazib berish xarajatlarini hisobga olmaslik', solution: 'Sizni eBay International Shipping (EIS) dasturiga ulab, global logistika xavflarini eBay ga topshiramiz.' },
          { title: 'Har bir tovardan $0.5 - $10 zarar ko\'rish', solution: 'Listelashdan oldin sof foydani aniq hisoblab beruvchi Excel moliyaviy kalkulyatorlarimizni taqdim etamiz.' },
          { title: 'To\'lov tizimlari komissiyalarini hisobga olmaslik', solution: 'Modellarimizga Payoneer/PayPal konvertatsiya va to\'lov foizlarini avtomatik kiritamiz.' },
          { title: 'Tezkor yetkazib berish narxlarining kutilmaganda oshishi', solution: 'Yetkazib beruvchilar bilan qat\'iy narxli (Flat-Rate) yetkazib berish shartnomalarini tuzamiz.' },
          { title: 'Soliqlar va valyuta konvertatsiyasi xarajatlari', solution: 'Tax Exemption arizalarini to\'g\'ri topshirish va bank xarajatlarini kamaytirish bo\'yicha maslahat beramiz.' }
        ]
      },
      {
        category: 'Mijozlarga Xizmat Ko\'rsatish Muammolari',
        icon: 'Users',
        problems: [
          { title: 'Mijozlar savollariga tez javob bera olmaslik', solution: 'Avtonom CRM shablonlari orqali 1 soat ichida javob berish standartlarini o\'rnatamiz.' },
          { title: 'Qaytarish va pulni qaytarish talablarini boshqara olmaslik', solution: 'Mijozlarni xursand qiluvchi va qaytarishni bekorga aylantiruvchi professional skriptlarni taqdim etamiz.' },
          { title: 'Mijozlar qoniqishining 95% dan pastga tushishi', solution: 'Buyurtmadan so\'ng avtomatik ijobiy fikr (feedback) so\'rash zanjirlarini quramiz.' },
          { title: 'Shikoyat va nuqsonlar darajasining oshishi (2%+)', solution: 'Dashboardingizni har hafta tekshirib, muammolar metrikalarga ta\'sir qilmasidan oldin bartaraf etamiz.' },
          { title: 'Xabarlarga javob berish 48 soatdan oshib ketishi', solution: '24/7 xizmat ko\'rsatuvchi malakali Virtual Yordamchilarni (VA) topish va yollashga yordam beramiz.' },
          { title: 'Qaytarish darajasining yuqoriligi (5%+)', solution: 'O\'lcham talab qiluvchi xatarli kategoriyalarni biznes modelingizdan butunlay chiqaramiz.' },
          { title: 'Salbiy baholarni o\'chira olmaslik', solution: 'Noo\'rin qo\'yilgan yomon baholarni eBay rasmiy qoidalari (Feedback Revision) orqali o\'chirishni o\'rgatamiz.' },
          { title: 'Mijozlar bilan tez-tez nizo ochilishi', solution: 'API sinxronizatsiyasi orqali eBay "Yetib bormadi" nizolarini avtomatik sizning foydangizga yopadi.' }
        ]
      },
      {
        category: 'Reklama va Trafik Muammolari',
        icon: 'Megaphone',
        problems: [
          { title: 'Qidiruv tizimida listelarning ko\'rinmasligi (Throttling)', solution: 'Sizni Top Rated Seller maqomida ushlab, Cassini qidiruv tizimida doimiy yuqori o\'rinlarni kafolatlaymiz.' },
          { title: 'Defekt darajasi oshib listelarning orqaga tushishi', solution: 'Hisob salomatligini tekshirib, xatarli tovarlarni algoritmlar jazolashidan oldin to\'xtatamiz.' },
          { title: 'Sekin yetkaziluvchi tovarlarning ko\'rinmay qolishi', solution: 'Yetkazib berish sozlamalarini optimallashtirib, "Fast \'N Free" nishonini olamiz.' },
          { title: 'Promoted Listings reklamalariga behuda pul sarflash', solution: 'Faqatgina daromadli sotuvlar bo\'lgandagina to\'lanadigan ROI ga yo\'naltirilgan dinamik reklamalarni quramiz.' },
          { title: 'Yomon SEO sarlavhalari tufayli trafik bo\'lmasligi', solution: 'Sohangizdagi eng ko\'p qidirilgan (Long-tail) kalit so\'zlar asosida mukammal SEO sarlavhalarini yozamiz.' },
          { title: 'Past sifatli rasmlar sababli xaridorlar sotib olmasligi', solution: 'Sun\'iy intellekt vositalari orqali rasmlarni yaxshilab, premium brend darajasiga olib chiqamiz.' }
        ]
      },
      {
        category: 'Raqobat va Xatarlarni Boshqarish',
        icon: 'Activity',
        problems: [
          { title: 'Sotuvchilarning 90 foizi 1-yilda muvaffaqiyatsiz bo\'lishi', solution: 'Mentorligimiz orqali xato va sinovlar bosqichini chetlab o\'tib, faqat ishlaydigan tizimlarni qo\'llaysiz.' },
          { title: 'Zaxiralarni boshqarish qiyinlashib ketishi', solution: 'Do\'koningizni AutoDS, Trackerbot kabi avtomatlashtirish dasturlariga ulaymiz.' },
          { title: 'Faqat bitta yetkazib beruvchiga bog\'lanib qolish', solution: '3 bosqichli zaxira tizimini quramiz. Biri to\'xtasa ham, biznesingiz to\'xtovsiz ishlayveradi.' },
          { title: 'Dasturiy API xatolari va sinxronizatsiya muammolari', solution: 'Texnologik agentlik sifatida dasturiy xatolarni muhandislar guruhimiz bilan darhol hal qilamiz.' },
          { title: 'Payoneer/eBay hisoblarini tasdiqlash kechikishi', solution: 'KYC hujjatlarini to\'g\'ri tayyorlash orqali hisoblaringiz tezda tasdiqlanishini ta\'minlaymiz.' },
          { title: 'Firibgarlik shubhasi bilan noto\'g\'ri bloklanish', solution: 'eBay xavfsizlik botlari nimaga e\'tibor berishini bilib, toza IP/VPN va Kuki tizimini quramiz.' },
          { title: 'Bozorning to\'yinishi va katta raqobat', solution: 'Katta sotuvchilar e\'tibor bermaydigan yashirin va past raqobatli mikro-nitsalarni topishni o\'rgatamiz.' },
          { title: 'Mavsumiy tebranishlar tufayli daromad tushib ketishi', solution: 'Tovarlar katalogini har xil sohalarga (Uy, Avto, Bog\') bo\'lib, yil davomida barqaror daromad quramiz.' }
        ]
      }
    ],
    featuresTitle: 'Nega Biz Bilan Ishlashingiz Kerak?',
    features: [
      { title: 'Algoritmga Yo\'naltirilgan', desc: 'Eskirgan usullar emas, to\'g\'ridan-to\'g\'ri dolzarb 2026 Cassini qidiruv tizimi ma\'lumotlari bilan ishlash.' },
      { title: 'Nol Zaxira Xatari', desc: 'Bitta ham qutiga tegmasdan yuqori daromadli tovarlarni sotishni va logistikani o\'rganing.' },
      { title: '1-ga-1 Mentorlik', desc: 'Muammolarga duch kelganingizda yoki do\'koningizni kengaytirayotganingizda to\'g\'ridan-to\'g\'ri strategik yordam.' }
    ],
    pricingTitle: 'Raqamli aktivni qurishga tayyormisiz?',
    pricingDesc: 'Bepul blog darsliklarimiz orqali o\'rganing yoki do\'koningizni kattalashtirish uchun individual texnik konsaltingimizdan foydalaning.',
    pricingCta: 'Narxlar va Konsalting Uchun Bog\'laning'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    ...data.meta,
    alternates: constructAlternates('courses/ebay-dropshipping', 'egitimler/ebay-dropshipping', lang, 'kursy/ebay-dropshipping', 'kurslar/ebay-dropshipping')
  };
}

export default async function EbayDropshippingCourse({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params)?.lang || 'en';
  const dict = content[lang as keyof typeof content] || content.en;

  const contactLink = 
    lang === 'tr' ? '/tr/iletisim' : 
    lang === 'ru' ? '/ru/kontakty' : 
    lang === 'uz' ? '/uz/aloqa' : '/en/contact';

  const blogLink = `/${lang}/blog`;
  const homeLink = `/${lang}`;

  const IconMap: { [key: string]: React.ElementType } = {
    ShieldAlert,
    Truck,
    DollarSign,
    Users,
    Megaphone,
    Activity
  };

  const supportLabel = 
    lang === 'tr' ? 'Allmysell Desteği:' : 
    lang === 'ru' ? 'Поддержка Allmysell:' : 
    lang === 'uz' ? 'Allmysell Yordami:' : 'Allmysell Support:';

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A192F] selection:bg-[#0A192F] selection:text-white pb-32">
      {/* Hero Section */}
      <div className="w-full min-h-[70vh] bg-[#0A192F] relative overflow-hidden flex items-center pt-24 pb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-indigo-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[100%] bg-blue-500/20 rounded-full blur-[100px]"></div>
        
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <Link prefetch={false} href={homeLink} className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide">
              <ArrowLeft className="w-4 h-4" /> {dict.back}
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                <ShoppingCart className="w-6 h-6 text-indigo-400" />
              </div>
              <span className="text-indigo-300 font-semibold tracking-widest uppercase text-xs">{dict.tag}</span>
            </div>
            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              {dict.title}
            </h1>
            <p className="text-lg text-slate-300 mb-10 max-w-xl leading-relaxed">
              {dict.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={contactLink} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2">
                {dict.ctaPrimary} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href={blogLink} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                {dict.ctaSecondary}
              </Link>
            </div>
          </div>
          
          <div className="flex-1 hidden lg:block">
            <div className="relative w-full aspect-square max-w-md ml-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-3xl opacity-20 blur-2xl"></div>
              <div className="relative h-full bg-[#112240] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
                <div className="flex justify-between items-center mb-8">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-indigo-400" />
                  </div>
                  <span className="text-emerald-400 text-sm font-bold bg-emerald-400/10 px-3 py-1 rounded-full">+340% ROI</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Automated Revenue</h3>
                  <p className="text-slate-400 text-sm">Scale your store without touching physical inventory.</p>
                </div>
                <div className="mt-8 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-full h-12 bg-white/5 rounded-lg flex items-center px-4 gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-white/10 rounded w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 mt-20 text-center">
        <p className="text-xl md:text-2xl font-light text-[#0A192F] leading-relaxed">
          {dict.intro}
        </p>
      </section>

      {/* Modules Grid */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F]">{dict.modulesTitle}</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dict.modules.map((module) => (
            <div key={module.id} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <span className="relative z-10 text-5xl font-black text-slate-100 mb-6 block">0{module.id}</span>
              <h3 className="relative z-10 text-xl font-bold text-[#0A192F] mb-3">{module.title}</h3>
              <p className="relative z-10 text-slate-500">{module.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Risks & Pitfalls Section - Accordion Style */}
      <section className="bg-white py-24 mt-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-6">{dict.risksTitle}</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {dict.risksSubtitle}
            </p>
            <div className="w-24 h-1 bg-red-500 mx-auto mt-8 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dict.risks.map((risk, idx) => {
              const Icon = IconMap[risk.icon] || ShieldAlert;
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0A192F] leading-tight flex-1">
                      {risk.category}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {risk.problems.map((problem, pIdx) => (
                      <details key={pIdx} className="group [&_summary::-webkit-details-marker]:hidden border-b border-slate-200 last:border-0 pb-2 last:pb-0">
                        <summary className="flex items-start gap-3 cursor-pointer p-2 hover:bg-white rounded-lg transition-colors select-none">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0 group-open:bg-indigo-600 transition-colors"></div>
                          <span className="text-sm font-semibold text-slate-700 leading-snug group-open:text-indigo-700 transition-colors pr-2">
                            {problem.title}
                          </span>
                        </summary>
                        <div className="pl-6 pr-2 pt-1 pb-3 text-sm text-slate-600 ml-[3px] mt-1 border-l-2 border-indigo-200">
                          <span className="font-bold text-indigo-700 mb-1 block">
                            {supportLabel}
                          </span>
                          {problem.solution}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-[#0A192F] mb-12 text-center">{dict.featuresTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.features[0].title}</h3>
              <p className="text-slate-600">{dict.features[0].desc}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.features[1].title}</h3>
              <p className="text-slate-600">{dict.features[1].desc}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">{dict.features[2].title}</h3>
              <p className="text-slate-600">{dict.features[2].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 mt-24 text-center">
        <div className="bg-[#0A192F] rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/20 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{dict.pricingTitle}</h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              {dict.pricingDesc}
            </p>
            <Link href={contactLink} className="inline-flex items-center gap-2 bg-white text-[#0A192F] hover:bg-indigo-50 px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:scale-105 active:scale-95">
              {dict.pricingCta} <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
