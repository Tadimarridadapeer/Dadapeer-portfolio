"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles, FileText } from "lucide-react";
import { LearningEntry } from "@/lib/til/types";
import { estimateReadingTime } from "@/lib/til/utils";

export function TodayILearnedPreview() {
  const [lessons, setLessons] = useState<LearningEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecent() {
      try {
        const res = await fetch("/api/til?limit=3&sort=newest");
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && data.data?.lessons) {
          setLessons(data.data.lessons.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load TIL preview:", err);
      } finally {
        setLoading(false);
      }
    }
    loadRecent();
  }, []);

  if (!loading && lessons.length === 0) return null;

  return (
    <section id="til" className="w-full py-12 md:py-16 border-t border-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-white shadow-xs text-xs font-mono uppercase tracking-widest text-secondary mb-3">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span>Today I Learned · Technical Journal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight">
            Building Knowledge
          </h2>
          <p className="text-base sm:text-lg text-secondary mt-2 max-w-2xl leading-relaxed">
            A public record of the concepts I explore, the engineering lessons I learn, and the things I build along the way.
          </p>
        </div>

        <Link
          href="/learning"
          className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-full border border-border bg-white hover:bg-secondary/10 text-primary transition-all shadow-xs self-start sm:self-auto group"
        >
          <span>Explore All Lessons</span>
          <ArrowRight className="w-3.5 h-3.5 text-secondary group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {lessons.map((lesson) => {
          const readingTime = estimateReadingTime(lesson.content || lesson.summary);
          const formattedDate = new Date(lesson.learning_date + "T12:00:00Z").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          return (
            <Link
              key={lesson.id}
              href={`/learning/${lesson.slug}`}
              className="group p-6 rounded-2xl border border-border bg-white/80 backdrop-blur-sm shadow-xs hover:border-secondary/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-secondary mb-3">
                  <span className="px-2 py-0.5 rounded-md bg-secondary/5 border border-border/60 text-[11px] text-primary">
                    {lesson.category}
                  </span>
                  <span>{formattedDate}</span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-primary tracking-tight group-hover:text-neutral-700 transition-colors leading-snug mb-2 line-clamp-2">
                  {lesson.title}
                </h3>

                <p className="text-xs sm:text-sm text-secondary leading-relaxed line-clamp-3 mb-4">
                  {lesson.summary}
                </p>

                {lesson.document_path && (
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-secondary/80 mb-3">
                    <FileText className="w-3 h-3 text-red-500" />
                    <span>Technical Doc Attached</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-secondary/70">
                  {readingTime} min read
                </span>
                <span className="font-medium text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read lesson →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
