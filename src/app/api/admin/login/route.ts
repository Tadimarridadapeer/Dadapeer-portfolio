import { NextRequest, NextResponse } from "next/server";
import { 
  verifyAdminPassword, 
  createSessionToken, 
  SESSION_COOKIE_NAME, 
  SESSION_MAX_AGE 
} from "@/lib/til/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Password is required" },
        { status: 400 }
      );
    }

    const isValid = verifyAdminPassword(password);
    if (!isValid) {
      // Simulate small delay to mitigate brute force
      await new Promise((resolve) => setTimeout(resolve, 300));
      return NextResponse.json(
        { success: false, error: "Invalid admin password" },
        { status: 401 }
      );
    }

    const token = createSessionToken();
    const response = NextResponse.json({
      success: true,
      message: "Admin authenticated successfully",
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in POST /api/admin/login:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}
