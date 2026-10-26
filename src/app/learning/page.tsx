"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  Filter, 
  BookOpen, 
  Calendar, 
  Layers, 
  ArrowRight,
  Flame,
  FileText
} from "lucide-react";
import { LearningEntry, LearningStats } from "@/lib/til/types";
import { LessonCard } from "@/components/til/LessonCard";
import { LearningCalendarGrid } from "@/components/til/LearningCalendarGrid";

export default function LearningArchivePage() {
  const [lessons, setLessons] = useState<LearningEntry[]>([]);
  const [stats, setStats] = useState<LearningStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch("/api/til?stats=true");
        if (!res.ok) throw new Error("Failed to load learning entries");
        const json = await res.json();
        if (json.success && json.data) {
          setLessons(json.data.lessons || []);
          setStats(json.data.stats || null);
        }
      } catch (err) {
        console.error("Error loading TIL archive:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter and sort lessons client-side for instant responsive interactions
  const filteredLessons = useMemo(() => {
    let result = [...lessons];

    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((l) => l.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedTag) {
      result = result.filter((l) => l.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()));
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((l) => {
        return (
          l.title.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    result.sort((a, b) => {
      const dateA = new Date(a.learning_date).getTime();
      const dateB = new Date(b.learning_date).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [lessons, selectedCategory, selectedTag, search, sortBy]);

  const categories = useMemo(() => {
    if (!stats) return ["All"];
    return ["All", ...stats.categories.map((c) => c.name)];
  }, [stats]);

  return (
    <div className="w-full py-10 sm:py-16">
      {/* Hero Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-white shadow-xs text-xs font-mono uppercase tracking-widest text-secondary mb-4">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          <span>Today I Learned (TIL) · My Learning Journey</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-primary tracking-tight leading-tight mb-4">
          Building knowledge, <br className="hidden sm:inline" />
          <span className="text-secondary/70 font-normal">one day at a time.</span>
        </h1>

        <p className="text-base sm:text-lg text-secondary max-w-3xl leading-relaxed">
          A public record of the concepts I explore, the engineering lessons I learn, and the things I build along the way. Documenting technical depth across backend systems, AI agents, databases, and product architecture.
        </p>
      </div>

      {/* Genuine Stats Bar (strictly from published records) */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="p-4 sm:p-5 rounded-2xl border border-border bg-white shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary block mb-1">
              Published Lessons
            </span>
            <span className="text-2xl sm:text-3xl font-semibold text-primary">
              {stats.totalPublished}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-border bg-white shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary block mb-1">
              Categories
            </span>
            <span className="text-2xl sm:text-3xl font-semibold text-primary">
              {stats.categories.length}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-border bg-white shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary block mb-1">
              Latest Entry
            </span>
            <span className="text-sm font-semibold text-primary truncate block mt-1.5">
              {stats.latestLesson?.learning_date || "—"}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-border bg-white shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary block mb-1">
              Learning Streak
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              {stats.streakDays > 0 ? (
                <>
                  <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="text-2xl sm:text-3xl font-semibold text-primary">
                    {stats.streakDays} <span className="text-xs font-normal text-secondary font-mono">days</span>
                  </span>
                </>
              ) : (
                <span className="text-xs font-mono text-secondary mt-1">Daily Cadence</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Learning Activity Calendar Grid */}
      {stats && (
        <div className="mb-12">
          <LearningCalendarGrid
            activityByDate={stats.activityByDate || {}}
            streakDays={stats.streakDays || 0}
          />
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-secondary/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search concepts, topics, or technologies..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-primary/40 shadow-xs"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary hover:text-primary"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-mono text-secondary">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
              aria-label="Sort lessons by date"
              className="text-xs font-medium bg-white border border-border rounded-xl px-3 py-2 text-primary focus:outline-none shadow-xs cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedTag("");
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-primary text-background border-primary shadow-xs"
                  : "bg-white text-secondary border-border hover:border-secondary/40 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Active Tag filter indicator */}
        {selectedTag && (
          <div className="flex items-center gap-2 text-xs text-secondary font-mono">
            <span>Filtered by tag:</span>
            <span className="px-2 py-0.5 rounded-md bg-secondary/10 text-primary font-medium">
              #{selectedTag}
            </span>
            <button
              type="button"
              onClick={() => setSelectedTag("")}
              className="text-primary hover:underline"
            >
              (Clear tag)
            </button>
          </div>
        )}
      </div>

      {/* Lesson Cards Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-mono text-secondary">Loading learning journal...</p>
        </div>
      ) : filteredLessons.length === 0 ? (
        <div className="p-12 rounded-2xl border border-dashed border-border bg-white text-center">
          <BookOpen className="w-8 h-8 text-secondary/40 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-primary mb-1">No lessons found</h3>
          <p className="text-xs text-secondary max-w-sm mx-auto mb-4 leading-relaxed">
            {search || selectedCategory !== "All"
              ? "No entries match your search or filter criteria. Try clearing filters to see all lessons."
              : "No lessons published yet. Check back soon for daily technical insights."}
          </p>
          {(search || selectedCategory !== "All" || selectedTag) && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSelectedTag("");
              }}
              className="px-4 py-2 rounded-xl bg-primary text-background text-xs font-medium hover:bg-primary/90 transition-all"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
}
