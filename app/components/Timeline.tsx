
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
];

export default function Timeline() {
  const { theme } = useTheme();
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showAllBullets, setShowAllBullets] = useState<{ [key: number]: boolean }>({});

  const handleShowMore = (idx: number) => {
    setShowAllBullets((prev) => ({ ...prev, [idx]: true }));
  };

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
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
            style={{
              background: theme === 'dark' 
                ? 'linear-gradient(to bottom, #D4A857, #B8860B)' 
                : 'linear-gradient(to bottom, #D97706, #92400E)'
            }}
          />

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
                  <div 
                    className="w-6 h-6 rounded-full border-4 shadow-lg"
                    style={{
                      backgroundColor: theme === 'dark' ? '#D4A857' : '#D97706',
                      borderColor: theme === 'dark' ? '#000000' : '#FFFFFF'
                    }}
                  />
                </div>

                {/* Content container */}
                <div className="md:grid md:grid-cols-2 md:gap-8 pt-2 flex flex-col">
                  {/* Left content - Desktop only */}
                  <div className={`hidden md:block ${index % 2 === 0 ? 'text-right pr-8' : ''}`}>
                    {index % 2 === 0 && (
                      <div>
                        <span className="text-sm font-semibold" style={{
                          color: theme === 'dark' ? '#D4A857' : '#92400E',
                        }}>
                          {event.year}
                        </span>
                        <h3 className="text-2xl font-bold mt-2" style={{
                          color: theme === 'dark' ? '#FFFFFF' : '#000000',
                        }}>
                          {event.title}
                        </h3>
                        <div
                          className="p-6 rounded-lg"
                          style={{
                            backgroundColor: theme === 'dark' ? '#33363b' : '#FFFFFF',
                            boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
                            border: theme === 'dark' ? '1px solid rgba(212,168,87,0.06)' : '1px solid rgba(15,23,42,0.04)',
                            color: theme === 'dark' ? '#FFFFFF' : '#4B5563',
                          }}
                        >
                          {typeof event.description === 'string' ? (
                            <p>{event.description}</p>
                          ) : (
                            <>
                              <ul className="list-disc pl-5 space-y-1 text-left" style={{ fontSize: '12px' }}>
                                {(showAllBullets[index]
                                  ? event.description
                                  : event.description.slice(0, 2)
                                ).map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                              {event.description.length > 2 && !showAllBullets[index] && (
                                <button
                                  className="text-xs underline cursor-pointer mt-1"
                                  onClick={() => handleShowMore(index)}
                                  style={{ background: 'none', border: 'none', padding: 0, color: theme === 'dark' ? '#D4A857' : '#92400E' }}
                                  type="button"
                                >
                                  Show More
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right content - Desktop only */}
                  <div className={`hidden md:block ${index % 2 === 1 ? 'text-left pl-8' : ''}`}>
                    {index % 2 === 1 && (
                      <div>
                        <span className="text-sm font-semibold" style={{
                          color: theme === 'dark' ? '#D4A857' : '#92400E',
                        }}>
                          {event.year}
                        </span>
                        <h3 className="text-2xl font-bold mt-2" style={{
                          color: theme === 'dark' ? '#FFFFFF' : '#000000',
                        }}>
                          {event.title}
                        </h3>
                        <div
                          className="p-6 rounded-lg mt-2"
                          style={{
                            backgroundColor: theme === 'dark' ? '#33363b' : '#FFFFFF',
                            boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
                            border: theme === 'dark' ? '1px solid rgba(212,168,87,0.06)' : '1px solid rgba(15,23,42,0.04)',
                            color: theme === 'dark' ? '#FFFFFF' : '#4B5563',
                          }}
                        >
                          {typeof event.description === 'string' ? (
                            <p>{event.description}</p>
                          ) : (
                            <>
                              <ul className="list-disc pl-5 space-y-1 text-left" style={{ fontSize: '12px' }}>
                                {(showAllBullets[index]
                                  ? event.description
                                  : event.description.slice(0, 2)
                                ).map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                              {event.description.length > 2 && !showAllBullets[index] && (
                                <button
                                  className="text-xs underline cursor-pointer mt-1"
                                  onClick={() => handleShowMore(index)}
                                  style={{ background: 'none', border: 'none', padding: 0, color: theme === 'dark' ? '#D4A857' : '#92400E' }}
                                  type="button"
                                >
                                  Show More
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile content - Centered on line */}
                  <div className="md:hidden w-full px-8 flex flex-col items-center">
                    <div
                      className="w-full p-6 rounded-lg"
                      style={{
                        backgroundColor: theme === 'dark' ? '#33363b' : '#FFFFFF',
                        boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
                        border: theme === 'dark' ? '1px solid rgba(212,168,87,0.06)' : '1px solid rgba(15,23,42,0.04)',
                      }}
                    >
                      <span className="text-sm font-semibold" style={{
                        color: theme === 'dark' ? '#D4A857' : '#92400E',
                      }}>
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
                          <>
                            <ul className="list-disc pl-5 space-y-1 text-left" style={{ fontSize: '12px' }}>
                              {(showAllBullets[index]
                                ? event.description
                                : event.description.slice(0, 2)
                              ).map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                            {event.description.length > 2 && !showAllBullets[index] && (
                              <button
                                className="text-xs underline cursor-pointer mt-1"
                                onClick={() => handleShowMore(index)}
                                style={{ background: 'none', border: 'none', padding: 0, color: theme === 'dark' ? '#D4A857' : '#92400E' }}
                                type="button"
                              >
                                Show More
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plain card outside timeline */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div
            className="p-8 rounded-lg text-center"
            style={{
              backgroundColor: theme === 'dark' ? '#33363b' : '#FFFFFF',
              boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
              border: theme === 'dark' ? '1px solid rgba(212,168,87,0.06)' : '1px solid rgba(15,23,42,0.04)',
            }}
          >
            <h3 className="text-2xl font-bold mb-2" style={{
              color: theme === 'dark' ? '#D4A857' : '#000000',
            }}>
              If you got this far, thank you!
            </h3>
            <p className="text-lg font-semibold mb-4" style={{
              color: theme === 'dark' ? '#FFFFFF' : '#000000',
            }}>
              2026 and Beyond
            </p>
            <ul className="list-disc pl-5 space-y-2 text-left text-sm" style={{
              color: theme === 'dark' ? '#FFFFFF' : '#4B5563',
            }}>
              <li>I am looking for a engineering or technical leadership role where I can leverage my development experience to help rapidly prototype and itterate on UI/UX focused solutions.</li>
              <li>Create tools using agentic AI-driven systems that help optmize workflows between designers and engineers, and help catch and mitigate quality assurance and compliance related issues before they occur.</li>
              <li>Build systems that help catch and mitigate quality assurance and compliance related issues before they occur.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
