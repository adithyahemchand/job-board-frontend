import JobList from "./JobList";

type Job = {
  jobId: string;
  title: string;
  author: string;
  postedDate: string;
};

export default function JobsPageView({
  title,
  jobs,
  loading,
  error,
  loadMore,
  onLoadMore,
  onJobClick,
  onDelete,
}: {
  title: string;
  jobs: Job[];
  loading: boolean;
  error: string | null;
  loadMore: boolean;
  onLoadMore: () => void;
  onJobClick?: (jobId: string) => void;
  onDelete?: (jobId: string) => void;
}) {
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center py-8 px-4">
      <div className="w-full max-w-3xl">
        {title && (
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        )}

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && jobs.length === 0 && (
          <div className="flex items-center justify-center min-h-[200px]">
            <p className="text-gray-400 text-base text-center">No jobs found</p>
          </div>
        )}

        <JobList jobs={jobs} onJobClick={onJobClick} onDelete={onDelete} />

        {loadMore && !loading && (
          <div className="flex justify-center mt-4">
            <button
              onClick={onLoadMore}
              disabled={loading}
              className="px-3 py-1.5 text-sm bg-blue-500/70 text-white rounded-md hover:bg-blue-700/70 disabled:opacity-50 transition duration-150"
            >
              Load more jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
