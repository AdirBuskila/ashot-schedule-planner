// Assuming you're using this in a component like `GuardList` or similar
import React from 'react';

const GuardList = ({ guards }) => {
  return (
    <div>
      {guards.map((guard, index) => (
        <div key={index}>
          <h2>{guard.name}</h2>
          <p>Assigned Shifts: {guard.assignedShiftsCount}</p>
        </div>
      ))}
    </div>
  );
};

export default GuardList;
