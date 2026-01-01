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
}: {
  title: string;
  jobs: Job[];
  loading: boolean;
  error: string | null;
  loadMore: boolean;
  onLoadMore: () => void;
}) {
  return (
    <div>
      <h2>{title}</h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && jobs.length === 0 && <p>No jobs found</p>}

      <JobList jobs={jobs} />

      {loadMore && !loading && <button onClick={onLoadMore}>Load more</button>}
    </div>
  );
}
