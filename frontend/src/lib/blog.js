import { IMAGES } from "./images";

export const BLOG_POSTS = [
  {
    slug: "verified-profiles-update",
    title: "Verified Profiles Update: What It Means for Your Bookings",
    date: "2026-01-09",
    coverImage: IMAGES.hero.wedding,
    excerpt:
      "We’re strengthening trust on Mano India with clearer verification signals for artists, venues, and event managers.",
    keywords:
      "mano india news, verified profiles, trusted bookings, artists venues event managers",
    content: [
      {
        heading: "Why verification matters",
        body:
          "When you book for a shaadi, corporate launch, or a private party, reliability is everything. Clear verification signals help you shortlist faster and book with confidence.",
      },
      {
        heading: "What you’ll see",
        body:
          "Verified badges on eligible profiles, better clarity on offerings, and cleaner portfolio previews. This reduces last-minute surprises and improves coordination.",
      },
      {
        heading: "Tips for smoother booking",
        body:
          "Share your event date, city, expected crowd size, and your music/venue preferences in the first message. You’ll get more accurate quotes and faster confirmations.",
      },
    ],
  },
  {
    slug: "sangeet-planning-checklist",
    title: "Sangeet Planning Checklist (Quick + Practical)",
    date: "2026-01-06",
    coverImage: IMAGES.gallery.sangeet,
    excerpt:
      "A simple checklist to plan a sangeet night: artist selection, sound setup, stage flow, and timing that actually works.",
    keywords:
      "sangeet planning, sangeet checklist, wedding sangeet, book singer dj band",
    content: [
      {
        heading: "Lock the vibe first",
        body:
          "Decide whether your sangeet is Bollywood-heavy, sufi/ghazal, or a mixed set. This makes selecting the right singer/DJ/band much easier.",
      },
      {
        heading: "Sound + stage basics",
        body:
          "Confirm mic counts, monitor speakers, and a short sound check window. If dances are involved, ensure the stage has safe grip and enough width.",
      },
      {
        heading: "Run-of-show",
        body:
          "Keep performances in 3–5 minute blocks, with a 10–15 minute open dance slot after every few performances to maintain energy.",
      },
    ],
  },
  {
    slug: "venue-shortlist-guide",
    title: "How to Shortlist a Venue in 15 Minutes",
    date: "2026-01-02",
    coverImage: IMAGES.venue.banquet,
    excerpt:
      "A fast way to compare venues using capacity, parking, power backup, and photo-proof questions.",
    keywords:
      "venue shortlist, banquet hall booking, marriage hall, venue checklist",
    content: [
      {
        heading: "Capacity isn’t just a number",
        body:
          "Ask for seated vs floating capacity and confirm if the venue can manage buffet lines without congestion.",
      },
      {
        heading: "Non-negotiables",
        body:
          "Parking, power backup, washroom count, and staff coordination are the items that usually make or break the experience.",
      },
      {
        heading: "Request a real walkthrough",
        body:
          "Get recent photos/videos from an actual event in similar lighting (day/night). It’s the quickest way to set expectations correctly.",
      },
    ],
  },
  {
    slug: "corporate-event-trends-2026",
    title: "Corporate Event Trends for 2026 (India)",
    date: "2025-12-28",
    coverImage: IMAGES.hero.corporate,
    excerpt:
      "From shorter agendas to higher production value—here’s what companies are doing for launches, offsites, and conferences.",
    keywords:
      "corporate events india, conference planning, product launch, event trends 2026",
    content: [
      {
        heading: "Shorter sessions, better engagement",
        body:
          "Teams prefer tight 30–45 minute content blocks with networking breaks. This improves attention and attendance.",
      },
      {
        heading: "Production value matters",
        body:
          "Good audio, clean stage lighting, and a consistent visual theme elevate the brand experience more than overstuffed schedules.",
      },
      {
        heading: "Hybrid-ready by default",
        body:
          "Even for in-person events, organizers keep a lightweight streaming/recording option for remote stakeholders.",
      },
    ],
  },
];

export function getBlogPosts() {
  return BLOG_POSTS.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}
