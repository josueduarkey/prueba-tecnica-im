import { useCallback, useEffect, useState } from "react";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../services/projects.service";
import type { Project } from "../types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProjects(await getProjects());
    } catch {
      setError("No se pudieron cargar los proyectos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = async (input: Omit<Project, "id">) => {
    const project = await createProject(input);
    setProjects((current) => [project, ...current]);
  };

  const update = async (id: number, changes: Partial<Project>) => {
    const updated = await updateProject(id, changes);
    setProjects((current) =>
      current.map((project) => (project.id === id ? updated : project))
    );
  };

  const remove = async (id: number) => {
    await deleteProject(id);
    setProjects((current) => current.filter((project) => project.id !== id));
  };

  return { projects, loading, error, reload: load, create, update, remove };
}
