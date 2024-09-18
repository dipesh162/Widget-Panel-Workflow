// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Redux
import workflowReducer from './redux/workflowSlice';

// Components
import WorkflowPanel from './components/WorkflowPanel';
import { Toolbar } from './components/Toolbar';

// Styles
import './index.css'; // Add custom CSS here

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
