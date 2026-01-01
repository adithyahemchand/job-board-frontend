import { FaTrash } from "react-icons/fa";

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
      className={`
      bg-white/95 
      border border-gray-200 
      rounded-lg 
      shadow-md 
      p-5 
      pl-8       
      mb-4 
      cursor-pointer 
      transition 
      duration-200 
      hover:shadow-lg 
      hover:scale-[1.02]
      relative
    `}
    >
      {/* Subtle divider for delete zone */}
      {onDelete && (
        <div className="absolute top-4 bottom-4 right-12 w-px bg-gray-200/40" />
      )}

      {/* Delete button */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(job.jobId);
          }}
          className="absolute top-1/2 right-5 -translate-y-1/2 text-red-800/40 text-sm hover:text-red-600/70 transition duration-150"
          aria-label="Delete Job"
        >
          <FaTrash />
        </button>
      )}

      <h4 className="text-blue-600 text-lg font-semibold mb-2">{job.title}</h4>
      <p className="text-gray-700 text-sm mb-1">{job.author}</p>
      <small className="text-gray-500">
        Posted on: {new Date(job.postedDate).toLocaleString()}
      </small>
    </div>
  );
}
