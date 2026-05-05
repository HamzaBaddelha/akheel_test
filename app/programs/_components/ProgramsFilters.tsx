"use client";

import { useI18n } from "@/components/i18n/I18nProvider";

type Props = {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
};

export default function ProgramsFilters({
  categories,
  activeCategory,
  onSelect,
}: Props) {
  const { t } = useI18n();
  const categoryLabelMap: Record<string, string> = {
    All: t("programsPage.filters.all"),
    Nature: t("programsPage.categories.nature"),
    Adventure: t("programsPage.categories.adventure"),
    Culture: t("programsPage.categories.culture"),
    Wellness: t("programsPage.categories.wellness"),
    Coastal: t("programsPage.categories.coastal"),
    "Multi-Day": t("programsPage.categories.multiDay"),
  };

  return (
    <section aria-label={t("programsPage.filters.aria")}>
      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={category === activeCategory}
            className={`max-w-full rounded-full border px-4 py-2 text-xs font-medium transition sm:px-5 sm:py-2.5 sm:text-sm ${
              category === activeCategory
                ? "border-[#2c2216] bg-[#2c2216] text-[#e1e0d4]"
                : "border-[#2c2216]/20 bg-[#f4f2ea] text-[#2c2216]/80 hover:border-[#999570] hover:text-[#2c2216]"
            }`}
          >
            {categoryLabelMap[category] || category}
          </button>
        ))}
      </div>
    </section>
  );
}
