// src/components/marketplace/HeroBanner.tsx
import React from "react";
import { Search, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "../../store/cartStore";

interface HeroBannerProps {
  onCartClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onCartClick }) => {
  const { items } = useCartStore();

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-shrink-0"
        >
          <img
            src="/avatar.png"
            alt="FVLExpress Avatar"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-2xl border-4 border-white/40 bg-white/10 backdrop-blur-md"
          />
        </motion.div>

        {/* Texto + Buscador */}
        <div className="flex-1 space-y-6 text-center lg:text-left relative">
          {/* Carrito arriba a la derecha */}
          <button
            onClick={onCartClick}
            className="absolute top-0 right-0 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition relative"
          >
            <ShoppingBag className="w-6 h-6 text-white" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {items.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            )}
          </button>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Marketplace{" "}
            <span className="bg-gradient-to-r from-sky-300 via-white to-sky-400 bg-clip-text text-transparent">
              FVLExpress
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto lg:mx-0"
          >
            Encuentra lo que necesitas al mejor precio, con la velocidad y
            confianza de <span className="font-semibold">FVLExpress</span>.
          </motion.p>

          {/* Buscador Glassmorphism */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative max-w-xl mx-auto lg:mx-0"
          >
            <input
              type="text"
              placeholder="Buscar productos, categorías, ofertas..."
              className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-blue-100 focus:ring-4 focus:ring-sky-400/50 focus:outline-none"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white p-3 rounded-full shadow-lg transition">
              <Search className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
