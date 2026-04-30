import Image from "next/image";
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
    title: `${result.goodsName} | 2026 프리랜서의 날`,
    description: result.catchphrase,
  };
}

export default function ResultPage({ params }: Props) {
  const result = results[params.type as ResultType];
  if (!result) notFound();

  return (
    <div className="flex-1 flex flex-col px-5 pt-6 pb-12 fade-in">
      <div className="mb-7 flex justify-center">
        <Image
          src="/logo.png"
          alt="공이공이 프로덕션"
          width={861}
          height={256}
          className="h-6 w-auto opacity-60"
        />
      </div>

      <div id={CAPTURE_ID} className="bg-white px-1 pt-4 pb-4">
        <div className="text-center mb-9">
          <p className="font-paperlogy text-[26px] font-extrabold leading-tight text-text-main">
            2026 <span className="gradient-text">프리랜서의 날</span>
          </p>
          <p className="text-[14px] leading-relaxed text-text-sub mt-2.5">
            남들 쉴 때 세상을 움직이는 당신에게 필요한 건?
          </p>
          <p className="text-[12px] text-gray-400 mt-4">
            by. 공이공이 프로덕션 유정
          </p>
        </div>

        <div className="flex justify-center mb-8">
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

        <h1 className="font-paperlogy text-[28px] font-extrabold leading-tight text-text-main text-center mb-6 text-balance">
          {result.goodsName}
        </h1>

        <p className="text-[16px] leading-[1.7] text-text-main text-center px-2 mb-4 text-balance">
          {result.catchphrase}
        </p>

        <p className="text-[14px] leading-[1.7] text-text-sub text-center px-2 text-balance">
          {result.description}
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
