# Nomad-Worker-Day

"노마드워커의 날 — 프리워커를 위한 처방전" 심리테스트 웹서비스. 운영: **공이공이 프로덕션**. 15문항 → 8개 굿즈 결과 → 신청 폼 → 관리자 대시보드.

GitHub: https://github.com/onleeyoo/Nomad-Worker-Day · Vercel: https://nomad-worker-day.vercel.app

---

## Stack

- **Next.js 14.2.x** App Router · TypeScript · Tailwind 3.4 · ESLint
- **Prisma 6.x** (v7 아님, 의도적 핀) + **Railway PostgreSQL**
- **html2canvas 1.4** (결과 PNG 저장, 동적 import)
- **Pretendard Variable** (CDN `@import` in `app/globals.css`)
- 호스팅: Vercel (git push로 자동 배포)

`postinstall: prisma generate` — Vercel 빌드 시 Prisma Client 누락 방지 목적. `npm install` 할 때마다 prisma generate 실행됨.

## 디자인 시스템

- 컨테이너: `max-w-[480px]` 가운데 정렬, PC에서 양옆 `bg-gray-bg`, 콘텐츠 영역 `bg-white`. 모바일 우선.
- Tailwind 커스텀 색: `purple-main #7B7AE8`, `pink-main #D89BE8`, `gray-bg #F5F5F7`, `text-main #1A1A1A`, `text-sub #6B7280`, `border-light #E5E7EB`
- 그라데이션 유틸 (globals.css): `.gradient-bg`, `.gradient-text` (135deg purple→pink). 진행률 바 / 결과 원 / "처방전" 강조 텍스트에만 사용.
- `.fade-in` keyframe — 질문 전환·결과 페이지 등장에 사용
- 헤더 로고: `<Image src="/logo.png" h-7 w-auto>` (intrinsic 861×256). `app/layout.tsx`에서 모든 페이지 공통 적용.

## 라우트 구조

```
/                      홈 (Link → /test)
/test                  15문항 클라이언트 컴포넌트 (자동 다음, 진행률 바)
/result/[type]         SSG, 8타입(BFD,BFC,BED,BEC,MFD,MFC,MED,MEC)만 정적 생성
                       dynamicParams = false → 그 외 코드는 404
/admin                 클라이언트 페이지: 로그인 또는 대시보드
/api/submit            POST: 신청 저장
/api/admin/login       POST: 비밀번호 → httpOnly 쿠키
/api/admin/logout      POST: 쿠키 삭제
/api/admin/submissions GET:  쿠키 검증 후 전체 조회
```

## 퀴즈 로직 (lib/)

3축 × 5문항 = 15. 각 옵션이 1점 부여 → 축마다 더 높은 글자가 선택됨, **동점 시 첫 글자(B/F/D) 우선**.

| 축 | 의미 | 코드 |
|---|---|---|
| 1 | 결핍 영역 | **B** 신체 / **M** 정신 |
| 2 | 회복 방식 | **F** 즉각 충전 / **E** 환경 전환 |
| 3 | 작업 강도 | **D** 마감 압박 / **C** 만성 피로 |

결과 코드는 3글자 조합 (예: `BFD`). 8개 모두 `lib/results.ts` `results` Record + `resultTypes` 배열에 하드코딩. **새 결과 추가하려면 두 곳 모두 수정 + 빌드 재실행 필요** (SSG라서).

## 데이터 흐름

```
/test (useState로 answers 누적)
  └─ 15번째 답변 → calculateResult(answers, questions) → router.push(/result/${type})

/result/[type]/page.tsx (서버, SSG)
  ├─ #result-capture div (html2canvas 캡처 대상, 워터마크 포함)
  ├─ <ResultActions> (클라이언트, document.getElementById로 캡처 영역 잡음)
  └─ <SubmissionForm> (클라이언트)
        ├─ Daum Postcode (next/script lazyOnload) → 우편/주소 자동 채움
        ├─ POST /api/submit → 저장 성공 시 localStorage["submitted-${type}"] = "true"
        └─ 마운트 시 localStorage 체크 → 이미 있으면 "이미 신청하셨어요" 카드만 렌더
```

**재제출 차단은 클라이언트 localStorage뿐** — 서버 측 unique 제약 없음. 같은 사람이 다른 브라우저로 다시 제출 가능.

**resultName은 서버에서 덮어씀** — 클라이언트가 보낸 값 무시하고 `results[resultType].goodsName`으로 저장 (변조 방지).

## 인증 모델 (lib/admin.ts)

