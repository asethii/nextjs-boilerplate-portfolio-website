import Image from "next/image";
import Timeline from "./components/Timeline";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
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
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Senior Web Engineer who builds high-impact, user-centered digital experiences.
            </h1>
          </div>
          <p>
            
For 15+ years, I’ve been designing and engineering modern web solutions across the full stack: React, .NET, C#, ASP.NET, Shopify, Craft CMS, and more. My work blends engineering leadership, UI/UX intuition, accessibility standards, and AI-driven automation to create systems that scale.


          </p>
          <p>I lead projects end-to-end — from concept and prototyping to architecture, development, testing, and launch. I collaborate closely with designers, product, marketing, legal, QA, and executive teams to drive clarity, reduce risk, and deliver outcomes.


</p>
<p>Whether I’m rethinking an e-commerce-driven lead funnel, automating partner website generation for thousands of dealers, or building AI tools to improve accessibility and content quality, I focus on one thing:
</p>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
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
  );
}
