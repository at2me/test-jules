import { useGetJobsQuery } from '@/lib/state/apiSlice';
import { JobDetails } from './JobDetails';

export function JobsList({ domainId }: { domainId: number }) {
  const { data: jobs, isLoading, isError } = useGetJobsQuery(domainId);

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (isError || !jobs) {
    return <div>Error loading jobs.</div>;
  }

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id}>
          <h4>{job.name}</h4>
          <JobDetails jobId={job.id} />
        </div>
      ))}
    </div>
  );
}
