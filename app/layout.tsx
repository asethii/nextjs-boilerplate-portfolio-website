import type { Metadata } from "next";
import { Montserrat, Aboreto, Fraunces } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["400"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const aboreto = Aboreto({
  weight: ["400"],
  variable: "--font-aboreto",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  weight: ["700"],
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UI-Dev: Ash",
  description: "Senior Web Engineer - Building high-impact digital experiences",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${aboreto.variable} ${fraunces.variable} antialiased`}
        style={{ fontFamily: 'var(--font-montserrat)' }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
