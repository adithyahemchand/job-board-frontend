type Job = {
  jobId: string;
  title: string;
  author: string;
  postedDate: string;
  description: string;
};

export default function JobDetailsView({
  job,
  loading,
  error,
}: {
  job: Job | null;
  loading: boolean;
  error: string | null;
}) {
  if (loading)
    return (
      <p className="text-gray-500 text-base text-center mt-12">Loading…</p>
    );

  if (error)
    return <p className="text-red-600 text-base text-center mt-12">{error}</p>;

  if (!job)
    return (
      <p className="text-gray-500 text-base text-center mt-12">Job not found</p>
    );

  return (
    <div className="w-full max-w-lg bg-white/95 border border-gray-200 rounded-xl shadow-md p-8 space-y-6">
      {/* Header Block */}
      <div className="space-y-1">
        <h2 className="text-[1.65rem] font-semibold text-blue-600/90 leading-tight">
          {job.title}
        </h2>

        <p className="text-gray-800 font-semibold text-lg leading-tight">
          {job.author}
        </p>

        <p className="text-gray-400 text-xs">
          Posted {new Date(job.postedDate).toLocaleDateString()}
        </p>
      </div>

      <hr className="border-gray-200" />

      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
        {job.description}
      </p>
    </div>
  );
}
