import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Layers, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Monitor,
    title: 'Diseño Web a Medida',
    description:
      'Sitios web únicos diseñados para capturar la esencia de tu marca y convertir visitantes en clientes.',
    image: '/images/servicio-diseno-web.jpg',
  },
  {
    icon: Layers,
    title: 'Alquiler de Páginas Web',
    description:
      'Accede a un sitio web profesional por suscripción mensual. Sin inversión inicial, sin preocupaciones.',
    image: '/images/servicio-alquiler-web.jpg',
  },
  {
    icon: TrendingUp,
    title: 'Posicionamiento SEO',
    description:
      'Optimización completa para que tu web aparezca en los primeros resultados de búsqueda.',
    image: '/images/servicio-seo.jpg',
  },
];

export default function Servicios() {
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

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="w-full bg-[#D9B8A7] py-20 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="section-label block mb-4">Servicios</span>
          <h2 className="text-[32px] md:text-[48px] font-serif font-normal leading-[1.2] text-[#2F3D37]">
            Todo lo que necesitas para brillar online
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="glass-card glass-card-hover overflow-hidden transition-all duration-400 opacity-0"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(47,61,55,0.3)] to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#2F3D37] flex items-center justify-center">
                    <service.icon size={18} className="text-[#FFFCF5]" />
                  </div>
                  <h3 className="text-xl font-serif text-[#2F3D37]">
                    {service.title}
                  </h3>
                </div>
                <p className="text-base text-[#6B4E4E] leading-[1.7]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
