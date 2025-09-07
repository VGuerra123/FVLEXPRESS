import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TechnologySection } from './components/TechnologySection';
import { ServicesSection } from './components/ServicesSection';
import { TrackingSection } from './components/TrackingSection';
import { ContactForm } from './components/ContactForm';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import type { CartItem } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleAddToCart = (item: Omit<CartItem, 'id'> & { id?: string }) => {
    const newItem: CartItem = {
      ...item,
      id: item.id || `${item.type}-${Date.now()}`,
    };

    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === newItem.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === newItem.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    // Aquí puedes integrar lógica de pago o abrir un modal
    console.log('Checkout iniciado');
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header con carrito */}
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TechnologySection />
        <TrackingSection />
        <ContactForm />
      </main>

      <Footer />

      {/* Carrito */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;
