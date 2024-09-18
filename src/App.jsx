import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import workflowReducer from './redux/workflowSlice';
import WorkflowPanel from './components/WorkflowPanel';
import './index.css'; // Add custom CSS here
import { Toolbar } from './components/Toolbar';

const store = configureStore({
  reducer: {
    workflow: workflowReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <WorkflowPanel />
  </Provider>
);
