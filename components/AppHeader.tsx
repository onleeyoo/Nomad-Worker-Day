"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AppHeader() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/test") return null;
  return (
    <header className="px-5 pt-5 pb-2">
      <Image
        src="/logo.png"
        alt="공이공이 프로덕션"
        width={861}
        height={256}
        priority
        className="h-7 w-auto"
      />
    </header>
  );
}
