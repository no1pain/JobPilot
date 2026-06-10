"use client";

import { useSyncExternalStore } from "react";

type Language = "uk" | "en";

const LANGUAGE_STORAGE_KEY = "jobpilot-language";
const COMPACT_MODE_KEY = "jobpilot-compact-mode";
const ANIMATIONS_KEY = "jobpilot-animations";
const PARTY_MODE_KEY = "jobpilot-party-mode";

const subscribers = new Set<() => void>();

function getLanguage(): Language {
  if (typeof window === "undefined") return "uk";
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "uk" || stored === "en") return stored;
  } catch (error) {
    console.error("Failed to load language from localStorage:", error);
  }
  return "uk";
}

function setLanguage(language: Language) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    notifySubscribers();
  } catch (error) {
    console.error("Failed to save language to localStorage:", error);
  }
}

function getCompactMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(COMPACT_MODE_KEY);
    return stored === "true";
  } catch (error) {
    console.error("Failed to load compact mode from localStorage:", error);
  }
  return false;
}

function setCompactMode(enabled: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(COMPACT_MODE_KEY, String(enabled));
    notifySubscribers();
  } catch (error) {
    console.error("Failed to save compact mode to localStorage:", error);
  }
}

function getAnimations(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const stored = localStorage.getItem(ANIMATIONS_KEY);
    return stored !== "false";
  } catch (error) {
    console.error("Failed to load animations from localStorage:", error);
  }
  return true;
}

function setAnimations(enabled: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ANIMATIONS_KEY, String(enabled));
    notifySubscribers();
  } catch (error) {
    console.error("Failed to save animations to localStorage:", error);
  }
}

function getPartyMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(PARTY_MODE_KEY);
    return stored === "true";
  } catch (error) {
    console.error("Failed to load party mode from localStorage:", error);
  }
  return false;
}

function setPartyMode(enabled: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PARTY_MODE_KEY, String(enabled));
    notifySubscribers();
  } catch (error) {
    console.error("Failed to save party mode to localStorage:", error);
  }
}

function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function notifySubscribers() {
  subscribers.forEach((callback) => callback());
}

export function useSettings() {
  const language = useSyncExternalStore(subscribe, getLanguage, getLanguage);
  const compactMode = useSyncExternalStore(subscribe, getCompactMode, getCompactMode);
  const animations = useSyncExternalStore(subscribe, getAnimations, getAnimations);
  const partyMode = useSyncExternalStore(subscribe, getPartyMode, getPartyMode);

  return {
    language,
    setLanguage,
    compactMode,
    setCompactMode,
    animations,
    setAnimations,
    partyMode,
    setPartyMode,
  };
}
