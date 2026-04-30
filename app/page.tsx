import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center px-6 pt-[16vh] pb-10 text-center">
      <div className="relative w-[280px] h-[280px] orb-rise">
        <div className="relative w-full h-full orb-float">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full gradient-bg opacity-55 blur-3xl"
            style={{ transform: "scale(1.5)" }}
          />
          <div
            aria-hidden
            className="relative w-full h-full rounded-full gradient-bg orb-glow"
          />
        </div>
      </div>

      <div
        className="hero-rise mt-12 w-full max-w-[360px]"
        style={{ animationDelay: "0.18s" }}
      >
        <h1 className="text-[34px] font-bold leading-[1.2] text-text-main mb-4">
          2026 <span className="gradient-text">프리랜서의 날</span>
        </h1>
        <p className="text-[18px] leading-relaxed text-text-sub mb-5">
          남들 쉴 때 세상을 움직이는
          <br />
          당신에게 필요한 건?
        </p>
        <p className="text-[14px] leading-relaxed text-text-sub/70">
          근로자의 날에도 묵묵히 마감을 치고 있는,
          <br />
          2026년 유정과 함께한 노마드 워커들
        </p>
      </div>

      <div
        className="hero-rise mt-auto w-full pt-12"
        style={{ animationDelay: "0.36s" }}
      >
        <p className="text-[12px] text-text-sub mb-3">약 2분 소요 · 15문항</p>
        <Link
          href="/test"
          className="block w-full gradient-bg text-white text-[17px] font-bold py-[18px] rounded-full shadow-[0_12px_30px_rgba(123,122,232,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99]"
        >
          테스트 시작하기
        </Link>
        <div className="mt-5 flex justify-center">
          <Image
            src="/logo.png"
            alt="공이공이 프로덕션"
            width={861}
            height={256}
            className="h-5 w-auto opacity-60"
          />
        </div>
      </div>
    </div>
  );
}
