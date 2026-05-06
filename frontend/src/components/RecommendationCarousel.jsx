import { useRef } from "react";
import ArtistCard from "./ArtistCard";
import VenueCard from "./VenueCard";

export default function RecommendationCarousel({ title, items, type, subtitle }) {
  const scrollRef = useRef(null);

  if (!items || items.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="my-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">{title}</h2>
          {subtitle && <p className="text-gray-400 mt-1 text-sm">{subtitle}</p>}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-gray-700 bg-gray-900 text-white flex items-center justify-center hover:bg-amber-600 hover:border-amber-500 transition-colors"
          >
            &larr;
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-gray-700 bg-gray-900 text-white flex items-center justify-center hover:bg-amber-600 hover:border-amber-500 transition-colors"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <div key={item._id || index} className="min-w-[300px] w-[300px] md:min-w-[350px] md:w-[350px] snap-start shrink-0">
            {type === "artist" ? (
              <ArtistCard artist={item} />
            ) : (
              <VenueCard venue={item} />
            )}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
