import React from 'react';
import { CustomInput } from '../styles/CommonStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { InputProps } from '../types/components';

const Input = ({
  isForm,
  disabled,
  length,
  maxLength,
  type,
  placeholder,
  reset,
  value,
  setValue,
  min,
  max,
}: InputProps) => {
  return (
    <CustomInput isForm={isForm} length={length} value={value}>
      <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={setValue}
        autoComplete="off"
        min={min}
        max={max}
      />
      {!disabled && reset && <FontAwesomeIcon onClick={() => reset('')} icon={faCircleXmark} />}
    </CustomInput>
  );
};

export default Input;
