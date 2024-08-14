import React from 'react';
import { content } from '../i8';
import { DAYS, SHIFT_TYPES, week, getDateForDay } from '../constants';
import { getDisplayName, getShiftTypeWithEmoji, mapShiftTypeToEnglish } from '../utils/tableUtils';

const ScheduleTable = ({ schedule, i8 }) => {
  const guardNamesMapping = content[i8].guardNames;
  const daysOfWeek = content[i8].days;
  const shiftTypes = content[i8].shiftTypes;

  return (
    <div className="schedule-table">
      <h2>{content[i8].scheduleOverview}</h2>
      <table>
        <thead>
          <tr>
            <th>{content[i8].shiftDay}</th>
            {DAYS.map((day, index) => {
              const date = getDateForDay(week.sundayDate, index);
              return (
                <th key={index}>
                  {daysOfWeek[index]} {date}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {shiftTypes.map((shiftType, index) => (
            <tr key={index}>
              <td>{getShiftTypeWithEmoji(shiftType, i8)}</td>
              {DAYS.map((day, dayIndex) => {
                const shifts = schedule.getShiftsForDay(day);
                if (!shifts || shifts.length === 0) {
                  return <td key={dayIndex}>{content[i8].noShift}</td>;
                }

                // Get the internal English shift type for matching
                const englishShiftType = mapShiftTypeToEnglish(shiftType);

                const shift = shifts.find(s => s.getShiftType() === englishShiftType);
                const assignedGuards = shift ? shift.getAssignedGuards().map(guard => getDisplayName(guard.name, guardNamesMapping, i8)) : [];

                return (
                  <td key={dayIndex}>
                    {assignedGuards.length > 0 ? assignedGuards.join(', ') : content[i8].noShift}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
