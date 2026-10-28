"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Eye, 
  FileText, 
  Upload, 
  Trash2, 
  Plus, 
  ExternalLink, 
  AlertCircle,
  CheckCircle2,
  Code2,
  Sparkles,
  Layers
} from "lucide-react";
import { LearningEntry, CodeExample, ReferenceLink, LessonStatus } from "@/lib/til/types";

const SUGGESTED_CATEGORIES = [
  "Backend Engineering",
  "AI & LLMs",
  "Database & Storage",
  "System Design",
  "Concurrency & Race Conditions",
  "Product Engineering",
  "Cloud & DevOps",
  "Software Architecture",
];

interface LessonFormProps {
  initialLesson?: LearningEntry | null;
  isEdit?: boolean;
}

export function LessonForm({ initialLesson, isEdit = false }: LessonFormProps) {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState(initialLesson?.title || "");
  const [slug, setSlug] = useState(initialLesson?.slug || "");
  const [summary, setSummary] = useState(initialLesson?.summary || "");
  const [content, setContent] = useState(initialLesson?.content || "");
  const [learningDate, setLearningDate] = useState(
    initialLesson?.learning_date || new Date().toISOString().slice(0, 10)
  );
  const [category, setCategory] = useState(initialLesson?.category || "Backend Engineering");
  const [customCategory, setCustomCategory] = useState("");
  const [tagsInput, setTagsInput] = useState(initialLesson?.tags?.join(", ") || "");
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>(
    initialLesson?.key_takeaways || [""]
  );
  const [codeExamples, setCodeExamples] = useState<CodeExample[]>(
    initialLesson?.code_examples || []
  );
  const [references, setReferences] = useState<ReferenceLink[]>(
    initialLesson?.references || []
  );

  // Document attachment states
  const [documentPath, setDocumentPath] = useState<string | null>(initialLesson?.document_path || null);
  const [documentFilename, setDocumentFilename] = useState<string | null>(initialLesson?.document_filename || null);
  const [documentMimeType, setDocumentMimeType] = useState<string | null>(initialLesson?.document_mime_type || null);
  const [documentSize, setDocumentSize] = useState<number | null>(initialLesson?.document_size || null);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Auto-generate slug when title changes in create mode
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setIsDirty(true);
    if (!isEdit && !slug) {
      const generated = val
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
    }
  };

  // Warn before leaving if unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Handle Document Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDoc(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "File upload failed");
      }

      setDocumentPath(data.data.document_path);
      setDocumentFilename(data.data.document_filename);
      setDocumentMimeType(data.data.document_mime_type);
      setDocumentSize(data.data.document_size);
      setIsDirty(true);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleRemoveDocument = () => {
    setDocumentPath(null);
    setDocumentFilename(null);
    setDocumentMimeType(null);
    setDocumentSize(null);
    setIsDirty(true);
  };

  // Key takeaways handlers
  const handleAddTakeaway = () => {
    setKeyTakeaways([...keyTakeaways, ""]);
    setIsDirty(true);
  };

  const handleUpdateTakeaway = (index: number, val: string) => {
    const updated = [...keyTakeaways];
    updated[index] = val;
    setKeyTakeaways(updated);
    setIsDirty(true);
  };

  const handleRemoveTakeaway = (index: number) => {
    setKeyTakeaways(keyTakeaways.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  // Code examples handlers
  const handleAddCodeExample = () => {
    setCodeExamples([...codeExamples, { language: "typescript", code: "", caption: "" }]);
    setIsDirty(true);
  };

  const handleUpdateCodeExample = (index: number, field: keyof CodeExample, val: string) => {
    const updated = [...codeExamples];
    updated[index] = { ...updated[index], [field]: val };
    setCodeExamples(updated);
    setIsDirty(true);
  };

  const handleRemoveCodeExample = (index: number) => {
    setCodeExamples(codeExamples.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  // References handlers
  const handleAddReference = () => {
    setReferences([...references, { title: "", url: "" }]);
    setIsDirty(true);
  };

  const handleUpdateReference = (index: number, field: keyof ReferenceLink, val: string) => {
    const updated = [...references];
    updated[index] = { ...updated[index], [field]: val };
    setReferences(updated);
    setIsDirty(true);
  };

  const handleRemoveReference = (index: number) => {
    setReferences(references.filter((_, i) => i !== index));
    setIsDirty(true);
  };

  // Submit Handler
  const handleSubmit = async (targetStatus: LessonStatus) => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!summary.trim()) {
      setError("Summary is required");
      return;
    }

    const finalCategory = category === "Custom" ? customCategory.trim() : category;
    if (!finalCategory) {
      setError("Category is required");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);

    const payload = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      summary: summary.trim(),
      content: content.trim(),
      learning_date: learningDate,
      category: finalCategory,
      tags,
      key_takeaways: keyTakeaways.filter((k) => k.trim()),
      code_examples: codeExamples.filter((c) => c.code.trim()),
      references: references.filter((r) => r.title.trim() && r.url.trim()),
      document_path: documentPath,
      document_filename: documentFilename,
      document_mime_type: documentMimeType,
      document_size: documentSize,
      status: targetStatus,
    };

    try {
      const url = isEdit ? `/api/admin/til/${initialLesson?.id}` : "/api/admin/til";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save lesson");
      }

      setIsDirty(false);
      setSuccessMessage(`Lesson successfully saved as ${targetStatus}!`);

      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save lesson");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors py-2 px-3 rounded-xl hover:bg-secondary/5 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-white text-xs font-medium text-secondary hover:text-primary transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight">
          {isEdit ? "Edit Learning Entry" : "New Learning Entry"}
        </h1>
        <p className="text-xs sm:text-sm text-secondary mt-1 font-mono">
          Document an engineering concept, upload research documentation, and publish to the live journal.
        </p>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-6 flex items-center gap-2.5 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600 font-mono">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 flex items-center gap-2.5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-mono">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form Body */}
      <div className="space-y-8">
        {/* Core Metadata Card */}
        <div className="p-6 sm:p-7 rounded-3xl border border-border bg-white shadow-xs space-y-5">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider font-mono">
            Core Information
          </h2>

          {/* Title */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-secondary mb-1.5">
              Lesson Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Preventing Race Conditions with Optimistic Locking in Postgres"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-base text-primary placeholder:text-secondary/40 focus:outline-none focus:border-primary/40 font-medium"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-secondary mb-1.5">
              URL Slug <span className="text-secondary/50 font-normal">(Auto-generated or custom)</span>
            </label>
            <div className="flex items-center rounded-xl border border-border bg-neutral-50 px-3 py-2 text-xs font-mono text-secondary">
              <span className="text-secondary/50">/learning/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="url-slug"
                className="flex-1 bg-transparent text-primary focus:outline-none ml-1 font-mono"
              />
            </div>
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-secondary mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-white text-xs font-medium text-primary focus:outline-none cursor-pointer"
              >
                {SUGGESTED_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="Custom">+ Custom Category...</option>
              </select>

              {category === "Custom" && (
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category name..."
                  className="mt-2 w-full px-3 py-2 rounded-xl border border-border bg-white text-xs text-primary focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-secondary mb-1.5">
                Learning Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={learningDate}
                onChange={(e) => {
                  setLearningDate(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-white text-xs font-mono text-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-secondary mb-1.5">
              Short Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => {
                setSummary(e.target.value);
                setIsDirty(true);
              }}
              placeholder="A concise 1-2 sentence executive overview of what was learned..."
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-primary/40 leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-secondary mb-1.5">
              Tags & Technologies <span className="text-secondary/50 font-normal">(Comma-separated)</span>
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => {
                setTagsInput(e.target.value);
                setIsDirty(true);
              }}
              placeholder="e.g. PostgreSQL, Concurrency, SQL, System Design"
              className="w-full px-4 py-2 rounded-xl border border-border bg-white text-xs font-mono text-primary placeholder:text-secondary/40 focus:outline-none"
            />
          </div>
        </div>

        {/* Documentation Upload System Card (CORE REQUIREMENT) */}
        <div className="p-6 sm:p-7 rounded-3xl border border-border bg-white shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-500" />
              <span>Technical Documentation Attachment</span>
            </h2>
            <span className="text-[11px] font-mono text-secondary/70">
              PDF, Markdown, TXT, DOCX (Max 25MB)
            </span>
          </div>

          {documentPath ? (
            <div className="p-4 rounded-2xl border border-border bg-neutral-50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center font-bold text-xs">
                  PDF
                </div>
                <div>
                  <h4 className="text-sm font-medium text-primary truncate max-w-[280px] sm:max-w-[400px]">
                    {documentFilename}
                  </h4>
                  <p className="text-[11px] text-secondary font-mono">
                    {documentSize ? `${(documentSize / 1024).toFixed(1)} KB` : "Uploaded Document"} · Validated on Server
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`/api/documents/${documentPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-medium text-secondary hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>Preview</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={handleRemoveDocument}
                  className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  title="Remove document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-secondary/40 hover:bg-secondary/5 transition-all">
                <Upload className="w-6 h-6 text-secondary/60 mb-2" />
                <span className="text-xs font-medium text-primary mb-1">
                  {uploadingDoc ? "Uploading & Validating Document..." : "Click or drag document to attach"}
                </span>
                <span className="text-[11px] text-secondary font-mono">
                  Upload research paper, architecture diagram, or PDF notes
                </span>
                <input
                  type="file"
                  accept=".pdf,.md,.txt,.docx,.doc"
                  onChange={handleFileUpload}
                  disabled={uploadingDoc}
                  className="hidden"
                />
              </label>

              {uploadError && (
                <p className="text-xs text-red-600 font-mono mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{uploadError}</span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Key Takeaways Card */}
        <div className="p-6 sm:p-7 rounded-3xl border border-border bg-white shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Key Takeaways (Bullet Points)</span>
            </h2>
            <button
              type="button"
              onClick={handleAddTakeaway}
              className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Point</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs text-secondary/50 font-mono w-5 text-right">{idx + 1}.</span>
                <input
                  type="text"
                  value={takeaway}
                  onChange={(e) => handleUpdateTakeaway(idx, e.target.value)}
                  placeholder="Key principle or actionable takeaway..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-white text-xs text-primary focus:outline-none"
                />
                {keyTakeaways.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTakeaway(idx)}
                    className="p-1.5 text-secondary/50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Code Snippets Card */}
        <div className="p-6 sm:p-7 rounded-3xl border border-border bg-white shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider font-mono flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <span>Code Examples & Implementations</span>
            </h2>
            <button
              type="button"
              onClick={handleAddCodeExample}
              className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Code Snippet</span>
            </button>
          </div>

          {codeExamples.length === 0 ? (
            <p className="text-xs text-secondary/70 font-mono italic">
              No code snippets added. (Optional)
            </p>
          ) : (
            <div className="space-y-4">
              {codeExamples.map((ex, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-border bg-neutral-50 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={ex.caption || ""}
                      onChange={(e) => handleUpdateCodeExample(idx, "caption", e.target.value)}
                      placeholder="Snippet title / caption (e.g. Atomic deduction query)"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-medium text-primary focus:outline-none"
                    />
                    <select
                      value={ex.language}
                      onChange={(e) => handleUpdateCodeExample(idx, "language", e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg border border-border bg-white text-xs font-mono text-primary focus:outline-none cursor-pointer"
                    >
                      <option value="typescript">TypeScript</option>
                      <option value="javascript">JavaScript</option>
                      <option value="sql">SQL / Postgres</option>
                      <option value="python">Python</option>
                      <option value="bash">Bash / Shell</option>
                      <option value="json">JSON</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleRemoveCodeExample(idx)}
                      className="text-secondary/50 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea
                    rows={6}
                    value={ex.code}
                    onChange={(e) => handleUpdateCodeExample(idx, "code", e.target.value)}
                    placeholder="// Write or paste code snippet here..."
                    className="w-full p-3.5 rounded-xl border border-[#30363d] bg-[#0d1117] text-[#e6edf3] font-mono text-xs focus:outline-none leading-relaxed"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Lesson Body Content (Optional) */}
        <div className="p-6 sm:p-7 rounded-3xl border border-border bg-white shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider font-mono">
              Full Lesson Content / Article Notes <span className="text-secondary/50 font-normal">(Markdown supported)</span>
            </h2>
          </div>
          <textarea
            rows={10}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setIsDirty(true);
            }}
            placeholder="Write in-depth notes, architectural breakdown, analysis, or leave blank if relying on the uploaded document..."
            className="w-full p-4 rounded-xl border border-border bg-white text-sm text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-primary/40 leading-relaxed font-sans"
          />
        </div>

        {/* References & Source Links */}
        <div className="p-6 sm:p-7 rounded-3xl border border-border bg-white shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider font-mono">
              References & Source Links
            </h2>
            <button
              type="button"
              onClick={handleAddReference}
              className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Link</span>
            </button>
          </div>

          {references.length === 0 ? (
            <p className="text-xs text-secondary/70 font-mono italic">
              No references added. (Optional)
            </p>
          ) : (
            <div className="space-y-2.5">
              {references.map((ref, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ref.title}
                    onChange={(e) => handleUpdateReference(idx, "title", e.target.value)}
                    placeholder="Link title (e.g. Postgres Docs)"
                    className="w-1/3 px-3 py-2 rounded-xl border border-border bg-white text-xs text-primary focus:outline-none"
                  />
                  <input
                    type="url"
                    value={ref.url}
                    onChange={(e) => handleUpdateReference(idx, "url", e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 rounded-xl border border-border bg-white text-xs font-mono text-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveReference(idx)}
                    className="p-1.5 text-secondary/50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Submission Toolbar */}
        <div className="sticky bottom-4 z-20 p-4 rounded-2xl border border-border bg-white/95 backdrop-blur-md shadow-xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-secondary">
            {isDirty && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
            <span>{isDirty ? "Unsaved changes" : "All changes saved"}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit("draft")}
              className="px-5 py-2.5 rounded-full border border-border bg-white text-xs font-medium text-secondary hover:text-primary hover:bg-secondary/5 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save as Draft</span>
            </button>

            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit("published")}
              className="px-6 py-2.5 rounded-full bg-primary text-background text-xs font-medium hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isEdit ? "Update & Publish" : "Publish Lesson"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setPreviewOpen(false)}
        >
          <div 
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/70">
              <span className="text-xs font-mono uppercase text-secondary">Lesson Preview</span>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-xs text-secondary hover:text-primary"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-xs font-medium text-primary">
                {category === "Custom" ? customCategory : category}
              </span>
              <h2 className="text-2xl font-semibold text-primary">{title || "Untitled Lesson"}</h2>
              <p className="text-sm text-secondary">{summary || "No summary provided."}</p>

              {documentFilename && (
                <div className="p-3 rounded-xl bg-neutral-50 border border-border text-xs font-mono text-primary flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-500" />
                  <span>Attached Document: {documentFilename}</span>
                </div>
              )}

              {keyTakeaways.filter(Boolean).length > 0 && (
                <div className="p-4 rounded-xl border border-border bg-neutral-50 space-y-1.5">
                  <h4 className="text-xs font-bold text-primary uppercase font-mono">Key Takeaways</h4>
                  <ul className="list-disc pl-4 text-xs text-secondary space-y-1">
                    {keyTakeaways.filter(Boolean).map((k, i) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </div>
              )}

              {content && (
                <div className="text-xs sm:text-sm text-secondary whitespace-pre-wrap pt-2">
                  {content}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
