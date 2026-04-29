import type { Program, ProgramValueProp } from "@/lib/programs/types";

export const PROGRAMS_PRIMARY_COLOR = "#2c2216";
export const PROGRAMS_BG_COLOR = "#e1e0d4";
export const PROGRAMS_FALLBACK_IMAGE = "/assets/hero.webp";

export const DEFAULT_CATEGORIES = [
  "Nature",
  "Adventure",
  "Culture",
  "Wellness",
  "City Tours",
  "Beach",
] as const;

export const SELECTED_RAIL_SLUGS = new Set([
  "agadir-city-tour",
  "hammam-spa-experience",
  "taroudant-tiout-day-trip",
  "surf-experience",
  "quad-sand-adventure",
  "essaouira-day-trip",
]);

export const VALUE_PROPS: ProgramValueProp[] = [
  {
    title: "Curated Experiences",
    description:
      "Each itinerary is carefully designed for comfort, authenticity, and meaningful discovery.",
  },
  {
    title: "Trusted Local Guides",
    description:
      "Travel with knowledgeable hosts who understand every region, route, and hidden story.",
  },
  {
    title: "Flexible Planning",
    description:
      "Adjust the pace, stops, and style of your program to fit your travel goals.",
  },
  {
    title: "Premium Destinations",
    description:
      "From coastal escapes to mountain journeys, enjoy elevated routes and refined moments.",
  },
];

