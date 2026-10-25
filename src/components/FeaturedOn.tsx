"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, ExternalLink, Sparkles, Clock, Copy, Check, ShieldCheck } from "lucide-react";

export interface PlatformBadge {
  id: string;
  name: string;
  tagline: string;
  category: string;
  brandColor: string;
  status: "published" | "scheduled" | "placeholder";
  statusText: string;
  url?: string;
  badgeImageUrl?: string;
  rankText?: string;
  description: string;
}

// Platform badges configuration
const PLATFORMS: PlatformBadge[] = [
  {
    id: "launchbuff",
    name: "LaunchBuff",
    tagline: "Discover & launch top digital products",
    category: "Product Discovery",
    brandColor: "#2563EB",
    status: "published",
    statusText: "Live Badge",
    url: "https://launchbuff.com/products/ai-product-engineer-5wta5d",
    badgeImageUrl: "https://launchbuff.com/badge-featured-light.svg",
    rankText: "Featured Product",
    description: "Official featured product badge on LaunchBuff for AI Product Engineer portfolio.",
  },
  {
    id: "producthunt",
    name: "Product Hunt",
    tagline: "The best new products in tech",
    category: "Product Discovery",
    brandColor: "#FF6154",
    status: "scheduled",
    statusText: "Ready for Launch",
    url: "https://www.producthunt.com",
    rankText: "Featured Maker",
    description: "Scheduled for launch submission. Badge slot reserved for Product of the Day / Featured Maker embed.",
  },
  {
    id: "peerlist",
    name: "Peerlist",
    tagline: "Professional network for tech professionals",
    category: "Developer Network",
    brandColor: "#00AA45",
    status: "published",
    statusText: "Active Profile",
    url: "https://peerlist.io",
    rankText: "Verified Creator",
    description: "Showcasing portfolio projects, engineering blogs, and product architecture breakdowns.",
  },
  {
    id: "dailydev",
    name: "daily.dev",
    tagline: "Where developers stay up to date",
    category: "Developer Hub",
    brandColor: "#6C5CE7",
    status: "scheduled",
    statusText: "Submission Ready",
    url: "https://daily.dev",
    rankText: "Staff Pick Nominee",
    description: "Curated engineering articles and case studies ready for syndicate distribution.",
  },
  {
    id: "devto",
    name: "DEV Community",
    tagline: "A constructive community of software developers",
    category: "Engineering Voice",
    brandColor: "#0A0A0A",
    status: "published",
    statusText: "Active Author",
    url: "https://dev.to",
    rankText: "Technical Writer",
    description: "Publishing deep-dives on AI agents, Next.js full-stack development, and zero-to-one architecture.",
  },
  {
    id: "bento",
    name: "Bento.me",
    tagline: "A digital personal link & portfolio hub",
    category: "Design Portfolio",
    brandColor: "#6366F1",
    status: "scheduled",
    statusText: "Curated Showcase",
    url: "https://bento.me",
    rankText: "Featured Bento",
    description: "Minimalist modular link-in-bio hub linking projects, writing, and verified credentials.",
  },
];

