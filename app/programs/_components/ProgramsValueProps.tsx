import SlideAnimation from "@/components/ui/slide_animation";
import type { ProgramValueProp } from "@/lib/programs/types";

type Props = { valueProps: ProgramValueProp[] };

export default function ProgramsValueProps({ valueProps }: Props) {
  return (
    <section aria-label="Why choose our programs" className="space-y-5 sm:space-y-6">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
          Why Choose Us
        </p>
        <SlideAnimation from="left">
          <h2 className="mt-2 text-2xl font-semibold text-[#2c2216] sm:mt-3 sm:text-4xl">
            Designed Around Your Journey
          </h2>
        </SlideAnimation>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {valueProps.map((item) => (
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
