'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollEffects } from '../hooks/useScrollEffects';

interface HeaderProps {
  homeUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({ homeUrl = '/#home' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, changeLanguage } = useLanguage();

  const { scrollY } = useScrollEffects();
  const isScrolled = scrollY > 20;

  const sections = ['home', 'services', 'about', 'rm-coverage', 'tracking', 'contact-form'];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveSection(id),
        { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const menuItems = [
    { id: 'home', href: '#home', label: 'Inicio' },
    { id: 'about', href: '#about', label: 'Nosotros' },
    { id: 'services', href: '#services', label: 'Servicios' },
    { id: 'tracking', href: '#tracking', label: 'Seguimiento' },
    { id: 'contact-form', href: '#contact-form', label: 'Solicitar Cotización Gratuita' },
    { id: 'marketplace', href: '/marketplace', label: 'Marketplace' },
  ];

  const logoSize = 'h-12 w-12 md:h-14 md:w-14';

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const el = document.getElementById('home');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', '#home');
      else window.location.hash = 'home';
    } else {
      window.location.assign(homeUrl);
    }
  };

  const shellClass = `
    transition-all duration-500 rounded-2xl mt-4 backdrop-blur-xl border
    bg-white/95 border-gray-200/60 text-slate-800 shadow-lg
  `;

  const navLinkClass = (active: boolean) =>
    `relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2
     ${active
        ? 'text-blue-600 bg-blue-50 focus-visible:ring-blue-500/60'
        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50 focus-visible:ring-blue-500/60'}
    `;

  const iconWrapClass = `
    relative p-2.5 rounded-xl transition-colors duration-200 focus:outline-none focus-visible:ring-2
    bg-slate-50 hover:bg-slate-100 text-slate-600 focus-visible:ring-blue-500/60
  `;

  const langDropdownClass = `
    absolute right-0 mt-2 w-40 rounded-xl overflow-hidden transition
    bg-white border border-gray-200/60 shadow-lg invisible opacity-0 group-hover:visible group-hover:opacity-100
  `;

  const mobileSheetClass = `
    lg:hidden rounded-b-2xl backdrop-blur-xl border border-gray-200/60 bg-white/95
  `;

  return (
    <header className="fixed top-0 left-0 right-0 z-50" aria-label="Barra de navegación principal">
      {/* ✅ style corregido */}
      <style>{`
        .blue-metallic {
          background: linear-gradient(
            120deg,
            #1E47BD 0%,
            #2563EB 25%,
            #F9FAFB 50%,
            #2563EB 75%,
            #1E47BD 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s linear infinite;
          text-shadow: 0 0 10px rgba(37, 99, 235, 0.4);
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={shellClass}>
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            {/* Logo + Nombre empresa */}
            <a
              href="#home"
              onClick={handleLogoClick}
              className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-md"
              aria-label="Ir al inicio"
            >
              <img
                src="/avatar.png"
                alt="Avatar"
                className={`${logoSize} object-cover rounded-full shadow-md border border-gray-200`}
                draggable={false}
                loading="eager"
                decoding="async"
              />
              <span className="blue-metallic font-extrabold text-xl md:text-2xl tracking-tight">
                FVL Express
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Secciones del sitio">
              {menuItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={navLinkClass(active)}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Acciones Derecha */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block relative group">
                <button
                  className={`${iconWrapClass} flex items-center gap-2`}
                  aria-haspopup="menu"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium text-slate-700">
                    {language === 'es' ? 'ES' : language === 'en' ? 'EN' : 'ZH'}
                  </span>
                </button>

                <div className={langDropdownClass}>
                  {[
                    { code: 'es', name: 'Español', flag: '🇪🇸' },
                    { code: 'en', name: 'English', flag: '🇺🇸' },
                    { code: 'zh', name: '中文', flag: '🇨🇳' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code as 'es' | 'en' | 'zh')}
                      className={`w-full px-4 py-3 text-left transition-colors duration-200 ${
                        language === lang.code
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span>{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Mobile */}
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className={iconWrapClass}
                aria-label="Abrir menú"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={mobileSheetClass}>
              <nav className="px-6 py-4 space-y-2" aria-label="Menú móvil">
                {menuItems.map((item) => {
                  const active = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-3 px-4 rounded-xl font-medium transition-colors duration-200 ${
                        active
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
