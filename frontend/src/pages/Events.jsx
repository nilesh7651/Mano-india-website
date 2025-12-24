import { Link } from "react-router-dom";

const events = [
  {
    title: "Wedding Celebration",
    desc: "A beautiful wedding event with live artists & premium venue.",
    img: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac",
    type: "Wedding",
  },
  {
    title: "Live Concert Night",
    desc: "An electrifying concert with top performers.",
    img: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
    type: "Concert",
  },
  {
    title: "Corporate Meetup",
    desc: "Professional corporate gathering with premium arrangements.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    type: "Corporate",
  },
  {
    title: "Birthday Party",
    desc: "A fun-filled birthday celebration with DJs & decorators.",
    img: "https://images.unsplash.com/photo-1515169067865-5387ec356754",
    type: "Birthday",
  },
  {
    title: "DJ Night",
    desc: "High-energy DJ night with lighting & sound setup.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    type: "Party",
  },
  {
    title: "College Fest",
    desc: "A large-scale college fest with multiple artists.",
    img: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
    type: "Festival",
  },
];

export default function Events() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Events
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore past and upcoming events hosted with ManoIndia —
            weddings, concerts, corporate events & more.
          </p>
        </div>

        {/* EVENTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <div
              key={i}
              className="
                group relative overflow-hidden rounded-3xl
                bg-white shadow-lg hover:shadow-2xl
                transition-all duration-500
              "
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.img}
                  alt={event.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-700
                    group-hover:scale-110
                  "
                />

                {/* GRADIENT OVERLAY */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-black/70 via-black/30 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                  "
                />

                {/* EVENT TYPE BADGE */}
                <span
                  className="
                    absolute top-4 left-4
                    bg-red-600 text-white text-xs font-semibold
                    px-3 py-1 rounded-full
                    shadow
                  "
                >
                  {event.type}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {event.desc}
                </p>

                <Link
                  to="/artists"
                  className="
                    inline-block text-red-600 font-medium
                    hover:underline
                  "
                >
                  Explore Artists →
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
              inline-block px-10 py-4 rounded-full
              bg-black text-white font-semibold
              hover:bg-gray-900 transition
              shadow-lg
            "
          >
            Book Your Event Now
          </Link>
        </div>
      </div>
    </div>
  );
}
