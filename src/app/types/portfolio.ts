/**
 * Portfolio Type Definitions
 *
 * This file contains all shared type definitions for the portfolio application.
 * Each type is carefully documented and optimized for type safety.
 */

/**
 * Links associated with a project
 *
 * @property github - URL to GitHub repository
 * @property demo - URL to live demo
 * @property website - URL to project website
 */
interface ProjectLinks {
  github?: string;
  demo?: string;
  website?: string;
}

/**
 * Project data model
 *
 * Represents a portfolio project with metadata, description, and links.
 *
 * @property id - Unique identifier for the project (required for React keys)
 * @property title - Project name
 * @property description - Brief description of the project
 * @property technologies - Array of technologies used in the project
 * @property links - Optional links to demo, code, etc.
 * @property dates - Optional date range (e.g., "2023 - 2024")
 * @property active - Whether the project is actively maintained
 * @property featured - Whether to display on home page
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  links?: ProjectLinks;
  dates?: string;
  active?: boolean;
  featured?: boolean;
}

/**
 * Generic API response wrapper
 *
 * All API responses should follow this structure for consistency.
 *
 * @template T - The type of data being returned
 * @property data - The response payload
 * @property success - Whether the request was successful
 * @property error - Optional error message if success is false
 */
export type ApiResponse<T> = {
  data: T;
  success: boolean;
  error?: string;
};

/**
 * Work experience entry
 *
 * Represents a position held at a company.
 *
 * @property company - Company name
 * @property title - Job title
 * @property location - Work location
 * @property start - Start date (e.g., "Jan 2023")
 * @property end - End date (e.g., "Present")
 * @property description - Optional job description
 * @property href - Optional link to company website
 */
export interface WorkExperience {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  description?: string;
  href?: string;
}

/**
 * Education entry
 *
 * Represents a degree or educational program.
 *
 * @property school - School/university name
 * @property degree - Degree name (e.g., "Bachelor of Science")
 * @property start - Start date
 * @property end - End date
 * @property href - Optional link to school website
 */
export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
  href?: string;
}

/**
 * Blog post with rendered content
 *
 * Represents a complete blog post including content.
 *
 * @property slug - URL slug for the post
 * @property title - Post title
 * @property date - Publication date
 * @property excerpt - Short description
 * @property tags - Array of post tags
 * @property content - Full post content (rendered HTML)
 */
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

/**
 * Blog post metadata without content
 *
 * Lightweight version of BlogPost used in lists.
 * Prevents loading full content for list views.
 *
 * @property slug - URL slug for the post
 * @property title - Post title
 * @property date - Publication date
 * @property excerpt - Short description
 * @property tags - Array of post tags
 */
export interface BlogMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

/**
 * Skill category grouping
 *
 * Used to organize skills into categories for display.
 *
 * @property category - Category name (e.g., "Backend", "DevOps")
 * @property items - Array of skill names in this category
 */
export interface SkillCategory {
  category: string;
  items: string[];
}
