'use client';

import { useEffect } from 'react';
import Image from "next/image";
import Timeline from "./Timeline";
import { useTheme } from "@/app/context/ThemeContext";
import ClientOnly from './ClientOnly';
import Logo from './Logo';

export default function PageContent() {
  const { theme } = useTheme();

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

  return (
    <div 
      className="flex min-h-screen flex-col font-sans"
      style={{
        backgroundColor: theme === 'dark' ? '#181A20' : '#FAF8F6',
      }}
    >
      <div className="flex min-h-screen items-center justify-center">
        <main 
          className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16"
          style={{
            backgroundColor: theme === 'dark' ? '#1F2229' : '#FFFFFF',
          }}
        >
        <div className="flex flex-col gap-12 mb-20">
            <ClientOnly>
                <Logo />
            </ClientOnly>
        </div>
        <div className="flex flex-col gap-6 text-center sm:items-start sm:text-left">
          <div className="flex gap-6 items-start">
            <Image
              className="dark:invert flex-shrink-0"
              src="/headshot.png"
              alt="Ashish Sethi"
              width={128}   
              height={128}
              priority
            />
            <h1 className="text-3xl font-semibold leading-10 tracking-tight" style={{
              color: theme === 'dark' ? '#EAEAEA' : '#292C34',
            }}>
              Senior Web Engineer who builds high-impact, user-centered and accessible digital experiences.
            </h1>
          </div>
          <p>
            
For 15+ years, I've been designing and engineering modern web solutions across the full stack: React, .NET, C#, ASP.NET, Shopify, Craft CMS, and more. My work blends engineering leadership, UI/UX intuition, accessibility standards, and AI-driven automation to create systems that scale.


          </p>
          <p>I lead projects end-to-end — from concept and prototyping to architecture, development, testing, and launch. I collaborate closely with designers, product, marketing, legal, QA, and executive teams to drive clarity, reduce risk, and deliver outcomes.


</p>
<p>Whether I'm rethinking an e-commerce-driven lead funnel, automating partner website generation for thousands of dealers, or building AI tools to improve accessibility and content quality, I focus on one thing:
</p>
          <p className="text-lg leading-8" style={{
            color: theme === 'dark' ? '#ADADAD' : '#72757E',
          }}>
            Delivering fast, intuitive, reliable experiences that make the web better — for users, developers, and businesses.
          </p>
        </div>
        {/* <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Button
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Button
          </a>
        </div> */}
        <Timeline />
        </main>
      </div>
    </div>
  );
}
