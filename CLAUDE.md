# Nomad-Worker-Day

**2026 프리랜서의 날** — 노동절에도 일하는 프리랜서/디지털노마드에게 보내는 짧은 심리테스트 + 굿즈 신청. 운영: 공이공이 프로덕션 (유정).

GitHub: https://github.com/onleeyoo/Nomad-Worker-Day · Vercel: https://nomad-worker-day.vercel.app

---

## Stack

- **Next.js 14.2.x** App Router · TypeScript · Tailwind 3.4 · ESLint
- **Prisma 6.x** (v7 아님, 의도적 핀) + **Railway PostgreSQL**
- **html2canvas 1.4** (결과 PNG 저장, 동적 import)
- **폰트 2종 (jsdelivr CDN @import)**: Pretendard Variable (본문) + Paperlogy (강조 텍스트만)
- 호스팅: **Vercel** (git push origin main → 자동 배포). `postinstall: prisma generate`로 Prisma Client 생성 보장.

## 라우트 구조

```
/                     홈 (풀스크린 글로우 오브 + 큰 CTA → /test)
/test                 16문항 클라이언트 컴포넌트 (Q0 인트로 + Q1-Q15 점수 문항)
/result/[type]        SSG, 8타입(BFD/BFC/BED/BEC/MFD/MFC/MED/MEC) 정적 생성
                      dynamicParams = false → 그 외 코드는 404
/admin                클라이언트 페이지: 로그인 분기 또는 대시보드
/api/submit           POST: 신청 저장 (resultName은 서버에서 canonical로 덮어씀)
/api/admin/login      POST: 비밀번호 → httpOnly 쿠키 (24h)
/api/admin/logout     POST: 쿠키 삭제
/api/admin/submissions  GET: 쿠키 검증 후 전체 조회 (createdAt desc)
```

## 디자인 시스템

- 컨테이너: `max-w-[480px]` 가운데, 콘텐츠 영역 `bg-white`. PC에선 양옆 `#F5F5F7`.
- 페이지 높이: `min-h-dvh` (iOS Safari 주소창 변동 대응).
- `viewport` export (layout.tsx): `initialScale 1, maximumScale 1, userScalable false, viewportFit "cover"` (env safe-area 활성화 + zoom 차단).
- 본문 전역 (globals.css body): `word-break: keep-all`, `overflow-wrap: break-word`, `overflow-x: hidden`, `text-size-adjust: 100%`.
- 안전 영역: 페이지 하단에 `pb-[max(env(safe-area-inset-bottom),Npx)]` 패턴 (iPhone 홈 인디케이터 가림 방지).
- Tailwind 커스텀 색: `purple-main #7B7AE8`, `pink-main #D89BE8`, `gray-bg #F5F5F7`, `text-main #1A1A1A`, `text-sub #6B7280`, `border-light #E5E7EB`.
- 폰트:
  - 기본(body 상속): Pretendard Variable
  - `.font-paperlogy`: 강조 텍스트(타이틀, Q넘버, 굿즈명, 관리자 총 신청자 수)
- 그라데이션 유틸:
  - `.gradient-bg` — 글로우 오브, 진행률 바 fill, CTA 버튼
  - `.gradient-text` — "프리랜서의 날", "처방전", Q넘버, "당 시작하기" 등 (background-clip:text)
- 반응형 사이즈: `clamp()` 적극 사용 (글로우 오브 `clamp(200px,38vh,280px)`, Q넘버 `clamp(80px,22vw,140px)` 등). 데스크탑 480px엔 상한 적용으로 변동 없음.

## 헤더/풋터 로고 처리 (components/AppHeader.tsx)

`AppHeader`는 client 컴포넌트로 `usePathname()` 기반 분기:
- `/`, `/test`, `/result/*` 매칭 시 → `null` 반환 (헤더 없음)
- `/admin` 등 그 외엔 상단 로고 표시

