export default function Reviews({ reviews = [] }) {
  if (!reviews.length) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-500">
          No reviews yet. Be the first to review.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Reviews ({reviews.length})
      </h3>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900">
                {r.user?.name || r.user || "Anonymous"}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-medium text-gray-700">{r.rating}/5</span>
              </div>
            </div>

            {r.comment && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {r.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
