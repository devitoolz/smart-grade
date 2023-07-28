import React from 'react';
import { CommonBtn, CommonBtnArea } from '../styles/MyStyleCSS';

const CommonButton = ({ btnType, color, value, onClick }) => {
  return (
    <CommonBtnArea btnType={btnType}>
      <CommonBtn btnType={btnType} color={color} onClick={onClick}>
        <span>{value}</span>
      </CommonBtn>
    </CommonBtnArea>
  );
};
export default CommonButton;
