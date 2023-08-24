import React from 'react';
import { ModalStyle } from '../styles/MyStyleCSS';

const Loading = () => {
  return (
    <ModalStyle>
      <div
        className="modal-box"
        style={{
          width: 400,
          height: 150,
          lineHeight: '150px',
          fontSize: 30,
          minWidth: 0,
          borderRadius: 10,
        }}
      >
        요청 중입니다...
      </div>
    </ModalStyle>
  );
};

export default Loading;
