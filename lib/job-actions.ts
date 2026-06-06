import type { Job, JobStatus } from "./types";

export type JobFormData = {
  company: string;
  position: string;
  salary?: string;
  status: JobStatus;
  notes?: string;
};

function trimOptional(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function addJob(jobs: Job[], data: JobFormData): Job[] {
  const job: Job = {
    id: crypto.randomUUID(),
    company: data.company.trim(),
    position: data.position.trim(),
    salary: trimOptional(data.salary),
    status: data.status,
    notes: trimOptional(data.notes),
    createdAt: new Date().toISOString(),
  };

  return [...jobs, job];
}

export function updateJob(
  jobs: Job[],
  id: string,
  data: JobFormData,
): Job[] {
  return jobs.map((job) =>
    job.id === id
      ? {
          ...job,
          company: data.company.trim(),
          position: data.position.trim(),
          salary: trimOptional(data.salary),
          status: data.status,
          notes: trimOptional(data.notes),
        }
      : job,
  );
}

export function removeJob(jobs: Job[], id: string): Job[] {
  return jobs.filter((job) => job.id !== id);
}

export function changeJobStatus(
  jobs: Job[],
  id: string,
  status: JobStatus,
): Job[] {
  return jobs.map((job) => (job.id === id ? { ...job, status } : job));
}
