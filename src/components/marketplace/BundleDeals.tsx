import React from "react";

export const BundleDeals: React.FC = () => {
  const bundles = [
    { id: 1, name: "Pack Escolar", price: 19990 },
    { id: 2, name: "Pack Fitness", price: 49990 },
    { id: 3, name: "Pack Gamer", price: 79990 }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8">🛒 Compra en Packs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bundles.map((b) => (
            <div
              key={b.id}
              className="bg-white/70 rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-blue-900 mb-3">{b.name}</h3>
              <p className="text-gray-600">Incluye 3 productos con descuento</p>
              <p className="text-blue-600 font-bold mt-2">${b.price.toLocaleString()} CLP</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
