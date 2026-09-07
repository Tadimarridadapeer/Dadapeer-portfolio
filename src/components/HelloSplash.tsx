"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GREETINGS = [
  { text: "hello", lang: "English" },
  { text: "నమస్కారం", lang: "Telugu" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "வணக்கம்", lang: "Tamil" },
  { text: "ನಮಸ್ಕಾರ", lang: "Kannada" },
  { text: "നമസ്കാരം", lang: "Malayalam" }
];

export function HelloSplash() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable scrolling while splash is active
    document.body.style.overflow = "hidden";

    if (index < GREETINGS.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 850);
      return () => clearTimeout(timer);
    } else {
      // Hold the final greeting comfortably, then slide up and unlock scroll
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "auto";
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [index]);

  const handleSkip = () => {
    setIsVisible(false);
    document.body.style.overflow = "auto";
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="apple-hello-splash"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Central Hello Container */}
          <div className="relative flex flex-col items-center justify-center min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.92 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)", scale: 1.08 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center px-6"
              >
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight text-primary leading-none">
                  {GREETINGS[index].text}
                </h1>
                
                <span className="mt-8 px-4 py-1 rounded-full border border-border/60 bg-secondary/5 text-xs font-mono tracking-widest text-secondary/70 uppercase">
                  {GREETINGS[index].lang}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimal Progress Dots */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {GREETINGS.map((g, i) => (
              <div
                key={g.lang}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-primary"
                    : i < index
                    ? "w-2 bg-primary/40"
                    : "w-2 bg-primary/10"
                }`}
              />
            ))}
          </div>

          <p className="absolute bottom-6 text-[10px] text-secondary/40 font-mono tracking-widest uppercase">
            Click anywhere to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
