export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  createdAt: Date;
}

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  error?: string;
};
