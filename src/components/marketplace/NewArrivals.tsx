import React from "react";
import { useProducts } from "../../hooks/useProducts";

export const NewArrivals: React.FC = () => {
  const { filterByTag } = useProducts();
  const news = filterByTag("new");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8">🆕 Novedades</h2>
        <div className="flex gap-6 overflow-x-auto snap-x">
          {news.map((p) => (
            <div
              key={p.id}
              className="snap-start min-w-[200px] bg-white/70 backdrop-blur-md shadow-md rounded-xl p-4 hover:shadow-xl transition"
            >
              <img src={p.image} alt={p.name} className="rounded-lg mb-3" />
              <p className="font-semibold text-blue-800">{p.name}</p>
              <p className="text-blue-600 font-bold">${p.price.toLocaleString()} CLP</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
