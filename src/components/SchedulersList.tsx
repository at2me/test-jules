import { useGetSchedulersQuery, useDeleteSchedulerMutation, useUpdateSchedulerMutation } from '@/lib/state/apiSlice';
import { DataTable } from '@/components/ui/data-table';
import type { Scheduler } from '@/lib/state/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

export function SchedulersList({ jobId }: { jobId: number }) {
  const { data: schedulers, isLoading, isError } = useGetSchedulersQuery(jobId);
  const [deleteScheduler] = useDeleteSchedulerMutation();
  const [updateScheduler] = useUpdateSchedulerMutation();
  const [editingScheduler, setEditingScheduler] = useState<Scheduler | null>(null);

  const handleUpdateScheduler = () => {
    if (editingScheduler) {
      updateScheduler(editingScheduler);
      setEditingScheduler(null);
    }
  };

  const columns: ColumnDef<Scheduler>[] = [
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
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditingScheduler(scheduler)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Scheduler</DialogTitle>
                  <DialogDescription>
                    Make changes to your scheduler here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                {/* Scheduler Edit Form */}
                <Button onClick={handleUpdateScheduler}>Save Changes</Button>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your scheduler and all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteScheduler(scheduler.id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  if (isLoading) return <div>Loading schedulers...</div>;
  if (isError || !schedulers) return <div>Error loading schedulers.</div>;

  return (
    <div>
      <DataTable columns={columns} data={schedulers} />
    </div>
  );
}
