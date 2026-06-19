import { Metadata } from 'next';
import { Layers, Compass, Target } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Digital Transformation & Strategic Technology Consulting',
      description: 'We restructure your project\'s business model, market share, and sustainable growth steps from scratch. Data-driven strategic technology and GTM consulting.',
      keywords: 'technology consulting, digital transformation, strategic planning, business model structure, st petersburg consulting firm, sustainable growth, GTM strategy, saas consulting',
    },
    back: 'Back to Services',
    tag: 'Management & Growth',
    title: 'Strategic Consulting',
    p1: 'You cannot build massive, disruptive brands just by writing code. For a technological product to succeed in today\'s hyper-competitive ecosystem, it must be rooted in the right business model, precise market needs, and an aggressively sustainable growth strategy. We build exactly this bridge between code and commerce.',
    h2_1: 'Architecting Before Coding',
    p2: 'The single biggest investment mistake in the digital world is jumping straight into software development without extensive market research, competitive analysis, and a solid Go-To-Market (GTM) setup. From the moment we sit at the table as Allmysell LLC, we put aside coding jargon and act as your fractional CTO and business partners. Who is the exact target audience? Where are the dominant competitors failing? How should the recurring revenue model be structured to minimize churn? We do not write a single line of code without crystal clear, data-backed answers to these fundamental questions.',
    f1_title: 'Digital Transformation Roadmap',
    f1_desc: 'We audit your existing monolithic systems, identify operational bottlenecks, and determine the exact modern Tech Stack that will adapt your company to the digital age without breaking the bank.',
    f2_title: 'Market Entry (GTM) and Growth',
    f2_desc: 'We architect your pricing strategies, set up advanced data analytics pipelines, and implement marketing automations for the seamless market integration of the products we develop.',
    h2_2: 'Data-Driven Decision Making (DDDM)',
    p3: 'Instincts and gut feelings are in the nature of trade, but in the modern digital economy, crucial business decisions must be dictated by raw data. We structure your company\'s fragmented data, run it through business intelligence (BI) models, and turn complex spreadsheets into clear, actionable insights. We redraw your company\'s roadmap over precise sales velocity trends, Customer Acquisition Cost (CAC) analyses, and early churn indicators.',
    h2_3: 'Agile Team and Culture Building',
    p4: 'The long-term sustainability of a newly established digital infrastructure is only possible with the right internal team equipped to run it. We don\'t just deploy your technological infrastructure and leave; we provide active, hands-on mentoring to your engineering and sales teams on operating these systems, adopting true Agile/Scrum management cultures, and accelerating internal innovation cycles.',
    h2_4: 'Our Consulting Methodology',
    tech_1_title: 'Market & Competitor Analysis',
    tech_1_desc: 'Deep-dive analysis of your industry landscape, identifying gaps in competitors\' offerings and positioning your product for maximum leverage.',
    tech_2_title: 'Financial & Pricing Strategy',
    tech_2_desc: 'Structuring Freemium, Tiered, or Usage-based SaaS pricing models optimized for maximum Annual Recurring Revenue (ARR).',
    tech_3_title: 'Tech Stack Auditing',
    tech_3_desc: 'Evaluating your current infrastructure for scalability, security compliance (GDPR/HIPAA), and cost-efficiency.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Do you provide long-term consulting or just one-off strategy?',
    faq_1_a: 'We provide both, but we highly recommend long-term strategic partnerships (Retainer or Fractional CTO basis) to continuously monitor metrics and pivot the business model as the market evolves.',
    faq_2_q: 'How do you measure digital transformation success?',
    faq_2_a: 'We define clear, trackable KPIs such as Customer Acquisition Cost (CAC), Lifetime Value (LTV), Monthly Recurring Revenue (MRR) growth, and internal process efficiency metrics before starting any project.',
    faq_3_q: 'Can you consult an existing in-house software team?',
    faq_3_a: 'Absolutely. We frequently act as external technical auditors and Agile mentors to help existing in-house engineering teams overcome technical debt and increase delivery speed.',
    faq_4_q: 'Do you help with investor pitch decks or startup funding strategies?',
    faq_4_a: 'Yes. We help startups translate their technical architectures into business value for investors, ensuring your technical roadmap aligns perfectly with funding milestones.'
  },
  tr: {
    meta: {
      title: 'Dijital Dönüşüm ve Stratejik Teknoloji Danışmanlığı',
      description: 'Projenizin iş modelini, pazar payını ve büyüme adımlarını baştan kurguluyoruz. Veri odaklı stratejik teknoloji ve GTM (Pazara Çıkış) danışmanlığı.',
      keywords: 'teknoloji danışmanlığı, dijital dönüşüm, stratejik planlama, iş modeli kurgusu, st petersburg danışmanlık firması, sürdürülebilir büyüme, saas danışmanlığı, cto hizmeti',
    },
    back: 'Hizmetlere Dön',
    tag: 'Yönetim & Büyüme',
    title: 'Stratejik Danışmanlık',
    p1: 'Yalnızca kod yazarak veya şık tasarımlar yaparak devasa markalar yaratamazsınız. Bir teknolojik ürünün bugünün acımasız rekabet ortamında hayatta kalabilmesi için; doğru iş modeline, pazarın gerçek ihtiyaçlarına ve agresif ama sürdürülebilir bir büyüme stratejisine (Growth Hacking) dayanması gerekir. Biz, teknoloji ile ticaret arasındaki bu hayati köprüyü kuruyoruz.',
    h2_1: 'Kodlamadan Önce Mimarilendirme',
    p2: 'Dijital dünyada yapılan en büyük yatırım hatası, derinlemesine pazar araştırması ve iş modeli (Business Model Canvas) kurgulanmadan doğrudan yazılım geliştirmeye başlanmasıdır. Allmysell LLC olarak masaya oturduğumuz ilk andan itibaren, kodlama jargonlarını bir kenara bırakıp sizinle birer "Fractional CTO" ve iş ortağı gibi pazar stratejileri geliştiriyoruz. Ürünün hedef kitlesi tam olarak kim? Hakim rakipler nerede hata yapıyor? Gelir modeli (Abonelik, komisyon vb.) müşteri kaybını (churn) en aza indirecek şekilde nasıl yapılandırılmalı? Bu soruların veriye dayalı net yanıtları olmadan tek bir satır kod yazmıyoruz.',
    f1_title: 'Dijital Dönüşüm Yol Haritası',
    f1_desc: 'Mevcut hantal sistemlerinizi analiz edip operasyonel darboğazları buluyor ve şirketinizi dijital çağa adapte edecek en uygun maliyetli, modern teknoloji yığınını (Tech Stack) belirliyoruz.',
    f2_title: 'Pazara Giriş (GTM) ve Büyüme',
    f2_desc: 'Geliştirdiğimiz ürünlerin kusursuz pazar entegrasyonu için fiyatlandırma stratejileri, veri analitiği hunileri (funnel) ve otomatik pazarlama altyapıları kuruyoruz.',
    h2_2: 'Veri Odaklı Karar Alma (DDDM)',
    p3: 'İçgüdüler ticaretin doğasında vardır, ancak modern dijital ekonomide kritik şirket kararlarını ham veriler almalıdır. Şirketinizin farklı departmanlara dağılmış verilerini yapılandırıyor, İş Zekası (BI) modelleriyle anlamlandırıyor ve karmaşık Excel tablolarını net, aksiyon alınabilir içgörülere çeviriyoruz. Satış eğilimleri, Müşteri Edinme Maliyeti (CAC) analizleri ve erken Churn (terk) sinyalleri üzerinden şirketin rotasını sürekli olarak optimize ediyoruz.',
    h2_3: 'Çevik (Agile) Ekip ve Kültür İnşası',
    p4: 'Yeni kurulan dijital bir altyapının uzun vadede sürdürülebilir olması, ancak o sistemi kullanacak doğru kurum içi ekiple mümkündür. Teknolojik altyapınızı kurup gitmiyor; mühendislik ve satış ekiplerinize bu sistemlerin eğitimi, gerçek Çevik (Agile/Scrum) yönetim kültürünün benimsetilmesi ve kurum içi inovasyon döngülerinin hızlandırılması konusunda aktif ve uygulamalı mentorluk sağlıyoruz.',
    h2_4: 'Danışmanlık Metodolojimiz',
    tech_1_title: 'Pazar ve Rakip Analizi',
    tech_1_desc: 'Sektörünüzün derinlemesine analizi yapılarak rakiplerinizin ürünlerindeki boşluklar tespit edilir ve ürününüz maksimum pazar avantajı için konumlandırılır.',
    tech_2_title: 'Finansal ve Fiyatlandırma Stratejisi',
    tech_2_desc: 'Yıllık Tekrarlayan Geliri (ARR) maksimize edecek Freemium, Kademeli veya Kullanım Bazlı (Usage-based) SaaS fiyatlandırma modellerinin kurgulanması.',
    tech_3_title: 'Teknoloji (Tech Stack) Denetimi',
    tech_3_desc: 'Mevcut yazılım altyapınızın ölçeklenebilirlik, güvenlik uyumluluğu (KVKK/GDPR) ve sunucu maliyet verimliliği açısından denetlenmesi.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Uzun vadeli danışmanlık mı yoksa tek seferlik strateji mi sunuyorsunuz?',
    faq_1_a: 'Her ikisini de sunuyoruz, ancak pazar dinamikleri değiştikçe metrikleri sürekli izlemek ve iş modelini anında pivote edebilmek için uzun vadeli stratejik ortaklıkları (Retainer bazlı) şiddetle tavsiye ediyoruz.',
    faq_2_q: 'Dijital dönüşüm başarısını nasıl ölçüyorsunuz?',
    faq_2_a: 'Herhangi bir projeye başlamadan önce Müşteri Edinme Maliyeti (CAC), Müşteri Yaşam Boyu Değeri (LTV), Aylık Tekrarlayan Gelir (MRR) büyümesi ve iç süreç verimliliği gibi net, ölçülebilir KPI\'lar belirliyoruz.',
    faq_3_q: 'Mevcut kurum içi (in-house) yazılım ekibimize danışmanlık verebilir misiniz?',
    faq_3_a: 'Kesinlikle. Genellikle mevcut in-house mühendislik ekiplerinin "teknik borç" (technical debt) sarmalından kurtulmasına ve ürün teslim hızını artırmasına yardımcı olmak için dış denetçi ve Çevik (Agile) mentor olarak görev yapıyoruz.',
    faq_4_q: 'Yatırımcı sunumları (Pitch Deck) veya startup fonlama stratejilerinde yardımcı oluyor musunuz?',
    faq_4_a: 'Evet. Startupların teknik mimarilerini yatırımcılar için "ticari değere" dönüştürmelerine yardımcı oluyor, teknik yol haritanızın yatırım (funding) kilometre taşlarıyla mükemmel bir şekilde uyumlu olmasını sağlıyoruz.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  const path = lang === 'tr' ? '/tr/hizmetler/stratejik-danismanlik' : '/en/services/strategic-consulting';
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/strategic-consulting', 'hizmetler/stratejik-danismanlik', lang)
  };
}

export default async function StratejikDanismanlik({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params)?.lang || 'en';
  const dict = content[lang as keyof typeof content] || content.en;

  return (
    <ServicePageTemplate 
      lang={lang}
      dict={dict}
      HeaderIcon={Layers}
      Feature1Icon={Compass}
      Feature2Icon={Target}
      serviceCta={lang === 'tr' 
        ? { title: "Bu Hizmeti Projenizde Kullanmak İster misiniz?", desc: "Ekibimiz, projenize özel bir teknik değerlendirme hazırlamak için hazır. İlk görüşme ücretsizdir.", cta: "Ücretsiz Keşif Toplantısı" }
        : { title: "Want to Use This Service for Your Project?", desc: "Our team is ready to prepare a custom technical assessment for your project. First consultation is free.", cta: "Free Discovery Call" }
      }
    />
  );
}
