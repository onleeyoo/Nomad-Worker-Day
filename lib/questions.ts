export type Axis = "BM" | "FE" | "DC" | "INTRO";
export type ScoreKey = "B" | "M" | "F" | "E" | "D" | "C";
export type Score = Partial<Record<ScoreKey, number>>;

export type Question = {
  id: number;
  axis: Axis;
  question: string;
  options: [
    { text: string; score: Score },
    { text: string; score: Score }
  ];
};

export const questions: Question[] = [
  // ===== 인트로 (점수 영향 없음) =====
  {
    id: 0,
    axis: "INTRO",
    question: "노동절에도 처리할 업무가 남아 있나요?",
    options: [
      { text: "노동절에도 쉴 수 없는 난 프리랜서ㅠㅠ", score: {} },
      { text: "오늘만큼은 나를 위한 힐링 타임!", score: {} },
    ],
  },

  // ===== 축 1. 결핍 영역: 신체(B) ↔ 정신(M) =====
  {
    id: 1,
    axis: "BM",
    question: "지금 당장 나를 가장 힘들게 하는 증상은?",
    options: [
      { text: "뻐근한 목과 어깨, 무거운 눈꺼풀, 혹은 허기짐", score: { B: 1 } },
      {
        text: "텅 빈 머릿속, 바닥난 의욕, 혹은 사람에게 기 빨린 느낌",
        score: { M: 1 },
      },
    ],
  },
  {
    id: 2,
    axis: "BM",
    question: "퇴근 후 집에 돌아온 나의 모습과 가장 가까운 것은?",
    options: [
      {
        text: "씻을 힘도 없어서 일단 소파나 침대에 쓰러져 눕는다",
        score: { B: 1 },
      },
      {
        text: "몸은 씻고 나왔는데, 멍하니 스마트폰만 넘기며 영혼을 달랜다",
        score: { M: 1 },
      },
    ],
  },
  {
    id: 3,
    axis: "BM",
    question: "점심시간 1시간이 주어졌을 때, 더 끌리는 휴식은?",
    options: [
      {
        text: "밥 먹는 시간도 아깝다. 불 끄고 책상에 엎드려 잔다",
        score: { B: 1 },
      },
      {
        text: "맛있는 걸 먹거나, 동료들과 수다를 떨며 스트레스를 푼다",
        score: { M: 1 },
      },
    ],
  },
  {
    id: 4,
    axis: "BM",
    question: "업무 중 나도 모르게 가장 자주 튀어나오는 혼잣말은?",
    options: [
      { text: '"아 피곤해", "눈 아파", "배고파"', score: { B: 1 } },
      { text: '"집이지만 집에 가고 싶다"', score: { M: 1 } },
    ],
  },
  {
    id: 5,
    axis: "BM",
    question: "현재 나에게 딱 하나만 주어진다면?",
    options: [
      { text: "알람 없이 12시간 동안 죽은 듯이 푹 잘 수 있는 시간", score: { B: 1 } },
      {
        text: "아무 생각 없이 뇌를 비우거나, 내가 좋아하는 것만 볼 수 있는 시간",
        score: { M: 1 },
      },
    ],
  },

  // ===== 축 2. 회복 방식: 즉각 충전(F) ↔ 환경 전환(E) =====
  {
    id: 6,
    axis: "FE",
    question: "업무 중 스트레스가 극에 달했을 때, 가장 먼저 찾는 것은?",
    options: [
      { text: "에너지 충전을 위한 커피, 초콜릿, 혹은 젤리", score: { F: 1 } },
      {
        text: "일단 자리에서 일어나 바깥 공기 쐬기 또는 화장실로 피신",
        score: { E: 1 },
      },
    ],
  },
  {
    id: 7,
    axis: "FE",
    question: "기분 전환을 위해 내 책상 위에 하나를 추가한다면?",
    options: [
      { text: "언제든 꺼내 먹을 수 있는 간식 창고", score: { F: 1 } },
      { text: "기분 좋은 향이 나는 디퓨저나 작고 귀여운 식물", score: { E: 1 } },
    ],
  },
  {
    id: 8,
    axis: "FE",
    question: "꿀 같은 주말, 내가 생각하는 완벽한 힐링 방법은?",
    options: [
      {
        text: "집 밖은 위험해. 배달 음식 시켜 먹고 뒹굴거리는 게 최고!",
        score: { F: 1 },
      },
      {
        text: "예쁜 카페를 가거나 근교로 드라이브를 가며 리프레시!",
        score: { E: 1 },
      },
    ],
  },
  {
    id: 9,
    axis: "FE",
    question: "집중력이 뚝 떨어졌을 때, 나의 해결책은?",
    options: [
      {
        text: "시원한 음료를 벌컥벌컥 마시거나 껌을 씹으며 뇌를 깨운다",
        score: { F: 1 },
      },
      {
        text: "창문을 열어 환기를 하거나 자리를 정돈하며 분위기를 바꾼다",
        score: { E: 1 },
      },
    ],
  },
  {
    id: 10,
    axis: "FE",
    question: "나에게 더 확실한 보상처럼 느껴지는 것은?",
    options: [
      { text: "퇴근 후 먹는 기름진 음식과 시원한 맥주 한 캔", score: { F: 1 } },
      {
        text: "좋아하는 음악을 크게 틀어놓고 푹신한 침구에 파묻히기",
        score: { E: 1 },
      },
    ],
  },

  // ===== 축 3. 작업 강도: 마감 압박(D) ↔ 만성 피로(C) =====
  {
    id: 11,
    axis: "DC",
    question: "당신의 현재 업무 상태를 날씨로 표현한다면?",
    options: [
      {
        text: "우박과 벼락이 떨어지는 폭풍우 (당장 막아야 할 불이 떨어짐)",
        score: { D: 1 },
      },
      {
        text: "며칠째 햇빛을 못 본 우중충한 장마철 (매일매일 지치고 무기력함)",
        score: { C: 1 },
      },
    ],
  },
  {
    id: 12,
    axis: "DC",
    question: "아침에 눈을 떴을 때 가장 먼저 드는 생각은?",
    options: [
      { text: '"미친, 오늘 안으로 그거 다 끝낼 수 있을까?"', score: { D: 1 } },
      { text: '"아... 하기 싫다"', score: { C: 1 } },
    ],
  },
  {
    id: 13,
    axis: "DC",
    question: "지금 당장 당신에게 필요한 초능력이 있다면?",
    options: [
      {
        text: "마감을 맞추기 위해 시간을 멈추거나 내 몸을 2개로 만드는 능력",
        score: { D: 1 },
      },
      {
        text: "이 지루한 일상을 버텨낼 수 있는 지치지 않는 무한 체력",
        score: { C: 1 },
      },
    ],
  },
  {
    id: 14,
    axis: "DC",
    question: "일하면서 심박수가 가장 빠르게 올라가는 순간은?",
    options: [
      { text: "시계를 봤는데 예상보다 시간이 훅훅 지나가 있을 때", score: { D: 1 } },
      {
        text: "딱히 없다. 항상 일정한 속도로 기력이 닳고 있을 뿐이다",
        score: { C: 1 },
      },
    ],
  },
  {
    id: 15,
    axis: "DC",
    question: "이 일이 끝나고 난 뒤 예상되는 나의 모습은?",
    options: [
      { text: "하얗게 불태우고 장렬하게 전사하여 뻗어버림", score: { D: 1 } },
      {
        text: "늘 그래왔듯 영혼 없이 주말 예능을 보며 소소하게 멍때림",
        score: { C: 1 },
      },
    ],
  },
];
