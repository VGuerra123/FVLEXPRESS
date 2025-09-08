import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, User, Heart, Bell, Globe, ChevronDown, Zap, Gift, Sparkles, TrendingUp } from 'lucide-react';
import { MarketplaceView } from "../../pages/Marketplace";
import { mockCategories } from '../../data/mockProducts';

interface HeaderProps {
  currentView: MarketplaceView;
  setCurrentView: (view: MarketplaceView) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartItemsCount: number;
}

const searchSuggestions = [
  'smartphone', 'auriculares bluetooth', 'reloj inteligente', 'vestido verano',
  'zapatillas running', 'lámpara led', 'skincare', 'mochila laptop'
];

const trendingSearches = [
  'iPhone 15', 'AirPods Pro', 'Samsung Galaxy', 'Nike Air Max', 'MacBook Pro'
];

const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  searchQuery,
  setSearchQuery,
  cartItemsCount,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setShowSearchSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
  };

  return (
    <div className="glass-morphism border-b border-primary-200/30 sticky top-0 z-40">
      {/* Top Bar */}
      <div className="bg-gradient-primary text-white text-xs py-3 animate-gradient-x">
        <div className="container-responsive">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="animate-pulse-soft font-bold">🇨🇱 ¡ENVÍO GRATIS A TODO CHILE!</span>
              <span className="animate-bounce-gentle font-bold">🚚 ENTREGA 24-48HRS EN RM</span>
              <span className="animate-glow font-bold">⚡ CYBER CHILE HASTA 70% OFF</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-1 hover:text-white/80 transition-all duration-300 relative mobile-touch font-bold"
              >
                <Globe className="w-3 h-3" />
                <span>🇨🇱 CL</span>
                <ChevronDown className="w-3 h-3" />
                
                {showLanguageMenu && (
                  <div className="absolute top-full right-0 mt-2 glass-morphism text-white rounded-2xl py-2 min-w-[120px] animate-slide-down shadow-medium">
                    <button className="block w-full text-left px-4 py-2 hover:bg-white/10 transition-colors mobile-touch font-medium">🇨🇱 Chile</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-white/10 transition-colors mobile-touch font-medium">🇦🇷 Argentina</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-white/10 transition-colors mobile-touch font-medium">🇵🇪 Perú</button>
                  </div>
                )}
              </button>
              <span className="animate-pulse-soft font-bold">💰 CLP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setCurrentView('home')}
              className="text-3xl font-bold text-gradient hover:scale-110 transition-all duration-500 mobile-touch animate-glow"
            >
              FVLExpress
            </button>
            
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('home')}
                className={`text-sm font-bold transition-all duration-300 ${
                  currentView === 'home'
                    ? 'text-primary-800 border-b-2 border-primary-600 pb-1'
                    : 'text-primary-700 hover:text-primary-800 hover:scale-105'
                }`}
              >
                Inicio
              </button>
              <div className="relative group">
                <button 
                  onMouseEnter={() => setShowCategoriesMenu(true)}
                  onMouseLeave={() => setShowCategoriesMenu(false)}
                  className="text-sm font-bold text-primary-700 hover:text-primary-800 transition-all duration-300 hover:scale-105 flex items-center gap-1 mobile-touch"
                >
                  Categorías
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {showCategoriesMenu && (
                  <div 
                    onMouseEnter={() => setShowCategoriesMenu(true)}
                    onMouseLeave={() => setShowCategoriesMenu(false)}
                    className="absolute top-full left-0 mt-2 w-80 card-glass rounded-3xl z-50 animate-slide-down shadow-strong"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gradient mb-4">🛍️ TODAS LAS CATEGORÍAS</h3>
                      <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                        {mockCategories.slice(1).map((category) => (
                          <button
                            key={category.id}
                            className="flex items-center gap-2 text-left px-3 py-2 hover:bg-primary-50 hover:text-primary-800 rounded-2xl transition-all duration-300 hover:scale-105 group mobile-touch text-primary-700 font-medium"
                          >
                            <span className="text-xl group-hover:animate-bounce-gentle">{category.emoji}</span>
                            <div className="flex-1">
                              <div className="text-sm font-bold">{category.name}</div>
                              <div className="text-xs text-primary-600">({category.count})</div>
                            </div>
                            {category.hot && (
                              <span className="badge-hot">HOT</span>
                            )}
                            {category.trending && (
                              <span className="badge-trending">
                                <TrendingUp className="w-3 h-3" />
                              </span>
                            )}
                            {category.new && (
                              <span className="badge-new">NEW</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button className="text-sm font-bold text-primary-700 hover:text-orange-500 transition-all duration-300 hover:scale-105 flex items-center gap-1 animate-pulse-soft mobile-touch">
                <Zap className="w-4 h-4" />
                🔥 CYBER CHILE
              </button>
              <button className="text-sm font-bold text-primary-700 hover:text-red-500 transition-all duration-300 hover:scale-105 flex items-center gap-1 animate-bounce-gentle mobile-touch">
                <Sparkles className="w-4 h-4" />
                ⚡ OFERTAS RELÁMPAGO
              </button>
              <button className="text-sm font-bold text-primary-700 hover:text-green-500 transition-all duration-300 hover:scale-105 flex items-center gap-1 mobile-touch">
                <Gift className="w-4 h-4" />
                💰 TODO A $990
              </button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-500 w-5 h-5" />
              <input
                type="text"
                placeholder="🔍 BUSCA EN CHILE: iPhone, Samsung, Nike... ¡MILES DE OFERTAS!"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className="search-input mobile-optimized"
              />
              
              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 card-glass rounded-2xl z-50 animate-slide-down shadow-strong">
                  <div className="p-4">
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-gradient mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        🔥 Lo más buscado en Chile
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {searchSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-2 bg-primary-100 hover:bg-primary-200 hover:text-primary-800 rounded-full text-xs transition-all duration-300 hover:scale-105 mobile-touch text-primary-700 font-medium"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gradient mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        🇨🇱 TRENDING CHILE 🔥
                      </h4>
                      <div className="space-y-1">
                        {trendingSearches.map((trend, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(trend)}
                            className="block w-full text-left px-3 py-2 hover:bg-primary-50 rounded-2xl text-sm text-primary-700 hover:text-primary-800 transition-all duration-300 hover:scale-105 mobile-touch font-medium"
                          >
                            🔥 {trend}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile search */}
            <button className="md:hidden p-2 text-primary-600 hover:text-primary-800 transition-all duration-300 hover:scale-105 mobile-touch">
              <Search className="w-6 h-6" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-primary-600 hover:text-primary-800 transition-all duration-300 hover:scale-105 relative mobile-touch"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse-soft shadow-medium">
                  3
                </span>
              </button>
              
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-80 card-glass rounded-3xl z-50 animate-slide-down shadow-strong">
                  <div className="p-4 border-b border-primary-200">
                    <h3 className="font-bold text-gradient flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      NOTIFICACIONES
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-4 hover:bg-primary-50 border-b border-primary-100 transition-all duration-300 mobile-touch">
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-primary-600 rounded-full mt-2 animate-pulse-soft"></div>
                        <div>
                          <p className="text-sm text-primary-800 font-medium">Tu pedido ha sido enviado</p>
                          <p className="text-xs text-primary-600 mt-1">Hace 2 horas</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-primary-50 border-b border-primary-100 transition-all duration-300 mobile-touch">
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2 animate-pulse-soft"></div>
                        <div>
                          <p className="text-sm text-primary-800 font-medium">Oferta especial: 50% OFF en electrónicos</p>
                          <p className="text-xs text-primary-600 mt-1">Hace 1 día</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-primary-200">
                    <button className="text-sm text-primary-600 hover:text-primary-800 transition-colors mobile-touch font-bold">Ver todas</button>
                  </div>
                </div>
              )}
            </div>

            {/* Favorites */}
            <button className="p-2 text-primary-600 hover:text-red-500 transition-all duration-300 hover:scale-105 relative group mobile-touch">
              <Heart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce-gentle shadow-medium">
                5
              </span>
            </button>

            {/* Cart */}
            <button
              onClick={() => setCurrentView('cart')}
              className="relative p-2 text-primary-600 hover:text-primary-800 transition-all duration-300 hover:scale-105 group mobile-touch"
            >
              <ShoppingCart className="w-6 h-6 group-hover:animate-bounce-gentle" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse-soft shadow-glow">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User account */}
            <div className="relative group">
              <button className="p-2 text-primary-600 hover:text-primary-800 transition-all duration-300 hover:scale-105 mobile-touch">
                <User className="w-6 h-6" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 card-glass rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-strong">
                <div className="p-2">
                  <button className="block w-full text-left px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 hover:text-primary-800 rounded-2xl transition-all duration-300 mobile-touch font-medium">Mi cuenta</button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 hover:text-primary-800 rounded-2xl transition-all duration-300 mobile-touch font-medium">Mis pedidos</button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 hover:text-primary-800 rounded-2xl transition-all duration-300 mobile-touch font-medium">Lista de deseos</button>
                  <hr className="my-2 border-primary-200" />
                  <button className="block w-full text-left px-4 py-2 text-sm text-primary-700 hover:bg-primary-50 hover:text-primary-800 rounded-2xl transition-all duration-300 mobile-touch font-medium">Cerrar sesión</button>
                </div>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-primary-600 hover:text-primary-800 transition-all duration-300 hover:scale-105 mobile-touch"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden py-3 border-t border-primary-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-500 w-5 h-5" />
            <input
              type="text"
              placeholder="🔍 BUSCAR EN CHILE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input mobile-optimized"
            />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-morphism border-t border-primary-200 animate-slide-down">
            <div className="py-4 space-y-2">
              <button
                onClick={() => {
                  setCurrentView('home');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-primary-700 hover:bg-primary-50 hover:text-primary-800 transition-all duration-300 mobile-touch font-medium"
              >
                🏠 Inicio
              </button>
              <button className="block w-full text-left px-4 py-3 text-primary-700 hover:bg-primary-50 hover:text-primary-800 transition-all duration-300 mobile-touch font-medium">
                📱 Categorías
              </button>
              <button className="block w-full text-left px-4 py-3 text-primary-700 hover:bg-primary-50 hover:text-primary-800 transition-all duration-300 mobile-touch font-medium">
                🔥 CYBER CHILE
              </button>
              <button
                onClick={() => {
                  setCurrentView('cart');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-primary-700 hover:bg-primary-50 hover:text-primary-800 transition-all duration-300 mobile-touch font-medium"
              >
                🛒 Carrito ({cartItemsCount})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;