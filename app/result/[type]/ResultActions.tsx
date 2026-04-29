"use client";

import { useRouter } from "next/navigation";

export default function ResultActions() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        type="button"
        onClick={() => alert("다음 단계에서 추가됩니다")}
        className="w-full bg-white text-text-main text-[15px] font-semibold py-3.5 rounded-full border border-border-light hover:border-purple-main/60 transition-colors"
      >
        결과 이미지 저장하기
      </button>
      <button
        type="button"
        onClick={() => router.push("/")}
        className="w-full bg-white text-text-sub text-[15px] font-medium py-3.5 rounded-full border border-border-light hover:text-text-main hover:border-purple-main/40 transition-colors"
      >
        다시 테스트하기
      </button>
    </div>
  );
}
