import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

interface GratitudeProps {
  onNext: () => void;
}

export function Gratitude({ onNext }: GratitudeProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.6, delayChildren: 0.3 }
    },
    exit: { opacity: 0, x: -50, filter: 'blur(10px)', transition: { duration: 0.8 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="min-h-[100dvh] flex flex-col items-center justify-center relative z-10 px-6 py-12 max-w-2xl mx-auto text-center"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <motion.div variants={itemVariants} className="text-gold-glow font-serif tracking-[0.2em] uppercase text-xs sm:text-sm mb-6 flex items-center gap-3">
        <div className="h-px bg-gold-dark/50 w-8" />
        A Gratidão
        <div className="h-px bg-gold-dark/50 w-8" />
      </motion.div>

      <motion.h2 variants={itemVariants} className="font-cursive text-6xl sm:text-7xl lg:text-8xl text-gold-light text-glow leading-tight mb-8">
        Sophia Sales Gomes
      </motion.h2>

      <motion.div variants={itemVariants} className="relative p-6 sm:p-10 border-t border-b border-gold-dark/30 bg-black/10 backdrop-blur-sm rounded-3xl shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]">
        {/* Floating stars */}
        <Star className="absolute top-4 left-4 w-4 h-4 text-gold-dark/40 animate-pulse" />
        <Star className="absolute bottom-4 right-4 w-4 h-4 text-gold-dark/40 animate-pulse delay-700" />

        <div className="space-y-6 text-sm sm:text-lg text-gold-glow/90 font-light leading-relaxed">
          <p className="italic font-serif text-gold-light">
            "E Jesus crescia em sabedoria, estatura e graça diante de Deus e dos homens."
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-dark to-transparent mx-auto my-6"></div>
          <p>
            Hoje nossos corações transbordam de louvor e gratidão a Deus pelos 15 anos da nossa amada princesa. 
            Vê-la desabrochar em uma jovem cheia de luz, virtudes e fé é a nossa maior alegria e a mais bela resposta às nossas orações.
          </p>
          <p>
            Em nosso <strong>Baile de Máscaras Medieval</strong>, celebraremos o Senhor que tem guiado cada um de seus passos nesta nova estação.
          </p>
          <p className="font-serif italic mt-10 text-gold-light text-lg">
            Com profundo amor,<br/>
            <span className="text-xs sm:text-sm not-italic uppercase tracking-[0.3em] mt-3 block text-gold-dark">Rodrigo & Erika</span>
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-12 flex flex-col items-center gap-3">
        <p className="text-[10px] sm:text-xs text-gold-glow/60 font-sans tracking-widest uppercase animate-pulse">
           Toque para continuar
        </p>
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-8 py-4 bg-gold-dark/10 border border-gold-dark/40 rounded-full text-gold-glow font-serif tracking-widest uppercase text-sm transition-all hover:bg-gold-dark/20 hover:border-gold-glow group shadow-lg shadow-black/50 backdrop-blur-md"
        >
          <span>Ler Decretos Reais</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-gold-glow" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
