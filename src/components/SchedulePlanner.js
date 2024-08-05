// src/components/SchedulePlanner.js
import React from 'react';
import Schedule from './Schedule';
import Guard from './Guard';
import { DAYS, SHIFT_TYPES } from '../constants';
import ScheduleTable from './ScheduleTable';

export default class SchedulePlanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guards: new Map(),
      schedule: new Schedule(),
      alertMessages: []
    };
  }

  componentDidMount() {
    this.initializeGuardsAndSchedule();
  }

  initializeGuardsAndSchedule() {
    const { guards: guardsData, availability } = this.props;

    let guards = new Map();
    guardsData.forEach((name) => {
      guards.set(name, new Guard(name, availability[name]));
    });

    this.setState({ guards }, () => {
      this.assignGuardsToShifts();
    });
  }

  assignGuardsToShifts = () => {
    const { guards, schedule } = this.state;
    let alertMessages = [];
    let allShiftsFilled = true;

    DAYS.forEach(day => {
      let shifts = schedule.getShiftsForDay(day);
      if (!shifts || shifts.length === 0) {
        console.log(`No shifts found for ${day}`);
        return;
      }

      shifts.forEach(shift => {
        let dayIndex = this.getDayIndex(day);
        let shiftTypeIndex = this.getShiftTypeIndex(shift.getShiftType());

        let availableGuards = this.getAvailableGuards(dayIndex, shiftTypeIndex);
        availableGuards.sort(() => Math.random() - 0.5); // Shuffle
        availableGuards.sort((g1, g2) => g1.getAssignedShiftsCount() - g2.getAssignedShiftsCount());

        availableGuards.forEach(guard => {
          if (shift.getAssignedGuards().length < shift.getRequiredGuards() && this.canAssignGuard(guard, shift)) {
            shift.assignGuard(guard);
            guard.incrementAssignedShiftsCount();
          }
        });

        if (shift.getAssignedGuards().length < shift.getRequiredGuards()) {
          alertMessages.push(`PROBLEM: Not enough guards for ${day} ${shift.getShiftType()}`);
          allShiftsFilled = false;
        }
      });
    });

    this.setState({ alertMessages }, () => {
      if (allShiftsFilled) {
        this.printSchedule();
      } else {
        alertMessages.forEach(msg => console.log(msg));
      }
    });
  };

  getAvailableGuards = (day, shiftType) => {
    const { guards } = this.state;
    return Array.from(guards.values()).filter(guard => guard.isAvailable(day, shiftType));
  };

  canAssignGuard = (guard, shift) => {
    const { schedule } = this.state;
    if (schedule.getShiftsForDay(shift.getDay()).some(s => s.getAssignedGuards().includes(guard))) {
      return false;
    }

    if (shift.getShiftType() === 'Morning') {
      const previousDay = this.getPreviousDay(shift.getDay());
      if (previousDay && schedule.getShiftsForDay(previousDay).some(s => s.getShiftType() === 'Night' && s.getAssignedGuards().includes(guard))) {
        return false;
      }
    }

    return true;
  };

  printSchedule = () => {
    const { schedule } = this.state;
    DAYS.forEach(day => {
      console.log(`Day: ${day}`);
      schedule.getShiftsForDay(day).forEach(shift => {
        console.log(shift.toString());
      });
    });
  };

  getPreviousDay = (currentDay) => {
    const index = DAYS.indexOf(currentDay);
    return index === 0 ? null : DAYS[index - 1];
  };

  getDayIndex = (day) => {
    return DAYS.indexOf(day);
  };

  getShiftTypeIndex = (shiftType) => {
    return SHIFT_TYPES.indexOf(shiftType);
  };

  render() {
    const { schedule, alertMessages } = this.state;
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
  }
}
