import { TimetableData } from '../types/components';
import { DayData } from '../types/pages';

const dayData: DayData = {
  1: '(월)',
  2: '(화)',
  3: '(수)',
  4: '(목)',
  5: '(금)',
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

const colorData = [
  '#ffadad',
  '#ffd6a5',
  '#fdffb6',
  '#caffbf',
  '#9bf6ff',
  '#a0c4ff',
  '#bdb2ff',
  '#ffc6ff',
  '#fffffc',
];

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

export { dayData, timeData, colorData, numberToString, stringToNumber };
