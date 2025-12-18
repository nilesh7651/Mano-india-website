export default function Card({ title, subtitle, price, children }) {
  return (
    <div className="bg-[#161616] border border-primary/20 rounded-xl p-6 hover:border-primary transition">
      <h3 className="text-lg font-semibold text-primary mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted mb-2">
        {subtitle}
      </p>
      <p className="font-bold mb-4">
        ₹{price}
      </p>
      {children}
    </div>
  );
}
