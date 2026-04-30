"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { results, resultTypes } from "@/lib/results";

type Submission = {
  id: string;
  resultType: string;
  resultName: string;
  name: string;
  phone: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  agreed: boolean;
  createdAt: string;
};

const inputCls =
  "w-full rounded-xl border border-border-light px-4 py-3 text-[15px] bg-white outline-none transition-colors focus:border-purple-main focus:ring-2 focus:ring-purple-main/20";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function todayYmd() {
  const d = new Date();
  return `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}`;
}

function escapeCsv(value: unknown): string {
  const s = String(value ?? "");
  return `"${s.replace(/"/g, '""')}"`;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);
  const [loadError, setLoadError] = useState("");

  const fetchSubmissions = useCallback(async () => {
    setLoadError("");
    try {
      const res = await fetch("/api/admin/submissions", { cache: "no-store" });
      if (res.status === 401) {
        setAuthed(false);
        setSubmissions(null);
        return;
      }
      if (!res.ok) {
        setAuthed(true);
        setLoadError("데이터를 불러오지 못했습니다");
        return;
      }
      const data = await res.json();
      setSubmissions(data.submissions ?? []);
      setAuthed(true);
    } catch {
      setAuthed(false);
      setLoadError("네트워크 오류가 발생했습니다");
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setLoginError(data.error || "로그인에 실패했습니다");
        return;
      }
      setPassword("");
      await fetchSubmissions();
    } catch {
      setLoginError("네트워크 오류가 발생했습니다");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setSubmissions(null);
  }

  function downloadCsv() {
    if (!submissions || submissions.length === 0) return;
    const headers = [
      "신청일시",
      "결과타입",
      "굿즈명",
      "이름",
      "휴대폰",
      "우편번호",
      "기본주소",
      "상세주소",
    ];
    const rows = submissions.map((s) => [
      new Date(s.createdAt).toLocaleString("ko-KR"),
      s.resultType,
      s.resultName,
      s.name,
      s.phone,
      s.postalCode,
      s.address,
      s.addressDetail,
    ]);
    const csv =
      "﻿" +
      [headers, ...rows]
        .map((row) => row.map(escapeCsv).join(","))
        .join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nomad-worker-day-신청자-${todayYmd()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (authed === null) {
    return (
      <div className="px-5 py-12 text-center text-text-sub text-[14px]">
        불러오는 중...
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="px-5 py-12">
        <h1 className="text-[20px] font-bold mb-1">관리자 로그인</h1>
        <p className="text-[13px] text-text-sub mb-6">
          신청자 목록을 보려면 로그인이 필요합니다.
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className={inputCls}
            autoFocus
            autoComplete="current-password"
          />
          {loginError && (
            <p className="text-red-500 text-[12px] mt-2">{loginError}</p>
          )}
          <button
            type="submit"
            disabled={loginLoading || !password}
            className={`mt-4 w-full rounded-full py-3.5 text-[15px] font-semibold transition-all ${
              !loginLoading && password
                ? "gradient-bg text-white shadow-md shadow-purple-main/30 active:scale-[0.99]"
                : "bg-border-light text-text-sub cursor-not-allowed"
            }`}
          >
            {loginLoading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </div>
    );
  }

  const list = submissions ?? [];
  const total = list.length;
  const byType = resultTypes.reduce<Record<string, number>>((acc, t) => {
    acc[t] = list.filter((s) => s.resultType === t).length;
    return acc;
  }, {});

  return (
    <div className="px-5 py-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-paperlogy text-[20px] font-bold">관리자</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="text-[13px] text-text-sub hover:text-text-main transition-colors"
        >
          로그아웃
        </button>
      </div>

      {loadError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-[13px] text-red-700">
          {loadError}
        </div>
      )}

      <div className="gradient-bg rounded-2xl p-5 text-white text-center mb-5 shadow-md shadow-purple-main/25">
        <p className="text-[12px] opacity-90 mb-1">총 신청자 수</p>
        <p className="font-paperlogy text-[40px] font-extrabold leading-none">
          {total}
          <span className="text-[18px] font-medium opacity-90 ml-1">명</span>
        </p>
      </div>

      <h2 className="text-[14px] font-semibold text-text-main mb-2">
        타입별 통계
      </h2>
      <div className="grid grid-cols-2 gap-2 mb-7">
        {resultTypes.map((t) => {
          const r = results[t];
          return (
            <div
              key={t}
              className="bg-white border border-border-light rounded-xl px-3 py-2.5 flex items-center gap-2.5"
            >
              <span className="text-2xl flex-shrink-0" role="img" aria-label={r.goodsName}>
                {r.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-text-sub truncate">
                  {r.goodsName}
                </p>
                <p className="text-[16px] font-bold text-text-main leading-tight">
                  {byType[t]}
                  <span className="text-[11px] font-medium text-text-sub ml-0.5">
                    명
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[14px] font-semibold text-text-main">
          신청자 목록 ({total})
        </h2>
        <button
          type="button"
          onClick={downloadCsv}
          disabled={total === 0}
          className="text-[12px] px-3 py-1.5 rounded-full border border-border-light text-text-main hover:border-purple-main/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          CSV 다운로드
        </button>
      </div>

      <div className="bg-white border border-border-light rounded-xl overflow-x-auto">
        <table className="min-w-[760px] text-[12px]">
          <thead className="bg-gray-bg text-text-sub">
            <tr>
              <th className="px-3 py-2 text-left whitespace-nowrap font-medium">
                신청일시
              </th>
              <th className="px-3 py-2 text-left whitespace-nowrap font-medium">
                결과타입
              </th>
              <th className="px-3 py-2 text-left whitespace-nowrap font-medium">
                굿즈명
              </th>
              <th className="px-3 py-2 text-left whitespace-nowrap font-medium">
                이름
              </th>
              <th className="px-3 py-2 text-left whitespace-nowrap font-medium">
                휴대폰
              </th>
              <th className="px-3 py-2 text-left font-medium">주소</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-3 py-10 text-center text-text-sub"
                >
                  아직 신청자가 없습니다
                </td>
              </tr>
            ) : (
              list.map((s) => (
                <tr key={s.id} className="border-t border-border-light">
                  <td className="px-3 py-2 whitespace-nowrap text-text-main">
                    {new Date(s.createdAt).toLocaleString("ko-KR")}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap font-mono text-text-main">
                    {s.resultType}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-text-main">
                    {s.resultName}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-text-main">
                    {s.name}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-text-main">
                    {s.phone}
                  </td>
                  <td className="px-3 py-2 text-text-main">
                    [{s.postalCode}] {s.address} {s.addressDetail}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
