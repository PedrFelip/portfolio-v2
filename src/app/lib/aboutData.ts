import type { Education, WorkExperience } from "@/types/portfolio";
import { socialLinks } from "./links";

export const getWorkExperience = (language: "en" | "pt"): WorkExperience[] => {
  if (language === "pt") {
    return [
      {
        company: "MhGestão",
        title: "Estagiário Backend",
        location: "Brasília, Brasil",
        start: "Nov 2025",
        end: "Presente",
        description:
          "[Descrição das suas responsabilidades e conquistas no MhGestão - será preenchido depois]",
      },
    ];
  }

  return [
    {
      company: "MhGestão",
      title: "Backend Intern",
      location: "Brasília, Brazil",
      start: "Nov 2025",
      end: "Present",
      description:
        "[Description of your responsibilities and achievements at MhGestão - to be filled later]",
    },
  ];
};

export const getEducation = (language: "en" | "pt"): Education[] => {
  if (language === "pt") {
    return [
      {
        school: "UNICEPLAC",
        degree: "Engenharia de Software",
        start: "2024",
        end: "2028",
      },
    ];
  }

  return [
    {
      school: "UNICEPLAC",
      degree: "Software Engineering",
      start: "2024",
      end: "2028",
    },
  ];
};

export const getContactLinks = (_language: "en" | "pt") => {
  // Filter to get GitHub, LinkedIn, and Email only
  const contactLinks = socialLinks
    .filter(
      (link) =>
        link.icon === "github" ||
        link.icon === "linkedin" ||
        link.icon === "email",
    )
    .map((link) => ({
      label: link.label,
      url: link.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
      icon: link.icon as "github" | "linkedin" | "email",
    }));

  return contactLinks;
};
