interface IDateProvider {
  getMinutes(date: Date): number;
  isAfter(date: number | string | Date, dateToCompare: Date): boolean;
  addHours(date: Date, amount: number): Date;
  addSeconds(date: Date, amount: number): Date;
  addDays(date: Date, amount: number): Date;
}

export { IDateProvider };
