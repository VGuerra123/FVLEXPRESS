import React, { useState } from 'react';
import { Filter, ChevronDown, X, Star, Truck, Shield, Zap } from 'lucide-react';

interface SearchFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export interface FilterState {
  rating: number;
  freeShipping: boolean;
  verifiedSeller: boolean;
  flashSale: boolean;
  inStock: boolean;
  brands: string[];
  location: string;
}

const categories = [
  { id: 'all', name: 'Todas las categorías', count: 200, emoji: '🛍️' },
  { id: 'flash_deals', name: '⚡ Ofertas Relámpago', count: 25, emoji: '⚡', hot: true },
  { id: 'dollar_store', name: '💰 Tienda de $990', count: 45, emoji: '💰', trending: true },
  { id: 'jewelry', name: '💎 Joyería', count: 32, emoji: '💎' },
  { id: 'electronics', name: '📱 Electrónicos', count: 28, emoji: '📱', trending: true },
  { id: 'bags', name: '👜 Bolsos', count: 18, emoji: '👜' },
  { id: 'footwear', name: '👟 Calzados', count: 22, emoji: '👟' },
  { id: 'phone_accessories', name: '📱 Accesorios Celular', count: 35, emoji: '📱' },
  { id: 'tools', name: '🔧 Herramientas', count: 15, emoji: '🔧' },
  { id: 'toys', name: '🧸 Juguetes', count: 28, emoji: '🧸' },
  { id: 'cosmetics', name: '💄 Cosméticos', count: 24, emoji: '💄', new: true },
  { id: 'home', name: '🏠 Hogar', count: 19, emoji: '🏠' },
  { id: 'fashion', name: '👕 Vestimentas', count: 26, emoji: '👕' },
  { id: 'sports', name: '⚽ Deportes', count: 12, emoji: '⚽' },
  { id: 'natural_stones', name: '💎 Piedra Natural', count: 8, emoji: '💎' },
  { id: 'hats', name: '🎩 Sombreros', count: 8, emoji: '🎩' },
  { id: 'lights', name: '💡 Luces', count: 8, emoji: '💡' },
  { id: 'artificial_flowers', name: '🌸 Flores Artificiales', count: 6, emoji: '🌸' },
  { id: 'school_supplies', name: '📚 Útiles Escolares', count: 8, emoji: '📚' },
  { id: 'bottles', name: '🍶 Botellas', count: 6, emoji: '🍶' },
  { id: 'watches', name: '⌚ Relojería', count: 8, emoji: '⌚' },
  { id: 'umbrellas', name: '☂️ Paraguas', count: 4, emoji: '☂️' },
  { id: 'socks', name: '🧦 Medias', count: 6, emoji: '🧦' },
  { id: 'automotive', name: '🚗 Automotriz', count: 6, emoji: '🚗' }
];

const sortOptions = [
  { id: 'popularity', name: 'Más populares' },
  { id: 'price_low', name: 'Precio: menor a mayor' },
  { id: 'price_high', name: 'Precio: mayor a menor' },
  { id: 'rating', name: 'Mejor valorados' },
  { id: 'newest', name: 'Más recientes' },
  { id: 'sales', name: 'Más vendidos' },
  { id: 'discount', name: 'Mayor descuento' },
];

const brands = ['TechPro', 'AudioMax', 'FitTech', 'StyleCo', 'RunMax', 'LightPro', 'NaturalGlow', 'TravelPro'];
const locations = ['China', 'Corea del Sur', 'Estados Unidos', 'Alemania', 'Japón'];

const SearchFilters: React.FC<SearchFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  filters,
  setFilters,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    handleFilterChange('brands', newBrands);
  };

  const clearAllFilters = () => {
    setFilters({
      rating: 0,
      freeShipping: false,
      verifiedSeller: false,
      flashSale: false,
      inStock: false,
      brands: [],
      location: '',
    });
    setPriceRange([0, 1000]);
    setSelectedCategory('all');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.rating > 0) count++;
    if (filters.freeShipping) count++;
    if (filters.verifiedSeller) count++;
    if (filters.flashSale) count++;
    if (filters.inStock) count++;
    if (filters.brands.length > 0) count++;
    if (filters.location) count++;
    if (priceRange[1] < 1000) count++;
    if (selectedCategory !== 'all') count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Main Filters Row */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Precio:</span>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(priceRange[1] / 1000) * 100}%, #E5E7EB ${(priceRange[1] / 1000) * 100}%, #E5E7EB 100%)`
              }}
            />
            <span className="text-sm text-gray-600 min-w-max">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleFilterChange('freeShipping', !filters.freeShipping)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filters.freeShipping
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Truck className="w-3 h-3" />
              Envío gratis
            </button>
            <button
              onClick={() => handleFilterChange('verifiedSeller', !filters.verifiedSeller)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filters.verifiedSeller
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Shield className="w-3 h-3" />
              Verificado
            </button>
            <button
              onClick={() => handleFilterChange('flashSale', !filters.flashSale)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filters.flashSale
                  ? 'bg-orange-100 text-orange-800 border border-orange-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Zap className="w-3 h-3" />
              Flash Sale
            </button>
          </div>

          {/* Sort */}
          <div className="relative ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Más filtros
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calificación mínima
              </label>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleFilterChange('rating', filters.rating === rating ? 0 : rating)}
                    className={`flex items-center gap-2 w-full p-2 rounded-lg text-sm transition-colors ${
                      filters.rating === rating
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span>y más</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brands Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marcas
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Envía desde
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Cualquier ubicación</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opciones adicionales
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Solo en stock</span>
                </label>
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
              Limpiar todos los filtros
            </button>
            <button
              onClick={() => setShowAdvancedFilters(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;