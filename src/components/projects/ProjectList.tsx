import type { Project } from "../../types/project";
import type { State } from "../../types/state";
import { Spinner } from "../ui/Spinner";
import { ProjectCard } from "./ProjectCard";

type ProjectListProps = {
  projects: Project[];
  loading: boolean;
  error: string | null;
  onOpen: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onStatusChange: (project: Project, status: State) => void;
};

export function ProjectList({
  projects,
  loading,
  error,
  onOpen,
  onEdit,
  onDelete,
  onStatusChange,
}: ProjectListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-20 text-primary">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-danger/30 bg-danger/5 p-8 text-center text-danger">
        {error}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
        No hay proyectos para mostrar
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onOpen={onOpen}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
