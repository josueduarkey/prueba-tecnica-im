import type { Project } from "../../types/project";
import { Modal } from "../ui/Modal";
import { StatusBadge } from "../ui/StatusBadge";

type ProjectDetailModalProps = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
};

export function ProjectDetailModal({
  open,
  project,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) {
    return null;
  }

  return (
    <Modal open={open} title={project.title} onClose={onClose}>
      <div className="space-y-4">
        <StatusBadge status={project.status} />

        <p className="text-sm text-gray-600">{project.description}</p>

        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Cliente</dt>
            <dd className="font-medium text-gray-900">{project.client}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Asignado a</dt>
            <dd className="font-medium text-gray-900">{project.manager}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Fecha de inicio</dt>
            <dd className="font-medium text-gray-900">{project.startDate}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Equipo</dt>
            <dd className="font-medium text-gray-900">
              {project.teamSize} personas
            </dd>
          </div>
        </dl>
      </div>
    </Modal>
  );
}
