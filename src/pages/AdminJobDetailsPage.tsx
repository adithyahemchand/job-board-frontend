import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminJobDetailsView from "../components/AdminJobDetailsView";

type Job = {
  jobId: string;
  title: string;
  author: string;
  postedDate: string;
  description: string;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminJobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/jobs/${id}`, {
          credentials: "include",
        });

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

  const handleSave = async (title: string, description: string) => {
    if (!id) return;

    setSaving(true);
    try {
      const res = await fetch(`${BACKEND_URL}/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        alert("Failed to update job");
        return;
      }

      alert("Job updated");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !confirm("Delete this job?")) return;

    const res = await fetch(`${BACKEND_URL}/jobs/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.status === 204) {
      navigate("/admin/jobs");
    } else {
      alert("Failed to delete job");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center py-6 px-6">
      <div className="w-full max-w-3xl pl-4">
        {/* Header — IDENTICAL positioning */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-extrabold text-blue-600 tracking-tight">
            Job Board
          </h1>
          <p className="text-sm text-gray-500 mt-2">Profile: Admin</p>
        </div>

        {/* Edit Job Card */}
        <AdminJobDetailsView
          job={job}
          loading={loading}
          error={error}
          saving={saving}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
