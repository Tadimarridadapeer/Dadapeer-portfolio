"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Clock, Calendar, ExternalLink } from "lucide-react";
import { LearningEntry } from "@/lib/til/types";
import { estimateReadingTime, formatFileSize } from "@/lib/til/utils";

interface LessonCardProps {
  lesson: LearningEntry;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const readingTime = estimateReadingTime(lesson.content || lesson.summary);

  const formattedDate = new Date(lesson.learning_date + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group relative p-6 sm:p-7 rounded-2xl border border-border bg-white/90 backdrop-blur-sm shadow-xs hover:border-secondary/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Meta: Category + Date + Reading Time */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 text-xs text-secondary">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-primary font-medium tracking-wide">
              {lesson.category}
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-secondary/70">
              <Clock className="w-3 h-3" />
              <span>{readingTime} min read</span>
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[11px] text-secondary/70">
            <Calendar className="w-3 h-3" />
            <time dateTime={lesson.learning_date}>{formattedDate}</time>
          </div>
        </div>

        {/* Title */}
        <Link href={`/learning/${lesson.slug}`} className="block group/link">
          <h3 className="text-xl sm:text-2xl font-semibold text-primary tracking-tight group-hover/link:text-neutral-700 transition-colors leading-snug mb-2.5">
            {lesson.title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-sm text-secondary leading-relaxed mb-4 line-clamp-3">
          {lesson.summary}
        </p>

        {/* Documentation Attachment Badge (if exists) */}
        {lesson.document_path && (
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-50 border border-border/80 text-xs text-primary font-mono">
            <FileText className="w-3.5 h-3.5 text-red-500" />
            <span className="font-medium truncate max-w-[200px] sm:max-w-[260px]">
              {lesson.document_filename || "Attached Documentation"}
            </span>
            {lesson.document_size && (
              <span className="text-[11px] text-secondary/60">
                ({formatFileSize(lesson.document_size)})
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        {lesson.tags && lesson.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {lesson.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-secondary/5 border border-border/60 text-[11px] font-mono text-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Actions: Read Lesson + View Documentation */}
      <div className="pt-4 border-t border-border/50 flex items-center justify-between gap-3 text-xs">
        <Link
          href={`/learning/${lesson.slug}`}
          className="inline-flex items-center gap-1.5 font-medium text-primary hover:translate-x-0.5 transition-transform group-hover:underline underline-offset-4"
        >
          <span>Read lesson</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {lesson.document_path && (
          <a
            href={`/api/documents/${lesson.document_path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/80 hover:bg-secondary/5 text-secondary hover:text-primary transition-colors text-[11px] font-mono"
          >
            <span>View Doc</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </article>
  );
}
