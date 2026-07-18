import React from 'react';
import { motion } from 'motion/react';
import { ProcessStep } from '../types';
import LucideIcon from '../components/LucideIcon';

interface ProcesoProps {
  processSteps: ProcessStep[];
}

export default function Proceso({ processSteps }: ProcesoProps) {
  return (
    <section id="proceso" className="py-24 bg-[#071324] relative overflow-hidden border-t border-white/10">
      {/* Background Video with Professional Overlays - Enhanced Brightness */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-95 brightness-[1.3] saturate-[1.3] contrast-[1.05]"
        >
          <source src="https://jrwztepkvkeopglpjadi.supabase.co/storage/v1/object/sign/FOTOS%20VILLAMAURO/video%20faro%20isla%20pancha1.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGUxZTRiOC00ZmIwLTRhZjMtYmYwNy01NGQ1N2E4NTJiNjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGT1RPUyBWSUxMQU1BVVJPL3ZpZGVvIGZhcm8gaXNsYSBwYW5jaGExLm1wNCIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODQzNzU2MTIsImV4cCI6MjY0ODI4OTIxMn0.BK9QNeMYSlhTevACCBSna9XTa04YzeD73tAvdjTGAl4" type="video/mp4" />
        </video>
        {/* Semi-transparent gradients that merge beautifully with surrounding sections while letting the video shine through */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/80 via-[#071324]/15 to-[#071324]/90" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Dynamic line element */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 pointer-events-none hidden lg:block z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-sans text-xs font-bold text-sky-300 uppercase tracking-widest bg-sky-500/10 px-3.5 py-2 rounded-full inline-block mb-4 border border-sky-400/20">
            Nuestro Proceso
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Cómo damos vida a <br />
            <span className="text-sky-300 italic font-normal">tus ideas digitales.</span>
          </h2>
          <p className="font-sans text-base text-white/80 leading-relaxed">
            De la primera idea a la web publicada, te acompañamos paso a paso con una metodología clara, ágil y totalmente transparente.
          </p>
        </div>

        {/* Dynamic Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-sky-400/40 p-8 rounded-2xl flex flex-col items-start text-left shadow-[0_8px_32px_rgba(3,7,18,0.3)] hover:shadow-[0_20px_40px_rgba(56,189,248,0.15)] transform hover:-translate-y-2 transition-all duration-500 relative group"
            >
              {/* Number and Icon Header */}
              <div className="flex items-center justify-between w-full mb-6">
                <span className="font-serif text-4xl font-extrabold text-white/10 group-hover:text-sky-300/20 transition-colors duration-300">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-full bg-sky-500/15 text-sky-300 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 border border-sky-400/20">
                  <LucideIcon name={step.icon || 'Search'} size={18} />
                </div>
              </div>

              {/* Step title */}
              <h3 className="font-serif text-lg font-bold text-white mb-3 group-hover:text-sky-300 transition-colors duration-300">
                {step.title}
              </h3>

              {/* Step description */}
              <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                {step.description}
              </p>

              {/* Interactive side dot for connecting line effect (desktop only) */}
              <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-1/2 w-3.5 h-3.5 rounded-full border-4 border-[#071324] bg-white/20 z-20 group-hover:bg-sky-400 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