해당 페이지들은 페이지 자체에 작은 풋터 로고(`h-5`~`h-6 opacity-60`)를 별도 배치. 새 페이지 추가 시 AppHeader의 매칭 조건도 점검 필요.

## 애니메이션 (globals.css)

| 클래스 | 효과 | 사용처 |
|---|---|---|
| `.fade-in` (0.35s) | translateY 6px → 0 | 질문 전환, 결과 페이지 진입 |
| `.orb-rise` (0.7s) | scale 0.85 → 1 | 홈/결과 글로우 오브 등장 |
| `.orb-float` (5s loop) | translateY + scale 호흡 | 홈 오브 둥둥 |
| `.orb-glow` (4s loop) | box-shadow 강도 호흡 | 홈 오브 글로우 펄스 |
| `.hero-rise` (0.6s) | translateY 10px → 0 | 홈 텍스트·CTA, inline `animationDelay`로 stagger |

## 굿즈 이미지 / 글로우 오브 (GIF 마스킹)

홈과 결과 페이지 모두 외부 giphy GIF + `.gif-circular` 클래스로 동일 패턴:
- next/image는 GIF 애니메이션을 정적 첫 프레임으로 처리 → **plain `<img>` 사용** + `eslint-disable-next-line @next/next/no-img-element`
- `.gif-circular`: `width/height: 100%; object-fit: cover; border-radius: 50%; mask-image: radial-gradient(circle, black 70%, transparent 100%)` → 원형 + 가장자리 페이드(그라데이션 배경에 자연 블렌드)
- 페더 강도 미세 조정: 70% → 60%(강함) / 80%(약함). globals.css 한 곳에서 변경.
- `crossOrigin="anonymous"` 부착 → html2canvas의 `useCORS: true` 옵션과 함께 외부 GIF 캡처 호환.

## 퀴즈 로직 (lib/)

총 **16문항** (id 0-15):
- **id 0** = `axis: "INTRO"` 인트로 — calculate.ts에서 score 합산 시 skip (옵션 score도 `{}`로 이중 안전)
- id 1-15 = 3축 × 5문항씩, 각 옵션 1점

| 축 | 의미 | 코드 |
|---|---|---|
| BM | 결핍 영역 | **B** 신체 / **M** 정신 |
| FE | 회복 방식 | **F** 즉각 충전 / **E** 환경 전환 |
| DC | 작업 강도 | **D** 마감 압박 / **C** 만성 피로 |

- 결과 코드 = 3글자 조합 (예: `BFD`). **동점 시 첫 글자(B/F/D) 우선** (`>=` 비교).
- 8개 결과 = `lib/results.ts`의 `results` Record + `resultTypes` 배열에 **둘 다** 추가 필요 (`generateStaticParams`가 배열 사용).
- 화면 Q넘버 = `Q{currentIndex + 1}` (1..16) — **데이터 `id`가 아닌 화면 순번 기준**. 인트로도 Q1로 표시.

## 결과 데이터 (lib/results.ts)

각 `Result`:
- `goodsName`, `emoji` (admin 통계 카드용 폴백), `gifUrl` (결과 페이지 굿즈 원에 표시)
- `catchphrase`, `description` — `\n` 줄바꿈 포함, 페이지에서 `whitespace-pre-line`으로 렌더
- `axes` (deficiency/recovery/intensity) — 결과 코드와 1:1 매핑

## 결과 페이지 캡처 영역 (#result-capture)

html2canvas 대상. 패딩 `bg-white px-5 pt-4 pb-8` — letter-card 그림자(아래 ~28px, 옆 ~20px)가 bbox 안에 들어오게 보강.

