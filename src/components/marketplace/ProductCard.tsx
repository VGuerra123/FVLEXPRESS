import React, { useState, useContext } from 'react';
import { Star, Heart, ShoppingCart, Zap, Clock, Eye, Share2, Truck, Shield } from 'lucide-react';
import { Product } from '../../types/marketplace';
import { CartContext } from "../../pages/Marketplace";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Mira este producto en FVLExpress: ${product.name}`,
        url: window.location.href
      });
    }
  };

  const handleImageHover = (index: number) => {
    setCurrentImageIndex(index);
  };

  const formatTimeLeft = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div
      onClick={onClick}
      className="card-product hover:shadow-glow transition-all duration-700 cursor-pointer group overflow-hidden relative floating-element mobile-touch"
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 rounded-t-3xl">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-primary-100 shimmer-effect"></div>
        )}
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Image dots for multiple images */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-slide-up">
            {product.images.slice(0, 4).map((_, index) => (
              <button
                key={index}
                onMouseEnter={() => handleImageHover(index)}
                className={`w-2 h-2 rounded-full transition-all animate-scale-in mobile-touch ${
                  index === currentImageIndex ? 'bg-white animate-glow' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.discount && (
            <span className="discount-badge text-xs px-3 py-1.5 rounded-full animate-pulse-soft">
              -{product.discount}%
            </span>
          )}
          {product.isPopular && (
            <span className="badge-trending text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Popular
            </span>
          )}
          {product.flashSale && (
            <span className="badge-hot text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Flash
            </span>
          )}
          {product.shipping.free && (
            <span className="badge-new text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
              <Truck className="w-3 h-3" />
              Gratis
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-slide-up">
          <button
            onClick={handleLike}
            className={`p-3 rounded-full glass-morphism transition-all duration-500 mobile-touch shadow-soft ${
              isLiked
                ? 'bg-red-500 text-white animate-glow shadow-glow'
                : 'bg-white/95 text-primary-600 hover:bg-red-500 hover:text-white hover:shadow-glow'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-3 rounded-full glass-morphism bg-white/95 text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-500 mobile-touch shadow-soft hover:shadow-glow"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-3 rounded-full bg-gradient-primary text-white glass-morphism hover:shadow-glow-strong transition-all duration-500 mobile-touch shadow-glow animate-glow"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Flash Sale Progress */}
        {product.flashSale && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-900/90 via-primary-800/60 to-transparent p-3 glass-morphism">
            <div className="text-white text-xs mb-1 font-bold">
              Termina en: {formatTimeLeft(product.flashSale.endTime)}
            </div>
            <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500 shadow-soft animate-gradient-x"
                style={{ 
                  width: `${(product.flashSale.soldCount / product.flashSale.totalStock) * 100}%` 
                }}
              ></div>
            </div>
            <div className="text-white text-xs mt-1 font-bold">
              {product.flashSale.soldCount} vendidos
            </div>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-6">
        {/* Brand */}
        {product.brand && (
          <div className="text-xs text-primary-600 mb-2 font-medium">{product.brand}</div>
        )}

        <h3 className="font-bold text-primary-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors animate-slide-up text-base">
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-colors duration-300 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-500 fill-current drop-shadow-sm animate-pulse-glow'
                      : 'text-primary-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-primary-700 font-medium">
              {product.rating}
            </span>
          </div>
          <span className="text-xs text-primary-600">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4 animate-scale-in">
          <span className="price-highlight">
            ${product.price.toLocaleString('es-CL')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-primary-500 line-through">
              ${product.originalPrice.toLocaleString('es-CL')}
            </span>
          )}
          {product.discount && (
            <span className="text-xs discount-badge px-2 py-1 rounded-full font-bold animate-glow">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Seller Info */}
        <div className="flex items-center gap-2 mb-3 animate-slide-up">
          <div className="flex items-center gap-1">
            {product.seller.verified && (
              <Shield className="w-4 h-4 text-green-500 animate-bounce-gentle" />
            )}
            <span className="text-xs text-primary-700 truncate font-medium">
              {product.seller.name}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current animate-pulse-soft" />
            <span className="text-xs text-primary-700 font-medium">
              {product.seller.rating}
            </span>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="flex items-center justify-between text-xs text-primary-700 animate-slide-up">
          <div className="flex items-center gap-1">
            <Truck className="w-4 h-4 text-primary-600 animate-bounce-gentle" />
            <span className="font-medium">
              {product.shipping.free ? '🇨🇱 Envío gratis' : `$${product.shipping.cost.toLocaleString('es-CL')}`}
            </span>
          </div>
          <span className="font-medium">{product.shipping.estimatedDays} días</span>
        </div>

        {/* Stock status */}
        <div className="flex items-center justify-between mt-3 animate-slide-up">
          <span className={`text-xs font-bold ${
            product.inStock ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.inStock ? '✅ Disponible Chile' : '❌ Agotado'}
          </span>
          {product.isFeatured && (
            <span className="text-xs text-primary-600 font-bold animate-pulse-soft">
              🏆 Destacado
            </span>
          )}
        </div>

        {/* Bulk pricing hint */}
        {product.bulkPricing && product.bulkPricing.length > 0 && (
          <div className="mt-3 text-xs text-green-700 font-bold bg-green-100 px-3 py-2 rounded-full animate-slide-up shadow-soft">
            Desde ${product.bulkPricing[0].price.toLocaleString('es-CL')} comprando {product.bulkPricing[0].minQuantity}+
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;