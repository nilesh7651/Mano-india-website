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
            ManoIndia helps you discover verified artists and premium venues
            for weddings, parties, and corporate events — all in one place.
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
      <section className="text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          How ManoIndia Works
        </h2>
        <p className="text-gray-500 mb-12">Simple steps to book your perfect event</p>

        <div className="grid md:grid-cols-3 gap-6">
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
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY MANO */}
      <section className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Why Choose ManoIndia?
        </h2>

        <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed">
          We focus on verified profiles, transparent pricing, and a seamless
          booking experience — eliminating the chaos of traditional event planning.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Start Planning Your Event Today
        </h2>
        <p className="text-gray-500 mb-6">Join thousands of satisfied customers</p>

        <Link
          to="/artists"
          className="inline-block bg-black text-white px-8 py-4 rounded-lg text-lg hover:opacity-90 transition font-medium shadow-md"
        >
          Get Started
        </Link>
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
    Discover how ManoIndia simplifies artist & venue booking for every event.
  </p>
</section>

    </div>
  );
}
