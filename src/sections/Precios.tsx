import React from 'react';
import { motion } from 'motion/react';
import { PricingPlan } from '../types';
import LucideIcon from '../components/LucideIcon';

interface PreciosProps {
  plans: PricingPlan[];
  onSelectPlan: (planName: string) => void;
}

export default function Precios({ plans, onSelectPlan }: PreciosProps) {
  return (
    <section id="precios" className="py-24 bg-[#071324] relative overflow-hidden border-t border-white/10">
      {/* Decorative ambient backgrounds */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-sans text-xs font-bold text-sky-300 uppercase tracking-widest bg-sky-500/10 px-3.5 py-2 rounded-full inline-block mb-4 border border-sky-400/20">
            Planes y Precios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Un sitio web impecable <br />
            <span className="text-sky-300 italic font-normal">por una tarifa plana y clara.</span>
          </h2>
          <p className="font-sans text-base text-white/80 leading-relaxed">
            Sin costes ocultos. Sin inversiones de miles de euros. Una suscripción mensual que lo cubre todo: diseño, desarrollo, alojamiento, mantenimiento, dominio y soporte ilimitado.
          </p>
        </div>

        {/* Dynamic Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 relative ${
                plan.featured
                  ? 'bg-sky-950/40 text-white backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(3,7,18,0.5)] border-2 border-sky-400/60 lg:scale-105 lg:z-10 hover:shadow-[0_25px_60px_-15px_rgba(56,189,248,0.3)]'
                  : 'bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-[0_8px_32px_rgba(3,7,18,0.3)] hover:shadow-[0_15px_40px_rgba(56,189,248,0.15)] transform hover:-translate-y-1'
              }`}
            >
              {/* Popularity Badge for Featured */}
              {plan.featured && (
                <span className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-sky-400 text-slate-950 px-4 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest shadow-md">
                  Recomendado
                </span>
              )}

              {/* Top part of card */}
              <div>
                <h3 className="font-serif text-xl font-bold mb-2 text-left text-white">{plan.name}</h3>
                <p className={`font-sans text-[11px] mb-6 text-left leading-relaxed ${plan.featured ? 'text-white/80' : 'text-white/70'}`}>
                  {plan.description}
                </p>

                {/* Pricing amount */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-serif text-4xl font-bold text-white">{plan.price}€</span>
                  <span className={`font-sans text-xs ${plan.featured ? 'text-white/70' : 'text-white/60'}`}>
                    / mes
                  </span>
                </div>

                {/* Line separator */}
                <div className={`h-px w-full mb-6 ${plan.featured ? 'bg-white/10' : 'bg-white/5'}`} />

                {/* Features list */}
                <div className="flex flex-col gap-3 text-left">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.featured ? 'bg-sky-400/20 text-sky-300' : 'bg-white/10 text-white'
                      }`}>
                        <LucideIcon name="Check" size={10} className={plan.featured ? 'text-sky-300' : 'text-white'} />
                      </div>
                      <span className={`font-sans text-xs ${plan.featured ? 'text-white/90' : 'text-white/80'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full mt-8 py-3 rounded-xl font-sans text-xs font-semibold transition-all duration-300 transform active:scale-95 ${
                  plan.featured
                    ? 'bg-sky-500/25 hover:bg-sky-500/40 text-white border border-sky-400/50 hover:border-sky-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-white/25'
                }`}
              >
                Suscribirse {plan.name}
              </button>

            </motion.div>
          ))}
        </div>

        {/* Email corporativo trust banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-[0_10px_30px_rgba(3,7,18,0.3)]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-300 flex items-center justify-center flex-shrink-0 border border-sky-400/20">
              <LucideIcon name="Mail" size={24} />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white">Email Profesional Personalizado Incluido</h4>
              <p className="font-sans text-xs text-white/70 mt-0.5">
                Todos nuestros trabajos de desarrollo y alquiler web incluyen configuración de correo corporativo personalizado con tu propio dominio.
              </p>
            </div>
          </div>
          <div className="bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 text-center sm:text-right flex-shrink-0">
            <span className="block font-sans text-[10px] text-white/60 uppercase tracking-wider">Tu Imagen Profesional</span>
            <span className="block font-serif text-xs font-semibold text-white mt-0.5">Evita el uso de cuentas @gmail o @hotmail</span>
          </div>
        </motion.div>

        {/* Custom Projects / Proyectos a Medida Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-gradient-to-br from-[#060F1E] to-[#0A1A2F] rounded-3xl p-8 md:p-10 border border-white/10 text-white relative overflow-hidden shadow-xl"
        >
          {/* Subtle absolute background details */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 text-left">
              <span className="font-mono text-xs text-sky-300 font-semibold uppercase tracking-wider block mb-2">
                Desarrollos Especiales
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
                ¿Buscas un Proyecto a Medida?
              </h3>
              <p className="font-sans text-sm text-white/90 leading-relaxed max-w-2xl mb-4">
                Somos especialistas en <strong>CRM, webs internas de gestión para Pymes, webs para alojamientos turísticos con motor de reservas, restaurantes y renovación de antiguas webs estáticas</strong>.
              </p>
              <p className="font-sans text-sm text-white/70 leading-relaxed max-w-2xl">
                Ofrecemos soluciones avanzadas adaptadas bajo un formato de suscripción personalizada, asumiendo toda la carga técnica, mantenimiento y evolución constante del sitio. <strong>Presupuesto sin compromiso una vez conocidas las necesidades del cliente.</strong>
              </p>
              <div className="flex flex-wrap gap-2.5 mt-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 font-sans text-xs text-sky-300">
                  <LucideIcon name="Settings" size={12} />
                  Sistemas CRM & PYMEs
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 font-sans text-xs text-sky-300">
                  <LucideIcon name="Calendar" size={12} />
                  Motores de Reserva
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 font-sans text-xs text-sky-300">
                  <LucideIcon name="Briefcase" size={12} />
                  Gestión y Restaurantes
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 font-sans text-xs text-sky-300">
                  <LucideIcon name="RefreshCw" size={12} />
                  Renovación Estática
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center w-full">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center lg:text-right w-full max-w-xs mb-4">
                <span className="block font-sans text-xs text-sky-300 uppercase tracking-wider mb-1">Suscripción Personalizada</span>
                <span className="block font-serif text-lg font-bold text-white">Bajo Presupuesto</span>
                <span className="block font-sans text-[10px] text-white/70 mt-1.5">Sin Compromiso Inicial</span>
              </div>
              <button
                onClick={() => onSelectPlan('Proyecto a Medida')}
                className="w-full max-w-xs bg-sky-500/25 hover:bg-sky-500/40 text-white border border-sky-400/40 hover:border-sky-300 py-4 rounded-xl font-sans text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 active:scale-95 transform"
              >
                Solicitar Presupuesto
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing FAQs or trust note */}
        <p className="font-sans text-xs text-white/60 text-center mt-12 max-w-xl mx-auto">
          ¿Tienes dudas? Todos los planes requieren un compromiso mínimo de 12 meses. Incluyen hosting, dominio de marca, <strong>email corporativo personalizado</strong> (evitando que tus clientes te contacten por Gmail o Hotmail), copias de seguridad semanales, actualizaciones de contenido gratuitas y soporte técnico prioritario. No cobramos costes iniciales de maquetación.
        </p>

      </div>
    </section>
  );
}
