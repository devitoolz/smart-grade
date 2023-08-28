export interface LectureData {
  ilecture: number;
  lectureStrDate: string;
  lectureEndDate: string;
  lectureStrTime: string;
  lectureEndTime: string;
  lectureName: string;
}

export interface ProfileData {
  name: string;
  gender: string;
  birthdate: string;
  phone: string;
  pic: string;
  address: string;
  email: string;
  imajor: number;
  majorName: string;
  delYn: number;
  secretKey: string;
}

export interface ProfessorProfileData extends ProfileData {
  iprofessor: number;
  createdAt: string;
}

export interface StudentProfileData extends ProfileData {
  istudent: number;
  finishedYn: number;
  score: number;
  grade: number;
  studentNum: number;
}

export interface UserProfile {
  lectureList: Array<LectureData>;
  profile: ProfessorProfileData | StudentProfileData;
}

export interface LoginData {
  [key: string]: string;
  id: string;
  password: string;
  role: string;
}

export interface OTPAuthData {
  otpNum: string;
  uid: string;
  role: string;
}

export interface OTPData {
  secretKey: string;
  barcodeUrl: string;
}

export interface MajorData {
  imajor: number;
  majorName: string;
  delYn: number;
}

export interface LoginResult {
  success: boolean;
  code: number;
  secretKey: boolean;
  msg: string;
  accessToken: string | null;
  refreshToken: string | null;
}

// export interface RefreshToken {
//   success: boolean;
//   code: number;
//   secretKey: boolean;
//   msg: string;
// }
