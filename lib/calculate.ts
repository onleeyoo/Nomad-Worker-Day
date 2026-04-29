import { Question } from "./questions";
import { ResultType } from "./results";

export type Answer = { questionId: number; selectedIndex: 0 | 1 };

export function calculateResult(
  answers: Answer[],
  questions: Question[],
): ResultType {
  const scores = { B: 0, M: 0, F: 0, E: 0, D: 0, C: 0 };

  answers.forEach((a) => {
    const q = questions.find((q) => q.id === a.questionId);
    if (!q) return;
    const opt = q.options[a.selectedIndex];
    Object.entries(opt.score).forEach(([key, value]) => {
      scores[key as keyof typeof scores] += value || 0;
    });
  });

  const axis1 = scores.B >= scores.M ? "B" : "M";
  const axis2 = scores.F >= scores.E ? "F" : "E";
  const axis3 = scores.D >= scores.C ? "D" : "C";

  return `${axis1}${axis2}${axis3}` as ResultType;
}
