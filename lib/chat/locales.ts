import type { ChatLanguage, QuickAction } from "@/lib/chat/types";

type LocalizedChatContent = {
  title: string;
  helper: string;
  greeting: string;
  greetingHint: string;
  inputPlaceholder: string;
  send: string;
  continueOnWhatsApp: string;
  fallback: string;
  handoff: string;
  quickActions: QuickAction[];
  followUps: Record<string, string>;
};

const CONTENT: Record<ChatLanguage, LocalizedChatContent> = {
  en: {
    title: "Akheel Assistant",
    helper: "Ask about destinations, custom trips, booking, or support.",
    greeting: "Welcome to Akheel. How can we help plan your journey?",
    greetingHint:
      "Ask about Morocco, Tunisia, Saudi Arabia, custom itineraries, or bookings.",
    inputPlaceholder: "Ask your travel question...",
    send: "Send",
    continueOnWhatsApp: "Continue on WhatsApp",
    fallback:
      "I can help with common travel questions, and our team can assist with specific requests.",
    handoff: "Would you like to continue on WhatsApp for a tailored plan?",
    quickActions: [
      { label: "Plan a custom trip", intent: "custom_trip" },
      { label: "Morocco trips", intent: "morocco" },
      { label: "Tunisia trips", intent: "tunisia" },
      { label: "Saudi Arabia trips", intent: "saudi" },
      { label: "Riyadh & Jeddah", intent: "riyadh_jeddah" },
      { label: "Hotels and transfers", intent: "hotels_services" },
      { label: "Family or honeymoon", intent: "family_honeymoon" },
      { label: "Contact on WhatsApp", intent: "contact_whatsapp" },
    ],
    followUps: {
      planStart: "If you share your dates and budget range, I can suggest the best next step.",
      moroccoCombine:
        "We can combine city, mountains, coast, and desert in one polished Morocco route.",
      tunisiaBlend:
        "We can blend coastal, cultural, and desert moments in one Tunisia program.",
      saudiStyle:
        "Saudi itineraries can be tailored for premium city, culture, and lifestyle experiences.",
      riyadhJeddah:
        "We can design a Riyadh and Jeddah flow with private transfers and curated experiences.",
      agadirDesign:
        "Agadir day trips can be mixed with Marrakech, Atlas, or Sahara based on your pace.",
      servicesMatch:
        "Tell me your comfort level and we will align hotels, transport, and tours around it.",
      budgetShare:
        "Share your preferred budget range and we will shape options that fit it clearly.",
      styleTailored:
        "We tailor every plan around your pace, privacy, and travel style.",
      whatsappNow: "You can move to WhatsApp now and our team will continue immediately.",
    },
  },
  ar: {
    title: "مساعد Akheel",
    helper: "اسأل عن الوجهات، والرحلات المخصصة، والحجز، أو الدعم.",
    greeting: "مرحبًا بك في Akheel. كيف نساعدك في تخطيط رحلتك؟",
    greetingHint:
      "يمكنك السؤال عن المغرب، وتونس، والسعودية، والبرامج المخصصة، أو الحجز.",
    inputPlaceholder: "اكتب سؤالك عن الرحلة...",
    send: "إرسال",
    continueOnWhatsApp: "المتابعة عبر واتساب",
    fallback:
      "أستطيع مساعدتك في الأسئلة الشائعة، ويمكن لفريقنا دعمك مباشرة في الطلبات الخاصة.",
    handoff: "هل ترغب بالمتابعة عبر واتساب للحصول على خطة مخصصة؟",
    quickActions: [
      { label: "تخطيط رحلة مخصصة", intent: "custom_trip" },
      { label: "رحلات المغرب", intent: "morocco" },
      { label: "رحلات تونس", intent: "tunisia" },
      { label: "رحلات السعودية", intent: "saudi" },
      { label: "الرياض وجدة", intent: "riyadh_jeddah" },
      { label: "الفنادق والتنقلات", intent: "hotels_services" },
      { label: "عائلي أو شهر عسل", intent: "family_honeymoon" },
      { label: "تواصل عبر واتساب", intent: "contact_whatsapp" },
    ],
    followUps: {
      planStart: "إذا شاركتنا التواريخ وحدود الميزانية، أقدر أوجهك للخطوة الأنسب.",
      moroccoCombine:
        "نقدر ندمج المدن والجبال والساحل والصحراء في مسار مغربي أنيق ومريح.",
      tunisiaBlend: "يمكننا دمج الساحل والثقافة والصحراء في برنامج تونس واحد.",
      saudiStyle: "رحلات السعودية يمكن تصميمها بأسلوب راقٍ يجمع المدينة والثقافة ونمط الحياة.",
      riyadhJeddah: "نقدر نبني مسار الرياض وجدة مع تنقلات خاصة وتجارب منتقاة.",
      agadirDesign:
        "تجارب أغادير اليومية يمكن دمجها مع مراكش أو الأطلس أو الصحراء حسب الإيقاع المناسب.",
      servicesMatch: "قل لي مستوى الراحة الذي تفضله وسنضبط الفنادق والتنقلات والجولات عليه.",
      budgetShare: "شارك نطاق ميزانيتك لنقترح لك خيارات واضحة ومناسبة.",
      styleTailored: "كل خطة تُصمم حسب إيقاعك وخصوصيتك وأسلوب سفرك.",
      whatsappNow: "يمكنك الانتقال الآن إلى واتساب وسيكمل فريقنا معك مباشرة.",
    },
  },
  fr: {
    title: "Assistant Akheel",
    helper: "Posez vos questions sur les destinations, voyages sur mesure, reservation ou support.",
    greeting: "Bienvenue chez Akheel. Comment pouvons-nous planifier votre voyage ?",
    greetingHint:
      "Demandez le Maroc, la Tunisie, l Arabie saoudite, les itineraires sur mesure ou la reservation.",
    inputPlaceholder: "Posez votre question voyage...",
    send: "Envoyer",
    continueOnWhatsApp: "Continuer sur WhatsApp",
    fallback:
      "Je peux aider pour les questions frequentes, et notre equipe peut traiter les demandes plus specifiques.",
    handoff: "Souhaitez-vous continuer sur WhatsApp pour un plan personnalise ?",
    quickActions: [
      { label: "Planifier un voyage sur mesure", intent: "custom_trip" },
      { label: "Voyages Maroc", intent: "morocco" },
      { label: "Voyages Tunisie", intent: "tunisia" },
      { label: "Voyages Arabie saoudite", intent: "saudi" },
      { label: "Riyad et Djeddah", intent: "riyadh_jeddah" },
      { label: "Hotels et transferts", intent: "hotels_services" },
      { label: "Famille ou lune de miel", intent: "family_honeymoon" },
      { label: "Contacter sur WhatsApp", intent: "contact_whatsapp" },
    ],
    followUps: {
      planStart:
        "Partagez vos dates et votre budget, et je vous propose la prochaine etape ideale.",
      moroccoCombine:
        "Nous pouvons combiner villes, montagnes, cote et desert dans un seul parcours Maroc.",
      tunisiaBlend:
        "Nous pouvons melanger experiences cotiere, culturelle et desertique en Tunisie.",
      saudiStyle:
        "Les voyages en Arabie saoudite peuvent etre adaptes a un style premium ville et culture.",
      riyadhJeddah:
        "Nous pouvons creer un parcours Riyad et Djeddah avec transferts prives et experiences choisies.",
      agadirDesign:
        "Les excursions d Agadir se combinent facilement avec Marrakech, Atlas ou Sahara.",
      servicesMatch:
        "Indiquez votre niveau de confort et nous alignerons hotels, transport et visites.",
      budgetShare: "Partagez votre fourchette budget et nous structurerons des options claires.",
      styleTailored: "Chaque itineraire est ajuste a votre rythme, votre intimite et votre style.",
      whatsappNow:
        "Vous pouvez passer sur WhatsApp maintenant et notre equipe reprend immediatement.",
    },
  },
};

export function getChatContent(language: ChatLanguage) {
  return CONTENT[language] ?? CONTENT.en;
}
