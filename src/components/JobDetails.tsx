import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActionsList } from './ActionsList';
import { CallerIDsList } from './CallerIDsList';
import { PhoneListsList } from './PhoneListsList';
import { SchedulersList } from './SchedulersList';

export function JobDetails({ jobId }: { jobId: number }) {
  return (
    <Tabs defaultValue="actions" className="w-full">
      <TabsList>
        <TabsTrigger value="actions">Actions</TabsTrigger>
        <TabsTrigger value="callerids">Caller IDs</TabsTrigger>
        <TabsTrigger value="phonelist">Phone List</TabsTrigger>
        <TabsTrigger value="schedulers">Schedulers</TabsTrigger>
      </TabsList>
      <TabsContent value="actions">
        <ActionsList jobId={jobId} />
      </TabsContent>
      <TabsContent value="callerids">
        <CallerIDsList jobId={jobId} />
      </TabsContent>
      <TabsContent value="phonelist">
        <PhoneListsList jobId={jobId} />
      </TabsContent>
      <TabsContent value="schedulers">
        <SchedulersList jobId={jobId} />
      </TabsContent>
    </Tabs>
  );
}
