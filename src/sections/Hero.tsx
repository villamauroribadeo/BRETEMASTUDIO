import React from 'react';
import { motion } from 'motion/react';
import LucideIcon from '../components/LucideIcon';

interface HeroProps {
  onCtaClick: (targetSelector: string) => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const handleScrollTo = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    onCtaClick(selector);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#060F1E] flex items-center pt-24 overflow-hidden text-white"
    >
      {/* Fullscreen Immersion Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-[#060F1E]">
        <video
          src="/images/hero-faro-amanecer.mp4"
          className="absolute inset-0 w-full h-full object-cover scale-100 brightness-[1.35] saturate-[1.45] contrast-[1.05]"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Mist-inspired atmospheric overlay mimicking deep Atlantic/Cantabrian tide & Galician sea mist */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060F1E]/60 via-[#060F1E]/20 to-[#060F1E]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E]/20 via-transparent to-[#060F1E]/20" />
      </div>

      {/* Decorative ambient coastal flares */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 py-12 flex flex-col items-start">
        {/* Top Pill / Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-wrap items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <LucideIcon name="Sparkles" size={12} className="text-sky-300" />
          <span>Diseño Web por Suscripción Mensual</span>
          <span className="text-white/40">•</span>
          <span className="text-sky-200">Renting con Ventajas Fiscales</span>
        </motion.div>

        {/* Gigantic Title - Spanning Full Width & Occupying Single Line */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-dubiel text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] text-white leading-tight tracking-tight font-normal mb-8 text-left w-full lg:whitespace-nowrap overflow-hidden text-ellipsis"
        >
          Webs por Suscripción o Renting.
        </motion.h1>

        {/* Content columns below the full-width title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
          
          {/* Left Column: Description, Actions, Trust Indicators */}
          <div className="lg:col-span-10 flex flex-col items-start">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-lg sm:text-xl text-white/90 leading-relaxed mb-4 max-w-2xl text-left"
            >
              Una web rápida, moderna y optimizada. Sin inversión inicial, con mantenimiento y soporte incluidos. Te alquilamos tu web, con ventajas fiscales para Autónomos y Empresas.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-300 text-left mb-8 border-l-2 border-sky-400 pl-3.5"
            >
              DISEÑAMOS O RENOVAMOS TU IMAGEN DE MARCA.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 w-full"
            >
              <a
                href="#contacto"
                onClick={(e) => handleScrollTo(e, '#contacto')}
                className="w-full sm:w-[260px] flex items-center justify-center gap-2 bg-sky-500/25 hover:bg-sky-500/40 backdrop-blur-md border border-sky-400/40 hover:border-sky-400/60 text-white py-4 rounded-xl font-sans text-sm font-bold transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] hover:-translate-y-1 transform active:scale-95"
              >
                Empezar Hoy
                <LucideIcon name="Sparkles" size={16} />
              </a>
              <a
                href="#precios"
                onClick={(e) => handleScrollTo(e, '#precios')}
                className="w-full sm:w-[260px] flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/30 text-white py-4 rounded-xl font-sans text-sm font-semibold transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:-translate-y-1 transform active:scale-95"
              >
                Ver Planes y Precios
                <LucideIcon name="ArrowRight" size={16} />
              </a>
              <a
                href="#proceso"
                onClick={(e) => handleScrollTo(e, '#proceso')}
                className="w-full sm:w-[260px] flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 text-white/90 hover:text-white py-4 rounded-xl font-sans text-sm font-semibold transition-all duration-300 hover:-translate-y-1 transform active:scale-95"
              >
                Conoce Nuestro Proceso
              </a>
            </motion.div>

            {/* Quick value trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 border-t border-white/10 mt-12 pt-8 w-full max-w-2xl"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:border-sky-400/35 hover:bg-white/10">
                <span className="block font-serif text-2xl font-bold text-sky-300">100%</span>
                <span className="block font-sans text-[10px] sm:text-xs font-semibold text-white/70 uppercase tracking-wider mt-1">Suscripción Simple</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:border-sky-400/35 hover:bg-white/10">
                <span className="block font-serif text-2xl font-bold text-sky-300">&lt;24h</span>
                <span className="block font-sans text-[10px] sm:text-xs font-semibold text-white/70 uppercase tracking-wider mt-1">Soporte Rápido</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:border-sky-400/35 hover:bg-white/10">
                <span className="block font-serif text-2xl font-bold text-sky-300">SEO</span>
                <span className="block font-sans text-[10px] sm:text-xs font-semibold text-white/70 uppercase tracking-wider mt-1">Optimizado de Base</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
