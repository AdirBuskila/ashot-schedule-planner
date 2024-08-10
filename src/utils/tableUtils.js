// src/utils/tableUtils.js

// Function to get the display name for guards
export const getDisplayName = (name, guardNamesMapping, i8) => {
    if (i8 === 'HE') {
        return guardNamesMapping[name] || name;
    }
    return name;
};

// Function to append the appropriate emoji to the shift type
export const getShiftTypeWithEmoji = (shiftType, i8) => {
    if (i8 === 'HE') {
        switch (shiftType.trim()) {
            case 'בוקר':
                return `${shiftType} 🌞`; // Morning in Hebrew with sun emoji
            case 'צהריים':
                return `${shiftType} 🌤️`; // Afternoon in Hebrew with sun behind cloud emoji
            case 'לילה':
                return `${shiftType} 🌙`; // Night in Hebrew with moon emoji
            default:
                return shiftType; // Return as is if no match
        }
    } else {
        // For English or other languages
        switch (shiftType.trim()) {
            case 'Morning':
                return `${shiftType} 🌞`; // Morning with sun emoji
            case 'Evening':
                return `${shiftType} 🌤️`; // Evening with sun behind cloud emoji
            case 'Night':
                return `${shiftType} 🌙`; // Night with moon emoji
            default:
                return shiftType; // Return as is if no match
        }
    }
};

// Function to map Hebrew shift types back to their English equivalents
export const mapShiftTypeToEnglish = (shiftType) => {
    // Remove any emojis and extra spaces
    const cleanShiftType = shiftType.replace(/[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{2600}-\u{26FF}\u{1F680}-\u{1F6FF}]/gu, '').trim();
    switch (cleanShiftType) {
        case 'בוקר':
            return 'Morning';
        case 'צהריים':
            return 'Evening';
        case 'לילה':
            return 'Night';
        case 'Morning':
            return 'Morning';
        case 'Evening':
            return 'Evening';
        case 'Night':
            return 'Night';
        default:
            return cleanShiftType; // Return the cleaned shift type if no match
    }
};
