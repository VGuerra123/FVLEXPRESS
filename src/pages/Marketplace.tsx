import React, { useState, createContext } from "react";
import Header from "../components/marketplace/Header";
import SearchFilters, { FilterState } from "../components/marketplace/SearchFilters";
import ProductGrid from "../components/marketplace/ProductGrid";
import ProductDetail from "../components/marketplace/ProductDetail";
import Cart from "../components/marketplace/Cart";
import MobileBottomNav from "../components/MobileBottomNav";
import DailySpinWheel from "../components/marketplace/DailySpinWheel";
import CategoriesModal from "../components/marketplace/CategoriesModal";
import PrizeNotification from "../components/marketplace/PrizeNotification";
import { Product, CartItem } from "../types/marketplace";

// Contexto global para carrito
export const CartContext = createContext<{
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  getCartTotal: () => 0,
  getCartItemsCount: () => 0,
});

export type MarketplaceView = "home" | "product" | "cart";

export const Marketplace: React.FC = () => {
  const [currentView, setCurrentView] = useState<MarketplaceView>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [filters, setFilters] = useState<FilterState>({
    rating: 0,
    freeShipping: false,
    verifiedSeller: false,
    flashSale: false,
    inStock: false,
    brands: [],
    location: "",
  });

  // Extras (ruleta, categorías y premios)
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [wonPrize, setWonPrize] = useState<any>(null);
  const [showPrizeNotification, setShowPrizeNotification] = useState(false);

  // Funciones de carrito
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Handlers
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView("product");
  };

  const handlePrizeWon = (prize: any) => {
    setWonPrize(prize);
    setShowPrizeNotification(true);
    setShowSpinWheel(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentView("home");
  };

  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header fijo */}
        <Header
          currentView={currentView}
          setCurrentView={setCurrentView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartItemsCount={getCartItemsCount()}
        />

        {/* Contenido principal */}
        <main className="flex-1 pt-16">
          {currentView === "home" && (
            <div className="container-responsive py-8">
              <SearchFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
                filters={filters}
                setFilters={setFilters}
              />
              <ProductGrid
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                priceRange={priceRange}
                sortBy={sortBy}
                filters={filters}
                onProductSelect={handleProductSelect}
              />
            </div>
          )}

          {currentView === "product" && selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onBack={() => setCurrentView("home")}
            />
          )}

          {currentView === "cart" && (
            <Cart onBack={() => setCurrentView("home")} />
          )}
        </main>

        {/* Navegación inferior en mobile */}
        <MobileBottomNav
          currentView={currentView}
          setCurrentView={setCurrentView}
          cartItemsCount={getCartItemsCount()}
          onSpinWheelOpen={() => setShowSpinWheel(true)}
          onCategoriesOpen={() => setShowCategories(true)}
        />
      </div>

      {/* Modales y extras */}
      <DailySpinWheel
        isOpen={showSpinWheel}
        onClose={() => setShowSpinWheel(false)}
        onPrizeWon={handlePrizeWon}
      />

      <CategoriesModal
        isOpen={showCategories}
        onClose={() => setShowCategories(false)}
        onCategorySelect={handleCategorySelect}
      />

      <PrizeNotification
        prize={wonPrize}
        isVisible={showPrizeNotification}
        onClose={() => {
          setShowPrizeNotification(false);
          setWonPrize(null);
        }}
      />
    </CartContext.Provider>
  );
};
