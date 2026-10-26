"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Sparkles } from "lucide-react";

export interface ActiveBadge {
  id: string;
  name: string;
  url: string;
  badgeImageUrl: string;
  alt: string;
  category?: string;
}

// Only real, active badges — dummy platforms completely removed.
// Add any new platform badge here whenever you launch on other directories!
const ACTIVE_BADGES: ActiveBadge[] = [
  {
    id: "launchbuff",
    name: "LaunchBuff",
    url: "https://launchbuff.com/products/ai-product-engineer-5wta5d",
    badgeImageUrl: "https://launchbuff.com/badge-featured-light.svg",
    alt: "Featured on LaunchBuff",
    category: "Product Directory",
  },
];

export function FeaturedOn() {
  return (
    <section id="featured-on" className="w-full py-8 border-t border-border">
      <div className="w-full max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Subtle, small label */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-secondary/70">
          <Sparkles className="w-3.5 h-3.5 text-amber-500/80" />
          <span>Featured & Recognized</span>
        </div>

        {/* Small, compact scrolling badge strip */}
        <div className="flex items-center gap-4 overflow-x-auto py-1 scrollbar-none">
          {ACTIVE_BADGES.map((badge) => (
            <a
              key={badge.id}
              href={badge.url}
              target="_blank"
              rel="noopener noreferrer"
              title={badge.alt}
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/70 bg-white/80 hover:bg-white hover:border-secondary/40 hover:shadow-xs transition-all flex-shrink-0"
            >
              <img
                src={badge.badgeImageUrl}
                alt={badge.alt}
                width={128}
                height={40}
                className="h-8 w-auto object-contain transition-transform group-hover:scale-102"
              />
              <ExternalLink className="w-3 h-3 text-secondary/40 group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
