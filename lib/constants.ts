import type { JobStatus } from "./types";

export const JOBS_STORAGE_KEY = "jobpilot-jobs";

export const JOB_STATUSES: JobStatus[] = [
  "Interested",
  "Applied",
  "Interview",
  "Technical Interview",
  "Offer",
  "Rejected",
];