export const PROGRAMS_SEED: Program[] = [
  {
    id: "program-paradise-valley-atlas",
    slug: "paradise-valley-atlas-mountains",
    title: "Paradise Valley & Atlas Mountains",
    shortDescription:
      "A refreshing day through palm-lined valleys, natural pools, and scenic mountain roads near Agadir.",
    coverImage: "/assets/Paradise_Valley_&_Atlas_Mountains.jpg",
    destination: "Agadir / Taghazout",
    places: ["Paradise Valley", "Atlas Mountains", "Immouzer"],
    highlights: [
      "Natural pools & waterfalls",
      "Hiking in green valley",
      "Mountain landscapes & fresh air",
    ],
    duration: "Full day",
    priceFrom: 75,
    category: "Nature",
    featured: true,
    badge: "Signature",
    order: 1,
    isActive: true,
  },
  {
    id: "program-jeep-safari-desert",
    slug: "jeep-safari-desert-adventure",
    title: "Jeep Safari Desert Adventure",
    shortDescription:
      "Ride across dramatic coastlines, desert tracks, and Berber villages in a 4x4 expedition.",
    coverImage: "/assets/4x4_vehicles_driving.png",
    destination: "Agadir",
    places: [
      "Souss Massa National Park",
      "Tifnit",
      "Youssef Ben Tachfine Dam",
      "Sidi Rbat Desert",
    ],
    highlights: [
      "4x4 off-road adventure",
      "Fishermen caves & wild beaches",
      "Flamingos & wildlife",
      "Berber lunch tajine & couscous",
      "Small Sahara dunes",
    ],
    duration: "Full day",
    priceFrom: 95,
    category: "Adventure",
    order: 2,
    isActive: true,
  },
  {
    id: "program-tafraoute-anti-atlas",
    slug: "tafraoute-anti-atlas-mountains",
    title: "Tafraoute & Anti-Atlas Mountains",
    shortDescription:
      "Explore the surreal pink granite landscapes and peaceful oasis routes of Tafraoute.",
    coverImage: "/assets/morroco.jpg",
    destination: "Tafraoute",
    places: ["Tafraoute", "Anti-Atlas Mountains"],
    highlights: [
      "Unique rock formations",
      "Hidden oasis landscapes",
      "Calm & authentic Berber environment",
    ],
    duration: "Full day",
    priceFrom: 88,
    category: "Nature",
    order: 3,
    isActive: true,
  },
  {
    id: "program-berber-cooking",
    slug: "berber-village-cooking-experience",
    title: "Berber Village Cooking Experience",
    shortDescription:
      "Cook traditional Moroccan dishes and share stories with local families in the Atlas foothills.",
    coverImage: "/assets/Berber_Village_Cooking_Experience.jpg",
    destination: "Atlas Mountains",
    places: ["Atlas Mountains", "Traditional Berber villages"],
    highlights: [
      "Cooking tajine & couscous",
      "Tea ceremony",
      "Discover Berber lifestyle",
    ],
    duration: "Half day",
    priceFrom: 70,
    category: "Culture",
    badge: "Local Favorite",
    order: 4,
    isActive: true,
  },
  {
    id: "program-agadir-city-tour",
    slug: "agadir-city-tour",
    title: "Agadir City Tour",
    shortDescription:
      "Discover modern Agadir and historic viewpoints with curated stops across the city.",
    coverImage: "/assets/aghadeer.jpg",
    destination: "Agadir",
    places: ["Kasbah Oufella", "Crocopark Agadir"],
    highlights: [
      "Cable car panoramic views",
      "Crocodiles & botanical garden",
      "Local dining and city stops",
    ],
    duration: "Half day",
    priceFrom: 55,
    category: "City Tours",
    order: 5,
    isActive: true,
  },
  {
    id: "program-hammam-spa",
    slug: "hammam-spa-experience",
    title: "Hammam & Spa Experience",
    shortDescription:
      "Recharge with a refined wellness ritual inspired by Moroccan spa heritage.",
    coverImage: "/assets/hero.jpg",
    destination: "Agadir",
    places: ["Agadir Spa Centers"],
    highlights: [
      "Traditional hammam",
      "Black soap exfoliation",
      "Relaxing massage with oils",
    ],
    duration: "2 to 3 hours",
    priceFrom: 60,
    category: "Wellness",
    order: 6,
    isActive: true,
  },
  {
    id: "program-taroudant-tiout",
    slug: "taroudant-tiout-day-trip",
    title: "Taroudant & Tiout Day Trip",
    shortDescription:
      "Step into Morocco's heritage towns with souks, kasbah views, and palm oasis scenery.",
    coverImage: "/assets/kasbah.webp",
    destination: "Taroudant / Tiout",
    places: ["Taroudant", "Tiout"],
    highlights: [
      "Ancient city walls & souks",
      "Oasis & kasbah",
      "Authentic Moroccan countryside",
    ],
    duration: "Full day",
    priceFrom: 90,
    category: "Culture",
    order: 7,
    isActive: true,
  },
  {
    id: "program-surf-experience",
    slug: "surf-experience",
    title: "Surf Experience",
    shortDescription:
      "Catch Atlantic waves with pro instruction and a laid-back coastal atmosphere.",
    coverImage: "/assets/Surf_Experience.jpg",
    destination: "Agadir",
    places: ["Agadir Beach"],
    highlights: [
      "Surf lessons for all levels",
      "Atlantic waves",
      "Moroccan surf culture",
    ],
    duration: "3 to 4 hours",
    priceFrom: 50,
    category: "Beach",
    order: 8,
    isActive: true,
  },
  {
    id: "program-quad-sand",
    slug: "quad-sand-adventure",
    title: "Quad Sand Adventure",
    shortDescription:
      "An energetic quad journey combining beach tracks, mountain paths, and sunset moments.",
    coverImage: "/assets/desert.png",
    destination: "Taghazout",
    places: ["Taghazout"],
    highlights: [
      "Quad biking on beach & mountains",
      "Sunset views",
      "Tea break in nature",
    ],
    duration: "2 to 3 hours",
    priceFrom: 65,
    category: "Adventure",
    order: 9,
    isActive: true,
  },
  {
    id: "program-essaouira-day-trip",
    slug: "essaouira-day-trip",
    title: "Essaouira Day Trip",
    shortDescription:
      "Travel to the Atlantic medina for ocean views, artisan markets, and historic charm.",
    coverImage: "/assets/Essaouira_Day_Trip.jpg",
    destination: "Essaouira",
    places: ["Essaouira", "Essaouira Medina"],
    highlights: ["Historic medina", "Atlantic ocean views", "Port & artisan markets"],
    duration: "Full day",
    priceFrom: 100,
    category: "City Tours",
    order: 10,
    isActive: true,
  },
];
