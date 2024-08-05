// src/components/AvailabilityForm.js
import React from 'react';
import { DAYS, SHIFT_TYPES } from '../constants';

const AvailabilityForm = ({ guards, onSubmit }) => {
  const [availability, setAvailability] = React.useState(
    guards.reduce((acc, guard) => {
      acc[guard] = Array(DAYS.length).fill(null).map(() => Array(SHIFT_TYPES.length).fill(false));
      return acc;
    }, {})
  );

  const handleChange = (guard, dayIndex, shiftIndex) => {
    const newAvailability = { ...availability };
    newAvailability[guard][dayIndex][shiftIndex] = !newAvailability[guard][dayIndex][shiftIndex];
    setAvailability(newAvailability);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(availability);
  };

  const checkAll = () => {
    const allChecked = guards.reduce((acc, guard) => {
      acc[guard] = Array(7).fill([true, true, true]);
      return acc;
    }, {});
    setAvailability(allChecked);
  };

  return (
    <form className="availability-form" onSubmit={handleSubmit}>
      <h2>Set Availability</h2>
      <p>Select the shifts each guard is available for on each day:</p>
      <button type="button" onClick={checkAll}>Check All</button>
      {guards.map((guard, guardIndex) => (
        <div key={guardIndex} className="guard-availability">
          <h3>{guard}</h3>
          {DAYS.map((day, dayIndex) => (
            <div key={dayIndex} className="day-container">
              <strong>{day}</strong>
              {SHIFT_TYPES.map((shiftType, shiftIndex) => (
                <label key={shiftIndex}>
                  <input
                    type="checkbox"
                    checked={availability[guard][dayIndex][shiftIndex]}
                    onChange={() => handleChange(guard, dayIndex, shiftIndex)}
                    id={`${guard}-${day}-${shiftType}`} // Unique identifier
                  />
                  {shiftType}
                </label>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button className="availability-submit-button" type="submit">Submit</button>
    </form>
  );
};

export default AvailabilityForm;
