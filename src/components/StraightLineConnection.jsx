// src/components/StraightLineConnection.js
import React from 'react';
import { useReactFlow } from 'reactflow';

const StraightLineConnection = ({ sourcePosition, targetPosition, sourceX, sourceY, targetX, targetY }) => {
  const { getConnectedEdgePath } = useReactFlow();
  const path = getConnectedEdgePath({
    sourcePosition,
    targetPosition,
    sourceX,
    sourceY,
    targetX,
    targetY,
    type: 'straight', // Ensure the type is 'straight'
  });

  return (
    <path
      id="straight-line"
      style={{ stroke: '#000', strokeWidth: 2 }}
      d={path}
    />
  );
};

export default StraightLineConnection;
