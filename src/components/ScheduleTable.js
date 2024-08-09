// src/components/ScheduleTable.js
import React from 'react';
import { content } from '../i8';
import { DAYS, SHIFT_TYPES } from '../constants';

const ScheduleTable = ({ schedule, i8 }) => (
  <div className="schedule-table">
    <h2>{content[i8].scheduleOverview}</h2>
    <table>
      <thead>
        <tr>
          <th>Shift\Day</th>
          {DAYS.map(day => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {SHIFT_TYPES.map(shiftType => (
          <tr key={shiftType}>
            <td>{shiftType}</td>
            {DAYS.map(day => {
              const shifts = schedule.getShiftsForDay(day);
              if (!shifts || shifts.length === 0) {
                return <td key={day}>No shift</td>;
              }

              const shift = shifts.find(s => s.getShiftType() === shiftType);
              return (
                <td key={day}>
                  {shift ? shift.getAssignedGuards().map(guard => guard.name).join(', ') : 'No shift'}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ScheduleTable;
