"use client";

import { useTheme } from "@/lib/theme-context";
import { useRef, useEffect } from "react";

export function SettingsPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="relative">
      <div
        ref={popupRef}
        className="absolute right-0 top-2 z-50 w-64 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 shadow-xl"
      >
        <div className="mb-3 pb-3 border-b border-[var(--border)]">
          <h2 className="text-sm font-semibold text-[var(--card-foreground)]">Settings</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--card-foreground)]">Theme</h3>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--muted)] px-3 py-1.5 text-xs text-[var(--card-foreground)] hover:bg-[var(--border)] transition-colors"
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
