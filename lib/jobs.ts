import type { DashboardStats, Job, JobStatus } from "./types";

const interviewStatuses: JobStatus[] = ["Interview", "Technical Interview"];

export function getDashboardStats(jobList: Job[] = []): DashboardStats {
  return {
    total: jobList.length,
    applied: jobList.filter((j) => j.status === "Applied").length,
    interview: jobList.filter((j) => interviewStatuses.includes(j.status))
      .length,
    offer: jobList.filter((j) => j.status === "Offer").length,
    rejected: jobList.filter((j) => j.status === "Rejected").length,
  };
}
