import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/til/auth";
import { getLessons, createLesson, getLearningStats } from "@/lib/til/db";
import { CreateLessonInput } from "@/lib/til/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(request);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get("status") as "all" | "draft" | "published") || "all";
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = (searchParams.get("sort") as "newest" | "oldest") || "newest";
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const { lessons, total } = await getLessons({
      status,
      category,
      search,
      sort,
      limit,
      offset,
    });

    const stats = await getLearningStats();

    return NextResponse.json({
      success: true,
      data: {
        lessons,
        total,
        stats,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/admin/til:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch admin lessons" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(request);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: CreateLessonInput = await request.json();

    // Required fields validation
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
    }
    if (!body.summary || !body.summary.trim()) {
      return NextResponse.json({ success: false, error: "Summary is required" }, { status: 400 });
    }
    if (!body.category || !body.category.trim()) {
      return NextResponse.json({ success: false, error: "Category is required" }, { status: 400 });
    }
    if (!body.learning_date) {
      return NextResponse.json({ success: false, error: "Learning date is required" }, { status: 400 });
    }

    const created = await createLesson({
      title: body.title,
      slug: body.slug,
      summary: body.summary,
      content: body.content,
      learning_date: body.learning_date,
      category: body.category,
      tags: body.tags || [],
      key_takeaways: body.key_takeaways || [],
      code_examples: body.code_examples || [],
      references: body.references || [],
      cover_image_path: body.cover_image_path,
      document_path: body.document_path,
      document_filename: body.document_filename,
      document_mime_type: body.document_mime_type,
      document_size: body.document_size,
      status: body.status || "draft",
    });

    return NextResponse.json({
      success: true,
      data: created,
    });
  } catch (error) {
    console.error("Error in POST /api/admin/til:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create lesson" },
      { status: 500 }
    );
  }
}
