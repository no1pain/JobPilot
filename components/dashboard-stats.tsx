import { ui } from "@/lib/ui";
import type { DashboardStats } from "@/lib/types";
import { useTranslation } from "@/lib/translations-context";

type DashboardStatsProps = {
  stats: DashboardStats;
};

const statKeys = [
  { key: "total", cardClass: "border-zinc-700 bg-zinc-900", valueClass: "text-zinc-100" },
  { key: "applied", cardClass: "border-sky-800/50 bg-sky-950/30", valueClass: "text-sky-400" },
  { key: "interview", cardClass: "border-amber-800/50 bg-amber-950/30", valueClass: "text-amber-400" },
  { key: "offer", cardClass: "border-emerald-800/50 bg-emerald-950/30", valueClass: "text-emerald-400" },
  { key: "rejected", cardClass: "border-rose-800/50 bg-rose-950/30", valueClass: "text-rose-400" },
];

export function DashboardStats({ stats }: DashboardStatsProps) {
  const { t } = useTranslation();

  return (
    <section className="w-full">
      <h2 className={`mb-4 ${ui.sectionTitle}`}>{t("dashboard.title")}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {statKeys.map(({ key, cardClass, valueClass }) => (
          <div
            key={key}
            className={`rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 ${cardClass}`}
          >
            <p className="text-xs font-medium text-[var(--muted-foreground)]">{t(`stats.${key}`)}</p>
            <p className={`mt-1 text-2xl font-bold tabular-nums ${valueClass}`}>
              {stats[key as keyof DashboardStats]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
