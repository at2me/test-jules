import { useGetSchedulersQuery } from '@/lib/state/apiSlice';
import { DataTable } from '../ui/data-table';
import { Scheduler } from '@/lib/state/types';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<Scheduler>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'day_of_week',
    header: 'Day of Week',
  },
  {
    accessorKey: 'start_time',
    header: 'Start Time',
  },
  {
    accessorKey: 'stop_time',
    header: 'Stop Time',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const scheduler = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(scheduler.id.toString())}
            >
              Copy Scheduler ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function SchedulersList({ jobId }: { jobId: number }) {
  const { data: schedulers, isLoading, isError } = useGetSchedulersQuery(jobId);

  if (isLoading) return <div>Loading schedulers...</div>;
  if (isError || !schedulers) return <div>Error loading schedulers.</div>;

  return (
    <div>
      <DataTable columns={columns} data={schedulers} />
    </div>
  );
}
