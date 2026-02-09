'use client';

import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import Timeline from "./Timeline";
import { useTheme } from "@/app/context/ThemeContext";
import ClientOnly from './ClientOnly';
import Logo from './Logo';
import ScrollDownButton from './ScrollDownButton';
import ImageCarousel from './ImageCarousel';
import UseCases from './UseCases';

export default function PageContent() {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const headshotRef = useRef<HTMLDivElement>(null);
  const parallaxContentRef = useRef<HTMLDivElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(true);



  // Intersection observer for hero section to control scroll arrow
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setShowScrollArrow(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Parallax scroll effect for content block
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxContentRef.current) {
        const rect = parallaxContentRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const blockCenter = rect.top + rect.height / 2;
        // Calculate offset: positive when below center, negative when above
        const offset = Math.min(Math.max((windowHeight / 2 - blockCenter) * 0.3, -100), 100);
        parallaxContentRef.current.style.setProperty('--parallax-offset', `${offset}px`);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



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
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundColor: theme === 'dark' ? '#181A20' : '#FAF8F6',
        }}
      >
        <main 
          className="flex h-full w-full max-w-3xl flex-col items-center justify-center px-16"
          style={{
            backgroundColor: theme === 'dark' ? '#1F2229' : '#FFFFFF',
          }}
        >
          <div className="flex flex-col gap-12">
            <ClientOnly>
              <Logo />
            </ClientOnly>
          </div>
        </main>
        
        {/* Scroll Button */}
        {showScrollArrow && (
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
          className="flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16"
          style={{
            backgroundColor: theme === 'dark' ? '#1F2229' : '#FFFFFF',
          }}
        >
          <div 
            ref={parallaxContentRef}
            className="flex flex-col gap-6 text-left w-full"
            style={{
              transform: 'translateY(var(--parallax-offset, 0px))',
              transition: 'transform 0.1s ease-out',
              willChange: 'transform',
            }}
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start w-full">
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
              <div className="flex flex-col w-full">
                <h1
                  className="text-xl sm:text-3xl font-semibold leading-tight sm:leading-10 tracking-tight w-full"
                  style={{ color: theme === 'dark' ? '#D4A857' : '#292C34' }}
                >
                  Let's build high-impact, user-centered experiences.
                </h1>
                <div className="flex gap-4 mt-2 w-full">
                  <a
                    href="https://github.com/asethii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#33363b] transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A857]"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/feed/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#23272f] text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#33363b] transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A857]"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div>
              {/* Skills grid */}
              <HeroGridHighlights />
            </div>

            <div>
              {/* Skills Cards */}
              {/**
               * Languages and Tools cards. Update the arrays below to add/remove bubbles.
               */}
              <div className="mt-6 grid gap-6 grid-cols-1">
                {/* Languages Card */}
                <div
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: theme === 'dark' ? '#16181B' : '#FFFFFF',
                    boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
                    border: theme === 'dark' ? '1px solid rgba(212,168,87,0.06)' : '1px solid rgba(15,23,42,0.04)'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <svg
                      viewBox="0 0 24 24"
                      width={20}
                      height={20}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      className="mr-2 flex-shrink-0"
                      style={{ color: theme === 'dark' ? '#D4A857' : '#0F172A' }}
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M7 8L3 11.6923L7 16M17 8L21 11.6923L17 16M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </g>
                    </svg>
                    <h3 className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#D4A857' : '#0F172A' }}>Languages</h3>
                  </div>

                  <p className="mb-4 text-sm" style={{ color: theme === 'dark' ? '#B9C3D1' : '#374151' }}>Primary languages and markup I use regularly.</p>

                  <div className="flex flex-wrap -ml-0">
                    {['HTML/CSS', 'JavaScript','TypeScript','SQL','C#/.NET','PHP'].map((lang) => (
                      <span
                        key={lang}
                        className="inline-flex items-center mr-3 mb-3 px-4 py-2 rounded-full text-sm transition-transform duration-150"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(212,168,87,0.08)' : '#EFF6FF',
                          color: theme === 'dark' ? '#D4A857' : '#1E3A8A',
                          cursor: 'default',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = theme === 'dark' ? '0 6px 14px rgba(0,0,0,0.6)' : '0 6px 14px rgba(2,6,23,0.06)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools & Technologies Card */}
                <div
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: theme === 'dark' ? '#16181B' : '#FFFFFF',
                    boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
                    border: theme === 'dark' ? '1px solid rgba(212,168,87,0.06)' : '1px solid rgba(15,23,42,0.04)'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <svg
                      viewBox="0 0 30 30"
                      width={20}
                      height={20}
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      className="mr-2 flex-shrink-0"
                      style={{ color: theme === 'dark' ? '#D4A857' : '#0F172A' }}
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <title>tools</title>                        
                        <defs></defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="Icon-Set"  transform="translate(-569.000000, -308.000000)" fill="currentColor">
                            <path d="M594.884,322.281 C592.585,324.575 589.129,324.958 586.406,323.494 L574.556,335.322 C573.754,336.122 572.454,336.122 571.651,335.322 C570.85,334.521 570.85,333.225 571.651,332.424 L583.503,320.596 C582.038,317.88 582.422,314.433 584.72,312.139 C586.098,310.764 587.896,310.11 589.701,310.088 C587.81,312.096 587.835,315.248 589.802,317.211 C591.768,319.173 594.926,319.198 596.938,317.311 C596.916,319.112 596.262,320.906 594.884,322.281 L594.884,322.281 Z M598.159,313.37 C597.653,313.938 596.813,314.661 595.609,315.762 C594.334,317.034 592.529,317.034 591.254,315.762 C589.978,314.488 589.978,312.688 591.254,311.415 C592.429,310.242 593.692,308.853 593.672,308.847 C590.257,307.274 586.082,307.882 583.268,310.69 C580.703,313.249 579.972,316.935 581.051,320.146 L570.2,330.976 C568.596,332.576 568.596,335.171 570.2,336.771 C571.804,338.371 574.404,338.371 576.008,336.771 L586.858,325.942 C590.078,327.021 593.771,326.289 596.336,323.73 C599.146,320.925 599.73,316.775 598.159,313.37 L598.159,313.37 Z" id="tools"> </path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <h3 className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#D4A857' : '#0F172A' }}>Tools & Technologies</h3>
                  </div>

                  <p className="mb-4 text-sm" style={{ color: theme === 'dark' ? '#B9C3D1' : '#374151' }}>Frameworks, tools, and platforms I use day-to-day.</p>

                  <div className="flex flex-wrap -ml-0">
                    {['Figma', 'PhotoShop/Illustrator','Adobe Animate','GitHub Copilot','Vercel','React/Next.js','Node.js','Git','Docker','Tailwind CSS','Bootstrap','REST APIs','GraphQL','Google Analytics','Google Search Console','Google Tag Manager','AWS Cloud Migration','IIS','Visual Studio','SQL Server'].map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center mr-3 mb-3 px-4 py-2 rounded-full text-sm transition-transform duration-150"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(212,168,87,0.06)' : '#FEF3C7',
                          color: theme === 'dark' ? '#D4A857' : '#92400E',
                          cursor: 'default',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = theme === 'dark' ? '0 6px 14px rgba(0,0,0,0.6)' : '0 6px 14px rgba(2,6,23,0.06)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Practices Card */}
                <div
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: theme === 'dark' ? '#16181B' : '#FFFFFF',
                    boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
                    border: theme === 'dark' ? '1px solid rgba(212,168,87,0.06)' : '1px solid rgba(15,23,42,0.04)'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <svg
                      viewBox="0 0 24 24"
                      width={20}
                      height={20}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      className="mr-2 flex-shrink-0"
                      style={{ color: theme === 'dark' ? '#D4A857' : '#0F172A' }}
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <h3 className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#D4A857' : '#0F172A' }}>Practices</h3>
                  </div>

                  <p className="mb-4 text-sm" style={{ color: theme === 'dark' ? '#B9C3D1' : '#374151' }}>Core practices and methodologies I apply to every project.</p>

                  <div className="flex flex-wrap -ml-0">
                    {['Accessibility (508 / WCAG)', 'UX/UI design systems', 'CMS governance', 'Stakeholder requirements gathering'].map((practice) => (
                      <span
                        key={practice}
                        className="inline-flex items-center mr-3 mb-3 px-4 py-2 rounded-full text-sm transition-transform duration-150"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(212,168,87,0.06)' : '#FEF3C7',
                          color: theme === 'dark' ? '#D4A857' : '#92400E',
                          cursor: 'default',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = theme === 'dark' ? '0 6px 14px rgba(0,0,0,0.6)' : '0 6px 14px rgba(2,6,23,0.06)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                      >
                        {practice}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <p>
              For 15+ years, I have been designing and engineering modern web solutions across the full stack using React, C#/.NET, HTML/CSS, JavaScript, SQL, various CMS Systems (Wordpress, Craft, Shopify) and more. My work blends engineering leadership, management, UI/UX intuition, accessibility standards, and AI-driven automation to create systems that scale.
            </p>
            <p>I lead projects end-to-end - from concept and prototyping to architecture, development, testing, and launch. I collaborate closely with designers, product, marketing, legal, QA, and executive teams to drive clarity, reduce risk, and deliver outcomes.</p>
            <p>Whether I'm rethinking an e-commerce-driven lead funnel, automating partner website generation for thousands of users, or building AI tools to improve accessibility and content quality, I focus on one thing:</p>
           
              <h2 className='text-xl font-bold text-center mb-16' style={{
          color: theme === 'dark' ? '#D4A857' : '#000000',
        }}>Delivering fast, intuitive, reliable experiences that make the web better - for users, developers and businesses.</h2>
            
            <ClientOnly>
              <ImageCarousel />
            </ClientOnly>


            
      {/* Enterprise & Government Web Experience Section */}
      <div className="w-full flex justify-center pt-8 pb-8">
        <section
          className="w-full max-w-4xl px-4 p-6 rounded-lg"
          style={{
            backgroundColor: theme === 'dark' ? '#16181B' : '#FFFFFF',
            boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
            border: theme === 'dark' ? '1px solid rgba(212,168,87,0.06)' : '1px solid rgba(15,23,42,0.04)'
          }}
        >
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#D4A857' : '#0F172A' }}>Enterprise & Government Web Experience</h3>
          </div>
          <p className="mb-4 text-sm" style={{ color: theme === 'dark' ? '#B9C3D1' : '#374151' }}>Key projects and responsibilities in large-scale, public sector and enterprise environments.</p>
          <ul className="list-disc pl-6 space-y-2 text-sm" style={{ color: theme === 'dark' ? '#B9C3D1' : '#374151' }}>
            <li>Led front-end development and UX modernization for enterprise-scale, public-facing websites used by millions of users</li>
            <li>Supported cloud migrations (on-prem → AWS) in collaboration with DevOps teams</li>
            <li>Maintained and enhanced IIS-hosted .NET websites with HTML, CSS, JavaScript</li>
            <li>Delivered websites compliant with Section 508 / WCAG 2.x accessibility standards</li>
            <li>Worked with security teams on annual certifications, remediation, and audits</li>
            <li>Supported content publishing workflows for high-volume CMS-driven sites</li>
          </ul>
        </section>
      </div>

      {/* Cloud Migration Experience Callout */}
      <div className="w-full flex justify-center pb-8">
        <section
          className="w-full max-w-4xl px-4 p-6 rounded-lg"
          style={{
            backgroundColor: theme === 'dark' ? '#16181B' : '#FFFFFF',
            boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
            border: theme === 'dark' ? '1px solid rgba(212,168,87,0.06)' : '1px solid rgba(15,23,42,0.04)'
          }}
        >
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold" style={{ color: theme === 'dark' ? '#D4A857' : '#0F172A' }}>Cloud Migration Experience</h3>
          </div>
          <p className="mb-4 text-sm" style={{ color: theme === 'dark' ? '#B9C3D1' : '#374151' }}>Recent cloud migration and DevOps collaboration highlights.</p>
          <ul className="list-disc pl-6 space-y-1 text-sm" style={{ color: theme === 'dark' ? '#B9C3D1' : '#374151' }}>
            <li>Participated in migration of a Craft CMS website from on-prem infrastructure to AWS</li>
            <li>Partnered with DevOps to update environment configurations, resolve deployment issues, and validate feature parity post-migration</li>
            <li>Performed functional testing and regression validation to ensure no loss of public-facing functionality</li>
            <li>Supported post-migration stabilization and bug fixes</li>
          </ul>
        </section>
      </div>
      
          </div>
        </main>
      </div>

      {/* Section 3: Timeline - Full Viewport with Extra Spacing */}
      <div 
        
        className="min-h-screen flex items-center justify-center pt-20 pb-20"
        style={{
          backgroundColor: theme === 'dark' ? '#181A20' : '#FAF8F6',
        }}
      >
        <main 
          className="w-full max-w-4xl px-4"
          style={{
            backgroundColor: theme === 'dark' ? '#181A20' : '#FAF8F6',
          }}
        >
          <Timeline />
        </main>
      </div>

      {/* Section 4: Use Cases */}
      <div 
        
        className="min-h-screen flex items-center justify-center pt-20 pb-20"
        style={{
          backgroundColor: theme === 'dark' ? '#181A20' : '#FAF8F6',
        }}
      >
        <main 
          className="w-full max-w-4xl px-4"
          style={{
            backgroundColor: theme === 'dark' ? '#181A20' : '#FAF8F6',
          }}
        >
          <ClientOnly>
            <UseCases />
          </ClientOnly>
        </main>
      </div>
    </div>
  );
}

/* ---------- HeroGridHighlights Component ---------- */
/**
 * HeroGridHighlights
 * - Minimal 2x4 grid (responsive)
 * - SVG icons (colored)
 * - Matches the card styling of Languages and Tools sections
 */
function HeroGridHighlights() {
  const { theme } = useTheme();
  
  const items = [
    {
      title: ".NET / IIS",
      text: "Can build sites with .NET / IIS",
      icon: IconServer,
      iconColor: theme === 'dark' ? '#FCD34D' : '#D97706',
      iconBg: theme === 'dark' ? 'rgba(252, 211, 77, 0.08)' : 'rgba(254, 243, 199, 0.8)',
    },
    {
      title: "Stakeholders",
      text: "Partner with stakeholders reliably",
      icon: IconHandshake,
      iconColor: theme === 'dark' ? '#7DD3FC' : '#0369A1',
      iconBg: theme === 'dark' ? 'rgba(125, 211, 252, 0.08)' : 'rgba(224, 242, 254, 0.8)',
    },
    {
      title: "Analytics",
      text: "Use analytics & performance tools to drive decisions",
      icon: IconChart,
      iconColor: theme === 'dark' ? '#6EE7B7' : '#059669',
      iconBg: theme === 'dark' ? 'rgba(110, 231, 183, 0.08)' : 'rgba(209, 250, 229, 0.8)',
    },
    {
      title: "Accessibility",
      text: "Improve accessibility and usability",
      icon: IconAccessibility,
      iconColor: theme === 'dark' ? '#C4B5FD' : '#7C3AED',
      iconBg: theme === 'dark' ? 'rgba(196, 181, 253, 0.08)' : 'rgba(237, 233, 254, 0.8)',
    },
    {
      title: "Workflow",
      text: "Have modern workflows (Git, automation)",
      icon: IconGitBranch,
      iconColor: theme === 'dark' ? '#FDBA74' : '#EA580C',
      iconBg: theme === 'dark' ? 'rgba(253, 186, 116, 0.08)' : 'rgba(255, 237, 213, 0.8)',
    },
    {
      title: "Cloud",
      text: "Have experience with cloud migrations",
      icon: IconCloud,
      iconColor: theme === 'dark' ? '#67E8F9' : '#0891B2',
      iconBg: theme === 'dark' ? 'rgba(103, 232, 249, 0.08)' : 'rgba(207, 250, 254, 0.8)',
    },
    {
      title: "Scientific UX",
      text: "Comfortable interpreting complex / scientific content",
      icon: IconAtom,
      iconColor: theme === 'dark' ? '#FDA4AF' : '#E11D48',
      iconBg: theme === 'dark' ? 'rgba(253, 164, 175, 0.08)' : 'rgba(254, 226, 226, 0.8)',
    },
    {
      title: "Quality",
      text: "Deliver clean, maintainable, reusable UI with strong standards",
      icon: IconShieldCheck,
      iconColor: theme === 'dark' ? '#A5B4FC' : '#4F46E5',
      iconBg: theme === 'dark' ? 'rgba(165, 180, 252, 0.08)' : 'rgba(224, 231, 255, 0.8)',
    },
  ];

  return (
    <section className="w-full mt-28">
      <div className="mx-auto max-w-6xl">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.title}
                className="p-4 rounded-lg transition-transform duration-150"
                style={{
                  backgroundColor: theme === 'dark' ? '#16181B' : '#FFFFFF',
                  boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
                  border: theme === 'dark' ? '1px solid rgba(212,168,87,0.06)' : '1px solid rgba(15,23,42,0.04)'
                }}
                onMouseEnter={(e) => { 
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; 
                  (e.currentTarget as HTMLElement).style.boxShadow = theme === 'dark' ? '0 6px 14px rgba(0,0,0,0.6)' : '0 6px 14px rgba(2,6,23,0.06)'; 
                }}
                onMouseLeave={(e) => { 
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; 
                  (e.currentTarget as HTMLElement).style.boxShadow = theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)'; 
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: it.iconBg,
                      color: it.iconColor,
                    }}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 
                      className="truncate text-sm font-semibold"
                      style={{ color: theme === 'dark' ? '#D4A857' : '#0F172A' }}
                    >
                      {it.title}
                    </h3>
                    <p 
                      className="mt-1 text-sm leading-snug"
                      style={{ color: theme === 'dark' ? '#B9C3D1' : '#374151' }}
                    >
                      {it.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- SVG Icons (inline, no deps) ---------- */
/* All icons use currentColor so they inherit the accent color. */

function IconServer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M5 6.5C5 5.12 6.12 4 7.5 4h9C17.88 4 19 5.12 19 6.5v2c0 1.38-1.12 2.5-2.5 2.5h-9C6.12 11 5 9.88 5 8.5v-2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5 15.5c0-1.38 1.12-2.5 2.5-2.5h9c1.38 0 2.5 1.12 2.5 2.5v2c0 1.38-1.12 2.5-2.5 2.5h-9C6.12 20 5 18.88 5 17.5v-2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M8 8h.01M8 17h.01" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function IconHandshake({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M8.5 12.5 11 10c1-1 2.5-1 3.5 0l1 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3.5 12 7 8.5c1.2-1.2 3.1-1.2 4.3 0l.7.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20.5 12 17 8.5c-1.2-1.2-3.1-1.2-4.3 0l-.7.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 13.5l2 2c.8.8 2.2.8 3 0l2.5-2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.5 14.5l2 2c.8.8 2.2.8 3 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M7 15l3-3 3 2 5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 8h.01" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function IconAccessibility({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 4h.01" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M6 7.5c4 1.5 8 1.5 12 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 9.5 12 21m2-11.5L12 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 13.5h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGitBranch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M6 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 8v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M6 12c2.5 0 3.5-4 6-4s3.5 4 6 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconCloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M8.5 18h8.2c2 0 3.8-1.6 3.8-3.6 0-1.8-1.4-3.2-3.1-3.5A5.7 5.7 0 0 0 6.7 9.7 3.6 3.6 0 0 0 8.5 18Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 11v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 15.5 12 18l2.5-2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconAtom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <path
        d="M12 4c2.5 0 4.5 3.6 4.5 8s-2 8-4.5 8-4.5-3.6-4.5-8 2-8 4.5-8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5.2 7.2c1.8-1.8 5.8-.3 8.8 2.7s4.5 7 2.7 8.8-5.8.3-8.8-2.7-4.5-7-2.7-8.8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M18.8 7.2c1.8 1.8.3 5.8-2.7 8.8s-7 4.5-8.8 2.7-.3-5.8 2.7-8.8 7-4.5 8.8-2.7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconShieldCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 3 19 6v6c0 5-3 8.5-7 9.8C8 20.5 5 17 5 12V6l7-3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


