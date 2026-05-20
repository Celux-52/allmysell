"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Particles } from "@/components/ui/particles";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  X, 
  Smartphone, 
  Search, 
  Cpu, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  Layers, 
  Activity,
  Maximize2
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function WebSolutionsPage() {
  const { lang } = useI18n();

  // State for simulated interactive phone mockup (salon page vs clinic preview)
  const [mockupType, setMockupType] = useState<"salon" | "clinic">("salon");

  // Comprehensive Translation Dictionary for all 7 languages
  // Turkish (tr) is the primary fallback for unsupported locales.
  const translationsDict: Record<string, any> = {
    tr: {
      badge: "ÖZEL BÖLGESEL PRESTİJ PROJESİ",
      heroTitle1: "Modern İşletmeler İçin",
      heroTitle2: "Kusursuz Dijital Prestij",
      heroDesc: "AllMySell LLC olarak yerel işletmelerin dijital saygınlığını yeniden tanımlıyoruz. WordPress şablonlarından uzak, işletmenizin kalitesini birebir yansıtan, hız ve dönüşüm odaklı özel web mühendisliği sistemleri sunuyoruz.",
      ctaDiscover: "Hizmeti Keşfedin",
      ctaShowcase: "Örnek Tasarımı İnceleyin",
      
      whyTitle: "Neden Profesyonel Bir Web Sistemi?",
      whyDesc: "Web siteniz, markanızın dijital dünyadaki ana giriş kapısıdır. Yavaş, özensiz veya ucuz bir şablonla kurulmuş bir site; sunduğunuz üstün hizmet kalitesine gölge düşürür ve müşterilerinizde güvensizlik yaratır. Biz, işletmenizin el emeğini ve prestijini dijitalde hak ettiği saygınlıkla sergiliyoruz.",
      
      pillarsTitle: "Mühendislik ve Güven Standartlarımız",
      pillarsSub: "Sadece güzel görünmeyen, işletmenizi büyüten altyapı özellikleri",
      
      pillar1Title: "Kusursuz Mobil Deneyim",
      pillar1Desc: "Yerel aramaların %85'inden fazlası mobil cihazlardan gelir. Telefon ekranlarında yağ gibi akan özel mobil akışlar tasarlıyoruz.",
      
      pillar2Title: "Google Yerel SEO Hakimiyeti",
      pillar2Desc: "'Bölgemdeki en iyi salon', 'yakınımdaki klinik' aramalarında Google'da ilk sıralarda görünmenizi sağlayan yapısal SEO kodlaması.",
      
      pillar3Title: "Milisaniyelik Açılış Hızları",
      pillar3Desc: "Next.js 15 ve Vercel Edge sunucuları ile 0.8 saniyenin altında yüklenme hızları. Yavaş açılan sitelerin aksine sıfır müşteri kaybı.",
      
      pillar4Title: "Dönüşüm Odaklı Mimari",
      pillar4Desc: "Sıradan sayfaların aksine, ziyaretçiyi anında WhatsApp randevu hattına veya rezervasyon sistemine bağlayan sıfır sürtünmeli CTA'ler.",
      
      contrastTitle: "Farkı Kendi Gözlerinizle Görün",
      contrastSub: "Neden ucuz şablonların size müşteri kaybettirdiğini görün",
      contrastBadTitle: "Diğerleri (Standart Şablon & WordPress)",
      contrastGoodTitle: "AllMySell Premium Standartı",
      
      timelineTitle: "Yaratım ve Yayına Alım Süreci",
      timelineSub: "Fikir aşamasından yayına kadar tamamen şeffaf süreç",
      
      step1Title: "1. Keşif & Bölgesel Analiz",
      step1Desc: "Bölgenizdeki rakipleri, müşteri arama alışkanlıklarını ve hedef kelimeleri inceliyoruz.",
      step2Title: "2. Özel Arayüz Tasarımı",
      step2Desc: "Şablon kullanmadan, markanızın prestijini ve kalitesini tam yansıtan el yapımı tasarım taslakları sunuyoruz.",
      step3Title: "3. SEO & Altyapı Mühendisliği",
      step3Desc: "Tasarımı en güncel kodlama standartlarıyla Next.js'e döküyor, Lighthouse skorlarını 100'e sabitliyoruz.",
      step4Title: "4. Bölgesel Lansman & Canlı",
      step4Desc: "Sitenizi global bulut sunucularda yayına alıyor, Google Haritalar profilinizle entegre ederek dönüşümü başlatıyoruz.",
      
      finalBadge: "🔴 SINIRLI BÖLGESEL KONTENJAN",
      finalTitle: "Bölgemizdeki Tek Lider İşletme Siz Olun",
      finalDesc: "Hizmet ve operasyon kalitemizi en üst düzeyde tutmak amacıyla, her bölgede sadece TEK bir işletmenin kurumsal web tasarım projesini üstleniyoruz. Diğer rakipleriniz harekete geçmeden önce prestijli yerinizi ayırtın.",
      finalCta: "WhatsApp ile 'BAŞLAYALIM' Yazın",
      finalSubCta: "Ön görüşme tamamen ücretsizdir. Taahhüt gerektirmez."
    },
    en: {
      badge: "EXCLUSIVE REGIONAL PRESTIGE PROJECT",
      heroTitle1: "Bespoke Digital Prestige",
      heroTitle2: "For Modern Businesses",
      heroDesc: "At AllMySell LLC, we redefine digital prestige for premium local businesses. Zero templates. Zero compromises. We build bespoke, lightning-fast web systems engineered to turn search traffic into loyal customers.",
      ctaDiscover: "Explore Solutions",
      ctaShowcase: "View Showcases",
      
      whyTitle: "Why Custom Web Infrastructure Matters",
      whyDesc: "Your website is the single most important trust factor for a new customer. A slow, outdated, or template-based page actively bleeds authority and pushes high-intent leads to your competitors. We construct elite digital facades that command premium value.",
      
      pillarsTitle: "Our Engineering & Performance Standards",
      pillarsSub: "Infrastructure engineered to convert visitors into booked appointments",
      
      pillar1Title: "Mobile-First UX",
      pillar1Desc: "Over 85% of local discovery happens on mobile. We handcraft responsive mobile-first journeys built for smartphone conversions.",
      
      pillar2Title: "Local SEO Engine",
      pillar2Desc: "Dominate local searches like 'best clinic near me' or 'premium salon'. We embed schema markup and semantic SEO directly into the core code.",
      
      pillar3Title: "Sub-Second Speed",
      pillar3Desc: "Built on Next.js 15 and serverless edge deployment. 0.8s load times guarantee zero drop-offs and flawless search indexing.",
      
      pillar4Title: "Conversion Engineering",
      pillar4Desc: "Zero-friction client loops connecting visitors instantly to your direct booking system or high-velocity WhatsApp channels.",
      
      contrastTitle: "The Architectural Contrast",
      contrastSub: "Understand why amateur templates actively damage your business authority",
      contrastBadTitle: "The Template Approach (Generic WordPress)",
      contrastGoodTitle: "The AllMySell Standard",
      
      timelineTitle: "The Engineering Roadmap",
      timelineSub: "A fully-managed, frictionless deployment process from audit to launch",
      
      step1Title: "1. Local Discovery & Audit",
      step1Desc: "We analyze regional competitors, map local search volume, and define high-value search keywords.",
      step2Title: "2. Bespoke UI/UX Design",
      step2Desc: "Zero standard templates. We build custom design drafts reflecting the luxury character of your physical location.",
      step3Title: "3. Performance Engineering",
      step3Desc: "We hardcode your site into high-performance Next.js 15, securing perfect 100/100 Lighthouse performance metrics.",
      step4Title: "4. Regional Launch & Scaling",
      step4Desc: "Deploy to absolute high availability, link with Google Maps/Places profiles, and open instant booking pipelines.",
      
      finalBadge: "🔴 STRICT REGIONAL LIMITATION",
      finalTitle: "Claim Market Dominance in Your Area",
      finalDesc: "To maintain absolute engineering and service quality, we execute web solutions for ONLY ONE premium business per sector in each region. Secure your digital monopoly before a competitor does.",
      finalCta: "Text 'START' on WhatsApp",
      finalSubCta: "Discovery consult is 100% free. Zero obligation."
    },
    de: {
      badge: "EXKLUSIVES REGIONALES PRESTIGE-PROJEKT",
      heroTitle1: "Maßgeschneidertes digitales Prestige",
      heroTitle2: "Für moderne Unternehmen",
      heroDesc: "Bei AllMySell LLC definieren wir das digitale Prestige für erstklassige lokale Unternehmen neu. Keine Vorlagen. Keine Kompromisse. Wir entwickeln maßgeschneiderte, blitzschnelle Websysteme, die darauf ausgelegt sind, Suchverkehr in treue Kunden zu verwandeln.",
      ctaDiscover: "Lösungen erkunden",
      ctaShowcase: "Referenzen ansehen",
      
      whyTitle: "Warum maßgeschneiderte Webinfrastruktur entscheidend ist",
      whyDesc: "Ihre Website ist der wichtigste Vertrauensfaktor für einen neuen Kunden. Eine langsame, veraltete oder auf Vorlagen basierende Seite beeinträchtigt Ihre Autorität und treibt wertvolle Leads zu Ihren Konkurrenten. Wir bauen erstklassige digitale Fassaden, die Premium-Wert vermitteln.",
      
      pillarsTitle: "Unsere Engineering- und Leistungsstandards",
      pillarsSub: "Infrastruktur, die darauf ausgelegt ist, Besucher in gebuchte Termine zu verwandeln",
      
      pillar1Title: "Mobile-First UX",
      pillar1Desc: "Über 85 % der lokalen Suchen finden auf Mobilgeräten statt. Wir entwerfen reaktionsschnelle, mobile Journeys für Smartphone-Konvertierungen.",
      
      pillar2Title: "Local SEO Engine",
      pillar2Desc: "Dominieren Sie lokale Suchen wie 'bester Salon' oder 'Klinik in der Nähe'. Wir integrieren strukturierte Daten direkt in den Code.",
      
      pillar3Title: "Sub-Second Speed",
      pillar3Desc: "Basiert auf Next.js 15 und Edge-Serverless-Deployment. Ladezeiten von unter 0,8 Sekunden verhindern jeden Kundenabsprung.",
      
      pillar4Title: "Conversion-Engineering",
      pillar4Desc: "Reibungslose Abläufe, die Besucher sofort mit Ihrem Buchungssystem oder direkten WhatsApp-Kanälen verbinden.",
      
      contrastTitle: "Der architektonische Kontrast",
      contrastSub: "Verstehen Sie, warum Standard-Vorlagen Ihrem geschäftlichen Ansehen schaden",
      contrastBadTitle: "Der Template-Ansatz (Klassisches WordPress)",
      contrastGoodTitle: "Der AllMySell Premium-Standard",
      
      timelineTitle: "Der Entwicklungsfahrplan",
      timelineSub: "Ein vollständig verwalteter, reibungsloser Bereitstellungsprozess von der Analyse bis zum Start",
      
      step1Title: "1. Lokale Analyse & Audit",
      step1Desc: "Wir analysieren regionale Wettbewerber, erfassen das lokale Suchvolumen und definieren Keywords.",
      step2Title: "2. Individuelles UI/UX-Design",
      step2Desc: "Keine fertigen Layouts. Wir erstellen Entwürfe, die den exklusiven Charakter Ihres physischen Standorts widerspiegeln.",
      step3Title: "3. Performance-Engineering",
      step3Desc: "Wir programmieren Ihre Seite in Next.js 15 und garantieren perfekte 100/100 Lighthouse-Performance-Werte.",
      step4Title: "4. Regionaler Launch & Skalierung",
      step4Desc: "Veröffentlichung auf weltweiten Cloud-Servern, Integration mit Google Maps und Eröffnung direkter Buchungskanäle.",
      
      finalBadge: "🔴 STRIKTE REGIONALE LIMITIERUNG",
      finalTitle: "Sichern Sie sich die Marktführerschaft vor Ort",
      finalDesc: "Um die absolute Qualität im Engineering und Service zu halten, realisieren wir Web-Lösungen für NUR EIN Premium-Unternehmen pro Branche in jeder Region. Sichern Sie sich Ihr Monopol.",
      finalCta: "Schreiben Sie 'START' auf WhatsApp",
      finalSubCta: "Die Erstberatung ist 100% kostenlos. Völlig unverbindlich."
    },
    fr: {
      badge: "PROJET DE PRESTIGE RÉGIONAL EXCLUSIF",
      heroTitle1: "Prestige Numérique Sur Mesure",
      heroTitle2: "Pour les Entreprises Modernes",
      heroDesc: "Chez AllMySell LLC, nous redéfinissons le prestige numérique pour les commerces locaux haut de gamme. Zéro template. Zéro compromis. Nous développons des systèmes web sur mesure et ultra-rapides, conçus pour convertir le trafic en clients fidèles.",
      ctaDiscover: "Découvrir les Solutions",
      ctaShowcase: "Voir les Projets",
      
      whyTitle: "Pourquoi une infrastructure web sur mesure est essentielle",
      whyDesc: "Votre site web est le facteur de confiance le plus crucial pour un nouveau client. Une page lente, obsolète ou basée sur un modèle nuit gravement à votre autorité et pousse vos clients potentiels vers la concurrence. Nous construisons des vitrines numériques d'élite.",
      
      pillarsTitle: "Nos Standards d'Ingénierie et de Performance",
      pillarsSub: "Une infrastructure conçue pour convertir les visiteurs en rendez-vous confirmés",
      
      pillar1Title: "UX Mobile-First",
      pillar1Desc: "Plus de 85% des recherches locales ont lieu sur mobile. Nous concevons des parcours fluides et optimisés pour les smartphones.",
      
      pillar2Title: "Moteur SEO Local",
      pillar2Desc: "Dominez les recherches locales comme 'meilleur salon' ou 'clinique à proximité'. Nous intégrons les balises de données structurées.",
      
      pillar3Title: "Vitesse Inférieure à la Seconde",
      pillar3Desc: "Développé avec Next.js 15 et déployé sur serveurs edge. Un chargement en 0,8s garantit l'absence de perte de trafic.",
      
      pillar4Title: "Ingénierie de Conversion",
      pillar4Desc: "Des appels à l'action fluides reliant instantanément vos visiteurs à votre agenda ou à vos canaux WhatsApp directs.",
      
      contrastTitle: "Le Contraste Architectural",
      contrastSub: "Comprenez pourquoi les modèles amateurs nuisent activement à votre crédibilité",
      contrastBadTitle: "L'Approche Template (WordPress Générique)",
      contrastGoodTitle: "Le Standard AllMySell Premium",
      
      timelineTitle: "La Feuille de Route",
      timelineSub: "Un processus de déploiement entièrement géré et sans friction, de l'audit au lancement",
      
      step1Title: "1. Audit & Découverte Locale",
      step1Desc: "Nous analysons les concurrents régionaux, cartographions le volume de recherche et définissons les mots-clés.",
      step2Title: "2. Design UI/UX Personnalisé",
      step2Desc: "Aucun template standard. Nous créons des maquettes reflétant le caractère luxueux de votre établissement.",
      step3Title: "3. Ingénierie de Performance",
      step3Desc: "Nous codons votre site sous Next.js 15, garantissant des scores de performance Lighthouse parfaits à 100/100.",
      step4Title: "4. Lancement Régional & Évolution",
      step4Desc: "Déploiement sur des serveurs cloud globaux, liaison avec Google Maps et ouverture des canaux de réservation instantanés.",
      
      finalBadge: "🔴 LIMITATION RÉGIONALE STRICTE",
      finalTitle: "Devenez le Leader Unique de Votre Région",
      finalDesc: "Pour maintenir une qualité de service absolue, nous réalisons des solutions web pour SEULEMENT UNE entreprise premium par secteur dans chaque région. Sécurisez votre monopole.",
      finalCta: "Envoyez 'START' sur WhatsApp",
      finalSubCta: "La consultation de découverte est 100% gratuite. Sans engagement."
    },
    es: {
      badge: "PROYECTO DE PRESTIGIO REGIONAL EXCLUSIVO",
      heroTitle1: "Prestigio Digital a Medida",
      heroTitle2: "Para Negocios Modernos",
      heroDesc: "En AllMySell LLC, redefinimos el prestigio digital para negocios locales premium. Cero plantillas. Cero compromisos. Diseñamos sistemas web a medida y ultra rápidos, creados para convertir el tráfico de búsqueda en clientes fieles.",
      ctaDiscover: "Explorar Soluciones",
      ctaShowcase: "Ver Portafolio",
      
      whyTitle: "Por qué importa una infraestructura web a medida",
      whyDesc: "Su sitio web es el factor de confianza más importante para un nuevo cliente. Una página lenta, obsoleta o basada en plantillas daña activamente su autoridad y empuja a los clientes potenciales hacia sus competidores. Construimos fachadas digitales de élite.",
      
      pillarsTitle: "Nuestros Estándares de Ingeniería y Rendimiento",
      pillarsSub: "Infraestructura diseñada para convertir visitantes en citas reservadas",
      
      pillar1Title: "UX Mobile-First",
      pillar1Desc: "Más del 85% de las búsquedas locales ocurren en móviles. Diseñamos flujos adaptativos fluidos para conversiones en teléfonos.",
      
      pillar2Title: "Local SEO Engine",
      pillar2Desc: "Domine búsquedas locales como 'mejor clínica cerca' o 'salón premium'. Insertamos marcado schema semántico en el código.",
      
      pillar3Title: "Velocidad de Subsegundo",
      pillar3Desc: "Desarrollado en Next.js 15 con despliegue en servidores edge. Tiempos de carga de 0.8s garantizan cero pérdidas de clientes.",
      
      pillar4Title: "Ingeniería de Conversión",
      pillar4Desc: "Enlaces sin fricción que conectan a los visitantes al instante con su sistema de reservas o chats de WhatsApp directos.",
      
      contrastTitle: "El Contraste Arquitectónico",
      contrastSub: "Entienda por qué las plantillas estándar dañan la autoridad de su negocio",
      contrastBadTitle: "El Enfoque de Plantilla (WordPress Común)",
      contrastGoodTitle: "El Estándar AllMySell Premium",
      
      timelineTitle: "El Mapa de Ruta",
      timelineSub: "Un proceso de despliegue gestionado y sin fricciones, desde el análisis al lanzamiento",
      
      step1Title: "1. Descubrimiento & Análisis Local",
      step1Desc: "Analizamos los competidores de la zona, medimos los volúmenes de búsqueda y definimos palabras clave clave.",
      step2Title: "2. Diseño UI/UX Exclusivo",
      step2Desc: "Sin plantillas prehechas. Diseñamos bocetos a medida que proyectan la esencia lujosa de su local físico.",
      step3Title: "3. Ingeniería de Rendimiento",
      step3Desc: "Compilamos el diseño en Next.js 15 de alto rendimiento, logrando métricas perfectas de 100/100 en Lighthouse.",
      step4Title: "4. Lanzamiento & Crecimiento Local",
      step4Desc: "Publicamos el sitio en la nube global, lo enlazamos con Google Maps y abrimos las tuberías de reservas inmediatas.",
      
      finalBadge: "🔴 RESTRICCIÓN REGIONAL ESTRICTA",
      finalTitle: "Sea el Único Líder Digital en su Zona",
      finalDesc: "Para asegurar la máxima calidad en desarrollo y soporte, creamos soluciones web para SOLO UN negocio premium por sector en cada región. Asegure su monopolio hoy.",
      finalCta: "Escriba 'START' por WhatsApp",
      finalSubCta: "La consulta inicial es 100% gratuita. Sin compromisos."
    },
    ru: {
      badge: "ЭКСКЛЮЗИВНЫЙ РЕГИОНАЛЬНЫЙ ПРЕСТИЖ-ПРОЕКТ",
      heroTitle1: "Индивидуальный цифровой престиж",
      heroTitle2: "Для современного бизнеса",
      heroDesc: "В AllMySell LLC мы переосмысливаем цифровой престиж для премиального локального бизнеса. Ноль шаблонов. Ноль компромиссов. Мы создаем индивидуальные, молниеносные веб-системы, разработанные для превращения поискового трафика в лояльных клиентов.",
      ctaDiscover: "Обзор решений",
      ctaShowcase: "Посмотреть работы",
      
      whyTitle: "Почему важна индивидуальная веб-инфраструктура",
      whyDesc: "Ваш веб-сайт — это самый важный фактор доверия для нового клиента. Медленная, устаревшая или шаблонная страница лишает вас авторитета и уводит потенциальных клиентов к конкурентам. Мы создаем элитные цифровые решения, которые подчеркивают вашу ценность.",
      
      pillarsTitle: "Наши стандарты инженерии и производительности",
      pillarsSub: "Инфраструктура, разработанная для превращения посетителей в забронированные встречи",
      
      pillar1Title: "UX на мобильных устройствах",
      pillar1Desc: "Более 85% локального поиска происходит на мобильных устройствах. Мы разрабатываем плавные мобильные интерфейсы.",
      
      pillar2Title: "Локальный SEO-движок",
      pillar2Desc: "Доминируйте в поиске типа 'лучший салон рядом'. Мы внедряем семантическую разметку schema непосредственно в ядро кода.",
      
      pillar3Title: "Скорость до секунды",
      pillar3Desc: "Разработано на Next.js 15 с развертыванием на edge-серверах. Загрузка за 0,8 секунды гарантирует отсутствие потерь трафика.",
      
      pillar4Title: "Инженерия конверсии",
      pillar4Desc: "Простые сценарии, мгновенно связывающие посетителей с вашей системой бронирования или чатами в WhatsApp.",
      
      contrastTitle: "Архитектурный контраст",
      contrastSub: "Поймите, почему стандартные шаблоны вредят репутации вашего бизнеса",
      contrastBadTitle: "Шаблонный подход (Обычный WordPress)",
      contrastGoodTitle: "Премиум-стандарт AllMySell",
      
      timelineTitle: "План реализации проекта",
      timelineSub: "Полностью контролируемый процесс развертывания от аудита до запуска без лишних сложностей",
      
      step1Title: "1. Локальный аудит и анализ",
      step1Desc: "Мы анализируем региональных конкурентов, собираем объемы поисковых запросов и формируем ядро ключевых слов.",
      step2Title: "2. Премиальный UI/UX дизайн",
      step2Desc: "Никаких стандартных шаблонов. Мы создаем эксклюзивные макеты, отражающие люксовый статус вашей компании.",
      step3Title: "3. Техническая разработка",
      step3Desc: "Мы вручную верстаем ваш сайт на Next.js 15, добиваясь идеальных оценок 100/100 по метрике Google Lighthouse.",
      step4Title: "4. Региональный запуск и рост",
      step4Desc: "Публикация в глобальном облаке, интеграция с картами Google и открытие каналов мгновенной записи клиентов.",
      
      finalBadge: "🔴 СТРОГОЕ РЕГИОНАЛЬНОЕ ОГРАНИЧЕНИЕ",
      finalTitle: "Станьте единственным лидером в своем районе",
      finalDesc: "Для поддержания высочайшего качества мы ведем разработку только для ОДНОГО премиального бизнеса в каждой нише на регион. Займите монополию.",
      finalCta: "Напишите 'START' в WhatsApp",
      finalSubCta: "Вводная консультация полностью бесплатна. Никаких обязательств."
    },
    ar: {
      badge: "مشروع الهيبة الإقليمي الحصري",
      heroTitle1: "هيبة رقمية مخصصة",
      heroTitle2: "للأعمال الحديثة",
      heroDesc: "في AllMySell LLC، نعيد تحديد الهيبة الرقمية للأعمال المحلية المتميزة. صفر قوالب جاهزة. صفر تنازلات. نحن نبني أنظمة ويب مخصصة وسريعة للغاية مصممة لتحويل زيارات البحث إلى عملاء دائمين.",
      ctaDiscover: "استكشف الحلول",
      ctaShowcase: "عرض النماذج",
      
      whyTitle: "لماذا تهم البنية التحتية المخصصة للويب",
      whyDesc: "موقعك الإلكتروني هو أهم عامل ثقة للعميل الجديد. الصفحة البطيئة أو القديمة أو القائمة على القوالب الجاهزة تضعف مصداقيتك وتدفع العملاء إلى منافسيك. نحن نصمم واجهات رقمية نخبوية تفرض قيمة متميزة.",
      
      pillarsTitle: "معاييرنا الهندسية والأداء",
      pillarsSub: "بنية تحتية مصممة لتحويل الزوار إلى مواعيد محجوزة",
      
      pillar1Title: "تجربة مستخدم مخصصة للهواتف",
      pillar1Desc: "أكثر من 85% من عمليات البحث المحلية تتم عبر الهواتف المحمولة. نصمم واجهات انسيابية وسريعة متوافقة تماماً مع شاشات الهواتف.",
      
      pillar2Title: "محرك بحث محلي قوي",
      pillar2Desc: "سيطر على عمليات البحث المحلية مثل 'أفضل صالون بالقرب مني'. نحن ندمج معايير Schema مباشرة في كود البرمجة الرئيسي.",
      
      pillar3Title: "سرعة تحميل فائقة",
      pillar3Desc: "مبني بالاعتماد على Next.js 15 واستضافة خوادم Edge. سرعة فتح الموقع أقل من 0.8 ثانية لمنع خسارة الزوار نهائياً.",
      
      pillar4Title: "هندسة زيادة المبيعات",
      pillar4Desc: "روابط سلسة وبدون تعقيدات تربط زوار موقعك مباشرة بنظام الحجز أو بقنوات التواصل المباشرة عبر واتساب.",
      
      contrastTitle: "المقارنة الهندسية للموقع",
      contrastSub: "اكتشف لماذا تسبب القوالب الجاهزة خسارة حقيقية لسمعة عملك التجاري",
      contrastBadTitle: "الأسلوب المعتاد (قوالب ووردبريس التقليدية)",
      contrastGoodTitle: "معايير AllMySell الاحترافية",
      
      timelineTitle: "خارطة الطريق التقنية",
      timelineSub: "عملية نشر وإطلاق متكاملة ومدارة بالكامل بأعلى درجات الكفاءة ومن دون أي متاعب لك",
      
      step1Title: "1. دراسة السوق والتحليل المحلي",
      step1Desc: "نقوم بدراسة المنافسين في منطقتك، ورسم مخطط لعمليات البحث المحلية، وتحديد الكلمات الدلالية الأعلى قيمة لعملك.",
      step2Title: "2. تصميم واجهات مستخدم مخصصة",
      step2Desc: "لا نستخدم قوالب قياسية إطلاقاً. نقوم بابتكار واجهات تعبر بدقة عن مستوى الفخامة لصالونك أو عيادتك على أرض الواقع.",
      step3Title: "3. الهندسة البرمجية والأداء",
      step3Desc: "نقوم ببرمجة موقعك بأعلى المعايير باستعمال Next.js 15، مع ضمان حصد 100/100 في معايير أداء Google Lighthouse.",
      step4Title: "4. الإطلاق الإقليمي والتشغيل",
      step4Desc: "نطلق موقعك على خوادم سحابية عالمية، ونربطه بملف خرائط جوجل لتبدأ باستقبال طلبات الحجز المباشرة من الزوار فوراً.",
      
      finalBadge: "🔴 قيود جغرافية صارمة للغاية",
      finalTitle: "كن العميل والمنشأة الوحيدة الرائدة في منطقتك",
      finalDesc: "للحفاظ على أعلى مستويات الجودة والأداء التقني، نقوم بتسليم الحلول البرمجية لشركة واحدة فقط متميزة في كل قطاع بكل منطقة. احجز مكانك.",
      finalCta: "أرسل 'ابدأ' عبر الواتساب",
      finalSubCta: "الاستشارة وبناء خطة العمل مجانية بالكامل. ومن دون أي التزامات."
    }
  };

  // Get active copy using context lang. Defaults to 'tr' (Turkish) if unsupported.
  const activeLang = translationsDict[lang] ? lang : "tr";
  const copy = translationsDict[activeLang];
  const isTr = activeLang === "tr";

  return (
    <div className="bg-[#02040a] min-h-screen text-white selection:bg-orange-500/30 relative overflow-hidden pb-32">
      {/* Dynamic Ambient Particles Grid */}
      <Particles className="absolute inset-0 z-0 pointer-events-none" quantity={140} color="#F97316" ease={70} />

      {/* Cyberpunk Scanline HUD Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(249,115,22,0.02)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 pt-36 pb-20 relative z-10 max-w-7xl">
        
        {/* --- 1. HERO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-36">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <AnimatedGradientText className="inline-flex">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="h-3 w-3 text-orange-400" />
                {copy.badge}
              </span>
            </AnimatedGradientText>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9]">
              {copy.heroTitle1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 animate-text-shimmer">
                {copy.heroTitle2}
              </span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl font-medium leading-relaxed max-w-xl">
              {copy.heroDesc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#cta-section" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black uppercase tracking-widest px-8 py-7 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all">
                  {copy.finalCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#showcase-section" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black uppercase tracking-widest px-8 py-7 active:scale-[0.98] transition-all">
                  {copy.ctaShowcase}
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Dynamic Interactive Phone & Performance Simulator */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[420px] rounded-[3rem] border border-white/10 bg-slate-950/80 p-4 shadow-2xl backdrop-blur-3xl">
              <BorderBeam size={300} duration={14} colorFrom="#f97316" colorTo="#fbbf24" />
              
              {/* Internal Simulator Frame */}
              <div className="rounded-[2.5rem] bg-[#03060f] border border-white/5 p-6 overflow-hidden relative">
                {/* HUD Top Bar */}
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">UX SIMULATOR</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setMockupType("salon")}
                      className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md transition-all ${mockupType === "salon" ? "bg-orange-500 text-white" : "bg-white/5 text-slate-400"}`}
                    >
                      SALON
                    </button>
                    <button 
                      onClick={() => setMockupType("clinic")}
                      className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md transition-all ${mockupType === "clinic" ? "bg-orange-500 text-white" : "bg-white/5 text-slate-400"}`}
                    >
                      CLINIC
                    </button>
                  </div>
                </div>

                {/* Lighthouse Stats Cards */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[
                    { label: "PERF", val: "100", col: "text-green-400 border-green-500/20" },
                    { label: "SEO", val: "100", col: "text-green-400 border-green-500/20" },
                    { label: "UX", val: "100", col: "text-green-400 border-green-500/20" },
                    { label: "SEC", val: "SSL", col: "text-orange-400 border-orange-500/20" },
                  ].map((stat, i) => (
                    <div key={i} className={`border rounded-xl p-2 text-center bg-slate-900/50 backdrop-blur ${stat.col}`}>
                      <p className="text-[9px] font-black text-slate-500 tracking-wider uppercase">{stat.label}</p>
                      <p className="text-sm font-black mt-0.5">{stat.val}</p>
                    </div>
                  ))}
                </div>

                {/* Wireframe Mockup Visual */}
                <div className="rounded-2xl border border-white/5 bg-slate-950/90 p-4 space-y-4 relative min-h-[220px] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-black text-xs text-black">
                      {mockupType === "salon" ? "H" : "M"}
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider">
                        {mockupType === "salon" ? (isTr ? "HAIR MESS BOMONTI" : "BOMONTI HAIR SALON") : (isTr ? "MEDİKAL KLİNİK" : "MEDICINE CLINIC")}
                      </h4>
                      <p className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">
                        {mockupType === "salon" ? (isTr ? "Premium Güzellik Laboratuvarı" : "Premium Beauty Lab") : (isTr ? "Kişiye Özel Estetik" : "Bespoke Aesthetics")}
                      </p>
                    </div>
                  </div>

                  {/* Wireframe Hero Banner */}
                  <div className="h-20 w-full rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20 flex flex-col justify-center px-4 relative overflow-hidden">
                    <div className="absolute right-2 top-2 h-1 w-8 rounded-full bg-white/10" />
                    <p className="text-[10px] font-black text-white leading-none">
                      {mockupType === "salon" ? (isTr ? "Kusursuz Değişim," : "Flawless Transformation,") : (isTr ? "Prestijli Estetik," : "Prestige Aesthetics,")}
                    </p>
                    <p className="text-[10px] font-black text-orange-400 mt-1 leading-none">
                      {mockupType === "salon" ? (isTr ? "Hak Ettiğiniz İlgi." : "Bespoke Care.") : (isTr ? "Kusursuz Mühendislik." : "Hardcoded Excellence.")}
                    </p>
                  </div>

                  {/* Booking Simulation Action */}
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-center">
                      <div className="h-1.5 w-12 rounded-full bg-slate-600" />
                    </div>
                    <div className="flex-1 bg-orange-500/20 border border-orange-500/30 rounded-xl p-2 flex items-center justify-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-ping" />
                      <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest text-center">
                        {isTr ? "RANDEVU AL" : "BOOK NOW"}
                      </span>
                    </div>
                  </div>

                  {/* Floating Analytics HUD Card */}
                  <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-white/10 rounded-xl p-3 shadow-2xl flex items-center gap-3">
                    <Activity className="h-4 w-4 text-green-400" />
                    <div>
                      <p className="text-[8px] font-black text-slate-500 uppercase leading-none">
                        {isTr ? "DÖNÜŞÜM" : "CONVERSIONS"}
                      </p>
                      <p className="text-[11px] font-black text-white mt-1 leading-none">
                        {isTr ? "AYLIK +285%" : "+285% MONTHLY"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


        {/* --- 2. WHY IT MATTERS SECTION (Psychological Shift) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-36"
        >
          <div className="rounded-[2.5rem] border border-white/5 bg-slate-950/40 p-8 md:p-16 backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[120px]" />
            <div className="max-w-4xl mx-auto space-y-6 text-center">
              <span className="text-orange-500 font-black text-xs uppercase tracking-[0.2em]">{copy.whyTitle}</span>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-relaxed">
                "{copy.whyDesc}"
              </p>
            </div>
          </div>
        </motion.div>


        {/* --- 3. CORE PILLARS SECTION (Mühendislik Standartları) --- */}
        <div className="mb-36 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{copy.pillarsTitle}</h2>
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">{copy.pillarsSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: copy.pillar1Title, desc: copy.pillar1Desc, icon: Smartphone, glow: "#f97316", badge: "MOBILE-FIRST" },
              { title: copy.pillar2Title, desc: copy.pillar2Desc, icon: Search, glow: "#3b82f6", badge: "LOCAL SEO" },
              { title: copy.pillar3Title, desc: copy.pillar3Desc, icon: Cpu, glow: "#a855f7", badge: "NEXT.JS 15" },
              { title: copy.pillar4Title, desc: copy.pillar4Desc, icon: TrendingUp, glow: "#10b981", badge: "CRO SYSTEM" }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <MagicCard className="p-8 rounded-[2.5rem] bg-[#0a0d18]/40 border-white/5 flex flex-col justify-between h-full relative overflow-hidden hover:border-white/10 transition-all group">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                        <pillar.icon className="h-6 w-6" />
                      </div>
                      <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase bg-white/5 px-2.5 py-1 rounded-md">{pillar.badge}</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-black uppercase tracking-tight text-white">{pillar.title}</h3>
                      <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>


        {/* --- 4. SHOWCASE SECTION (Before & After) --- */}
        <div id="showcase-section" className="mb-36 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{copy.contrastTitle}</h2>
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">{copy.contrastSub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* The Bad Template Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] border border-red-500/20 bg-slate-950/20 p-8 space-y-6 relative overflow-hidden group"
            >
              <div className="flex justify-between items-center">
                <span className="text-red-500 font-black text-xs uppercase tracking-widest">{copy.contrastBadTitle}</span>
                <X className="h-6 w-6 text-red-500" />
              </div>

              <div className="space-y-4 opacity-70 group-hover:opacity-100 transition-opacity">
                {[
                  isTr ? "Sıradan WordPress şablonları (Yavaş, güvensiz, eski)" : (copy.contrastBad1 || "Slow WordPress templates with excessive plugins"),
                  isTr ? "Müşteriyi kaçıran 4.5 saniye üzeri yüklenme süreleri" : (copy.contrastBad2 || "Load times exceeding 4.5 seconds driving users away"),
                  isTr ? "Telefonlarda kırılan ekran tasarımları ve kayan butonlar" : (copy.contrastBad3 || "Broken responsive views and sliding layouts on phones"),
                  isTr ? "Google aramalarında görünmeyen, özensiz SEO kodlaması" : (copy.contrastBad4 || "Unoptimized site metadata rendering you invisible on Google"),
                  isTr ? "Güven vermeyen, amatör görünümlü iletişim formları" : (copy.contrastBad5 || "Unprofessional, friction-heavy contact fields that drop leads")
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-sm font-medium text-slate-400">
                    <span className="h-5 w-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* The Good Custom Code Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] border border-green-500/30 bg-slate-950/60 p-8 space-y-6 relative overflow-hidden group shadow-2xl"
            >
              <BorderBeam size={400} duration={12} colorFrom="#10b981" colorTo="#34d399" />
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-black text-xs uppercase tracking-widest">{copy.contrastGoodTitle}</span>
                <Check className="h-6 w-6 text-green-400 animate-pulse" />
              </div>

              <div className="space-y-4">
                {[
                  isTr ? "Tamamen el yapımı, size özel modern tasarımlar" : (copy.contrastGood1 || "Bespoke custom aesthetics unique to your premium brand"),
                  isTr ? "Next.js 15 altyapısı ile 0.8 saniyenin altında açılış hızları" : (copy.contrastGood2 || "Next.js 15 edge compilations providing <0.8s delivery"),
                  isTr ? "Telefon ekranları için tasarlanmış yağ gibi akan mobil UX" : (copy.contrastGood3 || "Silky-smooth, responsive viewport engineering on smartphones"),
                  isTr ? "Semantik schema verileri ile entegre, tam Google uyumu" : (copy.contrastGood4 || "Hardcoded structured data blueprints for SEO index dominance"),
                  isTr ? "Ziyaretçiyi anında randevuya bağlayan sıfır sürtünmeli WhatsApp akışı" : (copy.contrastGood5 || "Zero-friction CTAs connecting leads instantly to direct agents")
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-sm font-medium text-slate-200">
                    <span className="h-5 w-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>


        {/* --- 5. THE PROCESS SECTION (Roadmap) --- */}
        <div className="mb-36 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{copy.timelineTitle}</h2>
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">{copy.timelineSub}</p>
          </div>

          <div className="max-w-3xl mx-auto relative pl-8 border-l border-white/10 space-y-12">
            {[
              { title: copy.step1Title, desc: copy.step1Desc },
              { title: copy.step2Title, desc: copy.step2Desc },
              { title: copy.step3Title, desc: copy.step3Desc },
              { title: copy.step4Title, desc: copy.step4Desc }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative"
              >
                {/* Glowing Node on Timeline */}
                <div className="absolute -left-[41px] top-1.5 h-6 w-6 rounded-full border border-orange-500 bg-[#02040a] flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase text-white tracking-tight">{step.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* --- 6. EXCLUSIVE CTA SECTION (Scarcity & Conversion) --- */}
        <motion.div 
          id="cta-section"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-slate-950/60 p-8 md:p-16 text-center backdrop-blur-3xl shadow-2xl">
            <BorderBeam size={500} duration={15} colorFrom="#f97316" colorTo="#a855f7" />
            
            <div className="space-y-8 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">
                {copy.finalBadge}
              </span>

              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
                {copy.finalTitle}
              </h2>

              <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
                {copy.finalDesc}
              </p>

              {/* Seamless Double Lead Dispatch Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                <a
                  href={`https://wa.me/905537065912?text=${encodeURIComponent(isTr ? "BAŞLAYALIM" : "START")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-8 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-green-500/10 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-black text-sm">M</div>
                  <span>Melih • WhatsApp</span>
                </a>
                <a
                  href={`https://wa.me/905518343030?text=${encodeURIComponent(isTr ? "BAŞLAYALIM" : "START")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-8 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-orange-500/10 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-black font-black text-sm">Y</div>
                  <span>Yunus • WhatsApp</span>
                </a>
              </div>

              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                {copy.finalSubCta}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
