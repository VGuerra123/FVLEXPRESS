import React, { useState, useEffect } from 'react';
import { X, Gift, Sparkles, Trophy, Coins, Star, Zap } from 'lucide-react';

interface Prize {
  id: number;
  name: string;
  value: string;
  color: string;
  icon: React.ReactNode;
  probability: number;
}

interface DailySpinWheelProps {
  isOpen: boolean;
  onClose: () => void;
  onPrizeWon: (prize: Prize) => void;
}

const prizes: Prize[] = [
  { id: 1, name: 'Descuento 50%', value: '50% OFF', color: '#FF6B6B', icon: <Gift className="w-6 h-6" />, probability: 5 },
  { id: 2, name: 'Envío Gratis', value: 'FREE SHIP', color: '#4ECDC4', icon: <Zap className="w-6 h-6" />, probability: 20 },
  { id: 3, name: '$10 de Descuento', value: '$10 OFF', color: '#45B7D1', icon: <Coins className="w-6 h-6" />, probability: 15 },
  { id: 4, name: 'Descuento 20%', value: '20% OFF', color: '#96CEB4', icon: <Star className="w-6 h-6" />, probability: 25 },
  { id: 5, name: 'Producto Gratis', value: 'FREE ITEM', color: '#FFEAA7', icon: <Trophy className="w-6 h-6" />, probability: 2 },
  { id: 6, name: 'Descuento 30%', value: '30% OFF', color: '#DDA0DD', icon: <Sparkles className="w-6 h-6" />, probability: 10 },
  { id: 7, name: '$5 de Descuento', value: '$5 OFF', color: '#98D8C8', icon: <Coins className="w-6 h-6" />, probability: 15 },
  { id: 8, name: 'Intenta Mañana', value: 'TRY AGAIN', color: '#F7DC6F', icon: <Gift className="w-6 h-6" />, probability: 8 },
];

const DailySpinWheel: React.FC<DailySpinWheelProps> = ({ isOpen, onClose, onPrizeWon }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [canSpin, setCanSpin] = useState(true);
  const [timeUntilNextSpin, setTimeUntilNextSpin] = useState('');

  useEffect(() => {
    // Check if user has already spun today
    const lastSpinDate = localStorage.getItem('lastSpinDate');
    const today = new Date().toDateString();
    
    if (lastSpinDate === today) {
      setCanSpin(false);
      updateTimeUntilNextSpin();
    }
  }, []);

  useEffect(() => {
    if (!canSpin) {
      const interval = setInterval(updateTimeUntilNextSpin, 1000);
      return () => clearInterval(interval);
    }
  }, [canSpin]);

  const updateTimeUntilNextSpin = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    setTimeUntilNextSpin(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  };

  const selectPrize = () => {
    const random = Math.random() * 100;
    let cumulativeProbability = 0;
    
    for (const prize of prizes) {
      cumulativeProbability += prize.probability;
      if (random <= cumulativeProbability) {
        return prize;
      }
    }
    return prizes[prizes.length - 1]; // fallback
  };

  const handleSpin = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    const selectedPrize = selectPrize();
    const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id);
    const segmentAngle = 360 / prizes.length;
    const targetAngle = (prizeIndex * segmentAngle) + (segmentAngle / 2);
    const spins = 5; // Number of full rotations
    const finalRotation = (spins * 360) + (360 - targetAngle);
    
    setRotation(prev => prev + finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setCanSpin(false);
      localStorage.setItem('lastSpinDate', new Date().toDateString());
      onPrizeWon(selectedPrize);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-400/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-accent-400 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Ruleta Diaria
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Gira y Gana Premios!
            </h2>
            <p className="text-gray-600">
              Una oportunidad diaria para ganar descuentos increíbles
            </p>
          </div>

          {/* Wheel Container */}
          <div className="relative mx-auto w-80 h-80 mb-8">
            {/* Wheel */}
            <div 
              className={`w-full h-full rounded-full relative overflow-hidden shadow-2xl border-8 border-white ${
                isSpinning ? 'transition-transform duration-[3000ms] ease-out' : ''
              }`}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {prizes.map((prize, index) => {
                const angle = (360 / prizes.length) * index;
                return (
                  <div
                    key={prize.id}
                    className="absolute w-full h-full flex items-center justify-center"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((360 / prizes.length) * Math.PI / 180)}% ${50 - 50 * Math.sin((360 / prizes.length) * Math.PI / 180)}%)`,
                      backgroundColor: prize.color,
                    }}
                  >
                    <div 
                      className="text-white font-bold text-xs text-center flex flex-col items-center gap-1"
                      style={{ transform: `rotate(${180 / prizes.length}deg) translateY(-60px)` }}
                    >
                      {prize.icon}
                      <span>{prize.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-primary-500">
              <Sparkles className="w-8 h-8 text-primary-500" />
            </div>

            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary-600 z-10"></div>
          </div>

          {/* Spin Button or Timer */}
          {canSpin ? (
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                isSpinning
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'btn-metallic hover:scale-105 active:scale-95'
              }`}
            >
              {isSpinning ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Girando...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  ¡GIRAR AHORA!
                </div>
              )}
            </button>
          ) : (
            <div className="text-center">
              <div className="bg-gray-100 rounded-2xl p-6 mb-4">
                <div className="text-gray-600 mb-2">Ya giraste hoy</div>
                <div className="text-2xl font-bold text-primary-600 font-mono">
                  {timeUntilNextSpin}
                </div>
                <div className="text-sm text-gray-500">hasta la próxima oportunidad</div>
              </div>
              <p className="text-sm text-gray-600">
                ¡Vuelve mañana para otra oportunidad de ganar!
              </p>
            </div>
          )}

          {/* Prize List */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Premios disponibles:</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {prizes.filter(p => p.id !== 8).map((prize) => (
                <div key={prize.id} className="flex items-center gap-2 text-gray-600">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: prize.color }}
                  ></div>
                  <span>{prize.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySpinWheel;