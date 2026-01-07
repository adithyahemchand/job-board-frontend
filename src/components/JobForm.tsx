import { useState } from "react";

export default function JobForm({
  onSubmit,
  loading,
}: {
  onSubmit: (title: string, author: string, description: string) => void;
  loading: boolean;
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Validation constants
  const TITLE_MAX = 100;
  const AUTHOR_MAX = 50;
  const DESCRIPTION_MAX = 2000;

  const isEligibleToSubmit =
    title.trim().length > 0 &&
    title.length <= TITLE_MAX &&
    author.trim().length > 0 &&
    author.length <= AUTHOR_MAX &&
    description.trim().length > 0 &&
    description.length <= DESCRIPTION_MAX;

  return (
    <div className="bg-gray-50  flex  justify-center py-10 px-6">
      <div className="w-full max-w-lg bg-white/90 border border-gray-200 rounded-xl shadow-xl p-8 space-y-6 text-center">
        {/* Job Title */}
        <label className="block text-left text-gray-700 font-medium mb-1">
          Job Title <span className="text-red-600">*</span>
        </label>
        <input
          placeholder="Job Title"
          value={title}
          maxLength={TITLE_MAX}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full border rounded-lg p-2 text-base focus:outline-none focus:ring-2 text-center ${
            submitAttempted && !title
              ? "border-red-500 ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
        />

        {/* Posted By */}
        <label className="block text-left text-gray-700 font-medium mb-1">
          Posted by <span className="text-red-600">*</span>
        </label>
        <input
          placeholder="Posted by"
          value={author}
          maxLength={AUTHOR_MAX}
          onChange={(e) => setAuthor(e.target.value)}
          className={`w-full border rounded-lg p-2 text-base focus:outline-none focus:ring-2 text-center ${
            submitAttempted && !author
              ? "border-red-500 ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
        />

        {/* Description */}
        <label className="block text-left text-gray-700 font-medium mb-1">
          Job Description <span className="text-red-600">*</span>
        </label>
        <textarea
          placeholder="Job description"
          value={description}
          maxLength={DESCRIPTION_MAX}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full border rounded-lg p-4 h-72 placeholder:text-center resize-none text-base focus:outline-none focus:ring-2 ${
            submitAttempted && !description
              ? "border-red-500 ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          } text-center`}
        />
        {submitAttempted && !description && (
          <p className="text-red-600 text-sm text-left mt-1">
            Please fill out the job description.
          </p>
        )}

        {/* Submit Button */}
        <button
          onClick={() => {
            setSubmitAttempted(true);
            onSubmit(title, author, description);
          }}
          disabled={loading || !isEligibleToSubmit}
          className={`w-full font-semibold py-3 rounded-lg shadow transition duration-200 text-white
            ${
              loading || !isEligibleToSubmit
                ? "bg-blue-200 cursor-not-allowed"
                : "bg-blue-500/70 hover:bg-blue-700/70"
            }
          `}
        >
          Create Job
        </button>
      </div>
    </div>
  );
}
