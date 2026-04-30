import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple-main": "#7B7AE8",
        "pink-main": "#D89BE8",
        "gray-bg": "#F5F5F7",
        "text-main": "#1A1A1A",
        "text-sub": "#6B7280",
        "border-light": "#E5E7EB",
      },
      fontFamily: {
        pretendard: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "sans-serif",
        ],
        paperlogy: ["Paperlogy", "Pretendard Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
