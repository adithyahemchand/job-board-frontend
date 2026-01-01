import JobCard from "./JobCard";

type Job = {
  jobId: string;
  title: string;
  author: string;
  postedDate: string;
};

export default function JobList({
  jobs,
  onJobClick,
  onDelete,
}: {
  jobs: Job[];
  onJobClick?: (jobId: string) => void;
  onDelete?: (jobId: string) => void;
}) {
  return (
    <div>
      {jobs.map((job) => (
        <JobCard
          key={job.jobId}
          job={job}
          onClick={onJobClick ? () => onJobClick(job.jobId) : undefined}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
