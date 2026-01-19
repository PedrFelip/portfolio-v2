/**
 * Shared UI strings used across multiple pages
 * Navigation, Footer, Common buttons and labels
 */

export type Language = "en" | "pt";

export const sharedContent = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About / CV",
      projects: "Projects",
      blog: "Blog",
      language: "Language",
      theme: "Theme",
      toggleMenu: "Toggle menu",
    },

    // Common UI
    common: {
      home: "Home",
      about: "About",
      projects: "Projects",
      blog: "Blog",
      language: "Language",
      github: "GitHub",
      website: "Website",
      present: "Present",
      viewProject: "View Project",
      sourceCode: "Source Code",
    },

    // Footer
    footer: {
      year: new Date().getFullYear(),
      madeWith: "Made with",
      by: "by",
      navigation: "Navigation",
      connect: "Connect",
      builtWith: "Built with Next.js, Tailwind CSS & Bun",
    },

    // Header
    header: {
      name: "Pedro Felipe",
      subtitle: "Backend Engineer & System Architect",
    },
  },
  pt: {
    // Navigation
    nav: {
      home: "Início",
      about: "Sobre / CV",
      projects: "Projetos",
      blog: "Blog",
      language: "Idioma",
      theme: "Tema",
      toggleMenu: "Alternar menu",
    },

    // Common UI
    common: {
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      blog: "Blog",
      language: "Idioma",
      github: "GitHub",
      website: "Website",
      present: "Presente",
      viewProject: "Ver Projeto",
      sourceCode: "Código Fonte",
    },

    // Footer
    footer: {
      year: new Date().getFullYear(),
      madeWith: "Feito com",
      by: "por",
      navigation: "Navegacao",
      connect: "Conecte-se",
      builtWith: "Feito com Next.js, Tailwind CSS & Bun",
    },

    // Header
    header: {
      name: "Pedro Felipe",
      subtitle: "Engenheiro Backend & Arquiteto de Sistemas",
    },
  },
};
