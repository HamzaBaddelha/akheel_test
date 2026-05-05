import type { Program, ProgramValueProp } from "@/lib/programs/types";

type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

function fallbackT(
  t: TranslateFn,
  key: string,
  fallback: string,
  params?: Record<string, string | number>,
) {
  const value = t(key, params);
  return value === key ? fallback : value;
}

function localizeCategory(category: string | undefined, t: TranslateFn) {
  if (!category) return "";
  const categoryKeyMap: Record<string, string> = {
    Nature: "programsPage.categories.nature",
    Adventure: "programsPage.categories.adventure",
    Culture: "programsPage.categories.culture",
    Wellness: "programsPage.categories.wellness",
    Coastal: "programsPage.categories.coastal",
    "Multi-Day": "programsPage.categories.multiDay",
  };
  const key = categoryKeyMap[category];
  return key ? fallbackT(t, key, category) : category;
}

function localizeDuration(duration: string | undefined, t: TranslateFn) {
  if (!duration) return "";
  const durationKeyMap: Record<string, string> = {
    "Full day": "programsPage.common.fullDay",
    "Half day": "programsPage.common.halfDay",
    "2 to 3 hours": "programsPage.common.twoToThreeHours",
    "3 to 4 hours": "programsPage.common.threeToFourHours",
  };
  const key = durationKeyMap[duration];
  return key ? fallbackT(t, key, duration) : duration;
}

export function localizeProgram(program: Program, t: TranslateFn): Program {
  const base = `programsPage.programData.${program.slug}`;
  const localizedHighlights =
    program.highlights?.map((highlight, index) =>
      fallbackT(t, `${base}.highlights.${index}`, highlight),
    ) ?? [];
  const localizedPlaces =
    program.places?.map((place, index) => fallbackT(t, `${base}.places.${index}`, place)) ?? [];

  return {
    ...program,
    title: fallbackT(t, `${base}.title`, program.title),
    shortDescription: fallbackT(t, `${base}.description`, program.shortDescription ?? ""),
    destination: fallbackT(t, `${base}.destination`, program.destination ?? ""),
    badge: fallbackT(t, `${base}.badge`, program.badge ?? ""),
    category: localizeCategory(program.category, t),
    duration: localizeDuration(program.duration, t),
    highlights: localizedHighlights,
    places: localizedPlaces,
  };
}

export function localizeValueProps(valueProps: ProgramValueProp[], t: TranslateFn) {
  return valueProps.map((item, index) => ({
    ...item,
    title: fallbackT(t, `programsPage.valueProps.items.${index}.title`, item.title),
    description: fallbackT(
      t,
      `programsPage.valueProps.items.${index}.description`,
      item.description,
    ),
  }));
}
