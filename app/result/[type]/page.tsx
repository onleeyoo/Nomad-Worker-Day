import { notFound } from "next/navigation";
import { results, resultTypes, type ResultType } from "@/lib/results";
import ResultActions from "./ResultActions";
import SubmissionForm from "@/components/SubmissionForm";

const CAPTURE_ID = "result-capture";

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
      <div id={CAPTURE_ID} className="bg-white px-1 pt-2 pb-4">
        <p className="text-[12px] text-text-sub text-center tracking-wide mb-5">
          프리워커를 위한{" "}
          <span className="gradient-text font-semibold">처방전</span>
        </p>

        <div className="flex justify-center mb-7">
          <div className="gradient-bg w-[200px] h-[200px] rounded-full flex items-center justify-center shadow-xl shadow-purple-main/25">
            <span
              className="text-[88px] leading-none"
              role="img"
              aria-label={result.goodsName}
            >
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

        <p className="text-[14px] leading-[1.7] text-text-sub text-center px-2 mb-6 text-balance">
          {result.description}
        </p>

        <p className="text-[11px] text-text-sub/80 text-center tracking-wide">
          공이공이 프로덕션 | 노마드워커의 날 2026
        </p>
      </div>

      <div className="mt-6">
        <ResultActions goodsName={result.goodsName} captureId={CAPTURE_ID} />
      </div>

      <hr className="my-8 border-t border-border-light" />

      <SubmissionForm
        resultType={result.type}
        resultName={result.goodsName}
      />
    </div>
  );
}
