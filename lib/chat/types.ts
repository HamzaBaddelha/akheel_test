export type ChatLanguage = "en" | "ar" | "fr";

export type IntentId =
  | "custom_trip"
  | "morocco"
  | "tunisia"
  | "saudi"
  | "riyadh_jeddah"
  | "agadir"
  | "hotels_services"
  | "budget_booking"
  | "family_honeymoon"
  | "contact_whatsapp"
  | "fallback";

export interface IntentKnowledge {
  id: Exclude<IntentId, "fallback">;
  keywords: string[];
  answerKey?: string;
  staticAnswerKey?: string;
  followUpKey?: string;
  suggestions?: IntentId[];
}

export interface AgentReply {
  intent: IntentId;
  language: ChatLanguage;
  answer: string;
  followUp?: string;
  suggestions: IntentId[];
}

export interface ChatMessageModel {
  id: string;
  role: "assistant" | "user";
  text: string;
}

export interface QuickAction {
  label: string;
  intent: Exclude<IntentId, "fallback"> | "contact_whatsapp";
}
