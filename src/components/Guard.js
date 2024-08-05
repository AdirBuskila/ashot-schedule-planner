// src/components/Guard.js
class Guard {
    constructor(name, availabilityMatrix) {
      this.name = name;
      this.availabilityMatrix = availabilityMatrix; // [7][3] matrix
      this.assignedShiftsCount = 0;
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
  
    toString() {
      return this.name;
    }
  }
  
  export default Guard;
  