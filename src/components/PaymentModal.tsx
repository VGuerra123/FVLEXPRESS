import React, { useState } from 'react';
import { X, CreditCard, Building, Smartphone, Banknote, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { getAvailablePaymentMethods, type PaymentData } from '../lib/payments';
import type { CartItem } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  items,
  total
}) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    rut: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { language } = useLanguage();
  const t = (key: string) => translations[key]?.[language] || key;
  const paymentMethods = getAvailablePaymentMethods();

  const handlePayment = async () => {
    if (!selectedMethod || !customerData.name || !customerData.email) {
      setErrorMessage('Por favor completa todos los campos requeridos');
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      const paymentData: PaymentData = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          type: item.type,
        })),
        total,
        currency: 'CLP',
        customerEmail: customerData.email,
        customerName: customerData.name,
      };

      const method = paymentMethods.find(m => m.id === selectedMethod);
      if (!method) throw new Error('Método de pago no válido');

      const result = await method.processor(paymentData);

      if (result.success) {
        setPaymentStatus('success');
        setTimeout(() => {
          onClose();
          // Clear cart or redirect
        }, 3000);
      } else {
        throw new Error(result.error || 'Error en el pago');
      }
    } catch (error) {
      setPaymentStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with animated particles */}
      <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-200/50 animate-scale-in overflow-hidden">
        
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50 animate-gradient-shift" />
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-blue-100/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-soft animate-tilt-3d">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-900">Procesar Pago</h2>
              <p className="text-blue-600">Total: ${total.toLocaleString()} CLP</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-50 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <X className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        <div className="relative max-h-96 overflow-y-auto p-6">
          {paymentStatus === 'success' ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-pulse">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">¡Pago Exitoso!</h3>
              <p className="text-green-600">Tu pago ha sido procesado correctamente.</p>
            </div>
          ) : paymentStatus === 'error' ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-pulse">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-red-800 mb-4">Error en el Pago</h3>
              <p className="text-red-600 mb-6">{errorMessage}</p>
              <button
                onClick={() => setPaymentStatus('idle')}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
              >
                Intentar Nuevamente
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-blue-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Información del Cliente
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre completo *"
                    value={customerData.name}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-blue-50/50 border border-blue-200/50 rounded-xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={customerData.email}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-blue-50/50 border border-blue-200/50 rounded-xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-blue-50/50 border border-blue-200/50 rounded-xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  <input
                    type="text"
                    placeholder="RUT (opcional)"
                    value={customerData.rut}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, rut: e.target.value }))}
                    className="w-full px-4 py-3 bg-blue-50/50 border border-blue-200/50 rounded-xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-blue-900 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                  Método de Pago
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`group relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50 shadow-medium'
                          : 'border-blue-200/50 bg-white/80 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{method.icon}</div>
                        <div className="text-left">
                          <div className="font-bold text-blue-900">{method.name}</div>
                          <div className="text-sm text-blue-600">{method.description}</div>
                        </div>
                      </div>
                      {selectedMethod === method.id && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-200/50">
                <h4 className="font-bold text-blue-900 mb-3">Resumen del Pedido</h4>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-blue-700">{item.name} x{item.quantity}</span>
                      <span className="font-semibold text-blue-900">
                        ${(item.price * item.quantity).toLocaleString()} CLP
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-blue-200/50 pt-2 mt-2">
                    <div className="flex justify-between font-bold text-blue-900">
                      <span>Total:</span>
                      <span>${total.toLocaleString()} CLP</span>
                    </div>
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-fade-in">
                  {errorMessage}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {paymentStatus === 'idle' && (
          <div className="relative p-6 border-t border-blue-100/50">
            <button
              onClick={handlePayment}
              disabled={isProcessing || !selectedMethod || !customerData.name || !customerData.email}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-medium hover:shadow-floating"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Procesando...</span>
                </div>
              ) : (
                `Pagar ${total.toLocaleString()} CLP`
              )}
            </button>
            
            <div className="flex items-center justify-center mt-4 space-x-2 text-sm text-blue-600">
              <Shield className="w-4 h-4" />
              <span>Pago 100% seguro y encriptado</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};