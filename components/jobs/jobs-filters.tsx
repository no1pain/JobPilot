"use client";

import { JOB_PRIORITIES } from "@/lib/constants";
import type { JobFilters } from "@/lib/filter-jobs";
import { ui } from "@/lib/ui";
import type { JobPriority } from "@/lib/types";

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
        <span className="sr-only">Filter by priority</span>
        <select
          value={filters.priority}
          onChange={(e) =>
            onChange({
              ...filters,
              priority: e.target.value as JobPriority | "all",
            })
          }
          className={ui.input}
        >
          <option value="all">All priorities</option>
          {JOB_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
