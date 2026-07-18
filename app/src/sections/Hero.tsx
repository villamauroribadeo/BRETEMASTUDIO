import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        panelRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        );
    });

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector('#precios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/hero-faro-amanecer.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,22,26,0.3)] via-transparent to-[rgba(10,22,26,0.5)]" />

      {/* Glass panel */}
      <div
        ref={panelRef}
        className="glass-card relative z-10 mx-6 w-full max-w-[640px] px-10 py-14 md:px-16 md:py-20 text-center opacity-0"
      >
        <h1
          ref={titleRef}
          className="text-[42px] md:text-[64px] lg:text-[72px] font-serif font-normal leading-[1.1] tracking-[-0.02em] text-[#2F3D37] mb-6 opacity-0"
        >
          Alquila tu web.
          <br />
          Crece sin límites.
        </h1>
        <p
          ref={subtitleRef}
          className="text-base md:text-lg text-[#6B4E4E] font-normal leading-relaxed mb-10 opacity-0"
        >
          Diseños web de alta calidad por suscripción.
          <br className="hidden md:block" />
          Sin pagos iniciales, sin complicaciones.
        </p>
        <a
          ref={ctaRef}
          href="#precios"
          onClick={handleCtaClick}
          className="btn-pill opacity-0"
        >
          Ver planes
        </a>
      </div>
    </section>
  );
}
