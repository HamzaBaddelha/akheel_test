"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { fadeInUp, pulseGlow, viewportOnce } from "@/lib/animations";

type ContactFormState = {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  travelCountry: string;
  hotelName: string;
  travelDate: string;
  vacationDays: string;
  message: string;
};

type DashboardProgram = {
  title?: unknown;
  hotel?: unknown;
  hotelName?: unknown;
  hotels?: unknown;
  country?: unknown;
  countryName?: unknown;
  travelCountry?: unknown;
  destinationCountry?: unknown;
  destination?: unknown;
};

const COUNTRY_CODES = [
  "+1 USA/Canada",
  "+7 Russia/Kazakhstan",
  "+20 Egypt",
  "+27 South Africa",
  "+30 Greece",
  "+31 Netherlands",
  "+32 Belgium",
  "+33 France",
  "+34 Spain",
  "+36 Hungary",
  "+39 Italy",
  "+40 Romania",
  "+41 Switzerland",
  "+43 Austria",
  "+44 United Kingdom",
  "+45 Denmark",
  "+46 Sweden",
  "+47 Norway",
  "+48 Poland",
  "+49 Germany",
  "+51 Peru",
  "+52 Mexico",
  "+53 Cuba",
  "+54 Argentina",
  "+55 Brazil",
  "+56 Chile",
  "+57 Colombia",
  "+58 Venezuela",
  "+60 Malaysia",
  "+61 Australia",
  "+62 Indonesia",
  "+63 Philippines",
  "+64 New Zealand",
  "+65 Singapore",
  "+66 Thailand",
  "+81 Japan",
  "+82 South Korea",
  "+84 Vietnam",
  "+86 China",
  "+90 Turkey",
  "+91 India",
  "+92 Pakistan",
  "+93 Afghanistan",
  "+94 Sri Lanka",
  "+95 Myanmar",
  "+98 Iran",
  "+211 South Sudan",
  "+212 Morocco",
  "+213 Algeria",
  "+216 Tunisia",
  "+218 Libya",
  "+220 Gambia",
  "+221 Senegal",
  "+222 Mauritania",
  "+223 Mali",
  "+224 Guinea",
  "+225 Cote d'Ivoire",
  "+226 Burkina Faso",
  "+227 Niger",
  "+228 Togo",
  "+229 Benin",
  "+230 Mauritius",
  "+231 Liberia",
  "+232 Sierra Leone",
  "+233 Ghana",
  "+234 Nigeria",
  "+235 Chad",
  "+236 Central African Republic",
  "+237 Cameroon",
  "+238 Cape Verde",
  "+239 Sao Tome and Principe",
  "+240 Equatorial Guinea",
  "+241 Gabon",
  "+242 Republic of the Congo",
  "+243 DR Congo",
  "+244 Angola",
  "+245 Guinea-Bissau",
  "+246 British Indian Ocean Territory",
  "+247 Ascension",
  "+248 Seychelles",
  "+249 Sudan",
  "+250 Rwanda",
  "+251 Ethiopia",
  "+252 Somalia",
  "+253 Djibouti",
  "+254 Kenya",
  "+255 Tanzania",
  "+256 Uganda",
  "+257 Burundi",
  "+258 Mozambique",
  "+260 Zambia",
  "+261 Madagascar",
  "+262 Reunion/Mayotte",
  "+263 Zimbabwe",
  "+264 Namibia",
  "+265 Malawi",
  "+266 Lesotho",
  "+267 Botswana",
  "+268 Eswatini",
  "+269 Comoros",
  "+290 Saint Helena",
  "+291 Eritrea",
  "+297 Aruba",
  "+298 Faroe Islands",
  "+299 Greenland",
  "+350 Gibraltar",
  "+351 Portugal",
  "+352 Luxembourg",
  "+353 Ireland",
  "+354 Iceland",
  "+355 Albania",
  "+356 Malta",
  "+357 Cyprus",
  "+358 Finland",
  "+359 Bulgaria",
  "+370 Lithuania",
  "+371 Latvia",
  "+372 Estonia",
  "+373 Moldova",
  "+374 Armenia",
  "+375 Belarus",
  "+376 Andorra",
  "+377 Monaco",
  "+378 San Marino",
  "+379 Vatican City",
  "+380 Ukraine",
  "+381 Serbia",
  "+382 Montenegro",
  "+383 Kosovo",
  "+385 Croatia",
  "+386 Slovenia",
  "+387 Bosnia and Herzegovina",
  "+389 North Macedonia",
  "+420 Czech Republic",
  "+421 Slovakia",
  "+423 Liechtenstein",
  "+500 Falkland Islands",
  "+501 Belize",
  "+502 Guatemala",
  "+503 El Salvador",
  "+504 Honduras",
  "+505 Nicaragua",
  "+506 Costa Rica",
  "+507 Panama",
  "+508 Saint Pierre and Miquelon",
  "+509 Haiti",
  "+590 Guadeloupe",
  "+591 Bolivia",
  "+592 Guyana",
  "+593 Ecuador",
  "+594 French Guiana",
  "+595 Paraguay",
  "+596 Martinique",
  "+597 Suriname",
  "+598 Uruguay",
  "+599 Curacao/Caribbean Netherlands",
  "+670 Timor-Leste",
  "+672 Australian External Territories",
  "+673 Brunei",
  "+674 Nauru",
  "+675 Papua New Guinea",
  "+676 Tonga",
  "+677 Solomon Islands",
  "+678 Vanuatu",
  "+679 Fiji",
  "+680 Palau",
  "+681 Wallis and Futuna",
  "+682 Cook Islands",
  "+683 Niue",
  "+685 Samoa",
  "+686 Kiribati",
  "+687 New Caledonia",
  "+688 Tuvalu",
  "+689 French Polynesia",
  "+690 Tokelau",
  "+691 Micronesia",
  "+692 Marshall Islands",
  "+850 North Korea",
  "+852 Hong Kong",
  "+853 Macao",
  "+855 Cambodia",
  "+856 Laos",
  "+880 Bangladesh",
  "+886 Taiwan",
  "+960 Maldives",
  "+961 Lebanon",
  "+962 Jordan",
  "+963 Syria",
  "+964 Iraq",
  "+965 Kuwait",
  "+966 Saudi Arabia",
  "+967 Yemen",
  "+968 Oman",
  "+970 Palestine",
  "+971 United Arab Emirates",
  "+972 Israel",
  "+973 Bahrain",
  "+974 Qatar",
  "+975 Bhutan",
  "+976 Mongolia",
  "+977 Nepal",
  "+992 Tajikistan",
  "+993 Turkmenistan",
  "+994 Azerbaijan",
  "+995 Georgia",
  "+996 Kyrgyzstan",
  "+998 Uzbekistan",
];

