import { useEffect, useState } from "react";

const slides = [
  {
    title: "Wedding Celebrations",
    subtitle: "Book DJs, Bands & Venues for weddings",
    bg: "bg-[url('https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac')]",
  },
  {
    title: "Corporate Events",
    subtitle: "Professional artists & premium venues",
    bg: "bg-[url('https://images.unsplash.com/photo-1515168833906-d2a3b82b302a')]",
  },
  {
    title: "Private Parties",
    subtitle: "Make birthdays & parties unforgettable",
    bg: "bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819')]",
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
    <div
      className={`h-80 md:h-[420px] rounded-2xl bg-cover bg-center transition-all duration-700 ${slides[index].bg}`}
    >
      <div className="h-full w-full bg-black/40 rounded-2xl flex items-center justify-center text-center px-6">
        <div className="text-white">
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">
            {slides[index].title}
          </h3>
          <p className="text-lg opacity-90">
            {slides[index].subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
