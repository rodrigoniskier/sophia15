import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function ParticlesBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number; layer: number }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      // Use window bounds
      const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
      const height = typeof window !== 'undefined' ? window.innerHeight : 1000;
      
      const newParticles = Array.from({ length: 80 }).map((_, i) => {
        const layer = Math.random(); // 0 to 1
        return {
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          size: layer > 0.8 ? (Math.random() * 4 + 2) : (Math.random() * 2 + 0.5), // Larger particles are rare
          duration: layer > 0.8 ? (Math.random() * 10 + 10) : (Math.random() * 20 + 20), // Larger = faster
          delay: Math.random() * 5,
          layer
        };
      });
      setParticles(newParticles);
    };

    generateParticles();

    const handleResize = () => {
      generateParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Intense radial glow in center for masquerade mystique */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] sm:w-[80vw] sm:h-[80vw] bg-gold-dark/5 rounded-full blur-[100px]"></div>
      
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold-light"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            boxShadow: `0 0 ${p.size * 3}px rgba(255, 234, 153, 0.9)`,
            opacity: p.layer > 0.8 ? 0.8 : 0.4,
            filter: p.layer < 0.5 ? 'blur(1px)' : 'none',
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, p.layer > 0.8 ? 0.9 : 0.5, 0],
            y: [-20, - (p.layer > 0.8 ? 300 : 150)],
            x: p.x + (Math.random() * 100 - 50),
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

