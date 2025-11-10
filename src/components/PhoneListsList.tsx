import { useGetPhoneListsQuery } from '@/lib/state/apiSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';

export function PhoneListsList({ jobId }: { jobId: number }) {
  const { data: phoneLists, isLoading, isError } = useGetPhoneListsQuery(jobId);

  if (isLoading) return <div>Loading phone lists...</div>;
  if (isError || !phoneLists) return <div>Error loading phone lists.</div>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button>Create Phone List</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Destination Number</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {phoneLists.map((phoneList) => (
            <TableRow key={phoneList.id}>
              <TableCell>{phoneList.dst_number}</TableCell>
              <TableCell>{phoneList.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
