import { IDateProvider } from '@shared/domain/providers/date-provider';
import { addHours, isAfter } from 'date-fns';

class DateFnsDateProvider implements IDateProvider {
  isAfter(date: Date, dateToCompare: Date): boolean {
    return isAfter(date, dateToCompare)
  }
  
  addHours(date: number | Date, amount: number): Date {
    return addHours(date, amount)
  }
}

export { DateFnsDateProvider };
