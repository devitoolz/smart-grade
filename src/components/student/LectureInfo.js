import React from 'react';
// import { ProfessorRegisterModal } from '../../styles/RegisterStyle';
// import { Row } from '../../styles/UserStyle';
import CommonModal from '../CommonModal';

const LectureInfo = ({ setShowLectureInfo, ilecture }) => {
  return (
    <CommonModal
      modalSize="big"
      modalTitle={ilecture + '번 강의정보'}
      setDisplay={setShowLectureInfo}
    >
      <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        {/* <ProfessorRegisterModal>
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
        </ProfessorRegisterModal> */}
      </div>
    </CommonModal>
  );
};

export default LectureInfo;
