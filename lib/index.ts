export interface CalendarDay {
  day: number;
  month: number;
  year: number;
}

/**
 * Finds the Sunday of the week containing the given date.
 * This is used to determine the starting point for calendar grids
 * that always begin on Sunday regardless of what day the month starts.
 */

const findSundayOfWeek = (month: number, year: number): Date => {
  // Create date for the 1st of the target month
  const firstOfMonth = new Date(year, month - 1, 1); // Date constructor expects 0-11 for month

  const dayOfWeek = firstOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const sunday = new Date(firstOfMonth);
  sunday.setDate(firstOfMonth.getDate() - dayOfWeek);
  return sunday;
};

/**
 * Generates a 42-day calendar grid (6 weeks × 7 days) for any month.
 * The grid always starts from the Sunday of the week containing the 1st
 * of the target month, ensuring a complete 6-week view that calendar
 * applications typically display.
 */

export default (targetMonth?: number, targetYear?: number): CalendarDay[] => {
  const now = new Date();
  const month = targetMonth ?? now.getMonth() + 1; // getMonth() returns 0-11, we want 1-12
  const year = targetYear ?? now.getFullYear();

  // Generate 42 consecutive days
  const calendar: CalendarDay[] = [];
  const currentDate = new Date(findSundayOfWeek(month, year));

  for (let i = 0; i < 42; i++) {
    calendar.push({
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1, // Convert back to 1-12
      year: currentDate.getFullYear(),
    });

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return calendar;
};
