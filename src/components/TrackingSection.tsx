import React, { useState } from 'react';
import { Search, Package, Truck, MapPin, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

export const TrackingSection: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { language } = useLanguage();
  const t = (key: string) => translations[key]?.[language] || key;

  const handleTrack = () => {
    if (!trackingNumber.trim()) return;

    setIsTracking(true);
    setShowResults(false);

    // Simulación API
    setTimeout(() => {
      setIsTracking(false);
      setShowResults(true);
    }, 2000);
  };

  const trackingSteps = [
    { 
      icon: Package, 
      title: t('packageReceived'), 
      time: '14:30', 
      date: '15 Ene 2025',
      status: 'completed',
      location: 'Centro de Distribución Santiago'
    },
    { 
      icon: Truck, 
      title: t('inTransit'), 
      time: '16:45', 
      date: '15 Ene 2025',
      status: 'completed',
      location: 'En ruta hacia Las Condes'
    },
    { 
      icon: MapPin, 
      title: t('distributionCenter'), 
      time: '18:20', 
      date: '15 Ene 2025',
      status: 'current',
      location: 'Centro Las Condes'
    },
    { 
      icon: CheckCircle, 
      title: t('delivered'), 
      time: '--:--', 
      date: '16 Ene 2025',
      status: 'pending',
      location: 'Dirección de destino'
    },
  ];

  return (
    <section
      id="tracking"
      className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-white relative overflow-hidden"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Encabezado de la Sección */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-soft mb-6">
            <Search className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold text-blue-900">
              {language === 'es'
                ? 'Seguimiento Avanzado'
                : language === 'en'
                ? 'Advanced Tracking'
                : '高级跟踪'}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4">
            {language === 'es'
              ? 'Seguimiento en Tiempo Real'
              : language === 'en'
              ? 'Real-Time Tracking'
              : '实时跟踪'}
          </h2>

          <p className="text-lg text-blue-700 max-w-2xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Rastrea tu paquete en cada etapa del proceso de entrega'
              : language === 'en'
              ? 'Track your package at every step of the delivery process'
              : '在交付过程的每个阶段跟踪您的包裹'}
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full mt-4" />
        </div>

        {/* Formulario de Tracking */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/50 shadow-soft">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
            <Package className="w-6 h-6 mr-3 text-blue-600" />
            {t('trackPackageButton')}
          </h3>

          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder={t('enterTrackingNumber')}
                className="w-full px-6 py-4 bg-blue-50/50 border border-blue-200/50 rounded-xl text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-blue-400" />
              </div>
            </div>

            <button
              onClick={handleTrack}
              disabled={!trackingNumber.trim() || isTracking}
              className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-glow"
            >
              <Search className={`w-5 h-5 ${isTracking ? 'animate-spin' : ''}`} />
              <span>{isTracking ? t('tracking') : t('track')}</span>
            </button>
          </div>

          {/* Ejemplos Rápidos */}
          <div className="mt-6 pt-6 border-t border-blue-100/50">
            <p className="text-sm text-blue-600 mb-3 font-medium">
              {language === 'es'
                ? 'Prueba con estos números:'
                : language === 'en'
                ? 'Try with these numbers:'
                : '尝试这些号码：'}
            </p>
            <div className="flex flex-wrap gap-2">
              {['FV2025001847', 'FV2025001848', 'FV2025001849'].map((num) => (
                <button
                  key={num}
                  onClick={() => setTrackingNumber(num)}
                  className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Estado Actual */}
        {showResults && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/50 shadow-soft animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-blue-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                {t('currentStatus')}
              </h4>
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-blue-700 text-sm font-medium">Live</span>
              </div>
            </div>

            <div className="space-y-6">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-soft ${
                      step.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : step.status === 'current'
                        ? 'bg-blue-500 text-white animate-pulse'
                        : 'bg-blue-100 text-blue-400'
                    }`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-bold text-blue-900 group-hover:text-blue-700 transition-colors duration-300">
                        {step.title}
                      </h5>
                      <div className="text-right">
                        <p className="text-blue-700 font-semibold text-sm">{step.time}</p>
                        <p className="text-blue-500 text-xs">{step.date}</p>
                      </div>
                    </div>
                    <p className="text-blue-600 text-sm">{step.location}</p>

                    {step.status === 'completed' && (
                      <div className="flex items-center mt-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600 text-xs font-medium">Completado</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Info del paquete */}
            <div className="mt-6 pt-6 border-t border-blue-100/50">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-600 font-medium">Número:</span>
                  <p className="text-blue-900 font-bold">{trackingNumber}</p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">ETA:</span>
                  <p className="text-blue-900 font-bold">2-4 horas</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
