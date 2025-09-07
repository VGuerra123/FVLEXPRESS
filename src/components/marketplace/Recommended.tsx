import React from "react";
import { useProducts } from "../../hooks/useProducts";

export const Recommended: React.FC = () => {
  const { filterByTag } = useProducts();
  const recs = filterByTag("recommended");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8">🎁 Recomendados para Ti</h2>
        <div className="flex gap-6 overflow-x-auto snap-x">
          {recs.map((p) => (
            <div
              key={p.id}
              className="snap-start min-w-[180px] bg-white/60 backdrop-blur-md rounded-xl shadow p-4 text-center hover:shadow-lg transition"
            >
              <img src={p.image} alt={p.name} className="rounded-lg mb-2" />
              <p className="font-medium text-blue-800">{p.name}</p>
              <p className="text-blue-600 font-bold">${p.price.toLocaleString()} CLP</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
