import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/til/auth";
import { getLessonById, updateLesson, deleteLesson } from "@/lib/til/db";
import { UpdateLessonInput } from "@/lib/til/types";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin(request);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const lesson = await getLessonById(id);
  if (!lesson) {
    return NextResponse.json({ success: false, error: "Lesson not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: lesson });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin(request);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body: UpdateLessonInput = await request.json();

    const existing = await getLessonById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Lesson not found" }, { status: 404 });
    }

    const updated = await updateLesson(id, body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error in PUT /api/admin/til/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update lesson" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin(request);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const success = await deleteLesson(id);
    if (!success) {
      return NextResponse.json({ success: false, error: "Lesson not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Lesson deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/admin/til/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete lesson" },
      { status: 500 }
    );
  }
}
