import type { Job, JobPriority } from "./types";

export type JobFilters = {
  search: string;
  priority: JobPriority | "all";
};

export function filterJobs(jobs: Job[], filters: JobFilters): Job[] {
  const query = filters.search.trim().toLowerCase();

  return jobs.filter((job) => {
    const matchesSearch =
      !query ||
      job.company.toLowerCase().includes(query) ||
      job.position.toLowerCase().includes(query);

    const matchesPriority =
      filters.priority === "all" || job.priority === filters.priority;

    return matchesSearch && matchesPriority;
  });
}
