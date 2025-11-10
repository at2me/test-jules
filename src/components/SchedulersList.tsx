import { useGetSchedulersQuery } from '@/lib/state/apiSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';

export function SchedulersList({ jobId }: { jobId: number }) {
  const { data: schedulers, isLoading, isError } = useGetSchedulersQuery(jobId);

  if (isLoading) return <div>Loading schedulers...</div>;
  if (isError || !schedulers) return <div>Error loading schedulers.</div>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button>Create Scheduler</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day of Week</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Stop Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedulers.map((scheduler) => (
            <TableRow key={scheduler.id}>
              <TableCell>{scheduler.day_of_week}</TableCell>
              <TableCell>{scheduler.start_time}</TableCell>
              <TableCell>{scheduler.stop_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
