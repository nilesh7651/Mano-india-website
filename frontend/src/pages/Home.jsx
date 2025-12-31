import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import API from "../services/api";

import SEO from "../components/SEO";

export default function Home() {
  // State for Gallery Scroll functionality
  const scrollContainerRef = useRef(null);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    API.get("/gallery")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          // If we have dynamic items, verify if we need to merge or replace
          // Requirement: "do keep demo pics". 
          // Strategy: Show dynamic items FIRST, then demo items.
          setGalleryItems([...res.data, ...demoGallery]);
        } else {
          setGalleryItems(demoGallery);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch gallery", err);
        setGalleryItems(demoGallery);
      });
  }, []);

  // Scroll to hash if present
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [window.location.hash]); // Re-run when hash changes

  const demoGallery = [
    {
      title: "Wedding Celebration",
      type: "Wedding Event",
      imageUrl: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac",
    },
    {
      title: "Live Concert Night",
      type: "Music Concert",
      imageUrl: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
    },
    {
      title: "Corporate Meetup",
      type: "Corporate Event",
      imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
      title: "Birthday Bash",
      type: "Private Party",
      imageUrl: "https://images.unsplash.com/photo-1515169067865-5387ec356754",
    },
    {
      title: "DJ Night",
      type: "Club Event",
      imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    },
    {
      title: "College Fest",
      type: "Fest Event",
      imageUrl: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
    },
  ];

  return (
    <div className="space-y-24 bg-black text-gray-100">
      <SEO
        title="Book Artists & Venues"
        description="Discover and book professional artists and venues for your events, weddings, and parties across India. Reliable, verified, and premium."
      />
      {/* NOTE: Added bg-black to body/container to match the dark theme of the logo 
         If your global layout is white, you can remove 'bg-black text-gray-100' above
      */}

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6 pt-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            Book Artists & Venues <br />
            for Your <span className="text-amber-500">Perfect Event</span>
          </h1>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            ManoIndia helps you discover verified artists and premium venues for
            weddings, parties, and corporate events — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/artists"
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition font-medium shadow-md shadow-amber-900/20"
            >
              Explore Artists
            </Link>

            <Link
              to="/venues"
              className="border-2 border-amber-600 text-amber-500 px-6 py-3 rounded-lg hover:bg-amber-600 hover:text-white transition font-medium"
            >
              Find Venues
            </Link>
          </div>
        </div>

        {/* Visual placeholder */}
        <HeroSlider />
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative py-24 mx-4 md:mx-8 rounded-3xl overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
          }}
        />

        {/* GOLD/BRONZE OVERLAY (Updated from Red) */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-700/90 via-yellow-600/85 to-black/95" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How ManoIndia Works
          </h2>

          <p className="text-amber-100 mb-16">
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
                  bg-gray-900/50 text-white p-8 rounded-2xl
                  border border-amber-500/30
                  backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-3 hover:shadow-amber-500/40 hover:shadow-2xl hover:border-amber-500
                "
              >
                {/* GOLD GRADIENT SLIDE (inside card) */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400
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
                      bg-amber-600 text-white font-bold text-lg
                      flex items-center justify-center
                      transition-colors duration-300
                      group-hover:bg-white group-hover:text-amber-600
                    "
                  >
                    {i + 1}
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-gray-300 text-sm group-hover:text-amber-100 transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MANO */}
      <section id="about" className="relative py-24 mx-4 md:mx-8 rounded-3xl overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521334884684-d80222895322')",
          }}
        />

        {/* GOLD/BRONZE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-700/90 via-yellow-600/85 to-black/95" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Why Choose ManoIndia?
          </h2>

          <p className="max-w-2xl mx-auto text-amber-100 mb-16">
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
                  bg-gray-900/50 text-white p-8 rounded-2xl
                  border border-amber-500/30
                  backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-3 hover:shadow-amber-500/40 hover:shadow-2xl hover:border-amber-500
                "
              >
                {/* GOLD GRADIENT SLIDE INSIDE CARD */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400
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

                  <p className="text-gray-300 text-sm transition-colors duration-300 group-hover:text-amber-100">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Start Planning Your Event Today
        </h2>
        <p className="text-gray-400 mb-6">
          Join thousands of satisfied customers
        </p>

        <Link
          to="/artists"
          className="inline-block bg-amber-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-amber-500 transition font-medium shadow-lg shadow-amber-900/50"
        >
          Get Started
        </Link>
      </section>

      {/* PAST EVENTS GALLERY - SLIDESHOW */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative group/gallery">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Past Events Gallery
            </h2>
            <p className="text-gray-400 max-w-xl">
              A glimpse of unforgettable moments created with ManoIndia — from
              weddings to corporate events.
            </p>
          </div>

          {/* Slider Controls Removed - Using Grid Layout */}
        </div>


        {/* Gallery Carousel Container */}
        {/* Gallery Grid Container - Matching Events.jsx Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.slice(0, 3).map((event, i) => (
            <div
              key={i}
              className="
                group relative bg-gray-900 rounded-2xl overflow-hidden 
                border border-gray-800 hover:border-amber-500/50 
                transition-all duration-500 shadow-lg hover:shadow-amber-900/20
              "
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 backdrop-blur-md border border-gray-700 text-amber-500 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                    {event.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                  {event.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                  {event.description || "A spectacular event curated by ManoIndia."}
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 group-hover:text-amber-500 transition-colors">
                  <span>View Details</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <Link
            to="/events"
            className="
              inline-block px-8 py-3 rounded-full border border-gray-700
              text-gray-300 font-medium hover:border-amber-500 hover:text-amber-500 
              transition
            "
          >
            View All Events
          </Link>
        </div>
      </section >

      {/* VIDEO SECTION */}
      < section className="max-w-6xl mx-auto px-6 pb-24" >
        <div className="rounded-2xl overflow-hidden shadow-lg shadow-amber-900/20 border border-gray-800">
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
      </section >
    </div >
  );
}