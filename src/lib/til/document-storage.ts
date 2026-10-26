import fs from "fs";
import path from "path";
import crypto from "crypto";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

const ALLOWED_MIME_TYPES: Record<string, string> = {
  "application/pdf": ".pdf",
  "text/markdown": ".md",
  "text/plain": ".txt",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  "application/msword": ".doc",
};

const ALLOWED_EXTENSIONS = new Set([".pdf", ".md", ".txt", ".docx", ".doc"]);

// Local storage directory for documents
const DOCUMENTS_DIR = path.join(process.cwd(), "data", "documents");

function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function sanitizeFilename(name: string): string {
  // Strip path traversal characters and non-alphanumeric except safe symbols
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
 * Validates and saves an uploaded document buffer to disk
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

  // Ensure documents directory exists
  ensureDirectoryExists(DOCUMENTS_DIR);

  const cleanName = sanitizeFilename(originalFilename);
  const uniquePrefix = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  const storedFilename = `${uniquePrefix}-${cleanName}`;
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
  // Guard against path traversal
  const safeFilename = path.basename(storagePath);
  const absolutePath = path.join(DOCUMENTS_DIR, safeFilename);

  if (fs.existsSync(absolutePath)) {
    return absolutePath;
  }
  return null;
}

/**
 * Safely delete an existing document from disk
 */
export async function deleteDocument(storagePath: string): Promise<boolean> {
  try {
    const safeFilename = path.basename(storagePath);
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
