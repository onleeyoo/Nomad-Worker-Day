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
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: {
      url: "/icons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    shortcut: "/favicon.ico",
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
