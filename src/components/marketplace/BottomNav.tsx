// src/components/marketplace/BottomNav.tsx
import React from "react";
import { Home, Grid, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";

interface BottomNavProps {
  onCartClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onCartClick }) => {
  const { items } = useCartStore();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg lg:hidden z-50">
      <div className="flex justify-around items-center py-2">
        {/* Inicio */}
        <Link
          to="/"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition"
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Inicio</span>
        </Link>

        {/* Categorías */}
        <Link
          to="/categories"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition"
        >
          <Grid className="w-6 h-6" />
          <span className="text-xs">Categorías</span>
        </Link>

        {/* Carrito */}
        <button
          onClick={onCartClick}
          className="relative flex flex-col items-center text-gray-600 hover:text-blue-600 transition"
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xs">Carrito</span>
          {items.length > 0 && (
            <span className="absolute -top-1 right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {items.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          )}
        </button>

        {/* Perfil */}
        <Link
          to="/profile"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition"
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Perfil</span>
        </Link>
      </div>
    </nav>
  );
};
