import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: 'Bretema Studio transformó por completo nuestra presencia online. El proceso fue fluido y el resultado superó todas nuestras expectativas. Nuestra web ahora refleja verdaderamente la esencia de nuestro restaurante.',
    author: 'María López',
    role: 'Propietaria, Le Jardin Secret',
    avatar: '/images/avatar-testimonio-1.jpg',
  },
  {
    text: 'El modelo de alquiler es perfecto para nuestro negocio. Tener una web profesional sin una gran inversión inicial nos permitió centrarnos en lo que realmente importa: nuestros clientes.',
    author: 'Carlos Martínez',
    role: 'CEO, EcoChic',
    avatar: '/images/avatar-testimonio-2.jpg',
  },
  {
    text: 'Desde el primer contacto, el equipo de Bretema entendió perfectamente lo que necesitábamos. Nuestra web de yoga transmite exactamente la paz y armonía que queremos transmitir en nuestro estudio.',
    author: 'Laura Gómez',
    role: 'Directora, Raíces y Equilibrio',
    avatar: '/images/avatar-testimonio-3.jpg',
  },
];

export default function Testimonios() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

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

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [current]);

  const t = testimonials[current];

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="w-full bg-[#D9B8A7] py-20 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="section-label block mb-4">Testimonios</span>
          <h2 className="text-[32px] md:text-[48px] font-serif font-normal leading-[1.2] text-[#2F3D37]">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Carousel */}
        <div className="max-w-[900px] mx-auto">
          <div ref={cardRef} className="glass-card p-10 md:p-14 relative opacity-0">
            {/* Quote icon */}
            <Quote
              size={48}
              className="text-[#B8704F] opacity-20 absolute top-8 left-8"
            />

            {/* Testimonial text */}
            <p className="text-lg md:text-xl font-serif text-[#2F3D37] leading-[1.6] mb-8 pt-8">
              "{t.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.author}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-[#2F3D37]">{t.author}</p>
                <p className="text-sm text-[#6B4E4E]">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#2F3D37] flex items-center justify-center text-[#2F3D37] hover:bg-[#2F3D37] hover:text-[#FFFCF5] transition-all duration-300"
              aria-label="Anterior testimonio"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'bg-[#2F3D37] w-8'
                      : 'bg-[#2F3D37] opacity-30'
                  }`}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#2F3D37] flex items-center justify-center text-[#2F3D37] hover:bg-[#2F3D37] hover:text-[#FFFCF5] transition-all duration-300"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
