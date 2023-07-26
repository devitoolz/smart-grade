import React from 'react';
import { CustomInput } from '../styles/CommonStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Input = ({ length, type, placeholder, value, setValue }) => {
  return (
    <CustomInput length={length} value={value}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <FontAwesomeIcon onClick={() => setValue('')} icon={faCircleXmark} />
    </CustomInput>
  );
};

export default Input;
