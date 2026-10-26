"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  LogOut, 
  Edit, 
  Trash2, 
  Eye, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  BookOpen,
  Layers,
  AlertTriangle,
  RotateCw
} from "lucide-react";
import { LearningEntry, LearningStats } from "@/lib/til/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState<LearningEntry[]>([]);
  const [stats, setStats] = useState<LearningStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [deleteModalLesson, setDeleteModalLesson] = useState<LearningEntry | null>(null);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/til?status=all");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.success && data.data) {
        setLessons(data.data.lessons || []);
        setStats(data.data.stats || null);
      }
    } catch (err) {
      console.error("Failed loading admin lessons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleToggleStatus = async (lesson: LearningEntry) => {
    setActionLoadingId(lesson.id);
    try {
      const res = await fetch(`/api/admin/til/${lesson.id}/status`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        // Refresh local list
        setLessons((prev) =>
          prev.map((l) => (l.id === lesson.id ? data.data : l))
        );
        // Refresh stats
        fetchAdminData();
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteModalLesson) return;
    setActionLoadingId(deleteModalLesson.id);
    try {
      const res = await fetch(`/api/admin/til/${deleteModalLesson.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLessons((prev) => prev.filter((l) => l.id !== deleteModalLesson.id));
        setDeleteModalLesson(null);
        fetchAdminData();
      }
    } catch (err) {
      console.error("Failed to delete lesson:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredLessons = useMemo(() => {
    return lessons.filter((l) => {
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.tags.some((t) => t.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [lessons, statusFilter, search]);

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 sm:px-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-secondary">
              Admin Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight">
            Today I Learned (TIL) Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/learning"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-white text-xs font-medium text-secondary hover:text-primary transition-colors"
          >
            <span>Live Archive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/admin/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-background text-xs font-medium hover:bg-primary/90 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Learning Entry</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-xl border border-border bg-white text-secondary hover:text-red-600 hover:border-red-200 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl border border-border bg-white shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary block mb-1">
              Total Lessons
            </span>
            <span className="text-3xl font-semibold text-primary">{stats.totalLessons}</span>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-white shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary block mb-1">
              Published
            </span>
            <span className="text-3xl font-semibold text-emerald-600">{stats.totalPublished}</span>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-white shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary block mb-1">
              Drafts
            </span>
            <span className="text-3xl font-semibold text-amber-600">{stats.totalDrafts}</span>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-white shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary block mb-1">
              Categories
            </span>
            <span className="text-3xl font-semibold text-primary">{stats.categories.length}</span>
          </div>
        </div>
      )}

      {/* Management Table Card */}
      <div className="rounded-3xl border border-border bg-white shadow-xs overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-5 border-b border-border/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-secondary/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, tag, category..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-neutral-50 text-xs text-primary placeholder:text-secondary/50 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 border border-border/60 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "all" ? "bg-white text-primary shadow-2xs" : "text-secondary hover:text-primary"
              }`}
            >
              All ({lessons.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("published")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "published" ? "bg-white text-primary shadow-2xs" : "text-secondary hover:text-primary"
              }`}
            >
              Published ({stats?.totalPublished || 0})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("draft")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "draft" ? "bg-white text-primary shadow-2xs" : "text-secondary hover:text-primary"
              }`}
            >
              Drafts ({stats?.totalDrafts || 0})
            </button>
          </div>
        </div>

        {/* Table Content */}
        {loading ? (
          <div className="p-16 text-center text-xs font-mono text-secondary">
            Loading lesson entries...
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="p-16 text-center text-xs text-secondary font-mono">
            No entries found. Click &quot;New Learning Entry&quot; to write your first lesson.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50/80 border-b border-border/70 text-secondary uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-3 px-5">Title & Category</th>
                  <th className="py-3 px-4">Learning Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Document</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredLessons.map((lesson) => {
                  const isPublished = lesson.status === "published";
                  const isLoading = actionLoadingId === lesson.id;

                  return (
                    <tr key={lesson.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 px-5 max-w-md">
                        <div className="flex items-start gap-2">
                          <div>
                            <Link
                              href={`/admin/edit/${lesson.id}`}
                              className="font-medium text-sm text-primary hover:underline underline-offset-2 leading-snug line-clamp-1"
                            >
                              {lesson.title}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] text-secondary font-mono">
                                {lesson.category}
                              </span>
                              {lesson.tags?.slice(0, 2).map((t) => (
                                <span key={t} className="text-[10px] font-mono text-secondary/60">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono text-secondary whitespace-nowrap">
                        {lesson.learning_date}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${
                            isPublished
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                              : "bg-amber-50 border-amber-200 text-amber-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPublished ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          <span>{isPublished ? "Published" : "Draft"}</span>
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        {lesson.document_path ? (
                          <a
                            href={`/api/documents/${lesson.document_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:underline"
                            title={lesson.document_filename || "Document"}
                          >
                            <FileText className="w-3.5 h-3.5 text-red-500" />
                            <span className="max-w-[120px] truncate">
                              {lesson.document_filename || "Attached"}
                            </span>
                          </a>
                        ) : (
                          <span className="text-secondary/40 font-mono text-[11px]">—</span>
                        )}
                      </td>

                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          {/* Publish/Unpublish Toggle */}
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleToggleStatus(lesson)}
                            className="px-2.5 py-1 rounded-lg border border-border/80 hover:bg-neutral-100 text-[11px] font-medium text-secondary hover:text-primary transition-colors disabled:opacity-50"
                          >
                            {isPublished ? "Unpublish" : "Publish"}
                          </button>

                          {/* Edit */}
                          <Link
                            href={`/admin/edit/${lesson.id}`}
                            className="p-1.5 rounded-lg border border-border/80 hover:bg-neutral-100 text-secondary hover:text-primary transition-colors inline-block"
                            title="Edit Lesson"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>

                          {/* Preview Public Route */}
                          <Link
                            href={`/learning/${lesson.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg border border-border/80 hover:bg-neutral-100 text-secondary hover:text-primary transition-colors inline-block"
                            title="View Public Page"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>

                          {/* Delete */}
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => setDeleteModalLesson(lesson)}
                            className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors"
                            title="Delete Lesson"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalLesson && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setDeleteModalLesson(null)}
        >
          <div 
            className="w-full max-w-md rounded-3xl border border-border bg-white p-6 sm:p-7 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-primary">Delete Learning Entry?</h3>
            </div>

            <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-6">
              Are you sure you want to permanently delete <strong className="text-primary font-medium">&quot;{deleteModalLesson.title}&quot;</strong>? This action cannot be undone and will also delete any attached documents from storage.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalLesson(null)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-medium text-secondary hover:text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoadingId === deleteModalLesson.id}
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-all shadow-xs"
              >
                {actionLoadingId === deleteModalLesson.id ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
