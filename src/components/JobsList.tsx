import {
  useGetJobsQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
} from '@/lib/state/apiSlice';
import { JobDetails } from './JobDetails';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';
import { Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
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
} from './ui/alert-dialog';
import { useState } from 'react';

export function JobsList({ domainId }: { domainId: number }) {
  const { data: jobs, isLoading, isError } = useGetJobsQuery(domainId);
  const [deleteJob] = useDeleteJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const [editingJob, setEditingJob] = useState<{ id: number; name: string } | null>(null);

  if (isLoading) {
    return <div>Loading jobs...</div>;
  }

  if (isError || !jobs) {
    return <div>Error loading jobs.</div>;
  }

  const handleUpdateJob = () => {
    if (editingJob) {
      updateJob({ id: editingJob.id, name: editingJob.name });
      setEditingJob(null);
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {jobs.map((job) => (
        <AccordionItem key={job.id} value={`job-${job.id}`}>
          <AccordionTrigger>
            <div className="flex justify-between w-full items-center">
              <span>{job.name}</span>
              <div className="flex gap-2 mr-2">
                <Dialog open={editingJob?.id === job.id} onOpenChange={(isOpen) => !isOpen && setEditingJob(null)}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingJob({ id: job.id, name: job.name ?? '' });
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Job</DialogTitle>
                      <DialogDescription>
                        Make changes to your job here. Click save when you're
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <input
                      type="text"
                      value={editingJob?.name ?? ''}
                      onChange={(e) =>
                        setEditingJob(
                          editingJob ? { ...editingJob, name: e.target.value } : null
                        )
                      }
                      className="border p-2 rounded"
                    />
                    <Button onClick={handleUpdateJob}>Save Changes</Button>
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
                        delete your job and all associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteJob(job.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <JobDetails jobId={job.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
