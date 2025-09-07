import React from "react";
import { useProducts } from "../../hooks/useProducts";

export const FlashSales: React.FC = () => {
  const { filterByTag } = useProducts();
  const flash = filterByTag("flash");

  return (
    <section className="py-16 bg-gradient-to-r from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-red-600 mb-8">
          ⚡ Ofertas Relámpago
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {flash.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md p-4 text-center hover:scale-105 transition"
            >
              <img src={p.image} alt={p.name} className="rounded-lg mb-3" />
              <h3 className="font-semibold text-blue-900">{p.name}</h3>
              <p className="text-red-500 font-bold">Oferta especial</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