NextAuth 안 씀. 단순 비밀번호 비교:

- 쿠키: `admin-auth` (httpOnly, sameSite=lax, 운영에서만 secure, 24h)
- 토큰값: `sha256(ADMIN_PASSWORD).slice(0,32)` — 위조 시도하려면 비밀번호 자체를 알아야 함
- API 가드: `isAuthed(req)` 한 줄로 검증

## 환경변수

`.env.local` (gitignored, `.env.local.example`만 추적):
```
DATABASE_URL="postgresql://..."
ADMIN_PASSWORD="0202"   # 운영 시 변경
```

**Vercel에 동일 두 키 등록 필수** (Settings → Environment Variables).

⚠️ **Prisma CLI는 `.env.local`을 자동 로드하지 않음** (Next.js 런타임은 자동 로드). `prisma db push` / `prisma studio` 등 실행 시:
```bash
set -a && . ./.env.local && set +a && npx prisma db push
```
또는 dotenv-cli 설치 후 npm 스크립트로 래핑.

## DB 스키마 (prisma/schema.prisma)

`Submission` 단일 모델. `cuid` id, `createdAt` 자동. 마이그레이션 시스템 안 쓰고 `prisma db push`로 직접 동기화 중.

## 자주 쓰는 명령

```bash
npm run dev                                              # .env.local 자동 로드됨
npx tsc --noEmit                                         # 타입체크
npx next lint
npx next build                                           # SSG 14페이지 + 4 dynamic API 검증
set -a && . ./.env.local && set +a && npx prisma db push # 스키마 동기화
```

DB 일회성 점검용 패턴 — 프로젝트 루트에 mjs 파일 만들고 같은 env loader로:
```bash
cat > _check.mjs <<'EOF'
import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
console.log(await p.submission.count());
await p.$disconnect();
EOF
set -a && . ./.env.local && set +a && node _check.mjs && rm _check.mjs
```
(`/tmp`에 두면 `@prisma/client` 못 찾음 — 반드시 프로젝트 dir 안에서 실행)

## 알아두면 좋은 것

- **Pretendard 로딩 타이밍**: html2canvas 캡처 전에 `await document.fonts.ready` 호출함 (ResultActions). 폰트 로드 전 캡처 시 fallback 글꼴로 찍히는 문제 방지.
- **`gradient-text`(background-clip:text)는 html2canvas가 완벽 지원 X** — 캡처본에서 그라데이션이 단색으로 나올 수 있음. 화면 표시는 정상.
- **CSV 다운로드는 한글 BOM `﻿` 포함** (admin/page.tsx) — Excel에서 깨짐 방지.
- **휴대폰 자동 하이픈**: `formatPhone` (SubmissionForm.tsx)이 4-4-4 규칙으로 인서트. 서버 검증 정규식 `/^010-\d{4}-\d{4}$/`.
- **이름 검증**: 한글 2~10자 (`/^[가-힣]{2,10}$/`). 영문/숫자 허용 안 함 (의도적).
- **Daum Postcode 스크립트**는 `strategy="lazyOnload"`. 사용자가 너무 일찍 "주소 검색" 누르면 alert 띄움.
- **결과 페이지 캡처 영역 id는 `result-capture`** — 변경 시 ResultActions의 captureId prop도 같이 수정.
- **8타입 결과 데이터 톤**: 캐치프레이즈 + 2~3줄 description. "이런 상태인 당신을 위한 처방" 톤. 노마드워커 정서(마감/피로/끼니/영감 고갈) 적극 차용.

## 디렉토리

```
app/
  admin/page.tsx          관리자 (로그인 + 대시보드)
  api/
    submit/route.ts       신청 저장
    admin/{login,logout,submissions}/route.ts
  result/[type]/
    page.tsx              SSG, 캡처 영역
    ResultActions.tsx     이미지 저장 + 다시 테스트하기 (클라)
  test/page.tsx           15문항 (클라)
  layout.tsx              480px 컨테이너 + 헤더 로고
  page.tsx                홈
  globals.css             Pretendard CDN, 그라데이션, fade-in
components/
  SubmissionForm.tsx      Daum 우편 + 검증 + localStorage
lib/
  questions.ts            15문항 (BM/FE/DC × 5)
  results.ts              8개 결과 + resultTypes 배열
  calculate.ts            answers → 3글자 코드
  prisma.ts               PrismaClient 싱글톤
  admin.ts                해시 토큰 + isAuthed
prisma/schema.prisma      Submission 단일 모델
public/logo.png           861×256 헤더 로고
```
