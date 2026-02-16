'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { MoonIcon, SunIcon } from './Icons';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-2 rounded-lg w-10 h-10" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative z-50 p-2 rounded-lg transition-colors"
      style={{
        backgroundColor: theme === 'dark' ? '#292C34' : '#F0EDE7',
        color: theme === 'dark' ? '#D4A857' : '#D4A857',
      }}
      aria-label="Toggle dark mode"
      title={`Current theme: ${theme}`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
