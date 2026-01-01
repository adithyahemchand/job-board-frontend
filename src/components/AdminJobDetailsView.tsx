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
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
    }
  }, [job]);

  if (loading)
    return (
      <p className="text-gray-500 text-base text-center mt-12">Loading…</p>
    );

  if (error)
    return <p className="text-red-600 text-base text-center mt-12">{error}</p>;

  if (!job)
    return (
      <p className="text-gray-500 text-base text-center mt-12">No job data</p>
    );

  return (
    <div className="bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-lg bg-white/95 border border-gray-200 rounded-xl shadow-md p-8 space-y-6">
        {/* Page Heading */}
        <h2 className="text-2xl font-semibold text-blue-600/90 text-center">
          Edit Job
        </h2>

        {/* Job Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className={`w-full border rounded-lg p-3 text-base focus:outline-none focus:ring-2 ${
            submitAttempted && !title
              ? "border-red-500 ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {submitAttempted && !title && (
          <p className="text-red-600 text-sm text-left mt-1">
            Please fill out the job title.
          </p>
        )}

        {/* Job Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className={`w-full border rounded-lg p-3 h-48 resize-none text-base focus:outline-none focus:ring-2 ${
            submitAttempted && !description
              ? "border-red-500 ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {submitAttempted && !description && (
          <p className="text-red-600 text-sm text-left mt-1">
            Please fill out the job description.
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => {
              setSubmitAttempted(true);
              if (title && description) onSave(title, description);
            }}
            disabled={saving}
            className="bg-blue-500/70 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700/70 transition duration-200 disabled:opacity-50"
          >
            Save
          </button>

          <button
            onClick={onDelete}
            className="bg-red-50 text-red-700/70 hover:bg-red-100 hover:text-red-800/70 font-semibold py-2 px-6 rounded-lg shadow transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
