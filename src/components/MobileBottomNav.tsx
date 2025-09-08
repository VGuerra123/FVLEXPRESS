import React from 'react';
import { Home, Search, ShoppingCart, User, Heart, Gift, Zap, Grid3X3 } from 'lucide-react';
import { MarketplaceView } from './FVLExpressMarketplace';

interface MobileBottomNavProps {
  currentView: MarketplaceView;
  setCurrentView: (view: MarketplaceView) => void;
  cartItemsCount: number;
  onSpinWheelOpen: () => void;
  onCategoriesOpen: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  setCurrentView,
  cartItemsCount,
  onSpinWheelOpen,
  onCategoriesOpen,
}) => {
  const navItems = [
    {
      id: 'home',
      icon: Home,
      label: 'Inicio',
      action: () => setCurrentView('home'),
      active: currentView === 'home',
    },
    {
      id: 'categories',
      icon: Grid3X3,
      label: 'Categorías',
      action: onCategoriesOpen,
      active: false,
    },
    {
      id: 'spin',
      icon: Gift,
      label: 'Ruleta',
      action: onSpinWheelOpen,
      active: false,
      special: true,
    },
    {
      id: 'cart',
      icon: ShoppingCart,
      label: 'Carrito',
      action: () => setCurrentView('cart'),
      active: currentView === 'cart',
      badge: cartItemsCount,
    },
    {
      id: 'profile',
      icon: User,
      label: 'Perfil',
      action: () => {},
      active: false,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 pb-safe z-40">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 min-w-[60px] ${
                item.special
                  ? 'bg-gradient-to-r from-primary-500 to-accent-400 text-white shadow-lg transform hover:scale-110 animate-pulse-slow'
                  : item.active
                  ? 'bg-primary-50 text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.special ? 'animate-bounce-slow' : ''}`} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
                {item.special && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                )}
              </div>
              <span className={`text-xs font-medium mt-1 ${
                item.special ? 'text-white' : item.active ? 'text-primary-600' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
              {item.special && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-400 rounded-xl opacity-20 animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;