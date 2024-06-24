import { format, addHours, parseISO } from 'date-fns';

const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

const formatTime = (date: Date): string => {
  return format(date, 'HH:mm');
};

const formatTimeRange = (
  startsAt: string,
  workhour: number
): {
  startDateString: string;
  startTimeString: string;
  endTimeString: string;
  workhour: number;
} => {
  const startDate = parseISO(startsAt);
  const endDate = addHours(startDate, workhour);

  const startDateString = formatDate(startDate);
  const startTimeString = formatTime(startDate);
  const endTimeString = formatTime(endDate);

  return { startDateString, startTimeString, endTimeString, workhour };
};

export default formatTimeRange;
