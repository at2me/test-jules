import { useGetCallerIDsQuery, useDeleteCallerIDMutation, useUpdateCallerIDMutation } from '@/lib/state/apiSlice';
import { DataTable } from '@/components/ui/data-table';
import { CallerID } from '@/lib/state/types';
import { ColumnDef } from '@tanstack/react-table';
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

export function CallerIDsList({ jobId }: { jobId: number }) {
  const { data: callerIds, isLoading, isError } = useGetCallerIDsQuery(jobId);
  const [deleteCallerID] = useDeleteCallerIDMutation();
  const [updateCallerID] = useUpdateCallerIDMutation();
  const [editingCallerID, setEditingCallerID] = useState<CallerID | null>(null);

  const handleUpdateCallerID = () => {
    if (editingCallerID) {
      updateCallerID(editingCallerID);
      setEditingCallerID(null);
    }
  };

  const columns: ColumnDef<CallerID>[] = [
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
      accessorKey: 'caller_id',
      header: 'Caller ID',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const callerId = row.original;
        return (
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditingCallerID(callerId)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Caller ID</DialogTitle>
                  <DialogDescription>
                    Make changes to your caller ID here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                {/* Caller ID Edit Form */}
                <Button onClick={handleUpdateCallerID}>Save Changes</Button>
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
                    your caller ID and all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteCallerID(callerId.id)}>
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

  if (isLoading) return <div>Loading caller IDs...</div>;
  if (isError || !callerIds) return <div>Error loading caller IDs.</div>;

  return (
    <div>
      <DataTable columns={columns} data={callerIds} />
    </div>
  );
}
