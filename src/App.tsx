import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { ScreenState } from './types.ts';
import { Portico } from './components/Portico.tsx';
import { Gratitude } from './components/Gratitude.tsx';
import { Decrees } from './components/Decrees.tsx';
import { ParticlesBackground } from './components/ParticlesBackground.tsx';

// A high-quality classical piece acting as our epic/emotional placeholder track.
const AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3";

export default function App() {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.PORTICO);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(AUDIO_URL);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleEnterRealm = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
    setScreen(ScreenState.GRATITUDE);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className="relative min-h-[100dvh] font-sans bg-blood-dark text-gold-light overflow-hidden sm:min-h-screen"
    >
      <ParticlesBackground />

      {/* Main Content Transitions */}
      <AnimatePresence mode="wait">
        {screen === ScreenState.PORTICO && (
          <Portico key="portico" onEnter={handleEnterRealm} />
        )}
        {screen === ScreenState.GRATITUDE && (
          <Gratitude key="gratitude" onNext={() => setScreen(ScreenState.DECREES)} />
        )}
        {screen === ScreenState.DECREES && (
          <Decrees key="decrees" />
        )}
      </AnimatePresence>

      {/* Floating Action Button for Music */}
      <AnimatePresence>
        {screen !== ScreenState.PORTICO && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleAudio}
            className="fixed top-6 right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-gold-dark/50 flex items-center justify-center text-gold-glow shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-gold-dark/20 transition-colors"
            aria-label={isPlaying ? "Pausar música" : "Tocar música"}
          >
            {isPlaying ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

