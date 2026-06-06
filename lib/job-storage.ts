import { JOBS_STORAGE_KEY } from "./constants";
import type { Job } from "./types";

export function loadJobs(): Job[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(JOBS_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as Job[];
  } catch {
    return [];
  }
}

export function saveJobs(jobs: Job[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
}
