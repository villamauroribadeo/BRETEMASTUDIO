import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Le Jardin Secret',
    category: 'Restaurante',
    image: '/images/proyecto-portfolio-1.jpg',
  },
  {
    title: 'EcoChic',
    category: 'Moda Sostenible',
    image: '/images/proyecto-portfolio-2.jpg',
  },
  {
    title: 'Raíces y Equilibrio',
    category: 'Yoga & Bienestar',
    image: '/images/proyecto-portfolio-3.jpg',
  },
  {
    title: 'Architekto',
    category: 'Arquitectura',
    image: '/images/proyecto-portfolio-4.jpg',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.12,
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
      id="portfolio"
      ref={sectionRef}
      className="w-full bg-[#D5DDD8] py-20 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="section-label block mb-4">Portfolio</span>
          <h2 className="text-[32px] md:text-[48px] font-serif font-normal leading-[1.2] text-[#2F3D37]">
            Nuestros proyectos
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer opacity-0"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(47,61,55,0.85)] via-[rgba(47,61,55,0.4)] to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400 flex flex-col justify-end p-8">
                <span className="text-sm text-[#E8C8A8] font-medium mb-1">
                  {project.category}
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-serif text-[#FFFCF5]">
                    {project.title}
                  </h3>
                  <ExternalLink size={20} className="text-[#FFFCF5]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
