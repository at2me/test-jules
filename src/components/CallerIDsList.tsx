import { useGetCallerIDsQuery } from '@/lib/state/apiSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';

export function CallerIDsList({ jobId }: { jobId: number }) {
  const { data: callerIds, isLoading, isError } = useGetCallerIDsQuery(jobId);

  if (isLoading) return <div>Loading caller IDs...</div>;
  if (isError || !callerIds) return <div>Error loading caller IDs.</div>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button>Create Caller ID</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Caller ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {callerIds.map((callerId) => (
            <TableRow key={callerId.id}>
              <TableCell>{callerId.caller_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
