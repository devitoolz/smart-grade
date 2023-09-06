import React, { useEffect, useRef, useState } from 'react';
import { ModalStyle } from '../styles/MyStyleCSS';
import { PasswordForm } from '../styles/UserStyle';
import CommonButton from './CommonButton';
import Input from './Input';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';
import { FindPasswordProps, ObjectType } from '../types/components';

const FindPassword = ({ setOpenFindPw, payload }: FindPasswordProps) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [roleTxt, setRoleTxt] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [OTP, setOTP] = useState<string>('');
  const [newPw, setNewPw] = useState<string>('');
  const [confirmNewPw, setConfirmNewPw] = useState<string>('');

  useEffect(() => {
    const roleKor: ObjectType = {
      ROLE_PROFESSOR: '교수',
      ROLE_STUDENT: '학생',
    };
    setRoleTxt(roleKor[payload.role]);

    if (swiperRef.current) {
      swiperRef.current.swiper.allowTouchMove = false;
    }
  }, []);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOTP(value.replace(/[^0-9]/g, ''));
  };

  const handleNextClick = async () => {
    if (!(id && OTP)) {
      alert('입력되지 않은 값이 있습니다.');
      return;
    }
    try {
      await axios.put(`/api/forget-password?uid=${id}&role=${payload.role}&inputCode=${OTP}`);
      setActiveIndex(prevActiveIndex => prevActiveIndex + 1);
      swiperRef.current?.swiper.slideNext();
    } catch {
      alert('인증에 실패하였습니다.');
    }
  };

  const handlePwUpdateClick = async () => {
    if (!(newPw && confirmNewPw)) {
      alert('입력되지 않은 값이 있습니다.');
      return;
    }

    if (newPw !== confirmNewPw) {
      alert('새 비밀번호가 일치하지 않습니다.');
      setConfirmNewPw('');
      return;
    }

    const data = {
      uid: id,
      role: payload.role,
      upw: newPw,
    };

    try {
      await axios.put(`/api/chang-password`, data);
      alert('비밀번호가 변경되었습니다.');
      setOpenFindPw(false);
    } catch {
      alert('서버와의 연결이 원활하지 않습니다.');
    }
  };

  return (
    <ModalStyle modalSize="small">
      <div className="modal-box">
        <div className="modal-title-small">
          <div>
            {roleTxt} 비밀번호 {(activeIndex === 0 && '찾기') || (activeIndex === 1 && '변경')}
          </div>
        </div>
        <div className="modal-contents">
          <Swiper
            pagination={{ type: 'progressbar' }}
            modules={[Pagination]}
            navigation={true}
            ref={swiperRef}
          >
            <SwiperSlide>
              <PasswordForm find>
                <label>아이디</label>
                <Input
                  type="text"
                  length="long"
                  placeholder="아이디"
                  reset={setId}
                  value={id}
                  setValue={e => setId(e.target.value)}
                />
                <label>OTP</label>
                <Input
                  type="text"
                  length="long"
                  placeholder="OTP"
                  reset={setOTP}
                  value={OTP}
                  setValue={handleOTPChange}
                />
              </PasswordForm>
            </SwiperSlide>
            <SwiperSlide>
              <PasswordForm find>
                <label>새 비밀번호</label>
                <Input
                  type="password"
                  length="long"
                  placeholder="변경할 비밀번호"
                  reset={setNewPw}
                  value={newPw}
                  setValue={e => setNewPw(e.target.value)}
                />
                <label>새 비밀번호 확인</label>
                <Input
                  type="password"
                  length="long"
                  placeholder="변경할 비밀번호 확인"
                  reset={setConfirmNewPw}
                  value={confirmNewPw}
                  setValue={e => setConfirmNewPw(e.target.value)}
                />
              </PasswordForm>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="modal-footer">
          <CommonButton
            value={activeIndex === 0 ? '다음' : activeIndex === 1 ? '변경' : undefined}
            onClick={
              activeIndex === 0
                ? handleNextClick
                : activeIndex === 1
                ? handlePwUpdateClick
                : undefined
            }
            btnType="modal"
          />
          {activeIndex !== 1 && (
            <CommonButton value="취소" onClick={() => setOpenFindPw(false)} btnType="modal" />
          )}
        </div>
      </div>
      ㄱ
    </ModalStyle>
  );
};

export default FindPassword;
