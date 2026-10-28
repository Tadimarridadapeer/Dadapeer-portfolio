import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { getDocumentAbsolutePath } from "@/lib/til/document-storage";
import { getLessons } from "@/lib/til/db";
import { isAuthenticatedAdmin } from "@/lib/til/auth";
import { getSupabaseAdmin } from "@/lib/til/supabase";

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

    let fileBuffer: Buffer | null = null;
    const absolutePath = getDocumentAbsolutePath(filename);

    if (absolutePath && fs.existsSync(absolutePath)) {
      fileBuffer = await fs.promises.readFile(absolutePath);
    } else {
      // Fallback: Stream directly from Supabase Storage bucket
      const supabase = getSupabaseAdmin();
      if (supabase) {
        try {
          const { data: fileBlob, error: storageErr } = await supabase.storage
            .from("til-documents")
            .download(filename);

          if (!storageErr && fileBlob) {
            const arrayBuffer = await fileBlob.arrayBuffer();
            fileBuffer = Buffer.from(arrayBuffer);
          }
        } catch (storageException) {
          console.warn("Supabase storage retrieval fallback failed:", storageException);
        }
      }
    }

    if (!fileBuffer) {
      return new NextResponse("Document not found", { status: 404 });
    }
    const mimeType = associatedLesson?.document_mime_type || "application/octet-stream";
    const downloadName = associatedLesson?.document_filename || filename;

    const { searchParams } = new URL(request.url);
    const isDownload = searchParams.get("download") === "true";
    const dispositionType = isDownload ? "attachment" : "inline";

    return new NextResponse(new Uint8Array(fileBuffer), {
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
