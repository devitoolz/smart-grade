import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ObjectType } from './components';

export interface MenuDataType {
  [key: string]: {
    index?: number;
    icon: IconDefinition;
    title: string;
    submenu?: ObjectType;
  };
}

export interface TimetableData {
  [key: number]: number;
}

export interface DayData {
  [key: number]: string;
}
