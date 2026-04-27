# Akheel Travel

> Premium multi-language travel website for curated Morocco and Saudi Arabia journeys built with Next.js App Router.

---

## ✨ Overview
Akheel Travel is a destination-focused tourism platform that showcases curated programs, immersive destination storytelling, and conversion-focused planning flows. The site targets premium leisure travelers and supports multilingual experiences (English, Arabic, French) with RTL handling for Arabic. Core journeys include destination discovery, program exploration, and trip planning/reservation entry points.

---

## 🚀 Tech Stack

| Category | Technology | Version |
|---|---|---|
| Core Framework | next | ^14.2.0 |
| Core Framework | react | ^18.3.0 |
| Core Framework | react-dom | ^18.3.0 |
| Styling & UI | tailwindcss | ^3.4.0 |
| Styling & UI | postcss | ^8.4.0 |
| Styling & UI | autoprefixer | ^10.4.0 |
| Styling & UI | class-variance-authority | ^0.7.1 |
| Styling & UI | clsx | ^2.1.1 |
| Styling & UI | tailwind-merge | ^3.5.0 |
| Styling & UI | lucide-react | ^1.8.0 |
| Animation | framer-motion | ^11.0.0 |
| Utilities | sharp | ^0.34.5 |
| Internationalization | Custom dictionary i18n (`I18nProvider`) | In-repo |
| Dev Tools & Analysis | @next/bundle-analyzer | ^16.2.4 |
| Dev Tools & Types | typescript | ^5.4.0 |
| Dev Tools & Types | @types/node | ^20.0.0 |
| Dev Tools & Types | @types/react | ^18.3.0 |
| Dev Tools & Types | @types/react-dom | ^18.3.0 |
| Linting | `next lint` (Next.js-integrated ESLint runner) | via `next` |

### Configuration Highlights
- **Next.js plugin**: `@next/bundle-analyzer` enabled when `ANALYZE=true`.
- **Image config**: AVIF/WEBP formats and remote pattern for `images.unsplash.com`.
- **Tailwind content scan**: `./app/**/*.{ts,tsx}`, `./components/**/*.{ts,tsx}`, `./lib/**/*.{ts,tsx}`.
- **TypeScript alias**: `@/* -> ./*`.

---

## 📁 Project Structure

