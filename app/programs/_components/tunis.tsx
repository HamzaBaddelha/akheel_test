import Image from "next/image";

type TunisiaItineraryCard = {
  id: number;
  day: string;
  title: string;
  route: string;
  description: string;
  overnight: string;
  image: string;
};

const tunisItinerary: TunisiaItineraryCard[] = [
  {
    id: 1,
    day: "Day 1",
    title: "Arrival In Sousse",
    route: "Airport Arrival -> Sousse",
    description:
      "Arrival, private transfer, and a relaxed first evening on Tunisia's elegant coast.",
    overnight: "Overnight in a 4-star hotel",
    image: "/assets/sousse.jpg",
  },
  {
    id: 2,
    day: "Day 2",
    title: "Coastal Heritage Drive",
    route: "Sousse -> Monastir -> Mahdia",
    description:
      "A refined coastal route through marina charm, medina character, and sea views.",
    overnight: "Overnight in a 4-star hotel",
    image: "/assets/sousse2.jpg",
  },
  {
    id: 3,
    day: "Day 3",
    title: "From Coast To Desert Gate",
    route: "Mahdia -> El Djem -> Matmata -> Douz",
    description:
      "Discover Roman legacy and lunar landscapes before entering the Sahara gateway.",
    overnight: "Overnight in a 4-star hotel",
    image: "/assets/mahdia.jpg",
  },
  {
    id: 4,
    day: "Day 4",
    title: "Oasis Transition",
    route: "Douz -> Chott El Jerid -> Nefta -> Touzeur",
    description:
      "Cross shimmering salt flats and palm oases on a cinematic southbound journey.",
    overnight: "Overnight in a 4-star hotel",
    image: "/assets/Douz.jpg",
  },
  {
    id: 5,
    day: "Day 5",
    title: "Touzeur Leisure Day",
    route: "Touzeur Stay",
    description:
      "A slower luxury day to enjoy oasis ambiance, local culture, and desert light.",
    overnight: "Overnight in a 4-star hotel",
    image: "/assets/Touzeur.jpg",
  },
  {
    id: 6,
    day: "Day 6",
    title: "Scenic Rail & Sacred City",
    route: "Touzeur -> Metlaoui (Lezard Rouge) -> Kairouan",
    description:
      "Ride the iconic canyon train, then continue to one of Tunisia's spiritual jewels.",
    overnight: "Overnight in a 4-star hotel",
    image: "/assets/Touzeur.jpg",
  },
  {
    id: 7,
    day: "Day 7",
    title: "Culture & Coast Return",
    route: "Kairouan -> Kantaoui -> Sousse",
    description:
      "Morning discovery in Kairouan followed by a polished return to the Mediterranean coast.",
    overnight: "Overnight in a 4-star hotel",
    image: "/assets/sousse2.jpg",
  },
  {
    id: 8,
    day: "Day 8",
    title: "Departure Or Extension",
    route: "Sousse -> Airport / Holiday Extension",
    description:
      "Final transfer with the option to extend your stay for more tailored moments.",
    overnight: "Departure day or optional additional stay",
    image: "/assets/sousse.jpg",
  },
];

export default function TunisSection() {
  return (
    <section
      id="tunisia-signature-journey"
      aria-label="Tunisia itinerary showcase"
      className="scroll-mt-28 space-y-5 sm:space-y-7"
    >
      <div className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#999570]">
          Tunisia Discovery
        </p>
        <h2 className="text-2xl font-semibold text-[#2c2216] sm:text-4xl">
          Tunisia Signature Journey
        </h2>
        <p className="text-sm leading-relaxed text-[#2c2216]/75 sm:text-base">
          Coast, heritage, desert, and oasis landscapes curated into one premium itinerary.
        </p>
      </div>

      <div className="relative left-1/2 isolate w-screen -translate-x-1/2 overflow-hidden border-y border-[#2c2216]/10">
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
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {item.day}
                  </span>
                </div>

                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold text-[#2c2216]">{item.title}</h3>
                  <p className="break-words text-xs font-medium uppercase tracking-[0.12em] text-[#999570]">
                    {item.route}
                  </p>
                  <p className="text-sm leading-relaxed text-[#2c2216]/75">{item.description}</p>
                  <p className="text-xs font-medium text-[#2c2216]/65">{item.overnight}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
