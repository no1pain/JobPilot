"use client";

import { AppHeader } from "@/components/app-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { JobsSection } from "@/components/jobs/jobs-section";
import { useJobs } from "@/hooks/use-jobs";

export function HomePage() {
  const {
    jobs,
    stats,
    createJob,
    createRandomJobs,
    editJob,
    deleteJob,
    updateStatus,
    reorderJobs,
  } = useJobs();

  return (
    <div className="min-h-screen">
      <AppHeader />

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col gap-10">
          <DashboardStats stats={stats} />

          <JobsSection
            jobs={jobs}
            onCreate={createJob}
            onAddRandom={() => createRandomJobs(3)}
            onEdit={editJob}
            onDelete={deleteJob}
            onStatusChange={updateStatus}
            onReorder={reorderJobs}
          />
        </div>
      </main>
    </div>
  );
}
