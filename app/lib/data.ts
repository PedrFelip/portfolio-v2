import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "oportune",
    title: "Oportune+",
    description:
      "Web platform connecting students, professors, and companies to centralize opportunities for early career professionals. Built with microservices architecture using Node.js, Fastify, React, and Go.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Fastify",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Go",
      "Python",
      "Tailwind CSS",
    ],
    links: {
      github: "https://github.com/PedrFelip/oportune",
    },
    dates: "2024 - Present",
    active: true,
    featured: true,
  },
  {
    id: "saude-pontual",
    title: "Saúde Pontual",
    description:
      "Medical appointment scheduling system with robust backend architecture. Developed the API infrastructure handling appointment management, patient data, and business logic. Implemented JWT authentication, database migrations, and Docker containerization.",
    technologies: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Docker",
      "JWT",
      "API REST",
      "React",
    ],
    links: {
      github: "https://github.com/gabbzin/saude_pontual",
    },
    dates: "Feb 2025 - Jul 2025",
    active: true,
    featured: true,
  },
  {
    id: "plan-it-calendar",
    title: "Plan It - Calendar",
    description:
      "Academic project built using Scrum methodology. An intuitive calendar application for event management with create, edit, and delete functionality. Developed as part of practical learning of agile development practices.",
    technologies: ["JavaScript", "Electron", "SQLite", "Node.js", "Scrum"],
    links: {
      github: "https://github.com/PedrFelip/Calendario-scrum",
    },
    dates: "2024",
    active: true,
    featured: true,
  },
  {
    id: "api-financeiro",
    title: "API Financeiro",
    description:
      "Financial transactions management API built with TypeScript and Fastify for high performance. Features modern REST architecture with SQLite database, Knex query builder for optimized queries, Zod validation for type-safe data handling.",
    technologies: ["TypeScript", "Fastify", "SQLite", "Knex", "Zod", "Node.js"],
    links: {
      github: "https://github.com/PedrFelip/api-financeiro",
    },
    active: true,
    featured: false,
  },
  {
    id: "notes-api",
    title: "Notes API",
    description:
      "Simple REST API for note management built with Node.js, Fastify, and TypeScript. Features include CRUD operations, data validation with Zod, Prisma ORM for PostgreSQL, and Docker containerization.",
    technologies: [
      "Node.js",
      "Fastify",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Zod",
    ],
    links: {
      github: "https://github.com/PedrFelip/notes-api",
    },
    active: true,
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
