import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Project } from "../../types/project";
import type { State } from "../../types/state";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Spinner } from "../ui/Spinner";

const statuses: State[] = ["Pending", "In Progress", "Completed"];

const emptyForm = {
  title: "",
  client: "",
  description: "",
  status: "Pending" as State,
  startDate: "",
  manager: "",
  teamSize: 1,
};

const fieldClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary";

type ProjectFormModalProps = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSubmit: (values: Omit<Project, "id">) => Promise<void>;
};

export function ProjectFormModal({
  open,
  project,
  onClose,
  onSubmit,
}: ProjectFormModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title,
        client: project.client,
        description: project.description,
        status: project.status,
        startDate: project.startDate,
        manager: project.manager,
        teamSize: project.teamSize,
      });
    } else {
      setForm(emptyForm);
    }
  }, [project, open]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({ ...form, teamSize: Number(form.teamSize) });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      title={project ? "Editar proyecto" : "Nuevo proyecto"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            value={form.title}
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Cliente
          </label>
          <input
            value={form.client}
            onChange={(event) =>
              setForm({ ...form, client: event.target.value })
            }
            required
            className={fieldClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            required
            rows={3}
            className={fieldClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value as State })
              }
              className={fieldClass}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Inicio
            </label>
            <input
              type="date"
              value={form.startDate}
              onChange={(event) =>
                setForm({ ...form, startDate: event.target.value })
              }
              required
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Responsable
            </label>
            <input
              value={form.manager}
              onChange={(event) =>
                setForm({ ...form, manager: event.target.value })
              }
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Equipo
            </label>
            <input
              type="number"
              min={1}
              value={form.teamSize}
              onChange={(event) =>
                setForm({ ...form, teamSize: Number(event.target.value) })
              }
              required
              className={fieldClass}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? <Spinner /> : "Guardar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
