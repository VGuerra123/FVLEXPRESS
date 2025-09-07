import React from "react";
import { Star } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import type { CartItem } from "../../types";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    const item: CartItem = {
      id: product.id.toString(),
      type: "product",
      name: product.name,
      price: product.price,
      quantity: 1,
    };
    addToCart(item);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg hover:shadow-2xl p-4 transition overflow-hidden"
    >
      {/* Imagen con hover zoom */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 hover:opacity-100 transition flex items-center justify-center">
          <span className="text-white font-semibold text-sm bg-blue-600/80 px-3 py-1 rounded-lg shadow">
            Ver Detalle
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="mt-4 space-y-2 text-center">
        <h3 className="font-bold text-blue-900 line-clamp-1">{product.name}</h3>
        <p className="text-2xl font-extrabold text-blue-700">
          ${product.price.toLocaleString()} CLP
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center text-yellow-500 gap-1">
          <Star className="w-4 h-4 fill-current" /> 
          <span className="text-sm font-semibold">{product.rating}</span>
        </div>

        {/* Botón */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleAdd}
          className="relative mt-4 w-full py-2.5 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-lg font-bold shadow-md hover:shadow-xl hover:brightness-110 transition overflow-hidden"
        >
          <span className="relative z-10">Agregar al Carrito</span>
          <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition rounded-lg"></span>
        </motion.button>
      </div>
    </motion.div>
  );
};
