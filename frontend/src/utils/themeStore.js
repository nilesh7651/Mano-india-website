import { IMAGES } from "../lib/images";

const THEMES_KEY = "manoindia_themes_v1";
const REQUESTS_KEY = "manoindia_theme_requests_v1";

export const DEMO_THEMES = [
  {
    id: "theme-royal-wedding",
    name: "Royal Wedding (Gold & Black)",
    priceFrom: 49999,
    image: IMAGES.gallery.sangeet,
    tags: ["wedding", "royal", "premium"],
    description: "A luxury royal decor theme with premium stage, floral, and lighting setup.",
    active: true,
  },
  {
    id: "theme-bollywood-night",
    name: "Bollywood Night",
    priceFrom: 34999,
    image: IMAGES.gallery.collegeFest,
    tags: ["party", "bollywood", "stage"],
    description: "High-energy Bollywood vibe with LED backdrops, props, and DJ-ready lighting.",
    active: true,
  },
  {
    id: "theme-corporate-minimal",
    name: "Corporate Minimal (Modern)",
    priceFrom: 29999,
    image: IMAGES.gallery.conference,
    tags: ["corporate", "minimal", "conference"],
    description: "Clean, modern corporate setup with branding zones, stage, and seating layout.",
    active: true,
  },
  {
    id: "theme-birthday-neon",
    name: "Birthday Neon Party",
    priceFrom: 19999,
    image: IMAGES.gallery.birthday,
    tags: ["birthday", "neon", "kids"],
    description: "Neon balloons, photo booth, and party lighting for birthdays and house parties.",
    active: true,
  },
];

const safeParse = (raw) => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export function getStoredThemes() {
  if (typeof window === "undefined") return null;
  const parsed = safeParse(window.localStorage.getItem(THEMES_KEY));
  return Array.isArray(parsed) ? parsed : null;
}

export function getThemes() {
  const stored = getStoredThemes();
  if (stored && stored.length > 0) return stored;
  return DEMO_THEMES;
}

export function setThemes(themes) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEMES_KEY, JSON.stringify(themes || []));
}

export function upsertTheme(theme) {
  const current = getStoredThemes() || [];
  const idx = current.findIndex((t) => t.id === theme.id);
  const next = idx >= 0 ? current.map((t, i) => (i === idx ? theme : t)) : [theme, ...current];
  setThemes(next);
  return next;
}

export function deleteTheme(themeId) {
  const current = getStoredThemes() || [];
  const next = current.filter((t) => t.id !== themeId);
  setThemes(next);
  return next;
}

export function getThemeRequests() {
  if (typeof window === "undefined") return [];
  const parsed = safeParse(window.localStorage.getItem(REQUESTS_KEY));
  return Array.isArray(parsed) ? parsed : [];
}

export function addThemeRequest(request) {
  if (typeof window === "undefined") return [];
  const current = getThemeRequests();
  const next = [request, ...current].slice(0, 200);
  window.localStorage.setItem(REQUESTS_KEY, JSON.stringify(next));
  return next;
}

export function updateThemeRequestStatus(id, status) {
  if (typeof window === "undefined") return [];
  const current = getThemeRequests();
  const next = current.map((r) => (r.id === id ? { ...r, status } : r));
  window.localStorage.setItem(REQUESTS_KEY, JSON.stringify(next));
  return next;
}
