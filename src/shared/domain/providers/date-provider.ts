interface IDateProvider {
  isAfter(date: number | Date, dateToCompare: Date): boolean;
  addHours(date: Date, amount: number): Date;
}

export { IDateProvider };
