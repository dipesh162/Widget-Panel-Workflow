// React
import React from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { saveWorkflow } from '../redux/workflowSlice';

export const SaveButton = () => {
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(saveWorkflow());
    alert('Workflow saved successfully!');
  };

  return <button onClick={handleSave}>Save Workflow</button>;
};
