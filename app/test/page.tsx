"use client";

import { useState } from "react";
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
    <div className="flex-1 flex flex-col px-5 pt-2 pb-10">
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
        <h2 className="text-[24px] font-bold leading-snug text-text-main text-center mb-10 px-2 text-balance">
          {current.question}
        </h2>

        <div className="flex flex-col gap-3">
          {current.options.map((opt, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx as 0 | 1)}
                className={`text-left bg-white rounded-2xl px-5 py-5 border-2 transition-all duration-200 disabled:cursor-default ${
                  isSelected
                    ? "border-purple-main shadow-md shadow-purple-main/25 scale-[0.99]"
                    : "border-border-light hover:border-purple-main/60 hover:shadow-sm"
                }`}
              >
                <span className="text-[15px] leading-relaxed text-text-main">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
