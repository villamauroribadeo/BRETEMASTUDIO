import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';

interface NavigationProps {
  onAdminClick: () => void;
  isAdmin: boolean;
  onExitAdmin: () => void;
  onExitLegalView?: () => void;
}

export default function Navigation({ onAdminClick, isAdmin, onExitAdmin, onExitLegalView }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Precios', href: '#precios' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onExitLegalView) {
      onExitLegalView();
    }

    if (isAdmin) {
      onExitAdmin();
      // Let state transition happen before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    
    e.preventDefault();
    // Use a small timeout if coming from legal view to allow the main DOM elements to remount
    setTimeout(() => {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, onExitLegalView ? 50 : 0);
    setIsOpen(false);
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isAdmin
            ? 'bg-[#060F1E]/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(3,7,18,0.4)] border-b border-white/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2 group"
          >
            <span className="font-valuxe text-2xl font-bold tracking-tight transition-colors duration-300 text-white group-hover:text-sky-300">
              Brétema Studio Web
            </span>
          </a>

          {/* Desktop Navigation */}
          {!isAdmin ? (
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-sans text-xs lg:text-sm font-medium transition-colors duration-200 relative py-1 text-white/90 hover:text-sky-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  {link.label}
                </a>
              ))}

              <button
                id="btn-admin-login"
                onClick={onAdminClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-xs font-semibold transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                <LucideIcon name="Settings" size={12} />
                Gestión
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="font-sans text-xs font-semibold uppercase tracking-widest bg-sky-500/10 text-sky-300 px-3 py-1 rounded-full flex items-center gap-1.5 border border-sky-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                Modo Gestor (CMS)
              </span>
              <button
                onClick={onExitAdmin}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full font-sans text-xs font-semibold border border-white/10 transition-all duration-300"
              >
                <LucideIcon name="Undo" size={14} />
                Ver Web
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {!isAdmin && (
            <button
              id="btn-mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 focus:outline-none transition-colors duration-300 text-white hover:text-sky-300"
              aria-label="Abrir menú"
            >
              <LucideIcon name={isOpen ? 'X' : 'Menu'} size={24} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && !isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[73px] left-0 w-full bg-[#060F1E]/95 backdrop-blur-xl shadow-2xl border-b border-white/10 z-40 md:hidden py-6 px-8 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-base font-semibold text-white/90 hover:text-sky-300 transition-colors py-2 border-b border-white/10"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onAdminClick();
              }}
              className="mt-2 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 py-3 rounded-xl font-sans text-sm font-semibold transition-all duration-300"
            >
              <LucideIcon name="Settings" size={16} />
              Acceso Administrador
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
