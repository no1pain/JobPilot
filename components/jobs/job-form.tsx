"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { JOB_STATUSES } from "@/lib/constants";
import type { JobFormData } from "@/lib/job-actions";
import { ui } from "@/lib/ui";
import type { Job } from "@/lib/types";

type JobFormProps = {
  job?: Job;
  onSubmit: (data: JobFormData) => void;
  onCancel: () => void;
};

const emptyForm: JobFormData = {
  company: "",
  position: "",
  salary: "",
  status: "Interested",
  notes: "",
};

export function JobForm({ job, onSubmit, onCancel }: JobFormProps) {
  const [form, setForm] = useState<JobFormData>(
    job
      ? {
          company: job.company,
          position: job.position,
          salary: job.salary ?? "",
          status: job.status,
          notes: job.notes ?? "",
        }
      : emptyForm,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <h3 id="job-form-title" className="text-lg font-semibold text-zinc-50">
            {job ? "Edit vacancy" : "Add vacancy"}
          </h3>
          <Button variant="ghost" size="sm" onClick={onCancel} aria-label="Close">
            ✕
          </Button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <label className="block">
            <span className={ui.label}>Company</span>
            <input
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className={ui.input}
            />
          </label>

          <label className="block">
            <span className={ui.label}>Position</span>
            <input
              required
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className={ui.input}
            />
          </label>

          <label className="block">
            <span className={ui.label}>Salary</span>
            <input
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              placeholder="e.g. $80k–$100k"
              className={ui.input}
            />
          </label>

          <label className="block">
            <span className={ui.label}>Status</span>
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
            <span className={ui.label}>Notes</span>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className={`${ui.input} resize-none`}
            />
          </label>
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 px-6 py-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
          >
            {job ? "Save changes" : "Add vacancy"}
          </button>
        </div>
      </form>
    </div>
  );
}
