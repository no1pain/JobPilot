"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { filterJobs, type JobFilters } from "@/lib/filter-jobs";
import type { JobFormData } from "@/lib/job-actions";
import { ui } from "@/lib/ui";
import type { Job, JobStatus } from "@/lib/types";
import { JobCard } from "./job-card";
import { JobForm } from "./job-form";
import { JobsFilters } from "./jobs-filters";

type JobsSectionProps = {
  jobs: Job[];
  onCreate: (data: JobFormData) => void;
  onAddRandom: () => void;
  onEdit: (id: string, data: JobFormData) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: JobStatus) => void;
};

const defaultFilters: JobFilters = {
  search: "",
  status: "all",
};

export function JobsSection({
  jobs,
  onCreate,
  onAddRandom,
  onEdit,
  onDelete,
  onStatusChange,
}: JobsSectionProps) {
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [filters, setFilters] = useState<JobFilters>(defaultFilters);

  const filteredJobs = useMemo(
    () => filterJobs(jobs, filters),
    [jobs, filters],
  );

  const hasActiveFilters =
    filters.search.trim() !== "" || filters.status !== "all";

  function handleFormSubmit(data: JobFormData) {
    if (editingJob) {
      onEdit(editingJob.id, data);
      setEditingJob(null);
    } else {
      onCreate(data);
      setIsAdding(false);
    }
  }

  function handleFormCancel() {
    setEditingJob(null);
    setIsAdding(false);
  }

  function openAddForm() {
    setEditingJob(null);
    setIsAdding(true);
  }

  return (
    <section className="w-full">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className={ui.sectionTitle}>Vacancies</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={onAddRandom}>
            Add 3 random
          </Button>
          <Button onClick={openAddForm}>Add vacancy</Button>
        </div>
      </div>

      {jobs.length > 0 && (
        <JobsFilters filters={filters} onChange={setFilters} />
      )}

      {jobs.length === 0 ? (
        <EmptyState
          title="No vacancies yet"
          description="Start tracking your job search by adding your first application."
          action={{ label: "Add vacancy", onClick: openAddForm }}
        />
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          title="No matches found"
          description="Try adjusting your search or status filter."
          action={
            hasActiveFilters
              ? {
                  label: "Clear filters",
                  onClick: () => setFilters(defaultFilters),
                }
              : undefined
          }
        />
      ) : (
        <ul className="space-y-3">
          {filteredJobs.map((job) => (
            <li key={job.id}>
              <JobCard
                job={job}
                onEdit={setEditingJob}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            </li>
          ))}
        </ul>
      )}

      {(isAdding || editingJob) && (
        <JobForm
          job={editingJob ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </section>
  );
}
