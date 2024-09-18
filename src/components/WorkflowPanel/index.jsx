import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import CustomNode from './CustomNode'; // Import your custom node

import { useDispatch, useSelector } from 'react-redux';
import 'reactflow/dist/style.css';
import {
  updateNodes,
  updateEdges,
  toggleEditMode,
  saveWorkflow,
  addNode,
  updateNode, // Import updateNode action
} from '../../redux/workflowSlice';
import AddWorkflowPopup from '../AddWorkflowPopup'; // Popup component


const nodeTypes = {
  customNode: CustomNode, // Register the custom node type
};

const WorkflowPanel = () => {
  const dispatch = useDispatch();
  const { nodes, edges, isEditing } = useSelector((state) => state.workflow);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  

  // Initialize local node and edge state
  const [localNodes, setLocalNodes, onNodesChange] = useNodesState(nodes);
  const [localEdges, setLocalEdges, onEdgesChange] = useEdgesState(edges);

  // Sync local state with Redux state
  React.useEffect(() => {
    setLocalNodes(nodes);
    setLocalEdges(edges);
  }, [nodes, edges, setLocalNodes, setLocalEdges]);

  // React.useEffect(()=>{
  //   if(isEditing){
  //     setShowPopup(true)
  //   }
  // },[isEditing])

  // Handle node changes
  const handleNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, localNodes);
      setLocalNodes(updatedNodes);
      dispatch(updateNodes({ nodes: updatedNodes }));
    },
    [dispatch, localNodes, setLocalNodes]
  );

  // Handle edge changes
  const handleEdgesChange = useCallback(
    (changes) => {
      const updatedEdges = applyEdgeChanges(changes, localEdges);
      setLocalEdges(updatedEdges);
      dispatch(updateEdges({ edges: updatedEdges }));
    },
    [dispatch, localEdges, setLocalEdges]
  );

  // Handle node connections
  const handleConnect = useCallback(
    (params) => {
      const updatedEdges = addEdge(params, localEdges);
      setLocalEdges(updatedEdges);
      dispatch(updateEdges({ edges: updatedEdges }));
    },
    [dispatch, localEdges, setLocalEdges]
  );

  // Handle node click (for selection or editing)
  const handleNodeClick = (event, node) => {
    if (isEditing) {
      setSelectedNode(node); // Set the selected node for editing
      setShowPopup(true); // Open popup to edit node
    }
  };

  // Toggle editing mode
  const handleEditToggle = () => {
    dispatch(toggleEditMode());
  };

  // Save workflow
  const handleSave = () => {
    dispatch(saveWorkflow()); // Save workflow to Redux or backend
  };

  // Show popup to add or edit a node
  const handleShowPopup = (node = null) => {
    setSelectedNode(node); // If node is null, it's for adding a new one
    setShowPopup(true);
  };

  // Hide popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedNode(null);
  };

  // Add a new node from the popup
  const handleAddNode = (newNode) => {
    dispatch(addNode(newNode));
    handleClosePopup();
  };

  // Update an existing node from the popup
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
        onConnect={handleConnect} // Handle node connection logic
        onNodeClick={handleNodeClick} // Enable node editing
        nodeTypes={nodeTypes} // Pass the custom node types
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default WorkflowPanel;
