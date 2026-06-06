import { STATUS_STYLES } from "@/lib/status-styles";
import type { JobStatus } from "@/lib/types";

type StatusBadgeProps = {
  status: JobStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status].badge}`}
    >
      {status}
    </span>
  );
}
