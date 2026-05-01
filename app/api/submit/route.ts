import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { results, resultTypes, type ResultType } from "@/lib/results";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NAME_RE = /^[가-힣]{2,10}$/;
const PHONE_RE = /^010-\d{4}-\d{4}$/;
const ZIP_RE = /^\d{5}$/;

function fail(status: number, error: string) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function POST(req: NextRequest) {
  console.log("[submit] DATABASE_URL exists:", !!process.env.DATABASE_URL);
  console.log(
    "[submit] DATABASE_URL prefix:",
    process.env.DATABASE_URL?.substring(0, 20) || "UNDEFINED",
  );
  console.log("[submit] NODE_ENV:", process.env.NODE_ENV);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "잘못된 요청입니다");
  }
  if (!body || typeof body !== "object") return fail(400, "잘못된 요청입니다");

  const {
    resultType,
    name,
    phone,
    postalCode,
    address,
    addressDetail,
    agreed,
  } = body as Record<string, unknown>;

  if (typeof resultType !== "string" || !resultTypes.includes(resultType as ResultType)) {
    return fail(400, "잘못된 결과 코드입니다");
  }
  if (typeof name !== "string" || !NAME_RE.test(name)) {
    return fail(400, "이름을 한글 2~10자로 입력해주세요");
  }
  if (typeof phone !== "string" || !PHONE_RE.test(phone)) {
    return fail(400, "휴대폰번호를 010-0000-0000 형식으로 입력해주세요");
  }
  if (typeof postalCode !== "string" || !ZIP_RE.test(postalCode)) {
    return fail(400, "우편번호 검색을 통해 입력해주세요");
  }
  if (typeof address !== "string" || !address.trim()) {
    return fail(400, "주소를 입력해주세요");
  }
  if (typeof addressDetail !== "string" || !addressDetail.trim()) {
    return fail(400, "상세주소를 입력해주세요");
  }
  if (agreed !== true) {
    return fail(400, "개인정보 수집·이용에 동의해주세요");
  }

  const canonical = results[resultType as ResultType];

  try {
    const submission = await prisma.submission.create({
      data: {
        resultType,
        resultName: canonical.goodsName,
        name: name.trim(),
        phone,
        postalCode,
        address: address.trim(),
        addressDetail: addressDetail.trim(),
        agreed: true,
      },
      select: { id: true },
    });
    return NextResponse.json({ success: true, id: submission.id });
  } catch (e) {
    console.error("[/api/submit] DB error", e);
    return fail(500, "신청 저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
}
