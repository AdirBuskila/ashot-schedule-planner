export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAYSI8 = {
    EN: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    HE: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
};
export const SHIFT_TYPES = ['Morning', 'Evening', 'Night'];

export const week = {
    weekNumber: 35,
    sundayDate: '25/8', // Date of the Sunday at that week
    availability: {
        Adir: [
            [false, true, false], // Sunday: Evening
            [true, true, false],  // Monday: Morning, Evening
            [false, true, false], // Tuesday: Evening
            [true, true, false],  // Wednesday: Morning, Evening
            [true, true, false],  // Thursday: Morning, Evening
            [false, false, false],// Friday: None
            [true, false, false]  // Saturday: Morning
        ],
        Ofir: [
            [false, false, false],// Sunday: None
            [false, false, false],// Monday: None
            [false, false, false],// Tuesday: None
            [false, true, false], // Wednesday: Evening
            [false, true, true],  // Thursday: Evening, Night
            [true, false, false], // Friday: Morning
            [false, false, false] // Saturday: None
        ],
        Shahar: [
            [false, true, false], // Sunday: Evening
            [false, true, false], // Monday: Evening
            [false, true, false], // Tuesday: Evening
            [false, true, false], // Wednesday: Evening
            [false, true, false], // Thursday: Evening
            [false, true, false], // Friday: Evening
            [true, true, false]   // Saturday: Morning, Evening
        ],
        Itay: [
            [false, false, true], // Sunday: Night
            [false, true, false], // Monday: Evening
            [true, false, false], // Tuesday: Morning
            [true, false, false], // Wednesday: Morning
            [false, false, true], // Thursday: Night
            [false, false, false],// Friday: None
            [false, false, true]  // Saturday: Night
        ],
        Gabriel: [
            [true, true, false],  // Sunday: Morning, Evening
            [false, true, true],  // Monday: Evening, Night
            [false, true, true],  // Tuesday: Evening, Night
            [false, true, true],  // Wednesday: Evening, Night
            [false, true, true],  // Thursday: Evening, Night
            [true, false, false], // Friday: Morning
            [false, false, false] // Saturday: None
        ],
        Ohad: [
            [false, false, false],// Sunday: None
            [false, true, false], // Monday: Evening
            [false, false, false],// Tuesday: None
            [false, false, false],// Wednesday: None
            [false, false, false],// Thursday: None
            [false, true, false], // Friday: Evening
            [false, false, false] // Saturday: None
        ],
        Orel: [
            [false, true, true],  // Sunday: Evening, Night
            [false, true, true],  // Monday: Evening, Night
            [false, true, false], // Tuesday: Evening
            [false, true, false], // Wednesday: Evening
            [false, true, false], // Thursday: Evening
            [false, false, false],// Friday: None
            [false, false, true]  // Saturday: Night
        ],
        Ron: [
            [false, false, false],// Sunday: None
            [true, true, true],   // Monday: Morning, Evening, Night
            [true, true, true],   // Tuesday: Morning, Evening, Night
            [false, false, false],// Wednesday: None
            [false, false, false],// Thursday: None
            [false, false, true], // Friday: Night
            [true, true, false]   // Saturday: Morning, Evening
        ],
        Sam: [
            [false, false, false],// Sunday: None
            [false, false, false],// Monday: None
            [true, true, false],  // Tuesday: Morning, Evening
            [false, false, false],// Wednesday: None
            [true, true, false],  // Thursday: Morning, Evening
            [false, false, false],// Friday: None
            [false, false, false] // Saturday: None
        ],
        Yael: [
            [true, true, false],  // Sunday: Morning, Evening
            [false, true, false], // Monday: Evening
            [false, true, false], // Tuesday: Evening
            [false, false, false],// Wednesday: None
            [true, false, false], // Thursday: Morning
            [false, false, false],// Friday: None
            [false, false, false] // Saturday: None
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


