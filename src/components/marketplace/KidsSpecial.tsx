import React from "react";
import { useProducts } from "../../hooks/useProducts";

export const KidsSpecial: React.FC = () => {
  const { filterByCategory } = useProducts();
  const kids = filterByCategory("kids");

  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8">🧸 Especial Niños</h2>
        <div className="flex gap-6 overflow-x-auto snap-x">
          {kids.map((p) => (
            <div
              key={p.id}
              className="snap-start min-w-[180px] bg-white/70 shadow-md rounded-xl p-4 hover:shadow-xl transition"
            >
              <img src={p.image} alt={p.name} className="mb-3 rounded-lg" />
              <p className="font-medium text-blue-800">{p.name}</p>
              <p className="text-blue-600 font-bold">${p.price.toLocaleString()} CLP</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
