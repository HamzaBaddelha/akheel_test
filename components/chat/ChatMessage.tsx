"use client";

import type { ChatMessageModel } from "@/lib/chat/types";

interface ChatMessageProps {
  message: ChatMessageModel;
  isRTL: boolean;
}

export default function ChatMessage({ message, isRTL }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={[
          "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
          isAssistant
            ? "border border-accent/25 bg-card text-foreground"
            : "bg-primary text-white",
          isRTL ? "text-right" : "text-left",
        ].join(" ")}
      >
        {message.text}
      </div>
    </div>
  );
}