```text
project-root/
├── app/                                    # Next.js App Router entrypoint and route tree
│   ├── agadir/                             # Agadir destination routes
│   │   ├── agadirtour/                     # Agadir tours timeline page route segment
│   │   │   └── page.tsx                    # /agadir/agadirtour timeline-focused page
│   │   └── page.tsx                        # /agadir immersive hero + timeline page
│   ├── api/                                # App Router API endpoints
│   │   └── programs/
│   │       └── route.ts                    # GET /api/programs returning program seed data
│   ├── blog/
│   │   └── page.tsx                        # /blog route re-export
│   ├── faq/
│   │   └── page.tsx                        # /faq route re-export
│   ├── journey/
│   │   └── page.tsx                        # /journey route rendering Journey section
│   ├── pages/                              # Shared page modules used by route re-exports
│   │   ├── blog.tsx                        # Blog content module with header/footer shell
│   │   ├── faq.tsx                         # FAQ content module with header/footer shell
│   │   ├── plan-your-trip.tsx              # Plan-your-trip content module
│   │   └── reservation.tsx                 # Reservation content module
│   ├── plan-your-trip/
│   │   └── page.tsx                        # /plan-your-trip route re-export
│   ├── programs/                           # Program catalog and detail routes
│   │   ├── [slug]/
│   │   │   └── page.tsx                    # /programs/[slug] static detail page
│   │   ├── _components/                    # Programs feature-specific components
│   │   │   ├── FeaturedProgram.tsx         # Featured hero-style program card
│   │   │   ├── ProgramCards.tsx            # Reusable program card with actions
│   │   │   ├── ProgramsCTA.tsx             # Programs page final CTA section
│   │   │   ├── ProgramsClient.tsx          # Client filtering + carousel data mapping
│   │   │   ├── ProgramsEmptyState.tsx      # Empty-state fallback for no programs
│   │   │   ├── ProgramsFilters.tsx         # Category filter controls
│   │   │   ├── ProgramsGrid.tsx            # Grid wrapper for program cards
│   │   │   ├── ProgramsHero.tsx            # Programs landing hero block
│   │   │   ├── ProgramsValueProps.tsx      # Value-proposition cards
│   │   │   ├── RailProgramCard.tsx         # Horizontal rail card variant
│   │   │   ├── SelectedExperiencesRail.tsx # Scrollable selected experiences rail
│   │   │   └── tunis.tsx                   # Tunisia-themed promo/content section
│   │   └── page.tsx                        # /programs index page
│   ├── reservation/
│   │   └── page.tsx                        # /reservation route re-export
│   ├── globals.css                         # Global styles + Tailwind layers/utilities
│   ├── layout.tsx                          # Root layout and metadata + I18nProvider
│   └── page.tsx                            # / homepage composition with dynamic sections
├── components/                             # Shared UI and page sections
│   ├── i18n/
│   │   └── I18nProvider.tsx                # Dictionary-based i18n context/provider
│   ├── layout/
│   │   ├── Footer.tsx                      # Site footer with translated labels
│   │   └── Header.tsx                      # Sticky nav, language switcher, mobile menu
│   ├── sections/                           # Homepage and marketing sections
│   │   ├── ContactUs.tsx                   # Contact form section with motion states
│   │   ├── DestinationPanelsSection.tsx    # Interactive destination panel cards
│   │   ├── DestinationShowcase.tsx         # Destination showcase with cinematic cards
│   │   ├── DiscoverMore.tsx                # Highlight section with visual storytelling
│   │   ├── Hero.tsx                        # Main hero section
│   │   ├── Journey.tsx                     # Journey section with panel transitions
│   │   ├── Testimonials.tsx                # Testimonials carousel/listing section
│   │   └── carouselimages.tsx              # Animated image carousel section
│   └── ui/                                 # Reusable UI primitives and advanced widgets
│       ├── 3d_programs_page.tsx            # 3D-like rotating program carousel
│       ├── BlurText.tsx                    # Letter/word blur reveal animation
│       ├── Button.tsx                      # Motion-enabled button component
│       ├── Container.tsx                   # Max-width responsive container wrapper
│       ├── Marquee.tsx                     # Horizontal/vertical marquee utility
│       ├── SectionHeading.tsx              # Standardized animated section heading
│       ├── card.tsx                        # Card and CardContent primitives
│       ├── circular-carousel.tsx           # Orbital circular carousel component
│       ├── scrolltime.tsx                  # Scroll-driven timeline with rich cards
│       └── slide_animation.tsx             # Directional slide-in wrapper
├── hooks/                                  # Reusable client hooks
│   ├── use-mobile.tsx                      # Mobile breakpoint detection hook
│   └── use-toast.tsx                       # Toast state management hook
├── lib/                                    # Shared utilities, data, and animation configs
│   ├── programs/                           # Program domain models/helpers/constants
│   │   ├── constants.ts                    # Seed data and static program constants
│   │   ├── getPrograms.ts                  # Program retrieval helpers
│   │   ├── helpers.ts                      # URL helpers, price formatting, filters
│   │   ├── index.ts                        # Barrel exports for program module
│   │   └── types.ts                        # Program TypeScript types
│   ├── animations.ts                       # Shared framer-motion variants/presets
│   ├── trips.ts                            # Destination/trip data structures
│   ├── utils.d.ts                          # Type declarations for JS utils interop
│   ├── utils.js                            # JS utility functions (including class merge)
│   └── utils.ts                            # TS utility functions (`cn`)
├── locales/                                # Translation dictionaries
│   ├── arabic.json                         # Arabic locale strings
│   ├── english.json                        # English locale strings
│   └── french.json                         # French locale strings
├── public/                                 # Static assets served from root
│   └── assets/
│       ├── ATLAS-PARADISE1.jpg             # Agadir timeline image
│       ├── ATLAS-PARADISE2.jpg             # Agadir timeline image
│       ├── ATLAS-PARADISE3.jpg             # Agadir timeline image
│       ├── Cap Spartel .png                # Destination image asset
│       ├── Douz.jpg                        # Destination/program image asset
│       ├── Tafraoute1.jpg                  # Tafraoute gallery image
│       ├── Tafraoute2.jpg                  # Tafraoute gallery image
│       ├── Tafraoute3.jpg                  # Tafraoute gallery image
│       ├── Tafraoute4.jpg                  # Tafraoute gallery image
│       ├── Touzeur.jpg                     # Destination image asset
│       ├── aghadeer.jpg                    # Agadir program cover image
│       ├── aghadir1.jpg                    # Agadir city tour image
│       ├── aghadir2.jpg                    # Agadir city tour image
│       ├── aghadir3.jpg                    # Agadir city tour image
│       ├── aljam_tunis.jpg                 # Tunisia section image
│       ├── atlas-montain.jpg               # Paradise Valley cover image
│       ├── baground.jpg                    # Background image asset
│       ├── desert.png                      # Program/section desert image
│       ├── desert.webp                     # Program/section desert image
│       ├── hammam1.jpg                     # Hammam gallery image
│       ├── hammam2.jpg                     # Hammam gallery image
│       ├── hammam3.jpg                     # Hammam gallery image
│       ├── hero.jpg                        # Hero/media image asset
│       ├── hero.webp                       # Fallback hero image asset
│       ├── jeep_safari.jpg                 # Jeep safari gallery image
│       ├── jeep_safari2.jpg                # Jeep safari gallery image
│       ├── jeep_safari3.jpg                # Jeep safari gallery image
│       ├── jeep_safari4.jpg                # Jeep safari gallery image
│       ├── jemaa-alfanaa.png               # Destination image asset
│       ├── kasbah.png                      # Destination/program image asset
│       ├── kasbah.webp                     # Program cover image asset
│       ├── logo-no-background.png          # Brand logo asset
│       ├── logo-white-no-background.png    # Footer logo asset
│       ├── logo.png                        # Header logo asset
│       ├── mahdia.jpg                      # Destination image asset
│       ├── marrakech.jpg                   # Destination panel image asset
│       ├── moroccoblue.jpg                 # Program/section blue Morocco image
│       ├── morroco.jpg                     # Program/section image asset
│       ├── mosque.jpg                      # Program/section image asset
│       ├── multiyimages1.jpg               # Carousel image asset
│       ├── multyimages2.jpg                # Carousel image asset
│       ├── multyimages3.jpg                # Carousel image asset
│       ├── sousse.jpg                      # Destination image asset
│       ├── sousse2.jpg                     # Destination image asset
│       ├── style_baground-prgrampage.png   # Programs 3D carousel background
│       ├── tanger.jpg                      # Program/section image asset
│       ├── the Caves of Hercules .png      # Destination image asset
│       └── tunis_flag.jpg                  # Tunisia flag image asset
├── .gitignore                              # Git ignore rules
├── lightswind.css                          # Additional CSS utility/styles file
├── next-env.d.ts                           # Next.js TypeScript ambient references
├── next.config.js                          # Next.js config + bundle analyzer wrapper
├── package-lock.json                       # npm lockfile
├── package.json                            # Project metadata, scripts, dependencies
├── postcss.config.js                       # PostCSS plugin configuration
├── tailwind.config.ts                      # Tailwind theme and content config
├── tsconfig.json                           # TypeScript compiler options and paths
└── tsconfig.tsbuildinfo                    # Incremental TypeScript build cache
```

