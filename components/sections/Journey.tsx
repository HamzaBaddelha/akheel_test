"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { useI18n } from "@/components/i18n/I18nProvider";
import { destinationPanels, type DestinationPanel } from "@/lib/trips";

type T = (key: string) => string;

const ArrowIcon = () => (
  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const PanelMeta = ({ panel, t, className = "" }: { panel: DestinationPanel; t: T; className?: string }) => (
  <div className={`space-y-3 ${className}`}>
    {panel.subtitleKey && (
      <p className="text-xs uppercase tracking-widest text-background/70">{t(panel.subtitleKey)}</p>
    )}
    <h3 className="font-serif text-2xl font-bold leading-tight text-background sm:text-3xl lg:text-5xl">
      {t(panel.titleKey)}
    </h3>
    <Link
      href={panel.href}
      onClick={(e) => e.stopPropagation()}
      className="group inline-flex items-center gap-2 text-sm font-semibold text-background/90 transition-colors hover:text-background"
    >
      {t(panel.ctaLabelKey)}
      <ArrowIcon />
    </Link>
  </div>
);

const Overlay = ({ active }: { active: boolean }) => (
  <div className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-t ${
    active ? "from-primary/40 via-primary/20 to-transparent" : "from-primary/80 via-primary/50 to-primary/30"
  }`} />
);

const DesktopPanel = ({ panel, isActive, onActivate, t }: { panel: DestinationPanel; isActive: boolean; onActivate: () => void; t: T }) => (
  <motion.button
    layout
    type="button"
    onClick={onActivate}
    aria-pressed={isActive}
    aria-label={`${t(panel.titleKey)} - ${t("panels.selectAriaLabel")}`}
    whileHover={!isActive ? { opacity: 0.8 } : {}}
    style={{ minWidth: isActive ? "auto" : "120px" }}
    className={`relative flex-shrink-0 overflow-hidden rounded-[16px] border border-accent/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${isActive ? "flex-grow" : "flex-shrink"}`}
  >
    <Image src={panel.image} alt={t(panel.titleKey)} fill className={`object-cover transition-transform duration-700 ${isActive ? "scale-105" : "scale-100"}`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw" />
    <Overlay active={isActive} />
    {isActive && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,224,212,0.15),transparent_60%)]" />}
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div key={panel.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.4, ease: "easeOut" }} className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 lg:p-10">
          <PanelMeta panel={panel} t={t} />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

const MobileThumbnail = ({ panel, onActivate, t }: { panel: DestinationPanel; onActivate: () => void; t: T }) => (
  <motion.button
    type="button"
    onClick={onActivate}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    aria-label={`${t(panel.titleKey)} - ${t("panels.selectAriaLabel")}`}
    className="group relative aspect-[3/2] overflow-hidden rounded-[12px] border border-accent/25 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
  >
    <Image src={panel.image} alt={t(panel.titleKey)} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 50vw, 25vw" />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-primary/20" />
    <div className="absolute inset-0 flex items-end p-3 sm:p-4">
      <h4 className="line-clamp-2 font-serif text-sm font-bold text-background/90 sm:text-base">{t(panel.titleKey)}</h4>
    </div>
  </motion.button>
);

export default function Journey() {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState(destinationPanels[0]?.id ?? "");
  const activePanel = destinationPanels.find((p) => p.id === activeId) ?? destinationPanels[0];
  if (!activePanel) return null;

  return (
    <section id="journey" className="py-24 lg:py-32" aria-label={t("panels.aria")}>
      <Container>
        <div className="space-y-6 sm:space-y-8">
          <div className="max-w-2xl space-y-3">
            <motion.h2
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.75 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {t("panels.title")}
            </motion.h2>
            <p className="max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">{t("panels.subtitle")}</p>
          </div>

          <div className="mt-12 lg:mt-16">
            {/* Desktop */}
            <div className="hidden h-[400px] gap-3 md:flex lg:h-[500px] lg:gap-4" role="group" aria-label={t("panels.groupAriaLabel")}>
              {destinationPanels.map((panel) => (
                <DesktopPanel key={panel.id} panel={panel} isActive={activeId === panel.id} onActivate={() => setActiveId(panel.id)} t={t} />
              ))}
            </div>

            {/* Mobile */}
            <div className="space-y-4 md:hidden">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activePanel.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] border border-accent/25"
                >
                  <Image src={activePanel.image} alt={t(activePanel.titleKey)} fill className="object-cover" sizes="100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <PanelMeta panel={activePanel} t={t} />
                  </div>
                </motion.article>
              </AnimatePresence>
              <div className="grid grid-cols-2 gap-3">
                {destinationPanels.filter((p) => p.id !== activeId).map((panel) => (
                  <MobileThumbnail key={panel.id} panel={panel} onActivate={() => setActiveId(panel.id)} t={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
