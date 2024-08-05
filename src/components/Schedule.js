// src/components/Schedule.js
import { DAYS, SHIFT_TYPES } from '../constants';
import Shift from './Shift';

class Schedule {
  constructor() {
    this.shifts = new Map();
    this.initializeShifts();
  }

  initializeShifts() {
    DAYS.forEach(day => {
      const dayShifts = SHIFT_TYPES.map(shiftType => new Shift(day, shiftType));
      this.shifts.set(day, dayShifts); // Initialize each day with a list of shifts
    });
  }

  addShift(day, shift) {
    if (!this.shifts.has(day)) {
      this.shifts.set(day, []);
    }
    this.shifts.get(day).push(shift);
  }

  getShiftsForDay(day) {
    return this.shifts.get(day) || [];
  }

  getAllDays() {
    return Array.from(this.shifts.keys());
  }
}

export default Schedule;
