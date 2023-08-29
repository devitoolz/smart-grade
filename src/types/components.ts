import React from 'react';
import { LoginData } from './apis';

export interface ObjectType {
  [key: string | number]: any;
}

export interface ButtonBarProps {
  value: string;
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}

export interface ChangePasswordProps {
  setOpenChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenOTPRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CommonInputProps {
  isForm?: boolean;
  disabled?: boolean;
  length?: string;
  placeholder?: string;
}

export interface InputProps extends CommonInputProps {
  maxLength?: number;
  type?: string;
  reset?: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
  setValue?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface DropdownProps extends CommonInputProps {
  data: Array<any> | null;
  value: string | number | null;
  setValue: React.Dispatch<React.SetStateAction<string | number | null>>;
  propertyName?: ObjectType;
  reset?: boolean;
  search?: boolean;
}

export interface CommonButtonProps {
  btnType?: string;
  color?: string;
  textColor?: string;
  value?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface OTPAuthProps {
  payload: LoginData;
  setOpenOTP: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface OTPRegisterProps {
  setOpenOTPRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface RoleRadioButtonProps {
  img: string;
  imgHeight: number;
  text: string;
  value: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface SearchBarProps {
  children: React.ReactNode;
  queries: ObjectType;
  setPage?: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TableHeaderType {
  title: string;
  width: number;
}

export interface TableProps {
  header: Array<TableHeaderType>;
  data: Array<any> | null;
  children: React.ReactNode;
  hasPage?: boolean;
  maxPage?: number;
  pending: boolean;
  error: boolean;
}

export interface FindPasswordProps {
  setOpenFindPw: React.Dispatch<React.SetStateAction<boolean>>;
  payload: LoginData;
}

export interface LectureRegister {
  setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setLectureRoom: React.Dispatch<React.SetStateAction<string | number | null>>;
}

export interface TimetableData {
  [key: number]: number;
}

export interface DayData {
  [key: number]: string;
}
