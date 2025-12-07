import { useGetActionsQuery, useGetConnectionsQuery } from '@/lib/state/apiSlice';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, useEffect, useMemo } from 'react';
import { Action, ActionConnection } from '@/lib/state/types';
import { Button } from '../ui/button';

let id = 3;
const getId = () => `${id++}`;

const transformActionsToNodes = (actions: Action[]): Node[] => {
  return actions.map((action) => ({
    id: action.id.toString(),
    data: { label: `${action.type} (priority: ${action.priority})` },
    position: action.data.position || { x: Math.random() * 400, y: Math.random() * 400 },
  }));
};

const transformConnectionsToEdges = (connections: ActionConnection[]): Edge[] => {
  return connections.map((connection) => ({
    id: `e${connection.source}-${connection.target}`,
    source: connection.source.toString(),
    target: connection.target.toString(),
    label: connection.condition,
  }));
};

export function ActionsFlow({ jobId }: { jobId: number }) {
  const { data: initialActions, isLoading: isLoadingActions, isError: isErrorActions } = useGetActionsQuery(jobId);
  const { data: initialConnections, isLoading: isLoadingConnections, isError: isErrorConnections } = useGetConnectionsQuery(jobId);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (initialActions) {
      setNodes(transformActionsToNodes(initialActions));
    }
  }, [initialActions, setNodes]);

  useEffect(() => {
    if (initialConnections) {
      setEdges(transformConnectionsToEdges(initialConnections));
    }
  }, [initialConnections, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onAdd = useCallback(() => {
    const newNode = {
      id: getId(),
      data: { label: 'New Action' },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  if (isLoadingActions || isLoadingConnections) return <div>Loading...</div>;
  if (isErrorActions || isErrorConnections) return <div>Error loading data.</div>;

  return (
    <div style={{ height: '500px' }}>
      <Button onClick={onAdd} className="mb-4">
        Add Action
      </Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