export function FeaturedOn() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformBadge | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySnippet = (id: string) => {
    const snippet = id === "launchbuff" 
      ? `<a href="https://launchbuff.com/products/ai-product-engineer-5wta5d" target="_blank" rel="noopener noreferrer" title="Featured on LaunchBuff">\n  <img src="https://launchbuff.com/badge-featured-light.svg" alt="Featured on LaunchBuff" width="256" height="80" />\n</a>`
      : `<!-- ${id} Badge Placeholder -->\n<a href="https://${id}.com/@tadimarridadapeer" target="_blank" rel="noopener noreferrer">\n  <img src="/badges/${id}-featured.svg" alt="Featured on ${id}" width="250" height="54" />\n</a>`;
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="featured-on" className="w-full py-14 md:py-20 border-t border-border">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-white shadow-xs text-xs font-mono uppercase tracking-widest text-secondary mb-3">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Platform Badges & Directories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight">
            Featured On
          </h2>
          <p className="text-base sm:text-lg text-secondary mt-2 max-w-2xl leading-relaxed">
            Live badges and recognized directories where my portfolio and engineering products are officially published and featured.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-secondary">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live badges active</span>
        </div>
      </div>

      {/* Spotlight Live Badge Banner: LaunchBuff */}
      <div className="w-full p-6 sm:p-8 rounded-3xl border border-border bg-gradient-to-br from-white via-white to-secondary/5 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Official Live Feature</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-primary tracking-tight">
            Featured on LaunchBuff
          </h3>
          <p className="text-sm text-secondary mt-1.5 max-w-md leading-relaxed">
            Recognized as a featured product on the LaunchBuff curated directory for AI Product Engineering.
          </p>
        </div>

        {/* Embedded Official LaunchBuff Badge */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="https://launchbuff.com/products/ai-product-engineer-5wta5d"
            target="_blank"
            rel="noopener noreferrer"
            title="Featured on LaunchBuff"
            className="group transition-transform hover:scale-[1.03] active:scale-[0.98] inline-block shadow-sm rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <img
              src="https://launchbuff.com/badge-featured-light.svg"
              alt="Featured on LaunchBuff"
              width={256}
              height={80}
              className="h-[68px] sm:h-[76px] w-auto object-contain transition-opacity group-hover:opacity-95"
            />
          </a>

          <a
            href="https://launchbuff.com/products/ai-product-engineer-5wta5d"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-white hover:bg-secondary/10 text-xs font-medium text-primary transition-all shadow-2xs"
          >
            <span>View Product</span>
            <ExternalLink className="w-3.5 h-3.5 text-secondary" />
          </a>
        </div>
      </div>

      {/* Grid of Platform Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PLATFORMS.map((platform) => {
          const isPublished = platform.status === "published";

          return (
            <div
              key={platform.id}
              onClick={() => setSelectedPlatform(platform)}
              className="relative p-6 rounded-2xl border border-border bg-white/80 backdrop-blur-sm shadow-xs hover:border-secondary/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Card Top: Brand Icon + Status Pill */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  {/* Brand Monogram Badge */}
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm transition-transform group-hover:scale-105"
                    style={{ backgroundColor: platform.brandColor }}
                  >
                    {platform.id === "launchbuff" && <span className="font-black text-lg">⚡</span>}
                    {platform.id === "producthunt" && <span className="font-black text-lg">P</span>}
                    {platform.id === "peerlist" && <span className="font-black text-lg">⋇</span>}
                    {platform.id === "dailydev" && <span className="font-bold text-sm">{"{d}"}</span>}
                    {platform.id === "devto" && <span className="font-black text-xs tracking-tighter">DEV</span>}
                    {platform.id === "bento" && <span className="font-bold text-sm">⊞</span>}
                  </div>

                  <div>
                    <h3 className="font-semibold text-base text-primary tracking-tight group-hover:text-neutral-700 transition-colors flex items-center gap-1.5">
                      {platform.name}
                      <ExternalLink className="w-3.5 h-3.5 text-secondary/40 group-hover:text-primary transition-colors" />
                    </h3>
                    <span className="text-xs text-secondary/70 font-mono">
                      {platform.category}
                    </span>
                  </div>
                </div>

                {/* Status Indicator */}
                <span
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
                    isPublished
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-secondary/5 border-border text-secondary"
                  }`}
                >
                  {isPublished ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{platform.statusText}</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 text-secondary/60" />
                      <span>{platform.statusText}</span>
                    </>
                  )}
                </span>
              </div>

              {/* Card Middle: Official Badge Image Preview (if present) OR Tagline & Rank */}
              <div className="mb-5">
                {platform.badgeImageUrl ? (
                  <div className="my-2 p-2 rounded-xl bg-neutral-50/80 border border-border/60 flex items-center justify-center">
                    <img
                      src={platform.badgeImageUrl}
                      alt={`Featured on ${platform.name}`}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary/5 border border-border/70 text-xs font-medium text-primary mb-2">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{platform.rankText}</span>
                  </div>
                )}
                <p className="text-xs sm:text-sm text-secondary leading-relaxed mt-2">
                  {platform.description}
                </p>
              </div>

              {/* Card Bottom: Interactive Action */}
              <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                <span className="text-secondary/60 font-mono text-[11px]">
                  {isPublished ? "Official Badge Embedded" : "Badge Slot Ready"}
                </span>
                <span className="font-medium text-primary group-hover:underline underline-offset-4 flex items-center gap-1">
                  {isPublished ? "View Live" : "Manage Slot"}
                  <span>→</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Dialog for Badge Setup & Publishing */}
      {selectedPlatform && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPlatform(null)}
        >
          <div 
            className="w-full max-w-lg rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm"
                  style={{ backgroundColor: selectedPlatform.brandColor }}
                >
                  {selectedPlatform.id === "launchbuff" ? "⚡" : selectedPlatform.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary">{selectedPlatform.name}</h3>
                  <span className="text-xs text-secondary font-mono">{selectedPlatform.category}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlatform(null)}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-secondary hover:text-primary hover:bg-secondary/10 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Official Badge Preview in Modal */}
            {selectedPlatform.badgeImageUrl && (
              <div className="my-4 p-4 rounded-2xl bg-neutral-50 border border-border/80 flex items-center justify-center">
                <a
                  href={selectedPlatform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Featured on ${selectedPlatform.name}`}
                  className="hover:scale-105 transition-transform"
                >
                  <img
                    src={selectedPlatform.badgeImageUrl}
                    alt={`Featured on ${selectedPlatform.name}`}
                    width={256}
                    height={80}
                    className="h-16 w-auto object-contain"
                  />
                </a>
              </div>
            )}

            <p className="text-sm text-secondary mb-6 leading-relaxed">
              {selectedPlatform.description}
            </p>

            {/* Quick Publish Instruction Box */}
            <div className="p-4 rounded-xl bg-secondary/5 border border-border/80 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                  Official Embed Code
                </span>
                <button
                  type="button"
                  onClick={() => handleCopySnippet(selectedPlatform.id)}
                  className="inline-flex items-center gap-1 text-xs text-secondary hover:text-primary font-mono transition-colors"
                >
                  {copiedId === selectedPlatform.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied snippet</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Embed Code</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                {selectedPlatform.id === "launchbuff"
                  ? "LaunchBuff official badge is live and active on your portfolio."
                  : `Whenever you launch on ${selectedPlatform.name}, update PLATFORMS in FeaturedOn.tsx with your live URL.`}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedPlatform(null)}
                className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-secondary hover:text-primary hover:bg-secondary/5 transition-colors"
              >
                Close
              </button>
              {selectedPlatform.url && (
                <a
                  href={selectedPlatform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-primary text-background text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-1.5"
                >
                  <span>Visit {selectedPlatform.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