**캡처 안에 들어가는 것 (PNG에 찍힘)**:
1. "2026 프리랜서의 날" 헤더 (Paperlogy 큰 타이틀 + 부제 + "by. 공이공이 프로덕션 유정" 크레딧)
2. 굿즈 원 (`gradient-bg` + GIF + 페더 마스크, 그림자)
3. 굿즈명 h1 (Paperlogy)
4. 캐치프레이즈 (16px) + 설명 (14px)
5. **편지 카드** (`letter-card` 클래스, 흰박스 + 보라 그림자, 본문 4문단 + 보라 강조 한 줄 + 서명/날짜)

**캡처 밖**:
- 상단 작은 로고
- "결과 이미지 저장하기" 버튼 (단일, "다시 테스트하기" 버튼은 제거됨)
- `<hr>`, SubmissionForm 또는 "이미 신청하셨어요" 카드

## html2canvas 캡처-mode 가드 (ResultActions.tsx)

캡처는 그대로 두면 두 가지가 깨짐:
1. `gradient-text` (background-clip:text) → 보라 사각형 박스로 변형
2. `letter-card` 흰박스 → bg-white 캡처 위 흰박스가 0.15 alpha 그림자로만 구분되어 거의 안 보임

해결: 캡처 직전 `target.querySelectorAll(".gradient-text, .letter-card")` 모두에 `.capture-mode` 클래스 부착, **`finally`에서 제거** (예외에도 원복).

`globals.css`의 capture-mode 룰:
- `.gradient-text.capture-mode` → background:none + 단색 `#7B7AE8` 폴백
- `.letter-card.capture-mode` → 보더 alpha 0.15→0.30, 그림자 alpha 강화

순서: `setSaving(true)` → 클래스 부착 → `await document.fonts.ready` → 30ms 대기(CSS 반영) → html2canvas 호출(`scale: 2, useCORS, allowTaint, backgroundColor: '#fff'`) → 다운로드 → `finally`에서 클래스 제거 + `setSaving(false)`.

## 신청 폼 (components/SubmissionForm.tsx)

- 제목: "🎁 선물 받으실 곳을 입력해 주세요"
- 4필드: 이름(`/^[가-힣]{2,10}$/`), 휴대폰(자동 하이픈 `formatPhone`), 우편번호(`/^\d{5}$/`)+주소(Daum lazyOnload), 상세주소
- 동의 체크박스(필수). 모두 통과해야 제출 버튼 활성.
- 제출 성공 시 `localStorage["submitted-${resultType}"] = "true"` → 마운트 시 체크해 "이미 신청하셨어요" 카드로 분기 렌더.
- 재제출 차단은 클라이언트 localStorage뿐 (서버 unique 제약 없음).

## 인증 (lib/admin.ts)

NextAuth 안 씀. 단순 비밀번호 + httpOnly 쿠키:
- 쿠키 `admin-auth`, sameSite=lax, secure(prod), 24h
- 토큰값 = `sha256(ADMIN_PASSWORD).slice(0,32)` — 위조하려면 비밀번호를 알아야 함
- API 가드: `isAuthed(req)` 한 줄

## 환경변수 / Prisma CLI 함정

`.env.local` (gitignored):
```
DATABASE_URL="postgresql://..."
ADMIN_PASSWORD="..."
```

Vercel Settings → Environment Variables에 동일하게 등록 필수.

⚠️ **Prisma CLI는 `.env.local`을 자동 로드하지 않음** (Next.js 런타임은 자동 로드). `prisma db push` / `prisma studio` 등 실행 시:
```bash
set -a && . ./.env.local && set +a && npx prisma db push
```

## DB 스키마

`prisma/schema.prisma`의 `Submission` 단일 모델. cuid id, createdAt 자동. 마이그레이션 시스템 안 씀 — `prisma db push`로 직접 동기화.

## 외부 의존성 (오프라인 영향)

