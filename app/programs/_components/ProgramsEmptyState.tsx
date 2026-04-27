export default function ProgramsEmptyState() {
  return (
    <section id="programs-grid" aria-label="All programs">
      <div className="rounded-3xl border border-dashed border-[#2c2216]/30 bg-[#f4f2ea] px-6 py-14 text-center">
        <h3 className="text-2xl font-semibold text-[#2c2216]">
          No Programs Available
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#2c2216]/75 sm:text-base">
          There are currently no active programs in this category. Please try
          another filter or check back soon.
        </p>
      </div>
    </section>
  );
}
