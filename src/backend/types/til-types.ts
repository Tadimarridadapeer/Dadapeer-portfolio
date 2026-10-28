export interface CodeExample {
  language: string;
  code: string;
  caption?: string;
}

export interface ReferenceLink {
  title: string;
  url: string;
}

export type LessonStatus = "draft" | "published";

export interface LearningEntry {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  learning_date: string; // YYYY-MM-DD
  published_at: string | null; // ISO timestamp
  category: string;
  tags: string[];
  key_takeaways: string[];
  code_examples: CodeExample[];
  references: ReferenceLink[];
  cover_image_path?: string | null;
  document_path?: string | null; // storage path or filename
  document_filename?: string | null; // original filename e.g. "race-conditions.pdf"
  document_mime_type?: string | null;
  document_size?: number | null; // bytes
  status: LessonStatus;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface CreateLessonInput {
  title: string;
  slug?: string;
  summary: string;
  content?: string;
  learning_date: string;
  category: string;
  tags?: string[];
  key_takeaways?: string[];
  code_examples?: CodeExample[];
  references?: ReferenceLink[];
  cover_image_path?: string | null;
  document_path?: string | null;
  document_filename?: string | null;
  document_mime_type?: string | null;
  document_size?: number | null;
  status: LessonStatus;
}

export type UpdateLessonInput = Partial<CreateLessonInput>;

export interface LearningStats {
  totalPublished: number;
  totalDrafts: number;
  totalLessons: number;
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
  latestLesson: LearningEntry | null;
  activityByDate: Record<string, number>; // date YYYY-MM-DD -> count
  streakDays: number;
}
