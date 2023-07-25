import React from 'react';
import { CustomInput } from '../styles/CommonStyle';

const Input = ({ length, placeholder, value, onChange }) => {
  return (
    <>
      <CustomInput length={length} placeholder={placeholder} value={value} onChange={onChange} />
    </>
  );
};

export default Input;
