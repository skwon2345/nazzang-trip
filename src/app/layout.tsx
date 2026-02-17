import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "나트랑 여행 계획 | Nha Trang Trip 2025",
  description: "3월 3일~7일 나트랑 아나만다라 캄란 커플 여행 계획",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✈️</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
