import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from '../components/LucideIcon';

interface HeroProps {
  onCtaClick: (targetSelector: string) => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const [showIntroText, setShowIntroText] = useState(true);

  useEffect(() => {
    // Let the "Brétema Studio Web" intro show at fullscreen with just the video, then fade out
    const textTimer = setTimeout(() => {
      setShowIntroText(false);
    }, 6000);

    return () => {
      clearTimeout(textTimer);
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    onCtaClick(selector);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#060F1E] flex items-center pt-24 overflow-hidden text-white"
    >
      {/* Fullscreen Immersion Background Video (Provided by user) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-[#060F1E]">
        <video
          src="https://jrwztepkvkeopglpjadi.supabase.co/storage/v1/object/sign/FOTOS%20VILLAMAURO/video%20desde%20el%20puente%20solo%20se%20mueve%20el%20agua.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGUxZTRiOC00ZmIwLTRhZjMtYmYwNy01NGQ1N2E4NTJiNjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGT1RPUyBWSUxMQU1BVVJPL3ZpZGVvIGRlc2RlIGVsIHB1ZW50ZSBzb2xvIHNlIG11ZXZlIGVsIGFndWEubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NDQ1NDg4MywiZXhwIjoyNjQ4MzY4NDgzfQ.eV5DL9q93ws6hfC2iBOpStEfJYbIiNOVG51pRjNOZ7o"
          className="absolute inset-0 w-full h-full object-cover scale-100 brightness-[1.2] saturate-[1.2] contrast-[1.1]"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Mist-inspired atmospheric overlay mimicking deep Atlantic tide & Galician sea mist */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060F1E]/40 via-transparent to-[#060F1E]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E]/10 via-transparent to-[#060F1E]/10" />
      </div>

      {/* Decorative ambient coastal flares */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* 1. Cinematic Fullscreen Intro Overlay (Just the video background + Centered text) */}
      <AnimatePresence>
        {showIntroText && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#060F1E]/40 backdrop-blur-[2px]"
          >
            <div className="flex flex-col items-center justify-center text-center px-6 select-none">
              <motion.h1
                initial={{ opacity: 0, letterSpacing: "0.1em", y: 15 }}
                animate={{ opacity: 1, letterSpacing: "0.22em", y: 0 }}
                exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extralight text-white tracking-[0.25em] leading-none uppercase"
              >
                Ribadeo Studio Web
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: 0 }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                className="font-sans text-xs sm:text-sm md:text-base font-light text-sky-300 mt-6 tracking-[0.2em] uppercase"
              >
                Desde Ribadeo para el Mundo
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Hero Content (Appears as intro text dissolves) */}
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 relative z-10 py-16 flex flex-col items-center justify-center text-center">
        <AnimatePresence>
          {!showIntroText && (
            <motion.div
              key="hero-main-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center w-full"
            >
              {/* Gigantic Title - Inside an elegant frosted ice button/badge */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-10 w-full max-w-6xl xl:max-w-7xl px-4"
              >
                <a
                  href="#contacto"
                  onClick={(e) => handleScrollTo(e, '#contacto')}
                  className="inline-flex items-center justify-center w-full px-6 py-6 sm:px-10 sm:py-8 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-white/30 text-white transition-all duration-300 shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:shadow-[0_25px_60px_rgba(255,255,255,0.08)] hover:-translate-y-1 transform active:scale-[0.98] group cursor-pointer"
                >
                  <h1
                    className="font-serif text-[4.8vw] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-none tracking-tight font-light whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-3"
                  >
                    Webs por Suscripción o Renting
                    <LucideIcon name="Sparkles" size={24} className="text-sky-300 animate-pulse hidden sm:inline-block group-hover:scale-110 transition-transform duration-300" />
                  </h1>
                </a>
              </motion.div>

              {/* Center column: Description in navy blue text without container card */}
              <div className="flex flex-col items-center justify-center text-center w-full max-w-5xl xl:max-w-6xl mx-auto">
                <p className="font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#092847] leading-relaxed max-w-4xl mx-auto mb-10 text-center drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)]">
                  Una forma rápida moderna y optimizada de tener tu presencia online sin inversión inicial. Y con Ventajas Fiscales para Autónomos y Empresas.
                </p>

                <p
                  className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest text-sky-300 text-center mb-10 border-y border-sky-400/20 py-2.5 px-6 inline-block mx-auto"
                >
                  DISEÑAMOS O RENOVAMOS TU IMAGEN DE MARCA
                </p>

                {/* Actions - Centered and fully responsive */}
                <div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-5xl xl:max-w-6xl mx-auto mb-16"
                >
                  <a
                    href="#contacto"
                    onClick={(e) => handleScrollTo(e, '#contacto')}
                    className="w-full sm:w-[240px] flex items-center justify-center gap-2 bg-sky-500/25 hover:bg-sky-500/40 backdrop-blur-md border border-sky-400/40 hover:border-sky-400/60 text-white py-4 rounded-xl font-sans text-sm font-bold transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] hover:-translate-y-1 transform active:scale-95"
                  >
                    Empezar Hoy
                    <LucideIcon name="Sparkles" size={16} />
                  </a>
                  <a
                    href="#precios"
                    onClick={(e) => handleScrollTo(e, '#precios')}
                    className="w-full sm:w-[240px] flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/30 text-white py-4 rounded-xl font-sans text-sm font-semibold transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:-translate-y-1 transform active:scale-95"
                  >
                    Ver Planes y Precios
                    <LucideIcon name="ArrowRight" size={16} />
                  </a>
                  <a
                    href="#proceso"
                    onClick={(e) => handleScrollTo(e, '#proceso')}
                    className="w-full sm:w-[240px] flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 text-white/90 hover:text-white py-4 rounded-xl font-sans text-sm font-semibold transition-all duration-300 hover:-translate-y-1 transform active:scale-95"
                  >
                    Conoce Nuestro Proceso
                  </a>
                </div>

                {/* Quick value trust badges */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-10 w-full max-w-5xl xl:max-w-6xl mx-auto"
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:border-sky-400/35 hover:bg-white/10 flex flex-col items-center justify-center text-center">
                    <span className="block font-serif text-3xl font-normal text-sky-300">100%</span>
                    <span className="block font-sans text-[10px] sm:text-xs font-semibold text-white/70 uppercase tracking-wider mt-1.5">Suscripción Simple</span>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:border-sky-400/35 hover:bg-white/10 flex flex-col items-center justify-center text-center">
                    <span className="block font-serif text-3xl font-normal text-sky-300">&lt;24h</span>
                    <span className="block font-sans text-[10px] sm:text-xs font-semibold text-white/70 uppercase tracking-wider mt-1.5">Soporte Rápido</span>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:border-sky-400/35 hover:bg-white/10 flex flex-col items-center justify-center text-center">
                    <span className="block font-serif text-3xl font-normal text-sky-300">SEO</span>
                    <span className="block font-sans text-[10px] sm:text-xs font-semibold text-white/70 uppercase tracking-wider mt-1.5">Optimizado de Base</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
