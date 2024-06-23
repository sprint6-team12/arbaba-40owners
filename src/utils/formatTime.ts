const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const addHours = (date: Date, hours: number): Date => {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
};

const formatTimeRange = (startsAt: string, workhour: number): string => {
  const startDate = new Date(startsAt);
  const endDate = addHours(startDate, workhour);

  const startDateString = formatDate(startDate);
  const startTimeString = formatTime(startDate);
  const endTimeString = formatTime(endDate);

  return `${startDateString} ${startTimeString} ~ ${endTimeString} (${workhour}시간)`;
};

export default formatTimeRange;
