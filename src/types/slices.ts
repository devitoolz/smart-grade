import { UserProfile } from './apis';

export interface MainSliceState {
  title: string;
  isPosting: boolean;
  user: UserProfile | null;
}
