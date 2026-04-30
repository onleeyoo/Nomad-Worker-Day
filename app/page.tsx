import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12 pt-6 text-center">
      <div className="gradient-bg w-28 h-28 rounded-full flex items-center justify-center shadow-lg shadow-purple-main/20 mb-8">
        <span className="text-5xl" role="img" aria-label="sparkles">
          ✨
        </span>
      </div>

      <h1 className="text-[26px] font-bold leading-tight text-text-main mb-3">
        2026 <span className="gradient-text">프리랜서의 날</span>
      </h1>

      <p className="text-[16px] leading-relaxed text-text-sub max-w-[340px] mb-7">
        남들 쉴 때 세상을 움직이는
        <br />
        당신에게 필요한 건?
      </p>

      <div className="bg-gray-bg rounded-2xl px-5 py-3.5 mb-10 max-w-[340px]">
        <p className="text-[13px] leading-relaxed text-text-sub">
          근로자의 날에도 묵묵히 마감을 치고 있는,
          <br />
          2026년 유정과 함께한 노마드 워커들
        </p>
      </div>

      <Link
        href="/test"
        className="gradient-bg text-white text-[16px] font-semibold px-10 py-4 rounded-full shadow-md shadow-purple-main/30 transition-transform active:scale-[0.98]"
      >
        테스트 시작하기
      </Link>

      <p className="mt-6 text-xs text-text-sub">약 1분 소요 · 15문항</p>
    </div>
  );
}
