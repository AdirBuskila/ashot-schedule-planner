import React from 'react';
import { content } from '../i8';
import { DAYSI8, DAYS } from '../constants';
import { getUpcomingSunday, generateWeekDates, formatDate } from '../utils/dateUtils';
import { getDisplayName, getShiftTypeWithEmoji, mapShiftTypeToEnglish } from '../utils/tableUtils';

const ScheduleTable = ({ schedule, i8 }) => {
  const guardNamesMapping = content[i8].guardNames;
  const shiftTypes = content[i8].shiftTypes;

  const upcomingSunday = getUpcomingSunday();
  const weekDates = generateWeekDates(upcomingSunday);

  // Map Hebrew day names to English equivalents
  const mapDayToEnglish = (dayName) => {
    const dayIndex = DAYSI8[i8].indexOf(dayName);
    return DAYS[dayIndex];
  };

  return (
    <div className="schedule-table">
      <h2>{content[i8].scheduleOverview}</h2>
      <table>
        <thead>
          <tr>
            <th>{content[i8].shiftDay}</th>
            {DAYSI8[i8].map((day, index) => (
              <th key={index}>
                {day} {formatDate(weekDates[index], i8)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shiftTypes.map((shiftType, index) => (
            <tr key={index}>
              <td>{getShiftTypeWithEmoji(shiftType, i8)}</td>
              {DAYSI8[i8].map((day, dayIndex) => {
                const englishDay = mapDayToEnglish(day); // Convert to English
                const shifts = schedule.getShiftsForDay(englishDay);
                if (!shifts || shifts.length === 0) {
                  return <td key={dayIndex}>{content[i8].noShift}</td>;
                }

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
