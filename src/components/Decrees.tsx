import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Wine, VenetianMask } from 'lucide-react';

export function Decrees() {
  const [rsvpStatus, setRsvpStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-07-16T20:00:00').getTime();
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRsvp = (status: 'accepted' | 'declined') => {
    setRsvpStatus(status);
  };

  const Confetti = () => (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden h-screen w-screen">
      {Array.from({ length: 100 }).map((_, i) => {
        // Randomize initial positions so they don't all start at the top at the same time
        const startY = Math.random() * -100; // Start somewhere above the screen
        const endY = 110; // End below the screen
        
        return (
          <motion.div
            key={i}
            className="absolute top-0 w-2 h-4 sm:w-3 sm:h-6 bg-gold-light"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: Math.random() > 0.5 ? '#FFDF73' : '#D4AF37',
              clipPath: Math.random() > 0.5 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'none',
              transformOrigin: 'center'
            }}
            initial={{ y: `${startY}vh`, rotate: 0, opacity: 0 }}
            animate={{ 
              y: [`${startY}vh`, `${endY}vh`], 
              rotate: [0, Math.random() * 720 + 360],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 3 + 4, 
              ease: "linear",
              delay: Math.random() * 3,
              repeat: Infinity
            }}
          />
        );
      })}
    </div>
  );

  return (
    <motion.div 
      className="min-h-[100dvh] flex flex-col items-center w-full justify-center relative z-10 px-4 py-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Confetti Explosion for accepted RSVP */}
      {rsvpStatus === 'accepted' && <Confetti />}

      <div className="w-full max-w-lg bg-blood-dark/80 backdrop-blur-xl border-2 border-gold-dark/60 shadow-[0_0_50px_rgba(212,175,55,0.2),inset_0_0_20px_rgba(212,175,55,0.1)] rounded-t-[100px] rounded-b-3xl p-6 sm:p-12 text-center relative flex flex-col pb-8 z-10 overflow-hidden">

        {/* Ornate Background Pattern (CSS pseudo-element vibe via absolute div) */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {/* Fancy Inner Border Overlay simulating a mask outline */}
        <div className="absolute inset-2 border-2 border-dashed border-gold-dark/40 rounded-t-[90px] rounded-b-2xl pointer-events-none mix-blend-overlay"></div>

        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.6 }}
          className="relative mt-6 mb-4 z-10 flex justify-center"
        >
          <div className="p-5 rounded-full bg-gradient-to-br from-gold-dark/30 to-transparent border border-gold-dark shadow-[0_0_25px_rgba(255,234,153,0.4)] text-gold-glow backdrop-blur-md">
            <VenetianMask className="w-12 h-12 sm:w-16 sm:h-16 animate-pulse-glow" strokeWidth={1} />
          </div>
        </motion.div>
        
        <h2 className="font-serif text-2xl sm:text-4xl text-gold-glow text-glow tracking-[0.1em] uppercase mb-1 relative z-10">
          Decretos do Baile
        </h2>
        <p className="text-gold-light/80 font-serif text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-6 relative z-10 drop-shadow-md">Traje: Esporte Fino & Máscara</p>

        {/* Countdown */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-8 relative z-10">
          {[
            { label: 'Dias', value: timeLeft.days },
            { label: 'Horas', value: timeLeft.hours },
            { label: 'Minutos', value: timeLeft.minutes },
            { label: 'Segundos', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-2 sm:p-3 bg-black/40 border border-gold-dark/30 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.15)] min-w-[60px] sm:min-w-[70px] backdrop-blur-sm">
              <span className="text-xl sm:text-2xl font-serif text-gold-glow text-glow">{item.value}</span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-gold-light/60">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4 sm:space-y-5 text-gold-glow font-sans font-light mb-8 relative z-10">
          <div className="flex items-center justify-center gap-4 bg-black/30 p-4 rounded-xl border border-gold-dark/20 shadow-[inset_0_0_15px_rgba(212,175,55,0.05)] transition-all hover:bg-black/50">
            <Calendar className="w-6 h-6 text-gold-dark drop-shadow-md" />
            <span className="text-base sm:text-lg">16 de Julho de 2026</span>
          </div>
          <div className="flex items-center justify-center gap-4 bg-black/30 p-4 rounded-xl border border-gold-dark/20 shadow-[inset_0_0_15px_rgba(212,175,55,0.05)] transition-all hover:bg-black/50">
            <Clock className="w-6 h-6 text-gold-dark drop-shadow-md" />
            <span className="text-base sm:text-lg">20:00 Horas</span>
          </div>
          <div className="flex items-center justify-center gap-4 bg-black/30 p-4 rounded-xl border border-gold-dark/20 shadow-[inset_0_0_15px_rgba(212,175,55,0.05)] transition-all hover:bg-black/50">
            <MapPin className="w-6 h-6 text-gold-dark drop-shadow-md" />
            <span className="text-base sm:text-lg tracking-wide">Castelo dos Sonhos</span>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-glow to-transparent my-4 relative z-10 opacity-50 shadow-[0_0_10px_rgba(255,234,153,0.5)]"></div>

        <div className="relative z-10 min-h-[140px] flex items-center justify-center mt-2">
          <AnimatePresence mode="wait">
            {rsvpStatus === 'pending' ? (
              <motion.div 
                key="rsvp-form"
                className="flex flex-col gap-4 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Wine className="w-4 h-4 text-gold-glow opacity-90 animate-pulse" />
                  <h3 className="font-serif text-sm tracking-widest uppercase text-gold-glow font-medium text-glow">
                    Declarar Presença
                  </h3>
                  <Wine className="w-4 h-4 text-gold-glow opacity-90 animate-pulse" />
                </div>
                <p className="text-[10px] text-gold-light/70 tracking-[0.2em] uppercase mb-2 animate-bounce">👇 Toque em uma opção</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,234,153,0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRsvp('accepted')}
                    className="flex-1 px-4 py-4 bg-gradient-to-t from-gold-dark/40 to-gold-dark/10 hover:from-gold-dark/60 hover:to-gold-dark/20 border border-gold-glow shadow-xl shadow-gold-dark/30 text-gold-glow font-serif text-[11px] sm:text-xs uppercase tracking-[0.2em] rounded-xl transition-all relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                    👑 Aceito o Convite
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRsvp('declined')}
                    className="flex-1 px-4 py-4 bg-black/60 hover:bg-black/80 border border-white/10 hover:border-gold-dark/50 text-gold-light/50 hover:text-gold-light font-serif text-[10px] sm:text-xs uppercase tracking-[0.2em] rounded-xl transition-all backdrop-blur-md"
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
                className="py-4 w-full"
              >
                {rsvpStatus === 'accepted' ? (
                  <div className="space-y-4 relative z-20">
                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 2, ease: "easeInOut" }}>
                      <VenetianMask className="w-14 h-14 text-gold-glow mx-auto drop-shadow-[0_0_20px_rgba(255,234,153,0.9)]" />
                    </motion.div>
                    <p className="font-serif text-lg sm:text-xl text-gold-glow tracking-wide leading-relaxed px-4 text-glow">
                      Majestoso!<br/>Sua máscara trará encanto ao nosso baile medieval.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 opacity-70">
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
