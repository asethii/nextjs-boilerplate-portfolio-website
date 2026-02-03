'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

type Slide = { type: 'video' | 'image'; src: string };

export default function ImageCarousel() {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const slides: Slide[] = [
    { type: 'video', src: '/demo-optimized.mp4' },
    { type: 'image', src: '/demo.png' },
    { type: 'image', src: '/demo2.png' },
    { type: 'image', src: '/demo3.png' },
    { type: 'image', src: '/demo4.png' },
    { type: 'image', src: '/demo5.png' },
    { type: 'image', src: '/demo6.png' },
  ];

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      resetAutoRotate();
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      resetAutoRotate();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const difference = touchStartX.current - touchEndX.current;
    const isLeftSwipe = difference > 50;
    const isRightSwipe = difference < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const resetAutoRotate = () => {
    if (autoRotateTimer.current) {
      clearInterval(autoRotateTimer.current);
    }
    startAutoRotate();
  };

  const startAutoRotate = () => {
    autoRotateTimer.current = setInterval(() => {
      // Only auto-rotate if not hovering and video is not playing
      if (!isHovering && !isVideoPlaying) {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
  };

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (autoRotateTimer.current) {
        clearInterval(autoRotateTimer.current);
      }
    };
  }, [isHovering, isVideoPlaying]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-full max-w-[640px] px-4 sm:px-0">
        <div
          className="relative overflow-hidden rounded-lg"
          style={{
            perspective: '1000px',
            backgroundColor: 'transparent',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Images Container - shows 3 images with center one active */}
          <div
            className="relative"
            style={{
              height: '260px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className="relative"
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {slides.map((slide, index) => {
                const offset = (index - currentIndex + slides.length) % slides.length;
                const isActive = index === currentIndex;

                // Calculate position: -1 is left, 0 is center (active), 1 is right
                let position = offset;
                if (position > slides.length / 2) {
                  position = position - slides.length;
                }

                const isMobile = viewportWidth < 640;
                const spacing = isMobile ? 180 : 250;
                const mobileActiveW = 320;
                const mobileInactiveW = 160;
                const mobileActiveH = 180;
                const mobileInactiveH = 120;

                const translateOffset = Math.abs(position) * spacing;

                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-500 ease-in-out"
                    style={{
                      width: isMobile
                        ? isActive
                          ? `${mobileActiveW}px`
                          : `${mobileInactiveW}px`
                        : isActive
                        ? '60%'
                        : '30%',
                      height: isMobile
                        ? isActive
                          ? `${mobileActiveH}px`
                          : `${mobileInactiveH}px`
                        : isActive
                        ? '100%'
                        : '35%',
                      left: '50%',
                      top: '50%',
                      transform: isActive
                        ? 'translateX(-50%) translateY(-50%) scale(1) translateZ(0)'
                        : position < 0
                        ? `translateX(calc(-50% - ${translateOffset}px)) translateY(-50%) scale(0.8) translateZ(0)`
                        : `translateX(calc(-50% + ${translateOffset}px)) translateY(-50%) scale(0.8) translateZ(0)`,
                      opacity: isActive ? 1 : 0.4,
                      zIndex: isActive ? 20 : 10 - Math.abs(position),
                    }}
                  >
                    {slide.type === 'video' ? (
                      <video
                        ref={isActive ? videoRef : null}
                        src={slide.src}
                        className="w-full h-full object-cover rounded-lg"
                        controls={isActive}
                        muted
                        onPlay={handleVideoPlay}
                        onEnded={handleVideoEnded}
                      />
                    ) : (
                      <Image
                        src={slide.src}
                        alt={`Carousel slide ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                        priority={index === 0}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full transition-all duration-200 hover:opacity-100"
            style={{
              opacity: 0.7,
              backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme === 'dark' ? '#D4A857' : '#292C34'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full transition-all duration-200 hover:opacity-100"
            style={{
              opacity: 0.7,
              backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme === 'dark' ? '#D4A857' : '#292C34'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
