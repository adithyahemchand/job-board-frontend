import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobDetailsView from "../components/JobDetailsView";

type Job = {
  jobId: string;
  title: string;
  author: string;
  postedDate: string;
  description: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function UserJobDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${BACKEND_URL}/jobs/${id}`);
        if (!res.ok) {
          setError("Job not found");
          setJob(null);
          return;
        }

        const data = await res.json();
        setJob(data);
      } catch {
        setError("Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center py-6 px-6">
      <div className="w-full max-w-3xl pl-4">
        {/* Header — identical positioning */}
        <div className="text-center mb-1 mr-[15px]">
          <h1 className="text-5xl font-extrabold text-blue-600 tracking-tight">
            Job Board
          </h1>
          <p className="text-sm text-gray-500 mt-2">Profile: User</p>
        </div>

        {/* Job Details */}
        <div className="mt-20 ml-[120px]">
          <JobDetailsView job={job} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
