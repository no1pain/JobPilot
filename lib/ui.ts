export const ui = {
  sectionTitle:
    "text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]",
  card: "rounded-xl border border-[var(--border)] bg-[var(--card)]",
  input:
    "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none transition-colors focus:border-[var(--muted-foreground)] focus:ring-1 focus:ring-[var(--muted-foreground)]/40",
  label: "mb-1.5 block text-sm font-medium text-[var(--muted-foreground)]",
  textPrimary: "text-[var(--card-foreground)]",
  textSecondary: "text-[var(--foreground)]",
  textMuted: "text-[var(--muted-foreground)]",
} as const;
