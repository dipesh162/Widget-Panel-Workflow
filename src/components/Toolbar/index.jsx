// src/components/Toolbar.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddWorkflowPopup from '../AddWorkflowPopup';
import { toggleEditMode, saveWorkflow } from '../../redux/workflowSlice';
import './Toolbar.css';

export const Toolbar = () => {
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => state.workflow.isEditing); // Get the current edit mode from Redux
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Handle adding a new node (popup open)
  const handleAdd = () => {
    setIsPopupOpen(true);
  };

  // Handle saving the workflow
  const handleSave = () => {
    dispatch(saveWorkflow());
  };

  // Handle toggling edit mode
  const handleEditToggle = () => {
    dispatch(toggleEditMode());
  };

  return (
    <div className="toolbar-main">
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleEditToggle}>
        {isEditing ? 'Stop Editing' : 'Edit'}
      </button>
      <button onClick={handleSave}>Save</button>

      {/* Show Add Workflow Popup */}
      {isPopupOpen && <AddWorkflowPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};
