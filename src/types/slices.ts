import { MajorData, UserProfile } from './apis';

export interface MainSliceState {
  title: string;
  isPosting: boolean;
  user: UserProfile | null;
}

export interface MajorSliceState {
  allMajorList: Array<MajorData>;
}
