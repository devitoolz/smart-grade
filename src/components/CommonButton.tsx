import React from 'react';
import { CommonBtn, CommonBtnArea } from '../styles/MyStyleCSS';
import { CommonButtonProps } from '../types/components';

const CommonButton = ({
  btnType,
  color,
  textColor,
  value,
  onClick,
  disabled,
  children,
}: CommonButtonProps) => {
  return (
    <CommonBtnArea btnType={btnType}>
      <span className="student-info">{children}</span>
      <CommonBtn
        btnType={btnType}
        color={color}
        textColor={textColor}
        onClick={onClick}
        disabled={disabled}
      >
        <span>{value}</span>
      </CommonBtn>
    </CommonBtnArea>
  );
};
export default CommonButton;
