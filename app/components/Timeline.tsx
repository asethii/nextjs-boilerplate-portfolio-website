'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface TimelineEvent {
  year: string;
  title: string;
  description: string | string[];
}

const events: TimelineEvent[] = [
  {
    year: '2013-2025',
    title: 'Front-End Developer / UX Designer',
    description: [
      'Began transitioning from design-focused work into engineering leadership and full-stack development',
      'Developed custom User Experiences from the ground up; lead generation and management systems, e-commerce platforms and marketing sites using C#/.NET, HTML/CSS/JS, PHP, Shopify and WordPress',
      'Established strong UI/UX foundations, SEO practices, conversion strategy, accessibility standards and data-backed decision making',  
      'Led multiple projects across various tech stacks, collaborating closely with cross-functional teams to deliver high-quality digital experiences',
      'SEO optimization and performance improvements resulting in increased organic traffic and user engagement',
      'Implemented accessibility best practices to ensure compliance with WCAG standards',
      'Mentored junior developers and designers, fostering a collaborative and growth-oriented team environment',
      'Leveraged AI tools to enhance development workflows and improve content quality'
    ],
  },
  {
    year: '2010-2013',
    title: 'Front-end Design and Development',
    description: [
      'Designed and maintained websites and applications supporting various government agencies using SharePoint.',
      'Lead front-end development efforts for multiple projects, implementing bug-free responsive design patterns and cross-browser compatibility.',
      'Developed scalable User Interfaces with a focus on usability, accessibility, and performance optimization.',
      'Collaborated with back-end developers to integrate front-end components with server-side logic.',
      'Conducted user research and usability testing to inform design decisions and improve user experience.',
      'Created wireframes, prototypes, and visual designs to effectively communicate design concepts to stakeholders.'
    ],
  },
  {
    year: '2002-2010',
    title: 'Web Designer / Junior Developer',
    description: [
      'Began my career as a web designer, focusing on creating visually appealing and user-friendly websites.',
      'Collaborated with clients to understand their needs and translate them into effective design solutions.',
      'Gained experience in HTML, CSS, and basic JavaScript to implement designs into functional web pages.',
      'Assisted in the development and maintenance of websites, ensuring they were up-to-date and aligned with client goals.',
      'Learned the fundamentals of web development, including best practices for usability, accessibility, and SEO.'
    ],
  },
  {
    year: 'If you go this far, thank you!',
    title: '2026 and Beyond',
    description: [
      'I am looking for a engineering or technical leadership role where I can leverage my development experience to help rapidly prototype and itterate on UI/UX focused solutions.',
      'Create tools using agentic AI-driven systems that help optmize workflows between designers and engineers, and help catch and mitigate quality assurance and compliance related issues before they occur.',
      'Build systems that help catch and mitigate quality assurance and compliance related issues before they occur.'
    ],
  },
 
];

export default function Timeline() {
  const { theme } = useTheme();
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting) {
            setVisibleIndices((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16" style={{
          color: theme === 'dark' ? '#D4A857' : '#000000',
        }}>
          My Journey
        </h2>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600" />

          {/* Timeline events */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) itemRefs.current[index] = el;
                }}
                className={`relative transition-all duration-700 ${
                  visibleIndices.includes(index) ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Center dot - absolutely positioned on the line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0">
                  <div className={`w-6 h-6 rounded-full border-4 border-white dark:border-black shadow-lg ${
                    index % 2 === 0 ? 'bg-blue-600' : 'bg-purple-600'
                  }`} />
                </div>

                {/* Content container */}
                <div className="md:grid md:grid-cols-2 md:gap-8 pt-2 flex flex-col">
                  {/* Left content - Desktop only */}
                  <div className={`hidden md:block ${index % 2 === 0 ? 'text-right pr-8' : ''}`}>
                    {index % 2 === 0 && (
                      <div>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {event.year}
                        </span>
                        <h3 className="text-2xl font-bold mt-2" style={{
                          color: theme === 'dark' ? '#FFFFFF' : '#000000',
                        }}>
                          {event.title}
                        </h3>
                        <div className="text-left mt-2" style={{
                          color: theme === 'dark' ? '#FFFFFF' : '#4B5563',
                        }}>
                          {typeof event.description === 'string' ? (
                            <p>{event.description}</p>
                          ) : (
                            <ul className="list-disc pl-5 space-y-1">
                              {event.description.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right content - Desktop only */}
                  <div className={`hidden md:block ${index % 2 === 1 ? 'text-left pl-8' : ''}`}>
                    {index % 2 === 1 && (
                      <div>
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                          {event.year}
                        </span>
                        <h3 className="text-2xl font-bold mt-2" style={{
                          color: theme === 'dark' ? '#FFFFFF' : '#000000',
                        }}>
                          {event.title}
                        </h3>
                        <div className="mt-2 text-left" style={{
                          color: theme === 'dark' ? '#FFFFFF' : '#4B5563',
                        }}>
                          {typeof event.description === 'string' ? (
                            <p>{event.description}</p>
                          ) : (
                            <ul className="list-disc pl-5 space-y-1">
                              {event.description.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile content - Centered on line */}
                  <div className="md:hidden w-full px-8 flex flex-col items-center">
                    <div className="w-full bg-opacity-5 bg-gray-500 dark:bg-gray-400 rounded-lg p-4">
                      <span className="text-sm font-semibold text-blue-600 dark:text-purple-400">
                        {event.year}
                      </span>
                      <h3 className="text-xl font-bold mt-2 text-left" style={{
                        color: theme === 'dark' ? '#FFFFFF' : '#000000',
                      }}>
                        {event.title}
                      </h3>
                      <div className="mt-2 text-left text-sm" style={{
                        color: theme === 'dark' ? '#FFFFFF' : '#4B5563',
                      }}>
                        {typeof event.description === 'string' ? (
                          <p>{event.description}</p>
                        ) : (
                          <ul className="list-disc pl-5 space-y-1">
                            {event.description.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
