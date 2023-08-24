import React from 'react';
import { LoginData } from './apis';

export interface ButtonBarProps {
  value: string;
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}

export interface ChangePasswordProps {
  setOpenChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenOTPRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InputProps {
  isForm?: boolean;
  disabled?: boolean;
  length?: string;
  maxLength?: number;
  type?: string;
  placeholder?: string;
  reset?: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  setValue: React.ChangeEventHandler<HTMLInputElement>;
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

interface SearchBarQueries {
  [key: string]: string;
}

export interface SearchBarProps {
  children: React.ReactNode;
  queries: SearchBarQueries;
  setPage?: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}
