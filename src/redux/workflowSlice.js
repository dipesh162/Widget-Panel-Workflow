// redux/workflowSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  MarkerType,
  // Position
} from '@xyflow/react';

const initialState = {
  nodes: [
    // {
    //   id: 'button-1',
    //   type: 'input',
    //   data: { label: 'Button Edge 1' },
    //   position: { x: 125, y: 0 },
    // },
    // {
    //   id: 'button-2',
    //   data: { label: 'Button Edge 2' },
    //   position: { x: 125, y: 200 },
    // },
    // {
    //   id: 'bi-1',
    //   data: { label: 'Bi Directional 1' },
    //   position: { x: 0, y: 300 },
    //   type: 'bidirectional',
    //   // sourcePosition: Position.Right,
    //   // targetPosition: Position.Left,
    // },
    // {
    //   id: 'bi-2',
    //   data: { label: 'Bi Directional 2' },
    //   position: { x: 250, y: 300 },
    //   type: 'bidirectional',
    //   // sourcePosition: Position.Right,
    //   // targetPosition: Position.Left,
    // },
    // {
    //   id: 'self-1',
    //   data: { label: 'Self Connecting' },
    //   position: { x: 125, y: 500 },
    //   // sourcePosition: Position.Right,
    //   // targetPosition: Position.Left,
    // },
  ], // Stores workflow nodes
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
