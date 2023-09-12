import React from 'react';
import CommonButton from './CommonButton';
import { ModalStyle } from '../styles/MyStyleCSS';
import { BookImage, InfoFormTable, RegisterLayout } from '../styles/RegisterStyle';
import { FormTable, Row } from '../styles/UserStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faXmark } from '@fortawesome/free-solid-svg-icons';
import { RegisterDetailProps } from '../types/components';
import { dayData } from '../modules/timetable';

const RegisterDetail = ({ lectureData, setLectureData }: RegisterDetailProps) => {
  const handleCancel = () => {
    setLectureData(null);
  };

  return (
    <ModalStyle modalSize="small">
      <div className="modal-box" style={{ height: 'auto', width: '960px' }}>
        <div className="modal-title-small">
          <div>{lectureData?.lectureName}</div>
          <button onClick={handleCancel}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>
        <div className="modal-contents">
          <RegisterLayout style={{ padding: '20px 0', width: '100%' }}>
            <FormTable style={{ paddingTop: 0 }}>
              <Row>
                <div>강의명</div>
                <div>{lectureData?.lectureName}</div>
              </Row>
              <Row col={2}>
                <div>강의실</div>
                <div>{`${lectureData?.buildingName} ${lectureData?.lectureRoomName}호`}</div>
                <div style={{ boxShadow: '0 -2px 0 0 var(--form-table-odd-border-color)' }}>
                  강의 시간
                </div>
                <div>{`${
                  dayData[lectureData?.dayWeek]
                } ${lectureData?.lectureStrTime} ~ ${lectureData?.lectureEndTime}`}</div>
                <div>수강 인원 수</div>
                <div>{lectureData?.lectureMaxPeople}</div>
                <div>{lectureData?.professorName ? '담당 교수' : '학년 제한'}</div>
                <div>{lectureData?.professorName ?? lectureData?.gradeLimit}</div>
                <div>학점</div>
                <div>{lectureData?.score}</div>
                <div>배점</div>
                <div>{`출석 ${lectureData?.attendance}% / 중간 ${lectureData?.midtermExamination}% / 기말 ${lectureData?.finalExamination}%`}</div>
              </Row>
            </FormTable>
            <InfoFormTable style={{ gridTemplate: 'auto 46px/1fr 1fr' }}>
              <div className="row">
                <div>강의 설명</div>
                <div>{lectureData?.ctnt}</div>
              </div>
              <div className="row book-img" style={{ gridRow: 'span 2' }}>
                <div>교재 이미지</div>
                <div>
                  <BookImage>
                    {lectureData?.bookUrl ? (
                      <img src={lectureData?.bookUrl} alt="교재 이미지" />
                    ) : (
                      <div className="no-book">
                        <FontAwesomeIcon icon={faBook} />
                        <span>교재가 없습니다.</span>
                      </div>
                    )}
                  </BookImage>
                </div>
              </div>
              <div className="row pt-2">
                <div>교재명</div>
                <div
                  style={{
                    overflow: 'hidden',
                  }}
                >
                  {lectureData?.textBook ? (
                    <div className="ellipsis">{lectureData?.textBook}</div>
                  ) : (
                    <span>교재가 없습니다.</span>
                  )}
                </div>
              </div>
            </InfoFormTable>
          </RegisterLayout>
        </div>
        <div className="modal-footer">
          <CommonButton value="닫기" onClick={handleCancel} btnType="modal" />
        </div>
      </div>
    </ModalStyle>
  );
};

export default RegisterDetail;
