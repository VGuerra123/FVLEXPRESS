// src/components/CategoryGrid.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { id: "electronics", name: "Electrónica", image: "https://via.placeholder.com/300x200" },
  { id: "fashion", name: "Moda", image: "https://via.placeholder.com/300x200" },
  { id: "home", name: "Hogar", image: "https://via.placeholder.com/300x200" },
  { id: "toys", name: "Juguetes", image: "https://via.placeholder.com/300x200" },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-white via-blue-50 to-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-8 text-center md:text-left">
          Explora por Categorías
        </h2>

        {/* Grid Desktop / Swipe Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible snap-x md:snap-none">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="snap-start"
            >
              <Link
                to={`/marketplace/${cat.id}`}
                className="group relative block rounded-2xl overflow-hidden shadow-lg bg-white/30 backdrop-blur-md border border-white/40 hover:shadow-2xl transition"
              >
                {/* Imagen con zoom hover */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-800/30 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                {/* Nombre */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                  <span className="px-4 py-2 rounded-full text-white font-bold bg-blue-600/80 shadow-lg backdrop-blur-md">
                    {cat.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
