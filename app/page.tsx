export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12 pt-6 text-center">
      <div className="gradient-bg w-28 h-28 rounded-full flex items-center justify-center shadow-lg shadow-purple-main/20 mb-8">
        <span className="text-5xl" role="img" aria-label="sparkles">
          ✨
        </span>
      </div>

      <h1 className="text-[24px] font-bold leading-tight text-text-main mb-3">
        프리워커를 위한 <span className="gradient-text">처방전</span>
      </h1>

      <p className="text-[16px] leading-relaxed text-text-sub max-w-[320px] mb-12">
        노동절에도 일하는 디지털노마드,
        <br />
        지금 당신에게 필요한 생존템은?
      </p>

      <button
        type="button"
        className="gradient-bg text-white text-[16px] font-semibold px-10 py-4 rounded-full shadow-md shadow-purple-main/30 transition-transform active:scale-[0.98]"
      >
        테스트 시작하기
      </button>

      <p className="mt-6 text-xs text-text-sub">약 1분 소요 · 16문항</p>
    </div>
  );
}
