'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, TrendingUp, Star } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  RadialBarChart, RadialBar
} from 'recharts';

export const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const t = (key: string) => translations[key]?.[language] || key;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [effectiveness, setEffectiveness] = useState(0);

  const heroSlides = [
    {
      title: t('heroTitle'),
      subtitle: t('heroSubtitle'),
      image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      stats: { packages: '+ 1.7M', cities: '52', speed: '24h' }
    },
    {
      title: language === 'es' ? 'Bodega Logística' : language === 'en' ? 'Smart Warehouse' : '智能仓库',
      subtitle: language === 'es' ? 'Almacenamiento seguro con tecnología de gestión avanzada' : language === 'en' ? 'Secure storage with IoT technology and automated management' : '采用物联网技术和自动化管理的安全存储',
      image: 'https://images.pexels.com/photos/6169056/pexels-photo-6169056.jpeg',
      stats: { space: '500 m²', security: '24/7', coverage: '100%' }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Animación efectividad
  useEffect(() => {
    let value = 0;
    const interval = setInterval(() => {
      value += 2;
      if (value >= 98) {
        value = 98;
        clearInterval(interval);
      }
      setEffectiveness(value);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const currentHero = heroSlides[currentSlide];

  const barData = [
    { name: language === 'es' ? 'En Tránsito' : 'In Transit', value: 1847 },
    { name: language === 'es' ? 'Hoy' : 'Today', value: 3291 },
  ];

  const radialData = [{ name: 'Efectividad', value: effectiveness, fill: '#2563eb' }];

  // Funciones para scroll suave a secciones
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-sky-100">
      {/* Fondo dinámico */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${slide.image})` }} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-sky-100/85 backdrop-blur-sm" />
          </div>
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-screen py-20">

          {/* Texto izquierdo */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  {language === 'es' ? 'Líderes en RM desde 2023' : 'RM Leaders since 2023'}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-sky-600 bg-clip-text text-transparent">
                  {currentHero.title}
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed text-blue-800/90 max-w-2xl">
                {currentHero.subtitle}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-8">
              {Object.entries(currentHero.stats).map(([key, value]) => (
                <div key={key} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-200/50 shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-black text-blue-900 mb-2">{value}</div>
                    <div className="text-xs sm:text-sm text-blue-700 font-medium leading-tight">
                      {key === 'packages' && (language === 'es' ? 'Paquetes' : 'Packages')}
                      {key === 'cities' && (language === 'es' ? 'Comunas RM' : 'RM Communes')}
                      {key === 'speed' && (language === 'es' ? 'Velocidad' : 'Speed')}
                      {key === 'space' && (language === 'es' ? 'Espacio' : 'Space')}
                      {key === 'security' && (language === 'es' ? 'Seguridad' : 'Security')}
                      {key === 'coverage' && (language === 'es' ? 'Cobertura' : 'Coverage')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA integrado */}
            <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-sky-50 rounded-3xl border border-blue-200/50 shadow-soft">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-soft mb-6">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">
                  {language === 'es' ? 'Únete a Nosotros' : language === 'en' ? 'Join Us' : '加入我们'}
                </span>
              </div>
              
              <h4 className="text-2xl font-bold text-blue-900 mb-4">
                {language === 'es' ? '¿Listo para formar parte de nuestra historia?' : 
                language === 'en' ? 'Ready to be part of our story?' : 
                '准备成为我们故事的一部分吗？'}
              </h4>
              <p className="text-blue-700 mb-6 max-w-2xl mx-auto leading-relaxed">
                {language === 'es' 
                  ? 'Únete a miles de empresas que confían en F&V Logistics Express para sus necesidades de logística y almacenamiento.' 
                  : language === 'en' 
                  ? 'Join thousands of companies that trust F&V Logistics Express for their logistics and storage needs.' 
                  : '加入数千家信任F&V物流快递满足其物流和存储需求的公司。'}
              </p>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToSection('contact-form')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  {language === 'es' ? 'Solicitar Cotización Ahora' : 'Request a Quote Now'}
                </button>
                <button
                  onClick={() => scrollToSection('tracking')}
                  className="px-8 py-4 bg-white/90 backdrop-blur-sm text-blue-900 rounded-2xl font-bold text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 border border-blue-200/50 shadow"
                >
                  {language === 'es' ? 'Seguimiento de tu Pedido' : 'Track Your Order'}
                </button>
              </div>
            </div>
          </div>

          {/* Panel de control */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200/50 shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-blue-900 font-bold text-lg sm:text-xl flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  <span>{language === 'es' ? 'Panel de Control' : 'Control Panel'}</span>
                </h3>
              </div>

              {/* Gráficos responsivos */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Radial primero en mobile */}
                <div className="h-64 bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl p-4 shadow-md flex flex-col items-center justify-center relative order-1 md:order-none">
                  <h4 className="text-blue-700 font-semibold mb-3 text-sm sm:text-base">{language === 'es' ? 'Efectividad' : 'Efficiency'}</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="70%"
                      outerRadius="100%"
                      barSize={14}
                      data={radialData}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <RadialBar background dataKey="value" cornerRadius={30} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-blue-900 text-2xl">
                    {effectiveness}%
                  </div>
                </div>

                {/* Barras */}
                <div className="h-64 bg-gradient-to-br from-blue-50 to-sky-100 rounded-2xl p-4 shadow-md">
                  <h4 className="text-blue-700 font-semibold mb-3 text-sm sm:text-base">{language === 'es' ? 'Paquetes y Entregas' : 'Packages & Deliveries'}</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis dataKey="name" stroke="#1e40af" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores de slides */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-blue-600 w-8 shadow' : 'bg-blue-300 hover:bg-blue-400 w-3'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
