/**
 * @file Flow.tsx 流程图组件
 *
 * @author lanyuanxiaoyao
 * @created: 2025/03/11
 */

import React from 'react';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Handle,
  MiniMap,
  Node,
  NodeTypes,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow
} from '@xyflow/react';
import {Position, Connection, EdgeBase} from '@xyflow/system';
import {themeable, ThemeProps} from 'amis-core';
import {LocaleProps, localeable} from 'amis-core';
import '@xyflow/react/dist/style.css';
import {isString, uniqueId} from 'lodash';

const AsideBar: React.FC<{}> = () => {
  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <>
      <aside>
        <div className="description">
          You can drag these nodes to the pane on the right.
        </div>
        <div
          className="dndnode input"
          onDragStart={event => onDragStart(event, 'input')}
          draggable
        >
          Input Node
        </div>
        <div
          className="dndnode"
          onDragStart={event => onDragStart(event, 'default')}
          draggable
        >
          Default Node
        </div>
        <div
          className="dndnode output"
          onDragStart={event => onDragStart(event, 'output')}
          draggable
        >
          Output Node
        </div>
      </aside>
    </>
  );
};

export interface FlowProps extends LocaleProps, ThemeProps {
  source?: string | object;
  value?: string | object;
  miniMap?: boolean;
  controlBar?: boolean;
  nodeTypes?: string[];
  nodeRender?: (
    id: string,
    type: string,
    nodeData: Record<string, any>,
    onNodeFormChange: (id: string, value: any) => void
  ) => JSX.Element;
  onChange?: (value?: string | object) => void;
}

const Flow: React.FC<FlowProps> = props => {
  const {translate: __, classnames: cx, className, onChange} = props;
  const [data, setData] = React.useState<any | undefined>(props.source);
  React.useEffect(() => setData(props.value), [props.value]);

  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[]);
  const onConnect = React.useCallback(
    (params: EdgeBase | Connection) =>
      setEdges(edges => addEdge(params, edges)),
    [setEdges]
  );

  React.useEffect(() => {
    let temp: any | undefined;
    if (!data) {
      return;
    } else if (isString(data)) {
      temp = JSON.parse(data);
    } else {
      temp = data;
    }
    setNodes(temp?.nodes ?? []);
    setEdges(temp?.edges ?? []);
  }, [data]);

  React.useEffect(() => {
    if (onChange) {
      onChange({
        nodes,
        edges
      });
    }
  }, [nodes, edges]);

  const nodeTypes = React.useMemo(() => {
    let types: NodeTypes = {};
    props.nodeTypes?.forEach(nodeType => {
      types[nodeType] = ({id, type, data}) => {
        const onNodeFormChange = (id: string, value: any) => {
          setNodes(nodes =>
            nodes.map(node => {
              if (node.id === id) {
                return {
                  ...node,
                  data: {
                    ...value
                  }
                };
              } else {
                return node;
              }
            })
          );
        };
        return (
          <>
            <Handle type="target" position={Position.Top} />
            {props.nodeRender
              ? props.nodeRender(id, type, data, onNodeFormChange)
              : null}
            <Handle type="source" position={Position.Bottom} />
          </>
        );
      };
    });
    return types;
  }, []);

  const {screenToFlowPosition} = useReactFlow();

  const onDragOver = React.useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = React.useCallback(
    (event: any) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      });
      const newNode: Node = {
        id: uniqueId('node-'),
        type,
        position,
        data: {label: `${type} node`}
      };

      setNodes(nds => nds.concat(newNode));
    },
    [screenToFlowPosition]
  );

  return (
    <>
      <div className={cx('Flow', className)} style={{height: '50vh'}}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Panel>
            <AsideBar />
          </Panel>
          {props.controlBar && <Controls />}
          {props.miniMap && <MiniMap />}
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
};

const FlowProvider: React.FC<FlowProps> = props => {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
};

export default themeable(localeable(FlowProvider));
