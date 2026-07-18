import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { trpc } from '@/providers/trpc';

gsap.registerPlugin(ScrollTrigger);

export default function Contacto() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    plan: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const createContact = trpc.contact.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '', plan: '' });
    },
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Email inválido';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    createContact.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message,
      plan: formData.plan || undefined,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

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
        formRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
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

      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.3,
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

  if (submitted) {
    return (
      <section id="contacto" className="w-full bg-[#D9B8A7] py-20 md:py-32">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <CheckCircle size={64} className="text-[#4A7C6F] mx-auto mb-6" />
          <h2 className="text-[32px] md:text-[48px] font-serif text-[#2F3D37] mb-4">
            ¡Mensaje enviado!
          </h2>
          <p className="text-base text-[#6B4E4E] leading-[1.7]">
            Gracias por contactarnos. Te responderemos en menos de 24 horas.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-pill mt-8"
          >
            Enviar otro mensaje
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="w-full bg-[#D9B8A7] py-20 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="section-label block mb-4">Contacto</span>
          <h2 className="text-[32px] md:text-[48px] font-serif font-normal leading-[1.2] text-[#2F3D37]">
            Hablemos de tu proyecto
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-16">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 opacity-0">
            <input type="hidden" id="plan-input" name="plan" value={formData.plan} />

            <div>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-transparent border-0 border-b py-4 text-[#2F3D37] placeholder:text-[#8A9A8D] focus:outline-none focus:border-[#B8704F] transition-colors ${
                  errors.name ? 'border-[#C45B4A]' : 'border-[#2F3D37]'
                }`}
              />
              {errors.name && (
                <p className="text-sm text-[#C45B4A] mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-transparent border-0 border-b py-4 text-[#2F3D37] placeholder:text-[#8A9A8D] focus:outline-none focus:border-[#B8704F] transition-colors ${
                  errors.email ? 'border-[#C45B4A]' : 'border-[#2F3D37]'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-[#C45B4A] mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono (opcional)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b border-[#2F3D37] py-4 text-[#2F3D37] placeholder:text-[#8A9A8D] focus:outline-none focus:border-[#B8704F] transition-colors"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Cuéntanos sobre tu proyecto"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full bg-transparent border-0 border-b py-4 text-[#2F3D37] placeholder:text-[#8A9A8D] focus:outline-none focus:border-[#B8704F] transition-colors resize-none ${
                  errors.message ? 'border-[#C45B4A]' : 'border-[#2F3D37]'
                }`}
              />
              {errors.message && (
                <p className="text-sm text-[#C45B4A] mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={createContact.isPending}
              className="btn-pill disabled:opacity-70"
            >
              {createContact.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Enviando...
                </span>
              ) : (
                'Enviar mensaje'
              )}
            </button>
          </form>

          {/* Info panel */}
          <div ref={infoRef} className="opacity-0">
            <div className="glass-card p-8 md:p-10">
              <h3 className="text-xl font-serif text-[#2F3D37] mb-6">
                Información de contacto
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-[#B8704F] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#2F3D37]">Dirección</p>
                    <p className="text-sm text-[#6B4E4E]">
                      Ría de Ribadeo, Lugo
                      <br />
                      Galicia, España
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-[#B8704F] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#2F3D37]">Teléfono</p>
                    <p className="text-sm text-[#6B4E4E]">+34 600 000 000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-[#B8704F] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#2F3D37]">Email</p>
                    <p className="text-sm text-[#6B4E4E]">hola@bretemastudio.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock size={20} className="text-[#B8704F] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#2F3D37]">Horario</p>
                    <p className="text-sm text-[#6B4E4E]">
                      Lunes a Viernes
                      <br />
                      9:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
