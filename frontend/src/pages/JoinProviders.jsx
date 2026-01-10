import { Link, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import { IMAGES } from "../lib/images";

const validRoles = ["artist", "venue", "event_manager"];

export default function JoinProviders() {
  const [params] = useSearchParams();
  const role = params.get("role");
  const selectedRole = validRoles.includes(role) ? role : null;

  const heroTitle = selectedRole === "artist"
    ? "Join ManoIndia as an Artist"
    : selectedRole === "venue"
      ? "Join ManoIndia as a Venue Partner"
      : selectedRole === "event_manager"
        ? "Join ManoIndia as an Event Manager"
        : "Join ManoIndia — List Your Services";

  const heroDesc = "Get discovered by real customers, receive verified booking requests, and grow your business with ManoIndia.";

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <SEO
        title="Join ManoIndia | Artists, Venues & Event Managers"
        description="Artists, venues, and event managers can join ManoIndia to get discovered, receive booking requests, and grow their business."
        keywords="join manoindia, list your services, artist registration india, venue partner india, event manager registration, event planner onboarding, vendor onboarding, get bookings online"
        image={IMAGES.gallery.conference}
        canonicalUrl="https://manoindia.in/join"
      />

      <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-950 to-black p-8 md:p-12">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${IMAGES.gallery.conference})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest bg-black/60 border border-gray-800 text-amber-400 px-3 py-1 rounded-full">
            Partner With ManoIndia
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold text-white">{heroTitle}</h1>
          <p className="mt-3 text-gray-300 max-w-2xl">{heroDesc}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={`/signup?role=${selectedRole || "artist"}`}
              className="bg-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/30"
            >
              Create Provider Account
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl border border-gray-700 text-gray-200 hover:border-amber-500 hover:text-amber-400 transition-colors"
            >
              Already registered? Login
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Stat label="Verified bookings" value="Trusted users" />
            <Stat label="Better visibility" value="Search + listings" />
            <Stat label="Fast onboarding" value="Ready in minutes" />
          </div>
        </div>
      </div>

      <section className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RoleCard
          title="Artists"
          image={IMAGES.artists.singer}
          bullets={["Showcase portfolio", "Get event requests", "Set your starting price", "Ask Suggestion supported"]}
          ctaHref="/signup?role=artist"
          ctaText="Join as Artist"
        />
        <RoleCard
          title="Venues"
          image={IMAGES.venue.banquet}
          bullets={["List capacity & amenities", "Show venue photos", "Receive booking requests", "Grow local visibility"]}
          ctaHref="/signup?role=venue"
          ctaText="Join as Venue"
        />
        <RoleCard
          title="Event Managers"
          image={IMAGES.planner}
          bullets={["Show packages", "Manage bookings", "Build trust with reviews", "Get premium leads"]}
          ctaHref="/signup?role=event_manager"
          ctaText="Join as Manager"
        />
      </section>

      <section className="mt-12 bg-gray-950 border border-gray-800 rounded-3xl p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Just here to book for your event?</h2>
        <p className="mt-2 text-gray-400 max-w-2xl">
          Browse verified artists, venues and event managers, compare options, and book securely.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/artists"
            className="bg-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/20"
          >
            Browse Artists
          </Link>
          <Link
            to="/venues"
            className="px-6 py-3 rounded-xl font-bold border border-gray-700 text-gray-200 hover:border-amber-500 hover:text-amber-400 transition-colors"
          >
            Explore Venues
          </Link>
          <Link
            to="/event-managers"
            className="px-6 py-3 rounded-xl font-bold border border-gray-700 text-gray-200 hover:border-amber-500 hover:text-amber-400 transition-colors"
          >
            Find Event Managers
          </Link>
          <Link
            to="/themes"
            className="px-6 py-3 rounded-xl font-bold border border-gray-700 text-gray-200 hover:border-amber-500 hover:text-amber-400 transition-colors"
          >
            Book Theme
          </Link>
        </div>
      </section>

      <section className="mt-12 bg-gray-950 border border-gray-800 rounded-3xl p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white">How it works</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Step n="1" title="Sign up" desc="Choose your role and verify email via OTP." />
          <Step n="2" title="Complete profile" desc="Add pricing, city, services and portfolio images." />
          <Step n="3" title="Get discovered" desc="Appear in search & listing pages for customers." />
          <Step n="4" title="Start receiving bookings" desc="Confirm requests and deliver great events." />
        </div>
      </section>

      <section className="mt-12 bg-black border border-gray-800 rounded-3xl p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Minimum requirements</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          <Req title="Real contact details" desc="Valid phone number and email for communication." />
          <Req title="Basic portfolio" desc="At least 3–5 images (or past work) to build trust." />
          <Req title="Clear pricing" desc="A starting price or package estimate for faster decisions." />
          <Req title="Professional conduct" desc="Be on time, be transparent, deliver what you promise." />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={`/signup?role=${selectedRole || "artist"}`}
            className="bg-amber-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-500 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/"
            className="px-6 py-3 rounded-xl border border-gray-700 text-gray-200 hover:border-amber-500 hover:text-amber-400 transition-colors"
          >
            Explore ManoIndia
          </Link>
        </div>
      </section>

      <section className="mt-12 mb-6 text-center text-sm text-gray-500">
        Need help onboarding? Contact support from the footer links.
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-black/60 border border-gray-800 rounded-2xl p-4">
      <div className="text-amber-400 font-bold">{value}</div>
      <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function RoleCard({ title, image, bullets, ctaHref, ctaText }) {
  return (
    <div className="group bg-gray-950 border border-gray-800 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all">
      <div className="h-44 overflow-hidden">
        <img
          src={image}
          alt={`${title} services on ManoIndia`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <ul className="mt-3 space-y-2 text-sm text-gray-300">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-amber-500">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <Link
          to={ctaHref}
          className="mt-5 inline-flex w-full items-center justify-center bg-amber-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-amber-500 transition-colors"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}

function Step({ n, title, desc }) {
  return (
    <div className="bg-black border border-gray-800 rounded-2xl p-5">
      <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center">
        {n}
      </div>
      <div className="mt-3 text-white font-semibold">{title}</div>
      <div className="mt-1 text-sm text-gray-400">{desc}</div>
    </div>
  );
}

function Req({ title, desc }) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5">
      <div className="text-white font-semibold">{title}</div>
      <div className="mt-1 text-sm text-gray-400">{desc}</div>
    </div>
  );
}