> Notes:
> - `styles/` and `types/` directories are **not present** in this repo.
> - No `middleware.ts` file is present.

---

## 🌍 Internationalization

The project uses a custom context-based i18n system in `components/i18n/I18nProvider.tsx` with dictionary JSON files.

- **Supported languages**: `en`, `ar`, `fr`.
- **Dictionaries**: `locales/english.json`, `locales/arabic.json`, `locales/french.json`.
- **Translation lookup**: Dot-path keys, resolved from in-memory dictionary and interpolated via `{param}` placeholders.
- **Persistence**: Selected language is stored in `localStorage` (`akheel-lang`).
- **RTL support**: `document.documentElement.dir` is set to `rtl` for Arabic and `ltr` otherwise.

### How to Add a New Language
1. Create a new dictionary file in `locales/` (e.g., `spanish.json`) using the same key structure.
2. Extend the `Language` union type in `I18nProvider.tsx`.
3. Add the dictionary to `DICTIONARIES` in `I18nProvider.tsx`.
4. Add the new language option to the header language switch (`LANGS` in `components/layout/Header.tsx`).
5. Validate UI direction behavior if the new language requires RTL.

---

## 🎨 Design System

From `tailwind.config.ts`:

### Theme Tokens
- **Colors**
  - `primary`: `#2C1622`
  - `secondary`: `#999570`
  - `background`: `#E1E0D4`
  - `foreground`: `#2C1622`
  - `accent`: `#B0B8C9`
  - Semantic CSS-variable-backed tokens: `border`, `input`, `ring`, `card`, `card-foreground`, `popover`, `popover-foreground`, `muted`, `muted-foreground`, `accent-foreground`
- **Fonts**
  - `font-serif`: `"GT Super Ds Trial", Georgia, serif`
  - `font-sans`: `"Neue Haas Grotesk Display Pro", "Helvetica Neue", Helvetica, Arial, sans-serif`
- **Border Radius**
  - `card`: `16px`
  - `container`: `24px`

### Content Paths
- `./app/**/*.{ts,tsx}`
- `./components/**/*.{ts,tsx}`
- `./lib/**/*.{ts,tsx}`

### Tailwind Plugins
- No Tailwind plugins configured (`plugins: []`).
- PostCSS plugins used: `tailwindcss`, `autoprefixer`.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js `>=18` (recommended for Next.js 14).
- npm (or compatible package manager).

