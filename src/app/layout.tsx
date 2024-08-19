// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Play Hub",
  description: "Experience cutting-edge AI-powered web games",
};

const PixelIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="4" height="4" />
    <rect x="8" y="8" width="4" height="4" />
    <rect x="12" y="12" width="4" height="4" />
    <rect x="16" y="16" width="4" height="4" />
  </svg>
);

const PixelBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <PixelIcon
        key={i}
        className={`absolute text-indigo-200 opacity-20 transform ${
          Math.random() > 0.5 ? 'rotate-45' : '-rotate-45'
        }`}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 24 + 12}px`,
        }}
      />
    ))}
  </div>
);

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className} bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-800 min-h-screen flex flex-col`}>
    <PixelBackground />
    <Header />
    <main className="container mx-auto px-4 py-8 relative z-10 flex-grow">{children}</main>
    <Footer />
    </body>
    </html>
  );
}