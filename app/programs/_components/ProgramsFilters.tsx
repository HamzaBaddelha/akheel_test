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
  return (
    <section aria-label="Program categories">
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
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
