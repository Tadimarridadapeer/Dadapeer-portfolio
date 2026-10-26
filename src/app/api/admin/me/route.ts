import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/til/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(request);
  return NextResponse.json({
    success: true,
    data: {
      authenticated: isAuth,
    },
  });
}
