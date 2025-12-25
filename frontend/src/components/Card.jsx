export default function Card({ title, subtitle, price, children }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-900/10">
      <h3 className="text-xl font-semibold text-white mb-1 tracking-wide">
        {title}
      </h3>
      <p className="text-sm text-gray-400 mb-3 font-medium">
        {subtitle}
      </p>
      <p className="font-bold text-2xl text-amber-500 mb-6">
        ₹{price?.toLocaleString()}
      </p>
      <div className="mt-auto">
        {children}
      </div>
    </div>
  );
}