import React, { useState, useEffect } from 'react';
import Schedule from './Schedule';
import Guard from './Guard';
import { DAYS, SHIFT_TYPES } from '../constants';
import ScheduleTable from './ScheduleTable';

const SchedulePlanner = ({ guards: guardsData, availability, incrementShiftCount }) => {
  const [guards, setGuards] = useState(new Map());
  const [schedule] = useState(new Schedule());
  const [alertMessages, setAlertMessages] = useState([]);

  useEffect(() => {
    initializeGuardsAndSchedule();
  }, [guardsData, availability]);

  const initializeGuardsAndSchedule = () => {
    let guardsMap = new Map();
    guardsData.forEach((name) => {
      guardsMap.set(name, new Guard(name, availability[name]));
    });
    setGuards(guardsMap);
    assignGuardsToShifts(guardsMap);
  };

  const calculateExpectedShifts = (guardsMap) => {
    let totalAvailableShifts = 0;

    // Calculate the total available shifts
    guardsMap.forEach(guard => {
      totalAvailableShifts += guard.getTotalAvailableShifts();
    });

    // Calculate expected shifts for each guard based on availability
    guardsMap.forEach(guard => {
      const proportion = guard.getTotalAvailableShifts() / totalAvailableShifts;
      const expectedShifts = Math.round(proportion * 21); // Assuming 21 total shifts
      guard.setExpectedShifts(expectedShifts);
    });
  };

  const assignGuardsToShifts = (guardsMap) => {
    let alertMessages = [];
    let allShiftsFilled = true;

    // Calculate expected shifts per guard based on availability
    calculateExpectedShifts(guardsMap);

    DAYS.forEach(day => {
      let shifts = schedule.getShiftsForDay(day);
      if (!shifts || shifts.length === 0) {
        console.log(`No shifts found for ${day}`);
        return;
      }

      shifts.forEach(shift => {
        let dayIndex = getDayIndex(day);
        let shiftTypeIndex = getShiftTypeIndex(shift.getShiftType());

        let availableGuards = getAvailableGuards(dayIndex, shiftTypeIndex, guardsMap);

        // Shuffle the guards randomly
        availableGuards.sort(() => Math.random() - 0.5);

        // Sort guards based on the number of assigned shifts compared to their expected shifts
        availableGuards.sort((g1, g2) => {
          const diff1 = g1.getAssignedShiftsCount() - g1.expectedShifts;
          const diff2 = g2.getAssignedShiftsCount() - g2.expectedShifts;
          return diff1 - diff2;
        });

        availableGuards.forEach(guard => {
          if (shift.getAssignedGuards().length < shift.getRequiredGuards() && canAssignGuard(guard, shift)) {
            shift.assignGuard(guard);
            guard.incrementAssignedShiftsCount();
            incrementShiftCount(guard.getName());
          }
        });

        if (shift.getAssignedGuards().length < shift.getRequiredGuards()) {
          alertMessages.push(`PROBLEM: Not enough guards for ${day} ${shift.getShiftType()}`);
          allShiftsFilled = false;
        }
      });
    });

    setAlertMessages(alertMessages);
  };

  const getAvailableGuards = (day, shiftType, guardsMap) => {
    return Array.from(guardsMap.values()).filter(guard => guard.isAvailable(day, shiftType));
  };

  const canAssignGuard = (guard, shift) => {
    if (schedule.getShiftsForDay(shift.getDay()).some(s => s.getAssignedGuards().includes(guard))) {
      return false;
    }

    if (shift.getShiftType() === 'Morning') {
      const previousDay = getPreviousDay(shift.getDay());
      if (previousDay && schedule.getShiftsForDay(previousDay).some(s => s.getShiftType() === 'Night' && s.getAssignedGuards().includes(guard))) {
        return false;
      }
    }

    return true;
  };

  const getPreviousDay = (currentDay) => {
    const index = DAYS.indexOf(currentDay);
    return index === 0 ? null : DAYS[index - 1];
  };

  const getDayIndex = (day) => {
    return DAYS.indexOf(day);
  };

  const getShiftTypeIndex = (shiftType) => {
    return SHIFT_TYPES.indexOf(shiftType);
  };

  return (
    <div>
      <ScheduleTable schedule={schedule} />
      {alertMessages.length > 0 && (
        <div className="alert-messages">
          <h3>Alerts</h3>
          <ul>
            {alertMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SchedulePlanner;
