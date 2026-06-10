"use client";

import { useSettings } from "@/lib/settings-context";
import { useEffect } from "react";

export function SettingsModeProvider({ children }: { children: React.ReactNode }) {
  const { compactMode, animations, partyMode } = useSettings();

  useEffect(() => {
    // Apply compact mode
    if (compactMode) {
      document.body.classList.add("compact-mode");
    } else {
      document.body.classList.remove("compact-mode");
    }

    // Apply animations toggle
    if (animations) {
      document.body.classList.remove("no-animations");
    } else {
      document.body.classList.add("no-animations");
    }

    // Apply party mode
    if (partyMode) {
      document.body.classList.add("party-mode");
    } else {
      document.body.classList.remove("party-mode");
    }
  }, [compactMode, animations, partyMode]);

  return <>{children}</>;
}
