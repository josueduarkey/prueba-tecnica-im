import { useMemo, useState } from "react";
import { ProjectDetailModal } from "../components/projects/ProjectDetailModal";
import { ProjectFormModal } from "../components/projects/ProjectFormModal";
import { ProjectList } from "../components/projects/ProjectList";
import { Button } from "../components/ui/Button";
import { usePermissions } from "../hooks/usePermissions";
import { useProjects } from "../hooks/useProjects";
import { useToast } from "../hooks/useToast";
import { Permission } from "../routes/routes";
import type { Project } from "../types/project";
import type { State } from "../types/state";

const statuses: State[] = ["Pending", "In Progress", "Completed"];

export default function Dashboard() {
  const { projects, loading, error, create, update, remove } = useProjects();
  const { can } = usePermissions();
  const { notify } = useToast();
  const [editing, setEditing] = useState<Project | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [detail, setDetail] = useState<Project | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<State | "all">("all");

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesName = project.title
          .toLowerCase()
          .includes(search.trim().toLowerCase());
        const matchesStatus =
          statusFilter === "all" || project.status === statusFilter;
        return matchesName && matchesStatus;
      }),
    [projects, search, statusFilter]
  );

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setFormOpen(true);
  };

  const handleSubmit = async (values: Omit<Project, "id">) => {
    if (editing) {
      await update(editing.id, values);
      notify("Proyecto actualizado");
    } else {
      await create(values);
      notify("Proyecto creado");
    }
    setFormOpen(false);
  };

  const handleDelete = async (project: Project) => {
    await remove(project.id);
    notify("Proyecto eliminado");
  };

  const handleStatusChange = async (project: Project, status: State) => {
    await update(project.id, { status });
    notify("Estado actualizado");
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
          <p className="text-sm text-gray-500">
            Gestiona los proyectos de la organización
          </p>
        </div>
        {can(Permission.CreateProjects) && (
          <Button onClick={openCreate}>Nuevo proyecto</Button>
        )}
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nombre"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as State | "all")}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary"
        >
          <option value="all">Todos los estados</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <ProjectList
        projects={filteredProjects}
        loading={loading}
        error={error}
        onOpen={setDetail}
        onEdit={openEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <ProjectFormModal
        open={formOpen}
        project={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <ProjectDetailModal
        open={detail !== null}
        project={detail}
        onClose={() => setDetail(null)}
      />
    </div>
  );
}
