import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://nomad-worker-day.vercel.app"),
  title: "2026 프리랜서의 날",
  description: "남들 쉴 때 세상을 움직이는 당신에게 필요한 건?",
  openGraph: {
    title: "2026 프리랜서의 날",
    description: "남들 쉴 때 세상을 움직이는 당신에게 필요한 건?",
    url: "/",
    siteName: "2026 프리랜서의 날",
    images: [
      {
        url: "/og-image.png",
        width: 976,
        height: 974,
        alt: "2026 프리랜서의 날",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 프리랜서의 날",
    description: "남들 쉴 때 세상을 움직이는 당신에게 필요한 건?",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-bg text-text-main">
        <div className="min-h-dvh w-full flex justify-center bg-gray-bg">
          <div className="w-full max-w-[480px] min-h-dvh bg-white shadow-sm flex flex-col">
            <AppHeader />
            <main className="flex-1 flex flex-col">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
