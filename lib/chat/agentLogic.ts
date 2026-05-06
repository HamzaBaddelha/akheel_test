import { INTENT_KNOWLEDGE } from "@/lib/chat/agentKnowledge";
import { getChatContent } from "@/lib/chat/locales";
import type { AgentReply, ChatLanguage, IntentId } from "@/lib/chat/types";
import english from "@/locales/english.json";
import arabic from "@/locales/arabic.json";
import french from "@/locales/french.json";

const DICTIONARIES: Record<ChatLanguage, Record<string, unknown>> = {
  en: english as Record<string, unknown>,
  ar: arabic as Record<string, unknown>,
  fr: french as Record<string, unknown>,
};

function normalizeInput(value: string) {
  return value.toLowerCase().replace(/[.,!?;:()[\]{}"']/g, " ").replace(/\s+/g, " ").trim();
}

function getDictionaryValue(language: ChatLanguage, path: string | undefined) {
  if (!path) return "";
  const dict = DICTIONARIES[language];
  const value = path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dict);
  return typeof value === "string" ? value : "";
}

function scoreIntent(input: string, keywords: string[]) {
  let score = 0;

  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase().trim();
    if (!normalizedKeyword) continue;
    if (input.includes(normalizedKeyword)) {
      score += normalizedKeyword.includes(" ") ? 2 : 1;
    }
  }

  return score;
}

function pickIntent(userInput: string): IntentId {
  const normalized = normalizeInput(userInput);
  let bestIntent: IntentId = "fallback";
  let bestScore = 0;

  for (const intent of INTENT_KNOWLEDGE) {
    const intentScore = scoreIntent(normalized, intent.keywords);
    if (intentScore > bestScore) {
      bestScore = intentScore;
      bestIntent = intent.id;
    }
  }

  return bestScore > 0 ? bestIntent : "fallback";
}

export function detectInputLanguage(input: string, fallbackLanguage: ChatLanguage): ChatLanguage {
  const arabicRegex = /[\u0600-\u06FF]/;
  if (arabicRegex.test(input)) return "ar";

  const normalized = normalizeInput(input);
  if (!normalized) return fallbackLanguage;

  const frenchMarkers = [
    "bonjour",
    "merci",
    "voyage",
    "itineraire",
    "reservation",
    "prix",
    "famille",
    "lune de miel",
    "riad",
    "hotel",
    "maroc",
    "tunisie",
    "arabie",
    "riyad",
    "djeddah",
    "sur mesure",
    "planifier",
  ];

  const englishMarkers = [
    "hello",
    "hi",
    "trip",
    "travel",
    "itinerary",
    "booking",
    "price",
    "budget",
    "family",
    "honeymoon",
    "morocco",
    "tunisia",
    "saudi",
    "riyadh",
    "jeddah",
    "custom",
    "plan",
  ];

  const frenchScore = frenchMarkers.reduce(
    (sum, marker) => sum + (normalized.includes(marker) ? 1 : 0),
    0,
  );
  const englishScore = englishMarkers.reduce(
    (sum, marker) => sum + (normalized.includes(marker) ? 1 : 0),
    0,
  );

  if (frenchScore > englishScore) return "fr";
  if (englishScore > frenchScore) return "en";

  return fallbackLanguage;
}

export function getGreetingMessages(language: ChatLanguage) {
  const localized = getChatContent(language);
  return [localized.greeting, localized.greetingHint];
}

export function getQuickActions(language: ChatLanguage) {
  return getChatContent(language).quickActions;
}

export function buildReplyFromIntent(intent: IntentId, language: ChatLanguage): AgentReply {
  const localized = getChatContent(language);

  if (intent === "fallback") {
    return {
      intent: "fallback",
      language,
      answer: localized.fallback,
      followUp: localized.handoff,
      suggestions: ["custom_trip", "morocco", "contact_whatsapp"],
    };
  }

  const intentConfig = INTENT_KNOWLEDGE.find((entry) => entry.id === intent);
  if (!intentConfig) {
    return {
      intent: "fallback",
      language,
      answer: localized.fallback,
      followUp: localized.handoff,
      suggestions: ["custom_trip", "morocco", "contact_whatsapp"],
    };
  }

  const faqAnswer = getDictionaryValue(language, intentConfig.answerKey);
  const staticAnswer = getDictionaryValue(language, intentConfig.staticAnswerKey);
  const answer = faqAnswer || staticAnswer || localized.fallback;

  const followUpLookupKey = intentConfig.followUpKey?.replace("chat.followUps.", "");
  const followUp = followUpLookupKey ? localized.followUps[followUpLookupKey] : "";

  return {
    intent,
    language,
    answer,
    followUp: followUp || undefined,
    suggestions: intentConfig.suggestions ?? ["contact_whatsapp"],
  };
}

export function buildAgentReply(userInput: string, language: ChatLanguage): AgentReply {
  const intent = pickIntent(userInput);
  return buildReplyFromIntent(intent, language);
}
