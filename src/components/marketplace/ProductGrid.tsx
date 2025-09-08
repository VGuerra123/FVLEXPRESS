import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { mockProducts } from '../../data/mockProducts';
import { Product } from '../../types/marketplace';
import { FilterState } from './SearchFilters';
import { Eye, TrendingUp, Zap, Gift, Clock, Star, Sparkles, ShoppingBag, Heart, Crown } from 'lucide-react';

interface ProductGridProps {
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  sortBy: string;
  filters: FilterState;
  onProductSelect: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  searchQuery,
  selectedCategory,
  priceRange,
  sortBy,
  filters,
  onProductSelect,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const productsPerPage = 12;

  // Filter and sort products
  const filteredProducts = mockProducts
    .filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.brand?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // Free shipping filter
      if (filters.freeShipping && !product.shipping.free) {
        return false;
      }

      // Verified seller filter
      if (filters.verifiedSeller && !product.seller.verified) {
        return false;
      }

      // Flash sale filter
      if (filters.flashSale && !product.flashSale) {
        return false;
      }

      // In stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && (!product.brand || !filters.brands.includes(product.brand))) {
        return false;
      }

      // Location filter
      if (filters.location && product.shipping.from !== filters.location) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        case 'sales':
          return b.reviewCount - a.reviewCount;
        case 'discount':
          return (b.discount || 0) - (a.discount || 0);
        default: // popularity
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.reviewCount - a.reviewCount;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, sortBy, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section with Trending Categories */}
      <div className="card-glass rounded-3xl p-8 mb-8 text-primary-800 shadow-strong relative overflow-hidden animate-float">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-300/20 to-transparent rounded-full -translate-y-32 translate-x-32 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary-400/20 to-transparent rounded-full translate-y-24 -translate-x-24 animate-bounce-gentle"></div>
        
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-black mb-4 relative z-10 text-gradient animate-slide-up">
            🇨🇱 ¡CHILE COMPRA INTELIGENTE! 🛍️
          </h1>
          <p className="text-xl text-primary-700 mb-6 relative z-10 animate-slide-up font-bold">
            🔥 ¡Los MEJORES precios de Chile! ⚡ Envío GRATIS desde $25.000 a todo el país
          </p>
          
          {/* Marketing Urgency Banner */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-3xl p-6 mb-6 relative z-10 animate-glow shadow-strong">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 animate-pulse-soft text-white" />
                <div>
                  <div className="font-black text-xl text-white">🇨🇱 CYBER CHILE TERMINA EN:</div>
                  <div className="text-sm font-bold opacity-90">¡ÚLTIMAS HORAS! No te quedes sin tu oferta</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black font-mono animate-glow text-white">23:59:45</div>
                <div className="text-sm text-white font-bold">Hasta 70% DCTO</div>
              </div>
            </div>
          </div>
          
          {/* Trending Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 relative z-10 animate-slide-up">
            <div className="card-feature p-6 text-center floating-element cursor-pointer group mobile-touch">
              <Zap className="w-10 h-10 mx-auto mb-3 group-hover:animate-pulse-soft text-primary-600" />
              <div className="text-sm font-bold text-primary-800">⚡ OFERTAS RELÁMPAGO</div>
              <div className="text-xs text-primary-600 animate-pulse-soft font-medium">Hasta 70% OFF</div>
            </div>
            <div className="card-feature p-6 text-center floating-element cursor-pointer group mobile-touch">
              <Gift className="w-10 h-10 mx-auto mb-3 group-hover:animate-bounce-gentle text-green-500" />
              <div className="text-sm font-bold text-primary-800">💰 TODO A $990</div>
              <div className="text-xs text-primary-600 animate-pulse-soft font-medium">¡Increíble!</div>
            </div>
            <div className="card-feature p-6 text-center floating-element cursor-pointer group mobile-touch">
              <Crown className="w-10 h-10 mx-auto mb-3 group-hover:animate-bounce-gentle text-yellow-500 animate-glow" />
              <div className="text-sm font-bold text-primary-800">💎 Joyería</div>
              <div className="text-xs text-primary-600 animate-pulse-soft font-medium">Elegancia chilena</div>
            </div>
            <div className="card-feature p-6 text-center floating-element cursor-pointer group mobile-touch">
              <Sparkles className="w-10 h-10 mx-auto mb-3 group-hover:animate-pulse-soft text-pink-500 animate-glow" />
              <div className="text-sm font-bold text-primary-800">🔧 Herramientas</div>
              <div className="text-xs text-primary-600 animate-pulse-soft font-medium">Para el hogar chileno</div>
            </div>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap gap-6 text-sm mt-8 relative z-10 animate-slide-up">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse-soft"></div>
              <span className="font-bold text-primary-800">🇨🇱 Envío gratis desde $25.000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse-soft"></div>
              <span className="font-bold text-primary-800">🛡️ Garantía chilena</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse-soft"></div>
              <span className="font-bold text-primary-800">↩️ Cambios gratis 30 días</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse-soft"></div>
              <span className="font-bold text-primary-800">📞 Atención Chile 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse-soft"></div>
              <span className="font-bold text-primary-800">⚡ Ofertas diarias Chile</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary-600 rounded-full animate-pulse-soft"></div>
              <span className="font-bold text-primary-800">🏆 Lo mejor para Chile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 animate-slide-up">
        <div>
          <h2 className="text-2xl font-black text-gradient flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            {filteredProducts.length.toLocaleString()} productos encontrados en Chile 🇨🇱
          </h2>
          {searchQuery && (
            <p className="text-primary-700 mt-1 font-medium">
              Resultados para "<span className="font-bold text-primary-800 animate-pulse-soft">{searchQuery}</span>"
            </p>
          )}
          <div className="flex items-center gap-4 mt-2 text-sm text-primary-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 animate-pulse-soft" />
              <span className="font-medium">Calidad garantizada en Chile</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500 animate-pulse-soft" />
              <span className="font-medium">+500K chilenos satisfechos</span>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 animate-slide-up">
          <span className="text-sm text-primary-600 font-medium">Vista:</span>
          <div className="flex card-glass rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 text-sm transition-all duration-300 hover:scale-105 mobile-touch font-medium ${
                viewMode === 'grid'
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'text-primary-700 hover:bg-primary-50'
              }`}
            >
              Cuadrícula
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm transition-all duration-300 hover:scale-105 mobile-touch font-medium ${
                viewMode === 'list'
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'text-primary-700 hover:bg-primary-50'
              }`}
            >
              Lista
            </button>
          </div>
        </div>
      </div>

      {/* Marketing Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-3xl p-6 mb-8 animate-glow shadow-strong">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 animate-pulse-soft text-white" />
            <div>
              <div className="font-black text-xl text-white">🇨🇱 OFERTA ESPECIAL CHILE HOY</div>
              <div className="text-sm font-bold opacity-90">¡Compra 2 y llévate 3! Solo válido en Chile - Últimas horas</div>
            </div>
          </div>
          <div className="text-2xl font-black animate-glow text-white">¡NO TE QUEDES SIN LA TUYA!</div>
        </div>
      </div>

      {/* Products Grid/List */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'product-grid' 
              : 'grid-cols-1'
          } animate-slide-up`}>
            {paginatedProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-scale-in floating-element"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  product={product}
                  onClick={() => onProductSelect(product)}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-12 animate-slide-up">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              {/* Page Numbers */}
              <div className="flex gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-3 text-sm rounded-2xl transition-all duration-300 transform hover:scale-105 mobile-touch font-medium ${
                        currentPage === pageNum
                          ? 'bg-gradient-primary text-white shadow-glow'
                          : 'card-glass text-primary-700 hover:bg-primary-50 shadow-soft hover:shadow-medium'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          )}

          {/* Results Summary */}
          <div className="text-center text-sm text-primary-600 mt-6 animate-slide-up font-medium">
            Mostrando {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} de {filteredProducts.length.toLocaleString()} productos
          </div>
        </>
      ) : (
        /* No Results */
        <div className="text-center py-16 animate-slide-up">
          <div className="text-6xl mb-4 animate-bounce">🔍</div>
          <h3 className="text-2xl font-bold text-gradient mb-2">
            No se encontraron productos
          </h3>
          <p className="text-primary-600 mb-6 animate-pulse-soft font-medium">
            Intenta ajustar tus filtros o términos de búsqueda
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-sm text-primary-600 font-medium">Sugerencias:</span>
            <button className="text-sm text-primary-600 hover:text-primary-800 hover:underline transition-all duration-300 hover:scale-105 mobile-touch font-medium">Electrónicos</button>
            <button className="text-sm text-primary-600 hover:text-primary-800 hover:underline transition-all duration-300 hover:scale-105 mobile-touch font-medium">Moda</button>
            <button className="text-sm text-primary-600 hover:text-primary-800 hover:underline transition-all duration-300 hover:scale-105 mobile-touch font-medium">Hogar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;