import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full bg-[#E8C8A8] py-20 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <span ref={labelRef} className="section-label block mb-4 opacity-0">
              Sobre Nosotros
            </span>
            <h2
              ref={titleRef}
              className="text-[32px] md:text-[48px] font-serif font-normal leading-[1.2] text-[#2F3D37] mb-6 opacity-0"
            >
              Tu socio digital en la ría de Ribadeo
            </h2>
            <p
              ref={textRef}
              className="text-base md:text-lg text-[#6B4E4E] leading-[1.7] mb-8 opacity-0"
            >
              En Bretema Studio creamos experiencias web que capturan la esencia de tu marca.
              Inspirados por la luz y los colores de la costa gallega, diseñamos sitios web que
              no solo se ven bien, sino que funcionan para tu negocio. Nuestro modelo de alquiler
              te permite tener una web profesional sin grandes inversiones iniciales.
            </p>
            <a
              ref={ctaRef}
              href="#proceso"
              onClick={(e) => handleClick(e, '#proceso')}
              className="inline-block text-[#2F3D37] font-medium border-b-2 border-[#B8704F] pb-1 hover:text-[#B8704F] transition-colors opacity-0"
            >
              Conoce nuestro proceso
            </a>
          </div>

          {/* Image column */}
          <div ref={imageRef} className="order-1 lg:order-2 opacity-0">
            <img
              src="/images/about-studio.jpg"
              alt="Espacio de trabajo de Bretema Studio con portátil y café"
              className="w-full h-auto rounded-2xl lg:rounded-3xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
