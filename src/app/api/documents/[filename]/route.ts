import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { getDocumentAbsolutePath } from "@/lib/til/document-storage";
import { getLessons } from "@/lib/til/db";
import { isAuthenticatedAdmin } from "@/lib/til/auth";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    if (!filename) {
      return new NextResponse("Filename is required", { status: 400 });
    }

    const absolutePath = getDocumentAbsolutePath(filename);
    if (!absolutePath) {
      return new NextResponse("Document not found", { status: 404 });
    }

    // Security check: Find the lesson associated with this document
    const { lessons: allLessons } = await getLessons({ status: "all", limit: 500 });
    const associatedLesson = allLessons.find((l) => l.document_path === filename);

    // If lesson exists and is published, allow public view
    // If lesson is draft or unassociated, require verified admin session
    if (!associatedLesson || associatedLesson.status !== "published") {
      const isAuth = await isAuthenticatedAdmin(request);
      if (!isAuth) {
        return new NextResponse("Unauthorized: This document belongs to an unpublished draft", { status: 403 });
      }
    }

    const fileBuffer = await fs.promises.readFile(absolutePath);
    const mimeType = associatedLesson?.document_mime_type || "application/octet-stream";
    const downloadName = associatedLesson?.document_filename || filename;

    const { searchParams } = new URL(request.url);
    const isDownload = searchParams.get("download") === "true";
    const dispositionType = isDownload ? "attachment" : "inline";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `${dispositionType}; filename="${encodeURIComponent(downloadName)}"`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": associatedLesson?.status === "published" 
          ? "public, max-age=3600, stale-while-revalidate=86400"
          : "no-store, private",
      },
    });
  } catch (error) {
    console.error("Error serving document:", error);
    return new NextResponse("Failed to retrieve document", { status: 500 });
  }
}
