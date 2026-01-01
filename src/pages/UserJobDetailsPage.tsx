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

  return <JobDetailsView job={job} loading={loading} error={error} />;
}
