import React from 'react';
import { ModalStyle } from '../../styles/MyStyleCSS';
import CommonButton from '../CommonButton';
import { RegisterTimeTable } from '../../types/components';

const RegisterTimetable = ({ setOpenRegister, setLectureRoom }: RegisterTimeTable) => {
  const handleCancel = () => {
    setLectureRoom('');
    alert('취소');
    setOpenRegister(false);
  };
  return (
    <>
      <ModalStyle modalSize="small">
        <div className="modal-box" style={{ width: 1000, height: 800 }}>
          <div className="modal-title-small">
            <div>강의 개설 신청</div>
          </div>
          <div className="modal-contents"></div>
          <div className="modal-footer">
            <CommonButton value="확인" btnType="modal" />
            <CommonButton value="취소" onClick={handleCancel} btnType="modal" />
          </div>
        </div>
      </ModalStyle>
    </>
  );
};

export default RegisterTimetable;
