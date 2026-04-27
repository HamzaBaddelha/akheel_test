import type { TimelineEvent } from "@/components/ui/scrolltime";

type Translate = (key: string) => string;

type AgadirTourSeed = {
  id: string;
  year: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  images?: string[];
  sideImage?: string;
};

const AGADIR_TOURS_SEED: AgadirTourSeed[] = [
  {
    id: "paradise-valley",
    year: "🌿",
    titleKey: "data.agadirEvents.paradiseValley.title",
    subtitleKey: "data.agadirEvents.paradiseValley.subtitle",
    descriptionKey: "data.agadirEvents.paradiseValley.description",
    images: [
      "/assets/ATLAS-PARADISE1.jpg",
      "/assets/ATLAS-PARADISE2.jpg",
      "/assets/ATLAS-PARADISE3.jpg",
    ],
    sideImage: "/assets/ATLAS-PARADISE2.jpg",
  },
  {
    id: "jeep-safari",
    year: "🚙",
    titleKey: "data.agadirEvents.jeepSafari.title",
    subtitleKey: "data.agadirEvents.jeepSafari.subtitle",
    descriptionKey: "data.agadirEvents.jeepSafari.description",
    images: [
      "/assets/jeep_safari.jpg",
      "/assets/jeep_safari2.jpg",
      "/assets/jeep_safari3.jpg",
      "/assets/jeep_safari4.jpg",
    ],
    sideImage: "/assets/jeep_safari3.jpg",
  },
  {
    id: "tafraoute",
    year: "⛰️",
    titleKey: "data.agadirEvents.tafraoute.title",
    subtitleKey: "data.agadirEvents.tafraoute.subtitle",
    descriptionKey: "data.agadirEvents.tafraoute.description",
    images: [
      "/assets/Tafraoute1.jpg",
      "/assets/Tafraoute2.jpg",
      "/assets/Tafraoute3.jpg",
      "/assets/Tafraoute4.jpg",
    ],
    sideImage: "/assets/Tafraoute2.jpg",
  },
  {
    id: "cooking",
    year: "🍳",
    titleKey: "data.agadirEvents.cooking.title",
    subtitleKey: "data.agadirEvents.cooking.subtitle",
    descriptionKey: "data.agadirEvents.cooking.description",
    sideImage: "/assets/ATLAS-PARADISE1.jpg",
  },
  {
    id: "city-tour",
    year: "🚠",
    titleKey: "data.agadirEvents.cityTour.title",
    subtitleKey: "data.agadirEvents.cityTour.subtitle",
    descriptionKey: "data.agadirEvents.cityTour.description",
    images: ["/assets/aghadir1.jpg", "/assets/aghadir2.jpg", "/assets/aghadir3.jpg"],
    sideImage: "/assets/aghadir2.jpg",
  },
  {
    id: "hammam",
    year: "🧖",
    titleKey: "data.agadirEvents.hammam.title",
    subtitleKey: "data.agadirEvents.hammam.subtitle",
    descriptionKey: "data.agadirEvents.hammam.description",
    images: ["/assets/hammam1.jpg", "/assets/hammam2.jpg", "/assets/hammam3.jpg"],
    sideImage: "/assets/hammam2.jpg",
  },
  {
    id: "taroudant",
    year: "🏜️",
    titleKey: "data.agadirEvents.taroudant.title",
    subtitleKey: "data.agadirEvents.taroudant.subtitle",
    descriptionKey: "data.agadirEvents.taroudant.description",
    sideImage: "/assets/Tafraoute3.jpg",
  },
  {
    id: "surf",
    year: "🌊",
    titleKey: "data.agadirEvents.surf.title",
    subtitleKey: "data.agadirEvents.surf.subtitle",
    descriptionKey: "data.agadirEvents.surf.description",
    sideImage: "/assets/aghadir3.jpg",
  },
  {
    id: "quad",
    year: "🌅",
    titleKey: "data.agadirEvents.quad.title",
    subtitleKey: "data.agadirEvents.quad.subtitle",
    descriptionKey: "data.agadirEvents.quad.description",
    sideImage: "/assets/jeep_safari4.jpg",
  },
  {
    id: "essaouira",
    year: "🏝️",
    titleKey: "data.agadirEvents.essaouira.title",
    subtitleKey: "data.agadirEvents.essaouira.subtitle",
    descriptionKey: "data.agadirEvents.essaouira.description",
    sideImage: "/assets/aghadir1.jpg",
  },
];

export function getAgadirTours(t: Translate): TimelineEvent[] {
  return AGADIR_TOURS_SEED.map((tour) => ({
    id: tour.id,
    year: tour.year,
    title: t(tour.titleKey),
    subtitle: t(tour.subtitleKey),
    description: t(tour.descriptionKey),
    images: tour.images,
    sideMedia: tour.sideImage
      ? {
          src: tour.sideImage,
          alt: t(tour.titleKey),
        }
      : undefined,
  }));
}
