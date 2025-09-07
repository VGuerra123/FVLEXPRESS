import React from "react";
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";

const mockProducts = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  price: Math.floor(Math.random() * 200000) + 5000,
  image: "https://via.placeholder.com/400x300",
  rating: Math.floor(Math.random() * 2) + 4,
}));

export const ProductGrid: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1"
    >
      {mockProducts.map((p) => (
        <motion.div
          key={p.id}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <ProductCard product={p} />
        </motion.div>
      ))}
    </motion.div>
  );
};
