import { useEffect, useState } from "react";
import JobsPageView from "../components/JobsPageView";
import { useNavigate } from "react-router-dom";

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

export default function UserJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [cursor, setCursor] = useState<Cursor | null>(null);
  const [loadMore, setLoadMore] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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

      if (!res.ok) {
        setError(data.message || "Invalid cursor");
        return;
      }

      setJobs((prev) => [...prev, ...data.jobs]);
      setCursor(data.lastCursor);
      setLoadMore(data.loadMore);
    } catch {
      setError("Failed to load more jobs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center py-6 px-6">
      <div className="w-full max-w-3xl pl-4">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-extrabold text-blue-600 tracking-tight">
            Job Board
          </h1>
          <p className="text-sm text-gray-500 mt-2">Profile: User</p>
        </div>

        <JobsPageView
          title=""
          jobs={jobs}
          loading={loading}
          error={error}
          loadMore={loadMore}
          onLoadMore={loadMoreJobs}
          onJobClick={(jobId) => navigate(`/user/jobs/${jobId}`)}
        />
      </div>
    </div>
  );
}
