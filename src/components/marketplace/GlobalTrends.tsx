import React from "react";

export const GlobalTrends: React.FC = () => {
  const trends = ["Electrónica", "Moda", "Fitness", "Gaming"];

  return (
    <section className="py-16 bg-gradient-to-r from-sky-100 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8">🌍 Tendencias Globales</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trends.map((t, i) => (
            <div
              key={i}
              className="bg-white/80 rounded-xl p-6 shadow-md hover:shadow-xl transition text-center"
            >
              <h3 className="font-bold text-blue-900">{t}</h3>
              <p className="text-gray-500 text-sm mt-2">Lo más buscado este mes</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
