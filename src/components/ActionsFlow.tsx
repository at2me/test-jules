import { useGetActionsQuery } from '@/lib/state/apiSlice';
import ReactFlow, { MiniMap, Controls, Background, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { useMemo } from 'react';
import { Action } from '@/lib/state/types';

const position = { x: 0, y: 0 };

const transformToNodesAndEdges = (actions: Action[]) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  actions.forEach((action, index) => {
    nodes.push({
      id: action.id.toString(),
      data: { label: `${action.type} (priority: ${action.priority})` },
      position: { x: index * 250, y: 100 },
    });

    if (action.next_action_id) {
      edges.push({
        id: `e${action.id}-${action.next_action_id}`,
        source: action.id.toString(),
        target: action.next_action_id.toString(),
      });
    }
  });

  return { nodes, edges };
};

export function ActionsFlow({ jobId }: { jobId: number }) {
  const { data: actions, isLoading, isError } = useGetActionsQuery(jobId);

  const { nodes, edges } = useMemo(() => {
    if (!actions) return { nodes: [], edges: [] };
    return transformToNodesAndEdges(actions);
  }, [actions]);

  if (isLoading) return <div>Loading actions...</div>;
  if (isError || !actions) return <div>Error loading actions.</div>;

  return (
    <div style={{ height: '500px' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
