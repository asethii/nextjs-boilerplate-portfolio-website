'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';


type Slide = { type: 'video' | 'image'; src: string; url?: string };

export default function ImageCarousel() {

  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null);
  const interactionTimer = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Project card data (should match slides)
  const projectCards = [
    {
      title: 'Marketing Website build with Craft Content Management System',
      techs: ['Cloud Migration', 'PHP', 'HTML', 'JavaScript', 'Craft CMS', 'Content Strategy', 'SEO'],
      description: 'Marketing website for a smart home solutions provider, built using the Craft Content Management System (CMS) to enable easy content updates and management. This project was also migrated to the cloud to improve scalability and performance, ensuring a seamless experience for users exploring smart home products and solutions.'
    },
    {
      title: 'Mobile App Smart Home Demo',
      techs: ['HTML', 'CSS', 'JavaScript', 'Adobe Animate', 'Adobe After Effects'],
      description: 'Interactive mobile app demo showcasing smart home features. Built with HTML/CSS/JS and animated using Adobe Animate and After Effects to create engaging transitions and interactions.'
    },
    {
      title: 'Smart Home Web Demo',
      techs: ['HTML', 'CSS', 'JavaScript', 'Adobe Animate', 'Adobe After Effects'],
      description: 'Interactive web demo showcasing smart home features. Built with HTML/CSS/JS and animated using Adobe Animate and After Effects to engage users.'
    },
    {
      title: 'Lead Generation Wizard',
      techs: ['C#/.Net', 'SQL', 'Custom CMS Build', 'PhotoShop/Illustrator', 'UX Design'],
      description: 'Lead generation wizard built for a smart home solutions provider. Developed using C#/.Net with a SQL database backend to capture and manage leads. The wizard features a user-friendly interface designed in PhotoShop/Illustrator, guiding users through a series of questions to recommend the best smart home solutions based on their needs and preferences. The leads are distributed to participating partners and are managed in an internal CRM.'
    },
    {
      title: 'Partner Branded Website Templates',
      techs: ['C#/.Net', 'SQL', 'Custom CMS Build','Dynamic Branding', 'PhotoShop/Illustrator', 'UX Design'],
      description: 'Partner branded website templates developed for a smart home solutions provider. These templates are built using C#/.Net and SQL, featuring dynamic branding capabilities to allow partners to customize the look and feel according to their brand guidelines. The design and user experience were crafted using PhotoShop and Illustrator to ensure a seamless and engaging interface.'
    },
    {
      title: 'Embeddable Smart Home Demo with Custom Branding',
      techs: ['HTML', 'CSS', 'JavaScript', 'Cloud Migration'],
      description: 'Interactive web demo showcasing smart home features. Built with HTML/CSS/JS and animated using Adobe Animate and After Effects to engage users. Javascript was used to allow partners to customize the demo with their own branding color by passing a hex code in the URL. For example, adding ?color=ff0000 would change the accent color to red.'
    },
  ];

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const slides: Slide[] = [
    { type: 'image', src: '/demo5.png', url: 'https://alarm.com/' },
    { type: 'image', src: '/demo1.png', url: 'https://www.alarm.com/dealerbranding/v2/demo/v2/index.html' },
    { type: 'image', src: '/demo2.png', url: 'https://www.alarm.com/dealerbranding/embed/house_diagram/house.html' },
    { type: 'image', src: '/demo4.png', url: 'https://www.alarm.com/getstarted' },
    { type: 'image', src: '/demo3.png', url: 'https://www.alarm.com/us/alarmcom' },
    { type: 'image', src: '/demo6.png', url: 'https://www.alarm.com/dealerbranding/embed/powering_the_smart_home/house-diagram.html' },
  ];

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setIsInteracting(true);
      resetAutoRotate();
      
      // Clear interaction flag after 2 seconds
      if (interactionTimer.current) {
        clearTimeout(interactionTimer.current);
      }
      interactionTimer.current = setTimeout(() => {
        setIsInteracting(false);
      }, 2000);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setIsInteracting(true);
      resetAutoRotate();
      
      // Clear interaction flag after 2 seconds
      if (interactionTimer.current) {
        clearTimeout(interactionTimer.current);
      }
      interactionTimer.current = setTimeout(() => {
        setIsInteracting(false);
      }, 2000);
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
      // Only auto-rotate if in view, not hovering, video not playing, and user not interacting
      if (isInView && !isHovering && !isVideoPlaying && !isInteracting) {
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
  }, [isInView, isHovering, isVideoPlaying, isInteracting]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Intersection observer to detect if carousel is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      <div className="w-full max-w-[640px] px-[10px] sm:px-[20px]">
        <div
          ref={carouselRef}
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
                    {/* View Live Button for active slide */}
                    {isActive && slide.url && slide.url.trim() !== '' && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex justify-center w-full z-40">
                        <a
                          href={slide.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-transform duration-150 mr-3 mb-3"
                          style={{
                            backgroundColor: theme === 'dark' ? '#21211e' : '#FEF3C7',
                            color: theme === 'dark' ? '#D4A857' : '#92400E',
                            cursor: 'pointer',
                            boxShadow: 'none',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                            (e.currentTarget as HTMLElement).style.boxShadow = theme === 'dark' ? '0 6px 14px rgba(0,0,0,0.6)' : '0 6px 14px rgba(2,6,23,0.06)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                          }}
                        >
                          <span className="pr-2">View Live</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="inline align-text-bottom"
                          >
                            <path d="M14 3h7v7" />
                            <path d="M5 19l14-14" />
                            <path d="M5 5v14h14" />
                          </svg>
                        </a>
                      </div>
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
        {/* Project Description Cards - one per slide, only active is visible */}
        <div
          className="mt-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="card p-4 rounded-lg w-full sm:w-full transition-opacity duration-500 mx-auto"
            style={{
              backgroundColor: theme === 'dark' ? '#16181B' : '#FFFFFF',
              boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
              border: theme === 'dark' ? '1px solid rgba(212,168,87,0.06)' : '1px solid rgba(15,23,42,0.04)',
              width: '80vw',
              maxWidth: '100%',
            }}
          >
            <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#D4A857' : '#0F172A' }}>{projectCards[currentIndex].title}</h3>
            <div className="flex flex-wrap mb-4">
              {projectCards[currentIndex].techs.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center mr-3 mb-3 px-4 py-2 rounded-full text-sm transition-transform duration-150"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(212,168,87,0.08)' : '#EFF6FF',
                    color: theme === 'dark' ? '#D4A857' : '#1E3A8A',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = theme === 'dark' ? '0 6px 14px rgba(0,0,0,0.6)' : '0 6px 14px rgba(2,6,23,0.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-sm" style={{ color: theme === 'dark' ? '#B9C3D1' : '#374151' }}>{projectCards[currentIndex].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
