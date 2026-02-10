'use client';

import { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import Image from 'next/image';

export default function UseCases() {
  const { theme } = useTheme();
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const toggleCase = (caseNum: number) => {
    setExpandedCase(expandedCase === caseNum ? null : caseNum);
  };

  const CaseStudyCard = ({ 
    caseNum, 
    title, 
    subtitle, 
    children 
  }: { 
    caseNum: number; 
    title: string; 
    subtitle: string; 
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedCase === caseNum;
    return (
      <div
        className="card card-case"
        style={{
          backgroundColor: theme === 'dark' ? '#252B35' : '#F5F3F0',
          borderRadius: '8px',
          marginBottom: '24px',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          border: `1px solid ${theme === 'dark' ? '#3A4252' : '#E5E0DA'}`,
        }}
      >
        <button
          onClick={() => toggleCase(caseNum)}
          style={{
            width: '100%',
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',            
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (theme === 'dark') {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#2A3038';
            }
          }}
          onMouseLeave={(e) => {
            if (theme === 'dark') {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#1F2229';
            }
          }}
        >
          <div className="text-left">
            <h3 
              style={{
                margin: '0 0 8px 0',
                fontSize: '20px',
                fontWeight: '600',
                color: theme === 'dark' ? '#D4A857' : '#292C34',
              }}
            >
              {title}
            </h3>
            <p 
              style={{
                margin: 0,
                fontSize: '14px',
                color: theme === 'dark' ? '#B0B8C3' : '#666',
              }}
            >
              {subtitle}
            </p>
          </div>
          <div
            style={{
              transition: 'transform 0.3s ease',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              marginLeft: '16px',
              flexShrink: 0,
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
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </button>

        {isExpanded && (
          <div
            className="card-content"
            style={{
              padding: '32px',
              backgroundColor: theme === 'dark' ? '#252B35' : '#F5F3F0',
              borderTop: `1px solid ${theme === 'dark' ? '#3A4252' : '#E5E0DA'}`,
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '28px' }}>
      <h4
        style={{
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '12px',
          color: theme === 'dark' ? '#D4A857' : '#292C34',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {title}
      </h4>
      {children}
    </div>
  );

  const Placeholder = ({ label }: { label: string }) => (
    <div
      style={{
        width: '100%',
        height: '240px',
        backgroundColor: theme === 'dark' ? '#1F2229' : '#E5E0DA',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px dashed ${theme === 'dark' ? '#3A4252' : '#D0C9C2'}`,
        marginBottom: '16px',
        color: theme === 'dark' ? '#B0B8C3' : '#999',
        fontSize: '14px',
        fontStyle: 'italic',
      }}
    >
      [Placeholder: {label}]
    </div>
  );

  const BulletList = ({ items }: { items: string[] }) => (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
      }}
    >
      {items.map((item, idx) => (
        <li
          key={idx}
          className="text-sm"
          style={{
            marginBottom: '0px',
            paddingLeft: '24px',
            position: 'relative',
            lineHeight: '1.6',
            color: theme === 'dark' ? '#D0D8E0' : '#444',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 0,
              color: theme === 'dark' ? '#D4A857' : '#292C34',
              fontWeight: 'bold',
            }}
          >
            •
          </span>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      style={{
        padding: '0 24px',
        color: theme === 'dark' ? '#D0D8E0' : '#444',
      }}
    >
      <div style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '16px',
            color: theme === 'dark' ? '#D4A857' : '#292C34',
            textAlign: 'center',
          }}
        >
          Case Studies
        </h2>
        <p
          style={{
            fontSize: '16px',
            textAlign: 'center',
            color: theme === 'dark' ? '#B0B8C3' : '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          Real-world examples of how I've solved complex problems across frontend, backend, and infrastructure
        </p>
      </div>

      {/* Case Study 1 */}
      <CaseStudyCard
        caseNum={1}
        title="Enterprise Public Website Redesign, CMS Replatforming & Cloud Migration"
        subtitle="Modernizing Alarm.com's High-Traffic Marketing Platform"
      >
        <Section title="Background & Challenges">
          <p className="text-sm" style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            Alarm.com's public website evolved over time and needed to support:
          </p>
          <BulletList
            items={[
              'A legacy C# / .NET website hosted on IIS',
              'A full redesign and migration to a modern CMS',
              'Strict security, legal, and compliance requirements',
              'Multiple production domains (alarm.com and www.alarm.com)',
              'High availability, SEO preservation, and brand trust',
              'A future-ready architecture capable of cloud migration',
            ]}
          />
          <p className="text-sm" style={{ marginTop: '12px', lineHeight: '1.6', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
            This work required careful coordination across engineering, DevOps, marketing, legal, security, and product teams.
          </p>
        </Section>

        <Placeholder label="Application Architecture Diagram" />

        <Section title="My Role">
          <BulletList
            items={[
              'Led front-end engineering for public marketing website redesign',
              'Maintained and enhanced legacy C# / .NET platform on IIS',
              'Architected CMS migration strategy and implementation',
              'Managed Bitbucket + Git workflows and deployment processes',
              'Coordinated DNS, subdomain architecture, and canonical strategies',
              'Participated in security reviews and vulnerability remediation',
              'Partnered with DevOps on AWS cloud migration',
              'Acted as technical bridge between application code and infrastructure',
            ]}
          />
        </Section>

        <Section title="The Solution">
          <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
            ✓ Legacy Platform (Pre-CMS)
          </h5>
          <BulletList
            items={[
              'Maintained and enhanced C# / .NET public website',
              'Developed and managed site locally using IIS',
              'Supported traditional ASP.NET workflows prior to CMS adoption',
              'Ensured stability while preparing for future redesign',
            ]}
          />

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              ✓ CMS Redesign & Replatforming
            </h5>
            <BulletList
              items={[
                'Rebuilt public marketing site using Craft CMS (PHP) and MySQL',
                'Designed reusable, component-driven templates for long-term maintainability',
                'Enabled marketing teams to publish content through structured, governed workflows',
                'Maintained accessibility and usability standards throughout redesign',
              ]}
            />
          </div>

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              ✓ Source Control & Deployment Workflow
            </h5>
            <BulletList
              items={[
                'Used Bitbucket + Git for version control',
                'Automated deployments to Development and Test environments',
                'Managed controlled, manual production releases to ensure uptime',
                'Coordinated database synchronization and content parity across environments',
                'Acted as primary engineering partner during release cycles',
              ]}
            />
          </div>

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              ✓ DNS, Subdomain & Server Architecture
            </h5>
            <p className="text-sm" style={{ marginBottom: '12px', lineHeight: '1.6' }}>
              One of the most complex aspects was maintaining dual production domains:
            </p>
            <div
              style={{
                backgroundColor: theme === 'dark' ? '#1F2229' : '#FFF8F5',
                padding: '12px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '13px',
                marginBottom: '12px',
                color: theme === 'dark' ? '#B0B8C3' : '#444',
                overflow: 'auto',
              }}
            >
              <code>https://alarm.com</code><br />
              <code>https://www.alarm.com</code>
            </div>
            <BulletList
              items={[
                'Supported marketing brand recognition without SEO duplication',
                'Coordinated DNS, redirects, and canonical strategies',
                'Worked with infrastructure teams to prevent indexing, caching, or routing issues',
                'Ensured seamless user experience across domains during and after CMS rollout',
              ]}
            />
            <p className="text-sm" style={{ marginTop: '12px', lineHeight: '1.6', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
              This experience directly parallels large public-sector and government web environments with legacy URL requirements.
            </p>
          </div>
        </Section>

        <Placeholder label="DNS Architecture Diagram" />

        <Section title="Security, Compliance & Governance">
          <BulletList
            items={[
              'Participated in external third-party security reviews',
              'Debugged and remediated reported vulnerabilities',
              'Implemented fixes aligned with security and compliance recommendations',
              'Supported regular legal and compliance reviews',
              'Ensured content and feature releases passed formal approval workflows',
            ]}
          />
          <p className="text-sm" style={{ marginTop: '12px', lineHeight: '1.6', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
            These processes reinforced a strong engineering culture around risk management, documentation, and audit readiness.
          </p>
        </Section>

        <Section title="Cloud Migration: On-Prem → AWS">
          <p className="text-sm" style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            After several years of platform stability, the site underwent a lift-and-shift migration to AWS.
          </p>
          <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', marginTop: '16px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
            Migration Characteristics
          </h5>
          <BulletList
            items={[
              'No application rewrite; focus on infrastructure transition',
              'Zero-downtime and minimal risk strategy',
              'Emphasis on operational continuity and verification',
            ]}
          />
          <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', marginTop: '16px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
            My Role in the Migration
          </h5>
          <BulletList
            items={[
              'Partnered closely with DevOps engineers',
              'Assisted with environment variable configuration',
              'Debugged runtime and CMS behavior differences post-migration',
              'Troubleshot deployment and configuration issues',
              'Verified feature parity, content integrity, and performance',
              'Acted as technical bridge between application code and cloud infrastructure',
            ]}
          />
        </Section>

        <Placeholder label="AWS Cloud Architecture Diagram" />

        <Section title="Cross-Functional Collaboration">
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            Worked continuously with:
          </p>
          <BulletList
            items={[
              'Marketing – content strategy and launch coordination',
              'Legal & Compliance – approvals and regulatory review',
              'Security teams – third-party audits and remediation',
              'Product teams – feature alignment and messaging',
              'DevOps – deployments, DNS, and cloud migration',
            ]}
          />
          <p className="text-sm" style={{ marginTop: '12px', lineHeight: '1.6', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
            This collaboration ensured successful delivery in a high-trust, highly visible public environment.
          </p>
        </Section>

        <Section title="Key Challenges">
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              1. Dual Domain Architecture
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
              Managing two production domains without SEO penalties required sophisticated DNS configuration and careful redirect strategies.
            </p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              2. Zero-Downtime Migration
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
              Transitioning from IIS to Craft CMS, then to AWS, while maintaining 24/7 availability for a high-traffic public site.
            </p>
          </div>
          <div>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              3. Security & Compliance Requirements
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
              Balancing rapid iteration with formal security reviews, legal approvals, and vulnerability remediation cycles.
            </p>
          </div>
        </Section>

        <Section title="Results & Impact">
          <BulletList
            items={[
              'Modernized mission-critical public website without loss of SEO or uptime',
              'Improved publishing velocity while maintaining governance and compliance',
              'Successfully transitioned from IIS / .NET → CMS → AWS',
              'Delivered stable platform supporting years of ongoing growth',
              'Established patterns for enterprise-scale web governance and cloud readiness',
              'Maintained accessibility standards across entire platform lifecycle',
            ]}
          />
        </Section>
      </CaseStudyCard>

      {/* Case Study 2 */}
      <CaseStudyCard
        caseNum={2}
        title="Shopify Liquid → Hydrogen Migration"
        subtitle="Rebuilding a High-Conversion Lead Flow Using React"
      >
        <Section title="The Problem">
          <p className="text-sm" style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            Marketing needed a modern, conversion-focused experience to drive higher-quality leads. The initial Shopify Liquid prototype hit critical walls:
          </p>
          <BulletList
            items={[
              'Liquid couldn\'t support dynamic multi-step wizard flows',
              'Checkout customization was impossible for our business logic',
              'Complex branching and conditional logic couldn\'t scale',
              'B2B2C partner-specific deposits weren\'t supported',
              'We needed React-level interactivity that Liquid simply couldn\'t provide',
            ]}
          />
        </Section>

        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
          <video 
            controls 
            style={{ 
              width: '100%', 
              borderRadius: '8px',
              boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
            }}
          >
            <source src="/shopify-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <Section title="My Role">
          <BulletList
            items={[
              'Gathered requirements from Marketing stakeholders',
              'Built high-fidelity prototypes and specification documents',
              'Collaborated with Design on Figma → React component synchronization',
              'Led distributed engineering team (U.S. + Brazil)',
              'Architected the entire Shopify + API + Stripe + C# backend flow',
              'Integrated React Hydrogen as the new frontend framework',
              'Built automated testing framework using Playwright & Gherkin syntax',
              'Coordinated with Legal, QA, Marketing, and executives',
              'Owned all deployments and post-launch optimization',
            ]}
          />
        </Section>

        <div style={{ marginTop: '40px', marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/lcp-arch.png"
            alt="Architecture diagram for lead capture platform"
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              borderRadius: '8px',
              boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
            }}
          />
        </div>

        <Section title="The Solution">
          <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
            ✓ Dynamic Wizard UI
          </h5>
          <BulletList
            items={[
              'React-driven transitions between steps',
              'Conditional branching based on package selection',
              'Multi-step flows: hardware, features, zip code, partner selection',
              'Fast, modern, friction-reduced user experience',
            ]}
          />

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              ✓ Full API Integration
            </h5>
            <BulletList
              items={[
                'Wizard data flows to C# backend via REST',
                'Partner lookup based on zip code and supported features',
                'Leads created inside lead management system',
                'Automated scoring, routing, and distribution',
              ]}
            />
          </div>

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              ✓ Stripe Integration for Compliant Deposits
            </h5>
            <BulletList
              items={[
                'Direct partner payouts without touching company funds',
                'Compliant B2B2C financial flows',
                'Higher-value, high-intent leads',
                'Legal-approved payment handling',
              ]}
            />
          </div>

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              ✓ Designer–Developer Workflow (Figma MCP)
            </h5>
            <BulletList
              items={[
                'Designers update components in Figma',
                'React components fetched directly into codebase',
                'Faster UI iteration cycles',
                'Pixel-perfect alignment automatically',
                '30–40% reduction in dev/design back-and-forth',
              ]}
            />
          </div>
        </Section>

        <div style={{ marginTop: '40px', marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/shopify-hydrogen-architecture.png"
            alt="Architecture diagram showing Hydrogen frontend connecting to C# API and Lead Management System"
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              borderRadius: '8px',
              boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
            }}
          />
        </div>

        <Section title="Key Challenges">
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              1. Re-engineering Wizards in React
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }} className="text-sm">
              Had to re-architect logic, transitions, validation, and UX flows to be dynamic and maintainable.
            </p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              2. Last-Minute Stripe Pivot
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }} className="text-sm">
              Legal flagged Shopify's checkout limitations late. Integrated an entirely new payment API while balancing stakeholder urgency, legal compliance, and deployment schedule.
            </p>
          </div>
          <div>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              3. Automated Testing Architecture
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }} className="text-sm">
              Liquid made testing nearly impossible. React + Playwright enabled full UI automation, dramatically reducing regressions.
            </p>
          </div>
        </Section>

        <Section title="Outcomes">
          <BulletList
            items={[
              '30% increase in conversions for higher-value leads',
              'Faster, more modern UX experience',
              'Lower bug counts due to automated testing',
              'Designers iterated 2–3x faster with Figma MCP workflow',
              'Stakeholders praised independence from monolith release cycle',
              'Created blueprint for future micro-API driven projects',
            ]}
          />
        </Section>
      </CaseStudyCard>

      {/* Case Study 3 */}
      <CaseStudyCard
        caseNum={3}
        title="Automated Partner Website Generator & CMS"
        subtitle="Dynamic, Scalable .NET System Serving Thousands of Dealers"
      >
        <Section title="The Problem">
          <p className="text-sm" style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            Thousands of Alarm.com partners (dealers) needed to establish an online presence quickly without dedicated web teams. Marketing required:
          </p>
          <BulletList
            items={[
              'Fast, turnkey website setup for dealers',
              'Consistent brand identity across partner ecosystem',
              'SEO-optimized pages that rank locally',
              'Localized content with multi-language support',
              'Feature-based product descriptions',
              'Reliable lead capture and routing',
            ]}
          />
          <p className="text-sm" style={{ marginTop: '12px', lineHeight: '1.6', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
            The solution had to scale to thousands of variations with a single code base—no manual website creation.
          </p>
        </Section>

        <Placeholder label="Partner Website Screenshots" />

        <Section title="My Role">
          <BulletList
            items={[
              'Architected the dynamic routing system for thousands of URLs',
              'Built reusable .aspx template with intelligent content toggling',
              'Designed SEO markup system and metadata handling',
              'Implemented support for multiple redesigns and legacy templates',
              'Built dynamic language resource loading',
              'Created comprehensive UI testing strategy',
              'Led sprint planning, QA alignment, documentation, and release cycles',
              'Handled high-value dealer customization logic',
            ]}
          />
        </Section>

        <Section title="The Solution">
          <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
            ✓ Custom Routing Layer
          </h5>
          <p className="text-sm" style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            A wildcard routing system mapped every dealer URL to a single template:
          </p>
          <div
            style={{
              backgroundColor: theme === 'dark' ? '#1F2229' : '#FFF8F5',
              padding: '12px',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '13px',
              marginBottom: '12px',
              color: theme === 'dark' ? '#B0B8C3' : '#444',
              overflow: 'auto',
            }}
          >
            <code>/[CountryCode]/[dealer-selected-url]</code>
          </div>
          <BulletList
            items={[
              'URL → Database query → dealer settings fetched',
              'Entire UI assembled dynamically on each request',
              'Aggressive caching for performance',
              'Real-time updates when dealers changed settings',
            ]}
          />

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              ✓ Dynamic Template Logic
            </h5>
            <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
              One template powered thousands of variations:
            </p>
            <BulletList
              items={[
                'Brand colors, logos, and contact information',
                'Supported hardware and smart home features',
                'Content blocks and marketing banners',
                'Multi-language support',
                'SEO metadata per dealer',
              ]}
            />
          </div>

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              ✓ Live Dealer Controls
            </h5>
            <BulletList
              items={[
                'Toggle supported hardware and features',
                'Switch languages and promotions',
                'Update hero image, copy, and video vs. static banners',
                'All changes reflected instantly',
              ]}
            />
          </div>
        </Section>

        <div style={{ marginTop: '40px', marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/dbwp.png"
            alt="Routing Architecture Diagram showing dynamic dealer website system"
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              borderRadius: '8px',
              boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
            }}
          />
        </div>

        <Section title="Key Challenges">
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              1. Combinatorial UI Explosion
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }} className="text-sm">
              Hundreds of feature combinations, languages, and brand variants required a test matrix, automated UI tests, caching safeguards, and meticulous conditional logic.
            </p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              2. Localization Boundaries
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }} className="text-sm">
              Translated text often exceeded UI boundaries. Implemented rules and length checks to prevent layout breaks.
            </p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              3. Backwards Compatibility
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }} className="text-sm">
              Supporting new redesigns, legacy templates, and custom layouts for high-value dealers—all on a single .aspx file—required deep planning.
            </p>
          </div>
          <div>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              4. Multi-page UX in Single Page
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }} className="text-sm">
              Built URL query-string logic, content block switching, and SEO-safe internal routing to support new flows without breaking existing architecture.
            </p>
          </div>
        </Section>

        <Section title="Outcomes">
          <BulletList
            items={[
              'Enabled thousands of dealers to launch websites instantly',
              'Reduced Marketing\'s manual workload dramatically',
              'Gave partners SEO-optimized, mobile-friendly sites',
              'Increased lead flow and partner engagement',
              'Standardized branding across entire partner ecosystem',
              'Supported multiple redesign cycles with zero downtime',
              'Scaled globally with localization support',
            ]}
          />
        </Section>
      </CaseStudyCard>

      {/* Case Study 4 */}
      <CaseStudyCard
        caseNum={4}
        title="Custom Icon Font + Accessibility Governance"
        subtitle="AI Automation for Developers & Marketing Teams"
      >
        <Section title="The Problem">
          <p className="text-sm" style={{ marginBottom: '12px', lineHeight: '1.6' }}>
            Alarm.com faced two interconnected challenges:
          </p>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              Design Language Fragmentation
            </p>
            <BulletList
              items={[
                'Hundreds of separate SVG icon files',
                'Inconsistent iconography across products',
                'Poor performance from multiple asset requests',
                'No standardized icon usage across marketing and engineering',
              ]}
            />
          </div>
          <div>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              Accessibility & Compliance Bottlenecks
            </p>
            <BulletList
              items={[
                'Repeated WCAG violations across products',
                'Inconsistent ARIA usage and poor heading structure',
                'Non-semantic markup and missing labels',
                'Manual accessibility reviews happening too late in development',
                'Marketing content requiring heavy legal review',
                'Slow content velocity limiting business agility',
              ]}
            />
          </div>
        </Section>

        <Section title="My Role">
          <BulletList
            items={[
              'Built custom icon font system using SVG → Fontello pipeline',
              'Authored internal accessibility guidelines and standards',
              'Ran training sessions for engineers and designers',
              'Established ARIA, semantic markup, and contrast standards',
              'Created AI-powered accessibility scanner in Bitbucket CI/CD',
              'Built AI content generator for Marketing team',
              'Integrated automated SEO and legal review tools',
              'Evangelized accessibility-first development culture',
            ]}
          />
        </Section>

        <Section title="The Solution">
          <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
            ✓ Custom Icon Font System
          </h5>
          <BulletList
            items={[
              'One lightweight font file replaced hundreds of separate SVGs',
              'Simple CSS class usage: &lt;i class="icon-lock"&gt;&lt;/i&gt;',
              'Consistent stroke, sizing, and spacing globally',
              'Updatable via controlled design-to-code pipeline',
              'Massive performance improvement',
              'Rapid adoption by designers and engineers',
            ]}
          />

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              ✓ Automated Accessibility Scanner
            </h5>
            <p className="text-sm" style={{ marginBottom: '12px', lineHeight: '1.6' }}>
              Triggered automatically on every pull request. Scanned:
            </p>
            <BulletList
              items={[
                'HTML, JSX/React, CSS',
                'Craft templates and Liquid templates',
                'Enforced WCAG 2.1 AA compliance',
              ]}
            />
            <p className="text-sm" style={{ marginTop: '12px', marginBottom: '12px', lineHeight: '1.6' }}>
              Output:
            </p>
            <BulletList
              items={[
                'Inline PR comments with specific violations',
                'Actionable recommendations',
                'Auto-logged tickets when devs deferred fixes',
              ]}
            />
            <p className="text-sm" style={{ marginTop: '12px', marginBottom: '12px', lineHeight: '1.6', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
              Impact: Caught issues early, reduced QA burden, improved consistency company-wide.
            </p>
          </div>

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              ✓ AI-Powered Content Wizard
            </h5>
            <p className="text-sm" style={{ marginBottom: '12px', lineHeight: '1.6' }}>
              Marketing inputs content type, audience, keywords, and tone. System outputs:
            </p>
            <BulletList
              items={[
                'Long-form content and hardware feature explanations',
                'SEO-optimized metadata',
                'Automated legal risk flagging (claims, guarantees, compliance language)',
                'Dozens of content variations for A/B testing',
              ]}
            />
            <p className="text-sm" style={{ marginTop: '12px', marginBottom: '12px', lineHeight: '1.6', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
              Impact: 3x faster content velocity, fewer legal escalations, improved quality and compliance.
            </p>
          </div>
        </Section>

        <div style={{ marginTop: '40px', marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/custom-font.png"
            alt="Icon Font Library and AI Automation Dashboard"
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              borderRadius: '8px',
              boxShadow: theme === 'dark' ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(31,41,55,0.06)',
            }}
          />
        </div>

        <Section title="Key Challenges">
          <BulletList
            items={[
              'Coordinating across legal, marketing, engineering, and design teams',
              'Training teams on new accessibility standards',
              'Ensuring icon font compatibility across legacy products',
              'Building reliable AI-based rule detection',
              'Migrating thousands of existing icons and identifying duplicates',
              'Maintaining accuracy in AI-based SEO and legal flagging',
            ]}
          />
        </Section>

        <Section title="Outcomes">
          <BulletList
            items={[
              'Unified icon system across entire company',
              'Dramatically reduced accessibility violations (80%+ improvement)',
              'Faster engineering reviews and reduced QA burden',
              'Marketing content velocity increased 3x',
              'Legal review time reduced through automated risk detection',
              'Stronger design system governance and ownership',
              'Cultural shift toward "accessibility-by-default" mindset',
              'AI-augmented workflows became company standard',
            ]}
          />
        </Section>
      </CaseStudyCard>
    </div>
  );
}
