"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const posters = [
  "/posters/redbull-poster.png",
  "/posters/nike-poster.png",
  "/posters/fashion-girl.png",
  "/posters/golden-city-poster.png",
  "/posters/himalaya-poster.png",
  "/posters/korean-food-poster.png",
  "/posters/southindian-poster.png",
  "/posters/suit-india.png"
];

export function Posters() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);
  };

  const getVariants = (index: number) => {
    const diff = (index - currentIndex + posters.length) % posters.length;
    let offset = diff;
    // We want offsets to be -2, -1, 0, 1, 2 for a wrap-around effect
    if (diff > posters.length / 2) {
      offset = diff - posters.length;
    }

    // Center image
    if (offset === 0) {
      return {
        x: 0,
        scale: 1,
        zIndex: 30,
        opacity: 1,
        filter: "brightness(1)",
      };
    }

    // Left or right immediate neighbors
    if (offset === 1) {
      return {
        x: "55%",
        scale: 0.8,
        zIndex: 20,
        opacity: 0.9,
        filter: "brightness(0.6)",
      };
    }
    if (offset === -1) {
      return {
        x: "-55%",
        scale: 0.8,
        zIndex: 20,
        opacity: 0.9,
        filter: "brightness(0.6)",
      };
    }

    // Outer neighbors
    if (offset === 2) {
      return {
        x: "100%",
        scale: 0.65,
        zIndex: 10,
        opacity: 0.6,
        filter: "brightness(0.3)",
      };
    }
    if (offset === -2) {
      return {
        x: "-100%",
        scale: 0.65,
        zIndex: 10,
        opacity: 0.6,
        filter: "brightness(0.3)",
      };
    }

    // Hidden
    return {
      x: offset > 0 ? "150%" : "-150%",
      scale: 0.5,
      zIndex: 0,
      opacity: 0,
      filter: "brightness(0)"
    };
  };

  return (
    <section id="posters" className="w-full py-24 md:py-32 border-t border-border bg-background relative overflow-hidden">
      <div className="flex flex-col items-center max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-primary mb-16 tracking-tight">Posters</h2>
        
        <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center">
          
          <button 
            onClick={handlePrev}
            className="absolute left-2 md:left-12 z-50 w-10 h-10 md:w-14 md:h-14 rounded-full bg-secondary/10 border border-border hover:bg-secondary/20 flex items-center justify-center backdrop-blur-md transition-all text-secondary hover:text-primary"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="relative w-[280px] md:w-[420px] h-[350px] md:h-[550px]">
            <AnimatePresence initial={false}>
              {posters.map((poster, index) => {
                const variants = getVariants(index);
                return (
                  <motion.div
                    key={index}
                    animate={variants}
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
                    style={{ originX: 0.5, originY: 0.5 }}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <Image 
                      src={poster} 
                      alt={`Poster ${index + 1}`} 
                      fill
                      sizes="(max-width: 768px) 300px, 450px"
                      className="object-cover"
                      priority={Math.abs(getVariants(index).zIndex || 0) >= 20} 
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button 
            onClick={handleNext}
            className="absolute right-2 md:right-12 z-50 w-10 h-10 md:w-14 md:h-14 rounded-full bg-secondary/10 border border-border hover:bg-secondary/20 flex items-center justify-center backdrop-blur-md transition-all text-secondary hover:text-primary"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
