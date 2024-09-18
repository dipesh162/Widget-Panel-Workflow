import React, { useState, useEffect } from 'react';
import './AddWorkflowPopup.css'

const AddWorkflowPopup = ({ node, onClose, onAddNode, onUpdateNode }) => {
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (node) {
      setLabel(node.data?.label || ''); // Pre-fill the label if editing
    }
  }, [node]);

  const handleSubmit = () => {
    const updatedNode = {
      ...node,
      data: { label },
    };

    if (node) {
      onUpdateNode(updatedNode); // Update the node
    } else {
      onAddNode({
        id: `${new Date().getTime()}`,
        data: { label },
        position: { x: Math.random() * 250, y: Math.random() * 250 },
      });
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>{node ? 'Edit Node' : 'Add Node'}</h3>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Node Label"
        />
        <button onClick={handleSubmit}>{node ? 'Update Node' : 'Add Node'}</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddWorkflowPopup;
