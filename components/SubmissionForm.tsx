"use client";

import { useEffect, useState, type FormEvent } from "react";
import Script from "next/script";

type Props = {
  resultType: string;
  resultName: string;
};

type DaumData = {
  zonecode: string;
  roadAddress?: string;
  jibunAddress?: string;
  address?: string;
};

type DaumPostcodeOptions = {
  oncomplete: (data: DaumData) => void;
};

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: DaumPostcodeOptions) => { open: () => void };
    };
  }
}

const NAME_RE = /^[가-힣]{2,10}$/;
const PHONE_RE = /^010-\d{4}-\d{4}$/;
const ZIP_RE = /^\d{5}$/;

const inputCls =
  "w-full rounded-xl border border-border-light px-4 py-3 text-[15px] bg-white outline-none transition-colors focus:border-purple-main focus:ring-2 focus:ring-purple-main/20 placeholder:text-text-sub/70 disabled:opacity-60 read-only:bg-gray-bg/50";

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function storageKey(resultType: string) {
  return `submitted-${resultType}`;
}

export default function SubmissionForm({ resultType, resultName }: Props) {
  const [submitted, setSubmitted] = useState<boolean | null>(null);
  const [postcodeReady, setPostcodeReady] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = window.localStorage.getItem(storageKey(resultType));
    setSubmitted(flag === "true");
  }, [resultType]);

  const errors = {
    name: NAME_RE.test(name) ? "" : "한글 이름 2~10자로 입력해주세요",
    phone: PHONE_RE.test(phone) ? "" : "010-0000-0000 형식으로 입력해주세요",
    postalCode: ZIP_RE.test(postalCode) ? "" : "주소 검색을 통해 우편번호를 입력해주세요",
    address: address.trim() ? "" : "주소를 입력해주세요",
    addressDetail: addressDetail.trim() ? "" : "상세주소를 입력해주세요",
    agreed: agreed ? "" : "개인정보 수집·이용에 동의해주세요",
  };
  const isValid = Object.values(errors).every((m) => !m);

  const showError = (key: keyof typeof errors) =>
    touched[key] && errors[key] ? errors[key] : "";

  const openPostcode = () => {
    if (!window.daum?.Postcode) {
      alert("주소 검색을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    new window.daum.Postcode({
      oncomplete: (data) => {
        setPostalCode(data.zonecode);
        setAddress(data.roadAddress || data.jibunAddress || data.address || "");
        setTouched((t) => ({ ...t, postalCode: true, address: true }));
      },
    }).open();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({
      name: true,
      phone: true,
      postalCode: true,
      address: true,
      addressDetail: true,
      agreed: true,
    });
    if (!isValid || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resultType,
          resultName,
          name,
          phone,
          postalCode,
          address,
          addressDetail,
          agreed,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || "신청에 실패했습니다");
      }
      window.localStorage.setItem(storageKey(resultType), "true");
      setSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "신청에 실패했습니다");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted === null) {
    return (
      <div className="bg-white rounded-2xl border border-border-light p-6 text-center text-text-sub text-[14px]">
        불러오는 중...
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-border-light p-6 text-center">
        <div className="text-3xl mb-2" role="img" aria-label="완료">
          🎉
        </div>
        <p className="text-[16px] font-semibold text-text-main mb-1">
          이미 신청하셨어요
        </p>
        <p className="text-[13px] text-text-sub leading-relaxed">
          소중한 응답 감사합니다.
          <br />
          굿즈는 추후 순차적으로 발송될 예정이에요.
        </p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
        onLoad={() => setPostcodeReady(true)}
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-border-light p-5"
        noValidate
      >
        <h3 className="text-[16px] font-semibold text-text-main mb-1">
          선물 받으실 곳을 입력해 주세요
        </h3>
        <p className="text-[12px] text-text-sub mb-5 leading-relaxed">
          2026년 감사한 분들께 드리는 약소한 선물입니다
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-text-main mb-1.5">
              이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              className={inputCls}
              placeholder="홍길동"
              maxLength={10}
            />
            {showError("name") && (
              <p className="text-[12px] text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-[13px] font-medium text-text-main mb-1.5">
              휴대폰번호
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              className={inputCls}
              placeholder="010-0000-0000"
              maxLength={13}
            />
            {showError("phone") && (
              <p className="text-[12px] text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-[13px] font-medium text-text-main mb-1.5">
              주소
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={postalCode}
                readOnly
                placeholder="우편번호"
                className={`${inputCls} flex-1`}
              />
              <button
                type="button"
                onClick={openPostcode}
                disabled={!postcodeReady}
                className="px-4 rounded-xl border border-border-light text-[14px] font-medium text-text-main bg-white hover:border-purple-main/60 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                주소 검색
              </button>
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, address: true }))}
              placeholder="기본주소"
              className={`${inputCls} mt-2`}
            />
            {showError("postalCode") && (
              <p className="text-[12px] text-red-500 mt-1">{errors.postalCode}</p>
            )}
            {!showError("postalCode") && showError("address") && (
              <p className="text-[12px] text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block text-[13px] font-medium text-text-main mb-1.5">
              상세주소
            </label>
            <input
              type="text"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, addressDetail: true }))}
              className={inputCls}
              placeholder="상세주소를 입력해주세요"
            />
            {showError("addressDetail") && (
              <p className="text-[12px] text-red-500 mt-1">
                {errors.addressDetail}
              </p>
            )}
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  setTouched((t) => ({ ...t, agreed: true }));
                }}
                className="mt-1 w-4 h-4 accent-purple-main flex-shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[14px] font-medium text-text-main">
                  개인정보 수집·이용 동의 (필수)
                </span>
                <p className="text-[11px] text-text-sub mt-1 leading-relaxed">
                  수집 항목: 이름, 휴대폰번호, 주소 / 이용 목적: 굿즈 발송 /
                  보유 기간: 발송 완료 후 3개월
                </p>
              </div>
            </label>
            {showError("agreed") && (
              <p className="text-[12px] text-red-500 mt-1">{errors.agreed}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || submitting}
          className={`mt-6 w-full rounded-full py-3.5 text-[16px] font-semibold transition-all ${
            isValid && !submitting
              ? "gradient-bg text-white shadow-md shadow-purple-main/30 active:scale-[0.99]"
              : "bg-border-light text-text-sub cursor-not-allowed"
          }`}
        >
          {submitting ? "신청 중..." : "신청하기"}
        </button>
      </form>
    </>
  );
}
