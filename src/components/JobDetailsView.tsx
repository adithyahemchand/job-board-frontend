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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!job) return <p>No job data</p>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.author}</p>
      <small>{new Date(job.postedDate).toLocaleString()}</small>

      <hr />

      <p>{job.description}</p>
    </div>
  );
}
