import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, VenetianMask } from 'lucide-react';
import { useState } from 'react';

interface PorticoProps {
  onEnter: () => void;
}

export function Portico({ onEnter }: PorticoProps) {
  const [isExploding, setIsExploding] = useState(false);

  const handleInteraction = () => {
    setIsExploding(true);
    setTimeout(onEnter, 800); // Wait for explosion animation before transitioning
  };

  return (
    <motion.div 
      className="min-h-[100dvh] flex flex-col items-center justify-center relative z-10 px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Interactive Explosion State */}
      <AnimatePresence>
        {isExploding && (
          <motion.div 
            className="absolute inset-0 bg-gold-light mix-blend-overlay z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15 overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="w-[180vw] h-[180vw] sm:w-[90vw] sm:h-[90vw] border-[2px] border-gold-dark rounded-full mix-blend-overlay border-dashed opacity-50"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-[160vw] h-[160vw] sm:w-[80vw] sm:h-[80vw] border-[1px] border-gold-glow rounded-full mix-blend-overlay border-dotted"
        />
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="text-center relative z-20 flex flex-col items-center w-full"
      >
        <motion.div 
          className="mb-6 text-gold-glow animate-float"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <VenetianMask className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_15px_rgba(255,234,153,0.8)]" strokeWidth={1} />
        </motion.div>

        <div className="text-gold-glow font-serif tracking-[0.3em] uppercase text-xs sm:text-sm mb-4 flex items-center gap-2">
          <span>✨</span> Baile de Máscaras <span>✨</span>
        </div>
        
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold-glow to-transparent mx-auto mb-6"></div>
        
        <h1 className="font-cursive text-7xl sm:text-9xl text-gold-light text-glow leading-tight pb-4">
          Sophia
        </h1>
        
        <p className="font-serif tracking-[0.2em] uppercase text-gold-dark/80 text-sm mt-2">XV Aniversário Real</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-16 flex flex-col items-center gap-4"
      >
        <p className="text-xs text-gold-glow/70 font-sans tracking-widest uppercase animate-pulse">
          👆 Toque para adentrar o reino
        </p>
        <motion.button
          onClick={handleInteraction}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center justify-center gap-3 w-64 py-5 bg-gradient-to-b from-gold-dark/20 to-transparent backdrop-blur-md border border-gold-dark/60 rounded-full text-gold-glow font-serif tracking-widest uppercase text-sm cursor-pointer overflow-hidden transition-all shadow-[0_0_20px_rgba(42,0,0,0.8)]"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
          <Sparkles className="w-5 h-5 text-gold-light group-hover:scale-125 transition-transform" />
          Quebrar o Selo
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
