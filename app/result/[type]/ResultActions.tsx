"use client";

import { useState } from "react";

type Props = {
  goodsName: string;
  captureId: string;
};

export default function ResultActions({ goodsName, captureId }: Props) {
  const [saving, setSaving] = useState(false);

  const handleSaveImage = async () => {
    if (saving) return;
    const target = document.getElementById(captureId);
    if (!target) {
      alert(
        "이미지 영역을 찾지 못했습니다. 페이지를 새로고침 후 다시 시도해주세요.",
      );
      return;
    }

    setSaving(true);
    try {
      try {
        await document.fonts.ready;
      } catch {}
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(target, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `프리워커처방전-${goodsName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("[result image save]", e);
      alert("이미지 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSaveImage}
      disabled={saving}
      className="w-full bg-white text-text-main text-[15px] font-semibold py-3.5 rounded-full border border-border-light hover:border-purple-main/60 transition-colors disabled:opacity-60"
    >
      {saving ? "저장 중..." : "결과 이미지 저장하기"}
    </button>
  );
}
