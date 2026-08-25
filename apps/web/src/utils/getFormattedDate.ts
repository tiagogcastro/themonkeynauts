export function addZeroBeforeDate(date: number) {
  return date < 10 ? `0${date}`: date;
}

export function getFormattedDate(date: Date | string) {
  const formatToDate = new Date(date);

  const day = addZeroBeforeDate(formatToDate.getDate());
  const month = addZeroBeforeDate(formatToDate.getMonth());
  const fullYear = formatToDate.getFullYear();

  return `${day}/${month}/${fullYear}`;
}