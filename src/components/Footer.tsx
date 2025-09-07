import React from 'react';
import { Package, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = (key: string) => translations[key]?.[language] || key;

  const socialLinks = [
    { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
  ];
  

  return (
    <footer className="bg-gradient-to-br from-primary-950 via-primary-900 to-accent-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img 
                src="/Logo_Oficial.png" 
                alt="F&V Logistics Express" 
                className="w-12 h-12 object-contain bg-white/10 rounded-lg p-1"
              />
              <div>
                <h3 className="text-xl font-bold">{t('company')}</h3>
                <p className="text-sm opacity-80">Logistica Premium</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              {language === 'es' ? 'Liderando el futuro de la logística con tecnología avanzada y servicio excepcional.' :
               language === 'en' ? 'Leading the future of logistics with advanced technology and exceptional service.' :
               '以先进技术和卓越服务引领物流未来。'}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('services')}</h4>
            <ul className="space-y-2">
              {[
                language === 'es' ? 'Entrega Última Milla' : language === 'en' ? 'Last Mile Delivery' : '最后一公里配送',
                language === 'es' ? 'Almacenamiento' : language === 'en' ? 'Storage' : '存储',
                language === 'es' ? 'Logística Empresarial' : language === 'en' ? 'Business Logistics' : '企业物流',
                language === 'es' ? 'Seguimiento GPS' : language === 'en' ? 'GPS Tracking' : 'GPS跟踪',
                language === 'es' ? 'App Conductores' : language === 'en' ? 'Driver App' : '司机应用'
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-white/70">
                <Phone className="w-4 h-4" />
                <span>+56 9 3710 6957</span>
              </div>
              <div className="flex items-start space-x-2 text-white/70">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Santiago, Chile</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-white/70 text-sm mb-4">
              {t('newsletterDesc')}
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder={t('yourEmail')}
                className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent-400 transition-all duration-300"
              />
              <button className="w-full py-2 bg-gradient-to-r from-accent-500 to-primary-500 text-white rounded-lg font-semibold hover:from-accent-600 hover:to-primary-600 transition-all duration-300">
                {t('subscribeNewsletter')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/60 text-sm">
            © 2025 {t('company')}. {t('allRightsReserved')}.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
              {t('privacy')}
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
              {t('terms')}
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
              {t('cookies')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};