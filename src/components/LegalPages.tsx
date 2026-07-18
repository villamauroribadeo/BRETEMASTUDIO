import React, { useEffect } from 'react';
import LucideIcon from './LucideIcon';

interface LegalPagesProps {
  view: 'aviso-legal' | 'politica-privacidad' | 'politica-cookies' | 'terminos-servicio';
  onClose: () => void;
  onOpenCookieSettings?: () => void;
}

export default function LegalPages({ view, onClose, onOpenCookieSettings }: LegalPagesProps) {
  // Automatically scroll to top when a legal page is displayed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const placeholderClass = "bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 font-mono px-2 py-0.5 rounded border border-sky-400/25 transition-colors cursor-help";

  return (
    <div className="min-h-screen bg-[#060F1E] text-white py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative background grid and blurs */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Breadcrumb & Go Back Top */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6 mb-10 text-left">
          <button 
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 hover:text-white transition-all bg-white/5 hover:bg-sky-500/15 border border-white/10 px-4 py-2 rounded-full shadow-sm"
          >
            <LucideIcon name="ArrowLeft" size={14} />
            Volver al Inicio
          </button>
          
          <div className="text-xs text-white/50 font-mono">
            <span>Brétema Studio</span>
            <span className="mx-2">/</span>
            <span className="text-sky-300 font-semibold uppercase">
              {view === 'aviso-legal' && 'Aviso Legal'}
              {view === 'politica-privacidad' && 'Política de Privacidad'}
              {view === 'politica-cookies' && 'Política de Cookies'}
              {view === 'terminos-servicio' && 'Términos de Servicio'}
            </span>
          </div>
        </div>

        {/* Legal Contents */}
        <article className="text-left font-sans text-white/80 leading-relaxed text-sm md:text-base space-y-8">
          
          {/* ========================================================= */}
          {/* AVISO LEGAL */}
          {/* ========================================================= */}
          {view === 'aviso-legal' && (
            <div className="space-y-6">
              <div className="mb-8">
                <span className="font-mono text-xs font-semibold text-sky-300 uppercase tracking-widest bg-sky-500/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-sky-400/20">
                  LSSI-CE & RGPD Compliance
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  Aviso Legal
                </h1>
                <p className="font-sans text-xs text-white/40 mt-2">
                  Última actualización: Julio de 2026
                </p>
              </div>

              <section className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <h2 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <LucideIcon name="ShieldCheck" size={20} className="text-sky-300" />
                  1. Información General del Titular (Art. 10 LSSI)
                </h2>
                <p className="mb-4">
                  En cumplimiento del deber de información dispuesto en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan a continuación los datos de información general de este sitio web:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 font-sans text-xs bg-black/20 p-4 rounded-xl border border-white/5">
                  <div>
                    <span className="block text-white/40 uppercase tracking-wider font-bold mb-1">Titular / Razón Social:</span>
                    <span className={placeholderClass} title="Haz clic para modificar en tu copia final">[Nombre del Titular / Razón Social]</span>
                  </div>
                  <div>
                    <span className="block text-white/40 uppercase tracking-wider font-bold mb-1">NIF / CIF:</span>
                    <span className={placeholderClass} title="NIF o CIF del titular de la actividad">[NIF/CIF del Titular]</span>
                  </div>
                  <div className="mt-2">
                    <span className="block text-white/40 uppercase tracking-wider font-bold mb-1">Domicilio Social:</span>
                    <span className={placeholderClass} title="Dirección fiscal o social">[Dirección Completa, Ribadeo, Lugo, España]</span>
                  </div>
                  <div className="mt-2">
                    <span className="block text-white/40 uppercase tracking-wider font-bold mb-1">Email de Contacto:</span>
                    <span className="text-sky-300 font-semibold select-all font-mono">hola@bretemastudio.com</span>
                  </div>
                  <div className="mt-2">
                    <span className="block text-white/40 uppercase tracking-wider font-bold mb-1">Teléfono:</span>
                    <span className="text-white font-mono">+34 661 96 51 44</span>
                  </div>
                  <div className="mt-2">
                    <span className="block text-white/40 uppercase tracking-wider font-bold mb-1">Inscripción Registral:</span>
                    <span className={placeholderClass} title="Registro mercantil si procede">[Datos del Registro Mercantil (opcional)]</span>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  2. Condiciones de Uso del Sitio Web
                </h2>
                <p>
                  El acceso y/o uso de este portal de Brétema Studio atribuye la condición de <strong>USUARIO</strong>, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.
                </p>
                <p>
                  El sitio web de Brétema Studio proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a Brétema Studio o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  3. Obligaciones y Conducta del Usuario
                </h2>
                <p>
                  El USUARIO se compromete a hacer un uso adecuado de los contenidos y servicios que Brétema Studio ofrece a través de su portal y con carácter enunciativo pero no limitativo, a no emplearlos para:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
                  <li>Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o atentatorio contra los derechos humanos.</li>
                  <li>Provocar daños en los sistemas físicos y lógicos de Brétema Studio, de sus proveedores o de terceras personas, introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados.</li>
                  <li>Intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificar o manipular sus mensajes.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  4. Propiedad Intelectual e Industrial
                </h2>
                <p>
                  Brétema Studio por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.).
                </p>
                <p>
                  En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de Brétema Studio.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  5. Exclusión de Garantías y Responsabilidad
                </h2>
                <p>
                  Brétema Studio no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  6. Enlaces de Terceros (Links)
                </h2>
                <p>
                  En el caso de que en este sitio web se dispusiesen enlaces o hipervínculos hacía otros sitios de Internet, Brétema Studio no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso Brétema Studio asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier material o información contenida en ninguno de dichos hipervínculos u otros sitios de Internet.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  7. Modificaciones y Derecho de Exclusión
                </h2>
                <p>
                  Brétema Studio se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
                </p>
                <p>
                  Brétema Studio se reserva asimismo el derecho a denegar o retirar el acceso a portal y/o los servicios ofrecidos sin necesidad de preaviso, a instancia propia o de un tercero, a aquellos usuarios que incumplan las presentes Condiciones Generales de Uso.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  8. Legislación Aplicable y Jurisdicción
                </h2>
                <p>
                  La relación entre Brétema Studio y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y Tribunales competentes de la provincia de <strong>Lugo (Galicia, España)</strong>, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
                </p>
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* POLITICA DE PRIVACIDAD */}
          {/* ========================================================= */}
          {view === 'politica-privacidad' && (
            <div className="space-y-6">
              <div className="mb-8">
                <span className="font-mono text-xs font-semibold text-sky-300 uppercase tracking-widest bg-sky-500/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-sky-400/20">
                  RGPD & LOPDGDD European Union Compliant
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  Política de Privacidad
                </h1>
                <p className="font-sans text-xs text-white/40 mt-2">
                  Última actualización: Julio de 2026
                </p>
              </div>

              <p className="lead text-base md:text-lg text-white/90">
                La protección de sus datos personales es una prioridad para Brétema Studio. Esta política de privacidad detalla cómo recogemos, tratamos, protegemos y almacenamos los datos proporcionados por nuestros usuarios en cumplimiento estricto del <strong>Reglamento General de Protección de Datos (RGPD UE 2016/679)</strong> y de la <strong>Ley Orgánica 3/2018 (LOPDGDD)</strong>.
              </p>

              <section className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <LucideIcon name="Briefcase" size={20} className="text-sky-300" />
                  1. Quién es el Responsable del Tratamiento
                </h2>
                <div className="space-y-2 text-xs md:text-sm">
                  <p><strong>Identidad del Responsable:</strong> <span className={placeholderClass}>[Nombre del Titular o Razón Social Completa]</span></p>
                  <p><strong>NIF / CIF:</strong> <span className={placeholderClass}>[NIF/CIF del Titular]</span></p>
                  <p><strong>Dirección Postal:</strong> <span className={placeholderClass}>[Dirección Completa, Ribadeo, Lugo, España]</span></p>
                  <p><strong>Email de Contacto:</strong> <span className="text-sky-300 font-mono font-semibold">hola@bretemastudio.com</span></p>
                  <p><strong>Actividad de Tratamiento:</strong> Prestación y gestión de servicios de diseño y desarrollo web.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  2. Datos Personales que Recogemos y su Finalidad
                </h2>
                <p>
                  Brétema Studio únicamente recopila datos de carácter personal cuando usted cumplimenta voluntariamente alguno de nuestros formularios de contacto o realiza solicitudes de servicios. Los datos tratados son de carácter identificativo (Nombre, Email, Teléfono, Plan Elegido e información del Negocio que describa voluntariamente).
                </p>
                <p>Las finalidades del tratamiento son:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Gestión de Consultas:</strong> Responder a las solicitudes de información, dudas o presupuestos planteados en el formulario de contacto.</li>
                  <li><strong>Prestación del Servicio:</strong> Gestionar el alta, desarrollo, maquetación, puesta en producción, cobro y mantenimiento técnico de la web bajo modelo de suscripción si decide contratar con nosotros.</li>
                  <li><strong>Comunicaciones Profesionales:</strong> Envío de correos de confirmación de recepción de consultas y notificaciones administrativas o técnicas relativas al servicio web. No se enviará spam ni publicidad invasiva sin su consentimiento previo expreso.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  3. Base Legal para el Tratamiento de sus Datos
                </h2>
                <p>
                  De conformidad con el artículo 6 del RGPD, la legitimación de Brétema Studio para tratar sus datos se basa en:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>El consentimiento expreso del usuario (Art. 6.1.a RGPD):</strong> Al completar de manera activa el formulario de contacto y aceptar explícitamente nuestra política de privacidad mediante la casilla de verificación (checkbox) obligatoria.</li>
                  <li><strong>Ejecución de un contrato o medidas precontractuales (Art. 6.1.b RGPD):</strong> Cuando la recogida de datos tenga por objeto presentar una oferta, presupuesto o prestar los servicios de diseño y suscripción mensual contratados.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  4. Plazo de Conservación de los Datos
                </h2>
                <p>
                  Los datos personales que nos proporcione se conservarán durante el tiempo estrictamente necesario para cumplir con la finalidad para la que fueron recabados:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Los datos procedentes del formulario de contacto se conservarán durante un plazo máximo de <strong>12 meses</strong> para dar seguimiento a la consulta, salvo que de ella se derive una relación comercial de contratación.</li>
                  <li>Los datos de los clientes contratantes se conservarán durante toda la vigencia del contrato de suscripción y, tras su finalización, durante los plazos legalmente exigidos por la legislación mercantil, tributaria y civil aplicable (normalmente entre 5 y 6 años).</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  5. Destinatarios y Cesión de Datos a Terceros
                </h2>
                <p>
                  Brétema Studio <strong>no venderá, cederá ni alquilará</strong> sus datos personales a terceros comerciales en ningún caso. Únicamente se comunicarán datos a terceros proveedores de servicios que actúen en calidad de <strong>Encargados del Tratamiento</strong> necesarios para la correcta ejecución del servicio web:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Proveedores de hosting y base de datos seguros ubicados dentro del Espacio Económico Europeo (EEE), garantizando niveles de protección adecuados bajo el estándar de seguridad RGPD.</li>
                  <li>Entidades bancarias y pasarelas de pago para tramitar el cobro de la suscripción mensual.</li>
                  <li>Administración Pública y Agencia Tributaria en cumplimiento estricto de las obligaciones fiscales aplicables.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  6. Derechos del Usuario (Tus Derechos)
                </h2>
                <p>
                  El RGPD y la LOPDGDD le otorgan el pleno control sobre sus datos de carácter personal. Puede ejercitar libremente ante Brétema Studio los siguientes derechos de forma totalmente gratuita:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                    <span className="font-serif text-sm font-bold text-sky-300 block mb-1">Acceso y Rectificación</span>
                    <span className="text-xs text-white/70">Derecho a saber qué datos tratamos sobre usted y solicitar la corrección de datos incorrectos o incompletos.</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                    <span className="font-serif text-sm font-bold text-sky-300 block mb-1">Supresión ("Al Olvido")</span>
                    <span className="text-xs text-white/70">Derecho a solicitar la eliminación de sus datos personales cuando ya no sean necesarios para los fines recogidos.</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                    <span className="font-serif text-sm font-bold text-sky-300 block mb-1">Limitación y Portabilidad</span>
                    <span className="text-xs text-white/70">Derecho a limitar el alcance del tratamiento y a solicitar que le entreguemos sus datos en un formato digital estructurado.</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                    <span className="font-serif text-sm font-bold text-sky-300 block mb-1">Oposición y Revocación</span>
                    <span className="text-xs text-white/70">Derecho a oponerse al tratamiento por motivos legítimos y a retirar en cualquier momento el consentimiento otorgado.</span>
                  </div>
                </div>
                <p>
                  Para ejercer cualquiera de estos derechos, basta con que envíe una comunicación escrita firmada, acompañada de una copia de su documento de identidad (DNI/NIE) o equivalente para verificar su identidad, al correo electrónico de contacto: <strong className="text-sky-300 font-mono select-all">hola@bretemastudio.com</strong> indicando en el asunto "Derechos Protección de Datos".
                </p>
                <p>
                  Asimismo, tiene derecho a presentar una reclamación directa ante la autoridad de control estatal competente si considera que sus datos se están tratando de forma ilegítima, que en España es la <strong>Agencia Española de Protección de Datos (AEPD)</strong> a través de su portal web oficial (www.aepd.es).
                </p>
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* POLITICA DE COOKIES */}
          {/* ========================================================= */}
          {view === 'politica-cookies' && (
            <div className="space-y-6">
              <div className="mb-8">
                <span className="font-mono text-xs font-semibold text-sky-300 uppercase tracking-widest bg-sky-500/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-sky-400/20">
                  LSSI-CE & AEPD Cookie Guidelines
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  Política de Cookies
                </h1>
                <p className="font-sans text-xs text-white/40 mt-2">
                  Última actualización: Julio de 2026
                </p>
              </div>

              <section className="bg-white/5 border border-white/10 p-6 rounded-2xl text-left space-y-4">
                <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <LucideIcon name="Settings" size={20} className="text-sky-300" />
                  Panel de Configuración de Consentimiento
                </h2>
                <p className="text-xs sm:text-sm">
                  De acuerdo con las guías de la AEPD vigentes, usted puede ajustar, modificar o revocar sus opciones de consentimiento de cookies directamente en cualquier momento pulsando el siguiente botón:
                </p>
                <button
                  onClick={onOpenCookieSettings}
                  className="bg-sky-500/25 hover:bg-sky-500/40 text-sky-300 hover:text-white border border-sky-400/40 hover:border-sky-300 px-5 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                >
                  <LucideIcon name="Cookie" size={16} />
                  Abrir Ajustes de Cookies
                </button>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  1. ¿Qué es una Cookie?
                </h2>
                <p>
                  Una cookie es un pequeño archivo de texto de tamaño limitado que se almacena en el navegador de su ordenador, teléfono inteligente o tableta cuando accede y visualiza páginas web. Las cookies permiten a los sitios web almacenar y recuperar información técnica sobre sus hábitos de navegación y configuraciones, con el fin de optimizar el rendimiento de la carga del sitio, retener preferencias locales y realizar métricas agregadas de comportamiento de tráfico sin identificar nombres individuales de usuarios de forma directa.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  2. Tipos de Cookies que Utiliza este Sitio Web
                </h2>
                <p>
                  En Brétema Studio clasificamos las cookies en las siguientes categorías en base a su finalidad y necesidad de consentimiento de acuerdo con la LSSI-CE:
                </p>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                    <span className="font-serif text-sm font-bold text-white block mb-1">A) Cookies Técnicas y Estrictamente Necesarias (Exentas de Consentimiento)</span>
                    <span className="text-xs text-white/70 block mb-2">Son aquellas indispensables para posibilitar la navegación y la correcta seguridad del sitio. Incluyen cookies destinadas al mantenimiento de sesiones de carga, recordar sus opciones de configuración estética y almacenar si ha aceptado o rechazado explícitamente el uso de cookies.</span>
                    <span className="inline-block font-mono text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-400/20 px-2 py-0.5 rounded uppercase font-bold">Siempre Activas</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                    <span className="font-serif text-sm font-bold text-sky-300 block mb-1">B) Cookies de Análisis, Estadística y Rendimiento (Requieren Consentimiento)</span>
                    <span className="text-xs text-white/70 block mb-2">Nos permiten cuantificar de forma totalmente anónima y agregada el número de usuarios únicos, la duración de visitas y las secciones de la web más populares. Sirven para optimizar la velocidad y la calidad del sitio mediante gráficos locales interactivos.</span>
                    <span className="inline-block font-mono text-[10px] bg-amber-500/10 text-amber-300 border border-amber-400/20 px-2 py-0.5 rounded uppercase font-bold">Requiere tu aprobación</span>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  3. Listado Detallado de Cookies Utilizadas
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-white/10 text-xs mt-4 rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-white/5 text-white font-serif border-b border-white/10">
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Proveedor</th>
                        <th className="p-3">Finalidad</th>
                        <th className="p-3">Duración</th>
                        <th className="p-3">Tipo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-white/70">
                      <tr>
                        <td className="p-3 font-semibold text-white">cookie_consent_status</td>
                        <td className="p-3">Propia</td>
                        <td className="p-3">Almacena el estado de consentimiento del usuario para las cookies.</td>
                        <td className="p-3">1 año</td>
                        <td className="p-3 text-emerald-400">Técnica (Necesaria)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-white">cookie_preferences</td>
                        <td className="p-3">Propia</td>
                        <td className="p-3">Registra los niveles exactos de aceptación (análisis, marketing) elegidos.</td>
                        <td className="p-3">1 año</td>
                        <td className="p-3 text-emerald-400">Técnica (Necesaria)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-white">_ga</td>
                        <td className="p-3">Google Analytics</td>
                        <td className="p-3">ID único para distinguir visitas anónimas en estadísticas agregadas.</td>
                        <td className="p-3">2 años</td>
                        <td className="p-3 text-sky-400">Analítica (Estadística)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-white">_gid</td>
                        <td className="p-3">Google Analytics</td>
                        <td className="p-3">Identificador para agrupar el comportamiento del usuario por sesión.</td>
                        <td className="p-3">24 horas</td>
                        <td className="p-3 text-sky-400">Analítica (Estadística)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  4. Cómo Desactivar o Bloquear Cookies en el Navegador
                </h2>
                <p>
                  Además de nuestro panel de consentimiento, usted tiene la posibilidad de permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración directa de las opciones de privacidad del navegador que utilice:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Chrome:</strong> Herramientas &gt; Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
                  <li><strong>Mozilla Firefox:</strong> Menú &gt; Ajustes &gt; Privacidad y Seguridad &gt; Cookies y datos del sitio.</li>
                  <li><strong>Safari (macOS / iOS):</strong> Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.</li>
                  <li><strong>Microsoft Edge:</strong> Configuración &gt; Privacidad, búsqueda y servicios &gt; Cookies y permisos del sitio.</li>
                </ul>
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* TERMINOS DE SERVICIO */}
          {/* ========================================================= */}
          {view === 'terminos-servicio' && (
            <div className="space-y-6">
              <div className="mb-8">
                <span className="font-mono text-xs font-semibold text-sky-300 uppercase tracking-widest bg-sky-500/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-sky-400/20">
                  Condiciones Generales de Contratación
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  Términos de Servicio
                </h1>
                <p className="font-sans text-xs text-white/40 mt-2">
                  Última actualización: Julio de 2026
                </p>
              </div>

              <section className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-2">
                <p className="leading-relaxed">
                  Las presentes Condiciones Generales de Contratación regulan la relación comercial de prestación de servicios de diseño, desarrollo, alojamiento y mantenimiento web ofrecida por Brétema Studio bajo un formato de tarifa plana mensual por suscripción.
                </p>
                <p className="text-xs text-white/60">
                  Al solicitar un presupuesto, suscribirse a cualquiera de nuestros planes o realizar un pago, el contratante declara haber leído, comprendido y aceptado en su totalidad las presentes condiciones de servicio.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  1. Objeto y Descripción de los Planes
                </h2>
                <p>
                  El objeto del contrato es el diseño web personalizado, la maquetación responsiva, el alta de dominios corporativos, la creación de buzones de email profesional y el posterior alojamiento y mantenimiento constante de la web del cliente. Ofrecemos tres modalidades de planes estándar (Básico, Profesional y Premium) además del diseño de proyectos a medida.
                </p>
                <p>
                  Todos los planes incluyen un compromiso por parte de Brétema Studio de realizar copias de seguridad semanales, actualizaciones de contenido (cambios de textos, fotos o bloques requeridos por el cliente) de forma totalmente gratuita y resolución de fallos.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  2. Compromiso de Permanencia Mínima
                </h2>
                <p>
                  Dada la naturaleza del servicio (en el cual Brétema Studio asume la totalidad del coste de diseño inicial, maquetación, programación, compra de licencias y registro de dominios sin cobrar una tarifa inicial de implantación o puesta en marcha), todos nuestros planes de suscripción mensual están sujetos a un <strong>compromiso de permanencia mínima obligatoria de 12 meses</strong> naturales desde el primer pago del servicio.
                </p>
                <p>
                  Transcurrido el primer año de vigencia obligatoria, el contrato se prorrogará automáticamente por mensualidades sucesivas, pudiendo el cliente rescindir el servicio en cualquier momento con un preaviso mínimo de <strong>15 días hábiles</strong> mediante correo electrónico a hola@bretemastudio.com.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  3. Tarifas, Facturación y Forma de Pago
                </h2>
                <p>
                  El cliente abonará de forma recurrente mensual la cuota correspondiente al plan contratado (ej. 49€/mes para Plan Básico, 99€/mes para Profesional, o 199€/mes para Premium). Los precios indicados no incluyen el IVA aplicable, que se desglosará de forma transparente en la correspondiente factura periódica emitida por Brétema Studio.
                </p>
                <p>
                  Los pagos se realizarán mediante domiciliación bancaria, transferencia o pasarela de pago segura el primer día hábil de cada mes. El impago de una cuota mensual facultará a Brétema Studio a suspender provisionalmente la visualización pública del sitio web transcurridos <strong>7 días naturales</strong> desde el aviso de impago, procediéndose a la resolución contractual y reclamación de las cuotas pendientes hasta cumplir la permanencia en caso de persistir el impago.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  4. Obligaciones de las Partes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 text-xs md:text-sm">
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                    <span className="font-serif font-bold text-sky-300 block mb-2 uppercase tracking-wide">Por parte de Brétema Studio</span>
                    <ul className="list-disc pl-4 space-y-1 text-white/80">
                      <li>Garantizar un diseño moderno, responsivo y adaptado al sector del cliente.</li>
                      <li>Registrar el dominio a nombre del cliente.</li>
                      <li>Mantener la web online con tasas de disponibilidad óptimas (SLA del 99.9%).</li>
                      <li>Garantizar soporte prioritario para correcciones o actualizaciones requeridas.</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                    <span className="font-serif font-bold text-sky-300 block mb-2 uppercase tracking-wide">Por parte del Cliente</span>
                    <ul className="list-disc pl-4 space-y-1 text-white/80">
                      <li>Facilitar la información básica, logos, textos e imágenes de su negocio con presteza.</li>
                      <li>Estar al corriente de los pagos mensuales de la suscripción.</li>
                      <li>Garantizar la legalidad de los textos, marcas y materiales suministrados a Brétema Studio.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-white mt-8 mb-2">
                  5. Propiedad Intelectual de los Entregables
                </h2>
                <p>
                  El cliente es el legítimo propietario de las marcas, textos y fotografías que suministre para confeccionar la web. Brétema Studio mantiene los derechos intelectuales sobre el código de la plantilla maquetada y la arquitectura general del sistema desarrollado bajo suscripción.
                </p>
                <p>
                  Al finalizar la permanencia de 12 meses y en caso de que el cliente desee rescindir la suscripción para trasladar su web a otro hosting externo de gestión propia, podrá solicitar a Brétema Studio la exportación de los archivos del contenido de su web (textos y base de datos) previo abono de una tarifa de traspaso técnico acordada, facilitando una transición cómoda y sin perder su posicionamiento en Google.
                </p>
              </section>
            </div>
          )}

        </article>

        {/* Go Back Bottom Button */}
        <div className="mt-12 pt-8 border-t border-white/10 flex justify-center text-left">
          <button 
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-sky-500/25 hover:bg-sky-500/40 text-white border border-sky-400/40 hover:border-sky-300 px-6 py-3 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] active:scale-95 transform"
          >
            <LucideIcon name="ArrowLeft" size={14} />
            Entendido, Volver al Inicio
          </button>
        </div>

      </div>
    </div>
  );
}
