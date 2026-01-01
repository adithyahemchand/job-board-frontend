import { useEffect, useState } from "react";

type Job = {
  jobId: string;
  title: string;
  author: string;
  postedDate: string;
  description: string;
};

export default function AdminJobDetailsView({
  job,
  loading,
  error,
  saving,
  onSave,
  onDelete,
}: {
  job: Job | null;
  loading: boolean;
  error: string | null;
  saving: boolean;
  onSave: (title: string, description: string) => void;
  onDelete: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
    }
  }, [job]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!job) return <p>No job data</p>;

  return (
    <div>
      <h2>Edit Job</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <br />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <br />

      <button onClick={() => onSave(title, description)} disabled={saving}>
        Save
      </button>

      <button onClick={onDelete} style={{ color: "red", marginLeft: "8px" }}>
        Delete
      </button>
    </div>
  );
}
