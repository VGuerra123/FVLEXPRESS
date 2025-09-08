import React from 'react';
import { X, Smartphone, Shirt, Home, Sparkles, Dumbbell, Car, ChevronRight, TrendingUp, Zap, Gift, ShoppingBag } from 'lucide-react';

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect: (category: string) => void;
}

const categories = [
  {
    id: 'flash_deals',
    name: 'Ofertas Relámpago',
    icon: Zap,
    color: 'from-red-500 to-orange-600',
    subcategories: ['Flash Sales Chile', 'Ofertas del Día', 'Liquidación Chile', 'Descuentos Especiales'],
    trending: true,
    hot: true,
  },
  {
    id: 'dollar_store',
    name: 'Tienda de $990',
    icon: Gift,
    color: 'from-green-500 to-emerald-600',
    subcategories: ['Organizadores Chile', 'Accesorios $990', 'Decoración Chile', 'Útiles Chile', 'Limpieza Chile'],
    hot: true,
  },
  {
    id: 'jewelry',
    name: 'Joyería',
    icon: Sparkles,
    color: 'from-yellow-500 to-amber-600',
    subcategories: ['Pulseras Chile', 'Collares Elegantes', 'Aretes Premium', 'Anillos Chile', 'Accesorios Cabello', 'Tobilleras'],
    trending: true,
  },
  {
    id: 'electronics',
    name: 'Electrónicos',
    icon: Smartphone,
    color: 'from-blue-500 to-blue-600',
    subcategories: ['Smartphones Chile', 'Laptops Gaming', 'Auriculares Premium', 'Smartwatches', 'Tablets Pro'],
    trending: true,
  },
  {
    id: 'bags',
    name: 'Bolsos',
    icon: ShoppingBag,
    color: 'from-pink-500 to-rose-600',
    subcategories: ['Bolsos Mano Chile', 'Mochilas Escolares', 'Carteras Cuero', 'Bolsos Viaje', 'Riñoneras Deportivas'],
    hot: true,
  },
  {
    id: 'footwear',
    name: 'Calzados',
    icon: Gift,
    color: 'from-indigo-500 to-purple-600',
    subcategories: ['Zapatillas Casual Chile', 'Sandalias Verano', 'Zapatillas Deportivas', 'Botas Invierno', 'Ojotas Playa'],
  },
  {
    id: 'phone_accessories',
    name: 'Accesorios de Celular',
    icon: Smartphone,
    color: 'from-cyan-500 to-blue-600',
    subcategories: ['Fundas iPhone Chile', 'Protectores Pantalla', 'Cargadores Rápidos', 'Soportes Auto', 'Auriculares TWS'],
    new: true,
  },
  {
    id: 'tools',
    name: 'Herramientas',
    icon: Car,
    color: 'from-gray-500 to-slate-600',
    subcategories: ['Destornillador Eléctrico', 'Taladros Litio', 'Pistola Pintura', 'Mini Motosierra Chile'],
  },
  {
    id: 'toys',
    name: 'Juguetes',
    icon: Gift,
    color: 'from-pink-500 to-red-600',
    subcategories: ['Juguetes Electrónicos', 'Bloques Construcción', 'Juegos Mesa Chile', 'Juguetes DIY'],
  },
  {
    id: 'cosmetics',
    name: 'Cosméticos',
    icon: Sparkles,
    color: 'from-purple-500 to-violet-600',
    subcategories: ['Sets Maquillaje Chile', 'Labiales Premium', 'Sombras Profesionales', 'Bases Cobertura', 'Brochas Calidad'],
    new: true,
  },
  {
    id: 'home',
    name: 'Hogar y Jardín',
    icon: Home,
    color: 'from-green-500 to-emerald-600',
    subcategories: ['Decoración Chile', 'Cocina Premium', 'Baño Moderno', 'Jardín Chile', 'Muebles Hogar'],
  },
  {
    id: 'fashion',
    name: 'Vestimentas',
    icon: Sparkles,
    color: 'from-pink-500 to-rose-600',
    subcategories: ['Ropa Mujer Chile', 'Ropa Hombre Elegante', 'Ropa Deportiva', 'Ropa Interior Premium'],
  },
  {
    id: 'sports',
    name: 'Deportes y Fitness',
    icon: Gift,
    color: 'from-orange-500 to-red-600',
    subcategories: ['Ropa Deportiva Chile', 'Equipos Fitness', 'Suplementos', 'Outdoor Chile', 'Fitness Hogar'],
  },
  {
    id: 'natural_stones',
    name: 'Piedra Natural',
    icon: Sparkles,
    color: 'from-emerald-500 to-teal-600',
    subcategories: ['Pulseras Piedra Chile', 'Collares Piedra Natural', 'Aretes Piedra', 'Anillos Piedra Premium'],
  },
  {
    id: 'hats',
    name: 'Sombreros',
    icon: Gift,
    color: 'from-yellow-500 to-orange-600',
    subcategories: ['Gorras Chile', 'Boinas Elegantes', 'Sombreros Verano', 'Accesorios Cabeza'],
  },
  {
    id: 'lights',
    name: 'Luces',
    icon: Sparkles,
    color: 'from-yellow-400 to-amber-500',
    subcategories: ['Luces Solares Chile', 'Luces Camping', 'Luces LED Premium', 'Iluminación Exterior'],
  },
  {
    id: 'artificial_flowers',
    name: 'Flores Artificiales',
    icon: Gift,
    color: 'from-pink-400 to-rose-500',
    subcategories: ['Rosas Artificiales Chile', 'Plantas Decorativas', 'Decoración Floral', 'Ramos Bodas'],
  },
  {
    id: 'school_supplies',
    name: 'Útiles Escolares',
    icon: Smartphone,
    color: 'from-blue-400 to-indigo-500',
    subcategories: ['Sets Completos Chile', 'Cuadernos Escolares', 'Lápices Colores', 'Accesorios Estudio'],
  },
  {
    id: 'bottles',
    name: 'Botellas',
    icon: Gift,
    color: 'from-cyan-400 to-blue-500',
    subcategories: ['Botellas Agua Chile', 'Térmicas Premium', 'Deportivas', 'Acero Inoxidable'],
  },
  {
    id: 'watches',
    name: 'Relojería',
    icon: Sparkles,
    color: 'from-gray-500 to-slate-600',
    subcategories: ['Relojes Clásicos Chile', 'Deportivos Premium', 'Elegantes Lujo', 'Accesorios Reloj'],
  },
  {
    id: 'umbrellas',
    name: 'Paraguas',
    icon: Gift,
    color: 'from-blue-500 to-cyan-600',
    subcategories: ['Automáticos Chile', 'Compactos Viaje', 'Resistentes Viento', 'Diseños Únicos'],
  },
  {
    id: 'socks',
    name: 'Medias',
    icon: Gift,
    color: 'from-purple-400 to-pink-500',
    subcategories: ['Deportivas Chile', 'Casuales Cómodas', 'Térmicas Invierno', 'Packs Familiares'],
  },
  {
    id: 'automotive',
    name: 'Automotriz',
    icon: Car,
    color: 'from-red-500 to-orange-600',
    subcategories: ['Cargadores Auto Chile', 'Accesorios Premium', 'Herramientas Auto', 'Limpieza Vehículos'],
  },
];

const CategoriesModal: React.FC<CategoriesModalProps> = ({ isOpen, onClose, onCategorySelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Categorías</h2>
              <p className="text-gray-600 mt-1">Explora nuestros productos</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="p-6 space-y-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  onCategorySelect(category.id);
                  onClose();
                }}
                className="w-full bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg hover:border-primary-300 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </h3>
                      {category.trending && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                      {category.hot && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Hot
                        </span>
                      )}
                      {category.new && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Gift className="w-3 h-3" />
                          Nuevo
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.slice(0, 3).map((sub, index) => (
                        <span key={index} className="text-xs text-gray-500">
                          {sub}{index < 2 && index < category.subcategories.length - 1 ? ' • ' : ''}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="text-xs text-gray-400">+{category.subcategories.length - 3} más</span>
                      )}
                    </div>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-4">Acciones rápidas</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium">Flash Sales</span>
            </button>
            <button className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Más Vendidos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;