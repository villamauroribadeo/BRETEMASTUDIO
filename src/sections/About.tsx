import React from 'react';
import { motion } from 'motion/react';
import LucideIcon from '../components/LucideIcon';

interface AboutProps {
  onCtaClick: (targetSelector: string) => void;
}

export default function About({ onCtaClick }: AboutProps) {
  const handleScrollTo = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    onCtaClick(selector);
  };

  return (
    <section id="sobre-nosotros" className="py-24 bg-[#071324] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Beautiful Grid / Image Mockups */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-square rounded-2xl border border-white/10 p-6 flex flex-col justify-between text-white shadow-[0_8px_32px_rgba(3,7,18,0.3)] group hover:border-sky-400/40 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background image for Diseño Impecable */}
                <img
                  src="https://jrwztepkvkeopglpjadi.supabase.co/storage/v1/object/sign/FOTOS%20VILLAMAURO/11-BLUE&BLUE.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGUxZTRiOC00ZmIwLTRhZjMtYmYwNy01NGQ1N2E4NTJiNjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGT1RPUyBWSUxMQU1BVVJPLzExLUJMVUUmQkxVRS5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg0Mzc3NzY3LCJleHAiOjI2NDgyOTEzNjd9.REDX7-COjEj3FMZ0jSD0_e9YlDyPvBolPvZlRcHVjjA"
                  alt="Diseño Impecable Background"
                  className="absolute inset-0 w-full h-full object-cover scale-110 object-center transition-transform duration-700 group-hover:scale-115 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                {/* Heavy dark gradient overlay to completely hide any text in the image and ensure perfect readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/95 via-[#071324]/85 to-[#071324]/95 transition-all duration-300 group-hover:opacity-90" />

                <div className="relative z-10">
                  <LucideIcon name="Layers" size={32} className="text-sky-300" />
                </div>
                <div className="relative z-10 text-left">
                  <h4 className="font-serif text-lg font-bold text-white">Diseño Impecable</h4>
                  <p className="font-sans text-xs text-white/80 mt-1">Estructuras modernas inspiradas en la naturaleza.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="aspect-square rounded-2xl border border-white/10 p-6 flex flex-col justify-between text-white shadow-[0_8px_32px_rgba(3,7,18,0.3)] group hover:border-sky-400/40 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background image for Identidad */}
                <img
                  src="https://jrwztepkvkeopglpjadi.supabase.co/storage/v1/object/sign/FOTOS%20VILLAMAURO/02-faro3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGUxZTRiOC00ZmIwLTRhZjMtYmYwNy01NGQ1N2E4NTJiNjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGT1RPUyBWSUxMQU1BVVJPLzAyLWZhcm8zLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODQzNzc0MDcsImV4cCI6MjY0ODI5MTAwN30.Sw2q3nKyZOxl1pd4o_xWPBA4dPnf1n322Sd-1zBMmlw"
                  alt="Identidad Background"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                {/* Semi-transparent dark overlay for high contrast text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/90 via-[#071324]/75 to-[#071324]/90 transition-all duration-300 group-hover:opacity-85" />

                <div className="relative z-10">
                  <LucideIcon name="Palette" size={32} className="text-sky-300" />
                </div>
                <div className="relative z-10 text-left">
                  <h4 className="font-serif text-lg font-bold text-white">Identidad</h4>
                  <p className="font-sans text-xs text-white/80 mt-1">Colores costeros, texturas orgánicas y equilibrio.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="col-span-2 aspect-[2/1] rounded-2xl border border-white/10 p-8 flex items-center justify-between overflow-hidden relative group shadow-lg hover:border-sky-400/40 transition-all duration-300"
              >
                {/* Real studio photograph background with parallax-style hover zoom */}
                <img
                  src="https://jrwztepkvkeopglpjadi.supabase.co/storage/v1/object/sign/FOTOS%20VILLAMAURO/25-A%20BOAT%20UN%20THE%20NIEBLA.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGUxZTRiOC00ZmIwLTRhZjMtYmYwNy01NGQ1N2E4NTJiNjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGT1RPUyBWSUxMQU1BVVJPLzI1LUEgQk9BVCBVTiBUSEUgTklFQkxBLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODQzNzczMDYsImV4cCI6MjY0ODI5MDkwNn0.PA2GzqfnF6dDYxMslZC9HRMjk1QfNJbUUP588I17ZmY"
                  alt="Bretema Studio Workspace"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Sea-green/oceanic dark elegant gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E]/95 via-[#060F1E]/75 to-[#060F1E]/40" />
                
                <div className="max-w-[75%] relative z-10 text-left">
                  <span className="font-mono text-xs text-sky-300 font-semibold uppercase tracking-wider block mb-1">Inspiración</span>
                  <h4 className="font-serif text-xl font-bold text-white">La Esencia de la Bruma</h4>
                  <p className="font-sans text-xs text-white/90 mt-1.5 leading-relaxed">
                    "Brétema" significa niebla en gallego. Diseñamos con la pureza, fluidez y misterio del Cantábrico, moldeando experiencias web tan hermosas como la costa de Ribadeo.
                  </p>
                </div>
                <LucideIcon name="Compass" size={48} className="text-sky-300 opacity-60 flex-shrink-0 relative z-10 hidden sm:block" />
              </motion.div>
            </div>
          </div>

          {/* Right: Text Copy */}
          <div className="order-1 lg:order-2 flex flex-col items-start">
            <span className="font-sans text-xs font-bold text-sky-300 uppercase tracking-widest bg-sky-500/10 px-3.5 py-2 rounded-full mb-4 border border-sky-400/20">
              Nuestra Filosofía
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight mb-6 text-left">
              Buscamos la armonía entre estética orgánica y tecnología de vanguardia.
            </h2>
            <p className="font-sans text-base text-white/80 leading-relaxed mb-6 text-left">
              En Bretema Studio entendemos que el sitio web de tu negocio no es solo una tarjeta de presentación; es tu escaparate interactivo ante el mundo. No nos limitamos a programar plantillas; modelamos experiencias web que capturan el espíritu de tu marca.
            </p>
            <p className="font-sans text-base text-white/80 leading-relaxed mb-8 text-left">
              Creemos firmemente que el acceso a un diseño web sofisticado y moderno no debería exigir inversiones iniciales masivas ni complejas gestiones técnicas. Por ello, apostamos por un modelo de suscripción (alquiler de páginas web) transparente y flexible, asumiendo nosotros todo el peso técnico (alojamiento, dominio, SEO inicial y soporte continuo) para que te centres únicamente en conectar con tu audiencia.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <a
                href="#proceso"
                onClick={(e) => handleScrollTo(e, '#proceso')}
                className="inline-flex items-center gap-1.5 text-white hover:text-sky-300 font-semibold text-sm transition-all duration-300 pb-1 border-b-2 border-sky-400/40 hover:border-sky-300"
              >
                Conoce nuestro proceso detallado
                <LucideIcon name="ArrowRight" size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
