import { TimetableData } from '../types/components';
import { DayData } from '../types/pages';

const dayData: DayData = {
  1: '월요일',
  2: '화요일',
  3: '수요일',
  4: '목요일',
  5: '금요일',
};

const timeData: TimetableData = {
  0: 9,
  1: 10,
  2: 11,
  3: 12,
  4: 13,
  5: 14,
  6: 15,
  7: 16,
  8: 17,
};

const numberToString = (number: number) => {
  if (number < 10) {
    return `0${number}:00`;
  } else {
    return `${number}:00`;
  }
};

const stringToNumber = (string: string) => {
  return parseInt(string.slice(0, 2));
};

export { dayData, timeData, numberToString, stringToNumber };
