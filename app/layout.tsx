import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import "./globals.css";

const merriweather = Merriweather({
  weight: ["400", "700"],
  variable: "--font-merriweather",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
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
        className={`${inter.variable} ${merriweather.variable} antialiased`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
