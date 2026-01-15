export const HOME_TECH_STACK = [
  "Node.js",
  "TypeScript",
  "NestJS",
  "PostgreSQL",
  "Docker",
  "Linux",
] as const;

export type TechStackType = (typeof HOME_TECH_STACK)[number];
