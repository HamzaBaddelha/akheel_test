"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";
import ChatWidget from "@/components/chat/ChatWidget";

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language } = useI18n();
  const isArabic = language === "ar";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <ChatWidget isOpen={open} onClose={() => setOpen(false)} />

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={isArabic ? "فتح مساعد السفر" : "Open travel assistant"}
        className="fixed bottom-16 right-4 z-[9999] inline-flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/10 transition-transform hover:scale-105 sm:bottom-5 sm:right-5"
      >
        <Image
          src="/assets/customer-service.png"
          alt="Customer Service"
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
          priority
        />
      </button>
    </>,
    document.body,
  );
}
