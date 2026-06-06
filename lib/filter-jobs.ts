import type { Job, JobStatus } from "./types";

export type JobFilters = {
  search: string;
  status: JobStatus | "all";
};

export function filterJobs(jobs: Job[], filters: JobFilters): Job[] {
  const query = filters.search.trim().toLowerCase();

  return jobs.filter((job) => {
    const matchesSearch =
      !query ||
      job.company.toLowerCase().includes(query) ||
      job.position.toLowerCase().includes(query);

    const matchesStatus =
      filters.status === "all" || job.status === filters.status;

    return matchesSearch && matchesStatus;
  });
}
