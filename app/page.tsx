import JumboTron from "@/components/JumboTron";
import FeaturedProjects from "@/components/FeaturedProjects";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import CallToAction from "@/components/CallToAction";
import Script from "next/script";

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'William Rice',
  jobTitle: 'Software Developer',
  description: 'Full-stack software developer specializing in React, Next.js, Node.js, and modern web technologies.',
  url: 'https://williamarice.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lexington',
    addressRegion: 'KY',
    addressCountry: 'US'
  },
  sameAs: [
    'https://github.com/williamrice',
    'https://linkedin.com/in/williamarice'
  ],
  knowsAbout: [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Prisma'
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Self-Employed'
  }
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'William Rice Portfolio',
  url: 'https://williamarice.com',
  description: 'Full-stack software developer portfolio showcasing projects and skills',
  author: {
    '@type': 'Person',
    name: 'William Rice'
  },
  publisher: {
    '@type': 'Person',
    name: 'William Rice'
  }
};

export default function Home() {
  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="flex flex-col items-center justify-center w-full text-center">
        <JumboTron />
        <SkillsSection />
        <AboutSection />
        <CallToAction />
        <FeaturedProjects />
      </div>
    </>
  );
}
