import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getSupabaseAdmin } from "../supabase/supabase-client";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

const ALLOWED_MIME_TYPES: Record<string, string> = {
  "application/pdf": ".pdf",
  "text/markdown": ".md",
  "text/plain": ".txt",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "application/msword": ".doc",
};

const ALLOWED_EXTENSIONS = new Set([".pdf", ".md", ".txt", ".docx", ".doc"]);

// Local storage directory for documents fallback
const DOCUMENTS_DIR = path.join(process.cwd(), "data", "documents");
const SUPABASE_BUCKET = "til-documents";

function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function sanitizeFilename(name: string): string {
  const ext = path.extname(name).toLowerCase();
  const base = path.basename(name, ext)
    .replace(/[^a-zA-Z0-9_\-\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);

  return `${base || "document"}${ext}`;
}

export interface StoredDocument {
  storagePath: string; // relative or filename
  filename: string; // original sanitized filename
  mimeType: string;
  size: number;
}

/**
 * Validates and saves an uploaded document buffer to Supabase Storage or disk
 */
export async function saveDocument(
  buffer: Buffer,
  originalFilename: string,
  declaredMimeType: string
): Promise<StoredDocument> {
  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds maximum allowed limit of 25MB (Received: ${(buffer.length / (1024 * 1024)).toFixed(1)}MB)`);
  }

  const ext = path.extname(originalFilename).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error(`Unsupported file extension "${ext}". Allowed: PDF, Markdown, TXT, DOCX`);
  }

  // Normalize or fallback MIME type based on extension
  let mimeType = declaredMimeType;
  if (!ALLOWED_MIME_TYPES[mimeType]) {
    for (const [mType, e] of Object.entries(ALLOWED_MIME_TYPES)) {
      if (e === ext) {
        mimeType = mType;
        break;
      }
    }
  }

  const cleanName = sanitizeFilename(originalFilename);
  const uniquePrefix = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  const storedFilename = `${uniquePrefix}-${cleanName}`;

  // Attempt upload to Supabase Storage first if configured
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .upload(storedFilename, buffer, {
          contentType: mimeType,
          upsert: true,
        });

      if (!error && data) {
        // Also keep local copy for instant streaming
        ensureDirectoryExists(DOCUMENTS_DIR);
        await fs.promises.writeFile(path.join(DOCUMENTS_DIR, storedFilename), buffer);

        return {
          storagePath: storedFilename,
          filename: originalFilename,
          mimeType,
          size: buffer.length,
        };
      }
    } catch (err) {
      console.warn("Supabase storage upload failed, saving locally:", err);
    }
  }

  // Local fallback
  ensureDirectoryExists(DOCUMENTS_DIR);
  const absolutePath = path.join(DOCUMENTS_DIR, storedFilename);
  await fs.promises.writeFile(absolutePath, buffer);

  return {
    storagePath: storedFilename,
    filename: originalFilename,
    mimeType,
    size: buffer.length,
  };
}

/**
 * Retrieve document absolute path and metadata
 */
export function getDocumentAbsolutePath(storagePath: string): string | null {
  const safeFilename = path.basename(storagePath);
  const absolutePath = path.join(DOCUMENTS_DIR, safeFilename);

  if (fs.existsSync(absolutePath)) {
    return absolutePath;
  }
  return null;
}

/**
 * Safely delete an existing document from Supabase Storage and disk
 */
export async function deleteDocument(storagePath: string): Promise<boolean> {
  const safeFilename = path.basename(storagePath);

  // Delete from Supabase Storage if configured
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.storage.from(SUPABASE_BUCKET).remove([safeFilename]);
    } catch (err) {
      console.warn("Supabase storage delete warning:", err);
    }
  }

  // Delete from disk
  try {
    const absolutePath = path.join(DOCUMENTS_DIR, safeFilename);
    if (fs.existsSync(absolutePath)) {
      await fs.promises.unlink(absolutePath);
      return true;
    }
  } catch (err) {
    console.error(`Failed to delete document at ${storagePath}:`, err);
  }
  return false;
}

export { MAX_FILE_SIZE, ALLOWED_EXTENSIONS };
