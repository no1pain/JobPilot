import type { JobStatus } from "./types";

export const STATUS_STYLES: Record<
  JobStatus,
  { badge: string; select: string }
> = {
  Interested: {
    badge: "bg-zinc-500/15 text-zinc-300 ring-zinc-500/25",
    select: "border-zinc-600 text-zinc-300",
  },
  Applied: {
    badge: "bg-sky-500/15 text-sky-300 ring-sky-500/25",
    select: "border-sky-700 text-sky-300",
  },
  Interview: {
    badge: "bg-amber-500/15 text-amber-300 ring-amber-500/25",
    select: "border-amber-700 text-amber-300",
  },
  "Technical Interview": {
    badge: "bg-orange-500/15 text-orange-300 ring-orange-500/25",
    select: "border-orange-700 text-orange-300",
  },
  Offer: {
    badge: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25",
    select: "border-emerald-700 text-emerald-300",
  },
  Rejected: {
    badge: "bg-rose-500/15 text-rose-300 ring-rose-500/25",
    select: "border-rose-700 text-rose-300",
  },
};
