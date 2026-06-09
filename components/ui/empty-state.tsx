import { ui } from "@/lib/ui";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center ${ui.card} border-dashed px-6 py-16 text-center`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--muted)] text-xl">
        📋
      </div>
      <h3 className={`text-lg font-medium ${ui.textPrimary}`}>{title}</h3>
      <p className={`mt-2 max-w-sm text-sm ${ui.textMuted}`}>{description}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-6 rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-colors hover:bg-[var(--muted-foreground)]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
