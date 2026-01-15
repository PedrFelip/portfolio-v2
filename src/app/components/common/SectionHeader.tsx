import type { ReactNode } from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export const SectionHeader = ({
  badge,
  title,
  description,
  children,
}: SectionHeaderProps) => {
  return (
    <div className="mb-8 sm:mb-12">
      {badge && (
        <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {badge}
        </div>
      )}
      <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-sm sm:text-base text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};
