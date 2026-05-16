const isDateBlocked = (eventDate, calendar) => {
  if (!calendar || calendar.length === 0) return false;

  const targetDate = new Date(eventDate);
  // Ensure we compare only the date part or consider full time depending on requirement
  // Since it's a date interval, checking if targetDate falls within any interval
  
  return calendar.some(interval => {
    const start = new Date(interval.startDate);
    const end = new Date(interval.endDate);

    // Set end date to end of the day if it's considered inclusive
    end.setHours(23, 59, 59, 999);
    start.setHours(0, 0, 0, 0);

    return targetDate >= start && targetDate <= end;
  });
};

module.exports = { isDateBlocked };
