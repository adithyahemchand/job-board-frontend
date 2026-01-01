import JobCard from "./JobCard";

type Job = {
  jobId: string;
  title: string;
  author: string;
  postedDate: string;
};

export default function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.jobId} job={job} />
      ))}
    </div>
  );
}
