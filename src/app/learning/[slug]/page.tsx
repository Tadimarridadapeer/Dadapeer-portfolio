import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLessonBySlug, getLessons } from "@/lib/til/db";
import { LessonDetailView } from "@/components/til/LessonDetailView";

export const dynamic = "force-dynamic";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug, true);

  if (!lesson) {
    return {
      title: "Lesson Not Found | Today I Learned",
    };
  }

  return {
    title: `${lesson.title} | Today I Learned`,
    description: lesson.summary,
    openGraph: {
      title: `${lesson.title} | Tadimarri Dadapeer`,
      description: lesson.summary,
      type: "article",
      publishedTime: lesson.published_at || lesson.learning_date,
      tags: lesson.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: lesson.title,
      description: lesson.summary,
    },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug, true);

  if (!lesson) {
    notFound();
  }

  // Fetch up to 2 related lessons in the same category
  const { lessons: allCategoryLessons } = await getLessons({
    status: "published",
    category: lesson.category,
    limit: 3,
  });

  const relatedLessons = allCategoryLessons.filter((l) => l.id !== lesson.id).slice(0, 2);

  return <LessonDetailView lesson={lesson} relatedLessons={relatedLessons} />;
}
