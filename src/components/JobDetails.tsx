import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActionsList } from './ActionsList';
import { CallerIDsList } from './CallerIDsList';
import { PhoneListsList } from './PhoneListsList';
import { SchedulersList } from './SchedulersList';
import { Button } from './ui/button';

export function JobDetails({ jobId }: { jobId: number }) {
  const [activeTab, setActiveTab] = useState('actions');

  return (
    <Tabs
      defaultValue="actions"
      className="w-full"
      onValueChange={setActiveTab}
    >
      <div className="flex justify-between items-start">
        <TabsList>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="callerids">Caller IDs</TabsTrigger>
          <TabsTrigger value="phonelist">Phone List</TabsTrigger>
          <TabsTrigger value="schedulers">Schedulers</TabsTrigger>
        </TabsList>
        <div className="mr-2">
          {activeTab === 'actions' && <Button>Add</Button>}
          {activeTab === 'callerids' && <Button>Add</Button>}
          {activeTab === 'phonelist' && <Button>Add</Button>}
          {activeTab === 'schedulers' && <Button>Add</Button>}
        </div>
      </div>
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
