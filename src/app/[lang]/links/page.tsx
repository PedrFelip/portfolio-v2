"use client";

import { Github, Home, Linkedin, Mail, Twitter } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import type { SocialLink } from "@/lib/links";
import { socialLinks } from "@/lib/links";

const iconMap = {
  portfolio: Home,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

/**
 * LinksPage component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Consistent container: matches Navigation and Section components
 * - Mobile-first: optimized for small screens
 */
export default function LinksPage() {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-mono text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
            Pedro Felipe
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            {t.links.subtitle}
          </p>
        </div>

        {/* Link Cards */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {socialLinks.map((link: SocialLink) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.url}
                target={link.icon === "portfolio" ? "_self" : "_blank"}
                rel={
                  link.icon === "portfolio" ? undefined : "noopener noreferrer"
                }
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted active:opacity-75"
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-muted-foreground" />
                <span className="text-sm sm:text-base md:text-lg font-medium text-foreground">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
