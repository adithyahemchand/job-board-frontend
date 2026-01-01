type Job = {
  jobId: string;
  title: string;
  author: string;
  postedDate: string;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <div
      style={{ border: "1px solid #ccc", marginBottom: "8px", padding: "8px" }}
    >
      <h4>{job.title}</h4>
      <p>{job.author}</p>
      <small>{new Date(job.postedDate).toLocaleString()}</small>
    </div>
  );
}
