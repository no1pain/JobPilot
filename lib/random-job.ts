import { JOB_STATUSES } from "./constants";
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

const salaries = [
  "$60k–$80k",
  "$80k–$100k",
  "$90k",
  "$100k–$120k",
  "$110k–$130k",
  "$120k+",
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
  return {
    company: pick(companies),
    position: pick(positions),
    salary: maybe(salaries),
    status: pick(JOB_STATUSES),
    notes: maybe(notes),
  };
}

export function generateRandomJobs(count: number): JobFormData[] {
  return Array.from({ length: count }, generateRandomJob);
}
