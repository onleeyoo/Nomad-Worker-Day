import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  adminToken,
} from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "잘못된 요청입니다" },
      { status: 400 },
    );
  }

  const password =
    body && typeof body === "object"
      ? (body as Record<string, unknown>).password
      : undefined;

  if (
    typeof password !== "string" ||
    !process.env.ADMIN_PASSWORD ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      { success: false, error: "비밀번호가 틀렸습니다" },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}
