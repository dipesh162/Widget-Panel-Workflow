import React from 'react';
import { Handle } from 'reactflow';

const CustomNode = ({ data }) => {
  return (
    <div className="custom-node">
      <div>{data.label}</div>
      {/* Add handles for top, right, bottom, and left */}
      <Handle type="source" position="top" id="top" style={{ background: '#555' }} />
      <Handle type="source" position="right" id="right" style={{ background: '#555' }} />
      <Handle type="source" position="bottom" id="bottom" style={{ background: '#555' }} />
      <Handle type="source" position="left" id="left" style={{ background: '#555' }} />

      {/* Add input handles on all sides if needed */}
      <Handle type="target" position="top" id="input-top" style={{ background: '#000' }} />
      <Handle type="target" position="right" id="input-right" style={{ background: '#000' }} />
      <Handle type="target" position="bottom" id="input-bottom" style={{ background: '#000' }} />
      <Handle type="target" position="left" id="input-left" style={{ background: '#000' }} />
    </div>
  );
};

export default CustomNode;
