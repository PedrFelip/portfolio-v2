import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted";
}

export const Section = ({
  children,
  className = "",
  variant = "default",
}: SectionProps) => {
  const variantStyles = {
    default: "py-16 sm:py-24 md:py-32",
    muted: "border-t border-border bg-muted/30 py-16 sm:py-24 md:py-32",
  };

  return (
    <section className={`${variantStyles[variant]} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};
