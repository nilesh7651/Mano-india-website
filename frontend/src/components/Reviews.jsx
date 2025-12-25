export default function Reviews({ reviews = [] }) {
  if (!reviews.length) {
    return (
      <div className="text-center py-8 bg-gray-900 rounded-xl border border-gray-800 border-dashed">
        <p className="text-gray-500 italic">
          No reviews yet. Be the first to share your experience.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        Client Reviews <span className="text-amber-500 text-sm font-normal">({reviews.length})</span>
      </h3>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-sm hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* User Avatar Placeholder */}
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-amber-500 font-bold text-xs">
                  {(r.user?.name || r.user || "A").charAt(0).toUpperCase()}
                </div>
                <p className="font-semibold text-white">
                  {r.user?.name || r.user || "Anonymous"}
                </p>
              </div>

              <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-lg border border-gray-800">
                <span className="text-amber-500 text-sm">⭐</span>
                <span className="text-sm font-bold text-amber-500">{r.rating}</span>
                <span className="text-xs text-gray-500">/5</span>
              </div>
            </div>

            {r.comment && (
              <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-gray-800 pl-3">
                "{r.comment}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}