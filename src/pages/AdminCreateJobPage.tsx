import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import PageHeader from "../components/PageHeader";

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
    <>
      <PageHeader profile="admin" />
      <div className="bg-gray-50 min-h-screen flex justify-center py-6 px-6">
        <div className="w-full max-w-3xl pl-4">
          {error && <p className="text-red-600 mb-2 text-center">{error}</p>}

          {/* JobForm */}
          <div className="flex justify-center -mt-1">
            <div className="w-full max-w-3xl">
              <JobForm loading={loading} onSubmit={handleCreate} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
