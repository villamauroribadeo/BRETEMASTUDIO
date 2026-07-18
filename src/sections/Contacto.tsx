import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from '../components/LucideIcon';

interface ContactoProps {
  selectedPlan: string;
  onClearPlan: () => void;
}

export default function Contacto({ selectedPlan, onClearPlan }: ContactoProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [plan, setPlan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedPlan) {
      setPlan(selectedPlan);
    }
  }, [selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Por favor, rellena todos los campos obligatorios.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          planSelected: plan || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario');
      }

      setSubmittedData(data.data);
      // Clear form
      setName('');
      setEmail('');
      setMessage('');
      setPlan('');
      onClearPlan();
    } catch (err: any) {
      setError(err.message || 'Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-[#071324] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left info column */}
          <div className="lg:col-span-5 text-left flex flex-col items-start">
            <span className="font-sans text-xs font-bold text-sky-300 uppercase tracking-widest bg-sky-500/10 px-3.5 py-2 rounded-full inline-block mb-4 border border-sky-400/20">
              Contacto directo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Empecemos a crear <br />
              <span className="text-sky-300 italic font-normal">tu nueva web hoy.</span>
            </h2>
            <p className="font-sans text-base text-white/80 leading-relaxed mb-8">
              Rellena nuestro sencillo formulario de contacto para explicarnos tu proyecto. Estaremos encantados de atenderte y te responderemos a la mayor brevedad posible para agendar una sesión y dar vida a tu nueva web.
            </p>

            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-sky-500/10 text-sky-300 flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500/20 group-hover:text-white border border-sky-400/20">
                  <LucideIcon name="Mail" size={18} />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-white/60 uppercase tracking-wider">Escríbenos</h4>
                  <p className="font-sans text-sm font-bold text-white">hola@bretemastudio.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-sky-500/10 text-sky-300 flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500/20 group-hover:text-white border border-sky-400/20">
                  <LucideIcon name="Phone" size={18} />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-white/60 uppercase tracking-wider">Llámanos o WhatsApp</h4>
                  <p className="font-sans text-sm font-bold text-white">+34 661 96 51 44</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-sky-500/10 text-sky-300 flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500/20 group-hover:text-white border border-sky-400/20">
                  <LucideIcon name="MapPin" size={18} />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-white/60 uppercase tracking-wider">Ubicación</h4>
                  <p className="font-sans text-sm font-bold text-white">Ribadeo, Galicia (España)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right contact card / form column */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(3,7,18,0.3)] hover:shadow-[0_20px_50px_rgba(56,189,248,0.15)] transition-all duration-500 rounded-3xl p-8 sm:p-10">
              
              <AnimatePresence mode="wait">
                {!submittedData ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="flex flex-col items-start gap-1.5 w-full">
                        <label htmlFor="name" className="font-sans text-xs font-bold text-white/90 uppercase tracking-wider">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Tu nombre completo"
                          className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 bg-white/5 font-sans text-sm text-white placeholder-white/30 transition-all"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col items-start gap-1.5 w-full">
                        <label htmlFor="email" className="font-sans text-xs font-bold text-white/90 uppercase tracking-wider">
                          Correo electrónico *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tucorreo@ejemplo.com"
                          className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 bg-white/5 font-sans text-sm text-white placeholder-white/30 transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Plan Selection */}
                    <div className="flex flex-col items-start gap-1.5">
                      <label htmlFor="plan" className="font-sans text-xs font-bold text-white/90 uppercase tracking-wider">
                        Plan de interés
                      </label>
                      <select
                        id="plan"
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 bg-[#071324] font-sans text-sm text-white transition-all"
                      >
                        <option value="">Selecciona un plan (opcional)</option>
                        <option value="Básico">Plan Básico (49€/mes)</option>
                        <option value="Starter">Plan Starter (79€/mes)</option>
                        <option value="Professional">Plan Professional (99€/mes)</option>
                        <option value="Business">Plan Business (129€/mes)</option>
                        <option value="Proyecto a Medida">Proyecto a Medida</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col items-start gap-1.5">
                      <label htmlFor="message" className="font-sans text-xs font-bold text-white/90 uppercase tracking-wider">
                        Cuéntanos sobre tu negocio *
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe brevemente tu marca, objetivos y qué necesitas en tu nueva web..."
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 bg-white/5 font-sans text-sm text-white placeholder-white/30 resize-none transition-all"
                        required
                      />
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-xs font-medium text-left flex items-center gap-2">
                        <LucideIcon name="AlertCircle" size={16} />
                        {error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-sky-500/25 hover:bg-sky-500/40 text-white border border-sky-400/40 hover:border-sky-300 py-4 rounded-xl font-sans text-sm font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] disabled:bg-gray-400/20 disabled:text-white/40 disabled:cursor-not-allowed transform active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <LucideIcon name="RefreshCw" size={16} className="animate-spin" />
                          Enviando consulta...
                        </>
                      ) : (
                        <>
                          <LucideIcon name="Send" size={16} />
                          Enviar Mensaje de Contacto
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  // Elegant slide-in card showing the response simulation in real-time!
                  <motion.div
                    key="submission-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-left"
                  >
                    <div className="flex items-center gap-3 text-sky-300 bg-sky-500/10 border border-sky-400/20 px-4 py-3 rounded-2xl mb-6">
                      <LucideIcon name="CheckCircle" size={24} />
                      <div>
                        <h4 className="font-sans text-sm font-bold">¡Mensaje Enviado con Éxito!</h4>
                        <p className="font-sans text-xs text-white/70">Se ha enviado y registrado la consulta correctamente.</p>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-white mb-2">
                      Buzón de Brétema Studio (Vista Previa de Correo de Recibido)
                    </h3>
                    <p className="font-sans text-xs text-white/70 mb-6">
                      El siguiente correo de confirmación de recepción ha sido generado y enviado automáticamente a <strong className="text-white">{submittedData.email}</strong>:
                    </p>

                    {/* Simulated Email view */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl shadow-inner overflow-hidden">
                      {/* Email header */}
                      <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex flex-col gap-1.5 font-sans text-xs">
                        <div className="flex items-center justify-between text-white/70">
                          <span>De: <strong className="text-white">contacto@bretemastudio.com</strong></span>
                          <span className="font-mono bg-sky-500/10 border border-sky-400/25 rounded px-1.5 font-semibold text-[10px] text-sky-300">RECIBIDO</span>
                        </div>
                        <div className="text-white/70">
                          Para: <strong className="text-white">{submittedData.name} ({submittedData.email})</strong>
                        </div>
                        <div className="text-sky-300 font-semibold mt-1">
                          Asunto: ¡Hola {submittedData.name}! Recibimos tu consulta en Brétema Studio
                        </div>
                      </div>

                      {/* Email body */}
                      <div className="p-6 font-sans text-sm text-white/90 whitespace-pre-line leading-relaxed max-h-[300px] overflow-y-auto bg-[#071324]/60">
                        {submittedData.automatedReply}
                      </div>
                    </div>

                    {/* Reset Button */}
                    <button
                      onClick={() => setSubmittedData(null)}
                      className="mt-6 flex items-center justify-center gap-1.5 text-xs font-bold text-white hover:text-sky-300 transition-colors pb-1 border-b border-white/10 self-start"
                    >
                      <LucideIcon name="Undo" size={14} />
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
