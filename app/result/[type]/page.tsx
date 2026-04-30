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
    <div className="flex-1 flex flex-col px-5 pt-6 pb-[max(env(safe-area-inset-bottom),48px)] fade-in">
      <div className="mb-7 flex justify-center">
        <Image
          src="/logo.png"
          alt="공이공이 프로덕션"
          width={861}
          height={256}
          className="h-6 w-auto opacity-60"
        />
      </div>

      <div id={CAPTURE_ID} className="bg-white px-5 pt-4 pb-8">
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
          <div className="gradient-bg w-[clamp(160px,48vw,200px)] aspect-square rounded-full overflow-hidden shadow-xl shadow-purple-main/25">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.gifUrl}
              alt={result.goodsName}
              loading="eager"
              crossOrigin="anonymous"
              className="gif-circular"
            />
          </div>
        </div>

        <h1 className="font-paperlogy text-[clamp(24px,7vw,28px)] font-extrabold leading-tight text-text-main text-center mb-6 text-balance">
          {result.goodsName}
        </h1>

        <p className="text-[clamp(15px,4.2vw,16px)] leading-[1.7] text-text-main text-center px-2 mb-4 whitespace-pre-line">
          {result.catchphrase}
        </p>

        <p className="text-[14px] leading-[1.7] text-text-sub text-center px-2 whitespace-pre-line">
          {result.description}
        </p>

        <div
          className="bg-white rounded-[20px] p-7 mt-8"
          style={{
            boxShadow:
              "0 8px 24px -4px rgba(123, 122, 232, 0.15), 0 4px 12px -2px rgba(216, 155, 232, 0.1)",
          }}
        >
        <p className="text-[14px] leading-[1.8] text-text-main whitespace-pre-line">
          {`5월 1일 노동절,
누군가에겐 당연한 휴일이지만 스스로 오늘을 선택한 당신이 정말 자랑스럽습니다.

이번 노동절을 맞이해서, 늘 저와 든든하게 협업해주시는 프리랜서 동료분들에게 작게나마 감사의 마음을 담은 선물을 꼭 전하고 싶었어요. 각자에게 지금 당장 제일 필요한 게 다를 텐데, 뻔한 것보다는 진짜 실용적인 걸 드리고 싶더라고요. 그래서 고민하다가, 제가 요즘 푹 빠져있는 바이브 코딩으로 직접 이 테스트를 만들어봤답니다!

프리랜서의 시간은 출퇴근 시간 같은 숫자로 측정할 수 없는 치열한 열정으로 흐른다는 걸 누구보다 잘 알기에, 이 선물이 당신의 고독한 마감 시간을 조금이나마 따뜻하게 채워주었으면 좋겠어요.

우리의 '프리랜서의 날'을 진심으로 축하합니다. 당신은 저에게 대체 불가능한 파트너이자, 멋진 동료예요. 우리 앞으로는 너무 몸 상하게 무리하지 말고, 같이 행복하게 하고 싶은 거 잔뜩 하면서 살아요! 오늘만큼은 스스로에게 '참 잘했다'고 칭찬 듬뿍 해주기 약속!`}
        </p>
        <p className="text-[14px] text-text-main mt-6 text-right">
          - 당신의 든든한 파트너, 유정 드림 -
        </p>
        <p className="text-[12px] text-text-sub mt-1.5 text-right">
          2026.05.01
        </p>
        </div>
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
