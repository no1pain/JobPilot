"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { JOB_STATUSES } from "@/lib/constants";
import { STATUS_STYLES } from "@/lib/status-styles";
import { ui } from "@/lib/ui";
import type { Job, JobStatus } from "@/lib/types";

type JobCardProps = {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: JobStatus) => void;
};

export function JobCard({
  job,
  onEdit,
  onDelete,
  onStatusChange,
}: JobCardProps) {
  const statusStyle = STATUS_STYLES[job.status];

  return (
    <article
      className={`${ui.card} p-5 transition-colors hover:border-zinc-700`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`font-semibold ${ui.textPrimary}`}>
              {job.position}
            </h3>
            <StatusBadge status={job.status} />
          </div>
          <p className={ui.textSecondary}>{job.company}</p>
          {job.salary && (
            <p className={`text-sm ${ui.textMuted}`}>{job.salary}</p>
          )}
          {job.notes && (
            <p className={`text-sm leading-relaxed ${ui.textMuted}`}>
              {job.notes}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:min-w-[10rem] sm:items-stretch">
          <select
            value={job.status}
            onChange={(e) =>
              onStatusChange(job.id, e.target.value as JobStatus)
            }
            aria-label={`Change status for ${job.position}`}
            className={`rounded-lg border bg-zinc-950 px-3 py-2 text-sm outline-none transition-colors focus:ring-1 focus:ring-zinc-500/40 ${statusStyle.select}`}
          >
            {JOB_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(job)}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(job.id)}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
