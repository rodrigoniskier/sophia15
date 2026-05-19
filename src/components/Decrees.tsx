import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MapPin, Calendar, Clock, Wine, VenetianMask } from 'lucide-react';

export function Decrees() {
  const [rsvpStatus, setRsvpStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');

  const handleRsvp = (status: 'accepted' | 'declined') => {
    setRsvpStatus(status);
  };

  return (
    <motion.div 
      className="min-h-[100dvh] flex flex-col items-center w-full justify-center relative z-10 px-4 py-12"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="w-full max-w-lg bg-blood-dark/80 backdrop-blur-xl border border-gold-dark/40 shadow-[0_0_40px_rgba(0,0,0,0.8)] rounded-t-full rounded-b-3xl p-6 sm:p-12 text-center relative overflow-hidden flex flex-col pb-8">
        
        {/* Ornate Background Pattern (CSS pseudo-element vibe via absolute div) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {/* Fancy Inner Border */}
        <div className="absolute inset-3 border-2 border-dashed border-gold-dark/20 rounded-t-full rounded-b-2xl pointer-events-none"></div>

        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.6 }}
          className="relative mt-8 mb-6 z-10 flex justify-center"
        >
          <div className="p-4 rounded-full bg-gold-dark/10 border border-gold-dark/50 shadow-[0_0_15px_rgba(212,175,55,0.3)] text-gold-glow">
            <VenetianMask className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
          </div>
        </motion.div>
        
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-gold-glow text-glow tracking-[0.1em] uppercase mb-2 relative z-10">
          Decretos do Baile
        </h2>
        <p className="text-gold-light/60 font-serif text-xs tracking-widest uppercase mb-10 relative z-10">Traje: Esporte Fino & Máscara</p>

        <div className="space-y-6 text-gold-glow font-sans font-light mb-12 relative z-10">
          <div className="flex items-center justify-center gap-4 bg-black/20 p-3 rounded-xl border border-white/5">
            <Calendar className="w-6 h-6 text-gold-dark" />
            <span className="text-lg">16 de Julho de 2026</span>
          </div>
          <div className="flex items-center justify-center gap-4 bg-black/20 p-3 rounded-xl border border-white/5">
            <Clock className="w-6 h-6 text-gold-dark" />
            <span className="text-lg">20:00 Horas</span>
          </div>
          <div className="flex items-center justify-center gap-4 bg-black/20 p-3 rounded-xl border border-white/5 shadow-[inset_0_0_10px_rgba(212,175,55,0.05)]">
            <MapPin className="w-6 h-6 text-gold-dark" />
            <span className="text-lg tracking-wide">Castelo dos Sonhos</span>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-dark to-transparent my-4 relative z-10"></div>

        <div className="relative z-10 min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {rsvpStatus === 'pending' ? (
              <motion.div 
                key="rsvp-form"
                className="flex flex-col gap-4 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Wine className="w-4 h-4 text-gold-dark opacity-80" />
                  <h3 className="font-serif text-xs sm:text-sm tracking-widest uppercase text-gold-glow font-medium">
                    Declarar Presença
                  </h3>
                  <Wine className="w-4 h-4 text-gold-dark opacity-80" />
                </div>
                <p className="text-[10px] text-gold-light/50 tracking-widest uppercase mb-2">👇 Toque em uma opção</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRsvp('accepted')}
                    className="flex-1 px-4 py-4 bg-gold-dark/20 hover:bg-gold-dark/40 border border-gold-glow shadow-lg shadow-gold-dark/20 text-gold-glow font-serif text-[11px] sm:text-xs uppercase tracking-[0.2em] rounded-xl transition-all"
                  >
                    👑 Aceito o Convite
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRsvp('declined')}
                    className="flex-1 px-4 py-4 bg-black/40 hover:bg-black/60 border border-gold-dark/40 text-gold-light/60 hover:text-gold-light font-serif text-[10px] sm:text-xs uppercase tracking-[0.2em] rounded-xl transition-all"
                  >
                    Declino com Pesar
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="rsvp-response"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 w-full"
              >
                {rsvpStatus === 'accepted' ? (
                  <div className="space-y-4">
                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 2, ease: "easeInOut" }}>
                      <VenetianMask className="w-12 h-12 text-gold-glow mx-auto drop-shadow-[0_0_10px_rgba(255,234,153,0.8)]" />
                    </motion.div>
                    <p className="font-serif text-lg sm:text-xl text-gold-glow tracking-wide leading-relaxed px-4">
                      Majestoso!<br/>Sua máscara trará encanto ao nosso baile medieval.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 opacity-80">
                    <p className="font-serif text-base sm:text-lg text-gold-light tracking-wide leading-relaxed px-4">
                      Lamentamos profundamente.<br/>Sua ausência será sentida em nosso reino.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
