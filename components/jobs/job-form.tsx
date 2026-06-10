"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { JOB_STATUSES, JOB_PRIORITIES } from "@/lib/constants";
import type { JobFormData } from "@/lib/job-actions";
import { ui } from "@/lib/ui";
import type { Job } from "@/lib/types";
import { useTranslation } from "@/lib/translations-context";

type JobFormProps = {
  job?: Job;
  onSubmit: (data: JobFormData) => void;
  onCancel: () => void;
};

const emptyForm: JobFormData = {
  company: "",
  position: "",
  minSalary: "",
  maxSalary: "",
  status: "Interested",
  notes: "",
  appliedDate: "",
  priority: "Medium",
};

export function JobForm({ job, onSubmit, onCancel }: JobFormProps) {
  const { t } = useTranslation();
  const [form, setForm] = useState<JobFormData>(
    job
      ? {
        company: job.company,
        position: job.position,
        minSalary: job.salary ? job.salary.split("-")[0].replace(/\$|k/g, "").trim() : "",
        maxSalary: job.salary ? job.salary.split("-")[1]?.replace(/\$|k/g, "").trim() || job.salary.split("-")[0].replace(/\$|k/g, "").trim() : "",
        status: job.status,
        notes: job.notes ?? "",
        appliedDate: job.appliedDate ?? "",
        priority: job.priority ?? "Medium",
      }
      : emptyForm,
  );
  const [salaryError, setSalaryError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.minSalary && form.maxSalary) {
      const min = parseFloat(form.minSalary);
      const max = parseFloat(form.maxSalary);
      if (min > max) {
        setSalaryError(t("form.salaryError"));
        return;
      }
    }

    setSalaryError("");
    onSubmit(form);
  }

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-form-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-lg ${ui.card} shadow-2xl shadow-black/50`}
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <h3 id="job-form-title" className="text-lg font-semibold text-[var(--card-foreground)]">
            {job ? t("form.editVacancy") : t("form.addVacancy")}
          </h3>
          <Button variant="ghost" size="sm" onClick={onCancel} aria-label="Close">
            ✕
          </Button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <label className="block">
            <span className={ui.label}>{t("form.company")}</span>
            <input
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className={ui.input}
            />
          </label>

          <label className="block">
            <span className={ui.label}>{t("form.position")}</span>
            <input
              required
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className={ui.input}
            />
          </label>

          <div className="flex gap-3">
            <label className="flex-1 block">
              <span className={ui.label}>{t("form.minSalary")}</span>
              <input
                type="number"
                value={form.minSalary}
                onChange={(e) => {
                  setForm({ ...form, minSalary: e.target.value });
                  setSalaryError("");
                }}
                placeholder="e.g. 80"
                className={ui.input}
              />
            </label>

            <label className="flex-1 block">
              <span className={ui.label}>{t("form.maxSalary")}</span>
              <input
                type="number"
                value={form.maxSalary}
                onChange={(e) => {
                  setForm({ ...form, maxSalary: e.target.value });
                  setSalaryError("");
                }}
                placeholder="e.g. 100"
                className={ui.input}
              />
            </label>
          </div>
          {salaryError && (
            <p className="text-sm text-red-400">{salaryError}</p>
          )}

          <label className="block">
            <span className={ui.label}>{t("form.status")}</span>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as JobFormData["status"],
                })
              }
              className={ui.input}
            >
              {JOB_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={ui.label}>{t("form.notes")}</span>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className={`${ui.input} resize-none`}
            />
          </label>

          <label className="block">
            <span className={ui.label}>{t("form.appliedDate")}</span>
            <input
              type="date"
              value={form.appliedDate}
              onChange={(e) => setForm({ ...form, appliedDate: e.target.value })}
              className={ui.input}
            />
          </label>

          <label className="block">
            <span className={ui.label}>{t("form.priority")}</span>
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({
                  ...form,
                  priority: e.target.value as JobFormData["priority"],
                })
              }
              className={ui.input}
            >
              {JOB_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex justify-end gap-3 border-t border-[var(--border)] px-6 py-4">
          <Button variant="secondary" onClick={onCancel}>
            {t("form.cancel")}
          </Button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-colors hover:bg-[var(--muted-foreground)]"
          >
            {job ? t("form.saveChanges") : t("form.addVacancy")}
          </button>
        </div>
      </form>
    </div>
  );
}
