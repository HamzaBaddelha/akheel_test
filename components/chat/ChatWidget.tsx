"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import ChatMessage from "@/components/chat/ChatMessage";
import QuickActions from "@/components/chat/QuickActions";
import {
  buildAgentReply,
  buildReplyFromIntent,
  detectInputLanguage,
  getGreetingMessages,
  getQuickActions,
} from "@/lib/chat/agentLogic";
import { getChatContent } from "@/lib/chat/locales";
import type { ChatLanguage, ChatMessageModel, QuickAction } from "@/lib/chat/types";

const SESSION_STORAGE_KEY = "akheel-chat-session-v1";
const WHATSAPP_LINK = "https://wa.me/";

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

function createMessage(role: ChatMessageModel["role"], text: string): ChatMessageModel {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
  };
}

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const { language, isRTL } = useI18n();
  const currentLanguage = language as ChatLanguage;
  const localized = getChatContent(currentLanguage);
  const baseQuickActions = useMemo(() => getQuickActions(currentLanguage), [currentLanguage]);
  const [messages, setMessages] = useState<ChatMessageModel[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [quickActions, setQuickActions] = useState<QuickAction[]>(baseQuickActions);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { messages?: ChatMessageModel[] };
        if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          setMessages(parsed.messages);
          setQuickActions(baseQuickActions);
          return;
        }
      }
    } catch {
      // Ignore malformed local session state.
    }

    const [line1, line2] = getGreetingMessages(currentLanguage);
    setMessages([createMessage("assistant", line1), createMessage("assistant", line2)]);
    setQuickActions(baseQuickActions);
  }, [baseQuickActions, currentLanguage]);

  useEffect(() => {
    if (messages.length === 0) return;
    try {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ messages }));
    } catch {
      // Ignore storage quota errors.
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;
    const viewport = scrollRef.current;
    if (!viewport) return;
    viewport.scrollTop = viewport.scrollHeight;
  }, [isOpen, messages]);

  const handleReply = (replyText: string) => {
    if (!replyText.trim()) return;

    const replyLanguage = detectInputLanguage(replyText, currentLanguage);
    const localizedActions = getQuickActions(replyLanguage);
    const userMessage = createMessage("user", replyText.trim());
    const agentReply = buildAgentReply(replyText, replyLanguage);
    const agentMessages = [createMessage("assistant", agentReply.answer)];
    if (agentReply.followUp) {
      agentMessages.push(createMessage("assistant", agentReply.followUp));
    }

    const nextActions = localizedActions.filter((action) =>
      agentReply.suggestions.includes(action.intent),
    );

    setMessages((prev) => [...prev, userMessage, ...agentMessages]);
    setQuickActions(nextActions.length > 0 ? nextActions : localizedActions);
    setInputValue("");
  };

  const handleQuickAction = (action: QuickAction) => {
    const localizedActions = getQuickActions(currentLanguage);
    if (action.intent === "contact_whatsapp") {
      const reply = buildReplyFromIntent("contact_whatsapp", currentLanguage);
      const assistantMessages = [createMessage("assistant", reply.answer)];
      if (reply.followUp) assistantMessages.push(createMessage("assistant", reply.followUp));
      setMessages((prev) => [...prev, createMessage("user", action.label), ...assistantMessages]);
      setQuickActions(localizedActions.filter((item) => reply.suggestions.includes(item.intent)));
      return;
    }

    const reply = buildReplyFromIntent(action.intent, currentLanguage);
    const assistantMessages = [createMessage("assistant", reply.answer)];
    if (reply.followUp) assistantMessages.push(createMessage("assistant", reply.followUp));
    const nextActions = localizedActions.filter((item) => reply.suggestions.includes(item.intent));
    setMessages((prev) => [...prev, createMessage("user", action.label), ...assistantMessages]);
    setQuickActions(nextActions.length > 0 ? nextActions : localizedActions);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleReply(inputValue);
  };

  return (
    <div
      className={[
        "fixed bottom-24 right-5 z-[9998] w-[min(92vw,390px)] origin-bottom-right transition-all duration-200",
        isOpen
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-3 scale-95 opacity-0",
      ].join(" ")}
      style={{
        bottom: "calc(96px + env(safe-area-inset-bottom))",
        right: "calc(20px + env(safe-area-inset-right))",
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <section className="overflow-hidden rounded-2xl border border-accent/35 bg-background/95 shadow-2xl backdrop-blur-sm">
        <header className="flex items-start justify-between gap-3 border-b border-accent/25 bg-card/95 px-4 py-3.5">
          <div>
            <h2 className="text-base font-semibold text-primary">{localized.title}</h2>
            <p className="mt-0.5 text-xs text-foreground/70">{localized.helper}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-accent/35 px-2.5 py-1 text-xs font-semibold text-foreground/70 transition hover:text-primary"
            aria-label="Close chat"
          >
            ✕
          </button>
        </header>

        <div ref={scrollRef} className="max-h-[44vh] space-y-2.5 overflow-y-auto px-3.5 py-3.5">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} isRTL={isRTL} />
          ))}
        </div>

        <div className="space-y-3 border-t border-accent/20 px-3.5 py-3.5">
          <QuickActions actions={quickActions} onSelect={handleQuickAction} />

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder={localized.inputPlaceholder}
              className="h-10 flex-1 rounded-full border border-accent/35 bg-card px-3.5 text-sm text-foreground outline-none transition placeholder:text-foreground/55 focus:border-secondary/55"
            />
            <button
              type="submit"
              className="h-10 rounded-full bg-primary px-4 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-primary/90"
            >
              {localized.send}
            </button>
          </form>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border border-[#25D366] bg-[#25D366] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#1ebe5d]"
          >
            {localized.continueOnWhatsApp}
          </a>
        </div>
      </section>
    </div>
  );
}
