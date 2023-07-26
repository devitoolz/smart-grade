import React from 'react';
import { CommonBtn, CommonBtnArea } from '../styles/MyStyleCSS';

const CommonButton = ({ btnType, color, value, onClick }) => {
  return (
    <CommonBtnArea btnType={btnType}>
      <CommonBtn btnType={btnType} color={color} onClick={onClick}>
        {value}
      </CommonBtn>
    </CommonBtnArea>
  );
};
export default CommonButton;
