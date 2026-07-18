import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Servicios from './sections/Servicios';
import Proceso from './sections/Proceso';
import Portfolio from './sections/Portfolio';
import Precios from './sections/Precios';
import Testimonios from './sections/Testimonios';
import Contacto from './sections/Contacto';
import AdminDashboard from './components/AdminDashboard';
import { CMSContent } from './types';
import LucideIcon from './components/LucideIcon';
import CookieBanner from './components/CookieBanner';
import LegalPages from './components/LegalPages';
import ServiceDetailPages from './components/ServiceDetailPages';

export default function App() {
  const [content, setContent] = useState<CMSContent | null>(null);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLegalView, setCurrentLegalView] = useState<'none' | 'aviso-legal' | 'politica-privacidad' | 'politica-cookies' | 'terminos-servicio'>('none');
  const [activeServiceView, setActiveServiceView] = useState<'none' | 'diseno' | 'alquiler' | 'seo'>('none');
  const [forceShowCookieSettings, setForceShowCookieSettings] = useState(false);

  // Load CMS Content from backend database
  const loadContent = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching CMS content:', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // Dynamically update document head SEO titles & tags!
  useEffect(() => {
    if (content?.seo) {
      document.title = content.seo.metaTitle || 'Bretema Studio | Diseño Web';
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', content.seo.metaDescription || '');

      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', content.seo.keywords || '');
    }
  }, [content]);

  const handleCtaScroll = (selector: string) => {
    const element = document.querySelector(selector);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    // Smoothly scroll down to contact form
    const contactSection = document.querySelector('#contacto');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading || !content) {
    return (
      <div className="min-h-screen bg-[#060F1E] flex flex-col items-center justify-center gap-4">
        <LucideIcon name="RefreshCw" size={36} className="text-sky-300 animate-spin" />
        <span className="font-serif text-lg font-medium text-white">Cargando Bretema Studio...</span>
      </div>
    );
  }

  if (isAdminMode) {
    return (
      <>
        {/* Navigation is rendered inside dashboard to support logout and toggle */}
        <Navigation
          onAdminClick={() => setIsAdminMode(true)}
          isAdmin={true}
          onExitAdmin={() => setIsAdminMode(false)}
        />
        <AdminDashboard
          onExit={() => setIsAdminMode(false)}
          content={content}
          onRefreshContent={loadContent}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#060F1E] flex flex-col relative">
      
      {/* Dynamic SEO Tag in margin (Architectural honesty guideline: human-centered, minimalist margin elements) */}
      <div className="hidden xl:flex fixed left-6 top-1/2 transform -translate-y-1/2 -rotate-90 origin-left items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-sky-300 select-none opacity-40 z-30 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
        <span>Desarrollo Web Premium</span>
        <span className="w-6 h-px bg-sky-400/50"></span>
        <span>Estudio Digital</span>
      </div>

      <div className="hidden xl:flex fixed right-6 top-1/2 transform -translate-y-1/2 rotate-90 origin-right items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-sky-300 select-none opacity-40 z-30 pointer-events-none">
        <span>Inspirado por el Cantábrico</span>
        <span className="w-6 h-px bg-sky-400/50"></span>
        <span>Est. 2026</span>
      </div>

      {/* Main sticky navigation bar */}
      <Navigation
        onAdminClick={() => setIsAdminMode(true)}
        isAdmin={false}
        onExitAdmin={() => setIsAdminMode(false)}
        onExitLegalView={() => {
          setCurrentLegalView('none');
          setActiveServiceView('none');
        }}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {activeServiceView !== 'none' ? (
          <ServiceDetailPages
            service={activeServiceView}
            onClose={() => setActiveServiceView('none')}
            onSelectPlan={handleSelectPlan}
          />
        ) : currentLegalView === 'none' ? (
          <>
            <Hero onCtaClick={handleCtaScroll} />
            <About onCtaClick={handleCtaScroll} />
            <Servicios 
              services={content.services} 
              onSelectService={(serviceType) => setActiveServiceView(serviceType)}
            />
            <Proceso processSteps={content.process} />
            <Portfolio portfolioItems={content.portfolio} />
            <Precios plans={content.plans} onSelectPlan={handleSelectPlan} />
            <Testimonios testimonials={content.testimonials} />
            <Contacto selectedPlan={selectedPlan} onClearPlan={() => setSelectedPlan('')} />
          </>
        ) : (
          <LegalPages
            view={currentLegalView}
            onClose={() => setCurrentLegalView('none')}
            onOpenCookieSettings={() => setForceShowCookieSettings(true)}
          />
        )}
      </main>

      {/* Premium Coastal Inspired Footer */}
      <footer className="bg-[#040A14] text-[#FAF9F6] pt-16 pb-12 border-t border-white/10 relative overflow-hidden text-left">
        {/* Background shapes */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          
          {/* Logo Brand info */}
          <div className="md:col-span-1 flex flex-col items-start gap-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-white">Brétema Studio Web</span>
            <p className="font-sans text-xs text-white/70 leading-relaxed max-w-xs">
              Diseño web sofisticado, rápido y de alto impacto por suscripción mensual. Inspirado en la naturaleza y la elegancia costera de Ribadeo.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-start gap-3">
            <h4 className="font-serif text-sm font-bold text-sky-300 uppercase tracking-wider">Enlaces Rápidos</h4>
            <div className="flex flex-col gap-2 font-sans text-xs text-white/80">
              <a href="#hero" onClick={(e) => { e.preventDefault(); setCurrentLegalView('none'); setActiveServiceView('none'); handleCtaScroll('#hero'); }} className="hover:text-sky-300 transition-colors">Inicio</a>
              <a href="#servicios" onClick={(e) => { e.preventDefault(); setCurrentLegalView('none'); setActiveServiceView('none'); handleCtaScroll('#servicios'); }} className="hover:text-sky-300 transition-colors">Servicios</a>
              <a href="#proceso" onClick={(e) => { e.preventDefault(); setCurrentLegalView('none'); setActiveServiceView('none'); handleCtaScroll('#proceso'); }} className="hover:text-sky-300 transition-colors">Nuestro Proceso</a>
              <a href="#portfolio" onClick={(e) => { e.preventDefault(); setCurrentLegalView('none'); setActiveServiceView('none'); handleCtaScroll('#portfolio'); }} className="hover:text-sky-300 transition-colors">Portfolio</a>
              <a href="#precios" onClick={(e) => { e.preventDefault(); setCurrentLegalView('none'); setActiveServiceView('none'); handleCtaScroll('#precios'); }} className="hover:text-sky-300 transition-colors">Tarifas y Planes</a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-start gap-3">
            <h4 className="font-serif text-sm font-bold text-sky-300 uppercase tracking-wider">Contacto</h4>
            <div className="flex flex-col gap-2 font-sans text-xs text-white/80">
              <a href="tel:+34661965144" className="flex items-center gap-1.5 hover:text-sky-300 transition-colors"><LucideIcon name="Phone" size={12} className="text-sky-300" /> +34 661 96 51 44</a>
              <span className="flex items-center gap-1.5"><LucideIcon name="Mail" size={12} className="text-sky-300" /> hola@bretemastudio.com</span>
              <span className="flex items-center gap-1.5"><LucideIcon name="MapPin" size={12} className="text-sky-300" /> Ribadeo, Galicia (España)</span>
              <span className="flex items-center gap-1.5"><LucideIcon name="Sparkles" size={12} className="text-sky-300" /> Atendemos de Lunes a Viernes</span>
            </div>
          </div>

          {/* Legal Pages Column replacing Premium Subscription */}
          <div className="flex flex-col items-start gap-3">
            <h4 className="font-serif text-sm font-bold text-sky-300 uppercase tracking-wider">Información Legal</h4>
            <div className="flex flex-col gap-2 font-sans text-xs text-white/80 items-start">
              <button
                onClick={() => { setCurrentLegalView('aviso-legal'); setActiveServiceView('none'); }}
                className="hover:text-sky-300 transition-colors text-left font-sans"
              >
                Aviso Legal
              </button>
              <button
                onClick={() => { setCurrentLegalView('politica-privacidad'); setActiveServiceView('none'); }}
                className="hover:text-sky-300 transition-colors text-left font-sans"
              >
                Política de Privacidad
              </button>
              <button
                onClick={() => { setCurrentLegalView('politica-cookies'); setActiveServiceView('none'); }}
                className="hover:text-sky-300 transition-colors text-left font-sans"
              >
                Política de Cookies
              </button>
              <button
                onClick={() => { setCurrentLegalView('terminos-servicio'); setActiveServiceView('none'); }}
                className="hover:text-sky-300 transition-colors text-left font-sans"
              >
                Términos de Servicio
              </button>
              <button
                onClick={() => setForceShowCookieSettings(true)}
                className="hover:text-sky-300 transition-colors text-left flex items-center gap-1 mt-1 text-sky-300/90 font-medium font-sans"
              >
                <LucideIcon name="Cookie" size={12} />
                Preferencias de Cookies
              </button>
            </div>
            {/* Direct Admin panel trigger */}
            <button
              onClick={() => setIsAdminMode(true)}
              className="mt-3 text-sky-300 hover:text-white border border-sky-400/30 hover:border-sky-300/60 bg-sky-500/10 px-3 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300"
            >
              <LucideIcon name="Settings" size={12} />
              Acceso Gestor CMS
            </button>
          </div>

        </div>

        {/* Love subfooter ribbon */}
        <div className="w-full text-center mt-12 pt-6 border-t border-white/5 relative z-10">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-sky-300/80 font-bold flex items-center justify-center gap-1.5">
            DISEÑO WEB DESDE RIBADEO WITH LOVE <span className="text-red-500 font-sans">❤️</span>
          </p>
        </div>

        {/* Bottom copy row */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/10 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[10px] text-white/50 relative z-10">
          <span>&copy; {new Date().getFullYear()} Brétema Studio Web. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <button onClick={() => { setCurrentLegalView('politica-privacidad'); setActiveServiceView('none'); }} className="hover:text-sky-300 transition-colors font-sans">Política de Privacidad</button>
            <button onClick={() => { setCurrentLegalView('terminos-servicio'); setActiveServiceView('none'); }} className="hover:text-sky-300 transition-colors font-sans">Términos de Servicio</button>
            <button onClick={() => { setCurrentLegalView('aviso-legal'); setActiveServiceView('none'); }} className="hover:text-sky-300 transition-colors font-sans">Aviso Legal</button>
          </div>
        </div>

      </footer>

      <CookieBanner
        forceShowSettings={forceShowCookieSettings}
        onSettingsClosed={() => setForceShowCookieSettings(false)}
      />

    </div>
  );
}
