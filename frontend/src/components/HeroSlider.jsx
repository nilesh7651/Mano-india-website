import { useEffect, useState } from "react";

const slides = [
  {
    title: "Wedding Celebrations",
    subtitle: "Book DJs, Bands & Venues for weddings",
    image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac",
  },
  {
    title: "Corporate Events",
    subtitle: "Professional artists & premium venues",
    image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a",
  },
  {
    title: "Private Parties",
    subtitle: "Make birthdays & parties unforgettable",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/20 border border-gray-800 group">
      
      {/* Slides with Cross-Fade Transition */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`
            absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out
            ${i === index ? "opacity-100" : "opacity-0"}
          `}
          style={{ backgroundImage: `url('${slide.image}')` }}
        >
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6 z-10">
        <div className="max-w-3xl transform transition-all duration-700 translate-y-0">
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
            {slides[index].title}
          </h3>
          
          <div className="inline-block">
            <p className="text-lg md:text-xl text-amber-400 font-medium px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-amber-500/30 shadow-lg">
              {slides[index].subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Dot Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300 border border-white/20
              ${i === index ? "bg-amber-500 w-8" : "bg-white/50 hover:bg-white"}
            `}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}