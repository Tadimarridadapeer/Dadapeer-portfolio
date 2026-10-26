import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/til/auth";
import { saveDocument } from "@/lib/til/document-storage";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(request);
  if (!isAuth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No file was uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const storedDoc = await saveDocument(buffer, file.name, file.type);

    return NextResponse.json({
      success: true,
      data: {
        document_path: storedDoc.storagePath,
        document_filename: storedDoc.filename,
        document_mime_type: storedDoc.mimeType,
        document_size: storedDoc.size,
      },
    });
  } catch (error: unknown) {
    console.error("Error in POST /api/admin/upload:", error);
    const message = error instanceof Error ? error.message : "Document upload failed";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
