import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/til/auth";
import { toggleLessonStatus } from "@/lib/til/db";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin(request);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const updated = await toggleLessonStatus(id);

  if (!updated) {
    return NextResponse.json({ success: false, error: "Lesson not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: updated,
    message: `Lesson is now ${updated.status}`,
  });
}
