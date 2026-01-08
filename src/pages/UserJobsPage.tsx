import { useEffect, useState } from "react";
import JobsPageView from "../components/JobsPageView";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

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
      setError("Network error or server unreachable");
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
      setError("Network error or server unreachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader profile="user" />

      {/* Jobs list*/}
      <div className="bg-gray-50 min-h-screen flex justify-center py-6 px-6">
        <div className="w-full max-w-3xl pl-4">
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
    </>
  );
}
