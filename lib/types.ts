export type JobStatus =
  | "Interested"
  | "Applied"
  | "Interview"
  | "Technical Interview"
  | "Offer"
  | "Rejected";

export type Job = {
  id: string;
  company: string;
  position: string;
  salary?: string;
  status: JobStatus;
  notes?: string;
  createdAt: string;
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
