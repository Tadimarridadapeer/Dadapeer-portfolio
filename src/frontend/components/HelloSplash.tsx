"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Official Apple cursive "hello" monoline path
const HELLO_PATH =
  "M-293.58-104.62S-103.61-205.49-60-366.25c9.13-32.45,9-58.31,0-74-10.72-18.82-49.69-33.21-75.55,31.94-27.82,70.11-52.22,377.24-44.11,322.48s34-176.24,99.89-183.19c37.66-4,49.55,23.58,52.83,47.92a117.06,117.06,0,0,1-3,45.32c-7.17,27.28-20.47,97.67,33.51,96.86,66.93-1,131.91-53.89,159.55-84.49,31.1-36.17,31.1-70.64,19.27-90.25-16.74-29.92-69.47-33-92.79,16.73C62.78-179.86,98.7-93.8,159-81.63S302.7-99.55,393.3-269.92c29.86-58.16,52.85-114.71,46.14-150.08-7.44-39.21-59.74-54.5-92.87-8.7-47,65-61.78,266.62-34.74,308.53S416.62-58,481.52-130.31s133.2-188.56,146.54-256.23c14-71.15-56.94-94.64-88.4-47.32C500.53-375,467.58-229.49,503.3-127a73.73,73.73,0,0,0,23.43,33.67c25.49,20.23,55.1,16,77.46,6.32a111.25,111.25,0,0,0,30.44-19.87c37.73-34.23,29-36.71,64.58-127.53C724-284.3,785-298.63,821-259.13a71,71,0,0,1,13.69,22.56c17.68,46,6.81,80-6.81,107.89-12,24.62-34.56,42.72-61.45,47.91-23.06,4.45-48.37-.35-66.48-24.27a78.88,78.88,0,0,1-12.66-25.8c-14.75-51,4.14-88.76,11-101.41,6.18-11.39,37.26-69.61,103.42-42.24,55.71,23.05,100.66-23.31,100.66-23.31";

// Sparkle glints across the cursive strokes (relative coordinates)
const SPARKLES = [
  { x: "24%", y: "22%", delay: 0.8, size: 14 }, // top loop of h
  { x: "43%", y: "58%", delay: 1.2, size: 12 }, // e loop
  { x: "58%", y: "18%", delay: 1.6, size: 15 }, // first l loop
  { x: "73%", y: "16%", delay: 1.9, size: 16 }, // second l loop
  { x: "91%", y: "45%", delay: 2.2, size: 14 }, // o flourish
  { x: "82%", y: "62%", delay: 2.5, size: 11 }, // o base
];

