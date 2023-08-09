import React from 'react';
import { ModalStyle } from '../styles/MyStyleCSS';
import CommonButton from './CommonButton';

const CommonModalEnd = ({ setDisplay }) => {
  return (
    <ModalStyle>
      <div
        className="modal-box"
        style={{
          width: 520,
          height: 320,
          lineHeight: '150px',
          fontSize: 30,
          minWidth: 0,
          borderRadius: 10,
          zIndex: 999999,
        }}
      >
        <span>정상 처리되었습니다</span>
        <CommonButton
          value="확인"
          onClick={() => {
            setDisplay(false);
          }}
          btnType="modal"
        />
      </div>
    </ModalStyle>
  );
};

export default CommonModalEnd;
