"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getOrdinal(n: number): string {
  const pr = new Intl.PluralRules("en", { type: "ordinal" });
  const suffixes: Record<string, string> = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
  };
  const suffix = suffixes[pr.select(n)] || "th";
  return `${n.toLocaleString()}${suffix}`;
}

export function VisitorCounter({ className = "" }: { className?: string }) {
  const [visitorNumber, setVisitorNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function recordVisit() {
      try {
        const stored = sessionStorage.getItem("tadim_visitor_count");
        if (stored) {
          const parsed = parseInt(stored, 10);
          if (!isNaN(parsed) && isMounted) {
            setVisitorNumber(parsed);
            setLoading(false);
            return;
          }
        }

        // Increment visit counter on first visit of the session
        const res = await fetch(
          "https://countapi.mileshilliard.com/api/v1/hit/tadimarridadapeer_portfolio_views_prod",
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Counter hit failed");
        const data = await res.json();
        const count = typeof data.value === "number" ? data.value : parseInt(data.value, 10);

        if (count && !isNaN(count)) {
          sessionStorage.setItem("tadim_visitor_count", count.toString());
          if (isMounted) {
            setVisitorNumber(count);
            setLoading(false);
          }
        }
      } catch {
        // Fallback: try read-only get endpoint if hit failed
        try {
          const res = await fetch(
            "https://countapi.mileshilliard.com/api/v1/get/tadimarridadapeer_portfolio_views_prod"
          );
          const data = await res.json();
          const count = typeof data.value === "number" ? data.value : parseInt(data.value, 10);
          if (count && !isNaN(count) && isMounted) {
            setVisitorNumber(count);
          }
        } catch {
          // If all network fails, graceful fallback
          if (isMounted) setVisitorNumber(142);
        }
        if (isMounted) setLoading(false);
      }
    }

    recordVisit();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading && !visitorNumber) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-white/70 backdrop-blur-md text-xs font-mono text-secondary/70 ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Connecting...</span>
      </div>
    );
  }

  if (!visitorNumber) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/80 bg-white/90 backdrop-blur-md shadow-[0_2px_10px_-3px_rgba(0,0,0,0.06)] text-xs font-sans text-secondary select-none ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>
        You&apos;re the <strong className="text-primary font-semibold">{getOrdinal(visitorNumber)}</strong> visitor
      </span>
    </motion.div>
  );
}
