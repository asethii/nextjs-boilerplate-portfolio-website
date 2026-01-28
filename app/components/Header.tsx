'use client';

import { useTheme } from "@/app/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import ClientOnly from "./ClientOnly";

export default function Header() {
  const { theme } = useTheme();

  return (
    <header 
      className="flex items-center justify-center px-8 py-4"
      style={{
        backgroundColor: theme === 'dark' ? '#181A20' : '#FAF8F6',
      }}
    >       
      <ClientOnly>
        <ThemeToggle />
      </ClientOnly>
    </header>
  );
}
