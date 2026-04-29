import { createHash } from "node:crypto";
import { NextRequest } from "next/server";

export const ADMIN_COOKIE = "admin-auth";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24;

export function adminToken(): string {
  const pw = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256").update(pw).digest("hex").slice(0, 32);
}

export function isAuthed(req: NextRequest): boolean {
  const cookie = req.cookies.get(ADMIN_COOKIE);
  if (!cookie) return false;
  return cookie.value === adminToken();
}
