import React from 'react';
import { CommonBtn } from '../styles/MyStyleCSS';

const CommonButton = ({ value, onClick }) => {
  return (
    <>
      <CommonBtn onClick={onClick}>{value}</CommonBtn>
    </>
  );
};
export default CommonButton;
