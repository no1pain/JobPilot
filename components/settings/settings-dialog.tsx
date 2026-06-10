"use client";

import { useTheme } from "@/lib/theme-context";
import { useSettings } from "@/lib/settings-context";
import { useTranslation } from "@/lib/translations-context";
import { useRef, useEffect } from "react";

export function SettingsPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, compactMode, setCompactMode, animations, setAnimations, partyMode, setPartyMode } = useSettings();
  const { t } = useTranslation();
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
          <h2 className="text-sm font-semibold text-[var(--card-foreground)]">{t("settings.title")}</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--card-foreground)]">{t("settings.theme")}</h3>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--muted)] px-3 py-1.5 text-xs text-[var(--card-foreground)] hover:bg-[var(--border)] transition-colors"
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--card-foreground)]">{t("settings.language")}</h3>
            </div>
            <button
              onClick={() => setLanguage(language === "uk" ? "en" : "uk")}
              className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--muted)] px-3 py-1.5 text-xs text-[var(--card-foreground)] hover:bg-[var(--border)] transition-colors"
            >
              {language === "uk" ? "🇺🇦 UA" : "🇬🇧 EN"}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--card-foreground)]">{t("settings.compactMode")}</h3>
            </div>
            <button
              onClick={() => setCompactMode(!compactMode)}
              className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors ${compactMode
                ? "border-green-500 bg-green-500/20 text-green-700 dark:text-green-400"
                : "border-[var(--border)] bg-[var(--muted)] text-[var(--card-foreground)] hover:bg-[var(--border)]"
                }`}
            >
              {compactMode ? `✓ ${t("settings.on")}` : `✗ ${t("settings.off")}`}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--card-foreground)]">{t("settings.animations")}</h3>
            </div>
            <button
              onClick={() => setAnimations(!animations)}
              className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors ${animations
                ? "border-blue-500 bg-blue-500/20 text-blue-700 dark:text-blue-400"
                : "border-[var(--border)] bg-[var(--muted)] text-[var(--card-foreground)] hover:bg-[var(--border)]"
                }`}
            >
              {animations ? `✨ ${t("settings.on")}` : `✗ ${t("settings.off")}`}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--card-foreground)]">🎉 {t("settings.partyMode")}</h3>
            </div>
            <button
              onClick={() => setPartyMode(!partyMode)}
              className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors ${partyMode
                ? "border-purple-500 bg-purple-500/20 text-purple-700 dark:text-purple-400"
                : "border-[var(--border)] bg-[var(--muted)] text-[var(--card-foreground)] hover:bg-[var(--border)]"
                }`}
            >
              {partyMode ? `🎊 ${t("settings.on")}` : `✗ ${t("settings.off")}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
