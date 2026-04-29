"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";

type TunisiaItineraryCard = {
  id: number;
  dayKey: string;
  titleKey: string;
  routeKey: string;
  descriptionKey: string;
  overnightKey: string;
  image: string;
};

const tunisItinerary: TunisiaItineraryCard[] = [
  {
    id: 1,
    dayKey: "programsPage.tunisia.itinerary.day1.day",
    titleKey: "programsPage.tunisia.itinerary.day1.title",
    routeKey: "programsPage.tunisia.itinerary.day1.route",
    descriptionKey: "programsPage.tunisia.itinerary.day1.description",
    overnightKey: "programsPage.tunisia.itinerary.day1.overnight",
    image: "/assets/sousse.jpg",
  },
  {
    id: 2,
    dayKey: "programsPage.tunisia.itinerary.day2.day",
    titleKey: "programsPage.tunisia.itinerary.day2.title",
    routeKey: "programsPage.tunisia.itinerary.day2.route",
    descriptionKey: "programsPage.tunisia.itinerary.day2.description",
    overnightKey: "programsPage.tunisia.itinerary.day2.overnight",
    image: "/assets/Mahdia.png",
  },
  {
    id: 3,
    dayKey: "programsPage.tunisia.itinerary.day3.day",
    titleKey: "programsPage.tunisia.itinerary.day3.title",
    routeKey: "programsPage.tunisia.itinerary.day3.route",
    descriptionKey: "programsPage.tunisia.itinerary.day3.description",
    overnightKey: "programsPage.tunisia.itinerary.day3.overnight",
    image: "/assets/mahdia.jpg",
  },
  {
    id: 4,
    dayKey: "programsPage.tunisia.itinerary.day4.day",
    titleKey: "programsPage.tunisia.itinerary.day4.title",
    routeKey: "programsPage.tunisia.itinerary.day4.route",
    descriptionKey: "programsPage.tunisia.itinerary.day4.description",
    overnightKey: "programsPage.tunisia.itinerary.day4.overnight",
    image: "/assets/Douz.jpg",
  },
  {
    id: 5,
    dayKey: "programsPage.tunisia.itinerary.day5.day",
    titleKey: "programsPage.tunisia.itinerary.day5.title",
    routeKey: "programsPage.tunisia.itinerary.day5.route",
    descriptionKey: "programsPage.tunisia.itinerary.day5.description",
    overnightKey: "programsPage.tunisia.itinerary.day5.overnight",
    image: "/assets/Touzeur.jpg",
  },
  {
    id: 6,
    dayKey: "programsPage.tunisia.itinerary.day6.day",
    titleKey: "programsPage.tunisia.itinerary.day6.title",
    routeKey: "programsPage.tunisia.itinerary.day6.route",
    descriptionKey: "programsPage.tunisia.itinerary.day6.description",
    overnightKey: "programsPage.tunisia.itinerary.day6.overnight",
    image: "/assets/Scenic_Rail_&_Sacred City.jpg",
  },
  {
    id: 7,
    dayKey: "programsPage.tunisia.itinerary.day7.day",
    titleKey: "programsPage.tunisia.itinerary.day7.title",
    routeKey: "programsPage.tunisia.itinerary.day7.route",
    descriptionKey: "programsPage.tunisia.itinerary.day7.description",
    overnightKey: "programsPage.tunisia.itinerary.day7.overnight",
    image: "/assets/sousse2.jpg",
  },
  {
    id: 8,
    dayKey: "programsPage.tunisia.itinerary.day8.day",
    titleKey: "programsPage.tunisia.itinerary.day8.title",
    routeKey: "programsPage.tunisia.itinerary.day8.route",
    descriptionKey: "programsPage.tunisia.itinerary.day8.description",
    overnightKey: "programsPage.tunisia.itinerary.day8.overnight",
    image: "/assets/sousse.jpg",
  },
];

export default function TunisSection() {
  const { isRTL, t } = useI18n();

  return (
    <section
      id="tunisia-signature-journey"
      aria-label={t("programsPage.tunisia.aria")}
      className="scroll-mt-28 space-y-5 sm:space-y-7"
    >
      <div className={`max-w-3xl space-y-3 ${isRTL ? "text-right" : "text-left"}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
          {t("programsPage.tunisia.tag")}
        </p>
        <h2 className="text-2xl font-semibold text-[#2c2216] sm:text-4xl">
          {t("programsPage.tunisia.title")}
        </h2>
        <p className="text-sm leading-relaxed text-[#2c2216]/75 sm:text-base">
          {t("programsPage.tunisia.subtitle")}
        </p>
      </div>

      <div className="relative isolate w-full overflow-hidden rounded-[1.25rem] border border-[#2c2216]/10 sm:rounded-[1.5rem]">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/tunis_flag.jpg"
            alt=""
            fill
            aria-hidden
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/58 via-black/52 to-black/65" />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(110% 70% at 50% 0%, rgba(176,184,201,0.22) 0%, rgba(176,184,201,0) 68%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {tunisItinerary.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-[#2c2216]/10 bg-[#f7f4ec] shadow-[0_18px_48px_rgba(44,34,22,0.1)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(44,34,22,0.16)]"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={item.image}
                    alt={t(item.titleKey)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <span
                    className={`absolute top-4 rounded-full border border-white/35 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm ${
                      isRTL ? "right-4" : "left-4"
                    }`}
                  >
                    {t(item.dayKey)}
                  </span>
                </div>

                <div className={`space-y-3 p-5 ${isRTL ? "text-right" : "text-left"}`}>
                  <h3 className="text-lg font-semibold text-[#2c2216]">{t(item.titleKey)}</h3>
                  <p className="break-words text-xs font-medium uppercase tracking-[0.12em] text-[#999570]">
                    {t(item.routeKey)}
                  </p>
                  <p className="text-sm leading-relaxed text-[#2c2216]/75">{t(item.descriptionKey)}</p>
                  <p className="text-xs font-medium text-[#2c2216]/65">{t(item.overnightKey)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
