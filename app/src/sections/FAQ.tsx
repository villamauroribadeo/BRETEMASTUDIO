import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: '¿Qué incluye el alquiler de una página web?',
    answer:
      'El alquiler incluye el diseño personalizado de tu web, el hosting en servidores de alta velocidad, el dominio (gratuito el primer año), mantenimiento técnico, copias de seguridad automáticas y soporte por email. Todo en una cuota mensual fija.',
  },
  {
    question: '¿Puedo cancelar la suscripción en cualquier momento?',
    answer:
      'Sí, puedes cancelar tu suscripción cuando quieras sin penalización alguna. Si cancelas, tu web seguirá activa hasta el final del periodo pagado. También puedes exportar tu contenido si decides irte.',
  },
  {
    question: '¿El diseño es realmente personalizado o uso una plantilla?',
    answer:
      'Cada web que creamos es completamente personalizada. No usamos plantillas prediseñadas. Nuestro equipo de diseño trabaja contigo para crear un sitio único que refleje la identidad de tu marca y cumpla tus objetivos de negocio.',
  },
  {
    question: '¿Cuánto tiempo tarda en estar lista mi web?',
    answer:
      'El tiempo depende de la complejidad del proyecto, pero generalmente una web básica está lista en 2-3 semanas. Para proyectos más complejos con e-commerce o funcionalidades avanzadas, el plazo puede ser de 4-6 semanas.',
  },
  {
    question: '¿Puedo hacer cambios en mi web después del lanzamiento?',
    answer:
      'Sí, todos nuestros planes incluyen un número de horas mensuales para cambios y actualizaciones. Si necesitas más cambios, podemos hacerlos por horas adicionales o actualizar tu plan.',
  },
  {
    question: '¿Mi web estará optimizada para móviles?',
    answer:
      'Absolutamente. Todos nuestros diseños son 100% responsive, lo que significa que tu web se verá y funcionará perfectamente en cualquier dispositivo: móvil, tablet y escritorio.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.08,
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

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="w-full bg-[#D5DDD8] py-20 md:py-32"
    >
      <div className="max-w-[800px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="section-label block mb-4">FAQ</span>
          <h2 className="text-[32px] md:text-[48px] font-serif font-normal leading-[1.2] text-[#2F3D37]">
            Preguntas frecuentes
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="border-b border-[rgba(47,61,55,0.15)] opacity-0"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-6 text-left group"
                aria-expanded={openIndex === index}
              >
                <span className="text-base md:text-lg font-serif text-[#2F3D37] pr-4 group-hover:text-[#B8704F] transition-colors">
                  {faq.question}
                </span>
                <Plus
                  size={20}
                  className={`text-[#2F3D37] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  openIndex === index ? 'max-h-[500px] pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-base text-[#6B4E4E] leading-[1.7]">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
