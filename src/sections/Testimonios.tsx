import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimonial } from '../types';
import LucideIcon from '../components/LucideIcon';

interface TestimoniosProps {
  testimonials: Testimonial[];
}

export default function Testimonios({ testimonials }: TestimoniosProps) {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000); // Auto-scroll every 6 seconds
    return () => clearInterval(timer);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[index];

  return (
    <section id="testimonios" className="py-24 bg-[#060F1E] relative overflow-hidden border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-sans text-xs font-bold text-sky-300 uppercase tracking-widest bg-sky-500/10 px-3.5 py-2 rounded-full inline-block mb-4 border border-sky-400/20">
            Testimonios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[300px] flex flex-col justify-between bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10 shadow-[0_8px_32px_rgba(3,7,18,0.3)] hover:shadow-[0_20px_50px_rgba(56,189,248,0.15)] transition-all duration-500">
          {/* Quote Mark Icon */}
          <div className="absolute top-6 right-8 text-sky-300/15 pointer-events-none">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.192 15.757c0-.907-.188-1.745-.563-2.515.375-.769.563-1.606.563-2.513 0-.907-.188-1.745-.563-2.514C11.004 7.447 11.192 6.609 11.192 5.7c0-.907-.188-1.745-.563-2.513C10.254 2.417 9.542 2 8.5 2c-1.042 0-1.754.417-2.129 1.187C6 3.955 5.812 4.793 5.812 5.7c0 .907.188 1.745.563 2.514-.375.769-.563 1.606-.563 2.513 0 .907.188 1.745.563 2.514-.375.769-.563 1.606-.563 2.515 0 .907.188 1.745.563 2.514C6 19.583 6.712 20 7.75 20c1.042 0 1.754-.417 2.129-1.187C10.254 18.045 11.192 16.961 11.192 15.757zm7.616 0c0-.907-.188-1.745-.563-2.515.375-.769.563-1.606.563-2.513 0-.907-.188-1.745-.563-2.514.375-.769-.188-1.607-.188-2.514 0-.907.188-1.745.563-2.513C18.621 2.417 17.909 2 16.867 2c-1.042 0-1.754.417-2.129 1.187C14.363 3.955 14.175 4.793 14.175 5.7c0 .907.188 1.745.563 2.514-.375.769-.563 1.606-.563 2.513 0 .907.188 1.745.563 2.514-.375.769-.563 1.606-.563 2.515 0 .907.188 1.745.563 2.514C14.363 19.583 15.075 20 16.117 20c1.042 0 1.754-.417 2.129-1.187C18.621 18.045 18.808 16.961 18.808 15.757z" />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex-grow flex flex-col justify-center"
            >
              <p className="font-serif text-lg sm:text-xl text-white italic leading-relaxed text-left mb-8">
                "{current.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {current.avatar ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm border border-white/10 relative bg-white/5 flex-shrink-0">
                    <img
                      src={current.avatar}
                      alt={current.author}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-sky-500/25 border border-sky-400/20 text-sky-300 flex items-center justify-center font-bold shadow-sm font-serif flex-shrink-0">
                    {current.author.charAt(0)}
                  </div>
                )}
                <div className="text-left">
                  <h4 className="font-sans text-sm font-bold text-white">
                    {current.author}
                  </h4>
                  <p className="font-sans text-xs text-white/60">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-sky-500/25 hover:border-sky-400/40 hover:text-sky-300 flex items-center justify-center text-white transition-all duration-300 hover:shadow-[0_4px_12px_rgba(56,189,248,0.15)] transform active:scale-95"
              aria-label="Testimonio anterior"
            >
              <LucideIcon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-sky-500/25 hover:border-sky-400/40 hover:text-sky-300 flex items-center justify-center text-white transition-all duration-300 hover:shadow-[0_4px_12px_rgba(56,189,248,0.15)] transform active:scale-95"
              aria-label="Testimonio siguiente"
            >
              <LucideIcon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Ribadeo Atmosférico Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          {/* Elegant dark panel showcasing local Ribadeo conditions */}
          <div className="w-full bg-[#071324]/85 backdrop-blur-xl text-white rounded-3xl p-8 border border-white/10 shadow-2xl relative group flex flex-col justify-between transition-all duration-500 hover:border-sky-400/30 hover:shadow-[0_20px_50px_rgba(56,189,248,0.15)]">
            
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
                <span className="font-serif text-lg font-semibold text-white">Ribadeo</span>
              </div>
              <span className="font-mono text-xs text-sky-300 tracking-widest">GALICIA, ESPAÑA</span>
            </div>

            {/* Immersive parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-300 border border-white/5">
                  <LucideIcon name="Droplets" size={18} />
                </div>
                <div>
                  <span className="block font-sans text-[10px] text-white/50 uppercase tracking-wider">Estado del Agua</span>
                  <span className="block font-sans text-sm font-semibold text-white">Limpia &amp; Serena</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-300 border border-white/5">
                  <LucideIcon name="Compass" size={18} />
                </div>
                <div>
                  <span className="block font-sans text-[10px] text-white/50 uppercase tracking-wider">Coordenadas del Faro</span>
                  <span className="block font-mono text-xs text-white">43.5358° N, 7.0403° W</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-300 border border-white/5">
                  <LucideIcon name="Wind" size={18} />
                </div>
                <div>
                  <span className="block font-sans text-[10px] text-white/50 uppercase tracking-wider">Bruma Costera</span>
                  <span className="block font-sans text-sm font-semibold text-white">85% (Inmersiva)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-300 border border-white/5">
                  <LucideIcon name="Sun" size={18} />
                </div>
                <div>
                  <span className="block font-sans text-[10px] text-white/50 uppercase tracking-wider">Temperatura del Mar</span>
                  <span className="block font-sans text-sm font-semibold text-white">15°C</span>
                </div>
              </div>
            </div>

            {/* Bottom tag line */}
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <p className="font-sans text-xs text-white/80 italic leading-relaxed">
                "El diseño fluye como el agua del Cantábrico, ya que estamos en Ribadeo, Lugo."
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
