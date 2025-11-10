import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  useGetDomainsQuery,
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} from '@/lib/state/apiSlice';
import { JobsList } from './JobsList';
import { Button } from './ui/button';
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

export function DomainsAccordion() {
  const { data: domains, isLoading, isError } = useGetDomainsQuery();
  const [deleteDomain] = useDeleteDomainMutation();
  const [updateDomain] = useUpdateDomainMutation();
  const [editingDomain, setEditingDomain] = useState<{ id: number; name: string } | null>(null);

  if (isLoading) {
    return <div>Loading domains...</div>;
  }

  if (isError || !domains) {
    return <div>Error loading domains.</div>;
  }

  const handleUpdateDomain = () => {
    if (editingDomain) {
      updateDomain({ id: editingDomain.id, name: editingDomain.name });
      setEditingDomain(null);
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {domains.map((domain) => (
        <AccordionItem key={domain.id} value={`item-${domain.id}`}>
          <AccordionTrigger>
            <div className="flex justify-between w-full items-center">
              <span>{domain.name}</span>
              <div className="flex gap-2 mr-2">
                <Dialog open={editingDomain?.id === domain.id} onOpenChange={(isOpen) => !isOpen && setEditingDomain(null)}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingDomain({ id: domain.id, name: domain.name ?? '' });
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Domain</DialogTitle>
                      <DialogDescription>
                        Make changes to your domain here. Click save when you're
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <input
                      type="text"
                      value={editingDomain?.name ?? ''}
                      onChange={(e) =>
                        setEditingDomain(
                          editingDomain ? { ...editingDomain, name: e.target.value } : null
                        )
                      }
                      className="border p-2 rounded"
                    />
                    <Button onClick={handleUpdateDomain}>Save Changes</Button>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your domain and all associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteDomain(domain.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <JobsList domainId={domain.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
