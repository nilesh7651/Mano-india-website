import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const events = [
  {
    title: "Royal Wedding",
    desc: "A fairytale wedding with live classical music & premium floral decor.",
    images: [
      "https://images.unsplash.com/photo-1519225468063-5078e2e1e975?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80",
    ],
    type: "Wedding",
  },
  {
    title: "Luxury Concert",
    desc: "An electrifying night with top-tier sound systems and artists.",
    images: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80",
    ],
    type: "Concert",
  },
  {
    title: "Corporate Gala",
    desc: "Professional networking event with elegant dining and ambience.",
    images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80",
    ],
    type: "Corporate",
  },
  {
    title: "Private Birthday",
    desc: "Intimate celebration with DJ, catering, and custom themes.",
    images: [
      "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464349686614-2c5af756976c?auto=format&fit=crop&q=80",
    ],
    type: "Party",
  },
  {
    title: "College Fest",
    desc: "High-energy festival with bands, dance offs, and huge crowds.",
    images: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1514525253440-b393452e2729?auto=format&fit=crop&q=80",
    ],
    type: "Fest",
  },
  {
    title: "Award Night",
    desc: "Glitz and glamour with red carpet moments and grand stages.",
    images: [
      "https://images.unsplash.com/photo-1475721027760-f756dcb6e4c7?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560523160-754a9e25c68f?auto=format&fit=crop&q=80",
    ],
    type: "Ceremony",
  },
];

function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <img
      src={images[index]}
      alt="Event"
      className="
        w-full h-full object-cover
        transition-transform duration-1000 ease-in-out
        group-hover:scale-110
      "
    />
  );
}

export default function Events() {
  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 py-16">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-amber-500">Events</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore premium experiences curated by ManoIndia — from royal weddings
            to high-voltage concerts.
          </p>
        </div>

        {/* EVENTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <div
              key={i}
              className="
                group relative overflow-hidden rounded-3xl
                bg-gray-900 border border-gray-800
                hover:shadow-2xl hover:shadow-amber-900/20 hover:border-amber-500/30
                transition-all duration-500
              "
            >
              {/* SLIDESHOW */}
              <div className="relative h-64 overflow-hidden">
                <ImageSlider images={event.images} />

                {/* GRADIENT OVERLAY */}
                <div className="
                  absolute inset-0
                  bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent
                " />

                {/* BADGE */}
                <span className="
                  absolute top-4 left-4
                  bg-amber-600/90 backdrop-blur text-white text-xs font-bold uppercase tracking-wider
                  px-3 py-1 rounded-md
                  shadow-lg
                ">
                  {event.type}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6 relative">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  {event.desc}
                </p>

                <Link
                  to="/artists"
                  className="
                    inline-flex items-center gap-2 text-sm font-semibold text-amber-500
                    hover:text-amber-400 transition tracking-wide
                  "
                >
                  Explore Artists <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <Link
            to="/artists"
            className="
              inline-block px-10 py-4 rounded-lg
              bg-amber-600 text-white font-bold text-lg
              hover:bg-amber-500 transition-all transform hover:-translate-y-1
              shadow-lg shadow-amber-900/40
            "
          >
            Book Your Event Now
          </Link>
        </div>

      </div>
    </div>
  );
}