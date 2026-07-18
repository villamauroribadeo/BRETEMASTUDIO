import { Instagram, Linkedin, Twitter } from 'lucide-react';

const quickLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Precios', href: '#precios' },
  { label: 'Contacto', href: '#contacto' },
];

const services = [
  'Diseño Web',
  'Alquiler Web',
  'SEO',
  'E-commerce',
];

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#2F3D37] py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-12">
          {/* Brand */}
          <div>
            <a href="#hero" className="font-serif text-2xl text-[#FFFCF5] block mb-4">
              Bretema Studio
            </a>
            <p className="text-sm text-[rgba(255,252,245,0.6)] leading-[1.7]">
              Diseño web de alta calidad inspirado en la costa gallega. Alquiler de páginas web para que crezcas sin límites.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-[#FFFCF5] uppercase tracking-wider mb-4">
              Enlaces
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-sm text-[rgba(255,252,245,0.6)] hover:text-[#FFFCF5] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-[#FFFCF5] uppercase tracking-wider mb-4">
              Servicios
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-[rgba(255,252,245,0.6)]">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-[#FFFCF5] uppercase tracking-wider mb-4">
              Síguenos
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[rgba(255,252,245,0.3)] flex items-center justify-center text-[rgba(255,252,245,0.6)] hover:text-[#FFFCF5] hover:border-[#FFFCF5] transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[rgba(255,252,245,0.3)] flex items-center justify-center text-[rgba(255,252,245,0.6)] hover:text-[#FFFCF5] hover:border-[#FFFCF5] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[rgba(255,252,245,0.3)] flex items-center justify-center text-[rgba(255,252,245,0.6)] hover:text-[#FFFCF5] hover:border-[#FFFCF5] transition-all"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(255,252,245,0.1)] pt-8">
          <p className="text-sm text-[rgba(255,252,245,0.5)] text-center">
            © 2025 Bretema Studio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
