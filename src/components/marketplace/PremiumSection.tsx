import React from "react";
import { useProducts } from "../../hooks/useProducts";

export const PremiumSection: React.FC = () => {
  const { filterByTag } = useProducts();
  const premium = filterByTag("premium");

  return (
    <section className="py-16 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8">
          ⭐ Premium Destacados
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {premium.map((p) => (
            <div
              key={p.id}
              className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition"
            >
              <img src={p.image} alt={p.name} className="mx-auto mb-4 rounded-lg" />
              <h3 className="font-bold text-blue-900">{p.name}</h3>
              <p className="text-blue-700 font-semibold">${p.price.toLocaleString()} CLP</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
