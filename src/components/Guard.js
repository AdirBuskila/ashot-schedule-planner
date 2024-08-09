class Guard {
  constructor(name, availabilityMatrix) {
    this.name = name;
    this.availabilityMatrix = availabilityMatrix; // [7][3] matrix
    this.assignedShiftsCount = 0;
    this.totalAvailableShifts = this.calculateTotalAvailableShifts();
    this.expectedShifts = 0; // This will be set externally based on all guards' availability.
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getAvailabilityMatrix() {
    return this.availabilityMatrix;
  }

  setAvailabilityMatrix(availabilityMatrix) {
    this.availabilityMatrix = availabilityMatrix;
    this.totalAvailableShifts = this.calculateTotalAvailableShifts(); // Recalculate when matrix is updated
  }

  isAvailable(day, shift) {
    return this.availabilityMatrix[day][shift];
  }

  getAssignedShiftsCount() {
    return this.assignedShiftsCount;
  }

  incrementAssignedShiftsCount() {
    this.assignedShiftsCount++;
  }

  resetAssignedShiftsCount() {
    this.assignedShiftsCount = 0;
  }

  getExpectedShifts() {
    return this.expectedShifts;
  }

  setExpectedShifts(expectedShifts) {
    this.expectedShifts = expectedShifts;
  }

  calculateTotalAvailableShifts() {
    return this.availabilityMatrix.reduce((total, day) => {
      return total + day.filter(Boolean).length;
    }, 0);
  }

  getTotalAvailableShifts() {
    return this.totalAvailableShifts;
  }

  toString() {
    return this.name;
  }
}

export default Guard;
