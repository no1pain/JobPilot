import type { Job, JobPriority, JobStatus } from "./types";

export type JobFormData = {
  company: string;
  position: string;
  minSalary?: string;
  maxSalary?: string;
  status: JobStatus;
  notes?: string;
  appliedDate?: string;
  priority?: JobPriority;
};

function trimOptional(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function addJob(jobs: Job[], data: JobFormData): Job[] {
  let salary: string | undefined;
  if (data.minSalary || data.maxSalary) {
    const min = data.minSalary ? `${data.minSalary}k` : "";
    const max = data.maxSalary ? `${data.maxSalary}k` : "";
    salary = min && max ? `$${min}-$${max}` : min ? `$${min}` : `$${max}`;
  }

  const job: Job = {
    id: crypto.randomUUID(),
    company: data.company.trim(),
    position: data.position.trim(),
    salary: trimOptional(salary),
    status: data.status,
    notes: trimOptional(data.notes),
    createdAt: new Date().toISOString(),
    appliedDate: trimOptional(data.appliedDate),
    priority: data.priority,
  };

  return [...jobs, job];
}

export function updateJob(
  jobs: Job[],
  id: string,
  data: JobFormData,
): Job[] {
  let salary: string | undefined;
  if (data.minSalary || data.maxSalary) {
    const min = data.minSalary ? `${data.minSalary}k` : "";
    const max = data.maxSalary ? `${data.maxSalary}k` : "";
    salary = min && max ? `$${min}-$${max}` : min ? `$${min}` : `$${max}`;
  }

  return jobs.map((job) =>
    job.id === id
      ? {
          ...job,
          company: data.company.trim(),
          position: data.position.trim(),
          salary: trimOptional(salary),
          status: data.status,
          notes: trimOptional(data.notes),
          appliedDate: trimOptional(data.appliedDate),
          priority: data.priority,
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
