import { memo } from "react";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { SkillCategory } from "@/types/portfolio";

interface SkillsSectionProps {
  skills: SkillCategory[];
  badge: string;
  title: string;
}

interface SkillItemProps {
  skill: string;
}

/**
 * SkillItem component
 *
 * Memoized to prevent re-renders for individual skill items
 * (Vercel: rerender-memo)
 */
const SkillItem = memo(({ skill }: SkillItemProps) => (
  <span className="rounded border border-border bg-muted px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
    {skill}
  </span>
));

SkillItem.displayName = "SkillItem";

interface SkillCategoryGroupProps extends SkillCategory {}

/**
 * SkillCategoryGroup component
 *
 * Memoized to prevent re-renders when skills in a category don't change
 * (Vercel: rerender-memo)
 */
const SkillCategoryGroup = memo(
  ({ category, items }: SkillCategoryGroupProps) => (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-semibold text-foreground">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <SkillItem key={skill} skill={skill} />
        ))}
      </div>
    </div>
  ),
);

SkillCategoryGroup.displayName = "SkillCategoryGroup";

/**
 * SkillsSection component
 *
 * Best practices applied:
 * - Memoized to prevent unnecessary re-renders (Vercel: rerender-memo)
 * - Child components (SkillCategoryGroup, SkillItem) are memoized separately
 * - Efficient rendering of large skill lists
 * - Clean component composition
 */
export const SkillsSection = memo(
  ({ skills, badge, title }: SkillsSectionProps) => {
    return (
      <Section>
        <SectionHeader badge={badge} title={title} />
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          {skills.map((skillGroup) => (
            <SkillCategoryGroup
              key={skillGroup.category}
              category={skillGroup.category}
              items={skillGroup.items}
            />
          ))}
        </div>
      </Section>
    );
  },
);

SkillsSection.displayName = "SkillsSection";
