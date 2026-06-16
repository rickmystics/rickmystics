import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500); // Allow fadeout animation to finish
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#0A0A0A] z-[99999] flex flex-col items-center justify-center"
        >
          {/* Faded background decorative gold element */}
          <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(circle_at_center,rgba(200,169,110,0.04)_0%,transparent_70%)] pointer-events-none" />

          {/* S Monogram Animation */}
          <div className="relative flex items-center justify-center">
            {/* Outer golden circular spin bloom */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
              animate={{ scale: 1.1, opacity: 0.15, rotate: 45 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute w-36 h-36 border border-[#C8A96E]/40 rounded-full"
            />
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.9] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute w-24 h-24 border border-[#C8A96E]/20 rounded-full"
            />

            {/* Premium S logo text display */}
            <motion.span
              initial={{ scale: 0.5, opacity: 0, y: 15 }}
              animate={{ scale: 1.1, opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-7xl md:text-8xl text-[#C8A96E] relative z-10 select-none tracking-wider gold-glow"
            >
              S
            </motion.span>
          </div>

          {/* Subtitle branding */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 font-display text-xs tracking-[0.3em] uppercase text-[#F2EDE4]"
          >
            S O U R I K &nbsp; D A S
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
