// React
import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  // Edge,
} from 'reactflow';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateNodes, updateEdges, toggleEditMode, saveWorkflow, loadWorkflow, addNode } from '../../redux/workflowSlice';

// Styles
import 'reactflow/dist/style.css';

// Components
import ButtonEdge from './ButtonEdge.tsx';
import SelfConnectingEdge from './SelfConnectingEdge';
import BiDirectionalEdge from './BiDirectionalEdge';
import BiDirectionalNode from './BiDirectionalNode';
import AddWorkflowPopup from '../AddWorkflowPopup';
import StraightLineConnection from '../StraightLineConnection'; // Import your custom line

const edgeTypes = {
  bidirectional: BiDirectionalEdge,
  selfconnecting: SelfConnectingEdge,
  buttonedge: ButtonEdge,
};

const nodeTypes = {
  bidirectional: BiDirectionalNode,
};


const WorkflowPanel = () => {
  const dispatch = useDispatch();
  const { nodes, edges, isEditing } = useSelector((state) => state.workflow);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  
  const [localNodes, setLocalNodes, onNodesChange] = useNodesState(nodes);
  const [localEdges, setLocalEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setLocalNodes(nodes);
    setLocalEdges(edges);
  }, [nodes, edges, setLocalNodes, setLocalEdges]);

  useEffect(() => {
    dispatch(loadWorkflow());
  }, [dispatch]);

  const handleNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, localNodes);
      setLocalNodes(updatedNodes);
      dispatch(updateNodes({ nodes: updatedNodes }));
    },
    [dispatch, localNodes, setLocalNodes]
  );

  const handleEdgesChange = useCallback(
    (changes) => {
      const updatedEdges = applyEdgeChanges(changes, localEdges);
      setLocalEdges(updatedEdges);
      dispatch(updateEdges({ edges: updatedEdges }));
    },
    [dispatch, localEdges, setLocalEdges]
  );

  const handleConnect = useCallback(
    (params) => {
      const updatedEdges = addEdge(params, localEdges);
      setLocalEdges(updatedEdges);
      dispatch(updateEdges({ edges: updatedEdges }));
    },
    [dispatch, localEdges, setLocalEdges]
  );

  const handleNodeClick = (event, node) => {
    if (isEditing) {
      setSelectedNode(node);
      setShowPopup(true);
    }
  };

  const handleEditToggle = () => {
    dispatch(toggleEditMode());
  };

  const handleSave = () => {
    const nodesLength = nodes.nodesLength
    if(nodesLength>1){
      dispatch(saveWorkflow());
    } else {
      alert('Add 2 or more node to save')
    }
  };

  const handleShowPopup = (node = null) => {
    setSelectedNode(node);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedNode(null);
  };

  const handleAddNode = (newNode) => {
    dispatch(addNode(newNode));
    handleClosePopup();
  };

  const handleUpdateNode = (updatedNode) => {
    dispatch(updateNode(updatedNode));
    handleClosePopup();
  };

  return (
    <div className="workflow-panel">
      <div className="toolbar">
        <button onClick={() => handleShowPopup()}>Add</button>
        <button onClick={handleEditToggle}>
          {isEditing ? 'Stop Editing' : 'Edit'}
        </button>
        <button onClick={handleSave}>Save</button>
      </div>

      {showPopup && (
        <AddWorkflowPopup
          node={selectedNode}
          onClose={handleClosePopup}
          onAddNode={handleAddNode}
          onUpdateNode={handleUpdateNode}
        />
      )}

      <ReactFlow
        nodes={localNodes}
        edges={localEdges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        fitView
        edgeTypes={edgeTypes}
        // edgeTypes={{ straight: StraightLineConnection }} // Specify custom edge type
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default WorkflowPanel;
