import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

export type Tour = {
  slug: string;
  name: Localized;
  summary: Localized;
  description: Localized;
  category: Localized;
  /** Price per person in USD */
  priceUsd: number;
  durationHours: number;
  maxGuests: number;
  meetingPoint: Localized;
  included: LocalizedList;
  highlights: LocalizedList;
  /** Path under /public, e.g. /images/tours/comuna-13.jpg. Falls back to a burgundy gradient when empty. */
  image?: string;
  featured?: boolean;
};

/**
 * PLACEHOLDER DATA. Replace with the Airtable export.
 * Plan: export the Airtable table to CSV, then run `npm run import:tours` (to be added)
 * to regenerate this file. Prices, names and descriptions below are examples only.
 */
export const tours: Tour[] = [
  {
    slug: "comuna-13-graffiti-tour",
    name: { en: "Comuna 13 Graffiti Tour", es: "Tour de Grafiti Comuna 13" },
    summary: {
      en: "Street art, escalators and stories of transformation.",
      es: "Arte urbano, escaleras eléctricas e historias de transformación.",
    },
    description: {
      en: "Placeholder description. Walk through one of Medellín's most inspiring neighborhoods with a local guide.",
      es: "Descripción de ejemplo. Recorre uno de los barrios más inspiradores de Medellín con una guía local.",
    },
    category: { en: "City & Culture", es: "Ciudad y Cultura" },
    priceUsd: 40,
    durationHours: 4,
    maxGuests: 12,
    meetingPoint: { en: "El Poblado, hotel pickup", es: "El Poblado, recogida en hotel" },
    included: {
      en: ["Local guide", "Metro tickets", "Bottled water"],
      es: ["Guía local", "Tiquetes de metro", "Agua embotellada"],
    },
    highlights: {
      en: ["Outdoor escalators", "Street art stories", "Local snacks"],
      es: ["Escaleras eléctricas al aire libre", "Historias del arte urbano", "Snacks locales"],
    },
    featured: true,
  },
  {
    slug: "guatape-and-la-piedra",
    name: { en: "Guatapé & El Peñón", es: "Guatapé y El Peñón" },
    summary: {
      en: "Colorful town, lake views and the famous rock.",
      es: "Pueblo colorido, vistas al lago y la famosa piedra.",
    },
    description: {
      en: "Placeholder description. A full day trip to Guatapé with transport and a local guide.",
      es: "Descripción de ejemplo. Una excursión de día completo a Guatapé con transporte y guía local.",
    },
    category: { en: "Day Trips", es: "Excursiones" },
    priceUsd: 75,
    durationHours: 10,
    maxGuests: 10,
    meetingPoint: { en: "El Poblado, hotel pickup", es: "El Poblado, recogida en hotel" },
    included: {
      en: ["Private transport", "Local guide", "Breakfast"],
      es: ["Transporte privado", "Guía local", "Desayuno"],
    },
    highlights: {
      en: ["Climb the rock", "Boat ride option", "Colorful streets"],
      es: ["Sube la piedra", "Opción de paseo en bote", "Calles coloridas"],
    },
    featured: true,
  },
  {
    slug: "coffee-farm-experience",
    name: { en: "Coffee Farm Experience", es: "Experiencia en Finca Cafetera" },
    summary: {
      en: "From bean to cup on a working farm.",
      es: "Del grano a la taza en una finca real.",
    },
    description: {
      en: "Placeholder description. Learn how Colombian coffee is grown, processed and brewed.",
      es: "Descripción de ejemplo. Aprende cómo se cultiva, procesa y prepara el café colombiano.",
    },
    category: { en: "Food & Drink", es: "Gastronomía" },
    priceUsd: 60,
    durationHours: 6,
    maxGuests: 10,
    meetingPoint: { en: "El Poblado, hotel pickup", es: "El Poblado, recogida en hotel" },
    included: {
      en: ["Transport", "Farm tour", "Coffee tasting"],
      es: ["Transporte", "Recorrido por la finca", "Cata de café"],
    },
    highlights: {
      en: ["Pick your own beans", "Tasting session", "Lunch option"],
      es: ["Recoge tus granos", "Sesión de cata", "Opción de almuerzo"],
    },
    featured: true,
  },
  {
    slug: "medellin-food-tour",
    name: { en: "Medellín Food Tour", es: "Tour Gastronómico de Medellín" },
    summary: {
      en: "Taste local flavors from markets to hidden kitchens.",
      es: "Prueba sabores locales desde plazas de mercado hasta cocinas escondidas.",
    },
    description: {
      en: "Placeholder description. A guided tasting walk through the city's best-loved food spots.",
      es: "Descripción de ejemplo. Un recorrido guiado de degustación por los sitios de comida más queridos de la ciudad.",
    },
    category: { en: "Food & Drink", es: "Gastronomía" },
    priceUsd: 55,
    durationHours: 4,
    maxGuests: 8,
    meetingPoint: { en: "Centro, meeting spot shared after booking", es: "Centro, punto de encuentro compartido tras reservar" },
    included: {
      en: ["Local guide", "All tastings", "Drinks"],
      es: ["Guía local", "Todas las degustaciones", "Bebidas"],
    },
    highlights: {
      en: ["Traditional market", "Street food", "Local sweets"],
      es: ["Plaza de mercado tradicional", "Comida callejera", "Dulces locales"],
    },
  },
  {
    slug: "city-history-and-botero",
    name: { en: "City History & Botero", es: "Historia de la Ciudad y Botero" },
    summary: {
      en: "Downtown landmarks, art and the story of Medellín.",
      es: "Lugares del centro, arte y la historia de Medellín.",
    },
    description: {
      en: "Placeholder description. Explore the heart of the city and its most famous sculptures.",
      es: "Descripción de ejemplo. Explora el corazón de la ciudad y sus esculturas más famosas.",
    },
    category: { en: "City & Culture", es: "Ciudad y Cultura" },
    priceUsd: 35,
    durationHours: 3,
    maxGuests: 12,
    meetingPoint: { en: "Plaza Botero", es: "Plaza Botero" },
    included: {
      en: ["Local guide", "Metro tickets"],
      es: ["Guía local", "Tiquetes de metro"],
    },
    highlights: {
      en: ["Botero sculptures", "Historic center", "Local stories"],
      es: ["Esculturas de Botero", "Centro histórico", "Historias locales"],
    },
  },
];

export function getTour(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}

export function getFeaturedTours(): Tour[] {
  const featured = tours.filter((tour) => tour.featured);
  return featured.length > 0 ? featured : tours.slice(0, 3);
}

export function getCategories(locale: Locale): string[] {
  return Array.from(new Set(tours.map((tour) => tour.category[locale])));
}
