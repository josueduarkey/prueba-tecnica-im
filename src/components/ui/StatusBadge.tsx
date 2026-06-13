import type { State } from "../../types/state";

const styles: Record<State, string> = {
  "In Progress": "bg-info/10 text-info",
  Pending: "bg-warning/10 text-warning",
  Completed: "bg-success/10 text-success",
};

export function StatusBadge({ status }: { status: State }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
