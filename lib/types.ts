export type JobStatus =
  | "Interested"
  | "Applied"
  | "Interview"
  | "Technical Interview"
  | "Offer"
  | "Rejected";

export type JobPriority = "Low" | "Medium" | "High";

export type Job = {
  id: string;
  company: string;
  position: string;
  salary?: string;
  status: JobStatus;
  notes?: string;
  createdAt: string;
  appliedDate?: string;
  priority?: JobPriority;
};

export type DashboardStats = {
  total: number;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
};

export type StatCard = {
  key: keyof DashboardStats;
  label: string;
  cardClass: string;
  valueClass: string;
};
