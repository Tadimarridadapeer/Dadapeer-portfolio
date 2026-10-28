import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "til_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// Secret used for signing session cookies
const AUTH_SECRET = process.env.ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || "dadapeer-portfolio-til-auth-secret-key-2026";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

/**
 * Constant-time comparison to prevent timing attacks
 */
export function verifyAdminPassword(inputPassword: string): boolean {
  if (!inputPassword || typeof inputPassword !== "string") return false;
  
  const expectedBuffer = Buffer.from(ADMIN_PASSWORD);
  const inputBuffer = Buffer.from(inputPassword);

  if (expectedBuffer.length !== inputBuffer.length) {
    // Perform dummy comparison to mitigate timing leaks
    crypto.timingSafeEqual(expectedBuffer, expectedBuffer);
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, inputBuffer);
}

/**
 * Creates a signed session token: timestamp.randomBytes.hmacSignature
 */
export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${timestamp}:${nonce}`;
  const hmac = crypto.createHmac("sha256", AUTH_SECRET);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  return `${payload}:${signature}`;
}

/**
 * Verifies the signed session token and checks expiry
 */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(":");
  if (parts.length !== 3) return false;

  const [timestamp, nonce, signature] = parts;
  const timeNum = parseInt(timestamp, 10);
  if (isNaN(timeNum)) return false;

  // Check if token has expired (7 days)
  const ageMs = Date.now() - timeNum;
  if (ageMs > SESSION_MAX_AGE * 1000 || ageMs < -60000) {
    return false;
  }

  const payload = `${timestamp}:${nonce}`;
  const hmac = crypto.createHmac("sha256", AUTH_SECRET);
  hmac.update(payload);
  const expectedSignature = hmac.digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

/**
 * Verify whether an incoming API or Server request has a valid admin session
 */
export async function isAuthenticatedAdmin(request?: NextRequest): Promise<boolean> {
  // If request is provided, read cookies directly from request headers
  if (request) {
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE_NAME}=([^;]+)`));
      if (match && match[1]) {
        return verifySessionToken(decodeURIComponent(match[1]));
      }
    }
  }

  // Otherwise, use Next.js cookies() helper (for Server Actions & App Router)
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (sessionCookie && sessionCookie.value) {
      return verifySessionToken(sessionCookie.value);
    }
  } catch (err) {
    // Not in a server context where cookies() is available
  }

  return false;
}

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE };
