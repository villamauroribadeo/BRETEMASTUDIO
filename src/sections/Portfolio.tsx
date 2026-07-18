import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioItem } from '../types';
import LucideIcon from '../components/LucideIcon';

interface PortfolioProps {
  portfolioItems: PortfolioItem[];
}

export default function Portfolio({ portfolioItems }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');

  // Dynamically extract categories
  const categories = ['Todos', ...Array.from(new Set(portfolioItems.map((item) => item.category)))];

  const filteredItems = activeCategory === 'Todos'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  // Gradient patterns mapping for high visual polish
  const bgGradients = [
    'from-[#E5E1DA] to-[#0F1714]/30',
    'from-[#C4A47C] to-[#FAF9F6]',
    'from-[#0F1714] to-[#E5E1DA]/40',
    'from-[#535E5B] to-[#C4A47C]/20',
  ];

  return (
    <section id="portfolio" className="py-24 bg-[#060F1E] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-xl">
            <span className="font-sans text-xs font-bold text-sky-300 uppercase tracking-widest bg-sky-500/10 px-3.5 py-2 rounded-full inline-block mb-4 border border-sky-400/20">
              Nuestros Trabajos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Proyectos con alma, <br />
              <span className="text-sky-300 italic font-normal">resultados con impacto.</span>
            </h2>
          </div>
          <p className="font-sans text-base text-white/80 leading-relaxed max-w-md text-left">
            Explora una selección de los proyectos web que hemos diseñado y desarrollado para marcas y negocios singulares.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                activeCategory === category
                  ? 'bg-sky-500/25 backdrop-blur-md text-white border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'bg-white/5 hover:bg-white/15 backdrop-blur-md text-white/80 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Portfolio Grid with Animations */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const gradient = bgGradients[index % bgGradients.length];
              return (
                <motion.div
                  layout
                  key={item.id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-sky-400/40 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(3,7,18,0.3)] hover:shadow-[0_20px_50px_rgba(56,189,248,0.15)] transform hover:-translate-y-2 transition-all duration-500 group"
                >
                  {/* Real Portfolio Image Card with polished overlays and hover effects */}
                  <div className="w-full h-72 sm:h-80 bg-white/5 relative overflow-hidden">
                    {/* Background Portfolio Image with elegant hover zoom */}
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                    )}
                    
                    {/* Subtle aesthetic gradient overlay to ensure complete text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E]/95 via-[#060F1E]/30 to-transparent group-hover:opacity-95 transition-opacity duration-300" />
                    
                    {/* Elements laid out over the image */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                      {/* Category Badge */}
                      <div className="flex items-center gap-1.5 bg-[#060F1E]/90 backdrop-blur-md self-start px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-sm border border-white/15">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                        {item.category}
                      </div>

                      {/* Brand and category representation */}
                      <div className="self-center flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-md flex items-center justify-center text-white mb-2 transition-transform duration-300 group-hover:rotate-12">
                          <LucideIcon name="Briefcase" size={20} />
                        </div>
                        <span className="font-serif text-lg font-bold text-white drop-shadow-md tracking-wide">
                          {item.title}
                        </span>
                      </div>

                      {/* Footer badge */}
                      <div className="self-end bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm border border-white/10 transition-colors duration-300 group-hover:bg-sky-500/40 group-hover:border-sky-400/35">
                        Ver Caso de Éxito
                      </div>
                    </div>
                  </div>

                  {/* Text Meta info */}
                  <div className="p-6 flex items-center justify-between border-t border-white/10 bg-[#060F1E]/40">
                    <div className="text-left">
                      <span className="text-xs font-semibold text-sky-300 uppercase tracking-widest block mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-sky-300 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 group-hover:bg-sky-500/25 group-hover:border-sky-400/40 group-hover:text-sky-300 flex items-center justify-center text-white transition-all duration-300 transform group-hover:translate-x-1">
                      <LucideIcon name="ArrowRight" size={16} />
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
