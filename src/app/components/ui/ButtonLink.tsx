import Link from "next/link";
import { memo, type ReactNode } from "react";

interface ButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
  target?: string;
  rel?: string;
  className?: string;
}

export const ButtonLink = memo(
  ({
    href,
    variant = "primary",
    children,
    target,
    rel,
    className = "",
  }: ButtonProps) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded border py-2.5 sm:py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]";

    const variantStyles = {
      primary:
        "border-foreground bg-foreground text-background hover:bg-background hover:text-foreground",
      secondary:
        "border-border bg-background text-foreground hover:border-foreground hover:bg-muted",
    };

    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {children}
      </Link>
    );
  },
);

ButtonLink.displayName = "ButtonLink";