| 자원 | 호스트 | 끊겼을 때 |
|---|---|---|
| Pretendard | cdn.jsdelivr.net | 시스템 폰트 폴백 (가독 OK) |
| Paperlogy | cdn.jsdelivr.net | Pretendard 폴백 |
| Giphy GIF | media.giphy.com / media1.giphy.com | 빈 그라데이션 원만 |
| Daum 우편번호 | t1.daumcdn.net | "주소 검색" 클릭 시 alert |
| Railway DB | switchback.proxy.rlwy.net | API 500 |

PWA / Service Worker 없음 → 오프라인 지원 안 함.

## 자주 쓰는 명령

```bash
npm run dev                  # .env.local 자동 로드
npx tsc --noEmit
npx next lint
npx next build               # SSG + dynamic API 모두 검증
set -a && . ./.env.local && set +a && npx prisma db push
```

DB 일회성 점검: 프로젝트 루트(`/tmp` 안 됨, `@prisma/client` 못 찾음)에 mjs 파일 만들고 같은 env loader로 실행.

## 알아두면 좋은 것

- **CSS @import 순서**: globals.css 맨 위에 Pretendard, Paperlogy 두 줄. tailwind 디렉티브보다 위에.
- **CSV 다운로드 BOM**: admin/page.tsx에서 `﻿` prepend → Excel 한글 깨짐 방지.
- **resultName 변조 방지**: API에서 클라가 보낸 값 무시하고 `results[resultType].goodsName`으로 덮어씀.
- **이름/휴대폰 정규식은 클라+서버 모두 동일** — 불일치 시 UX 깨짐.
- **Q0 INTRO axis는 점수 영향 0** — calculate.ts에 axis === "INTRO" skip 가드. 인트로 추가 시 같은 패턴.
- **편지 카드 그림자**: 0.15 alpha를 흰 배경 위에 캡처하면 거의 안 보임 → letter-card.capture-mode가 alpha를 2배로 강화하는 패턴 채택.
- **이미지 props ↔ 실제 비율**: logo.png(367×129), computer.png(1220×1432). next/image의 `width`/`height` props가 실제와 다르면 약간 왜곡. 현재 props는 옛 dimensions(861×256, 2500×2500) 기준. 시각 왜곡 보이면 props를 실제에 맞게 갱신.
- **GIF 캡처는 첫 프레임만**: html2canvas 정상 동작이며 의도된 동작.
- **8타입 결과 톤**: 캐치프레이즈 + description. "당신을 위한 처방" 톤. 노마드워커 정서(마감/피로/끼니/영감 고갈) 적극 차용. `\n`으로 줄바꿈 명시.

## 디렉토리

```
app/
  admin/page.tsx               관리자 (로그인 + 대시보드)
  api/submit/route.ts          신청 저장
  api/admin/{login,logout,submissions}/route.ts
  result/[type]/
    page.tsx                   SSG, #result-capture 영역(헤더+굿즈+편지)
    ResultActions.tsx          단일 이미지 저장 버튼 + capture-mode 토글
  test/page.tsx                16문항 (Q0 인트로 + 15)
  layout.tsx                   480px 컨테이너 + Viewport export + AppHeader
  page.tsx                     홈 (글로우 오브 + 큰 CTA + 풋터 로고)
  globals.css                  CDN 폰트, 그라데이션, 애니메이션, capture-mode/gif-circular 룰
components/
  AppHeader.tsx                pathname 기반 헤더 분기 (client)
  SubmissionForm.tsx           폼 + Daum 우편 + localStorage 차단
lib/
  questions.ts                 16문항 (INTRO 1 + BM/FE/DC × 5)
  results.ts                   8개 결과(emoji+gifUrl) + resultTypes
  calculate.ts                 INTRO skip + 3글자 코드
  prisma.ts                    PrismaClient 싱글톤
  admin.ts                     해시 토큰 + isAuthed
prisma/schema.prisma           Submission 단일 모델
public/
  logo.png                     367×129 (작은 풋터/관리자 헤더)
  computer.png                 1220×1432 (현재 미사용 — 홈 GIF로 교체됨)
```
