import Guard from '../components/Guard';
import { DAYS, SHIFT_TYPES } from '../constants';

// Set the average shift count as a constant
const AVERAGE_SHIFT_COUNT = 3.5;

// Initialize the guards map with their availability
export const initializeGuardsMap = (guardsData, availability) => {
    let guardsMap = new Map();
    guardsData.forEach((name) => {
        guardsMap.set(name, new Guard(name, availability[name]));
    });
    return guardsMap;
};

// Return the constant average shifts
export const getAverageShifts = () => {
    return AVERAGE_SHIFT_COUNT;
};

// Assign guards to shifts while considering average shifts per week
export const assignGuardsToShifts = (guardsMap, schedule, incrementShiftCount, setAlertMessages) => {
    let alertMessages = [];
    let allShiftsFilled = true;

    const averageShifts = getAverageShifts();

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

            // Sort guards by the number of assigned shifts compared to the average shifts
            availableGuards.sort((g1, g2) => g1.getAssignedShiftsCount() - g2.getAssignedShiftsCount());

            let assigned = false;

            availableGuards.forEach(guard => {
                if (
                    shift.getAssignedGuards().length < shift.getRequiredGuards() &&
                    canAssignGuard(guard, shift, schedule)
                ) {
                    // Allow assignment even if the guard's shift count exceeds the average
                    if (guard.getAssignedShiftsCount() < averageShifts || shift.getAssignedGuards().length === 0) {
                        shift.assignGuard(guard);
                        guard.incrementAssignedShiftsCount();
                        incrementShiftCount(guard.getName());
                        assigned = true;
                    }
                }
            });

            if (!assigned && shift.getAssignedGuards().length < shift.getRequiredGuards()) {
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
