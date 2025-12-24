import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";

export default function Home() {
  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Book Artists & Venues <br />
            for Your Perfect Event
          </h1>

          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            ManoIndia helps you discover verified artists and premium venues for
            weddings, parties, and corporate events — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/artists"
              className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-medium shadow-md"
            >
              Explore Artists
            </Link>

            <Link
              to="/venues"
              className="border-2 border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition font-medium"
            >
              Find Venues
            </Link>
          </div>
        </div>

        {/* Visual placeholder */}
        <HeroSlider />
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-24 rounded-3xl overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
          }}
        />

        {/* Red overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 via-red-500/85 to-black/90" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How ManoIndia Works
          </h2>

          <p className="text-red-100 mb-16">
            Simple steps to book your perfect event.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Discover",
                desc: "Browse verified artists and venues curated for quality.",
              },
              {
                title: "Request",
                desc: "Send booking requests with your event details.",
              },
              {
                title: "Confirm",
                desc: "Get confirmed bookings with transparent pricing.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="
    group relative overflow-hidden
    bg-white text-gray-900 p-8 rounded-2xl
    shadow-lg backdrop-blur
    transition-all duration-300
    hover:-translate-y-3 hover:shadow-red-500/40 hover:shadow-2xl
  "
              >
                {/* RED GRADIENT SLIDE (inside card) */}
                <div
                  className="
      absolute inset-0
      bg-gradient-to-t from-red-600 via-red-500 to-red-400
      translate-y-full
      transition-transform duration-500 ease-out
      group-hover:translate-y-0
    "
                />

                {/* CONTENT (above gradient) */}
                <div className="relative z-10 text-center">
                  {/* Step Number */}
                  <div
                    className="
        w-14 h-14 mx-auto mb-6 rounded-full
        bg-red-600 text-white font-bold text-lg
        flex items-center justify-center
        transition-colors duration-300
        group-hover:bg-white group-hover:text-red-600
      "
                  >
                    {i + 1}
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-sm group-hover:text-red-100 transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MANO */}
      <section className="relative py-24 rounded-3xl overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521334884684-d80222895322')",
          }}
        />

        {/* Red gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 via-red-500/85 to-black/90" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Why Choose ManoIndia?
          </h2>

          <p className="max-w-2xl mx-auto text-red-100 mb-16">
            Verified profiles, transparent pricing, and a seamless booking
            experience — built for modern event planning.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "✅",
                title: "Verified Artists",
                desc: "All artists and venues are manually verified for quality.",
              },
              {
                icon: "💰",
                title: "Transparent Pricing",
                desc: "No hidden charges. Clear pricing before booking.",
              },
              {
                icon: "🔒",
                title: "Secure Payments",
                desc: "Payments are safe with trusted gateways.",
              },
              {
                icon: "⚡",
                title: "Fast Booking",
                desc: "Book artists and venues in minutes.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
    group relative overflow-hidden
    bg-white text-gray-900 p-8 rounded-2xl
    shadow-lg backdrop-blur
    transition-all duration-300
    hover:-translate-y-3 hover:shadow-red-500/40 hover:shadow-2xl
  "
              >
                {/* RED GRADIENT SLIDE INSIDE CARD */}
                <div
                  className="
      absolute inset-0
      bg-gradient-to-t from-red-600 via-red-500 to-red-400
      translate-y-full
      transition-transform duration-500 ease-out
      group-hover:translate-y-0
    "
                />

                {/* CONTENT */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="
        text-4xl mb-4
        transition-colors duration-300
        group-hover:text-white
      "
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm transition-colors duration-300 group-hover:text-red-100">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Start Planning Your Event Today
        </h2>
        <p className="text-gray-500 mb-6">
          Join thousands of satisfied customers
        </p>

        <Link
          to="/artists"
          className="inline-block bg-black text-white px-8 py-4 rounded-lg text-lg hover:opacity-90 transition font-medium shadow-md"
        >
          Get Started
        </Link>
      </section>

{/* Past Events Gallery  */}

{/* PAST EVENTS GALLERY */}
<section className="max-w-7xl mx-auto px-6 py-24">
  {/* Section Header */}
  <div className="text-center mb-14">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      Past Events Gallery
    </h2>
    <p className="text-gray-500 max-w-2xl mx-auto">
      A glimpse of unforgettable moments created with ManoIndia —
      from weddings to corporate events.
    </p>
  </div>

  {/* Gallery Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      {
        title: "Wedding Celebration",
        type: "Wedding Event",
        img: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac",
      },
      {
        title: "Live Concert Night",
        type: "Music Concert",
        img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
      },
      {
        title: "Corporate Meetup",
        type: "Corporate Event",
        img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      },
      {
        title: "Birthday Bash",
        type: "Private Party",
        img: "https://images.unsplash.com/photo-1515169067865-5387ec356754",
      },
      {
        title: "DJ Night",
        type: "Club Event",
        img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      },
      {
        title: "College Fest",
        type: "Fest Event",
        img: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
      },
    ].map((event, i) => (
      <div
        key={i}
        className="
          group relative overflow-hidden rounded-2xl
          shadow-lg cursor-pointer
        "
      >
        {/* Image */}
        <img
          src={event.img}
          alt={event.title}
          className="
            w-full h-72 object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
        />

        {/* Dark Gradient Overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t from-black/80 via-black/40 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
        />

        {/* Text Overlay */}
        <div
          className="
            absolute bottom-0 left-0 right-0 p-5
            translate-y-6 opacity-0
            group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-500
          "
        >
          <h3 className="text-lg font-semibold text-white">
            {event.title}
          </h3>
          <p className="text-sm text-red-300">
            {event.type}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* CTA */}
  <div className="text-center mt-14">
    <Link
      to="/events"
      className="
        inline-block px-8 py-4 rounded-full
        bg-red-600 text-white font-semibold
        hover:bg-red-700 transition
        shadow-lg
      "
    >
      View More Events
    </Link>
  </div>
</section>






      {/* VIDEO SECTION */}
      <section className="max-w-6xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-lg border">
          <video
            className="w-full h-[260px] md:h-[420px] object-cover"
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Discover how ManoIndia simplifies artist & venue booking for every
          event.
        </p>
      </section>
    </div>
  );
}
