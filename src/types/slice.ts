import { ProfessorProfile, StudentProfile } from './api';

export interface MainSliceState {
  title: string;
  isPosting: boolean;
  user: ProfessorProfile | StudentProfile | null;
}
