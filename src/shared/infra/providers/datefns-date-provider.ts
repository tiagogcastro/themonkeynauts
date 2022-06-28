import { IDateProvider } from '@shared/domain/providers/date-provider';
import {
  addDays,
  addHours,
  addSeconds,
  isAfter,
  parseISO,
  getMinutes,
  isBefore,
  addMinutes,
} from 'date-fns';

class DateFnsDateProvider implements IDateProvider {
  addMinutes(date: Date, amount: number): Date {
    return addMinutes(date, amount);
  }

  getMinutes(date: Date): number {
    return getMinutes(date);
  }

  addSeconds(date: Date, amount: number): Date {
    return addSeconds(date, amount);
  }

  addDays(date: Date, amount: number): Date {
    return addDays(date, amount);
  }

  isAfter(date: number | string | Date, dateToCompare: Date): boolean {
    let _date = date;
    let _dateToCompare = dateToCompare;

    if (typeof _date === 'string') {
      _date = parseISO(_date);
    }

    if (typeof _dateToCompare === 'string') {
      _dateToCompare = parseISO(_dateToCompare);
    }

    return isAfter(_date, _dateToCompare);
  }

  isBefore(date: number | string | Date, dateToCompare: Date): boolean {
    let _date = date;
    let _dateToCompare = dateToCompare;

    if (typeof _date === 'string') {
      _date = parseISO(_date);
    }

    if (typeof _dateToCompare === 'string') {
      _dateToCompare = parseISO(_dateToCompare);
    }

    return isBefore(_date, _dateToCompare);
  }

  addHours(date: number | Date, amount: number): Date {
    return addHours(date, amount);
  }
}

export { DateFnsDateProvider };
