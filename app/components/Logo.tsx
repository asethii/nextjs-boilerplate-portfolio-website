'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

export default function Logo() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <Image
      src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
      alt="Logo"
      width={200}
      height={200}
      priority
      style={{ width: 'auto', height: 'auto' }}
    />
  );
}
