import React from 'react';
import { CommonBtn } from '../styles/MyStyleCSS';

const CommonButton = ({ btnType, color, value, onClick }) => {
  return (
    <>
      <CommonBtn btnType={btnType} color={color} onClick={onClick}>
        {value}
      </CommonBtn>
    </>
  );
};
export default CommonButton;