### Installation

```bash
git clone [repo-url]
cd akheel-travel
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)  
(If port 3000 is occupied, Next.js auto-falls back to the next available port.)

### Build

```bash
npm run build
npm run start
```

### Bundle Analysis (optional)

```bash
ANALYZE=true npm run build
```

---

## 🧩 Key Components

### ScrollTimeline
- **Location**: `components/ui/scrolltime.tsx`
- **Purpose**: Scroll-driven animated timeline with alternating cards, progress line, and optional per-event image slider.
- **Key Props**: `events`, `title`, `subtitle`, `titleClassName`, `subtitleClassName`, `animationOrder`, `cardAlignment`, `lineColor`, `progressIndicator`, `cardVariant`, `cardEffect`, `parallaxIntensity`, `progressLineWidth`, `progressLineCap`, `dateFormat`, `className`, `revealAnimation`, `connectorStyle`.

### BlurText
- **Location**: `components/ui/BlurText.tsx`
- **Purpose**: Word/letter reveal animation with blur-to-clear transitions and intersection-triggered playback.
- **Key Props**: `text`, `delay`, `className`, `animateBy`, `direction`, `threshold`, `rootMargin`, `animationFrom`, `animationTo`, `easing`, `onAnimationComplete`, `stepDuration`.

### 3DCarousel (`3d_programs_page`)
- **Location**: `components/ui/3d_programs_page.tsx`
- **Purpose**: Featured programs carousel with auto-rotation, desktop stack effect, and mobile swipe.
- **Key Props**: `items`, `autoRotate`, `rotateInterval`, `cardHeight`, `title`, `subtitle`, `tagline`, `isMobileSwipe`.

### SlideAnimation
- **Location**: `components/ui/slide_animation.tsx`
- **Purpose**: Scroll-aware directional slide-in wrapper using `framer-motion`.
- **Key Props**: `children`, `from`, `className`.

### CircularCarousel
- **Location**: `components/ui/circular-carousel.tsx`
- **Purpose**: Orbital carousel for destination/program cards with pointer drag rotation.
- **Key Props**: `items`, `selectedId`, `onSelect`, `className`.

### Marquee
- **Location**: `components/ui/Marquee.tsx`
- **Purpose**: Horizontal/vertical repeated marquee lane with optional reverse and hover-pause.
- **Key Props**: `className`, `reverse`, `pauseOnHover`, `children`, `vertical`, `repeat` (+ native `div` props).

### Button
- **Location**: `components/ui/Button.tsx`
- **Purpose**: Motion-enabled button primitive with variants and size tokens.
- **Key Props**: `variant`, `size`, `pill` (+ native `button` props).

### Container
- **Location**: `components/ui/Container.tsx`
- **Purpose**: Max-width layout container with responsive horizontal padding.
- **Key Props**: `children`, `className`, `as`.

### SectionHeading
- **Location**: `components/ui/SectionHeading.tsx`
- **Purpose**: Standardized animated heading block with optional subtitle.
- **Key Props**: `title`, `subtitle`, `className`.

### Card / CardContent
- **Location**: `components/ui/card.tsx`
- **Purpose**: Reusable card primitives used across timeline/carousels/cards.
- **Key Props**: Standard `React.HTMLAttributes<HTMLDivElement>` (`className`, etc.).

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Starts Next.js development server with HMR |
| Build | `npm run build` | Creates production build (`.next`) |
| Start | `npm run start` | Runs production server from build output |
| Lint | `npm run lint` | Runs Next.js lint command |

---

## 🗺️ Pages & Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Homepage composed from dynamic destination/story sections |
| `/agadir` | `app/agadir/page.tsx` | Agadir destination page with hero, timeline, and CTA |
| `/agadir/agadirtour` | `app/agadir/agadirtour/page.tsx` | Timeline-focused Agadir tours page |
| `/programs` | `app/programs/page.tsx` | Programs hub with filters, featured section, value props, and CTA |
| `/programs/[slug]` | `app/programs/[slug]/page.tsx` | Program detail page with static params and metadata |
| `/blog` | `app/blog/page.tsx` | Blog landing page (re-export from `app/pages/blog.tsx`) |
| `/faq` | `app/faq/page.tsx` | FAQ landing page (re-export from `app/pages/faq.tsx`) |
| `/journey` | `app/journey/page.tsx` | Journey section standalone route |
| `/plan-your-trip` | `app/plan-your-trip/page.tsx` | Trip planning landing page (re-export module) |
| `/reservation` | `app/reservation/page.tsx` | Reservation landing page (re-export module) |
| `/api/programs` | `app/api/programs/route.ts` | JSON API endpoint returning program data (`GET`) |

---