import Guard from '../components/Guard';
import { DAYS, SHIFT_TYPES } from '../constants';

// Define shift requirements
const SHIFT_REQUIREMENTS = {
    Morning: 2,
    Evening: 2,
    Night: 1,
};

// Define exceptions for specific days
const EXCEPTIONS = {
    Friday: { Morning: 1, Evening: 1 },
    Saturday: { Morning: 1, Evening: 1 },
};

// Shuffle an array (Fisher-Yates shuffle algorithm)
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Initialize the guards map with their availability
export const initializeGuardsMap = (guardsData, availability) => {
    let guardsMap = new Map();
    // Shuffle guardsData to avoid initial bias
    shuffleArray(guardsData).forEach((name) => {
        guardsMap.set(name, new Guard(name, availability[name]));
    });
    return guardsMap;
};

// Get the number of required guards for a specific shift
const getRequiredGuards = (day, shiftType) => {
    if (EXCEPTIONS[day] && EXCEPTIONS[day][shiftType]) {
        return EXCEPTIONS[day][shiftType];
    }
    return SHIFT_REQUIREMENTS[shiftType];
};

// Assign guards to shifts with a focus on equal distribution
export const assignGuardsToShifts = (guardsMap, schedule, incrementShiftCount, setAlertMessages) => {
    let alertMessages = [];
    let allShiftsFilled = true;

    let firstShiftAssigned = false;

    DAYS.forEach((day, dayIndex) => {
        let shifts = schedule.getShiftsForDay(day);
        if (!shifts || shifts.length === 0) {
            console.log(`No shifts found for ${day}`);
            return;
        }

        shifts.forEach((shift, shiftIndex) => {
            let shiftTypeIndex = SHIFT_TYPES.indexOf(shift.getShiftType());

            let availableGuards = Array.from(guardsMap.values()).filter(guard => guard.isAvailable(dayIndex, shiftTypeIndex));

            if (!firstShiftAssigned && dayIndex === 0 && shiftIndex === 0 && shift.getShiftType() === 'Morning') {
                // For the first shift (Sunday morning), pick a guard randomly
                availableGuards.sort(() => Math.random() - 0.5); // Shuffle the guards randomly
                const randomGuard = availableGuards.shift(); // Pick the first randomly shuffled guard
                shift.assignGuard(randomGuard);
                randomGuard.incrementAssignedShiftsCount();
                incrementShiftCount(randomGuard.getName());
                firstShiftAssigned = true; // Mark that the first random assignment has been made
            } else {
                // Sort guards by the number of assigned shifts to ensure equal distribution
                availableGuards.sort((g1, g2) => g1.getAssignedShiftsCount() - g2.getAssignedShiftsCount());
            }

            let requiredGuards = getRequiredGuards(day, shift.getShiftType());
            let assignedGuardsCount = shift.getAssignedGuards().length;

            for (let guard of availableGuards) {
                if (
                    assignedGuardsCount < requiredGuards &&
                    canAssignGuard(guard, shift, schedule)
                ) {
                    shift.assignGuard(guard);
                    guard.incrementAssignedShiftsCount();
                    incrementShiftCount(guard.getName());
                    assignedGuardsCount++;
                }

                // Stop assigning once we reach the required number of guards
                if (assignedGuardsCount >= requiredGuards) break;
            }

            if (assignedGuardsCount < requiredGuards) {
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
