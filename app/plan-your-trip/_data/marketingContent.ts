import { DestinationHighlight, ProcessStep, Testimonial } from "../_lib/types";

export const premiumBenefits = [
  "planTrip.benefits.items.0",
  "planTrip.benefits.items.1",
  "planTrip.benefits.items.2",
  "planTrip.benefits.items.3",
] as const;

export const processSteps: ProcessStep[] = [
  {
    titleKey: "planTrip.steps.items.0.title",
    descriptionKey: "planTrip.steps.items.0.description",
    image: "/assets/baground.jpg",
  },
  {
    titleKey: "planTrip.steps.items.1.title",
    descriptionKey: "planTrip.steps.items.1.description",
    image: "/assets/contactyou.png",
  },
  {
    titleKey: "planTrip.steps.items.2.title",
    descriptionKey: "planTrip.steps.items.2.description",
    image: "/assets/booking.png",
  },
];

export const destinationHighlights: DestinationHighlight[] = [
  {
    nameKey: "planTrip.destinations.items.0.name",
    image: "/assets/marrakech.jpg",
    noteKey: "planTrip.destinations.items.0.note",
  },
  {
    nameKey: "planTrip.destinations.items.1.name",
    image: "/assets/hero.webp",
    noteKey: "planTrip.destinations.items.1.note",
  },
  {
    nameKey: "planTrip.destinations.items.2.name",
    image: "/assets/moroccoblue.jpg",
    noteKey: "planTrip.destinations.items.2.note",
  },
];

export const testimonials: Testimonial[] = [
  {
    nameKey: "planTrip.testimonials.items.0.name",
    quoteKey: "planTrip.testimonials.items.0.quote",
  },
  {
    nameKey: "planTrip.testimonials.items.1.name",
    quoteKey: "planTrip.testimonials.items.1.quote",
  },
  {
    nameKey: "planTrip.testimonials.items.2.name",
    quoteKey: "planTrip.testimonials.items.2.quote",
  },
];
