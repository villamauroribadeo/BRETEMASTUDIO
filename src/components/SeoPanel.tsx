import React, { useState } from 'react';
import { motion } from 'motion/react';
import LucideIcon from './LucideIcon';

export default function SeoPanel() {
  const [section, setSection] = useState('Inicio');
  const [title, setTitle] = useState('Bretema Studio | Diseño Web por Suscripción Inspirado en Galicia');
  const [description, setDescription] = useState('Estudio de diseño web premium. Ofrecemos diseño web por suscripción mensual, posicionamiento SEO avanzado y soporte continuo, con una estética costera gallega y sin inversión inicial.');
  const [keywords, setKeywords] = useState('diseño web, alquiler de paginas web, suscripcion web, posicionamiento seo, galicia');
  const [headings, setHeadings] = useState('H1: Diseños web de alta calidad por suscripción. H2: Nuestra Filosofía, Nuestros Servicios, Nuestro Proceso, Nuestros Trabajos, Planes y Precios. H3: Diseño Web a Medida, Alquiler de Páginas Web, Posicionamiento SEO.');
  const [bodyText, setBodyText] = useState('En Bretema Studio creamos experiencias web que capturan la esencia de tu marca. Inspirados por la estética de la costa gallega, construimos sitios rápidos, visualmente impecables y completamente optimizados. Ofrecemos diseño web por suscripción mensual o alquiler web con mantenimiento, hosting, dominio y soporte técnico incluidos.');
  
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handlePrepopulate = (secName: string) => {
    setSection(secName);
    if (secName === 'Inicio') {
      setTitle('Bretema Studio | Diseño Web por Suscripción Inspirado en Galicia');
      setDescription('Estudio de diseño web premium. Ofrecemos diseño web por suscripción mensual, posicionamiento SEO avanzado y soporte continuo, con una estética costera gallega y sin inversión inicial.');
      setKeywords('diseño web, alquiler de paginas web, suscripcion web, posicionamiento seo, galicia');
      setHeadings('H1: Diseños web de alta calidad por suscripción. H2: Nuestra Filosofía, Nuestros Servicios, Nuestro Proceso, Nuestros Trabajos, Planes y Precios. H3: Diseño Web a Medida, Alquiler de Páginas Web, Posicionamiento SEO.');
      setBodyText('En Bretema Studio creamos experiencias web que capturan la esencia de tu marca. Inspirados por la estética de la costa gallega, construimos sitios rápidos, visualmente impecables y completamente optimizados. Ofrecemos diseño web por suscripción mensual o alquiler web con mantenimiento, hosting, dominio y soporte técnico incluidos.');
    } else if (secName === 'Servicios') {
      setTitle('Servicios de Diseño Web Profesional y SEO | Bretema Studio');
      setDescription('Ofrecemos diseño web a medida, alquiler de páginas web por suscripción y posicionamiento SEO avanzado. Soluciones técnicas completas e integrales para tu negocio en Galicia.');
      setKeywords('diseño web a medida, alquiler de paginas, posicionamiento seo, soluciones digitales');
      setHeadings('H2: Soluciones digitales integrales hechas a tu medida. H3: Diseño Web a Medida, Alquiler de Páginas Web, Posicionamiento SEO.');
      setBodyText('Unificamos diseño estético, velocidad de carga óptima y posicionamiento SEO estratégico para asegurar que tu negocio destaque en el ecosistema digital. Accede a un sitio web premium por una cuota mensual.');
    } else {
      setTitle('Portfolio de Proyectos Web Realizados | Bretema Studio');
      setDescription('Explora nuestros trabajos de diseño y desarrollo de páginas web a medida y alquiler web en Galicia. Casos de éxito en restaurantes, moda, bienestar y arquitectura.');
      setKeywords('proyectos web, portfolio web, casos de exito, webs galicia, le jardin secret, ecochic');
      setHeadings('H2: Proyectos con alma, resultados con impacto.');
      setBodyText('Explora una selección de los proyectos web que hemos diseñado y desarrollado para marcas y negocios singulares. Le Jardin Secret, EcoChic, Raíces y Equilibrio, Architekto.');
    }
    setAuditResult(null);
  };

  const runAudit = async () => {
    setIsAuditing(true);
    setError('');
    try {
      const res = await fetch('/api/seo/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, title, description, keywords, headings, bodyText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al correr la auditoría');
      setAuditResult(data);
    } catch (err: any) {
      setError(err.message || 'Error en la conexión con el servidor de IA.');
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 text-left">
      {/* Top Banner explaining the feature */}
      <div className="bg-[#B8704F]/10 border border-[#D9B8A7]/30 p-6 rounded-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#B8704F]/20 text-[#B8704F] flex items-center justify-center flex-shrink-0">
          <LucideIcon name="Sparkles" size={20} />
        </div>
        <div>
          <h4 className="font-serif text-lg font-bold text-[#2F3D37]">Auditoría SEO Interactiva con Inteligencia Artificial</h4>
          <p className="font-sans text-xs text-[#6B4E4E] leading-relaxed mt-1">
            Esta herramienta evalúa en tiempo real los metadatos y contenidos de tu página. Utiliza Gemini para calificar de manera realista la optimización de tus palabras clave, longitud de etiquetas y jerarquía de encabezados, sugiriéndote cambios inmediatos listos para aplicar.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Meta fields input Form */}
        <div className="lg:col-span-6 bg-white border border-[#D9B8A7]/30 p-6 rounded-2xl flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#2F3D37]">Campos y Datos SEO</h3>
            
            {/* Quick Presets selector */}
            <div className="flex gap-1.5 bg-[#2F3D37]/5 p-1 rounded-lg">
              {['Inicio', 'Servicios', 'Portfolio'].map((p) => (
                <button
                  key={p}
                  onClick={() => handlePrepopulate(p)}
                  className={`px-2 py-1 rounded font-sans text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    section === p ? 'bg-[#2F3D37] text-white' : 'hover:bg-[#2F3D37]/10 text-[#2F3D37]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Section Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-bold text-[#2F3D37] uppercase tracking-wider">Sección o Página</label>
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full px-3 py-2 border border-[#D9B8A7]/40 rounded-lg text-xs font-sans text-[#2F3D37]"
            />
          </div>

          {/* Meta Title */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-sans text-xs font-bold text-[#2F3D37] uppercase tracking-wider">Meta Título (Título en Google)</label>
              <span className={`font-mono text-[10px] font-bold ${title.length > 60 || title.length < 50 ? 'text-[#B8704F]' : 'text-[#2F3D37]'}`}>
                {title.length} car.
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-[#D9B8A7]/40 rounded-lg text-xs font-sans text-[#2F3D37]"
            />
          </div>

          {/* Meta Description */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-sans text-xs font-bold text-[#2F3D37] uppercase tracking-wider">Meta Descripción (Extracto en Google)</label>
              <span className={`font-mono text-[10px] font-bold ${description.length > 160 || description.length < 120 ? 'text-[#B8704F]' : 'text-[#2F3D37]'}`}>
                {description.length} car.
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-[#D9B8A7]/40 rounded-lg text-xs font-sans text-[#2F3D37] resize-none"
            />
          </div>

          {/* Target Keywords */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-bold text-[#2F3D37] uppercase tracking-wider">Palabras Clave Objetivo (separadas por comas)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. diseño web, suscripción web, seo galicia"
              className="w-full px-3 py-2 border border-[#D9B8A7]/40 rounded-lg text-xs font-sans text-[#2F3D37]"
            />
          </div>

          {/* Headings structure */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-bold text-[#2F3D37] uppercase tracking-wider">Estructura de Encabezados (H1, H2, H3)</label>
            <textarea
              value={headings}
              onChange={(e) => setHeadings(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-[#D9B8A7]/40 rounded-lg text-xs font-sans text-[#2F3D37] resize-none"
            />
          </div>

          {/* Page Body Extract */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-bold text-[#2F3D37] uppercase tracking-wider">Contenido de Texto en Cuerpo</label>
            <textarea
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-[#D9B8A7]/40 rounded-lg text-xs font-sans text-[#2F3D37] resize-none"
            />
          </div>

          {error && <div className="text-red-500 text-xs font-medium bg-red-50 p-2.5 rounded-lg">{error}</div>}

          {/* Audit CTA Button */}
          <button
            onClick={runAudit}
            disabled={isAuditing}
            className="w-full bg-[#2F3D37] hover:bg-[#B8704F] text-[#FFFCF5] py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isAuditing ? (
              <>
                <LucideIcon name="RefreshCw" size={14} className="animate-spin" />
                Ejecutando Análisis con IA...
              </>
            ) : (
              <>
                <LucideIcon name="Sparkles" size={14} />
                Analizar SEO con IA
              </>
            )}
          </button>
        </div>

        {/* Right Side: Audit Score and Results view */}
        <div className="lg:col-span-6 bg-[#FFFCF5] border border-[#D9B8A7]/40 p-6 rounded-2xl flex flex-col gap-6 shadow-inner min-h-[500px] justify-center">
          {!auditResult ? (
            <div className="flex flex-col items-center justify-center text-center p-8 text-gray-400">
              <LucideIcon name="Sparkles" size={48} className="text-[#D9B8A7] mb-4 animate-pulse" />
              <h4 className="font-serif text-base font-bold text-[#2F3D37]">Sin Auditoría Activa</h4>
              <p className="font-sans text-xs text-[#6B4E4E] mt-1 max-w-xs leading-relaxed">
                Rellena o revisa los datos de la izquierda y haz clic en "Analizar SEO con IA" para recibir el reporte técnico detallado generado por la IA de Gemini.
              </p>
            </div>
          ) : (
            // SEO Audit Results report dashboard!
            <div className="flex flex-col gap-6 text-left">
              {/* Score and radial gauge */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-white border border-[#D9B8A7]/20 p-5 rounded-xl shadow-sm justify-between">
                <div className="text-center sm:text-left">
                  <span className="font-sans text-[10px] font-bold text-[#B8704F] uppercase tracking-widest block mb-0.5">Calificación Global</span>
                  <h4 className="font-serif text-xl font-bold text-[#2F3D37]">Puntuación SEO</h4>
                  <p className="font-sans text-[11px] text-[#6B4E4E] mt-1">Estimación según directrices y algoritmos de Google.</p>
                </div>
                {/* Score circular badge */}
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center border-4 border-[#D9B8A7]/20 bg-[#FFFCF5]">
                  <div className="text-center">
                    <span className="font-serif text-3xl font-extrabold text-[#2F3D37]">{auditResult.score}</span>
                    <span className="font-mono text-[10px] text-[#6B4E4E] block -mt-1">/100</span>
                  </div>
                  {/* Decorative rating ring based on score */}
                  <div className={`absolute inset-[-4px] rounded-full border-4 border-dashed animate-spin-slow pointer-events-none ${
                    auditResult.score >= 85 ? 'border-emerald-500' : auditResult.score >= 70 ? 'border-amber-500' : 'border-red-500'
                  }`} />
                </div>
              </div>

              {/* Title & Description analysis */}
              <div className="flex flex-col gap-4">
                <div className="bg-white border border-[#D9B8A7]/20 p-4 rounded-xl shadow-sm text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <LucideIcon name="FileText" size={16} className="text-[#B8704F]" />
                    <h5 className="font-serif text-sm font-bold text-[#2F3D37]">Análisis del Título</h5>
                  </div>
                  <p className="font-sans text-xs text-[#6B4E4E] leading-relaxed">{auditResult.titleAnalysis}</p>
                </div>

                <div className="bg-white border border-[#D9B8A7]/20 p-4 rounded-xl shadow-sm text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <LucideIcon name="Briefcase" size={16} className="text-[#B8704F]" />
                    <h5 className="font-serif text-sm font-bold text-[#2F3D37]">Análisis de la Descripción</h5>
                  </div>
                  <p className="font-sans text-xs text-[#6B4E4E] leading-relaxed">{auditResult.descriptionAnalysis}</p>
                </div>
              </div>

              {/* Keyword density table */}
              {auditResult.keywordDensity && auditResult.keywordDensity.length > 0 && (
                <div className="bg-white border border-[#D9B8A7]/20 p-4 rounded-xl shadow-sm text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <LucideIcon name="TrendingUp" size={16} className="text-[#B8704F]" />
                    <h5 className="font-serif text-sm font-bold text-[#2F3D37]">Densidad de Palabras Clave</h5>
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[10px] font-bold text-[#6B4E4E] uppercase border-b border-[#D9B8A7]/10 pb-2 mb-2">
                    <span>Palabra Clave</span>
                    <span className="text-center">Repeticiones</span>
                    <span className="text-right">Densidad %</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {auditResult.keywordDensity.map((kw: any, i: number) => (
                      <div key={i} className="grid grid-cols-3 gap-2 font-sans text-xs text-[#2F3D37]">
                        <span className="font-semibold">{kw.word}</span>
                        <span className="text-center font-mono font-medium">{kw.count}</span>
                        <span className="text-right font-mono font-bold text-[#B8704F]">{kw.densityPercent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Passes and Improvements List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Passes */}
                <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl text-left">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-serif text-xs font-bold mb-3">
                    <LucideIcon name="CheckCircle" size={14} className="text-emerald-600" />
                    Puntos Optimizados
                  </div>
                  <ul className="flex flex-col gap-2 list-none p-0">
                    {auditResult.passes.map((p: string, i: number) => (
                      <li key={i} className="font-sans text-[11px] text-emerald-700 leading-relaxed flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl text-left">
                  <div className="flex items-center gap-1.5 text-amber-800 font-serif text-xs font-bold mb-3">
                    <LucideIcon name="AlertCircle" size={14} className="text-amber-600" />
                    Mejoras Recomendadas
                  </div>
                  <ul className="flex flex-col gap-2 list-none p-0">
                    {auditResult.improvements.map((imp: string, i: number) => (
                      <li key={i} className="font-sans text-[11px] text-amber-700 leading-relaxed flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
