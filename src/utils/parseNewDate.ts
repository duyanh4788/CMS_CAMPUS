export const formatYearMonthDate = (date: Date): Date => {
  if (!date) return new Date();
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
};
