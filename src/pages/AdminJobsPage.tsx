import { useEffect, useState } from "react";
import JobsPageView from "../components/JobsPageView";

type Job = {
  jobId: string;
  title: string;
  author: string;
  postedDate: string;
};

type Cursor = {
  postedDate: string;
  jobId: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [cursor, setCursor] = useState<Cursor | null>(null);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialJobs();
  }, []);

  const loadInitialJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_URL}/jobs`);
      const data = await res.json();

      setJobs(data.jobs);
      setCursor(data.lastCursor);
      setLoadMore(data.loadMore);
    } catch {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreJobs = async () => {
    if (!cursor) return;

    setLoading(true);
    setError(null);

    try {
      const encodedCursor = encodeURIComponent(JSON.stringify(cursor));
      const res = await fetch(`${BACKEND_URL}/jobs?cursor=${encodedCursor}`);
      const data = await res.json();

      setJobs((prev) => [...prev, ...data.jobs]);
      setCursor(data.lastCursor);
      setLoadMore(data.loadMore);
    } catch {
      setError("Failed to load more jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm("Delete this job?")) return;

    try {
      const res = await fetch(`${BACKEND_URL}/jobs/${jobId}`, {
        method: "DELETE",
        credentials: "include", // cookies required
      });

      if (res.status === 204) {
        setJobs((prev) => prev.filter((j) => j.jobId !== jobId));
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete job");
      }
    } catch {
      alert("Network error");
    }
  };

  return (
    <JobsPageView
      title="Admin Jobs"
      jobs={jobs}
      loading={loading}
      error={error}
      loadMore={loadMore}
      onLoadMore={loadMoreJobs}
      onDelete={handleDelete} // UI component now optional handles deletion
    />
  );
}
