"use client";

import { useState } from "react";
import { SettingsDialog } from "@/components/settings/settings-dialog";

export function AppHeader() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-lg font-semibold text-[var(--card-foreground)]">JobPilot</h1>
            <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">
              Track your job applications
            </p>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="rounded-md border border-[var(--border)] bg-[var(--muted)] px-4 py-2 text-sm text-[var(--card-foreground)] hover:bg-[var(--border)] transition-colors"
          >
            ⚙️ Settings
          </button>
        </div>
      </header>
      <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
