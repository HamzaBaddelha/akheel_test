export interface Destination {
  id: string;
  nameKey: string;
  descriptionKey: string;
  image: string;
  href?: string;
}

export interface Testimonial {
  id: string;
  quoteKey: string;
  nameKey: string;
  locationKey: string;
  rating: number;
}

export interface DestinationPanel {
  id: string;
  image: string;
  titleKey: string;
  subtitleKey?: string;
  ctaLabelKey: string;
  href: string;
}

export const destinations: Destination[] = [
  {
    id: "morocco-tours",
    nameKey: "data.destinations.moroccoTours.name",
    descriptionKey: "data.destinations.moroccoTours.description",
    image:
      "https://images.unsplash.com/photo-1553603227-2358aabe821e?w=800&q=80",
    href: "/agadir",
  },
  {
    id: "tunis",
    nameKey: "data.destinations.tunis.name",
    descriptionKey: "data.destinations.tunis.description",
    image: "/assets/tunis_mahdia.jpg",
    href: "/programs#tunisia-signature-journey",
  },
  {
    id: "saudi-arabia",
    nameKey: "data.destinations.saudiArabia.name",
    descriptionKey: "data.destinations.saudiArabia.description",
    image:
      "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800&q=80",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quoteKey: "data.testimonials.t1.quote",
    nameKey: "data.testimonials.t1.name",
    locationKey: "data.testimonials.t1.location",
    rating: 5,
  },
  {
    id: "t2",
    quoteKey: "data.testimonials.t2.quote",
    nameKey: "data.testimonials.t2.name",
    locationKey: "data.testimonials.t2.location",
    rating: 5,
  },
  {
    id: "t3",
    quoteKey: "data.testimonials.t3.quote",
    nameKey: "data.testimonials.t3.name",
    locationKey: "data.testimonials.t3.location",
    rating: 5,
  },
  {
    id: "t4",
    quoteKey: "data.testimonials.t4.quote",
    nameKey: "data.testimonials.t4.name",
    locationKey: "data.testimonials.t4.location",
    rating: 5,
  },
  {
    id: "t5",
    quoteKey: "data.testimonials.t5.quote",
    nameKey: "data.testimonials.t5.name",
    locationKey: "data.testimonials.t5.location",
    rating: 5,
  },
];

export const destinationPanels: DestinationPanel[] = [
  {
    id: "marrakech",
    image: "/assets/optimized-programs-hero.webp",
    titleKey: "data.panels.marrakech.title",
    subtitleKey: "data.panels.marrakech.subtitle",
    ctaLabelKey: "data.panels.cta",
    href: "/agadir",
  },
  {
    id: "atlas-montain",
    image: "/assets/atlas-montain.jpg",
    titleKey: "data.panels.atlasMontain.title",
    subtitleKey: "data.panels.atlasMontain.subtitle",
    ctaLabelKey: "data.panels.cta",
    href: "/agadir",
  },
  {
    id: "desert",
    image: "/assets/jeep_safari2.jpg",
    titleKey: "data.panels.desert.title",
    subtitleKey: "data.panels.desert.subtitle",
    ctaLabelKey: "data.panels.cta",
    href: "/",
  },
  {
    id: "tanger",
    image: "/assets/tardaoui4.png",
    titleKey: "data.panels.tanger.title",
    subtitleKey: "data.panels.tanger.subtitle",
    ctaLabelKey: "data.panels.cta",
    href: "/",
  },
  {
    id: "kabah",
    image: "/assets/Tafraoute3.jpg",
    titleKey: "data.panels.kabah.title",
    subtitleKey: "data.panels.kabah.subtitle",
    ctaLabelKey: "data.panels.cta",
    href: "/agadir",
  },
];
