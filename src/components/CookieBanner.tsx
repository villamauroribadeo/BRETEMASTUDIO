import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

interface CookieBannerProps {
  forceShowSettings?: boolean;
  onSettingsClosed?: () => void;
}

export default function CookieBanner({ forceShowSettings = false, onSettingsClosed }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  
  // Granular settings states (Necessary is always true and disabled)
  const [preferences, setPreferences] = useState<Omit<CookiePreferences, 'timestamp'>>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_status');
    const savedPrefs = localStorage.getItem('cookie_preferences');
    
    if (forceShowSettings) {
      if (savedPrefs) {
        try {
          const parsed = JSON.parse(savedPrefs);
          setPreferences({
            necessary: true,
            analytics: parsed.analytics ?? false,
            marketing: parsed.marketing ?? false,
          });
        } catch (e) {
          console.error('Error parsing cookie preferences', e);
        }
      }
      setIsVisible(true);
      setIsConfiguring(true);
    } else if (!consent) {
      // Small delay on first entry for an elegant presentation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [forceShowSettings]);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    saveConsent(allAccepted);
  };

  const handleRejectAll = () => {
    const allRejected: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    saveConsent(allRejected);
  };

  const handleSavePreferences = () => {
    const customPrefs: CookiePreferences = {
      necessary: true,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      timestamp: new Date().toISOString(),
    };
    saveConsent(customPrefs);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie_consent_status', prefs.analytics || prefs.marketing ? 'accepted' : 'rejected');
    localStorage.setItem('cookie_preferences', JSON.stringify(prefs));
    setIsVisible(false);
    setIsConfiguring(false);
    if (onSettingsClosed) {
      onSettingsClosed();
    }
  };

  const togglePreference = (key: 'analytics' | 'marketing') => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          id="cookie-consent-container"
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-xl bg-[#071324]/95 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(3,7,18,0.6)] p-6 sm:p-8 z-50 text-left"
        >
          {!isConfiguring ? (
            /* ======================================================= */
            /* DEFAULT CONSENT BANNER DISPLAY */
            /* ======================================================= */
            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-sky-500/15 text-sky-300 flex items-center justify-center flex-shrink-0 border border-sky-400/20">
                  <LucideIcon name="Cookie" size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-tight">
                    Preferencias de Privacidad y Cookies
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                    En Brétema Studio cuidamos sus datos. Utilizamos cookies propias y de terceros para optimizar el rendimiento técnico del portal, analizar estadísticas de tráfico y recordar configuraciones. Con su consentimiento previo, usaremos cookies de análisis y personalización.
                  </p>
                </div>
              </div>

              <div className="text-[10px] font-sans text-white/40 leading-relaxed border-t border-white/5 pt-3">
                Consulte nuestra{' '}
                <a
                  href="#politica-cookies"
                  className="text-sky-300 hover:underline inline-flex items-center gap-0.5"
                  onClick={(e) => {
                    // This can trigger showing cookie policy view in main page
                  }}
                >
                  Política de Cookies
                </a>{' '}
                y{' '}
                <a
                  href="#politica-privacidad"
                  className="text-sky-300 hover:underline"
                >
                  Política de Privacidad
                </a>{' '}
                para obtener todos los detalles legales vigentes regulados por la AEPD.
              </div>

              {/* Action buttons (Identical visual weight and size for absolute legal compliance) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 text-center"
                >
                  Rechazar todas
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfiguring(true)}
                  className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 text-center"
                >
                  Configurar
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full bg-sky-500/25 hover:bg-sky-500/40 text-sky-300 hover:text-white border border-sky-400/40 hover:border-sky-300 px-4 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 text-center shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                >
                  Aceptar todas
                </button>
              </div>
            </div>
          ) : (
            /* ======================================================= */
            /* GRANULAR CONFIGURATION PANEL */
            /* ======================================================= */
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <LucideIcon name="Settings" size={18} className="text-sky-300" />
                  <h3 className="font-serif text-base font-bold text-white tracking-tight">
                    Ajustes de Cookies
                  </h3>
                </div>
                {forceShowSettings && (
                  <button
                    onClick={() => {
                      setIsVisible(false);
                      setIsConfiguring(false);
                      if (onSettingsClosed) onSettingsClosed();
                    }}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <LucideIcon name="X" size={18} />
                  </button>
                )}
              </div>

              <p className="font-sans text-xs text-white/70 leading-relaxed">
                Seleccione granularmente los tipos de cookies que autoriza utilizar en su navegador. La decisión se guardará durante 1 año.
              </p>

              {/* Switches Container */}
              <div className="space-y-3.5 pt-2">
                
                {/* 1. Necessary (Technical) */}
                <div className="flex items-center justify-between bg-white/5 p-3.5 rounded-xl border border-white/5">
                  <div className="max-w-[75%]">
                    <span className="font-sans text-xs font-bold text-white block">
                      1. Técnicas y Obligatorias (Sesión)
                    </span>
                    <span className="text-[11px] text-white/50 leading-relaxed block mt-0.5">
                      Cookies exentas que garantizan la seguridad, navegación correcta y almacenamiento de sus preferencias de consentimiento.
                    </span>
                  </div>
                  <div className="relative">
                    <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-400/20 px-2 py-0.5 rounded uppercase">
                      Obligadas
                    </span>
                  </div>
                </div>

                {/* 2. Analytics */}
                <div 
                  className="flex items-center justify-between bg-white/5 p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                  onClick={() => togglePreference('analytics')}
                >
                  <div className="max-w-[75%]">
                    <span className="font-sans text-xs font-bold text-white block">
                      2. Análisis y Rendimiento
                    </span>
                    <span className="text-[11px] text-white/50 leading-relaxed block mt-0.5">
                      Permiten cuantificar visitas agregadas de forma anónima para optimizar la carga del portal y su estructura de contenido.
                    </span>
                  </div>
                  {/* Styled Custom Switch Toggle */}
                  <div className="relative w-10 h-6 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => {}} // handled by div click
                      className="sr-only"
                    />
                    <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${preferences.analytics ? 'bg-sky-400' : 'bg-white/10'}`} />
                    <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-slate-900 transition-transform duration-300 ${preferences.analytics ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>

                {/* 3. Marketing */}
                <div 
                  className="flex items-center justify-between bg-white/5 p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                  onClick={() => togglePreference('marketing')}
                >
                  <div className="max-w-[75%]">
                    <span className="font-sans text-xs font-bold text-white block">
                      3. Personalización y Preferencias
                    </span>
                    <span className="text-[11px] text-white/50 leading-relaxed block mt-0.5">
                      Guardar información de navegación y selecciones para recordar planes o personalizar su atención en visitas sucesivas.
                    </span>
                  </div>
                  {/* Styled Custom Switch Toggle */}
                  <div className="relative w-10 h-6 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => {}} // handled by div click
                      className="sr-only"
                    />
                    <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${preferences.marketing ? 'bg-sky-400' : 'bg-white/10'}`} />
                    <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-slate-900 transition-transform duration-300 ${preferences.marketing ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>

              </div>

              {/* Action triggers */}
              <div className="flex items-center justify-between gap-3 pt-2">
                {!forceShowSettings && (
                  <button
                    onClick={() => setIsConfiguring(false)}
                    className="text-xs font-bold text-white/60 hover:text-white flex items-center gap-1 transition-colors py-2"
                  >
                    <LucideIcon name="ChevronLeft" size={14} />
                    Atrás
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="bg-sky-500/25 hover:bg-sky-500/40 text-sky-300 hover:text-white border border-sky-400/40 hover:border-sky-300 px-6 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 ml-auto shadow-[0_0_15px_rgba(56,189,248,0.2)] active:scale-95"
                >
                  Guardar Preferencias
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
