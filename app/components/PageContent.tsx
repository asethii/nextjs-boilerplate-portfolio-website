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
  const timelineRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
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

  // Handler for scroll arrow click (optional, for analytics or future logic)
  const handleScrollArrowClick = () => {};



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
        {showScrollArrow && (
          <ClientOnly>
            <ScrollDownButton contentRef={headshotRef} onClick={handleScrollArrowClick} />
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

        {/* Scroll Button */}

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





