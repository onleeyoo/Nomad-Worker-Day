export type ResultType =
  | "BFD"
  | "BFC"
  | "BED"
  | "BEC"
  | "MFD"
  | "MFC"
  | "MED"
  | "MEC";

export type Result = {
  type: ResultType;
  goodsName: string;
  emoji: string;
  catchphrase: string;
  description: string;
  axes: {
    deficiency: "신체" | "정신";
    recovery: "즉각 충전" | "환경 전환";
    intensity: "마감 압박" | "만성 피로";
  };
};

export const results: Record<ResultType, Result> = {
  BFD: {
    type: "BFD",
    goodsName: "프리미엄 소고기 육포",
    emoji: "🥩",
    catchphrase:
      "마감에 쫓겨 밥 먹을 시간도 없을 때, 턱관절의 분노를 단백질 충전으로 승화시켜 줄 고급진 생존 간식.",
    description:
      "쉴 새 없이 굴러가는 마감의 챗바퀴, 끼니는 맥락 없이 거르고 있죠. 빠르게 단백질이라도 욱여넣으세요. 당신의 턱관절과 멘탈은 지금 SOS 신호 중입니다.",
    axes: { deficiency: "신체", recovery: "즉각 충전", intensity: "마감 압박" },
  },
  BFC: {
    type: "BFC",
    goodsName: "고함량 비타민 젤리",
    emoji: "🍬",
    catchphrase:
      "체력이 바닥난 오후 3시, 쫀득한 식감과 함께 텐션을 수직 상승시켜 줄 부스터 아이템.",
    description:
      "어제도 피곤했고, 오늘도 피곤하고, 내일도 피곤할 예정인 당신. 거창한 영양제는 부담스럽고, 손에 쥐고 입에 털어 넣을 즉효 부스터가 절실해요. 쫀득한 한 알이면 떨어진 당과 텐션이 동시에 살아납니다.",
    axes: { deficiency: "신체", recovery: "즉각 충전", intensity: "만성 피로" },
  },
  BED: {
    type: "BED",
    goodsName: "탁상용 미니 선풍기",
    emoji: "🌬️",
    catchphrase:
      "과부하 걸린 노트북의 열기도, 마감 직전 폭발하기 일보 직전인 내 머리도 차분하게 식혀줄 시원한 오아시스!",
    description:
      "노트북 팬보다 더 시끄럽게 돌아가고 있는 당신의 머리. 마감이 코앞일수록 얼굴부터 달아오르죠. 자리에서 일어날 시간조차 없다면, 시원한 바람 한 줄기가 가장 빠른 진정제입니다.",
    axes: { deficiency: "신체", recovery: "환경 전환", intensity: "마감 압박" },
  },
  BEC: {
    type: "BEC",
    goodsName: "손목보호 마우스패드",
    emoji: "🖱️",
    catchphrase:
      "수만 번의 클릭과 드래그를 견뎌낸 당신의 소중한 손목을 포근하게 안아줄 폭신한 구름.",
    description:
      "매일 같은 자세, 같은 클릭, 어느새 당연해진 손목 저림. 사실 그건 당연한 게 아니에요. 잠깐 스쳐가는 영양제보다, 매일 손이 닿는 작업 환경을 바꾸는 게 가장 오래 가는 회복입니다.",
    axes: { deficiency: "신체", recovery: "환경 전환", intensity: "만성 피로" },
  },
  MFD: {
    type: "MFD",
    goodsName: "액막이 명태 인형",
    emoji: "🐟",
    catchphrase:
      "나쁜 클라이언트와 에러는 꿀꺽 삼키고, 칼퇴와 칼입금을 불러오는 든든한 수호자!",
    description:
      "메일함 열기가 두렵고, 회의 알림 하나에 한숨이 푹 나오는 당신. 이쯤 되면 합리적 사고로는 답이 안 나옵니다. 책상 위 든든한 부적 하나 두고, 오늘만큼은 운에 기대보세요.",
    axes: { deficiency: "정신", recovery: "즉각 충전", intensity: "마감 압박" },
  },
  MFC: {
    type: "MFC",
    goodsName: "스페셜티 드립백",
    emoji: "☕",
    catchphrase:
      "카페인 수혈이 시급한 순간, 작업실을 순식간에 분위기 있는 로스터리로 만들어줄 각성 포션.",
    description:
      "영혼은 이미 출근하지 않았는데, 몸만 자리를 지키고 있는 당신. 향부터 다른 한 잔이 작업실 공기를 통째로 바꿔줍니다. 매일의 루틴을 잠깐의 의식으로 만들어, 식어버린 의욕을 향으로 다시 데워보세요.",
    axes: { deficiency: "정신", recovery: "즉각 충전", intensity: "만성 피로" },
  },
  MED: {
    type: "MED",
    goodsName: "무드 체인저 룸스프레이",
    emoji: "🌿",
    catchphrase:
      "영감이 도무지 떠오르지 않을 때, 칙- 한 번으로 방 안의 공기와 기분까지 환기시켜 줄 리프레시 버튼.",
    description:
      "마감은 다가오는데 머릿속만 텅 비어버린 그 답답한 순간. 자리에서 일어날 여유조차 없다면, 공기부터 바꿔보세요. 칙- 한 번이면 분위기가 바뀌고, 그제서야 새 아이디어가 끼어들 틈이 생깁니다.",
    axes: { deficiency: "정신", recovery: "환경 전환", intensity: "마감 압박" },
  },
  MEC: {
    type: "MEC",
    goodsName: "CGV 영화 티켓 2매",
    emoji: "🎬",
    catchphrase:
      "답답한 모니터는 이제 그만! 압도적인 대형 스크린으로 눈과 마음을 정화하고 '진짜 영감'을 채울 시간.",
    description:
      "인풋이 바닥난 지 한참인 당신에게 지금 필요한 건 거창한 휴가가 아니에요. 두 시간만이라도 모니터에서 눈을 떼고, 큰 스크린 앞에 앉아보세요. 그 잠깐의 환기가 다음 한 주를 버틸 진짜 영감이 됩니다.",
    axes: { deficiency: "정신", recovery: "환경 전환", intensity: "만성 피로" },
  },
};

export const resultTypes: ResultType[] = [
  "BFD",
  "BFC",
  "BED",
  "BEC",
  "MFD",
  "MFC",
  "MED",
  "MEC",
];
