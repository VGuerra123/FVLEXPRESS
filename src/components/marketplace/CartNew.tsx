// src/components/marketplace/CartNew.tsx
import React from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../store/cartStore";

interface CartNewProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartNew: React.FC<CartNewProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, updateQty, remove } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel carrito */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white/80 backdrop-blur-xl shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50">
              <h2 className="flex items-center gap-2 text-xl font-bold text-blue-900">
                <ShoppingBag className="w-6 h-6" />
                Carrito
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Lista de productos */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-500 py-20">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-50" />
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white/60 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        ${item.price.toLocaleString()} CLP
                      </p>
                    </div>

                    {/* Cantidad */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Eliminar */}
                    <button
                      onClick={() => remove(item.id)}
                      className="text-red-500 hover:bg-red-100 p-2 rounded-full transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200/50 space-y-3">
                <div className="flex items-center justify-between font-bold text-blue-900 text-lg">
                  <span>Total</span>
                  <span>${total.toLocaleString()} CLP</span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 text-white font-bold shadow-lg hover:brightness-110 transition"
                >
                  Proceder al Pago
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
