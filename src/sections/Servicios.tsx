import React from 'react';
import { motion } from 'motion/react';
import { Service } from '../types';
import LucideIcon from '../components/LucideIcon';

interface ServiciosProps {
  services: Service[];
  onSelectService?: (serviceType: 'diseno' | 'alquiler' | 'seo') => void;
}

export default function Servicios({ services, onSelectService }: ServiciosProps) {
  const handleServiceClick = (serviceId: string, title: string) => {
    if (!onSelectService) return;
    const lowerTitle = title.toLowerCase();
    if (serviceId === '1' || lowerTitle.includes('medida')) {
      onSelectService('diseno');
    } else if (serviceId === '2' || lowerTitle.includes('alquiler')) {
      onSelectService('alquiler');
    } else if (serviceId === '3' || lowerTitle.includes('seo') || lowerTitle.includes('posicionamiento')) {
      onSelectService('seo');
    }
  };

  return (
    <section id="servicios" className="py-24 bg-[#060F1E] relative overflow-hidden border-t border-white/10">
      {/* Dynamic ambient shapes */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold text-sky-300 uppercase tracking-widest bg-sky-500/10 px-3.5 py-2 rounded-full inline-block mb-4 border border-sky-400/20">
            Nuestros Servicios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Soluciones digitales integrales <br />
            <span className="text-sky-300 italic font-normal">hechas a tu medida.</span>
          </h2>
          <p className="font-sans text-base text-white/80 leading-relaxed">
            Unificamos diseño estético, velocidad de carga óptima y posicionamiento SEO estratégico para asegurar que tu negocio destaque en el ecosistema digital.
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => handleServiceClick(service.id, service.title)}
              className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-sky-400/40 rounded-2xl p-6 shadow-[0_8px_32px_rgba(3,7,18,0.3)] hover:shadow-[0_20px_50px_rgba(56,189,248,0.15)] transition-all duration-500 group flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              <div>
                {/* Service Image Header */}
                {service.image && (
                  <div className="w-full h-44 rounded-xl overflow-hidden mb-6 relative bg-white/5">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E]/80 to-transparent" />
                  </div>
                )}

                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-sky-500/20 flex items-center justify-center text-white group-hover:text-sky-300 transition-colors duration-300">
                    <LucideIcon name={service.icon || 'Globe'} size={20} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-sky-300 transition-colors duration-300 text-left">
                    {service.title}
                  </h3>
                </div>

                <p className="font-sans text-sm text-white/70 leading-relaxed mb-6 text-left">
                  {service.description}
                </p>
              </div>

              {/* Decorative bottom link */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider group-hover:text-sky-300 transition-colors duration-300 self-start mt-2">
                Saber más
                <LucideIcon name="ArrowRight" size={12} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
