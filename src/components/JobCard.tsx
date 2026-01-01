type Job = {
  jobId: string;
  title: string;
  author: string;
  postedDate: string;
};

export default function JobCard({
  job,
  onClick,
  onDelete,
}: {
  job: Job;
  onClick?: () => void;
  onDelete?: (jobId: string) => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        marginBottom: "8px",
        padding: "8px",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <h4>{job.title}</h4>
      <p>{job.author}</p>
      <small>{new Date(job.postedDate).toLocaleString()}</small>

      {onDelete && (
        <button
          onClick={() => onDelete(job.jobId)}
          style={{ marginTop: "8px", color: "red" }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
