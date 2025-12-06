import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActionsFlow } from './ActionsFlow';
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
      <div className="flex justify-between items-start mb-4">
        <TabsList>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="callerids">Caller IDs</TabsTrigger>
          <TabsTrigger value="phonelist">Phone List</TabsTrigger>
          <TabsTrigger value="schedulers">Schedulers</TabsTrigger>
        </TabsList>
        <div>
          {activeTab === 'actions' && <Button>Create Action</Button>}
          {activeTab === 'callerids' && <Button>Create Caller ID</Button>}
          {activeTab === 'phonelist' && <Button>Create Phone List</Button>}
          {activeTab === 'schedulers' && <Button>Create Scheduler</Button>}
        </div>
      </div>
      <TabsContent value="actions">
        <ActionsFlow jobId={jobId} />
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
