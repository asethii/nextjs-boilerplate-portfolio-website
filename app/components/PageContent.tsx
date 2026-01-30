'use client';

import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import Timeline from "./Timeline";
import { useTheme } from "@/app/context/ThemeContext";
import ClientOnly from './ClientOnly';
import Logo from './Logo';
import ScrollDownButton from './ScrollDownButton';

export default function PageContent() {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const headshotRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          console.log('HTML class changed:', document.documentElement.className);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === heroRef.current) setCurrentSection(0);
            else if (entry.target === headshotRef.current) setCurrentSection(1);
            else if (entry.target === timelineRef.current) setCurrentSection(2);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) sectionObserver.observe(heroRef.current);
    if (headshotRef.current) sectionObserver.observe(headshotRef.current);
    if (timelineRef.current) sectionObserver.observe(timelineRef.current);

    return () => sectionObserver.disconnect();
  }, []);

  const getNextSectionRef = () => {
    if (currentSection === 0) return headshotRef;
    if (currentSection === 1) return timelineRef;
    return null;
  };

  return (
    <div 
      className="flex flex-col font-sans"
      style={{
        backgroundColor: theme === 'dark' ? '#181A20' : '#FAF8F6',
      }}
    >
      {/* Section 1: Hero - Full Viewport */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: theme === 'dark' ? '#181A20' : '#FAF8F6',
        }}
      >
        <main 
          className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16"
          style={{
            backgroundColor: theme === 'dark' ? '#1F2229' : '#FFFFFF',
            paddingTop: 0,
          }}
        >
          <div className="flex flex-col gap-12">
            <ClientOnly>
              <Logo />
            </ClientOnly>
          </div>
        </main>
        
        {/* Scroll Button */}
        {currentSection === 0 && (
          <ClientOnly>
            <ScrollDownButton contentRef={headshotRef} />
          </ClientOnly>
        )}
      </div>

      {/* Section 2: Headshot - Full Viewport */}
      <div 
        ref={headshotRef}
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: theme === 'dark' ? '#181A20' : '#FAF8F6',
        }}
      >
        <main 
          className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16"
          style={{
            backgroundColor: theme === 'dark' ? '#1F2229' : '#FFFFFF',
            paddingTop: 0,
          }}
        >
          <div className="flex flex-col gap-6 text-left w-full">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex justify-center w-full sm:w-auto">
                <Image
                  className="dark:invert flex-shrink-0"
                  src="/headshot.png"
                  alt="Ashish Sethi"
                  width={128}   
                  height={128}
                  priority
                />
              </div>
              <h1 className="text-xl sm:text-3xl font-semibold leading-tight sm:leading-10 tracking-tight" style={{
                color: theme === 'dark' ? '#D4A857' : '#292C34',
              }}>
                Let's build high-impact, user-centered and accessible digital experiences.
              </h1>
              
            </div>
            <div>
                <p>Languages I know: HTML/CSS/JS, C#/.NET, PHP, SQL</p>
              <p>Tools I use: Figma, PhotoShop, Git, Vercel(deployments), VS Code</p>
            </div>
            
            <p>
              For 15+ years, I've been designing and engineering modern web solutions across the full stack using React, .NET, C#, ASP.NET, HTML/CSS, JavaScript, SQL, Shopify, Craft CMS, WordPress, and more. My work blends engineering leadership, management, UI/UX intuition, accessibility standards, and AI-driven automation to create systems that scale.
            </p>
            <p>I lead projects end-to-end - from concept and prototyping to architecture, development, testing, and launch. I collaborate closely with designers, product, marketing, legal, QA, and executive teams to drive clarity, reduce risk, and deliver outcomes.</p>
            <p>Whether I'm rethinking an e-commerce-driven lead funnel, automating partner website generation for thousands of users, or building AI tools to improve accessibility and content quality, I focus on one thing:</p>
           
              <h2 className='text-xl font-bold text-center mb-16' style={{
          color: theme === 'dark' ? '#D4A857' : '#000000',
        }}>Delivering fast, intuitive, reliable experiences that make the web better - for users, developers, and businesses.</h2>
            
          </div>
        </main>

        {/* Scroll Button */}
        {currentSection === 1 && (
          <ClientOnly>
            <ScrollDownButton contentRef={timelineRef} />
          </ClientOnly>
        )}
      </div>

      {/* Section 3: Timeline - Full Viewport with Extra Spacing */}
      <div 
        ref={timelineRef}
        className="min-h-screen flex items-center justify-center pt-20 pb-20"
        style={{
          backgroundColor: theme === 'dark' ? '#181A20' : '#FAF8F6',
        }}
      >
        <main 
          className="w-full max-w-4xl"
          style={{
            backgroundColor: theme === 'dark' ? '#181A20' : '#FAF8F6',
          }}
        >
          <Timeline />
        </main>
      </div>
    </div>
  );
}
