import { projects } from "@/lib/data";
import type { ApiResponse, Project } from "@/types/portfolio";

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
