import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import LucideIcon from './LucideIcon';

interface ServiceDetailPagesProps {
  service: 'diseno' | 'alquiler' | 'seo';
  onClose: () => void;
  onSelectPlan?: (planName: string) => void;
}

interface ServiceContent {
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  description: string;
  keypoints?: { title: string; text: string; icon: string; }[];
  taxAdvantages?: { title: string; text: string; icon: string; }[];
  details: { title: string; paragraphs: string[]; }[];
  ctaText: string;
}

export default function ServiceDetailPages({ service, onClose, onSelectPlan }: ServiceDetailPagesProps) {
  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [service]);

  // Content map for the three new custom pages
  const contentMap: Record<'diseno' | 'alquiler' | 'seo', ServiceContent> = {
    diseno: {
      title: 'Diseño Web a Medida',
      subtitle: 'La firma digital exclusiva que tu marca merece',
      badge: 'Bespoke Premium Design',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      description: 'Creamos sitios web de autor completamente personalizados desde cero. No compramos plantillas genéricas; esculpimos cada sección, interacción y transición con una atención artesanal al detalle, inspirada en la precisión y elegancia de nuestro entorno costero gallego.',
      keypoints: [
        {
          title: 'Estudio de Marca y Dirección de Arte',
          text: 'Analizamos la esencia de tu negocio, tu competencia y tu público objetivo. Definimos paletas cromáticas exclusivas, tipografías elegantes y composiciones visuales con una fuerte personalidad.',
          icon: 'Palette'
        },
        {
          title: 'Arquitectura de Información y UX',
          text: 'Diseñamos recorridos intuitivos para garantizar que cada visitante entienda tu propuesta de valor y actúe de inmediato, maximizando las conversiones sin esfuerzo de navegación.',
          icon: 'Compass'
        },
        {
          title: 'Desarrollo de Código Optimizado',
          text: 'Escribimos código limpio, moderno y ultrarrápido sin sobrecargar la web. Conseguimos puntuaciones perfectas en las métricas de rendimiento de Google (Core Web Vitals).',
          icon: 'Code'
        }
      ],
      details: [
        {
          title: '¿Cómo trabajamos tu diseño a medida?',
          paragraphs: [
            'Nuestra metodología es boutique: preferimos realizar pocos proyectos al año pero garantizando un nivel de refinamiento técnico y visual incomparable. Todo comienza con una fase de inmersión total en tu marca.',
            'Te presentamos un prototipo interactivo de alta fidelidad para que sientas cómo responderá la web antes de escribir una sola línea de código. Una vez aprobado, nuestro equipo de desarrollo optimiza cada asset y script para un lanzamiento impecable.',
            'La web resultante es única, escalable y totalmente administrable, permitiendo que tu marca destaque con la autoridad que se merece en un mar de plantillas idénticas.'
          ]
        }
      ],
      ctaText: 'Solicitar Diseño a Medida'
    },
    alquiler: {
      title: 'Alquiler de Páginas Web',
      subtitle: 'La revolución del Renting Digital para tu negocio',
      badge: 'Renting Tecnológico Inteligente',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      description: 'Disfruta de una web profesional de última generación con una cómoda cuota mensual. Sin grandes desembolsos de capital, sin costes imprevistos de mantenimiento, y con soporte completo incluido.',
      taxAdvantages: [
        {
          title: '100% Deducible de Impuestos',
          text: 'La cuota mensual se contabiliza directamente como un gasto de explotación (OPEX) en lugar de una inversión amortizable (CAPEX). Esto permite reducir tu base imponible del Impuesto de Sociedades o de tu IRPF de forma inmediata desde la primera mensualidad.',
          icon: 'TrendingDown'
        },
        {
          title: 'Desgravación Completa del IVA',
          text: 'El IVA soportado en cada una de las facturas del servicio mensual de renting se deduce íntegramente en las declaraciones trimestrales, mejorando directamente el flujo de caja diario de tu negocio.',
          icon: 'DollarSign'
        },
        {
          title: 'Preservación de Liquidez y Tesorería',
          text: 'Evita los presupuestos de miles de euros iniciales habituales en el desarrollo web premium. Conserva tus recursos líquidos y capital circulante para financiar operaciones clave del día a día.',
          icon: 'Shield'
        },
        {
          title: 'Sin Endeudamiento en Balance',
          text: 'Al no ser una operación crediticia convencional, el renting web no computa en la central de riesgos del CIRBE y no se muestra como un pasivo en tu balance de situación, manteniendo intactos tus ratios financieros y tu capacidad de financiación bancaria.',
          icon: 'Briefcase'
        },
        {
          title: 'Mantenimiento y Soporte Todo Incluido',
          text: 'Se acabó el pagar facturas extra cada vez que algo falla o requiere actualizarse. Las copias de seguridad, actualizaciones de software, adaptaciones legales y soporte técnico están plenamente cubiertos en tu suscripción estable.',
          icon: 'CheckCircle'
        },
        {
          title: 'Renovación y Evolución Continua',
          text: 'La tecnología avanza rápido y las webs quedan obsoletas en 2 o 3 años. Nuestro renting te permite solicitar adaptaciones y rediseños periódicos para mantenerte siempre a la vanguardia tecnológica sin desembolsar miles de euros extra.',
          icon: 'RefreshCw'
        }
      ],
      details: [
        {
          title: 'Una estrategia inteligente adaptada al mercado actual',
          paragraphs: [
            'En el mundo empresarial actual, comprar tecnología que se devalúa y se vuelve obsoleta ya no tiene sentido estratégico. Al igual que el renting de vehículos o maquinaria, el renting web te ofrece la mejor herramienta digital del mercado, actualizada de manera constante, a cambio de una cuota fija deducible.',
            'Con Brétema Studio Web, eres el dueño de tus contenidos y de tu presencia digital, mientras nosotros asumimos toda la carga tecnológica, el servidor de alta velocidad y el soporte reactivo en menos de 24 horas.',
            'Optimiza tus impuestos, mantén tu capital en el banco y deja que nos encarguemos de que tu negocio nunca deje de brillar en internet.'
          ]
        }
      ],
      ctaText: 'Ver Planes de Alquiler'
    },
    seo: {
      title: 'Posicionamiento SEO e IA',
      subtitle: 'Conquista las primeras posiciones impulsado por Inteligencia Artificial',
      badge: 'Advanced SEO & AI Integration',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      description: 'De nada sirve tener la web más hermosa si nadie puede encontrarla. Diseñamos e implementamos estrategias SEO avanzadas de base semántica potenciadas con herramientas de Inteligencia Artificial para situarte por encima de tus competidores.',
      keypoints: [
        {
          title: 'SEO de Base Semántica y Técnico',
          text: 'Estructuramos tu web para que los buscadores la entiendan perfectamente. Carga veloz, marcado de datos estructurados (Schema.org), arquitectura limpia y mapas semánticos precisos.',
          icon: 'TrendingUp'
        },
        {
          title: 'Análisis de Intención de Búsqueda con IA',
          text: 'Utilizamos algoritmos avanzados para identificar con precisión qué buscan tus clientes potenciales, la dificultad de las palabras clave y cómo redactar los contenidos para capturar ese tráfico.',
          icon: 'Cpu'
        },
        {
          title: 'SEO Local para tu Área de Influencia',
          text: 'Optimizamos tu presencia para destacar en búsquedas locales y mapas de Google. Si estás en Ribadeo, Galicia o a nivel nacional, atraeremos al público de tu región de manera natural.',
          icon: 'MapPin'
        }
      ],
      details: [
        {
          title: '¿Por qué el SEO impulsado por IA es el estándar de hoy?',
          paragraphs: [
            'Los motores de búsqueda se han vuelto inteligentes. Ya no funciona repetir una palabra clave muchas veces; Google evalúa la relevancia conceptual y la experiencia de usuario real.',
            'Utilizamos la potencia del motor generativo Gemini para auditar de forma interactiva la densidad semántica de tus páginas, optimizar los metadatos y sugerir mejoras inmediatas de copywriting basadas en tendencias de búsqueda en tiempo real.',
            'El resultado es una corriente continua y orgánica de visitantes cualificados y con alta intención de compra, reduciendo tu dependencia de la publicidad de pago.'
          ]
        }
      ],
      ctaText: 'Mejorar mi SEO con IA'
    }
  };

  const current = contentMap[service];

  const handleCta = () => {
    onClose();
    if (service === 'alquiler') {
      setTimeout(() => {
        document.querySelector('#precios')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setTimeout(() => {
        document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#060F1E] text-white py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-left">
        {/* Navigation back and path */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6 mb-10">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 hover:text-white transition-all bg-white/5 hover:bg-sky-500/15 border border-white/10 px-5 py-2.5 rounded-full shadow-lg hover:shadow-sky-500/10 cursor-pointer"
          >
            <LucideIcon name="ArrowLeft" size={14} />
            Volver al Inicio
          </button>

          <div className="text-xs text-white/50 font-mono">
            <span>Brétema Studio Web</span>
            <span className="mx-2">/</span>
            <span>Servicios</span>
            <span className="mx-2">/</span>
            <span className="text-sky-300 font-semibold uppercase">{current.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs font-bold text-sky-300 uppercase tracking-widest bg-sky-500/10 px-4 py-2 rounded-full inline-block mb-4 border border-sky-400/20">
              {current.badge}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-white leading-tight tracking-tight mb-4">
              {current.title}
            </h1>
            <p className="font-sans text-lg md:text-xl text-sky-200/90 font-medium mb-6 leading-relaxed">
              {current.subtitle}
            </p>
            <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">
              {current.description}
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-[#060F1E]/20 to-transparent" />
            </div>
            {/* Visual shine element */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 opacity-20 blur-xl -z-10" />
          </div>
        </div>

        {/* Dynamic features layout */}
        {service === 'alquiler' ? (
          /* Specialized layout for Renting Tax advantages */
          <div className="mb-16">
            <div className="text-center md:text-left mb-10">
              <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 px-3 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block">
                Ahorro fiscal inmediato
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                Ventajas fiscales exclusivas para Autónomos y Empresas
              </h2>
              <p className="font-sans text-sm md:text-base text-white/70 max-w-3xl leading-relaxed">
                El alquiler de páginas web se engloba bajo el modelo de <strong>Renting Tecnológico</strong>. Esto te aporta increíbles beneficios contables e impositivos respecto al desarrollo tradicional:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.taxAdvantages?.map((advantage, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-sky-400/40 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-300 mb-4 border border-sky-400/20">
                    <LucideIcon name={advantage.icon} size={20} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white mb-2">
                    {advantage.title}
                  </h3>
                  <p className="font-sans text-xs text-white/70 leading-relaxed">
                    {advantage.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Standard keypoints layout for bespoke/seo */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {current.keypoints?.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-sky-400/40 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-300 mb-4 border border-sky-400/20">
                  <LucideIcon name={point.icon} size={20} />
                </div>
                <h3 className="font-serif text-base font-bold text-white mb-2">
                  {point.title}
                </h3>
                <p className="font-sans text-xs text-white/70 leading-relaxed">
                  {point.text}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Detailed Description Paragraphs */}
        <div className="bg-[#050D1A]/60 border border-white/10 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
          
          {current.details.map((section, sIdx) => (
            <div key={sIdx} className="space-y-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-sky-300 border-l-2 border-sky-400 pl-4 mb-4">
                {section.title}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="font-sans text-sm md:text-base text-white/80 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* Prompt to contact or take action */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h4 className="font-serif text-base font-bold text-white mb-1">¿Listo para impulsar tu negocio?</h4>
              <p className="font-sans text-xs text-white/60">Contáctanos hoy mismo para resolver cualquier duda sin compromiso.</p>
            </div>
            
            <button
              onClick={handleCta}
              className="inline-flex items-center justify-center gap-2 bg-sky-500/25 hover:bg-sky-500/40 backdrop-blur-md border border-sky-400/40 hover:border-sky-400/60 text-white px-8 py-3.5 rounded-xl font-sans text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]"
            >
              <span>{current.ctaText}</span>
              <LucideIcon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
