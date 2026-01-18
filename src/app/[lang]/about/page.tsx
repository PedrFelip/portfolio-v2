import { ContactLinks } from "@/components/about/ContactLinks";
import { EducationCard } from "@/components/about/EducationCard";
import { WorkExperienceCard } from "@/components/about/WorkExperienceCard";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SkillsGrid } from "@/components/SkillsGrid";
import {
  getContactLinks,
  getEducation,
  getWorkExperience,
} from "@/lib/about-data";
import { aboutContent } from "@/lib/content/about-content";
import { parseBoldMarkdown } from "@/lib/markdown";
import { getSkills } from "@/lib/shared-data";

type Lang = "en" | "pt";

interface AboutPageProps {
  params: Promise<{ lang: Lang }>;
}

/**
 * AboutPage component
 *
 * Vercel best practices applied:
 * - async-parallel: Promise.all() for independent operations (CRITICAL)
 * - async-defer-await: defer await until needed (HIGH)
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Mobile-first: optimized for small screens
 * - Consistent container: uses Section component for uniform alignment
 */
export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const t = aboutContent[lang];

  // Vercel: async-parallel - Parallel fetch for independent data
  // Instead of sequential awaits, use Promise.all() to fetch all data concurrently
  const [workExperience, education, contactLinks, skills] = await Promise.all([
    getWorkExperience(lang),
    getEducation(lang),
    getContactLinks(lang),
    getSkills(lang),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero-like Header Section */}
      <Section>
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {t.about.badge}
        </div>
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          {t.about.title}
        </h1>
        <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
          {parseBoldMarkdown(t.about.description)}
        </p>
      </Section>

      <Section variant="muted">
        <SectionHeader
          badge={t.work.badge}
          title={t.work.title}
          description={t.work.intro}
        />

        <div className="space-y-0">
          {workExperience.map((experience, index) => (
            <WorkExperienceCard
              key={`${experience.company}-${experience.title}`}
              experience={experience}
              isLast={index === workExperience.length - 1}
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader badge={t.skills.badge} title={t.skills.title} />
        <SkillsGrid skills={skills} />
      </Section>

      <Section variant="muted">
        <SectionHeader badge={t.education.badge} title={t.education.title} />

        <div className="space-y-4">
          {education.map((edu) => (
            <EducationCard
              key={`${edu.school}-${edu.degree}`}
              education={edu}
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          badge={t.contact.badge}
          title={t.contact.title}
          description={t.contact.description}
        />

        <ContactLinks links={contactLinks} />
      </Section>
    </div>
  );
}
