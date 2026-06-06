import {
  addJob,
  changeJobStatus,
  removeJob,
  updateJob,
  type JobFormData,
} from "./job-actions";
import { loadJobs, saveJobs } from "./job-storage";
import { generateRandomJobs } from "./random-job";
import type { Job, JobStatus } from "./types";

let jobs: Job[] | null = null;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function getJobs(): Job[] {
  if (jobs === null) {
    jobs = loadJobs();
  }
  return jobs;
}

function setJobs(nextJobs: Job[]) {
  jobs = nextJobs;
  saveJobs(nextJobs);
  emitChange();
}

export function subscribeToJobs(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getJobsSnapshot(): Job[] {
  return getJobs();
}

const SERVER_SNAPSHOT: Job[] = [];

export function getJobsServerSnapshot(): Job[] {
  return SERVER_SNAPSHOT;
}

export function createJob(data: JobFormData) {
  setJobs(addJob(getJobs(), data));
}

export function createRandomJobs(count = 3) {
  let nextJobs = getJobs();
  for (const data of generateRandomJobs(count)) {
    nextJobs = addJob(nextJobs, data);
  }
  setJobs(nextJobs);
}

export function editJob(id: string, data: JobFormData) {
  setJobs(updateJob(getJobs(), id, data));
}

export function deleteJob(id: string) {
  setJobs(removeJob(getJobs(), id));
}

export function updateJobStatus(id: string, status: JobStatus) {
  setJobs(changeJobStatus(getJobs(), id, status));
}

export function reorderJobs(reorderedJobs: Job[]) {
  setJobs(reorderedJobs);
}
