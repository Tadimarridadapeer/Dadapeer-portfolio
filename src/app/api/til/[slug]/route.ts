import { NextRequest, NextResponse } from "next/server";
import { getLessonBySlug } from "@/lib/til/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ success: false, error: "Slug required" }, { status: 400 });
    }

    // Public API requires published status strictly
    const lesson = await getLessonBySlug(slug, true);

    if (!lesson) {
      return NextResponse.json({ success: false, error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    console.error("Error in GET /api/til/[slug]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch lesson" },
      { status: 500 }
    );
  }
}