const INITIAL_STATE: ContactFormState = {
  name: "",
  countryCode: "+212 Morocco",
  phone: "",
  email: "",
  travelCountry: "Morocco",
  hotelName: "",
  travelDate: "",
  vacationDays: "",
  message: "",
};

const TRAVEL_COUNTRIES = ["Tunis", "Morocco", "Saudi Arabia"] as const;

type CountryOption = {
  value: string;
  label: string;
  country: string;
};

const normalizeCountryKey = (value: string) => {
  const normalized = value.trim().toLowerCase();
  if (normalized === "tunisia") return "tunis";
  if (normalized === "saudi arabia" || normalized === "saudi rabia") return "saudi arabia";
  return normalized;
};

const getCountryFromItem = (item: DashboardProgram): string | null => {
  const candidates = [
    item.country,
    item.countryName,
    item.travelCountry,
    item.destinationCountry,
    item.destination,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
  }

  return null;
};

const extractHotelsFromItem = (item: DashboardProgram): string[] => {
  const hotels = new Set<string>();

  if (typeof item.hotelName === "string" && item.hotelName.trim()) {
    hotels.add(item.hotelName.trim());
  }
  if (typeof item.hotel === "string" && item.hotel.trim()) {
    hotels.add(item.hotel.trim());
  }
  if (Array.isArray(item.hotels)) {
    item.hotels.forEach((hotel) => {
      if (typeof hotel === "string" && hotel.trim()) {
        hotels.add(hotel.trim());
      } else if (
        typeof hotel === "object" &&
        hotel !== null &&
        "name" in hotel &&
        typeof (hotel as { name?: unknown }).name === "string"
      ) {
        const hotelName = (hotel as { name: string }).name.trim();
        if (hotelName) hotels.add(hotelName);
      }
    });
  }
  if (typeof item.title === "string" && item.title.trim()) {
    hotels.add(item.title.trim());
  }

  return Array.from(hotels);
};

