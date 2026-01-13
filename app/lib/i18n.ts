export type Language = "en" | "pt";

export const LANGUAGES: Record<Language, string> = {
  en: "English",
  pt: "Português",
};

export const DEFAULT_LANGUAGE: Language = "en";

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About / CV",
      projects: "Projects",
      blog: "Blog",
      language: "Language",
      theme: "Theme",
    },

    // Hero Section
    hero: {
      greeting: "Hi, I'm Pedro Felipe 👋",
      title: "Backend Engineer & System Architect",
      subtitle: "Backend Developer & DevOps Enthusiast",
      description:
        "Building scalable, maintainable systems focused on efficiency and reliability",
      cta: "Explore my work",
      ctaSecondary: "Read my CV",
    },

    // About Section
    about: {
      title: "About Me",
      intro:
        "I am a backend engineer passionate about designing robust and scalable systems.",
      description:
        "I'm a backend developer passionate about **system design**, **cloud infrastructure**, and **automation**. I build scalable APIs, implement Infrastructure as Code, and design reliable, maintainable systems that support growth. My main stack includes **Node.js**, **TypeScript**, **Go**, **PostgreSQL**, **Docker**, and **Linux**. I'm also a long-time Linux user — always experimenting with setups and optimizing environments to make development faster and cleaner. I believe in learning by building, continuously improving my craft through hands-on projects and real-world challenges.",
    },

    // Work Section
    work: {
      title: "Work Experience",
      intro:
        "Honed backend and platform engineering skills while shipping products for startups, health teams, and academic initiatives.",
    },

    // Projects Section
    projects: {
      badge: "My Projects",
      title: "Featured Projects",
      subtitle: "Check out my latest work",
      description:
        "I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.",
    },

    // Philosophy Section
    philosophy: {
      title: "Always Learning, Always Building",
      text1:
        "I believe the best way to grow as a developer is through hands-on experience. Every project is an opportunity to solve real problems, experiment with new technologies, and push the boundaries of what I know.",
      text2:
        "Whether it's optimizing infrastructure, designing scalable architectures, or automating complex workflows — I'm driven by the challenge of building systems that work reliably and efficiently.",
    },

    // Contact Section
    contact: {
      badge: "Contact",
      title: "Let's Connect",
      description:
        "Interested in collaborating on a project, discussing tech, or just want to say hi? I'm always open to connecting with fellow developers and exploring new opportunities. Feel free to reach out through any of my social channels below!",
    },

    // Blog
    blog: {
      title: "Blog",
      subtitle: "Insights on backend engineering, system design, and DevOps",
      readMore: "Read more",
      back: "Back",
      share: "Share",
      shareOn: "Share on",
      copyLink: "Copy link",
      linkCopied: "Link copied!",
      shareVia: "Share via",
    },

    // Common
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
    },

    // Hero Section
    hero: {
      greeting: "Olá, Sou Pedro Felipe 👋",
      title: "Engenheiro Backend & Arquiteto de Sistemas",
      subtitle: "Desenvolvedor Backend & Entusiasta DevOps",
      description:
        "Construindo sistemas escaláveis e manteníveis focados em eficiência e confiabilidade",
      cta: "Explorar meu trabalho",
      ctaSecondary: "Ler meu CV",
    },

    // About Section
    about: {
      title: "Sobre Mim",
      intro:
        "Sou um engenheiro backend apaixonado por projetar sistemas robustos e escaláveis.",
      description:
        "Sou um desenvolvedor backend apaixonado por **system design**, **infraestrutura em nuvem** e **automação**. Construo APIs escaláveis, implemento Infraestrutura como Código e projeto sistemas confiáveis e sustentáveis que suportam crescimento. Meu stack principal inclui **Node.js**, **TypeScript**, **Go**, **PostgreSQL**, **Docker** e **Linux**. Também sou usuário Linux de longa data — sempre experimentando configurações e otimizando ambientes para tornar o desenvolvimento mais rápido e limpo. Acredito em aprender construindo, melhorando continuamente minhas habilidades através de projetos práticos e desafios do mundo real.",
    },

    // Work Section
    work: {
      title: "Experiência Profissional",
      intro:
        "Experiências práticas construindo plataformas backend e infraestrutura para startups, equipes de saúde e iniciativas acadêmicas.",
    },

    // Projects Section
    projects: {
      badge: "Meus Projetos",
      title: "Projetos em Destaque",
      subtitle: "Confira meu trabalho mais recente",
      description:
        "Trabalhei em uma variedade de projetos, desde sites simples até aplicações web complexas. Aqui estão alguns dos meus favoritos.",
    },

    // Philosophy Section
    philosophy: {
      title: "Sempre Aprendendo, Sempre Construindo",
      text1:
        "Acredito que a melhor forma de crescer como desenvolvedor é através da experiência prática. Cada projeto é uma oportunidade para resolver problemas reais, experimentar novas tecnologias e expandir os limites do que eu sei.",
      text2:
        "Seja otimizando infraestrutura, projetando arquiteturas escaláveis ou automatizando workflows complexos — sou movido pelo desafio de construir sistemas que funcionam de forma confiável e eficiente.",
    },

    // Contact Section
    contact: {
      badge: "Contato",
      title: "Vamos Conversar",
      description:
        "Interessado em colaborar em um projeto, discutir tecnologia ou apenas quer dizer oi? Estou sempre aberto a conectar com outros desenvolvedores e explorar novas oportunidades. Sinta-se à vontade para entrar em contato através de qualquer um dos meus canais sociais abaixo!",
    },

    // Blog
    blog: {
      title: "Blog",
      subtitle:
        "Insights sobre engenharia backend, design de sistemas e DevOps",
      readMore: "Ler mais",
      back: "Voltar",
      share: "Compartilhar",
      shareOn: "Compartilhar em",
      copyLink: "Copiar link",
      linkCopied: "Link copiado!",
      shareVia: "Compartilhar via",
    },

    // Common
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
    },
  },
};

// Helper to get translation by key path (e.g., "hero.title")
export const getTranslation = (language: Language, key: string): string => {
  const keys = key.split(".");
  let value: unknown = translations[language];

  for (const k of keys) {
    if (typeof value === "object" && value !== null) {
      value = (value as Record<string, unknown>)[k];
    }
  }

  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : key;
};
