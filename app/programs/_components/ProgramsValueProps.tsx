"use client";

import { useI18n } from "@/components/i18n/I18nProvider";
import SlideAnimation from "@/components/ui/slide_animation";
import { localizeValueProps } from "@/lib/programs/localization";
import type { ProgramValueProp } from "@/lib/programs/types";

type Props = { valueProps: ProgramValueProp[] };

export default function ProgramsValueProps({ valueProps }: Props) {
  const { t } = useI18n();
  const localizedValueProps = localizeValueProps(valueProps, t);

  return (
    <section aria-label={t("programsPage.valueProps.aria")} className="space-y-5 sm:space-y-6">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
          {t("programsPage.valueProps.tag")}
        </p>
        <SlideAnimation from="left">
          <h2 className="mt-2 text-2xl font-semibold text-[#2c2216] sm:mt-3 sm:text-4xl">
            {t("programsPage.valueProps.title")}
          </h2>
        </SlideAnimation>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {localizedValueProps.map((item) => (
          <article
            key={item.title}
            className="min-w-0 rounded-3xl border border-[#2c2216]/10 bg-[#f4f2ea] p-5 sm:p-6"
          >
            <SlideAnimation from="right">
              <h3 className="text-xl font-semibold text-[#2c2216]">{item.title}</h3>
            </SlideAnimation>
            <p className="mt-2 text-sm leading-relaxed text-[#2c2216]/75">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
