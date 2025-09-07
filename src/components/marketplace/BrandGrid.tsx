import React from "react";

export const BrandGrid: React.FC = () => {
  const brands = ["Nike", "Adidas", "Apple", "Sony", "Samsung", "Puma"];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8">👕 Explora por Marcas</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {brands.map((b) => (
            <div
              key={b}
              className="bg-white/70 backdrop-blur-md shadow rounded-lg p-4 text-center hover:shadow-lg transition"
            >
              <p className="font-semibold text-blue-700">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
