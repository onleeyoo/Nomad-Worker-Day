import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "2026 프리랜서의 날",
  description: "남들 쉴 때 세상을 움직이는 당신에게 필요한 건?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-bg text-text-main">
        <div className="min-h-screen w-full flex justify-center bg-gray-bg">
          <div className="w-full max-w-[480px] min-h-screen bg-white shadow-sm flex flex-col">
            <AppHeader />
            <main className="flex-1 flex flex-col">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
