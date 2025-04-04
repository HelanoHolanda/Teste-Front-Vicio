import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StudyProvider } from "@/context/estudosContext";
import { CronometroProvider } from "@/context/cronometroContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full ">
      <CronometroProvider>
        <StudyProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full bg-[url(/novo-bg.png)]`}
          >
            {children}
          </body>
        </StudyProvider>
      </CronometroProvider>
    </html>
  );
}
