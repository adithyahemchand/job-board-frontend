import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminCreateJobPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (
    title: string,
    author: string,
    description: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, author, description }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to create job");
        return;
      }

      navigate("/admin/jobs");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Job</h2>

      {error && <p>{error}</p>}

      <JobForm loading={loading} onSubmit={handleCreate} />
    </div>
  );
}
