import type { ApiResponse, Project } from "@/types/portfolio";

const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Backend",
    description: "A modern backend portfolio built with Next.js and Bun",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/pedrofelipe/portfolio-v2",
    createdAt: new Date("2025-01-13"),
  },
];

export const GET = async (): Promise<Response> => {
  try {
    const response: ApiResponse<Project[]> = {
      data: projects,
      success: true,
    };
    return Response.json(response);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json(
      { error: "Failed to fetch projects", success: false },
      { status: 500 },
    );
  }
};
