import React, { useState, useEffect } from 'react';
import { content } from '../i8';
import { DAYS, SHIFT_TYPES } from '../constants';

const LOCAL_STORAGE_KEY = 'lastForm';

const AvailabilityForm = ({ guards, onSubmit, i8 }) => {
  const [availability, setAvailability] = useState(() => {
    const savedAvailability = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedAvailability ? JSON.parse(savedAvailability) : initializeAvailability(guards);
  });

  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(availability));
  }, [availability]);

  const initializeAvailability = (guards) => {
    return guards.reduce((acc, guard) => {
      acc[guard] = Array(DAYS.length)
        .fill(null)
        .map(() => Array(SHIFT_TYPES.length).fill(false));
      return acc;
    }, {});
  };

  const handleChange = (guard, dayIndex, shiftIndex) => {
    setAvailability((prevAvailability) => {
      const newAvailability = { ...prevAvailability };
      if (newAvailability[guard] && newAvailability[guard][dayIndex]) {
        newAvailability[guard][dayIndex][shiftIndex] = !newAvailability[guard][dayIndex][shiftIndex];
      }
      return newAvailability;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(availability);
  };

  const toggleCheckAll = () => {
    setIsAllChecked((prevIsAllChecked) => {
      const newIsAllChecked = !prevIsAllChecked;
      const newAvailability = guards.reduce((acc, guard) => {
        acc[guard] = Array(DAYS.length)
          .fill(null)
          .map(() => Array(SHIFT_TYPES.length).fill(newIsAllChecked));
        return acc;
      }, {});
      setAvailability(newAvailability);
      return newIsAllChecked;
    });
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
        <button type="button" onClick={toggleCheckAll}>
          {isAllChecked ? content[i8].uncheckAll : content[i8].checkAll}
        </button>
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
                    checked={
                      availability[guard] && availability[guard][dayIndex]
                        ? availability[guard][dayIndex][shiftIndex]
                        : false
                    }
                    onChange={() => handleChange(guard, dayIndex, shiftIndex)}
                    id={`${guard}-${day}-${shiftType}`}
                  />
                  {content[i8].shiftTypes[shiftIndex]}
                </label>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button className="availability-submit-button" type="submit">
        {content[i8].submit}
      </button>
    </form>
  );
};

export default AvailabilityForm;
