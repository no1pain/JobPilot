"use client";

import { useTheme } from "@/lib/theme-context";

export function SettingsDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { theme, toggleTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--card-foreground)]">Settings</h2>
          <button
            onClick={onClose}
            className="text-[var(--muted-foreground)] hover:text-[var(--card-foreground)] transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--card-foreground)]">Theme</h3>
              <p className="text-xs text-[var(--muted-foreground)]">Choose your preferred color scheme</p>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--muted)] px-4 py-2 text-sm text-[var(--card-foreground)] hover:bg-[var(--border)] transition-colors"
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
