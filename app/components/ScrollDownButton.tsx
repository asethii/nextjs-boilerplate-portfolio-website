'use client';

import { useRef } from 'react';


type ScrollDownButtonProps = {
  contentRef: React.RefObject<HTMLDivElement | null>;
  onClick?: () => void;
};

export default function ScrollDownButton({ contentRef, onClick }: ScrollDownButtonProps) {
  const handleClick = () => {
    if (onClick) onClick();
    if (contentRef?.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 p-2"
      aria-label="Scroll down"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#D4A857"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-bounce"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  );
}
