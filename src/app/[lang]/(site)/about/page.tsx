"use client";

import { useMemo } from "react";
import { ContactLinks } from "@/components/ContactLinks";
import { EducationCard } from "@/components/EducationCard";
import { SkillsGrid } from "@/components/SkillsGrid";
import { WorkExperienceCard } from "@/components/WorkExperienceCard";
import {
  getContactLinks,
  getEducation,
  getWorkExperience,
} from "@/lib/aboutData";
import { useLanguage } from "@/lib/LanguageContext";
import { getSkills } from "@/lib/shared-data";

export default function AboutPage() {
  const { t, language } = useLanguage();

  const workExperience = useMemo(
    () => getWorkExperience(language as "en" | "pt"),
    [language],
  );

  const education = useMemo(
    () => getEducation(language as "en" | "pt"),
    [language],
  );

  const contactLinks = useMemo(
    () => getContactLinks(language as "en" | "pt"),
    [language],
  );

  const skills = useMemo(() => getSkills(language as "en" | "pt"), [language]);

  // Parse markdown bold (**text**) to JSX
  const parseDescription = (
    text: string,
  ): (string | React.JSX.Element)[] | null => {
    if (!text) return null;

    const parts = text.split(/(\*\*.*?\*\*)/g);
    const result: (string | React.JSX.Element)[] = [];
    let keyCounter = 0;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;

      if (part.startsWith("**") && part.endsWith("**")) {
        const content = part.slice(2, -2);
        result.push(
          <strong
            key={`bold-${keyCounter++}`}
            className="font-semibold text-foreground"
          >
            {content}
          </strong>,
        );
      } else {
        result.push(part);
      }
    }

    return result;
  };

  return (
    <div className="min-h-screen">
      {/* Hero / Intro Section */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {t.about.badge}
        </div>
        <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          {t.about.title}
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
          {parseDescription(t.about.description)}
        </p>
      </section>

      {/* Work Experience Section */}
      <section className="border-t border-border bg-muted/30 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t.work.badge}
            </div>
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {t.work.title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t.work.intro}
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {workExperience.map((experience, index) => (
              <WorkExperienceCard
                key={experience.company}
                experience={experience}
                isLast={index === workExperience.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t.skills.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {t.skills.title}
            </h2>
          </div>

          <SkillsGrid skills={skills} />
        </div>
      </section>

      {/* Education Section */}
      <section className="border-t border-border bg-muted/30 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t.education.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {t.education.title}
            </h2>
          </div>

          <div className="space-y-4">
            {education.map((edu) => (
              <EducationCard key={edu.school} education={edu} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t.contact.badge}
            </div>
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {t.contact.title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t.contact.description}
            </p>
          </div>

          <ContactLinks links={contactLinks} />
        </div>
      </section>
    </div>
  );
}
