import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Descubrimiento',
    description:
      'Nos sumergimos en tu marca, tus objetivos y tu audiencia para entender exactamente lo que necesitas.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Diseño',
    description:
      'Creamos propuestas visuales que capturan la esencia de tu negocio con la estética de la costa gallega.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'Desarrollo',
    description:
      'Construimos tu sitio con las últimas tecnologías, optimizado para velocidad y experiencia de usuario.',
    icon: Code,
  },
  {
    number: '04',
    title: 'Lanzamiento',
    description:
      'Tu web lista para volar. Te acompañamos en el lanzamiento y seguimiento post-publicación.',
    icon: Rocket,
  },
];

export default function Proceso() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
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

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="w-full bg-[#E8C8A8] py-20 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="section-label block mb-4">Proceso</span>
          <h2 className="text-[32px] md:text-[48px] font-serif font-normal leading-[1.2] text-[#2F3D37]">
            Cómo trabajamos
          </h2>
        </div>

        {/* Steps */}
        <div className="relative max-w-[800px] mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-[#B8704F]" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[index] = el; }}
                className={`relative flex items-start gap-6 md:gap-12 opacity-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#B8704F] border-4 border-[#E8C8A8] z-10 mt-2" />

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-[calc(50%-32px)] ${
                    index % 2 === 0 ? 'md:pr-0 md:text-right' : 'md:pl-0'
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 mb-3 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2F3D37] flex items-center justify-center flex-shrink-0">
                      <step.icon size={18} className="text-[#FFFCF5]" />
                    </div>
                    <span className="text-sm font-medium text-[#B8704F]">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-[#2F3D37] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base text-[#6B4E4E] leading-[1.7]">
                    {step.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-32px)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
