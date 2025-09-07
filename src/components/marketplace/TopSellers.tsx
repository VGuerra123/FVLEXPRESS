import React from "react";
import { useProducts } from "../../hooks/useProducts";

export const TopSellers: React.FC = () => {
  const { filterByTag } = useProducts();
  const tops = filterByTag("bestseller");

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8">🏆 Top Ventas</h2>
        <ol className="space-y-4">
          {tops.map((p, idx) => (
            <li
              key={p.id}
              className="flex items-center gap-4 bg-white/70 rounded-xl p-4 shadow-md hover:shadow-xl transition"
            >
              <span className="font-bold text-blue-600 text-xl">{idx + 1}.</span>
              <p className="font-medium text-blue-900">{p.name}</p>
              <span className="ml-auto font-bold text-blue-700">
                ${p.price.toLocaleString()} CLP
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
