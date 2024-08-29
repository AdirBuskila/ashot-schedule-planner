import React, { useState, useEffect } from 'react';
import { content } from '../i8';
import { DAYS, SHIFT_TYPES } from '../constants';

const LOCAL_STORAGE_KEY = 'lastForm';

const AvailabilityForm = ({ guards, onSubmit, i8 }) => {
  const [availability, setAvailability] = useState(() => {
    // Load availability from local storage if available
    const savedAvailability = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedAvailability ? JSON.parse(savedAvailability) : initializeAvailability(guards);
  });

  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    // Save availability to local storage whenever it changes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(availability));
  }, [availability]);

  const initializeAvailability = (guards) => {
    return guards.reduce((acc, guard) => {
      acc[guard] = Array(DAYS.length).fill(null).map(() => Array(SHIFT_TYPES.length).fill(false));
      return acc;
    }, {});
  };

  const handleChange = (guard, dayIndex, shiftIndex) => {
    const newAvailability = { ...availability };
    if (newAvailability[guard] && newAvailability[guard][dayIndex]) {
      newAvailability[guard][dayIndex][shiftIndex] = !newAvailability[guard][dayIndex][shiftIndex];
      setAvailability(newAvailability);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(availability);
    // Save to local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(availability));
  };

  const checkAll = () => {
    setIsAllChecked(true);
    const allChecked = guards.reduce((acc, guard) => {
      acc[guard] = Array(DAYS.length).fill(null).map(() => Array(SHIFT_TYPES.length).fill(true));
      return acc;
    }, {});
    setAvailability(allChecked);
  };

  const uncheckAll = () => {
    setIsAllChecked(false);
    const allUnchecked = guards.reduce((acc, guard) => {
      acc[guard] = Array(DAYS.length).fill(null).map(() => Array(SHIFT_TYPES.length).fill(false));
      return acc;
    }, {});
    setAvailability(allUnchecked);
  };

  const resetForm = () => {
    const initialAvailability = initializeAvailability(guards);
    setAvailability(initialAvailability);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <form className="availability-form" onSubmit={handleSubmit}>
      <h2>{content[i8].setAvailability}</h2>
      <p>{content[i8].availabilityInstructions}</p>
      <div className="button-container">
        {!isAllChecked ? (
          <button type="button" onClick={checkAll}>{content[i8].checkAll}</button>
        ) : (
          <button type="button" onClick={uncheckAll}>{content[i8].uncheckAll}</button>
        )}
        <button type="button" onClick={resetForm}>{content[i8].reset}</button>
      </div>
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
                    checked={availability[guard] && availability[guard][dayIndex] ? availability[guard][dayIndex][shiftIndex] : false}
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
      <button className="availability-submit-button" type="submit">{content[i8].submit}</button>
    </form>
  );
};

export default AvailabilityForm;