export default function ContactUs() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [hotelOptions, setHotelOptions] = useState<string[]>([]);
  const [hotelOptionsByCountry, setHotelOptionsByCountry] = useState<Record<string, string[]>>({});
  const [isHotelsLoading, setIsHotelsLoading] = useState(true);
  const fieldBaseClass =
    "w-full rounded-2xl border border-white/30 bg-white/70 px-4 py-3 text-sm leading-6 text-primary placeholder:text-primary/55 outline-none backdrop-blur-md transition-all duration-200 focus:border-secondary/70 focus:bg-white/80 focus:ring-2 focus:ring-secondary/25";
  const countryOptions = useMemo<CountryOption[]>(
    () =>
      COUNTRY_CODES.map((entry) => {
        const [code, ...countryParts] = entry.split(" ");
        const country = countryParts.join(" ").trim();
        return {
          value: entry,
          country,
          label: `${country} (${code})`,
        };
      }).sort((a, b) => a.country.localeCompare(b.country)),
    []
  );

  useEffect(() => {
    let isMounted = true;

    const loadHotels = async () => {
      try {
        const response = await fetch("/api/programs");
        if (!response.ok) throw new Error("Failed to fetch dashboard data");

        const payload = await response.json();
        const programs = Array.isArray(payload?.data) ? payload.data : [];
        const allHotels = new Set<string>();
        const byCountry = new Map<string, Set<string>>();

        programs.forEach((item: DashboardProgram) => {
          const hotels = extractHotelsFromItem(item);
          const country = getCountryFromItem(item);

          hotels.forEach((hotel) => allHotels.add(hotel));

          if (country && hotels.length > 0) {
            const key = normalizeCountryKey(country);
            const currentSet = byCountry.get(key) ?? new Set<string>();
            hotels.forEach((hotel) => currentSet.add(hotel));
            byCountry.set(key, currentSet);
          }
        });

        if (isMounted) {
          const mapped: Record<string, string[]> = {};
          byCountry.forEach((hotelSet, key) => {
            mapped[key] = Array.from(hotelSet).sort((a, b) => a.localeCompare(b));
          });

          setHotelOptionsByCountry(mapped);
          setHotelOptions(Array.from(allHotels).sort((a, b) => a.localeCompare(b)));
        }
      } catch {
        if (isMounted) {
          setHotelOptionsByCountry({});
          setHotelOptions([]);
        }
      } finally {
        if (isMounted) setIsHotelsLoading(false);
      }
    };

    loadHotels();
    return () => {
      isMounted = false;
    };
  }, []);

  const selectedCountryHotels = useMemo(() => {
    const key = normalizeCountryKey(form.travelCountry);
    return hotelOptionsByCountry[key] ?? [];
  }, [form.travelCountry, hotelOptionsByCountry]);

  const visibleHotels = selectedCountryHotels.length > 0 ? selectedCountryHotels : hotelOptions;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_STATE);
  };

  return (
    <section
      id="contact-us"
      className="relative overflow-hidden bg-secondary py-16 sm:py-24 lg:py-32"
      aria-label="Contact us section"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/airplane_window.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/45 via-primary/28 to-primary/48" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
      <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-background/20 blur-2xl" />
      <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-accent/25 blur-2xl" />

      <Container className="relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-3 max-w-3xl sm:mt-0"
        >
          <div className="rounded-[24px] border border-white/35 bg-white/18 p-4 shadow-[0_20px_60px_rgba(44,22,34,0.25)] backdrop-blur-xl sm:rounded-[28px] sm:p-8">
            <h2 className="mb-2 text-center font-serif text-2xl font-bold leading-tight text-primary sm:mb-3 sm:text-4xl lg:text-5xl">
              Contact Us
            </h2>
            <p className="mx-auto mb-7 max-w-2xl text-center text-sm leading-7 text-primary/85 sm:mb-10 sm:text-lg sm:leading-normal">
              Share your details and our team will contact you soon to plan your perfect journey.
            </p>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4"
              aria-label="Contact form"
            >
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Name"
                className={fieldBaseClass}
                aria-label="Name"
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.2fr] sm:gap-2">
                <select
                  required
                  value={form.countryCode}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, countryCode: e.target.value }))
                  }
                  className={`${fieldBaseClass} px-3`}
                  aria-label="Country code"
                >
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Phone Number"
                  className={fieldBaseClass}
                  aria-label="Phone number"
                />
              </div>

              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Email"
                className={`${fieldBaseClass} sm:col-span-2`}
                aria-label="Email"
              />

              <select
                required
                value={form.travelCountry}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    travelCountry: e.target.value,
                    hotelName: "",
                  }))
                }
                className={fieldBaseClass}
                aria-label="Country for travelling"
              >
                {TRAVEL_COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <select
                required
                value={form.hotelName}
                onChange={(e) => setForm((prev) => ({ ...prev, hotelName: e.target.value }))}
                className={fieldBaseClass}
                aria-label="Hotels names"
                disabled={isHotelsLoading || visibleHotels.length === 0}
              >
                <option value="">
                  {isHotelsLoading
                    ? "Loading hotels..."
                    : selectedCountryHotels.length > 0
                      ? "Choose hotel name"
                      : "No hotels for selected country"}
                </option>
                {visibleHotels.map((hotel) => (
                  <option key={hotel} value={hotel}>
                    {hotel}
                  </option>
                ))}
              </select>

              <div className="space-y-1">
                <label
                  htmlFor="travel-date"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-primary/80"
                >
                  Date of Travel
                </label>
                <input
                  id="travel-date"
                  type="date"
                  required
                  value={form.travelDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, travelDate: e.target.value }))}
                  className={fieldBaseClass}
                  aria-label="Date of travel"
                />
                <p className="text-xs leading-5 text-primary/70">Select your travel date</p>
              </div>

              <input
                type="number"
                min={1}
                required
                value={form.vacationDays}
                onChange={(e) => setForm((prev) => ({ ...prev, vacationDays: e.target.value }))}
                placeholder="Days of Vacation"
                className={fieldBaseClass}
                aria-label="Days of vacation"
              />

              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Message"
                className={`${fieldBaseClass} min-h-[116px] resize-none sm:col-span-2`}
                aria-label="Message"
              />

              <motion.div variants={pulseGlow} initial="initial" animate="pulse" className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-background shadow-[0_12px_32px_rgba(44,22,34,0.35)] transition-all duration-200 hover:translate-y-[-1px] hover:opacity-95"
                >
                  Submit
                </button>
              </motion.div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 rounded-2xl border border-green-200/80 bg-green-50/95 px-4 py-3 text-sm font-medium text-green-800 shadow-[0_8px_24px_rgba(22,101,52,0.18)] sm:col-span-2"
                  >
                    <span aria-hidden="true">✅</span>
                    We will contact you soon.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
