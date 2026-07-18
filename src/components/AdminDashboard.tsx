import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CMSContent, ContactMessage, Service, PortfolioItem, PricingPlan, Testimonial } from '../types';
import LucideIcon from './LucideIcon';
import SeoPanel from './SeoPanel';

interface AdminDashboardProps {
  onExit: () => void;
  content: CMSContent;
  onRefreshContent: () => void;
}

export default function AdminDashboard({ onExit, content, onRefreshContent }: AdminDashboardProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'cms' | 'mailbox' | 'seo'>('cms');
  const [activeCmsSubTab, setActiveCmsSubTab] = useState<'services' | 'portfolio' | 'plans' | 'testimonials' | 'seo-meta'>('services');

  // CMS editable copies
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [seoMeta, setSeoMeta] = useState({ metaTitle: '', metaDescription: '', keywords: '' });

  // Mailbox data
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyBody, setReplyBody] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [isDraftingReply, setIsDraftingReply] = useState(false);
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [mailboxError, setMailboxError] = useState('');

  // CMS saving states
  const [isSavingCms, setIsSavingCms] = useState(false);
  const [cmsSaveMessage, setCmsSaveMessage] = useState('');

  useEffect(() => {
    // Sync state when content props change
    if (content) {
      setServices(content.services || []);
      setPortfolio(content.portfolio || []);
      setPlans(content.plans || []);
      setTestimonials(content.testimonials || []);
      setSeoMeta(content.seo || { metaTitle: '', metaDescription: '', keywords: '' });
    }
  }, [content]);

  // Load Mailbox messages
  const loadMailbox = async () => {
    try {
      const res = await fetch('/api/emails');
      const data = await res.json();
      setMessages(data);
      if (selectedMessage) {
        // Refresh selected message
        const refreshed = data.find((m: any) => m.id === selectedMessage.id);
        if (refreshed) setSelectedMessage(refreshed);
      }
    } catch (err) {
      console.error('Error loading mailbox:', err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadMailbox();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoggingIn(true);
    setAuthError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Contraseña incorrecta');
      }

      setIsLoggedIn(true);
      sessionStorage.setItem('admin_token', data.token);
    } catch (err: any) {
      setAuthError(err.message || 'Error de autenticación');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Autologin check
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (token === 'admin-token-bretema') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    setIsLoggedIn(false);
    setPassword('');
  };

  // CMS UPDATE ACTIONS
  const saveCmsSection = async (section: string, data: any) => {
    setIsSavingCms(true);
    setCmsSaveMessage('');
    try {
      const res = await fetch('/api/content/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: 'bretema2026', // Uses backend admin credential
          section,
          data
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Error al guardar');
      
      setCmsSaveMessage(`✓ Cambios en ${section} guardados correctamente.`);
      onRefreshContent(); // refresh website landing data
      setTimeout(() => setCmsSaveMessage(''), 4000);
    } catch (err: any) {
      setCmsSaveMessage(`❌ Error: ${err.message}`);
    } finally {
      setIsSavingCms(false);
    }
  };

  // Mailbox Handlers
  const handleDraftWithAi = async () => {
    if (!selectedMessage || !adminNote) {
      setMailboxError('Por favor, escribe una breve indicación de lo que deseas responder para redactarlo con IA.');
      return;
    }

    setIsDraftingReply(true);
    setMailboxError('');

    try {
      const res = await fetch('/api/emails/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalMessage: selectedMessage,
          adminNote
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al redactar');

      setReplyBody(data.draft);
      setAdminNote('');
    } catch (err: any) {
      setMailboxError(err.message || 'Error al conectar con la IA de redacción.');
    } finally {
      setIsDraftingReply(false);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyBody) return;

    setIsSendingReply(true);
    setMailboxError('');

    try {
      const res = await fetch('/api/emails/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: selectedMessage.id,
          body: replyBody
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al enviar respuesta');

      setReplyBody('');
      loadMailbox(); // refresh logs
    } catch (err: any) {
      setMailboxError(err.message || 'Error al registrar la respuesta.');
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('¿Seguro que deseas eliminar este mensaje del buzón de entrada?')) return;

    try {
      const res = await fetch('/api/emails/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId: id }),
      });
      if (res.ok) {
        if (selectedMessage?.id === id) setSelectedMessage(null);
        loadMailbox();
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  // EDIT HELPERS
  // Services
  const handleServiceChange = (id: string, field: keyof Service, val: any) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: val } : s));
  };
  const handleAddService = () => {
    const newS: Service = { id: Math.random().toString(36).substring(2, 9), icon: 'Globe', title: 'Nuevo Servicio', description: 'Descripción de ejemplo.' };
    setServices([...services, newS]);
  };
  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  // Portfolio
  const handlePortfolioChange = (id: string, field: keyof PortfolioItem, val: any) => {
    setPortfolio(portfolio.map(p => p.id === id ? { ...p, [field]: val } : p));
  };
  const handleAddPortfolio = () => {
    const newP: PortfolioItem = { id: Math.random().toString(36).substring(2, 9), title: 'Nuevo Proyecto', category: 'Categoría', image: '/images/proyecto-portfolio-1.jpg' };
    setPortfolio([...portfolio, newP]);
  };
  const handleDeletePortfolio = (id: string) => {
    setPortfolio(portfolio.filter(p => p.id !== id));
  };

  // Testimonials
  const handleTestimonialChange = (id: string, field: keyof Testimonial, val: any) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: val } : t));
  };
  const handleAddTestimonial = () => {
    const newT: Testimonial = { id: Math.random().toString(36).substring(2, 9), text: 'Opinión del cliente.', author: 'Nombre', role: 'Rol, Empresa', avatar: '' };
    setTestimonials([...testimonials, newT]);
  };
  const handleDeleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  // Plans features
  const handlePlanFeatureChange = (planId: string, idx: number, val: string) => {
    setPlans(plans.map(p => {
      if (p.id === planId) {
        const newFeats = [...p.features];
        newFeats[idx] = val;
        return { ...p, features: newFeats };
      }
      return p;
    }));
  };
  const handleAddPlanFeature = (planId: string) => {
    setPlans(plans.map(p => {
      if (p.id === planId) {
        return { ...p, features: [...p.features, 'Nueva característica'] };
      }
      return p;
    }));
  };
  const handleDeletePlanFeature = (planId: string, idx: number) => {
    setPlans(plans.map(p => {
      if (p.id === planId) {
        return { ...p, features: p.features.filter((_, i) => i !== idx) };
      }
      return p;
    }));
  };

  if (!isLoggedIn) {
    // Beautiful Glassmorphic Login
    return (
      <div className="min-h-screen bg-[#FFFCF5] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D9B8A7]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#B8704F]/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-md border border-[#D9B8A7]/30 shadow-2xl p-8 sm:p-10 rounded-3xl w-full max-w-sm text-center relative z-10 flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-full bg-[#2F3D37]/5 flex items-center justify-center text-[#2F3D37] mb-6">
            <LucideIcon name="Lock" size={28} />
          </div>

          <h2 className="font-serif text-2xl font-bold text-[#2F3D37] mb-2">Panel de Control</h2>
          <p className="font-sans text-xs text-[#6B4E4E] mb-6">
            Introduce la clave de acceso de administrador para gestionar los contenidos, el correo y la auditoría SEO.
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="flex flex-col items-start gap-1.5">
              <label htmlFor="passcode" className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">
                Contraseña de Administrador
              </label>
              <input
                type="password"
                id="passcode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Prueba con: bretema2026"
                className="w-full px-4 py-3 rounded-xl border border-[#D9B8A7]/40 focus:outline-none focus:ring-2 focus:ring-[#B8704F] bg-white font-sans text-sm text-[#2F3D37] text-center"
                required
                autoFocus
              />
            </div>

            {authError && (
              <div className="text-red-600 text-xs font-semibold bg-red-50 p-2.5 rounded-lg">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#2F3D37] hover:bg-[#B8704F] text-[#FFFCF5] py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300"
            >
              {isLoggingIn ? 'Iniciando sesión...' : 'Entrar al Gestor'}
            </button>
          </form>

          <button
            onClick={onExit}
            className="mt-6 font-sans text-xs font-semibold text-[#6B4E4E] hover:text-[#B8704F] transition-colors pb-0.5 border-b border-dashed border-[#D9B8A7]"
          >
            Volver a la web pública
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFCF5] pt-24 pb-12 text-[#2F3D37] text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 border-b border-[#D9B8A7]/30 pb-6">
          <div className="text-left">
            <span className="font-mono text-xs text-[#B8704F] font-bold uppercase tracking-widest block mb-1">
              Bretema Studio CMS
            </span>
            <h1 className="font-serif text-3xl font-extrabold text-[#2F3D37]">Bandeja de Control Administrativa</h1>
          </div>
          
          {/* Main Dashboard Navigation Tabs */}
          <div className="flex gap-2 bg-[#2F3D37]/5 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('cms')}
              className={`px-4 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                activeTab === 'cms' ? 'bg-[#2F3D37] text-white shadow-md' : 'text-[#2F3D37] hover:bg-[#2F3D37]/10'
              }`}
            >
              <LucideIcon name="Settings" size={14} />
              Contenidos CMS
            </button>
            <button
              onClick={() => setActiveTab('mailbox')}
              className={`px-4 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all relative ${
                activeTab === 'mailbox' ? 'bg-[#2F3D37] text-white shadow-md' : 'text-[#2F3D37] hover:bg-[#2F3D37]/10'
              }`}
            >
              <LucideIcon name="Inbox" size={14} />
              Buzón e Inbox
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#B8704F] text-[#FFFCF5] rounded-full text-[9px] font-bold flex items-center justify-center border border-white">
                  {messages.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-4 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                activeTab === 'seo' ? 'bg-[#2F3D37] text-white shadow-md' : 'text-[#2F3D37] hover:bg-[#2F3D37]/10'
              }`}
            >
              <LucideIcon name="Sparkles" size={14} />
              Auditoría SEO
            </button>
          </div>
        </div>

        {/* TAB 1: CMS - CONTENT EDITING */}
        {activeTab === 'cms' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar with sub tabs */}
            <div className="lg:col-span-3 bg-white border border-[#D9B8A7]/30 rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
              <h3 className="font-serif text-sm font-bold text-[#6B4E4E] uppercase tracking-wider px-3 mb-2">Secciones Web</h3>
              {[
                { key: 'services', label: 'Servicios', icon: 'Layers' },
                { key: 'portfolio', label: 'Portfolio', icon: 'Briefcase' },
                { key: 'plans', label: 'Tarifas y Planes', icon: 'DollarSign' },
                { key: 'testimonials', label: 'Testimonios', icon: 'Users' },
                { key: 'seo-meta', label: 'Metadatos SEO', icon: 'FileText' },
              ].map((sub) => (
                <button
                  key={sub.key}
                  onClick={() => {
                    setActiveCmsSubTab(sub.key as any);
                    setCmsSaveMessage('');
                  }}
                  className={`w-full px-4 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-colors ${
                    activeCmsSubTab === sub.key
                      ? 'bg-[#B8704F]/10 text-[#B8704F]'
                      : 'text-[#6B4E4E] hover:bg-[#2F3D37]/5'
                  }`}
                >
                  <LucideIcon name={sub.icon} size={14} />
                  {sub.label}
                </button>
              ))}

              <div className="h-px bg-[#D9B8A7]/20 my-4" />
              
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
              >
                <LucideIcon name="LogOut" size={14} />
                Cerrar Sesión
              </button>
            </div>

            {/* Editing Panel Area */}
            <div className="lg:col-span-9 bg-white border border-[#D9B8A7]/30 rounded-2xl p-6 md:p-8 shadow-sm text-left">
              
              {/* SAVING MSG */}
              {cmsSaveMessage && (
                <div className={`mb-6 p-4 rounded-xl text-xs font-bold ${
                  cmsSaveMessage.startsWith('❌') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-800'
                }`}>
                  {cmsSaveMessage}
                </div>
              )}

              {/* Sub tab: SERVICES */}
              {activeCmsSubTab === 'services' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-[#2F3D37]">Gestionar Servicios</h2>
                      <p className="font-sans text-xs text-[#6B4E4E]">Añade, edita o elimina los servicios ofrecidos en la página principal.</p>
                    </div>
                    <button
                      onClick={handleAddService}
                      className="bg-[#2F3D37] hover:bg-[#B8704F] text-[#FFFCF5] px-4 py-2 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <LucideIcon name="Plus" size={14} />
                      Nuevo Servicio
                    </button>
                  </div>

                  <div className="flex flex-col gap-6 mt-4">
                    {services.map((s) => (
                      <div key={s.id} className="border border-[#D9B8A7]/30 p-5 rounded-2xl bg-[#FFFCF5] flex flex-col gap-4 relative">
                        <button
                          onClick={() => handleDeleteService(s.id)}
                          className="absolute top-4 right-4 text-[#6B4E4E] hover:text-red-600 p-1 transition-colors"
                          title="Eliminar servicio"
                        >
                          <LucideIcon name="Trash2" size={16} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Título</label>
                            <input
                              type="text"
                              value={s.title}
                              onChange={(e) => handleServiceChange(s.id, 'title', e.target.value)}
                              className="px-3 py-2 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Icono (Nombre Lucide)</label>
                            <select
                              value={s.icon}
                              onChange={(e) => handleServiceChange(s.id, 'icon', e.target.value)}
                              className="px-3 py-2 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white"
                            >
                              <option value="PenTool">PenTool (Diseño)</option>
                              <option value="Globe">Globe (Alquiler Web)</option>
                              <option value="TrendingUp">TrendingUp (SEO)</option>
                              <option value="Layers">Layers (Proyectos)</option>
                              <option value="Briefcase">Briefcase (Portfolio)</option>
                              <option value="Rocket">Rocket (Lanzamiento)</option>
                            </select>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Ruta de Imagen (Placeholder)</label>
                            <input
                              type="text"
                              value={s.image || ''}
                              onChange={(e) => handleServiceChange(s.id, 'image', e.target.value)}
                              className="px-3 py-2 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Descripción del Servicio</label>
                          <textarea
                            value={s.description}
                            onChange={(e) => handleServiceChange(s.id, 'description', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => saveCmsSection('services', services)}
                    disabled={isSavingCms}
                    className="mt-4 bg-[#B8704F] hover:bg-[#2F3D37] text-white px-6 py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all self-start flex items-center gap-2"
                  >
                    <LucideIcon name="Save" size={14} />
                    {isSavingCms ? 'Guardando...' : 'Guardar Servicios'}
                  </button>
                </div>
              )}

              {/* Sub tab: PORTFOLIO */}
              {activeCmsSubTab === 'portfolio' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-[#2F3D37]">Gestionar Portfolio</h2>
                      <p className="font-sans text-xs text-[#6B4E4E]">Gestiona los proyectos que aparecen en la vitrina de trabajos.</p>
                    </div>
                    <button
                      onClick={handleAddPortfolio}
                      className="bg-[#2F3D37] hover:bg-[#B8704F] text-[#FFFCF5] px-4 py-2 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <LucideIcon name="Plus" size={14} />
                      Nuevo Proyecto
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {portfolio.map((p) => (
                      <div key={p.id} className="border border-[#D9B8A7]/30 p-5 rounded-2xl bg-[#FFFCF5] flex flex-col gap-4 relative">
                        <button
                          onClick={() => handleDeletePortfolio(p.id)}
                          className="absolute top-4 right-4 text-[#6B4E4E] hover:text-red-600 p-1 transition-colors"
                          title="Eliminar proyecto"
                        >
                          <LucideIcon name="Trash2" size={16} />
                        </button>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Nombre del Proyecto</label>
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => handlePortfolioChange(p.id, 'title', e.target.value)}
                            className="px-3 py-2 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Categoría / Rubro</label>
                          <input
                            type="text"
                            value={p.category}
                            onChange={(e) => handlePortfolioChange(p.id, 'category', e.target.value)}
                            className="px-3 py-2 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Ruta de Imagen (URL)</label>
                          <input
                            type="text"
                            value={p.image}
                            onChange={(e) => handlePortfolioChange(p.id, 'image', e.target.value)}
                            className="px-3 py-2 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => saveCmsSection('portfolio', portfolio)}
                    disabled={isSavingCms}
                    className="mt-4 bg-[#B8704F] hover:bg-[#2F3D37] text-white px-6 py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all self-start flex items-center gap-2"
                  >
                    <LucideIcon name="Save" size={14} />
                    {isSavingCms ? 'Guardando...' : 'Guardar Portfolio'}
                  </button>
                </div>
              )}

              {/* Sub tab: PLANS */}
              {activeCmsSubTab === 'plans' && (
                <div className="flex flex-col gap-8">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#2F3D37]">Precios y Características de Planes</h2>
                    <p className="font-sans text-xs text-[#6B4E4E]">Ajusta las tarifas mensuales y actualiza la lista de características incluidas.</p>
                  </div>

                  <div className="flex flex-col gap-8">
                    {plans.map((p) => (
                      <div key={p.id} className="border border-[#D9B8A7]/30 p-6 rounded-3xl bg-[#FFFCF5] flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Nombre del Plan</label>
                            <input
                              type="text"
                              value={p.name}
                              className="px-3 py-2 border border-gray-200 rounded-xl text-xs font-sans text-gray-500 bg-gray-100 cursor-not-allowed"
                              disabled
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Precio Mensual (€)</label>
                            <input
                              type="text"
                              value={p.price}
                              onChange={(e) => setPlans(plans.map(plan => plan.id === p.id ? { ...plan, price: e.target.value } : plan))}
                              className="px-3 py-2 border border-[#D9B8A7]/40 rounded-xl text-xs font-mono font-bold text-[#2F3D37] bg-white"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Enfoque (Descripción)</label>
                            <input
                              type="text"
                              value={p.description}
                              onChange={(e) => setPlans(plans.map(plan => plan.id === p.id ? { ...plan, description: e.target.value } : plan))}
                              className="px-3 py-2 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white"
                            />
                          </div>
                        </div>

                        {/* Features sub list editing */}
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif text-sm font-bold text-[#2F3D37]">Características del Plan {p.name}</h4>
                            <button
                              onClick={() => handleAddPlanFeature(p.id)}
                              className="text-xs font-bold text-[#B8704F] hover:text-[#2F3D37] flex items-center gap-1"
                            >
                              <LucideIcon name="Plus" size={12} />
                              Añadir Item
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {p.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 border border-gray-100 bg-white px-3 py-2 rounded-xl">
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={(e) => handlePlanFeatureChange(p.id, idx, e.target.value)}
                                  className="flex-grow font-sans text-xs text-[#6B4E4E] border-none focus:outline-none bg-transparent"
                                />
                                <button
                                  onClick={() => handleDeletePlanFeature(p.id, idx)}
                                  className="text-gray-400 hover:text-red-500 p-0.5"
                                >
                                  <LucideIcon name="X" size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => saveCmsSection('plans', plans)}
                    disabled={isSavingCms}
                    className="mt-4 bg-[#B8704F] hover:bg-[#2F3D37] text-white px-6 py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all self-start flex items-center gap-2"
                  >
                    <LucideIcon name="Save" size={14} />
                    {isSavingCms ? 'Guardando...' : 'Guardar Planes'}
                  </button>
                </div>
              )}

              {/* Sub tab: TESTIMONIALS */}
              {activeCmsSubTab === 'testimonials' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-[#2F3D37]">Gestionar Testimonios</h2>
                      <p className="font-sans text-xs text-[#6B4E4E]">Añade y edita las opiniones que aparecen en el carrusel de valoraciones.</p>
                    </div>
                    <button
                      onClick={handleAddTestimonial}
                      className="bg-[#2F3D37] hover:bg-[#B8704F] text-[#FFFCF5] px-4 py-2 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <LucideIcon name="Plus" size={14} />
                      Nuevo Testimonio
                    </button>
                  </div>

                  <div className="flex flex-col gap-6 mt-4">
                    {testimonials.map((t) => (
                      <div key={t.id} className="border border-[#D9B8A7]/30 p-5 rounded-2xl bg-[#FFFCF5] flex flex-col gap-4 relative">
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="absolute top-4 right-4 text-[#6B4E4E] hover:text-red-600 p-1 transition-colors"
                          title="Eliminar testimonio"
                        >
                          <LucideIcon name="Trash2" size={16} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Nombre del Autor</label>
                            <input
                              type="text"
                              value={t.author}
                              onChange={(e) => handleTestimonialChange(t.id, 'author', e.target.value)}
                              className="px-3 py-2 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Rol / Empresa</label>
                            <input
                              type="text"
                              value={t.role}
                              onChange={(e) => handleTestimonialChange(t.id, 'role', e.target.value)}
                              className="px-3 py-2 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Cita / Testimonio</label>
                          <textarea
                            value={t.text}
                            onChange={(e) => handleTestimonialChange(t.id, 'text', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => saveCmsSection('testimonials', testimonials)}
                    disabled={isSavingCms}
                    className="mt-4 bg-[#B8704F] hover:bg-[#2F3D37] text-white px-6 py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all self-start flex items-center gap-2"
                  >
                    <LucideIcon name="Save" size={14} />
                    {isSavingCms ? 'Guardando...' : 'Guardar Testimonios'}
                  </button>
                </div>
              )}

              {/* Sub tab: SEO META CONFIG */}
              {activeCmsSubTab === 'seo-meta' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#2F3D37]">Configuración de Metadatos SEO Global</h2>
                    <p className="font-sans text-xs text-[#6B4E4E]">Ajusta las etiquetas de título y descripción que indexará Google en el sitio público.</p>
                  </div>

                  <div className="border border-[#D9B8A7]/30 p-6 rounded-2xl bg-[#FFFCF5] flex flex-col gap-5 mt-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Título de Pestaña Principal (Meta Title)</label>
                      <input
                        type="text"
                        value={seoMeta.metaTitle}
                        onChange={(e) => setSeoMeta({ ...seoMeta, metaTitle: e.target.value })}
                        className="px-3 py-2.5 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Descripción de Búsqueda (Meta Description)</label>
                      <textarea
                        value={seoMeta.metaDescription}
                        onChange={(e) => setSeoMeta({ ...seoMeta, metaDescription: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2.5 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-[#2F3D37] uppercase tracking-wider">Palabras Clave (Keywords, separadas por coma)</label>
                      <input
                        type="text"
                        value={seoMeta.keywords}
                        onChange={(e) => setSeoMeta({ ...seoMeta, keywords: e.target.value })}
                        className="px-3 py-2.5 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] bg-white"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => saveCmsSection('seo', seoMeta)}
                    disabled={isSavingCms}
                    className="mt-4 bg-[#B8704F] hover:bg-[#2F3D37] text-white px-6 py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all self-start flex items-center gap-2"
                  >
                    <LucideIcon name="Save" size={14} />
                    {isSavingCms ? 'Guardando...' : 'Guardar Metadatos'}
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 2: MAILBOX & EMAILS */}
        {activeTab === 'mailbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left list panel */}
            <div className="lg:col-span-4 bg-white border border-[#D9B8A7]/30 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[650px]">
              <div className="bg-[#2F3D37]/5 px-5 py-4 border-b border-[#D9B8A7]/20 flex items-center justify-between">
                <h3 className="font-serif text-sm font-bold text-[#2F3D37] uppercase tracking-wider flex items-center gap-1.5">
                  <LucideIcon name="Inbox" size={16} />
                  Mensajes Recibidos
                </h3>
                <span className="font-mono text-[10px] font-bold bg-[#D9B8A7]/30 text-[#B8704F] px-2 py-0.5 rounded">
                  {messages.length} hilos
                </span>
              </div>

              {/* Message scroll list */}
              <div className="flex-grow overflow-y-auto divide-y divide-[#D9B8A7]/10">
                {messages.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 font-sans text-xs leading-relaxed">
                    No hay solicitudes de contacto todavía.
                  </div>
                ) : (
                  messages.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedMessage(m);
                        setReplyBody('');
                        setAdminNote('');
                        setMailboxError('');
                      }}
                      className={`w-full p-4 text-left transition-colors flex flex-col gap-1.5 hover:bg-[#D9B8A7]/5 ${
                        selectedMessage?.id === m.id ? 'bg-[#D9B8A7]/15 border-l-4 border-l-[#B8704F]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-xs font-bold text-[#2F3D37]">{m.name}</span>
                        <span className="font-mono text-[9px] text-[#6B4E4E]">
                          {new Date(m.timestamp).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      <span className="font-sans text-[10px] text-[#6B4E4E] font-medium truncate block">{m.email}</span>
                      <p className="font-sans text-[11px] text-[#6B4E4E]/80 line-clamp-2 mt-1 italic">
                        "{m.message}"
                      </p>
                      
                      {/* Badge for plan selected */}
                      {m.planSelected && (
                        <span className="font-mono text-[8px] font-bold bg-[#2F3D37]/10 text-[#2F3D37] px-2 py-0.5 rounded-full mt-2 self-start uppercase tracking-wider">
                          Interés: {m.planSelected}
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Right details / action panel */}
            <div className="lg:col-span-8 bg-white border border-[#D9B8A7]/30 rounded-2xl p-6 md:p-8 shadow-sm h-[650px] overflow-y-auto flex flex-col justify-between">
              
              {!selectedMessage ? (
                <div className="flex flex-col items-center justify-center text-center p-8 text-gray-400 flex-grow">
                  <LucideIcon name="Mail" size={48} className="text-[#D9B8A7] mb-4" />
                  <h4 className="font-serif text-base font-bold text-[#2F3D37]">Buzón Inteligente Vacío</h4>
                  <p className="font-sans text-xs text-[#6B4E4E] mt-1 max-w-xs leading-relaxed">
                    Selecciona un mensaje de la bandeja de entrada para ver el hilo completo, revisar la respuesta automática generada por la IA y redactar respuestas personalizadas con soporte inteligente.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6 flex-grow justify-between h-full">
                  
                  {/* Thread details */}
                  <div className="flex flex-col gap-5 overflow-y-auto max-h-[350px] pr-2">
                    
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-[#D9B8A7]/20 pb-4">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#2F3D37]">{selectedMessage.name}</h3>
                        <p className="font-sans text-xs text-[#6B4E4E]">Consultor: <strong className="text-[#2F3D37]">{selectedMessage.email}</strong></p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-gray-400">ID: {selectedMessage.id}</span>
                        <button
                          onClick={() => handleDeleteMessage(selectedMessage.id)}
                          className="text-gray-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors"
                          title="Eliminar mensaje"
                        >
                          <LucideIcon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Chat Bubble: User Submission */}
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-mono text-[9px] text-[#6B4E4E] font-semibold uppercase tracking-wider">Inquiry (Formulario de la Web)</span>
                      <div className="bg-[#D9B8A7]/15 border border-[#D9B8A7]/20 rounded-2xl p-4 max-w-[85%] text-left font-sans text-xs text-[#2F3D37] leading-relaxed relative">
                        {selectedMessage.message}
                        <span className="block text-right font-mono text-[8px] text-[#6B4E4E] mt-2">
                          {new Date(selectedMessage.timestamp).toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </div>

                    {/* Chat Bubble: Automated reply sent */}
                    {selectedMessage.automatedReply && (
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-[9px] text-[#B8704F] font-semibold uppercase tracking-wider">Correo Automático IA (Enviado)</span>
                        <div className="bg-[#2F3D37] text-white rounded-2xl p-4 max-w-[85%] text-left font-sans text-xs leading-relaxed relative border border-[#2F3D37]">
                          <p className="whitespace-pre-line">{selectedMessage.automatedReply}</p>
                          <span className="block text-right font-mono text-[8px] text-white/60 mt-2">
                            Enviado al Instante ✓
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Manual replies sent */}
                    {selectedMessage.manualReplies?.map((rep) => (
                      <div key={rep.id} className="flex flex-col items-end gap-1">
                        <span className="font-mono text-[9px] text-emerald-700 font-semibold uppercase tracking-wider">Respuesta del Administrador (Enviado)</span>
                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-2xl p-4 max-w-[85%] text-left font-sans text-xs leading-relaxed relative">
                          <p className="whitespace-pre-line">{rep.body}</p>
                          <span className="block text-right font-mono text-[8px] text-emerald-600 mt-2">
                            {new Date(rep.timestamp).toLocaleString('es-ES')}
                          </span>
                        </div>
                      </div>
                    ))}

                  </div>

                  {/* Mailbox Editor (Action area) */}
                  <div className="border-t border-[#D9B8A7]/30 pt-4 flex flex-col gap-4">
                    {mailboxError && (
                      <div className="bg-red-50 text-red-600 p-2.5 rounded-lg text-xs font-semibold">{mailboxError}</div>
                    )}

                    {/* AI Assistance Drawer */}
                    <div className="bg-[#B8704F]/10 border border-[#D9B8A7]/20 p-4 rounded-xl flex flex-col gap-3 text-left">
                      <div className="flex items-center gap-1 text-xs font-bold text-[#B8704F] uppercase tracking-wider">
                        <LucideIcon name="Sparkles" size={14} />
                        Redactor de Correo Inteligente
                      </div>
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={adminNote}
                          onChange={(e) => setAdminNote(e.target.value)}
                          placeholder="Acepta una reunión este viernes a las 10 o pide detalles de su web actual..."
                          className="flex-grow px-3 py-2 border border-[#D9B8A7]/30 bg-white rounded-lg text-xs focus:outline-none"
                        />
                        <button
                          onClick={handleDraftWithAi}
                          disabled={isDraftingReply || !adminNote}
                          className="bg-[#2F3D37] hover:bg-[#B8704F] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-40"
                        >
                          {isDraftingReply ? (
                            <>
                              <LucideIcon name="RefreshCw" size={12} className="animate-spin" />
                              Redactando...
                            </>
                          ) : (
                            <>
                              <LucideIcon name="Sparkles" size={12} />
                              Redactar con IA
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Plain Text Editor Area */}
                    <form onSubmit={handleSendReply} className="flex flex-col gap-3">
                      <textarea
                        value={replyBody}
                        onChange={(e) => setReplyBody(e.target.value)}
                        placeholder="Escribe la respuesta personalizada del correo electrónico aquí..."
                        rows={3}
                        className="w-full px-3 py-2.5 border border-[#D9B8A7]/40 rounded-xl text-xs font-sans text-[#2F3D37] resize-none"
                        required
                      />
                      <div className="flex justify-end gap-3">
                        {replyBody && (
                          <button
                            type="button"
                            onClick={() => setReplyBody('')}
                            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#2F3D37]"
                          >
                            Limpiar
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={isSendingReply || !replyBody}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
                        >
                          {isSendingReply ? (
                            'Registrando...'
                          ) : (
                            <>
                              <LucideIcon name="Send" size={12} />
                              Enviar Respuesta
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 3: SEO AUDITING PANEL */}
        {activeTab === 'seo' && (
          <div className="bg-white border border-[#D9B8A7]/30 rounded-3xl p-6 md:p-8 shadow-sm">
            <SeoPanel />
          </div>
        )}

      </div>
    </div>
  );
}
