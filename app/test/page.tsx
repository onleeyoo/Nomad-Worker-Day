"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import { calculateResult, type Answer } from "@/lib/calculate";

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<0 | 1 | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const total = questions.length;
  const current = questions[currentIndex];
  const progress = ((currentIndex + 1) / total) * 100;

  const handleSelect = (idx: 0 | 1) => {
    if (transitioning) return;
    setSelectedIndex(idx);
    setTransitioning(true);

    const nextAnswers: Answer[] = [
      ...answers,
      { questionId: current.id, selectedIndex: idx },
    ];

    setTimeout(() => {
      if (currentIndex === total - 1) {
        const type = calculateResult(nextAnswers, questions);
        router.push(`/result/${type}`);
        return;
      }
      setAnswers(nextAnswers);
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    if (transitioning) return;
    if (currentIndex === 0) {
      router.push("/");
      return;
    }
    setAnswers((prev) => prev.slice(0, -1));
    setCurrentIndex((i) => i - 1);
    setSelectedIndex(null);
  };

  return (
    <div className="flex-1 flex flex-col px-5 pt-5 pb-10">
      <div className="flex items-center gap-3 mb-8">
        <button
          type="button"
          onClick={handleBack}
          aria-label={currentIndex === 0 ? "처음으로" : "이전 질문"}
          className="w-9 h-9 -ml-2 flex items-center justify-center rounded-full text-text-sub hover:text-text-main transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="flex-1 h-1.5 bg-border-light rounded-full overflow-hidden">
          <div
            className="h-full gradient-bg rounded-full transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-semibold gradient-text tabular-nums whitespace-nowrap">
          {currentIndex + 1} / {total}
        </span>
      </div>

      <div
        key={currentIndex}
        className="flex-1 flex flex-col justify-center fade-in"
      >
        <p
          aria-hidden="true"
          className="font-paperlogy gradient-text text-[clamp(96px,28vw,140px)] font-extrabold leading-none text-center mb-6"
        >
          Q{currentIndex + 1}
        </p>
        <h2 className="font-paperlogy text-[24px] font-bold leading-snug text-text-main text-center mb-10 px-2 text-balance">
          {current.question}
        </h2>

        <div className="flex flex-col gap-4">
          {current.options.map((opt, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx as 0 | 1)}
                className={`bg-white rounded-3xl px-6 py-5 text-center transition-all duration-200 disabled:cursor-default ${
                  isSelected
                    ? "shadow-[0_16px_40px_-4px_rgba(123,122,232,0.35),0_8px_20px_-2px_rgba(216,155,232,0.25)] -translate-y-0.5 scale-[0.99]"
                    : "shadow-[0_8px_24px_-4px_rgba(123,122,232,0.15),0_4px_12px_-2px_rgba(216,155,232,0.1)] hover:shadow-[0_12px_32px_-4px_rgba(123,122,232,0.25),0_6px_16px_-2px_rgba(216,155,232,0.15)] hover:-translate-y-0.5"
                }`}
              >
                <span className="text-[15px] leading-[1.6] text-text-main">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Image
          src="/logo.png"
          alt="공이공이 프로덕션"
          width={861}
          height={256}
          className="h-6 w-auto opacity-60"
        />
      </div>
    </div>
  );
}
