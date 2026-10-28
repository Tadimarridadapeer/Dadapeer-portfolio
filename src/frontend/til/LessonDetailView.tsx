"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  ExternalLink, 
  Share2, 
  Check, 
  Copy, 
  Sparkles, 
  Code2, 
  BookOpen 
} from "lucide-react";
import { LearningEntry } from "@/lib/til/types";
import { estimateReadingTime, formatFileSize } from "@/lib/til/utils";

interface LessonDetailViewProps {
  lesson: LearningEntry;
  relatedLessons?: LearningEntry[];
}

export function LessonDetailView({ lesson, relatedLessons = [] }: LessonDetailViewProps) {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  const readingTime = estimateReadingTime(lesson.content || lesson.summary);
  const formattedDate = new Date(lesson.learning_date + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formatFileSize = (bytes?: number | null) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          href="/learning"
          className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors py-2 px-3 rounded-xl hover:bg-secondary/5 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to TIL Archive</span>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary py-1.5 px-3 rounded-lg border border-border/80 bg-white/80 transition-colors font-mono"
        >
          {copiedShare ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* Lesson Header */}
      <header className="mb-10 pb-8 border-b border-border/70">
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
          <span className="px-3 py-1 rounded-full bg-secondary/10 text-primary font-medium tracking-wide">
            {lesson.category}
          </span>
          <div className="flex items-center gap-1 text-secondary font-mono text-[11px]">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={lesson.learning_date}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1 text-secondary font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight leading-tight mb-5">
          {lesson.title}
        </h1>

        <p className="text-lg sm:text-xl text-secondary leading-relaxed font-normal">
          {lesson.summary}
        </p>

        {/* Tags */}
        {lesson.tags && lesson.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {lesson.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-secondary/5 border border-border/70 text-xs font-mono text-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Attached Documentation Download Box (if exists) */}
      {lesson.document_path && (
        <section className="mb-12 p-6 rounded-2xl border border-border bg-gradient-to-br from-white via-white to-neutral-50 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200/60 flex items-center justify-center flex-shrink-0 text-red-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-primary truncate max-w-[280px] sm:max-w-[360px]">
                    {lesson.document_filename || "Attached Documentation"}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 text-secondary uppercase">
                    {lesson.document_mime_type?.includes("pdf") ? "PDF" : "DOC"}
                  </span>
                </div>
                <p className="text-xs text-secondary mt-0.5">
                  Complete technical specification & architecture diagram {lesson.document_size ? `(${formatFileSize(lesson.document_size)})` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2 sm:pt-0">
              <a
                href={`/api/documents/${lesson.document_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background text-xs font-medium hover:bg-primary/90 transition-all shadow-xs"
              >
                <span>View Document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={`/api/documents/${lesson.document_path}?download=true`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-white text-secondary hover:text-primary hover:bg-secondary/5 text-xs font-medium transition-all"
                title="Download document"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Key Takeaways */}
      {lesson.key_takeaways && lesson.key_takeaways.length > 0 && (
        <section className="mb-12 p-6 sm:p-7 rounded-2xl border border-border bg-white shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-base font-semibold text-primary tracking-tight">Key Takeaways</h2>
          </div>
          <ul className="space-y-2.5">
            {lesson.key_takeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-secondary leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Code Examples */}
      {lesson.code_examples && lesson.code_examples.length > 0 && (
        <section className="mb-12 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-primary" />
            <h2 className="text-base font-semibold text-primary tracking-tight">Technical Implementation & Code</h2>
          </div>

          {lesson.code_examples.map((example, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-[#0d1117] text-neutral-100 overflow-hidden shadow-sm">
              <div className="px-4 py-2.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-xs font-mono text-secondary">
                <span>{example.caption || `${example.language.toUpperCase()} Snippet`}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[#8b949e]">{example.language}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(example.code, idx)}
                    className="inline-flex items-center gap-1 text-[#c9d1d9] hover:text-white transition-colors"
                  >
                    {copiedCodeIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-[#e6edf3]">
                <code>{example.code}</code>
              </pre>
            </div>
          ))}
        </section>
      )}

      {/* Full Lesson Body (Content) */}
      {lesson.content && (
        <section className="mb-12 prose prose-neutral max-w-none">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <h2 className="text-base font-semibold text-primary tracking-tight">Detailed Notes & Breakdown</h2>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl border border-border bg-white shadow-xs text-sm sm:text-base text-secondary leading-relaxed whitespace-pre-wrap font-sans">
            {lesson.content}
          </div>
        </section>
      )}

      {/* References & Sources */}
      {lesson.references && lesson.references.length > 0 && (
        <section className="mb-12 p-6 rounded-2xl border border-border bg-white shadow-xs">
          <h2 className="text-sm font-semibold text-primary mb-3">References & Documentation Sources</h2>
          <ul className="space-y-2">
            {lesson.references.map((ref, idx) => (
              <li key={idx}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-secondary hover:text-primary transition-colors underline-offset-4 hover:underline"
                >
                  <span>{ref.title}</span>
                  <ExternalLink className="w-3 h-3 text-secondary/60" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Lessons */}
      {relatedLessons.length > 0 && (
        <section className="mt-14 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-primary mb-5">More in {lesson.category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedLessons.map((rel) => (
              <Link
                key={rel.id}
                href={`/learning/${rel.slug}`}
                className="p-5 rounded-2xl border border-border bg-white hover:border-secondary/40 transition-all flex flex-col justify-between group shadow-xs"
              >
                <div>
                  <span className="text-[11px] font-mono text-secondary mb-1 block">
                    {rel.learning_date}
                  </span>
                  <h4 className="text-base font-medium text-primary group-hover:text-neutral-700 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
                <span className="text-xs text-secondary mt-3 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read lesson →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
