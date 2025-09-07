import React from "react";
import { ProfileSection } from "../components/marketplace/ProfileSection";
import { HeaderNav } from "../components/marketplace/HeaderNav";
import { BottomNav } from "../components/marketplace/BottomNav";
import { CartNew } from "../components/marketplace/CartNew";
import { useCartStore } from "../store/cartStore";

export const ProfilePage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const { items } = useCartStore();

  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-white min-h-screen relative pb-20 lg:pb-0">
      {/* Nav superior en desktop */}
      <HeaderNav onCartClick={() => setIsCartOpen(true)} />

      {/* Perfil */}
      <ProfileSection />

      {/* Carrito lateral */}
      <CartNew
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => console.log("Checkout con:", items)}
      />

      {/* Barra inferior solo mobile */}
      <BottomNav onCartClick={() => setIsCartOpen(true)} />
    </div>
  );
};
