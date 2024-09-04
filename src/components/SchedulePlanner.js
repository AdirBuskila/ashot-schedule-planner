import React, { useState, useEffect } from 'react';
import Schedule from './Schedule';
import ScheduleTable from './ScheduleTable';
import AlertMessages from './AlertMessages';
import {
  initializeGuardsMap,
  assignGuardsToShifts,
} from '../utils/scheduleUtils';

const MAX_ATTEMPTS = 100;

const SchedulePlanner = ({ guards: guardsData, availability, incrementShiftCount, resetShiftCounts, i8 }) => {
  const [guards, setGuards] = useState(new Map());
  const [schedule, setSchedule] = useState(new Schedule());
  const [alertMessages, setAlertMessages] = useState([]);

  useEffect(() => {
    runSchedulingProcess();
  }, [guardsData, availability]);

  const runSchedulingProcess = () => {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      resetShiftCounts(); // Reset shift counts before each attempt
      const guardsMap = initializeGuardsMap(guardsData, availability);
      resetGuardsAssignedShifts(guardsMap);

      const newSchedule = new Schedule(); // Reset schedule each attempt

      setGuards(guardsMap);
      setSchedule(newSchedule);
      setAlertMessages([]);

      const isSuccess = assignGuardsToShifts(guardsMap, newSchedule, incrementShiftCount, setAlertMessages);

      if (isSuccess) {
        setSchedule(newSchedule);
        console.log("Schedule created successfully");
        break;
      } else if (attempt === MAX_ATTEMPTS) {
        setAlertMessages(prev => [...prev, `FAILED: Could not create a complete schedule after ${MAX_ATTEMPTS} attempts.`]);
      }
    }
  };

  const resetGuardsAssignedShifts = (guardsMap) => {
    guardsMap.forEach(guard => {
      guard.resetAssignedShiftsCount(); // Reset assigned shifts count to 0
    });
  };

  return (
    <div>
      <ScheduleTable schedule={schedule} i8={i8} />
      {alertMessages.length > 0 && (
        <AlertMessages messages={alertMessages} i8={i8} />
      )}
    </div>
  );
};

export default SchedulePlanner;
