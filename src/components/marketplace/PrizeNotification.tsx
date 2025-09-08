import React, { useEffect, useState } from 'react';
import { X, Gift, Sparkles, CheckCircle } from 'lucide-react';

interface Prize {
  id: number;
  name: string;
  value: string;
  color: string;
  icon: React.ReactNode;
}

interface PrizeNotificationProps {
  prize: Prize | null;
  isVisible: boolean;
  onClose: () => void;
}

const PrizeNotification: React.FC<PrizeNotificationProps> = ({ prize, isVisible, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible && prize) {
      setShow(true);
      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, prize]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  if (!prize || !isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden transform transition-all duration-500 ${show ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-400/10"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-bl from-accent-400/20 to-transparent rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-primary-500/20 to-transparent rounded-full"></div>
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10">
          {/* Success animation */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-400 flex items-center justify-center animate-bounce-slow">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-accent-400 animate-ping opacity-20"></div>
            </div>
            <div className="flex justify-center">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Felicidades!
          </h2>
          <p className="text-gray-600 mb-6">
            Has ganado un premio increíble
          </p>

          {/* Prize display */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: prize.color }}
            >
              {prize.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {prize.name}
            </h3>
            <div className="text-3xl font-bold text-gradient mb-2">
              {prize.value}
            </div>
            <p className="text-sm text-gray-600">
              {prize.name === 'Intenta Mañana' 
                ? 'No te preocupes, ¡mañana tendrás otra oportunidad!'
                : 'Tu premio se ha aplicado automáticamente'
              }
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            {prize.name !== 'Intenta Mañana' && (
              <button className="w-full btn-metallic">
                <Gift className="w-5 h-5 mr-2" />
                Usar Premio Ahora
              </button>
            )}
            <button
              onClick={handleClose}
              className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Continuar Comprando
            </button>
          </div>

          {/* Confetti effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full animate-bounce-slow opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeNotification;