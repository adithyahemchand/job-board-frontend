import JobCard from "./JobCard";

type Job = {
  jobId: string;
  title: string;
  author: string;
  postedDate: string;
};

export default function JobList({
  jobs,
  onDelete,
}: {
  jobs: Job[];
  onDelete?: (jobId: string) => void;
}) {
  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.jobId} job={job} onDelete={onDelete} />
      ))}
    </div>
  );
}
