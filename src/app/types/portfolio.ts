export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  links?: {
    github?: string;
    demo?: string;
    website?: string;
  };
  dates?: string;
  active?: boolean;
  featured?: boolean;
}

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  error?: string;
};

export interface WorkExperience {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  description?: string;
  href?: string;
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
  href?: string;
}
