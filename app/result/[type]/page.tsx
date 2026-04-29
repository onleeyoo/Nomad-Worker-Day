import { notFound } from "next/navigation";
import { results, resultTypes, type ResultType } from "@/lib/results";
import ResultActions from "./ResultActions";

export function generateStaticParams() {
  return resultTypes.map((type) => ({ type }));
}

export const dynamicParams = false;

type Props = { params: { type: string } };

export function generateMetadata({ params }: Props) {
  const result = results[params.type as ResultType];
  if (!result) return {};
  return {
    title: `${result.goodsName} | 프리워커를 위한 처방전`,
    description: result.catchphrase,
  };
}

export default function ResultPage({ params }: Props) {
  const result = results[params.type as ResultType];
  if (!result) notFound();

  const chips = [
    result.axes.deficiency,
    result.axes.recovery,
    result.axes.intensity,
  ];

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-12 fade-in">
      <p className="text-[12px] text-text-sub text-center tracking-wide mb-5">
        프리워커를 위한 <span className="gradient-text font-semibold">처방전</span>
      </p>

      <div className="flex justify-center mb-7">
        <div className="gradient-bg w-[200px] h-[200px] rounded-full flex items-center justify-center shadow-xl shadow-purple-main/25">
          <span className="text-[88px] leading-none" role="img" aria-label={result.goodsName}>
            {result.emoji}
          </span>
        </div>
      </div>

      <h1 className="text-[28px] font-bold leading-tight text-text-main text-center mb-4 text-balance">
        {result.goodsName}
      </h1>

      <div className="flex flex-wrap justify-center gap-1.5 mb-6">
        {chips.map((chip) => (
          <span
            key={chip}
            className="px-3 py-1 rounded-full bg-gray-bg text-[12px] font-medium text-text-sub"
          >
            {chip}
          </span>
        ))}
      </div>

      <p className="text-[16px] leading-[1.7] text-text-main text-center px-2 mb-4 text-balance">
        {result.catchphrase}
      </p>

      <p className="text-[14px] leading-[1.7] text-text-sub text-center px-2 mb-9 text-balance">
        {result.description}
      </p>

      <ResultActions />

      <hr className="my-8 border-t border-border-light" />

      <div className="bg-white rounded-2xl border border-border-light p-5 text-center">
        <p className="text-[15px] font-semibold text-text-main mb-1">
          🎁 선물 신청 폼은 다음 단계에서 추가됩니다
        </p>
        <p className="text-[13px] text-text-sub leading-relaxed">
          결과에 맞는 굿즈를 실제로 받아볼 수 있는 신청 폼이
          <br />
          곧 이 자리에 열립니다.
        </p>
      </div>
    </div>
  );
}
