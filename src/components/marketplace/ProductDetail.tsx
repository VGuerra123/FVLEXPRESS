import React, { useState, useContext } from 'react';
import { ArrowLeft, Star, Heart, ShoppingCart, Plus, Minus, Truck, Shield, RotateCcw, Share2, Eye, Clock, Award, MessageCircle, ChevronRight, Zap, X } from 'lucide-react';
import { Product } from '../../types/marketplace';
import { CartContext } from "../../pages/Marketplace";


interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews' | 'shipping'>('description');
  const [showImageModal, setShowImageModal] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const increaseQuantity = () => {
    if (product.maxOrderQuantity && quantity >= product.maxOrderQuantity) return;
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= (product.minOrderQuantity || 1)) return;
    setQuantity(prev => prev - 1);
  };

  const handleVariantSelect = (type: string, value: string) => {
    setSelectedVariants(prev => ({ ...prev, [type]: value }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Mira este producto en FVLExpress: ${product.name}`,
        url: window.location.href
      });
    }
  };

  const formatTimeLeft = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getCurrentPrice = () => {
    // Check if selected variants affect price
    const selectedVariant = product.variants?.find(v => 
      selectedVariants[v.type] === v.value && v.price
    );
    return selectedVariant?.price || product.price;
  };

  const getBulkPrice = () => {
    if (!product.bulkPricing) return null;
    return product.bulkPricing.find(bp => quantity >= bp.minQuantity);
  };

  const currentPrice = getCurrentPrice();
  const bulkPrice = getBulkPrice();
  const finalPrice = bulkPrice ? bulkPrice.price : currentPrice;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a productos
      </button>

      {/* Flash Sale Banner */}
      {product.flashSale && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6" />
              <div>
                <div className="font-bold">¡Flash Sale!</div>
                <div className="text-sm opacity-90">Termina en: {formatTimeLeft(product.flashSale.endTime)}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${product.flashSale.salePrice}</div>
              <div className="text-sm line-through opacity-75">${product.flashSale.originalPrice}</div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Vendidos: {product.flashSale.soldCount}</span>
              <span>Stock: {product.flashSale.totalStock - product.flashSale.soldCount}</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(product.flashSale.soldCount / product.flashSale.totalStock) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image gallery */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => setShowImageModal(true)}
            />
            
            {/* Image overlay actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setShowImageModal(true)}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Image navigation arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail images */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Video thumbnail if available */}
          {product.videoUrl && (
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600 mb-2">📹 Video del producto disponible</div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ver video
              </button>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-6">
          {/* Brand and badges */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {product.brand && (
                <span className="text-sm text-gray-600">{product.brand}</span>
              )}
              {product.seller.badges.map((badge, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-lg border transition-all ${
                isLiked
                  ? 'bg-red-50 border-red-300 text-red-600'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating and reviews */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviewCount} reseñas)
              </span>
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                Ver reseñas
              </button>
            </div>

            {/* Price */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-600">
                  ${finalPrice.toLocaleString('es-CL')}
                </span>
                {product.originalPrice && finalPrice < product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice.toLocaleString('es-CL')}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded-full">
                      Ahorra ${(product.originalPrice - finalPrice).toLocaleString('es-CL')}
                    </span>
                  </>
                )}
              </div>
              
              {bulkPrice && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-sm text-green-800">
                    💰 Precio por volumen: {bulkPrice.discount}% de descuento comprando {bulkPrice.minQuantity}+ unidades
                  </div>
                </div>
              )}
            </div>

            {/* Seller info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{product.seller.name}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{product.seller.rating} ({product.seller.reviewCount.toLocaleString()})</span>
                      {product.seller.verified && (
                        <span className="text-green-600">✓ Verificado</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>Responde en {product.seller.responseTime}</div>
                  <div>Desde {product.seller.joinDate}</div>
                </div>
              </div>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4 mb-6">
                {/* Group variants by type */}
                {Object.entries(
                  product.variants.reduce((acc, variant) => {
                    if (!acc[variant.type]) acc[variant.type] = [];
                    acc[variant.type].push(variant);
                    return acc;
                  }, {} as { [key: string]: typeof product.variants })
                ).map(([type, variants]) => (
                  <div key={type}>
                    <label className="block text-sm font-medium text-gray-900 mb-2 capitalize">
                      {type === 'color' ? 'Color' : type === 'size' ? 'Talla' : 'Estilo'}:
                      {selectedVariants[type] && (
                        <span className="ml-2 text-blue-600">{selectedVariants[type]}</span>
                      )}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => handleVariantSelect(type, variant.value)}
                          disabled={!variant.inStock}
                          className={`px-4 py-2 border rounded-lg text-sm transition-all ${
                            selectedVariants[type] === variant.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : variant.inStock
                              ? 'border-gray-300 hover:border-gray-400'
                              : 'border-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {variant.value}
                          {variant.price && variant.price !== product.price && (
                            <span className="ml-1 text-xs">
                              (+${(variant.price - product.price).toLocaleString('es-CL')})
                            </span>
                          )}
                          {!variant.inStock && (
                            <span className="ml-1 text-xs">(Agotado)</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-900">Cantidad:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.minOrderQuantity && (
                  <span className="text-sm text-gray-600">
                    Mín: {product.minOrderQuantity}
                  </span>
                )}
                {product.maxOrderQuantity && (
                  <span className="text-sm text-gray-600">
                    Máx: {product.maxOrderQuantity}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Agregar al carrito' : 'Agotado'}
                </button>
                <button className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                  Comprar ahora
                </button>
              </div>

              {/* Total price preview */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800">Total ({quantity} {quantity === 1 ? 'unidad' : 'unidades'}):</span>
                  <span className="font-bold text-blue-900">${(finalPrice * quantity).toLocaleString('es-CL')}</span>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 text-gray-700">
                <Truck className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="font-medium">
                    {product.shipping.free ? '🇨🇱 Envío gratis' : `Envío $${product.shipping.cost.toLocaleString('es-CL')}`}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    • Llega en {product.shipping.estimatedDays} días desde {product.shipping.from}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Shield className="w-5 h-5 text-green-600" />
                <span>{product.warranty || 'Garantía de calidad certificada en Chile'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <RotateCcw className="w-5 h-5 text-orange-600" />
                <span>{product.returnPolicy || '30 días para cambios gratuitos en Chile'}</span>
              </div>
              {product.shipping.express && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span>Envío express disponible: ${product.shipping.express.cost.toLocaleString('es-CL')} ({product.shipping.express.days} días)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'description', name: 'Descripción', icon: MessageCircle },
              { id: 'specs', name: 'Especificaciones', icon: Award },
              { id: 'reviews', name: 'Reseñas', icon: Star },
              { id: 'shipping', name: 'Envío', icon: Truck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
              <h3 className="font-semibold text-gray-900 mb-3">Características principales:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && product.specifications && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-900">{key}:</span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
              {product.weight && (
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-900">Peso:</span>
                  <span className="text-gray-700">{product.weight}kg</span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-900">Dimensiones:</span>
                  <span className="text-gray-700">
                    {product.dimensions.length} x {product.dimensions.width} x {product.dimensions.height} cm
                  </span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="text-center text-gray-600">
                <Star className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Las reseñas de productos se cargarán aquí</p>
                <p className="text-sm mt-2">Funcionalidad próximamente disponible</p>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Información de envío</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Envía desde:</span>
                      <span className="font-medium">{product.shipping.from}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tiempo estimado:</span>
                      <span className="font-medium">{product.shipping.estimatedDays} días</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Costo de envío:</span>
                      <span className="font-medium">
                        {product.shipping.free ? 'Gratis' : `$${product.shipping.cost.toLocaleString('es-CL')}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Verificación:</span>
                      <span className="text-green-600">✓ Verificado Chile</span>
                    </div>
                  </div>
                </div>
                
                {product.shipping.express && (
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Envío Express</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tiempo de entrega:</span>
                        <span className="font-medium">{product.shipping.express.days} días</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Costo adicional:</span>
                        <span className="font-medium">${product.shipping.express.cost.toLocaleString('es-CL')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;