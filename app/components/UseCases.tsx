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
            backgroundColor: theme === 'dark' ? '#1F2229' : '#FFFFFF',
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
              fontSize: '24px',
              color: theme === 'dark' ? '#D4A857' : '#292C34',
              transition: 'transform 0.3s ease',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              marginLeft: '16px',
              flexShrink: 0,
            }}
          >
            ▼
          </div>
        </button>

        {isExpanded && (
          <div
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
          style={{
            marginBottom: '12px',
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
        title="Shopify Liquid → Hydrogen Migration"
        subtitle="Rebuilding a High-Conversion Lead Flow Using React"
      >
        <Section title="The Problem">
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
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
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
              Had to re-architect logic, transitions, validation, and UX flows to be dynamic and maintainable.
            </p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              2. Last-Minute Stripe Pivot
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
              Legal flagged Shopify's checkout limitations late. Integrated an entirely new payment API while balancing stakeholder urgency, legal compliance, and deployment schedule.
            </p>
          </div>
          <div>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              3. Automated Testing Architecture
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
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

      {/* Case Study 2 */}
      <CaseStudyCard
        caseNum={2}
        title="Automated Partner Website Generator"
        subtitle="Dynamic, Scalable .NET System Serving Thousands of Dealers"
      >
        <Section title="The Problem">
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
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
          <p style={{ marginTop: '12px', lineHeight: '1.6', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
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
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
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
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
              Hundreds of feature combinations, languages, and brand variants required a test matrix, automated UI tests, caching safeguards, and meticulous conditional logic.
            </p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              2. Localization Boundaries
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
              Translated text often exceeded UI boundaries. Implemented rules and length checks to prevent layout breaks.
            </p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              3. Backwards Compatibility
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
              Supporting new redesigns, legacy templates, and custom layouts for high-value dealers—all on a single .aspx file—required deep planning.
            </p>
          </div>
          <div>
            <p style={{ fontWeight: '600', marginBottom: '8px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              4. Multi-page UX in Single Page
            </p>
            <p style={{ marginLeft: '0', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
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

      {/* Case Study 3 */}
      <CaseStudyCard
        caseNum={3}
        title="Custom Icon Font + Accessibility Governance"
        subtitle="AI Automation for Developers & Marketing Teams"
      >
        <Section title="The Problem">
          <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
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
            <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
              Triggered automatically on every pull request. Scanned:
            </p>
            <BulletList
              items={[
                'HTML, JSX/React, CSS',
                'Craft templates and Liquid templates',
                'Enforced WCAG 2.1 AA compliance',
              ]}
            />
            <p style={{ marginTop: '12px', marginBottom: '12px', lineHeight: '1.6' }}>
              Output:
            </p>
            <BulletList
              items={[
                'Inline PR comments with specific violations',
                'Actionable recommendations',
                'Auto-logged tickets when devs deferred fixes',
              ]}
            />
            <p style={{ marginTop: '12px', marginBottom: '12px', lineHeight: '1.6', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
              Impact: Caught issues early, reduced QA burden, improved consistency company-wide.
            </p>
          </div>

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', color: theme === 'dark' ? '#D4A857' : '#292C34' }}>
              ✓ AI-Powered Content Wizard
            </h5>
            <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
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
            <p style={{ marginTop: '12px', marginBottom: '12px', lineHeight: '1.6', color: theme === 'dark' ? '#B0B8C3' : '#666' }}>
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
