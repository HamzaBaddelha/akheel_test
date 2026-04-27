"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";
import { WHATSAPP_LINK } from "../_lib/helpers";

export default function StickyWhatsAppButton() {
  const { t } = useI18n();

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("planTrip.whatsApp.aria")}
      className="fixed bottom-5 right-5 z-[80] inline-flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/10 transition-transform hover:scale-105"
    >
      <Image
        src="/assets/whatsapp.png"
        alt={t("planTrip.whatsApp.iconAlt")}
        width={36}
        height={36}
        className="h-9 w-9 object-contain"
      />
    </a>
  );
}
