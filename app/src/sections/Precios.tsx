import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    description: 'Para emprendedores y pequeños negocios',
    price: '79',
    featured: false,
    features: [
      'Diseño web profesional',
      'Hosting incluido',
      'Dominio gratuito primer año',
      'Soporte por email',
    ],
  },
  {
    name: 'Professional',
    description: 'Para negocios en crecimiento',
    price: '149',
    featured: true,
    features: [
      'Todo lo del plan Starter',
      'Diseño personalizado avanzado',
      'SEO básico incluido',
      'Blog integrado',
      'Soporte prioritario',
    ],
  },
  {
    name: 'Business',
    description: 'Para empresas consolidadas',
    price: '299',
    featured: false,
    features: [
      'Todo lo del plan Professional',
      'SEO avanzado',
      'E-commerce integrado',
      'Reportes mensuales',
      'Soporte 24/7',
    ],
  },
];

export default function Precios() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlanClick = (planName: string) => {
    const el = document.querySelector('#contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Set the plan in the form after a short delay
      setTimeout(() => {
        const planInput = document.querySelector('#plan-input') as HTMLInputElement;
        if (planInput) planInput.value = planName;
      }, 800);
    }
  };

  return (
    <section
      id="precios"
      ref={sectionRef}
      className="w-full bg-[#E8C8A8] py-20 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="section-label block mb-4">Precios</span>
          <h2 className="text-[32px] md:text-[48px] font-serif font-normal leading-[1.2] text-[#2F3D37]">
            Elige tu plan
          </h2>
          <p className="text-base text-[#6B4E4E] mt-4 max-w-[600px] mx-auto">
            Todas las webs incluyen hosting, dominio y soporte técnico. Cancela cuando quieras.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`glass-card p-8 md:p-10 transition-all duration-400 opacity-0 ${
                plan.featured
                  ? 'border-2 border-[#D4AF37] shadow-xl md:scale-105 md:-translate-y-2'
                  : ''
              }`}
            >
              {plan.featured && (
                <span className="inline-block px-4 py-1 bg-[#D4AF37] text-[#2F3D37] text-xs font-semibold rounded-full mb-4">
                  RECOMENDADO
                </span>
              )}

              <h3 className="text-2xl font-serif text-[#2F3D37] mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-[#6B4E4E] mb-6">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-serif text-[#2F3D37]">
                  {plan.price}
                </span>
                <span className="text-[#6B4E4E]">€/mes</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={18} className="text-[#4A7C6F] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#6B4E4E]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanClick(plan.name)}
                className={`w-full py-4 rounded-full font-medium transition-all duration-300 ${
                  plan.featured
                    ? 'btn-pill'
                    : 'btn-outline'
                }`}
              >
                Empezar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