export function HelloSplash() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  useEffect(() => {
    // Lock scrolling while splash screen is active
    document.body.style.overflow = "hidden";

    // Mark handwriting animation done around 2.4s to trigger extra shimmer gleam
    const animTimer = setTimeout(() => {
      setIsAnimationDone(true);
    }, 2400);

    // Hold the completed glittered hello for viewing, then smoothly fade/slide away
    const exitTimer = setTimeout(() => {
      dismissSplash();
    }, 3800);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  const dismissSplash = () => {
    setIsVisible(false);
    document.body.style.overflow = "auto";
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="apple-silver-hello-splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          onClick={dismissSplash}
          className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
          style={{ willChange: "opacity, transform, filter" }}
        >
          {/* Subtle Ambient Lunar Silver Glow in the center */}
          <div className="absolute w-[36rem] h-[22rem] max-w-[90vw] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(200,215,235,0.03)_45%,transparent_70%)] pointer-events-none" />

          {/* Floating Subtle Micro-Glitter Dust in the background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${(i * 13) % 95}%`,
                  y: `${(i * 17) % 90}%`,
                  opacity: 0.1,
                  scale: 0.6,
                }}
                animate={{
                  opacity: [0.1, 0.55, 0.1],
                  scale: [0.6, 1.2, 0.6],
                  y: ["-=8px", "+=8px"],
                }}
                transition={{
                  duration: 2.4 + (i % 3) * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i * 0.15) % 1.5,
                }}
                className="absolute w-1 h-1 bg-white rounded-full blur-[0.5px] shadow-[0_0_6px_#fff]"
              />
            ))}
          </div>

          {/* Central Container for the Apple Cursive Hello - Medium refined proportion */}
          <div className="relative w-full max-w-[460px] sm:max-w-[520px] px-6 sm:px-8 flex items-center justify-center">
            <svg
              viewBox="0 0 1230.94 414.57"
              className="w-full h-auto overflow-visible drop-shadow-[0_0_18px_rgba(255,255,255,0.3)] drop-shadow-[0_0_40px_rgba(200,225,255,0.12)]"
              style={{ maxHeight: "32vh" }}
            >
              <defs>
                {/* Silver Metallic Chrome Base Gradient */}
                <linearGradient id="silverMetallic" x1="0%" y1="0%" x2="100%" y2="80%">
                  <stop offset="0%" stopColor="#A8B0BC" />
                  <stop offset="15%" stopColor="#FFFFFF" />
                  <stop offset="30%" stopColor="#7B828F" />
                  <stop offset="48%" stopColor="#F8FAFC" />
                  <stop offset="65%" stopColor="#949CA9" />
                  <stop offset="82%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#CBD2DC" />
                </linearGradient>

                {/* Sparkling Silver Shimmer Highlight Gradient */}
                <linearGradient id="glitterBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="30%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="48%" stopColor="#FFFFFF" />
                  <stop offset="52%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  <animate
                    attributeName="x1"
                    from="-100%"
                    to="150%"
                    dur="2.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x2"
                    from="0%"
                    to="250%"
                    dur="2.2s"
                    repeatCount="indefinite"
                  />
                </linearGradient>

                {/* Delicate Silver Bloom Filter */}
                <filter id="silverGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g transform="translate(311.08 476.02)">
                {/* Layer 1: Soft Ambient Silver Bloom Stroke (Medium weight) */}
                <motion.path
                  d={HELLO_PATH}
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#silverGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{
                    pathLength: { duration: 2.0, ease: [0.25, 1, 0.35, 1] },
                    opacity: { duration: 0.6, ease: "easeOut" },
                  }}
                />

                {/* Layer 2: Main Silver Metallic Handwritten Stroke (Refined Medium 14px weight) */}
                <motion.path
                  d={HELLO_PATH}
                  fill="none"
                  stroke="url(#silverMetallic)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 2.0, ease: [0.25, 1, 0.35, 1] },
                    opacity: { duration: 0.4, ease: "easeOut" },
                  }}
                />

                {/* Layer 3: Moving Glitter Silver Specular Shine */}
                <motion.path
                  d={HELLO_PATH}
                  fill="none"
                  stroke="url(#glitterBeam)"
                  strokeWidth="14.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.9, 0.65, 0.9] }}
                  transition={{ delay: 0.6, duration: 1.8, repeat: Infinity, ease: "linear" }}
                />
              </g>
            </svg>

            {/* Diamond Glitter Twinkle Stars on the letters */}
            {SPARKLES.map((sparkle, idx) => (
              <motion.div
                key={idx}
                style={{
                  position: "absolute",
                  left: sparkle.x,
                  top: sparkle.y,
                  width: sparkle.size,
                  height: sparkle.size,
                  pointerEvents: "none",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1.3, 1, 0],
                  opacity: [0, 1, 0.9, 0],
                  rotate: [0, 45, 90, 135],
                }}
                transition={{
                  delay: sparkle.delay,
                  duration: 0.9,
                  repeat: Infinity,
                  repeatDelay: 1.6 + (idx % 2) * 0.5,
                  ease: "easeInOut",
                }}
              >
                {/* 4-Point Diamond Glitter Star */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-full h-full drop-shadow-[0_0_8px_#ffffff]"
                >
                  <path
                    d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z"
                    fill="url(#sparkleGradient)"
                  />
                  <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
                  <defs>
                    <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#E2E8F0" />
                      <stop offset="100%" stopColor="#94A3B8" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Minimalist Apple-style Skip Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="text-[11px] text-neutral-400 font-sans tracking-widest uppercase">
              Click anywhere to skip
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
