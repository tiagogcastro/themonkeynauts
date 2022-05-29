import { IDateProvider } from '@shared/domain/providers/date-provider';
import { addHours, isAfter, parseISO } from 'date-fns';

class DateFnsDateProvider implements IDateProvider {
  isAfter(date: Date, dateToCompare: Date): boolean {
    if(typeof date === 'string') {
      date = parseISO(date);
    }

    if(typeof dateToCompare === 'string') {
      dateToCompare = parseISO(dateToCompare);
    }

    return isAfter(date, dateToCompare)
  }
  
  addHours(date: number | Date, amount: number): Date {
    return addHours(date, amount)
  }
}

export { DateFnsDateProvider };
