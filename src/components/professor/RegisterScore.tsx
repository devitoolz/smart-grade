import React from 'react';
import { ModalStyle } from '../../styles/MyStyleCSS';
import CommonButton from '../CommonButton';

const RegisterScore = () => {
  return (
    <ModalStyle modalSize="small">
      <div className="modal-box" style={{ height: 230, width: 350 }}>
        <div className="modal-title-small">
          <div>배점 등록</div>
        </div>
        <div className="modal-contents"></div>
        <div className="modal-footer">
          <CommonButton value="확인" btnType="modal" />
          <CommonButton value="취소" btnType="modal" />
        </div>
      </div>
    </ModalStyle>
  );
};

export default RegisterScore;
