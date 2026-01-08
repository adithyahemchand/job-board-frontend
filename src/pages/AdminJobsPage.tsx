import { useEffect, useState } from "react";
import JobsPageView from "../components/JobsPageView";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import LogoutButton from "../components/LogoutButton";

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
      alert("Network error or server unreachable");
    }
  };

  return (
    <>
      <PageHeader profile="admin" />

      {/* Logout */}
      <div className="bg-gray-50 flex justify-end top-10  pr-3 pt-3 ]">
        <LogoutButton />
      </div>

      <div className="bg-gray-50 min-h-screen flex justify-center px-6">
        <div className="w-full max-w-3xl ">
          {/* Add new job*/}
          <div className=" bg-gray-50 flex justify-left shadow-sm pt-2  pl-4">
            <button
              onClick={() => navigate("/admin/jobs/create")}
              className="px-3 py-1.5 text-sm bg-blue-500/70 text-white rounded-md hover:bg-blue-700/70 transition duration-150"
            >
              Add new job
            </button>
          </div>
          {/* Jobs list*/}
          <JobsPageView
            title=""
            jobs={jobs}
            loading={loading}
            error={error}
            loadMore={loadMore}
            onLoadMore={loadMoreJobs}
            onJobClick={(jobId) => navigate(`/admin/jobs/${jobId}`)}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
