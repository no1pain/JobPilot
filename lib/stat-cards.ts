import type { StatCard } from "./types";

export const statCards: StatCard[] = [
  {
    key: "total",
    label: "Total vacancies",
    cardClass: "border-zinc-700 bg-zinc-900",
    valueClass: "text-zinc-100",
  },
  {
    key: "applied",
    label: "Applied",
    cardClass: "border-sky-800/50 bg-sky-950/30",
    valueClass: "text-sky-400",
  },
  {
    key: "interview",
    label: "Interview",
    cardClass: "border-amber-800/50 bg-amber-950/30",
    valueClass: "text-amber-400",
  },
  {
    key: "offer",
    label: "Offer",
    cardClass: "border-emerald-800/50 bg-emerald-950/30",
    valueClass: "text-emerald-400",
  },
  {
    key: "rejected",
    label: "Rejected",
    cardClass: "border-rose-800/50 bg-rose-950/30",
    valueClass: "text-rose-400",
  },
];
