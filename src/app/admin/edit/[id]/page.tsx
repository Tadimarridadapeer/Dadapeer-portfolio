import { notFound, redirect } from "next/navigation";
import { getLessonById } from "@/lib/til/db";
import { isAuthenticatedAdmin } from "@/lib/til/auth";
import { LessonForm } from "@/components/admin/LessonForm";

export const dynamic = "force-dynamic";

interface EditLessonPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditLessonPage({ params }: EditLessonPageProps) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const lesson = await getLessonById(id);

  if (!lesson) {
    notFound();
  }

  return <LessonForm initialLesson={lesson} isEdit={true} />;
}
