"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { JOB_STATUSES } from "@/lib/constants";
import { filterJobs, type JobFilters } from "@/lib/filter-jobs";
import type { JobFormData } from "@/lib/job-actions";
import { ui } from "@/lib/ui";
import type { Job, JobStatus } from "@/lib/types";
import { useTranslation } from "@/lib/translations-context";
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
  onReorder?: (jobs: Job[]) => void;
};

const defaultFilters: JobFilters = {
  search: "",
  priority: "all",
};

export function JobsSection({
  jobs,
  onCreate,
  onAddRandom,
  onEdit,
  onDelete,
  onStatusChange,
  onReorder,
}: JobsSectionProps) {
  const { t } = useTranslation();
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [filters, setFilters] = useState<JobFilters>(defaultFilters);
  const [draggedJob, setDraggedJob] = useState<Job | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<JobStatus | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const filteredJobs = useMemo(
    () => filterJobs(jobs, filters),
    [jobs, filters],
  );

  const jobsByStatus = useMemo(() => {
    const grouped: Record<JobStatus, Job[]> = {
      Interested: [],
      Applied: [],
      Interview: [],
      "Technical Interview": [],
      Offer: [],
      Rejected: [],
    };
    filteredJobs.forEach((job) => {
      grouped[job.status].push(job);
    });
    return grouped;
  }, [filteredJobs]);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.priority !== "all";

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

  function handleFiltersChange(newFilters: JobFilters) {
    setFilters(newFilters);
  }

  function handleDragStart(job: Job) {
    setDraggedJob(job);
  }

  function handleDragOver(e: React.DragEvent, status: JobStatus, index?: number) {
    e.preventDefault();
    setDragOverStatus(status);
    if (index !== undefined) {
      setDragOverIndex(index);
    }
  }

  function handleDragLeave() {
    setDragOverStatus(null);
    setDragOverIndex(null);
  }

  function handleDrop(status: JobStatus, index?: number) {
    if (draggedJob) {
      if (draggedJob.status !== status) {
        // Moving to different section
        onStatusChange(draggedJob.id, status);
      } else if (index !== undefined && draggedJob.status === status && onReorder) {
        // Reordering within same section
        const statusJobs = jobsByStatus[status];
        const currentIndex = statusJobs.findIndex(j => j.id === draggedJob.id);
        if (currentIndex !== -1 && currentIndex !== index) {
          const reorderedJobs = [...jobs];
          const jobIndex = reorderedJobs.findIndex(j => j.id === draggedJob.id);
          if (jobIndex !== -1) {
            const [removed] = reorderedJobs.splice(jobIndex, 1);
            // Calculate the new index in the full jobs array
            const targetSectionJobs = reorderedJobs.filter(j => j.status === status);
            const targetJob = targetSectionJobs[index];
            const targetIndex = targetJob ? reorderedJobs.findIndex(j => j.id === targetJob.id) : reorderedJobs.length;
            reorderedJobs.splice(targetIndex, 0, removed);
            onReorder(reorderedJobs);
          }
        }
      }
    }
    setDraggedJob(null);
    setDragOverStatus(null);
    setDragOverIndex(null);
  }

  return (
    <section className="w-full">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className={ui.sectionTitle}>{t("jobs.title")}</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={onAddRandom}>
            {t("jobs.addRandom")}
          </Button>
          <Button onClick={openAddForm}>{t("jobs.addVacancy")}</Button>
        </div>
      </div>

      {jobs.length > 0 && (
        <JobsFilters filters={filters} onChange={handleFiltersChange} />
      )}

      {jobs.length === 0 ? (
        <EmptyState
          title={t("jobs.noVacancies")}
          description={t("jobs.noVacanciesDesc")}
          action={{ label: t("jobs.addVacancy"), onClick: openAddForm }}
        />
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          title={t("jobs.noMatches")}
          description={t("jobs.noMatchesDesc")}
          action={
            hasActiveFilters
              ? {
                label: t("jobs.clearFilters"),
                onClick: () => setFilters(defaultFilters),
              }
              : undefined
          }
        />
      ) : (
        <div className="space-y-6">
          {JOB_STATUSES.map((status) => {
            const statusJobs = jobsByStatus[status];
            return (
              <div
                key={status}
                className={`space-y-3 transition-colors ${dragOverStatus === status
                  ? "bg-[var(--muted)]/50 border-[var(--muted-foreground)]"
                  : ""
                  }`}
                onDragOver={(e) => handleDragOver(e, status)}
                onDragLeave={handleDragLeave}
                onDrop={() => handleDrop(status)}
              >
                <div className="border-b border-[var(--border)] pb-2">
                  <h3 className="font-semibold text-[var(--card-foreground)]">
                    {status} ({statusJobs.length})
                  </h3>
                </div>
                {statusJobs.length === 0 ? (
                  <>
                    <p className="text-sm text-[var(--muted-foreground)]">{t("jobs.noJobs")}</p>
                    {dragOverStatus === status && draggedJob && (
                      <div className="min-w-[280px] max-w-[280px] opacity-50">
                        <JobCard
                          job={draggedJob}
                          onEdit={setEditingJob}
                          onDelete={onDelete}
                          onStatusChange={onStatusChange}
                          onDragStart={handleDragStart}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {statusJobs.map((job, index) => (
                      <div
                        key={job.id}
                        className="min-w-[280px] max-w-[280px]"
                        onDragOver={(e) => handleDragOver(e, status, index)}
                        onDrop={() => handleDrop(status, index)}
                      >
                        <JobCard
                          job={job}
                          onEdit={setEditingJob}
                          onDelete={onDelete}
                          onStatusChange={onStatusChange}
                          onDragStart={handleDragStart}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
