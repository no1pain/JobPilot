"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "jobpilot-theme";

const subscribers = new Set<() => void>();

function getTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch (error) {
    console.error("Failed to load theme from localStorage:", error);
  }

  return "dark";
}

function setTheme(theme: Theme) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    notifySubscribers();
  } catch (error) {
    console.error("Failed to save theme to localStorage:", error);
  }
}

function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function notifySubscribers() {
  subscribers.forEach((callback) => callback());
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, getTheme);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}
