"use client";

import { JOB_STATUSES } from "@/lib/constants";
import type { JobFilters } from "@/lib/filter-jobs";
import { ui } from "@/lib/ui";
import type { JobStatus } from "@/lib/types";

type JobsFiltersProps = {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
};

export function JobsFilters({ filters, onChange }: JobsFiltersProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row">
      <label className="flex-1">
        <span className="sr-only">Search by company or position</span>
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search by company or position..."
          className={ui.input}
        />
      </label>

      <label className="sm:w-52">
        <span className="sr-only">Filter by status</span>
        <select
          value={filters.status}
          onChange={(e) =>
            onChange({
              ...filters,
              status: e.target.value as JobStatus | "all",
            })
          }
          className={ui.input}
        >
          <option value="all">All statuses</option>
          {JOB_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
