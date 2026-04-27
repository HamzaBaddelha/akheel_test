"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { useI18n } from "@/components/i18n/I18nProvider";
import { destinationPanels } from "@/lib/trips";

type T = (key: string) => string;

const ArrowIcon = () => (
  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const Overlay = ({ active = false }: { active?: boolean }) => (
  <div className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-t ${
    active ? "from-primary/40 via-primary/20 to-transparent" : "from-primary/80 via-primary/50 to-primary/30"
  }`} />
);

const PanelMeta = ({ panel, t, className = "" }: { panel: any; t: T; className?: string }) => (
  <div className={`space-y-3 ${className}`}>
    {panel.subtitleKey && <p className="text-xs uppercase tracking-widest text-background/70">{t(panel.subtitleKey)}</p>}
    <h3 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight text-background">{t(panel.titleKey)}</h3>
    <Link href={panel.href} onClick={(e) => e.stopPropagation()} className="group inline-flex items-center gap-2 text-sm font-semibold text-background/90 transition-colors hover:text-background">
      {t(panel.ctaLabelKey)} <ArrowIcon />
    </Link>
  </div>
);

const DesktopPanel = ({ panel, isActive, onClick, t }: { panel: any; isActive: boolean; onClick: () => void; t: T }) => (
  <motion.button
    layout type="button" onClick={onClick} aria-pressed={isActive}
    aria-label={`${t(panel.titleKey)} - ${t("panels.selectAriaLabel")}`}
    style={{ minWidth: isActive ? "auto" : "120px" }}
    whileHover={!isActive ? { opacity: 0.8 } : {}}
    className={`relative flex-shrink-0 overflow-hidden rounded-[16px] border border-accent/25 transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${isActive ? "flex-grow" : "flex-shrink"}`}
  >
    <Image src={panel.image} alt={t(panel.titleKey)} fill className={`object-cover transition-transform duration-700 ${isActive ? "scale-105" : "scale-100"}`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw" priority={isActive} />
    <Overlay active={isActive} />
    {isActive && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,224,212,0.15),transparent_60%)]" />}
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div key={panel.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.4, ease: "easeOut" }} className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
          <PanelMeta panel={panel} t={t} />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

const MobileThumbnail = ({ panel, onClick, t }: { panel: any; onClick: () => void; t: T }) => (
  <motion.button
    type="button" onClick={onClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
    aria-label={`${t(panel.titleKey)} - ${t("panels.selectAriaLabel")}`}
    className="group relative aspect-[3/2] overflow-hidden rounded-[12px] border border-accent/25 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
  >
    <Image src={panel.image} alt={t(panel.titleKey)} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 50vw, 25vw" />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-primary/20" />
    <div className="absolute inset-0 flex items-end p-3 sm:p-4">
      <h4 className="font-serif text-sm sm:text-base font-bold text-background/90 line-clamp-2">{t(panel.titleKey)}</h4>
    </div>
  </motion.button>
);

export default function DestinationPanelsSection() {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState(destinationPanels[0].id);
  const activePanel = destinationPanels.find((p) => p.id === activeId)!;

  return (
    <section id="destination-panels" className="py-24 lg:py-32" aria-label={t("panels.aria")}>
      <Container>
        <div className="space-y-6 sm:space-y-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">{t("panels.title")}</h2>
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-xl">{t("panels.subtitle")}</p>
          </div>

          <div className="mt-12 lg:mt-16">
            {/* Desktop */}
            <div className="hidden md:flex gap-3 lg:gap-4 h-[400px] lg:h-[500px]" role="group" aria-label={t("panels.groupAriaLabel")}>
              {destinationPanels.map((panel) => (
                <DesktopPanel key={panel.id} panel={panel} isActive={activeId === panel.id} onClick={() => setActiveId(panel.id)} t={t} />
              ))}
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-4">
              <AnimatePresence mode="wait">
                <motion.article key={activePanel.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="relative w-full aspect-[4/5] overflow-hidden rounded-[16px] border border-accent/25">
                  <Image src={activePanel.image} alt={t(activePanel.titleKey)} fill className="object-cover" sizes="100vw" priority />
                  <Overlay active />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <PanelMeta panel={activePanel} t={t} />
                  </div>
                </motion.article>
              </AnimatePresence>
              <div className="grid grid-cols-2 gap-3">
                {destinationPanels.filter((p) => p.id !== activeId).map((panel) => (
                  <MobileThumbnail key={panel.id} panel={panel} onClick={() => setActiveId(panel.id)} t={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}