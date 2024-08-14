// src/components/Shift.js

class Shift {
  constructor(day, shiftType) {
    this.day = day;
    this.shiftType = shiftType;
    this.assignedGuards = [];
    this.requiredGuards = this.determineRequiredGuards(day, shiftType);
  }

  determineRequiredGuards(day, shiftType) {
    // Implement logic to determine the number of required guards
    if (day === 'Saturday' && shiftType === 'Morning') {
      return 1;
    }
    if (day === 'Friday') {
      return 1;
    } else if (day === 'Saturday') {
      return 1;
    } else if (shiftType === 'Night') {
      return 1;
    } else {
      return 2;
    }
  }

  getDay() {
    return this.day;
  }

  getShiftType() {
    return this.shiftType;
  }

  getAssignedGuards() {
    return this.assignedGuards;
  }

  assignGuard(guard) {
    this.assignedGuards.push(guard);
  }

  getRequiredGuards() {
    return this.requiredGuards;
  }

  toString() {
    return `Shift{day='${this.day}', shiftType='${this.shiftType}', assignedGuards=${this.assignedGuards.map(guard => guard.toString())}}`;
  }
}

export default Shift;
