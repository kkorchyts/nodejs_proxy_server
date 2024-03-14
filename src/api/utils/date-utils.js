import { previousFriday, previousMonday } from "date-fns";

export const getPreviousPeriod = (date) => {
  const friday = previousFriday(date);
  const monday = previousMonday(friday);
  return {
    from: monday,
    to: friday,
  };
};
