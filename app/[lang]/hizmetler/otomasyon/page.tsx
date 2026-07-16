import { Metadata } from 'next';
import { Settings, Cpu, Bot } from 'lucide-react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { constructAlternates } from '@/lib/seo';

const content = {
  en: {
    meta: {
      title: 'Business Automation Solutions',
      description: 'Streamline your operations with our custom business automation solutions. Reduce manual work, lower costs, and increase efficiency with AI and workflow automation.',
      keywords: 'business automation, workflow automation, process automation, AI automation, operational efficiency, robotic process automation',
    },
    back: 'Back to Services',
    tag: 'Efficiency & Growth',
    title: 'Business Automation',
    p1: 'In the modern business landscape, manual repetitive tasks are the biggest bottleneck to growth and profitability. We design and implement intelligent automation systems that work 24/7, eliminating human error and freeing up your team to focus on strategic initiatives.',
    h2_1: 'Our Automation Approach',
    p2: 'We do not just provide generic tools; we deeply analyze your current workflows and architect bespoke automation pipelines. From connecting disparate software systems to integrating advanced AI agents, we build seamless, autonomous processes that drastically lower your operational costs and scale effortlessly with your business.',
    f1_title: 'End-to-End Workflow Integration',
    f1_desc: 'We connect your CRM, ERP, and marketing platforms, ensuring data flows instantly and flawlessly across your entire ecosystem without manual intervention.',
    f2_title: 'AI-Powered Process Automation',
    f2_desc: 'Leveraging cutting-edge AI and machine learning, we automate complex decision-making processes, from intelligent customer support routing to predictive data analysis.',
    h2_2: 'Scalable Infrastructure',
    p3: 'Our automation solutions are built on robust, cloud-native architectures that guarantee high availability and security. Whether you are processing a hundred transactions a day or a million, our systems scale dynamically to meet your demands without skipping a beat.',
    h2_3: 'Measurable ROI',
    p4: 'Every automation we implement is designed with clear metrics in mind. We provide comprehensive dashboards to track time saved, error reduction, and overall cost savings, ensuring a rapid and transparent return on your investment.',
    h2_4: 'Automation Technologies',
    tech_1_title: 'Integration Platforms',
    tech_1_desc: 'Make, Zapier, n8n, and custom API development for seamless system connectivity.',
    tech_2_title: 'AI & Machine Learning',
    tech_2_desc: 'OpenAI, Anthropic, and custom LLM integrations for intelligent data processing and autonomous agents.',
    tech_3_title: 'Cloud & Infrastructure',
    tech_3_desc: 'AWS Lambda, Google Cloud Functions, and robust cloud infrastructure for scalable execution.',
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'How long does it take to implement an automation system?',
    faq_1_a: 'Depending on the complexity of your workflows, basic automations can be deployed in weeks, while comprehensive enterprise systems may take a few months to perfect.',
    faq_2_q: 'Do we need to change our existing software?',
    faq_2_a: 'In most cases, no. Our goal is to connect and optimize the tools you already use, minimizing disruption while maximizing efficiency.',
    faq_3_q: 'Are automated processes secure?',
    faq_3_a: 'Absolutely. We implement enterprise-grade encryption, secure API connections, and strict access controls to ensure your data remains completely secure.',
    faq_4_q: 'What if an automated process fails?',
    faq_4_a: 'We build robust error handling and alerting systems into every automation. If an issue occurs, the system automatically notifies the designated team members while failing gracefully.'
  },
  tr: {
    meta: {
      title: 'İş Süreçleri Otomasyonu',
      description: 'Özel iş otomasyonu çözümlerimizle operasyonlarınızı hızlandırın. Yapay zeka ve iş akışı otomasyonu ile manuel işleri azaltın, maliyetleri düşürün ve verimliliği artırın.',
      keywords: 'iş otomasyonu, iş akışı otomasyonu, süreç otomasyonu, yapay zeka otomasyonu, operasyonel verimlilik, robotik süreç otomasyonu',
    },
    back: 'Hizmetlere Dön',
    tag: 'Verimlilik & Büyüme',
    title: 'Süreç Otomasyonu',
    p1: 'Modern iş dünyasında manuel ve tekrarlayan görevler, büyüme ve karlılığın önündeki en büyük engeldir. İnsan hatasını ortadan kaldıran ve ekibinizin stratejik hedeflere odaklanmasını sağlayan, 7/24 çalışan akıllı otomasyon sistemleri tasarlıyor ve uyguluyoruz.',
    h2_1: 'Otomasyon Yaklaşımımız',
    p2: 'Sadece standart araçlar sunmuyoruz; mevcut iş akışlarınızı derinlemesine analiz ediyor ve size özel otomasyon mimarileri kurguluyoruz. Farklı yazılım sistemlerini birbirine bağlamaktan gelişmiş yapay zeka ajanlarını entegre etmeye kadar, operasyonel maliyetlerinizi ciddi oranda düşüren ve işletmenizle birlikte zahmetsizce ölçeklenen otonom süreçler inşa ediyoruz.',
    f1_title: 'Uçtan Uca İş Akışı Entegrasyonu',
    f1_desc: 'CRM, ERP ve pazarlama platformlarınızı birbirine bağlayarak, verilerin tüm ekosisteminizde manuel müdahale olmadan anında ve kusursuz bir şekilde akmasını sağlıyoruz.',
    f2_title: 'Yapay Zeka Destekli Süreç Otomasyonu',
    f2_desc: 'En yeni yapay zeka ve makine öğrenimi teknolojilerinden yararlanarak, akıllı müşteri destek yönlendirmesinden öngörüsel veri analizine kadar karmaşık karar alma süreçlerini otomatikleştiriyoruz.',
    h2_2: 'Ölçeklenebilir Altyapı',
    p3: 'Otomasyon çözümlerimiz, yüksek erişilebilirlik ve güvenlik garanti eden sağlam, bulut tabanlı mimariler üzerine inşa edilmiştir. İster günde yüz işlem, ister bir milyon işlem yapıyor olun, sistemlerimiz ihtiyaçlarınızı karşılamak için dinamik olarak ölçeklenir.',
    h2_3: 'Ölçülebilir Yatırım Getirisi (ROI)',
    p4: 'Uyguladığımız her otomasyon, net metrikler göz önünde bulundurularak tasarlanır. Kazanılan zamanı, azalan hataları ve genel maliyet tasarruflarını takip etmeniz için kapsamlı gösterge panelleri (dashboard) sunarak, yatırımınızın hızlı ve şeffaf bir şekilde geri dönmesini sağlıyoruz.',
    h2_4: 'Kullandığımız Otomasyon Teknolojileri',
    tech_1_title: 'Entegrasyon Platformları',
    tech_1_desc: 'Kusursuz sistem bağlantısı için Make, Zapier, n8n ve özel API geliştirme.',
    tech_2_title: 'Yapay Zeka & Makine Öğrenimi',
    tech_2_desc: 'Akıllı veri işleme ve otonom ajanlar için OpenAI, Anthropic ve özel LLM entegrasyonları.',
    tech_3_title: 'Bulut & Altyapı',
    tech_3_desc: 'Ölçeklenebilir yürütme için AWS Lambda, Google Cloud Functions ve sağlam bulut altyapısı.',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_1_q: 'Bir otomasyon sisteminin uygulanması ne kadar sürer?',
    faq_1_a: 'İş akışlarınızın karmaşıklığına bağlı olarak, temel otomasyonlar haftalar içinde devreye alınabilirken, kapsamlı kurumsal sistemlerin mükemmelleştirilmesi birkaç ay sürebilir.',
    faq_2_q: 'Mevcut yazılımlarımızı değiştirmemiz gerekiyor mu?',
    faq_2_a: 'Çoğu durumda hayır. Amacımız, halihazırda kullandığınız araçları bağlamak ve optimize etmek, böylece kesintileri en aza indirirken verimliliği en üst düzeye çıkarmaktır.',
    faq_3_q: 'Otomatik süreçler güvenli mi?',
    faq_3_a: 'Kesinlikle. Verilerinizin tamamen güvende kalmasını sağlamak için kurumsal düzeyde şifreleme, güvenli API bağlantıları ve sıkı erişim kontrolleri uyguluyoruz.',
    faq_4_q: 'Otomatik bir süreç başarısız olursa ne olur?',
    faq_4_a: 'Her otomasyona sağlam hata ayıklama ve uyarı sistemleri entegre ediyoruz. Bir sorun oluştuğunda, sistem işlemi güvenli bir şekilde durdururken ilgili ekip üyelerini otomatik olarak bilgilendirir.'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params)?.lang || 'en';
  const data = content[lang as keyof typeof content] || content.en;
  
  return {
    ...data.meta,
    alternates: constructAlternates('services/automation', 'hizmetler/otomasyon', lang)
  };
}

export default async function Otomasyon({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params)?.lang || 'en';
  const dict = content[lang as keyof typeof content] || content.en;

  return (
    <ServicePageTemplate 
      lang={lang}
      dict={dict}
      HeaderIcon={Settings}
      Feature1Icon={Bot}
      Feature2Icon={Cpu}
      serviceCta={lang === 'tr' 
        ? { title: "Bu Hizmeti Projenizde Kullanmak İster misiniz?", desc: "Ekibimiz, projenize özel bir teknik değerlendirme hazırlamak için hazır. İlk görüşme ücretsizdir.", cta: "Ücretsiz Keşif Toplantısı" }
        : { title: "Want to Use This Service for Your Project?", desc: "Our team is ready to prepare a custom technical assessment for your project. First consultation is free.", cta: "Free Discovery Call" }
      }
    />
  );
}
