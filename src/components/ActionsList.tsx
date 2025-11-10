import { useGetActionsQuery } from '@/lib/state/apiSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';

export function ActionsList({ jobId }: { jobId: number }) {
  const { data: actions, isLoading, isError } = useGetActionsQuery(jobId);

  if (isLoading) return <div>Loading actions...</div>;
  if (isError || !actions) return <div>Error loading actions.</div>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button>Create Action</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Enabled</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actions.map((action) => (
            <TableRow key={action.id}>
              <TableCell>{action.type}</TableCell>
              <TableCell>{action.priority}</TableCell>
              <TableCell>{action.enable ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
