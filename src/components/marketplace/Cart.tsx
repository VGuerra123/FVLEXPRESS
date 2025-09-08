import React, { useContext } from 'react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartContext } from "../../pages/Marketplace";


interface CartProps {
  onBack: () => void;
}

const Cart: React.FC<CartProps> = ({ onBack }) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useContext(CartContext);

  const handleCheckout = () => {
    alert('¡Función de checkout próximamente! Total: $' + getCartTotal().toFixed(2));
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Seguir comprando
        </button>

        <div className="text-center py-16">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8">¡Descubre productos increíbles y comienza a llenar tu carrito!</p>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Explorar productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Seguir comprando
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Carrito de compras ({cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">En stock</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-600">
                        ${item.price.toLocaleString('es-CL')}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${item.originalPrice.toLocaleString('es-CL')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 font-medium min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 text-right">
                    <span className="text-sm text-gray-600">
                      Subtotal: <span className="font-semibold">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen del pedido</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${getCartTotal().toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-green-600">🇨🇱 Gratis</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Impuestos</span>
                <span>${(getCartTotal() * 0.19).toLocaleString('es-CL')}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${(getCartTotal() * 1.19).toLocaleString('es-CL')}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
            >
              💳 Pagar con tarjetas chilenas
            </button>

            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">🔒 Pago 100% seguro</p>
              <p>✅ Envío gratis en pedidos +$25.000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;