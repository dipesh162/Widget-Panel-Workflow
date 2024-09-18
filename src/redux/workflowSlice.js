// redux/workflowSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  MarkerType,
} from '@xyflow/react';

const initialState = {
  nodes: [], // Stores workflow nodes
  edges: [
    {
      id: 'edge-button',
      source: 'button-1',
      target: 'button-2',
      type: 'buttonedge',
    },
    {
      id: 'edge-bi-1',
      source: 'bi-1',
      target: 'bi-2',
      type: 'bidirectional',
      sourceHandle: 'right',
      targetHandle: 'left',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'edge-bi-2',
      source: 'bi-2',
      target: 'bi-1',
      type: 'bidirectional',
      sourceHandle: 'left',
      targetHandle: 'right',
      markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'edge-self',
      source: 'self-1',
      target: 'self-1',
      type: 'selfconnecting',
      markerEnd: { type: MarkerType.Arrow },
    },
    // {
    //   type: 'straight',
    //   source: '1',
    //   target: '2',
    //   id: '1',
    //   label: 'straight',
    // },
    // {
    //   type: 'step',
    //   source: '2',
    //   target: '3',
    //   id: '2',
    //   label: 'step',
    // },
    // {
    //   type: 'smoothstep',
    //   source: '3',
    //   target: '4',
    //   id: '3',
    //   label: 'smoothstep',
    // },
    // {
    //   type: 'bezier',
    //   source: '4',
    //   target: '5',
    //   id: '4',
    //   label: 'bezier',
    // },
  ], // Stores edges between nodes
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
      console.log('Saving workflow to localStorage:', state.nodes, state.edges);
      localStorage.setItem('workflow', JSON.stringify({ nodes: state.nodes, edges: state.edges }));
    },
    loadWorkflow: (state) => {
      const savedWorkflow = localStorage.getItem('workflow');
      if (savedWorkflow) {
        const { nodes, edges } = JSON.parse(savedWorkflow);
        state.nodes = nodes;
        state.edges = edges;
      }
    },
  },
});

export const { addNode, addEdge, toggleEditMode, updateNodes, updateEdges, saveWorkflow, loadWorkflow } = workflowSlice.actions;

export default workflowSlice.reducer;
