import React from 'react';
import { 
  Truck, 
  Warehouse, 
  Monitor, 
  Headphones, 
  Shield, 
  Smartphone,
  MapPin,
  Clock,
  Camera,
  Package,
  Zap,
  Users,
  CheckCircle,
  Star
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

export const ServicesSection: React.FC = () => {
  const { language } = useLanguage();
  const t = (key: string) => translations[key]?.[language] || key;

  const mainServices = [
    {
      icon: Truck,
      title: t('lastMileDelivery'),
      description: t('Tecnologia de vanguardia y profesionalismo.'),
      features: [
        language === 'es' ? 'Entrega al día siguiente en RM' : language === 'en' ? 'Same day delivery in RM' : 'RM当日送达',
      ,
      ],
      gradient: 'from-blue-500 to-sky-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      delay: '0s'
    },
    {
      icon: Warehouse,
      title: t('warehouseStorage'),
      description: t('warehouseDesc'),
      features: [
        language === 'es' ? 'Desde 50 m² hasta 500+ m²' : language === 'en' ? 'From 50 m² to 500+ m²' : '从50平方米到500+平方米',
        
            ],
      gradient: 'from-sky-500 to-cyan-500',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      delay: '0.1s'
    },
    {
      icon: Monitor,
      title: t('realTimeMonitoring'),
      description: t('Tecnoligia con alertas automaticas.'),
      features: [
      
      
        language === 'es' ? 'Reportes detallados' : language === 'en' ? 'Detailed reports' : '详细报告'
      ],
      gradient: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      delay: '0.2s'
    }
  ];

  const additionalServices = [
    {
      icon: Headphones,
      title: t('support247'),
      description: t('supportDesc'),
      gradient: 'from-blue-600 to-sky-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Shield,
      title: t('secureDelivery'),
      description: t('secureDesc'),
      gradient: 'from-sky-600 to-cyan-600',
      bgColor: 'bg-sky-50'
    },
    {
      icon: Smartphone,
      title: t('driverApp'),
      description: t('driverDesc'),
      gradient: 'from-cyan-600 to-blue-600',
      bgColor: 'bg-cyan-50'
    }
  ];



  return (
    <section id="services" className="py-20 bg-gradient-to-br from-white via-blue-50/60 to-blue-100/40 relative overflow-hidden">
      
      {/* Elegant Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-blue-200/40 shadow-soft mb-6">
            <Star className="w-4 h-4 text-blue-600 fill-current" />
            <span className="text-sm font-bold text-blue-800">
              {language === 'es' ? 'Servicios Premium' : language === 'en' ? 'Premium Services' : '优质服务'}
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              {t('servicesTitle')}
            </span>
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
            {t('servicesSubtitle')}
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {mainServices.map((service, index) => (
            <div
              key={index}
              className={`group relative ${service.bgColor}/90 backdrop-blur-sm rounded-3xl p-8 hover:shadow-medium transition-all duration-500 transform hover:-translate-y-2 border ${service.borderColor}/40`}
              style={{ animationDelay: service.delay }}
            >
              
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-blue-800 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-blue-700 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3 text-blue-800">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {additionalServices.map((service, index) => (
            <div
              key={index}
              className={`group ${service.bgColor}/90 backdrop-blur-sm rounded-2xl p-6 hover:shadow-soft transition-all duration-300 transform hover:-translate-y-1 border border-blue-200/40`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              
              <h4 className="text-xl font-bold text-blue-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                {service.title}
              </h4>
              
              <p className="text-blue-700 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>



        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-50/80 to-blue-100/60 rounded-3xl p-8 border border-blue-200/40 shadow-soft">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-blue-200/40 shadow-soft mb-6">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-800">
              {language === 'es' ? 'Servicio Premium Garantizado' : 
               language === 'en' ? 'Premium Service Guaranteed' : 
               '保证优质服务'}
            </span>
          </div>
          
          <h4 className="text-2xl font-bold text-blue-800 mb-4">
            {language === 'es' ? '¿Listo para optimizar tu logística?' : 
             language === 'en' ? 'Ready to optimize your logistics?' : 
             '准备优化您的物流吗？'}
          </h4>
          
          <p className="text-blue-700 mb-8 max-w-2xl mx-auto">
            {language === 'es' ? 'Únete a la red de empresas que confían en F&V Logistics Express para sus necesidades de envío y almacenamiento.' : 
             language === 'en' ? 'Join over 15,000 companies that trust F&V Logistics Express for their shipping and storage needs.' : 
             '加入超过15,000家信任F&V物流快递满足其运输和存储需求的公司。'}
          </p>
          
          <button
            onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-medium"
          >
            {language === 'es' ? 'Solicitar Cotización Gratuita' : 
            language === 'en' ? 'Request Free Quote' : 
            '申请免费报价'}
          </button>
        </div>
      </div>
    </section>
  );
};