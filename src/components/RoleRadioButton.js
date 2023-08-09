import React from 'react';
import { RoleButton } from '../styles/LoginStyle';

const RoleRadioButton = ({ img, imgHeight, text, value, checked, onChange }) => {
  return (
    <RoleButton imgHeight={imgHeight} checked={checked}>
      <div className="role-input">
        <input type="radio" value={value} checked={checked} onChange={onChange} />
        <span>{text}</span>
      </div>
      <div className="role-img">
        <img src={img} alt="role-img" />
      </div>
    </RoleButton>
  );
};

export default RoleRadioButton;
