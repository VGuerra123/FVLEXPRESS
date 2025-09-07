// src/components/FilterSidebar.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export const FilterSidebar: React.FC = () => {
  const [price, setPrice] = useState([0, 1000000]);
  const [rating, setRating] = useState<number | null>(null);
  const [freeShipping, setFreeShipping] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6 space-y-6 w-72"
    >
      <h3 className="text-2xl font-bold text-blue-900">Filtros</h3>

      {/* Precio */}
      <div>
        <label className="font-semibold text-blue-800">Precio</label>
        <input
          type="range"
          min="0"
          max="1000000"
          step="10000"
          value={price[1]}
          onChange={(e) => setPrice([0, parseInt(e.target.value)])}
          className="w-full accent-sky-500 mt-3"
        />
        <p className="text-sm text-blue-700 mt-1">
          Hasta <span className="font-bold">${price[1].toLocaleString()} CLP</span>
        </p>
      </div>

      {/* Rating */}
      <div>
        <label className="font-semibold text-blue-800">Calificación</label>
        <div className="flex gap-2 mt-3">
          {[5, 4, 3].map((stars) => (
            <button
              key={stars}
              onClick={() => setRating(stars)}
              className={`px-3 py-1 rounded-full border font-semibold transition ${
                rating === stars
                  ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md"
                  : "bg-white/50 text-blue-800 border-blue-300 hover:bg-blue-100"
              }`}
            >
              {stars} ★ o más
            </button>
          ))}
        </div>
      </div>

      {/* Envío */}
      <div>
        <label className="font-semibold text-blue-800">Envío</label>
        <div className="flex flex-col gap-3 mt-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={freeShipping}
              onChange={(e) => setFreeShipping(e.target.checked)}
              className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
            />
            <span className="text-blue-700">Envío Gratis</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={fastDelivery}
              onChange={(e) => setFastDelivery(e.target.checked)}
              className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
            />
            <span className="text-blue-700">Entrega en 24h</span>
          </label>
        </div>
      </div>

      {/* Botón Reset */}
      <div className="pt-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setPrice([0, 1000000]);
            setRating(null);
            setFreeShipping(false);
            setFastDelivery(false);
          }}
          className="w-full py-2 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-lg hover:brightness-110 transition"
        >
          Resetear Filtros
        </motion.button>
      </div>
    </motion.aside>
  );
};
