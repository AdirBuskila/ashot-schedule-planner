// src/utils/dateUtils.js
export const getUpcomingSunday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const daysUntilSunday = (7 - dayOfWeek) % 7; // Calculate how many days until Sunday
    const upcomingSunday = new Date(today);
    upcomingSunday.setDate(today.getDate() + daysUntilSunday); // Move the date to the upcoming Sunday
    return upcomingSunday;
};

export const generateWeekDates = (startingDate) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startingDate);
        currentDate.setDate(startingDate.getDate() + i);
        dates.push(currentDate);
    }
    return dates;
};

export const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    return `${day}/${month}`;
};
