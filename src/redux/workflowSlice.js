import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [], // Stores workflow nodes
  edges: [], // Stores edges between nodes
  isEditing: false, // Tracks whether edit mode is on or off
};

export const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload); // Add a new node to the workflow
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload); // Add an edge between nodes
    },
    toggleEditMode: (state) => {
      state.isEditing = !state.isEditing; // Toggle edit mode
    },
    updateNodes: (state, action) => {
      state.nodes = action.payload.nodes; // Update the nodes when changes are made
    },
    updateEdges: (state, action) => {
      state.edges = action.payload.edges; // Update the edges when changes are made
    },
    saveWorkflow: (state) => {
      console.log('Workflow saved:', state.nodes, state.edges);
      // Logic to save the workflow
    },
    updateNode: (state, action) => {
      const nodeIndex = state.nodes.findIndex((node) => node.id === action.payload.id);
      if (nodeIndex !== -1) {
        state.nodes[nodeIndex] = { ...state.nodes[nodeIndex], ...action.payload }; // Update the node's details
      }
    },
  },
});

export const { addNode, addEdge, toggleEditMode, updateNodes, updateEdges, saveWorkflow, updateNode } = workflowSlice.actions;

export default workflowSlice.reducer;
