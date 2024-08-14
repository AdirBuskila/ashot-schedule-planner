export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const SHIFT_TYPES = ['Morning', 'Evening', 'Night'];

export const week = {
    weekNumber: 34,
    sundayDate: '18/8', // Date of the Sunday at that week
    availability: {
        Adir: [
            [true, false, false], // Sunday: Morning
            [false, true, false],  // Monday: Evening
            [false, true, false],  // Tuesday: Evening
            [true, false, false],  // Wednesday: Morning
            [false, true, false], // Thursday: Evening
            [true, false, false], // Friday: Morning
            [true, false, false] // Saturday: Morning
        ],
        Gabriel: [
            [true, false, false], // Sunday: Morning
            [false, true, false], // Monday: Evening
            [false, true, true], // Tuesday: Evening, Night
            [false, true, false], // Wednesday: Evening
            [true, false, false],  // Thursday: Morning
            [true, false, false], // Friday: Morning
            [false, false, false] // Saturday: None
        ],
        Itay: [
            [false, true, false], // Sunday: Evening
            [true, false, false], // Monday: Morning
            [true, false, false], // Tuesday: Morning
            [false, false, true], // Wednesday: Night
            [false, false, true], // Thursday: Night
            [false, false, false], // Friday: None
            [false, false, true]  // Saturday: Night
        ],
        Orel: [
            [false, false, true],  // Sunday: Night
            [false, true, true],  // Monday: Evening
            [false, true, true], // Tuesday: Evening
            [false, true, false],  // Wednesday: Evening
            [true, false, false], // Thursday: Morning
            [false, false, false],  // Friday: None
            [false, false, false]   // Saturday: None
        ],
        Ofir: [
            [false, false, false], // Sunday: None
            [false, true, false], // Monday: Evening
            [false, true, false],  // Tuesday: Evening
            [false, true, false], // Wednesday: Evening
            [false, false, false], // Thursday: None
            [true, false, false], // Friday: Morning
            [false, false, false] // Saturday: None
        ],
        Ohad: [
            [false, false, false], // Sunday: None
            [false, true, false], // Monday: Evening
            [false, true, false],   // Tuesday: Evening
            [false, false, false], // Wednesday: None
            [false, false, false],  // Thursday: None
            [false, false, false],  // Friday: None
            [false, false, false]  // Saturday: None
        ],
        Ron: [
            [false, false, false], // Sunday: None
            [true, true, true], // Monday: Morning, Evening, Night
            [true, true, true], // Tuesday: Morning, Evening, Night
            [false, false, false], // Wednesday: None
            [false, false, false], // Thursday: None
            [false, false, true], // Friday: Night
            [true, true, false] // Saturday: Morning, Evening
        ],
        Sam: [
            [true, true, false],  // Sunday: Morning, Evening
            [false, false, false], // Monday: None
            [true, true, false],  // Tuesday: Morning, Evening
            [false, false, false], // Wednesday: None
            [true, true, false],  // Thursday: Morning, Evening
            [false, false, false], // Friday: None
            [false, false, false] // Saturday: None
        ],
        Shahar: [
            [false, true, false], // Sunday: Evening
            [false, true, false], // Monday: Evening
            [false, true, false], // Tuesday: Evening
            [false, true, false], // Wednesday: Evening
            [false, true, false],  // Thursday: Evening
            [false, false, false],  // Friday: None
            [false, false, false]    // Saturday: None
        ],
        Yael: [
            [false, true, false],  // Sunday: Evening
            [false, false, false],  // Monday: None
            [true, false, false],  // Tuesday: Morning
            [true, false, false],  // Wednesday: Morning
            [false, false, false], // Thursday: None
            [false, true, false], // Friday: Evening
            [false, false, false]  // Saturday: None
        ]
    }
};

export const getDateForDay = (sundayDate, dayIndex) => {
    const [day, month] = sundayDate.split('/').map(Number);
    const date = new Date(2024, month - 1, day + dayIndex);
    const formattedDay = date.getDate();
    const formattedMonth = date.getMonth() + 1;
    return `${formattedDay}/${formattedMonth}`;
};
