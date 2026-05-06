"use client";

import type { QuickAction } from "@/lib/chat/types";

interface QuickActionsProps {
  actions: QuickAction[];
  onSelect: (action: QuickAction) => void;
}

export default function QuickActions({ actions, onSelect }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={`${action.intent}-${action.label}`}
          type="button"
          onClick={() => onSelect(action)}
          className="rounded-full border border-accent/35 bg-card px-3 py-1.5 text-xs font-medium text-foreground/85 transition hover:border-secondary/50 hover:text-primary"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
