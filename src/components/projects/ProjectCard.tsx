import { useState } from "react";
import type { Project } from "../../types/project";
import type { State } from "../../types/state";
import { usePermissions } from "../../hooks/usePermissions";
import { Permission } from "../../routes/routes";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { StatusBadge } from "../ui/StatusBadge";

const statuses: State[] = ["Pending", "In Progress", "Completed"];

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onStatusChange: (project: Project, status: State) => void;
};

export function ProjectCard({
  project,
  onOpen,
  onEdit,
  onDelete,
  onStatusChange,
}: ProjectCardProps) {
  const { can } = usePermissions();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const canManage = can(Permission.EditProjects) || can(Permission.DeleteProjects);

  return (
    <article
      onClick={() => onOpen(project)}
      className="flex cursor-pointer flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900">{project.title}</h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="mb-4 line-clamp-2 flex-1 text-sm text-gray-600">
        {project.description}
      </p>

      {can(Permission.UpdateStatus) && (
        <label className="mb-3 block" onClick={(event) => event.stopPropagation()}>
          <span className="mb-1 block text-xs font-medium text-gray-500">
            Actualizar estado
          </span>
          <select
            value={project.status}
            onChange={(event) =>
              onStatusChange(project, event.target.value as State)
            }
            className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-900 outline-none focus:border-primary"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      )}

      {canManage && (
        <div className="flex gap-2" onClick={(event) => event.stopPropagation()}>
          {can(Permission.EditProjects) && (
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => onEdit(project)}
            >
              Editar
            </Button>
          )}
          {can(Permission.DeleteProjects) && (
            <Button
              variant="danger"
              className="flex-1"
              onClick={() => setConfirmOpen(true)}
            >
              Eliminar
            </Button>
          )}
        </div>
      )}

      <div onClick={(event) => event.stopPropagation()}>
        <Modal
          open={confirmOpen}
          title="Eliminar proyecto"
          onClose={() => setConfirmOpen(false)}
        >
          <p className="mb-6 text-sm text-gray-600">
            ¿Seguro que deseas eliminar "{project.title}"?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onDelete(project);
                setConfirmOpen(false);
              }}
            >
              Eliminar
            </Button>
          </div>
        </Modal>
      </div>
    </article>
  );
}
