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
        title="Mano India | Book Top Artists & Venues for Events"
        description="Mano India is the best platform to book top artists, singers, dancers, and event venues for weddings, corporate events, and parties."
        keywords="artist booking, venue booking, event management, hire singers, book dancers, wedding venues, mano india"
        canonicalUrl="https://manoindia.in/"
      />
      {/* NOTE: Added bg-black to body/container to match the dark theme of the logo 
         If your global layout is white, you can remove 'bg-black text-gray-100' above
      */}

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6 pt-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white mb-6">
            The Easiest Way to Book <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Top Artists & Premium Venues
            </span>
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
            Whether it's a dream wedding, a corporate gala, or a private party — find and book verified professionals securely with ManoIndia. Transparent pricing, no hidden fees.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/artists"
              className="bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-500 transition-all shadow-lg shadow-amber-900/30 hover:scale-105"
            >
              Browse Artists
            </Link>

            <Link
              to="/venues"
              className="px-8 py-4 rounded-full font-bold text-lg border border-gray-600 text-gray-300 hover:border-amber-500 hover:text-amber-500 transition-all hover:bg-gray-900"
            >
              Explore Venues
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Verified Profiles
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Secure Payments
            </div>
          </div>
        </div>

        {/* Visual placeholder */}
        <HeroSlider />
      </section>

      {/* HOW IT WORKS (Premium Timeline) */}
      <section id="how-it-works" className="relative py-24 mx-4 md:mx-8 rounded-3xl overflow-hidden bg-gray-900 border border-gray-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[128px]" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            How It Works
          </h2>
          <p className="text-gray-400 mb-20 text-lg max-w-2xl mx-auto">
            From discovery to celebration in 3 simple steps.
          </p>

          <div className="relative grid md:grid-cols-3 gap-12">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

            {[
              {
                step: "01",
                title: "Discover",
                desc: "Browse hundreds of verified artists & venues. Compare prices & reviews.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )
              },
              {
                step: "02",
                title: "Book",
                desc: "Send a request & pay securely. Your money is safe until the event.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                step: "03",
                title: "Celebrate",
                desc: "Coordinate details directly. Enjoy a seamless, memorable event.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                {/* Icon Circle */}
                <div className="w-24 h-24 mx-auto bg-gray-900 border-2 border-amber-500/30 rounded-full flex items-center justify-center relative z-10 box-content transition-transform duration-500 group-hover:scale-110 group-hover:border-amber-500 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                  <div className="text-amber-500 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  {/* Step Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-gray-900">
                    {item.step}
                  </div>
                </div>

                {/* Text Content */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed px-4 group-hover:text-gray-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* WHY MANO (Glassmorphic Grid) */}
      <section id="about" className="relative py-24 mx-4 md:mx-8">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Why Choose ManoIndia?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 mb-16">
            Verified profiles, transparent pricing, and a seamless booking
            experience — built for modern event planning.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "✅",
                title: "Verified Quality",
                desc: "100% manually verified profiles to ensure top-notch talent.",
                bg: "from-green-900/20 to-green-800/20",
                border: "group-hover:border-green-500/50"
              },
              {
                icon: "💰",
                title: "Transparent Pricing",
                desc: "No hidden fees. What you see is exactly what you pay.",
                bg: "from-amber-900/20 to-amber-800/20",
                border: "group-hover:border-amber-500/50"
              },
              {
                icon: "🔒",
                title: "Secure Payments",
                desc: "Funds held in escrow until the event is successfully completed.",
                bg: "from-blue-900/20 to-blue-800/20",
                border: "group-hover:border-blue-500/50"
              },
              {
                icon: "⚡",
                title: "Instant Booking",
                desc: "Fast digital contracts and immediate confirmations.",
                bg: "from-purple-900/20 to-purple-800/20",
                border: "group-hover:border-purple-500/50"
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`
                  group relative overflow-hidden p-8 rounded-2xl
                  bg-gradient-to-b ${item.bg}
                  border border-gray-800 backdrop-blur-sm
                  transition-all duration-300
                  hover:-translate-y-2 hover:shadow-2xl ${item.border}
                `}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="text-5xl mb-6 filter drop-shadow-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      < section className="text-center px-6" >
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
      </section >

      {/* PAST EVENTS GALLERY - PREMIUM BENTO GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
            Captured <span className="text-amber-500 italic">Moments</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A glimpse of the unforgettable memories created with ManoIndia — from grand weddings to intimate gatherings.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[1200px] md:h-[600px]">
          {galleryItems.slice(0, 4).map((event, i) => {
            // Define spans based on index for Bento Layout
            let spanClass = "";
            if (i === 0) spanClass = "md:col-span-2 md:row-span-2"; // Large Left Square
            else if (i === 1) spanClass = "md:col-span-1 md:row-span-1"; // Top Middle
            else if (i === 2) spanClass = "md:col-span-1 md:row-span-2"; // Right Tall
            else if (i === 3) spanClass = "md:col-span-1 md:row-span-1"; // Bottom Middle

            return (
              <div
                key={i}
                className={`group relative rounded-3xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition-all duration-500 ${spanClass}`}
              >
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest text-amber-500 uppercase bg-black/50 backdrop-blur-md rounded-full border border-gray-700">
                    {event.type}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2 font-serif">{event.title}</h3>
                  <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                    {event.description || "Experience the magic of seamless event planning with our verified artists and venues."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/events" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors font-medium text-lg group">
            View Full Gallery
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative py-24 mx-4 md:mx-8 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-serif tracking-tight">
            Trusted by <span className="text-amber-500 italic">Our Community</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 mb-16 text-lg">
            Hear from the happy couples, event planners, and corporate clients who made their events unforgettable with ManoIndia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Finding the perfect Ghazal singer for my father's retirement was a nightmare until I found ManoIndia. The booking was smooth, and the performance was magical!",
                name: "Anjali Sharma",
                role: "Private Event",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
              },
              {
                text: "We booked a premium venue for our startup launch through ManoIndia. Transparent pricing and zero hidden costs. Highly recommended for corporate bookings.",
                name: "Rahul Verma",
                role: "CEO, TechStart",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
              },
              {
                text: "ManoIndia made our wedding reception perfect. The DJ we booked was verified and absolutely professional. It took all the stress out of the planning!",
                name: "Priya & Amit",
                role: "Wedding Couple",
                img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150&h=150"
              }
            ].map((testi, i) => (
              <div key={i} className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-amber-500/30 transition-all hover:-translate-y-2 relative group">
                {/* Quote Icon */}
                <div className="absolute top-6 right-8 text-6xl text-gray-800 font-serif opacity-50 group-hover:text-amber-900/40 transition-colors">"</div>

                <div className="relative z-10 flex flex-col items-center">
                  <img
                    src={testi.img}
                    alt={testi.name}
                    className="w-20 h-20 rounded-full border-2 border-amber-500 p-1 object-cover mb-6 shadow-lg shadow-amber-900/20"
                  />
                  <div className="flex gap-1 mb-4 text-amber-500">
                    {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                  </div>

                  <p className="text-gray-300 italic mb-6 leading-relaxed">
                    "{testi.text}"
                  </p>

                  <h4 className="text-white font-bold text-lg">{testi.name}</h4>
                  <p className="text-amber-600 text-sm font-medium uppercase tracking-wide">{testi.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION (Accordion) */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "Is it free to sign up on ManoIndia?",
              a: "Yes! Signing up is completely free for Users, Artists, and Venue Owners."
            },
            {
              q: "How do I pay for a booking?",
              a: "We use secure payment gateways (Razorpay). You can pay via UPI, Credit/Debit Card, or Netbanking. Your money is held securely until the booking is confirmed."
            },
            {
              q: "What is the commission fee?",
              a: "For Users, the price you see is what you pay (plus taxes). For Artists and Venues, we charge a small 5% commission on successful bookings to maintain the platform."
            },
            {
              q: "Are the profiles verified?",
              a: "Yes. Every Artist and Venue on ManoIndia goes through a manual verification process by our admin team to ensure quality and safety."
            },
            {
              q: "Can I cancel a booking?",
              a: "Yes, cancellations are allowed based on the specific policy of the Artist or Venue. Please check the cancellation terms before booking. Refunds are processed according to our Refund Policy."
            },
            {
              q: "How do I list my services?",
              a: "Simply sign up as an 'Artist' or 'Venue Owner', complete your profile with photos and details, and submit for verification. Once approved, you can start receiving bookings."
            },
            {
              q: "Is my payment information safe?",
              a: "Absolutely. We use industry-standard encryption and trusted payment gateways (Razorpay) to ensure your financial data is never compromised."
            }
          ].map((faq, index) => {
            // Create a local state for this map? No, we need state at component level or use <details>
            // Using <details> is simplest and most accessible without adding state variables.
            return (
              <details key={index} className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-amber-500/50 open:bg-gray-800/50">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-lg font-bold text-amber-500 group-hover:text-amber-400">
                  <span>{faq.q}</span>
                  <span className="transform transition-transform group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-gray-800/50 pt-4">
                  {faq.a}
                </div>
              </details>
            );
          })}
        </div>
      </section>

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