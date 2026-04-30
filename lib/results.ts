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
    goodsName: "배달 음식",
    emoji: "🛵",
    catchphrase:
      "마감에 쫓겨 밥 차릴 시간조차 없을 때,\n터치 몇 번으로 책상 앞까지 구호물자를 배달해 줄\n든든한 생존 치트키!",
    description:
      "마감 시계는 계속 돌아가는데, 끼니는 자꾸 뒷전으로 밀리고 있죠.\n마감과 타협하지 말고, 메뉴와 타협하세요.\n터치 몇 번이면 든든한 한 끼가 책상 앞까지 도착합니다.",
    axes: { deficiency: "신체", recovery: "즉각 충전", intensity: "마감 압박" },
  },
  BFC: {
    type: "BFC",
    goodsName: "비타민 젤리",
    emoji: "🍬",
    catchphrase:
      "체력이 바닥난 오후 3시,\n쫀득한 식감과 함께 텐션을 수직 상승시켜 줄\n부스터 아이템.",
    description:
      "어제도 피곤했고, 오늘도 피곤하고, 내일도 피곤할 예정인 당신.\n거창한 영양제는 부담스럽고, 손에 쥐고 입에 털어 넣을\n즉효 부스터가 절실해요.\n쫀득한 한 알이면 떨어진 당과 텐션이 동시에 살아납니다.",
    axes: { deficiency: "신체", recovery: "즉각 충전", intensity: "만성 피로" },
  },
  BED: {
    type: "BED",
    goodsName: "탁상용 미니 선풍기",
    emoji: "🪭",
    catchphrase:
      "과부하 걸린 노트북의 열기도,\n마감 직전 폭발하기 일보 직전인 내 머리도\n차분하게 식혀줄 시원한 오아시스!",
    description:
      "노트북 팬보다 더 시끄럽게 돌아가고 있는 당신의 머리.\n마감이 코앞일수록 얼굴부터 달아오르죠.\n자리에서 일어날 시간조차 없다면,\n시원한 바람 한 줄기가 가장 빠른 진정제입니다.",
    axes: { deficiency: "신체", recovery: "환경 전환", intensity: "마감 압박" },
  },
  BEC: {
    type: "BEC",
    goodsName: "손목보호 마우스패드",
    emoji: "🖱️",
    catchphrase:
      "수만 번의 클릭과 드래그를 견뎌낸\n당신의 소중한 손목을 포근하게 안아줄\n폭신한 구름.",
    description:
      "매일 같은 자세, 같은 클릭, 어느새 당연해진 손목 저림.\n사실 그건 당연한 게 아니에요.\n잠깐 스쳐가는 영양제보다,\n매일 손이 닿는 작업 환경을 바꾸는 게 가장 오래 가는 회복입니다.",
    axes: { deficiency: "신체", recovery: "환경 전환", intensity: "만성 피로" },
  },
  MFD: {
    type: "MFD",
    goodsName: "액막이 명태 인형",
    emoji: "🐟",
    catchphrase:
      "나쁜 클라이언트와 에러는 꿀꺽 삼키고,\n칼퇴와 칼입금을 불러오는 든든한 수호자!",
    description:
      "메일함 열기가 두렵고,\n클라이언트 알림 하나에 한숨이 푹 나오는 당신.\n이쯤 되면 합리적 사고로는 답이 안 나옵니다.\n책상 위 든든한 부적 하나 두고, 오늘만큼은 운에 기대보세요.",
    axes: { deficiency: "정신", recovery: "즉각 충전", intensity: "마감 압박" },
  },
  MFC: {
    type: "MFC",
    goodsName: "스페셜티 드립백",
    emoji: "☕",
    catchphrase:
      "카페인 수혈이 시급한 순간,\n작업실을 순식간에 분위기 있는 로스터리로 만들어줄\n각성 포션.",
    description:
      "영혼은 이미 출근하지 않았는데, 몸만 자리를 지키고 있는 당신.\n향부터 다른 한 잔이 작업실 공기를 통째로 바꿔줍니다.\n매일의 루틴을 잠깐의 의식으로 만들어,\n식어버린 의욕을 향으로 다시 데워보세요.",
    axes: { deficiency: "정신", recovery: "즉각 충전", intensity: "만성 피로" },
  },
  MED: {
    type: "MED",
    goodsName: "릴랙싱 아로마 오일",
    emoji: "🕯️",
    catchphrase: "복잡한 머릿속을 숲속처럼 비워주는\n마법의 향기.",
    description:
      "마감 압박에 머리가 곧 터질 것 같은 순간,\n책상에서 한 발짝도 뗄 수 없다면 향부터 들이마셔 보세요.\n한 모금의 향이 책상 위로 작은 숲을 부르고,\n그제서야 막힌 영감이 다시 흘러갈 길을 찾습니다.",
    axes: { deficiency: "정신", recovery: "환경 전환", intensity: "마감 압박" },
  },
  MEC: {
    type: "MEC",
    goodsName: "영화 관람",
    emoji: "🎬",
    catchphrase:
      "답답한 모니터는 이제 그만!\n압도적인 대형 스크린으로 눈과 마음을 정화하고\n'진짜 영감'을 채울 시간.",
    description:
      "인풋이 바닥난 지 한참인 당신에게 지금 필요한 건\n거창한 휴가가 아니에요.\n두 시간만이라도 모니터에서 눈을 떼고, 큰 스크린 앞에 앉아보세요.\n그 잠깐의 환기가 다음 한 주를 버틸 진짜 영감이 됩니다.",
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
