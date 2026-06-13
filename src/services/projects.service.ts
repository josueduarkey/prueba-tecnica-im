import projectsData from "../data/projects.json";
import { simulateRequest } from "./http";
import type { Project } from "../types/project";

let projects = projectsData as unknown as Project[];

export function getProjects(): Promise<Project[]> {
  return simulateRequest([...projects]);
}

export function createProject(input: Omit<Project, "id">): Promise<Project> {
  const project: Project = { ...input, id: Date.now() };
  projects = [project, ...projects];
  return simulateRequest(project);
}

export function updateProject(
  id: number,
  changes: Partial<Project>
): Promise<Project> {
  projects = projects.map((project) =>
    project.id === id ? { ...project, ...changes } : project
  );
  const updated = projects.find((project) => project.id === id) as Project;
  return simulateRequest(updated);
}

export function deleteProject(id: number): Promise<number> {
  projects = projects.filter((project) => project.id !== id);
  return simulateRequest(id);
}
