export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  author?: string;
};

export const categories = [
  "Travel Guides",
  "Luxury Escapes",
  "Culture",
  "Adventure",
  "Food & Stay",
];

export const featuredPost: BlogPost = {
  slug: "hidden-riads-of-morocco",
  title: "Hidden Riads of Morocco: A Quiet Art of Hospitality",
  excerpt:
    "Step behind carved cedar doors into intimate courtyards, rosewater rituals, and suites that redefine discreet luxury across Marrakech and Fez.",
  category: "Luxury Escapes",
  date: "April 12, 2026",
  readTime: "8 min read",
  image: "/assets/marrakech.jpg",
  imageAlt: "Elegant riad courtyard with geometric tiles and warm light",
  author: "Leila Haddad",
};

export const latestStories: BlogPost[] = [
  {
    slug: "jandouba",
    title: "Tunis Jandouba",
    excerpt:
      "Breathe in cool mountain air, emerald forest calm, and winter snow in Ayn Darahim, a peaceful Tunisian escape with quietly luxurious charm.",
    category: "Travel Guides",
    date: "April 6, 2026",
    readTime: "6 min read",
    image: "/assets/Imlil_Valley.jpg",
    imageAlt: "Ayn Darahim mountain landscape with cool weather and peaceful nature",
  },
  {
    slug: "desert-luxury-under-stars",
    title: "Desert Luxury Under the Stars: Beyond the Dunes",
    excerpt:
      "From lantern-lit camps to dawn camel rides, discover how to experience desert stillness with elevated comfort.",
    category: "Adventure",
    date: "March 30, 2026",
    readTime: "7 min read",
    image: "/assets/Youssef Ibn Tachfine Dam 02 .jpg",
    imageAlt: "Desert dunes at sunset with warm cinematic tones",
  },
  {
    slug: "boutique-stays-worth-detour",
    title: "Boutique Stays Worth the Detour",
    excerpt:
      "A shortlist of architect-led properties where craft, service, and place meet in unforgettable detail.",
    category: "Food & Stay",
    date: "March 18, 2026",
    readTime: "5 min read",
    image: "/assets/Tafraoute3.jpg",
    imageAlt: "Boutique kasbah-style accommodation with earthy textures",
  },
  {
    slug: "cultural-journeys-through-medinas",
    title: "Cultural Journeys Through Historic Medinas",
    excerpt:
      "Walk with local historians, meet artisans in private ateliers, and trace stories hidden in old city walls.",
    category: "Culture",
    date: "March 11, 2026",
    readTime: "9 min read",
    image: "/assets/jemaa-alfanaa.png",
    imageAlt: "Historic medina square filled with color and texture",
  },
  {
    slug: "how-to-plan-luxury-travel-that-still-feels-personal",
    title: "How to Plan Luxury Travel That Still Feels Personal",
    excerpt:
      "A practical framework for balancing iconic highlights with slow moments and local authenticity.",
    category: "Travel Guides",
    date: "March 2, 2026",
    readTime: "6 min read",
    image: "/assets/Imlil_Valley.jpg",
    imageAlt: "Elegant coastal destination with blue sea and cityscape",
  },
  {
    slug: "wellness-rituals-of-north-africa",
    title: "Wellness Rituals of North Africa: Hammams and Healing Spaces",
    excerpt:
      "A sensorial guide to restorative traditions, private hammam suites, and serene spa sanctuaries.",
    category: "Luxury Escapes",
    date: "February 24, 2026",
    readTime: "7 min read",
    image: "/assets/hammam2.jpg",
    imageAlt: "Spa-inspired hammam interior with soft ambient lighting",
  },
];

export const editorPicks: BlogPost[] = [
  {
    slug: "atlas-retreats-and-alpine-light",
    title: "Atlas Retreats and Alpine Light",
    excerpt:
      "A two-night design retreat for travelers seeking altitude, silence, and thoughtful service.",
    category: "Editor's Pick",
    date: "February 19, 2026",
    readTime: "5 min read",
    image: "/assets/atlas-montain.jpg",
    imageAlt: "Atlas mountain retreat landscape at golden hour",
  },
  {
    slug: "coastal-journeys-with-culinary-stops",
    title: "Coastal Journeys with Culinary Stops",
    excerpt:
      "From oceanfront terraces to hidden kitchens, this route pairs scenery with exceptional tables.",
    category: "Editor's Pick",
    date: "February 10, 2026",
    readTime: "6 min read",
    image: "/assets/sousse.jpg",
    imageAlt: "Coastal cityscape with refined culinary travel atmosphere",
  },
];
