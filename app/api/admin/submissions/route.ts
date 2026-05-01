import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthed } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json(
      { success: false, error: "인증이 필요합니다" },
      { status: 401 },
    );
  }
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, submissions });
  } catch (e) {
    console.error("[/api/admin/submissions] DB error", e);
    return NextResponse.json(
      { success: false, error: "데이터를 불러오지 못했습니다" },
      { status: 500 },
    );
  }
}
