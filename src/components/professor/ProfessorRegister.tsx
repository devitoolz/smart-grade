import React, { useEffect, useRef, useState } from 'react';
import { ModalStyle } from '../../styles/MyStyleCSS';
import CommonButton from '../CommonButton';
import { Row } from '../../styles/UserStyle';
import { ProfessorRegisterModal } from '../../styles/RegisterStyle';
import { LectureRegister } from '../../types/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Dropdown from '../Dropdown';
import Input from '../Input';

const ProfessorRegister = ({ setOpenRegister }: LectureRegister) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lectureRoom, setLectureRoom] = useState<string | number | null>('');
  const [studentNum, setStudentNum] = useState<string>('');

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.allowTouchMove = false;
    }
  });

  const handlePreviousClick = () => {
    setActiveIndex(prevActiveIndex => prevActiveIndex - 1);
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNextClick = () => {
    setActiveIndex(prevActiveIndex => prevActiveIndex + 1);
    swiperRef.current?.swiper.slideNext();
  };

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
            <Swiper
              pagination={{ type: 'progressbar' }}
              modules={[Pagination]}
              navigation={true}
              ref={swiperRef}
            >
              <SwiperSlide>
                <ProfessorRegisterModal>
                  <div className="register-form">
                    <div>
                      <span>강의실</span>
                      <Dropdown
                        length="long"
                        placeholder="강의실을 선택하세요."
                        data={[
                          { id: 0, title: '테스트 1' },
                          { id: 1, title: '테스트 2' },
                        ]}
                        propertyName={{ key: 'id', value: 'title' }}
                        value={lectureRoom}
                        setValue={setLectureRoom}
                        reset
                        search
                      />
                    </div>
                    <div>
                      <span>인원 수</span>
                      <Input
                        type="number"
                        length="long"
                        placeholder="인원 수를 입력하세요."
                        reset={setStudentNum}
                        value={studentNum}
                        setValue={e => setStudentNum(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="time-table"></div>
                </ProfessorRegisterModal>
              </SwiperSlide>
              <SwiperSlide>
                <ProfessorRegisterModal>
                  <div className="book-img"></div>
                  <div className="register-form">
                    <Row col={1}>
                      <div>강의명</div>
                      <div></div>
                    </Row>
                    <Row col={1}>
                      <div>전공</div>
                      <div></div>
                    </Row>
                    <Row col={1}>
                      <div>강의실</div>
                      <div></div>
                    </Row>
                    <Row col={1}>
                      <div>인원 수</div>
                      <div></div>
                    </Row>
                    <Row col={1}>
                      <div>강의 기간</div>
                      <div></div>
                    </Row>
                    <Row col={1}>
                      <div>강의 요일 및 시간</div>
                      <div></div>
                    </Row>
                    <Row col={1}>
                      <div>교재명</div>
                      <div></div>
                    </Row>
                  </div>
                </ProfessorRegisterModal>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="modal-footer">
            {activeIndex !== 0 && (
              <CommonButton value="이전" onClick={handlePreviousClick} btnType="modal" />
            )}
            <CommonButton value="확인" onClick={handleNextClick} btnType="modal" />
            <CommonButton value="취소" onClick={handleCancel} btnType="modal" />
          </div>
        </div>
      </ModalStyle>
    </>
  );
};

export default ProfessorRegister;
