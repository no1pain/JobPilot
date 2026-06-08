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
  } catch (error) {
    console.error("Failed to load jobs from localStorage:", error);
    return [];
  }
}

export function saveJobs(jobs: Job[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
  } catch (error) {
    console.error("Failed to save jobs to localStorage:", error);

    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      try {
        const essentialJobs = jobs.slice(-50);
        localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(essentialJobs));
        console.warn("Saved only last 50 jobs due to storage quota limit");
      } catch (retryError) {
        console.error("Failed to save even reduced jobs data:", retryError);
      }
    }
  }
}
