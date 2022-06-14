type returnMessage = {
  isError: boolean;
  message: string;
};

function countDayInMonth(month: number, year: number) {
  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31;
  if ([4, 6, 9, 11].includes(month)) return 30;
  if (month === 2) {
    if (year % 4 === 0 || (year % 100 === 0 && year % 4 === 0)) return 29;
    return 28;
  }
  return 0;
}
function checkInputDateRange(day: number, month: number, year: number): string {
  if (day > 31 || day < 0) return "Input data for Day is out of range!";
  if (month < 0 || month > 12) return "Input data for Month is out of range";
  if (year < 0) return "Input data for Year is out of range";
  return "success";
}
function checkDate(date: any): returnMessage {
  let day = parseInt(date.day);
  let month = parseInt(date.month);
  let year = parseInt(date.year);
  if (checkInputDateRange(day, month, year) !== "success") {
    return { isError: true, message: checkInputDateRange(day, month, year) };
  }
  let numberOfDaysInMonth = countDayInMonth(month, year);
  if (numberOfDaysInMonth < day)
    return {
      isError: true,
      message: `${day}/${month}/${year} is NOT a valid date!`,
    };
  return {
    isError: false,
    message: `${day}/${month}/${year} is a valid date!`,
  };
}
export { checkDate };
