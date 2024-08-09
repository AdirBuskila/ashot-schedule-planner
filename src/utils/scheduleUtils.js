import Guard from '../components/Guard';
import { DAYS, SHIFT_TYPES } from '../constants';

// Initialize the guards map with their availability
export const initializeGuardsMap = (guardsData, availability) => {
    let guardsMap = new Map();
    guardsData.forEach((name) => {
        guardsMap.set(name, new Guard(name, availability[name]));
    });
    return guardsMap;
};

// Calculate the expected shifts based on availability
export const calculateExpectedShifts = (guardsMap) => {
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

// Check if there is enough coverage
export const checkMinimumCoverage = (guardsMap) => {
    let totalShiftsRequired = DAYS.length * SHIFT_TYPES.length; // Assuming each day needs all shift types covered
    let totalAvailableGuards = 0;

    guardsMap.forEach(guard => {
        totalAvailableGuards += guard.getTotalAvailableShifts();
    });

    return totalAvailableGuards >= totalShiftsRequired;
};

// Assign guards to shifts while considering fairness and coverage
export const assignGuardsToShifts = (guardsMap, schedule, incrementShiftCount, setAlertMessages) => {
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
            let dayIndex = DAYS.indexOf(day);
            let shiftTypeIndex = SHIFT_TYPES.indexOf(shift.getShiftType());

            let availableGuards = Array.from(guardsMap.values()).filter(guard => guard.isAvailable(dayIndex, shiftTypeIndex));

            // Shuffle the guards randomly
            availableGuards.sort(() => Math.random() - 0.5);

            // Sort guards based on the number of assigned shifts compared to their expected shifts
            availableGuards.sort((g1, g2) => {
                const diff1 = g1.getAssignedShiftsCount() - g1.expectedShifts;
                const diff2 = g2.getAssignedShiftsCount() - g2.expectedShifts;
                return diff1 - diff2;
            });

            availableGuards.forEach(guard => {
                if (shift.getAssignedGuards().length < shift.getRequiredGuards() && canAssignGuard(guard, shift, schedule)) {
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

    return allShiftsFilled;
};


const canAssignGuard = (guard, shift, schedule) => {
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
