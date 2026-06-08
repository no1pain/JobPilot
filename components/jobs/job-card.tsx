"use client";

import { Button } from "@/components/ui/button";
import { DragHandle } from "@/components/icons/drag-handle";
import { JOB_STATUSES } from "@/lib/constants";
import { STATUS_STYLES } from "@/lib/status-styles";
import { ui } from "@/lib/ui";
import type { Job, JobStatus } from "@/lib/types";

type JobCardProps = {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: JobStatus) => void;
  onDragStart: (job: Job) => void;
};

export function JobCard({
  job,
  onEdit,
  onDelete,
  onStatusChange,
  onDragStart,
}: JobCardProps) {
  const statusStyle = STATUS_STYLES[job.status];

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const parseSalary = (salary: string): number => {
    const matches = salary.match(/\d+/g);
    if (!matches) return 0;
    const numbers = matches.map(Number);
    return Math.max(...numbers);
  };

  const getSalaryColor = (salary: string): string => {
    const value = parseSalary(salary);
    if (value < 40) return "text-red-400";
    if (value < 80) return "text-yellow-400";
    if (value < 120) return "text-green-400";
    return "text-emerald-400";
  };

  const getPriorityColor = (priority?: string): string => {
    switch (priority) {
      case "Low":
        return "text-zinc-400";
      case "Medium":
        return "text-yellow-400";
      case "High":
        return "text-red-400";
      default:
        return "text-zinc-400";
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("jobId", job.id);
    e.dataTransfer.effectAllowed = "move";
    onDragStart(job);
  };

  return (
    <article
      className={`${ui.card} p-4 transition-colors hover:border-zinc-700 overflow-hidden relative`}
    >
      <div
        className="absolute top-2 right-2 cursor-grab text-zinc-500 hover:text-zinc-300 hidden lg:block"
        draggable
        onDragStart={handleDragStart}
      >
        <DragHandle />
      </div>

      <div className="space-y-3 pr-6">
        <div className="min-w-0">
          <h4 className={`font-semibold text-sm ${ui.textPrimary} truncate`}>
            {job.position}
          </h4>
          <p className={`text-xs ${ui.textSecondary} truncate`}>{job.company}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {job.salary && (
            <span className={`font-medium ${getSalaryColor(job.salary)} truncate`}>
              {job.salary}
            </span>
          )}
          {job.priority && (
            <span className={`font-medium ${getPriorityColor(job.priority)}`}>
              {job.priority}
            </span>
          )}
        </div>

        {job.appliedDate && (
          <p className={`text-xs ${ui.textMuted} truncate`}>
            Applied: {formatDate(job.appliedDate)}
          </p>
        )}

        <div className="flex gap-2 pt-2">
          <select
            value={job.status}
            onChange={(e) =>
              onStatusChange(job.id, e.target.value as JobStatus)
            }
            aria-label={`Change status for ${job.position}`}
            className={`flex-1 min-w-[100px] rounded border bg-zinc-950 px-2 py-1.5 text-xs outline-none transition-colors focus:ring-1 focus:ring-zinc-500/40 ${statusStyle.select}`}
          >
            {JOB_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(job)}
            className="px-2 py-1.5 text-xs whitespace-nowrap"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(job.id)}
            className="px-2 py-1.5 text-xs whitespace-nowrap"
          >
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}
