import { getSkills, type SkillGroup } from "./shared-data";

export const getHomeData = (language: "en" | "pt") => {
  const skills = getSkills(language);

  return {
    skills,
  };
};

export const getHomeSkills = (language: "en" | "pt"): SkillGroup[] => {
  return getSkills(language);
};
