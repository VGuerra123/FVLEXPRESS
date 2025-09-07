import React from 'react';
import { MapPin, Building2 } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

export const TechnologySection: React.FC = () => {
  const { language } = useLanguage();
  const t = (key: string) => translations[key]?.[language] || key;

  const rmCommunities = [
    'Santiago Centro', 'Las Condes', 'Providencia', 'Ñuñoa', 'La Reina',
    'Vitacura', 'Lo Barnechea', 'Huechuraba', 'Quilicura', 'Maipú',
    'Pudahuel', 'Cerrillos'
  ];

  const districts = [
    { name: 'Las Condes', angle: 0, radius: 120 },
    { name: 'Providencia', angle: 60, radius: 100 },
    { name: 'Ñuñoa', angle: 120, radius: 110 },
    { name: 'Maipú', angle: 180, radius: 130 },
    { name: 'Puente Alto', angle: 240, radius: 120 },
    { name: 'San Bernardo', angle: 300, radius: 110 },
  ];

  return (
    <section
      id="rm-coverage"
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50/50 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Principales Comunas */}
        <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 shadow-soft">
          <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            {language === 'es'
              ? 'Principales Comunas'
              : language === 'en'
              ? 'Main Communes'
              : '主要社区'}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-blue-700 text-sm">
            {rmCommunities.map((community, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 bg-white/60 rounded-lg hover:bg-white/80 transition-colors duration-200 group"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full animate-pulse" />
                <span className="group-hover:text-blue-900 transition-colors duration-200">
                  {community}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Red de Distribución RM mejorada */}
        <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl p-10 border border-blue-200/50 shadow-soft flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Nodo Central */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse relative z-10">
              <Building2 className="w-10 h-10 text-white" />
            </div>

            {/* Líneas y Nodos Satélites */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              {districts.map((district, i) => {
                const angle = (district.angle * Math.PI) / 180;
                const x = Math.cos(angle) * district.radius + 144; // centro 144
                const y = Math.sin(angle) * district.radius + 144;
                return (
                  <line
                    key={i}
                    x1="144"
                    y1="144"
                    x2={x}
                    y2={y}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>

            {districts.map((district, i) => {
              const angle = (district.angle * Math.PI) / 180;
              const x = Math.cos(angle) * district.radius;
              const y = Math.sin(angle) * district.radius;
              return (
                <div
                  key={i}
                  className="absolute w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-300 rounded-full flex items-center justify-center shadow-md animate-bounce"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${i * 0.2}s`,
                  }}
                  title={district.name}
                >
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              );
            })}
          </div>

          <h3 className="text-xl font-bold text-blue-900 mt-6">
            {language === 'es'
              ? 'Red de Distribución RM'
              : language === 'en'
              ? 'RM Distribution Network'
              : '大都会分销网络'}
          </h3>
          <p className="text-blue-700 text-sm mt-2">
            {language === 'es'
              ? 'Conectando 52 comunas con tecnología avanzada'
              : language === 'en'
              ? 'Connecting 52 communes with advanced technology'
              : '通过先进技术连接52个社区'}
          </p>
        </div>
      </div>
    </section>
  );
};
