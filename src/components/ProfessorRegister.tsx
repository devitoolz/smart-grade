import React from 'react';
import { ModalStyle } from '../styles/MyStyleCSS';
import CommonButton from './CommonButton';
import { Row } from '../styles/UserStyle';
import { ProfessorRegisterModal } from '../styles/RegisterStyle';
import { LectureRegister } from '../types/components';

const ProfessorRegister = ({ setOpenRegister }: LectureRegister) => {
  const handleCancel = () => {
    alert('개설 신청이 취소되었습니다.');
    setOpenRegister(false);
  };
  return (
    <>
      <ModalStyle modalSize="small">
        <div className="modal-box" style={{ width: 1000, height: 800 }}>
          <div className="modal-title-small">
            <div>강의 개설 신청</div>
          </div>
          <div className="modal-contents">
            <ProfessorRegisterModal>
              <div className="book-img"></div>
              <div className="register-form">
                <Row>
                  <div>강의명</div>
                  <div></div>
                </Row>
                <Row>
                  <div>전공</div>
                  <div></div>
                </Row>
                <Row>
                  <div>강의실</div>
                  <div></div>
                </Row>
                <Row>
                  <div>인원 수</div>
                  <div></div>
                </Row>
                <Row>
                  <div>강의 시간</div>
                  <div></div>
                </Row>
                <Row>
                  <div>강의 기간</div>
                  <div></div>
                </Row>
                <Row>
                  <div>교재명</div>
                  <div></div>
                </Row>
              </div>
            </ProfessorRegisterModal>
          </div>
          <div className="modal-footer">
            <CommonButton value="확인" onClick={() => alert('확인')} btnType="modal" />
            <CommonButton value="취소" onClick={handleCancel} btnType="modal" />
          </div>
        </div>
      </ModalStyle>
    </>
  );
};

export default ProfessorRegister;
