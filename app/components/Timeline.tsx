'use client';

import { useEffect, useRef, useState } from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string | string[];
}

const events: TimelineEvent[] = [
  {
    year: '2009-2016',
    title: 'Front-End Developer / Web Designer',
    description: [
      'Built responsive websites and web applications',
      'Designed user interfaces with focus on usability',
      'Started learning modern web technologies'
    ],
  },
  {
    year: '2015',
    title: 'Full Stack Expertise',
    description: [
      'Mastered React and modern JavaScript frameworks',
      'Deep expertise in .NET and C# backend systems',
      'Architected scalable web applications'
    ],
  },
  {
    year: '2018',
    title: 'Leadership Role',
    description: [
      'Led cross-functional engineering teams',
      'Mentored junior developers',
      'Managed large-scale projects from concept to launch'
    ],
  },
  {
    year: '2020',
    title: 'AI Integration',
    description: [
      'Integrated AI solutions for accessibility improvements',
      'Built AI-driven content quality tools',
      'Focused on ethical AI implementation'
    ],
  },
  {
    year: '2024',
    title: 'Innovation Focus',
    description: [
      'Architecting next-generation digital experiences',
      'Driving technical innovation and best practices',
      'Building AI-powered solutions at scale'
    ],
  },
];

export default function Timeline() {
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
        <h2 className="text-4xl font-bold text-center mb-16 text-black dark:text-white">
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
                <div className="grid grid-cols-2 gap-8 pt-2">
                  {/* Left content */}
                  <div className={index % 2 === 0 ? 'text-right pr-8' : ''}>
                    {index % 2 === 0 && (
                      <div>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {event.year}
                        </span>
                        <h3 className="text-2xl font-bold mt-2 text-black dark:text-white">
                          {event.title}
                        </h3>
                        <div className="text-left text-gray-600 dark:text-gray-400 mt-2">
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

                  {/* Right content */}
                  <div className={index % 2 === 1 ? 'text-left pl-8' : ''}>
                    {index % 2 === 1 && (
                      <div>
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                          {event.year}
                        </span>
                        <h3 className="text-2xl font-bold mt-2 text-black dark:text-white">
                          {event.title}
                        </h3>
                        <div className="text-gray-600 dark:text-gray-400 mt-2 text-left">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
