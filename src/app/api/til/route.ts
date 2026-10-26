import { NextRequest, NextResponse } from "next/server";
import { getLessons, getLearningStats } from "@/lib/til/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const tag = searchParams.get("tag") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = (searchParams.get("sort") as "newest" | "oldest") || "newest";
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const includeStats = searchParams.get("stats") === "true";

    // Public API strictly enforces status === "published"
    const { lessons, total } = await getLessons({
      status: "published",
      category,
      tag,
      search,
      sort,
      limit,
      offset,
    });

    let stats = null;
    if (includeStats) {
      stats = await getLearningStats();
    }

    return NextResponse.json({
      success: true,
      data: {
        lessons,
        total,
        limit,
        offset,
        stats,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/til:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch learning entries" },
      { status: 500 }
    );
  }
}
