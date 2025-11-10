import { useGetPhoneListsQuery, useDeletePhoneListMutation, useUpdatePhoneListMutation } from '@/lib/state/apiSlice';
import { DataTable } from '@/components/ui/data-table';
import { PhoneList } from '@/lib/state/types';
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

export function PhoneListsList({ jobId }: { jobId: number }) {
  const { data: phoneLists, isLoading, isError } = useGetPhoneListsQuery(jobId);
  const [deletePhoneList] = useDeletePhoneListMutation();
  const [updatePhoneList] = useUpdatePhoneListMutation();
  const [editingPhoneList, setEditingPhoneList] = useState<PhoneList | null>(null);

  const handleUpdatePhoneList = () => {
    if (editingPhoneList) {
      updatePhoneList(editingPhoneList);
      setEditingPhoneList(null);
    }
  };

  const columns: ColumnDef<PhoneList>[] = [
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
      accessorKey: 'dst_number',
      header: 'Destination Number',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const phoneList = row.original;
        return (
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditingPhoneList(phoneList)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Phone List</DialogTitle>
                  <DialogDescription>
                    Make changes to your phone list here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                {/* Phone List Edit Form */}
                <Button onClick={handleUpdatePhoneList}>Save Changes</Button>
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
                    your phone list and all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deletePhoneList(phoneList.id)}>
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

  if (isLoading) return <div>Loading phone lists...</div>;
  if (isError || !phoneLists) return <div>Error loading phone lists.</div>;

  return (
    <div>
      <DataTable columns={columns} data={phoneLists} />
    </div>
  );
}
