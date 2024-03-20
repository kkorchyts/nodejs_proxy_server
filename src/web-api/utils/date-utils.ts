import { previousFriday, previousMonday } from "date-fns";

export interface Period {
  from: Date;
  to: Date;
}

export const getPreviousPeriod = (date: Date): Period => {
  const friday = previousFriday(date);
  const monday = previousMonday(friday);
  return {
    from: monday,
    to: friday
  };
};
