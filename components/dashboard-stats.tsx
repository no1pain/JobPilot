import { statCards } from "@/lib/stat-cards";
import { ui } from "@/lib/ui";
import type { DashboardStats } from "@/lib/types";

type DashboardStatsProps = {
  stats: DashboardStats;
};

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section className="w-full">
      <h2 className={`mb-4 ${ui.sectionTitle}`}>Dashboard</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {statCards.map(({ key, label, cardClass, valueClass }) => (
          <div
            key={key}
            className={`rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 ${cardClass}`}
          >
            <p className="text-xs font-medium text-[var(--muted-foreground)]">{label}</p>
            <p className={`mt-1 text-2xl font-bold tabular-nums ${valueClass}`}>
              {stats[key]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
