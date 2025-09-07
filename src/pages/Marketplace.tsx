// src/pages/Marketplace.tsx
import React, { useState } from "react";
import { HeroBanner } from "../components/marketplace/HeroBanner";
import { DealsCarousel } from "../components/marketplace/DealsCarousel";
import { CategoryGrid } from "../components/marketplace/CategoryGrid";
import { FilterSidebar } from "../components/marketplace/FilterSidebar";
import { ProductGrid } from "../components/marketplace/ProductGrid";
import { CartNew } from "../components/marketplace/CartNew";
import { BottomNav } from "../components/marketplace/BottomNav";
import { useCartStore } from "../store/cartStore";

// Secciones extra
import { PremiumSection } from "../components/marketplace/PremiumSection";
import { NewArrivals } from "../components/marketplace/NewArrivals";
import { FlashSales } from "../components/marketplace/FlashSales";
import { Recommended } from "../components/marketplace/Recommended";
import { TopSellers } from "../components/marketplace/TopSellers";
import { BrandGrid } from "../components/marketplace/BrandGrid";
import { GlobalTrends } from "../components/marketplace/GlobalTrends";
import { BundleDeals } from "../components/marketplace/BundleDeals";
import { KidsSpecial } from "../components/marketplace/KidsSpecial";
import { Promotions } from "../components/marketplace/Promotions";

export const Marketplace: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();

  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-white min-h-screen relative pb-20 lg:pb-0">

      {/* Hero */}
      <HeroBanner onCartClick={() => setIsCartOpen(true)} />

      {/* Ofertas */}
      <DealsCarousel />

      {/* Categorías */}
      <CategoryGrid />

      {/* Nuevas secciones */}
      <PremiumSection />
      <NewArrivals />
      <FlashSales />
      <Recommended />
      <TopSellers />
      <BrandGrid />
      <GlobalTrends />
      <BundleDeals />
      <KidsSpecial />
      <Promotions />

      {/* Filtros + Productos */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <FilterSidebar />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </section>

      {/* Carrito lateral */}
      <CartNew
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => console.log("Checkout con:", items)}
      />

      {/* Barra inferior solo en mobile */}
      <BottomNav onCartClick={() => setIsCartOpen(true)} />
    </div>
  );
};
