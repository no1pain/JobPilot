import { JOB_PRIORITIES, JOB_STATUSES } from "./constants";
import type { JobFormData } from "./job-actions";

const companies = [
  "Acme Corp",
  "TechStart",
  "DataFlow",
  "CloudNine",
  "PixelLab",
  "ScaleUp",
  "BuildCo",
  "InnovateHQ",
  "Nexus Labs",
  "Orbit Systems",
];

const positions = [
  "Frontend Developer",
  "React Engineer",
  "Full Stack Developer",
  "Software Engineer",
  "UI Developer",
  "Senior Frontend",
  "Web Developer",
  "Backend Engineer",
  "DevOps Engineer",
  "Mobile Developer",
];

const salaryRanges = [
  { min: 60, max: 80 },
  { min: 80, max: 100 },
  { min: 90, max: 90 },
  { min: 100, max: 120 },
  { min: 110, max: 130 },
  { min: 120, max: 150 },
];

const notes = [
  "Referred by a friend",
  "Applied via LinkedIn",
  "Recruiter reached out",
  "Remote position",
  "Follow up next week",
  "Waiting for HR response",
];

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function maybe<T>(items: T[], chance = 0.6): T | undefined {
  return Math.random() < chance ? pick(items) : undefined;
}

export function generateRandomJob(): JobFormData {
  const salaryRange = maybe(salaryRanges, 0.8);
  return {
    company: pick(companies),
    position: pick(positions),
    minSalary: salaryRange ? salaryRange.min.toString() : undefined,
    maxSalary: salaryRange ? salaryRange.max.toString() : undefined,
    status: pick(JOB_STATUSES),
    notes: maybe(notes),
    priority: pick(JOB_PRIORITIES),
  };
}

export function generateRandomJobs(count: number): JobFormData[] {
  return Array.from({ length: count }, generateRandomJob);
}
