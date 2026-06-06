"use client";

import { useSyncExternalStore } from "react";
import { getDashboardStats } from "@/lib/jobs";
import {
  createJob,
  createRandomJobs,
  deleteJob,
  editJob,
  getJobsServerSnapshot,
  getJobsSnapshot,
  subscribeToJobs,
  updateJobStatus,
} from "@/lib/jobs-store";

export function useJobs() {
  const jobs = useSyncExternalStore(
    subscribeToJobs,
    getJobsSnapshot,
    getJobsServerSnapshot,
  );

  return {
    jobs,
    stats: getDashboardStats(jobs),
    createJob,
    createRandomJobs,
    editJob,
    deleteJob,
    updateStatus: updateJobStatus,
  };
}
