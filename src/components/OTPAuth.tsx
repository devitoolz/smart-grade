import React, { useState } from 'react';
import axios from 'axios';
import { ModalStyle } from '../styles/MyStyleCSS';
import { useNavigate } from 'react-router';
import { setCookie } from '../modules/cookies';
import CommonButton from './CommonButton';
import Input from './Input';
import { OTPAuthProps } from '../types/components';
import { OTPAuthData } from '../types/apis';

const OTPAuth = ({ payload, setOpenOTP }: OTPAuthProps) => {
  const [OTP, setOTP] = useState<string>('');
  const navigate = useNavigate();

  const authPayload: OTPAuthData = {
    uid: payload.id,
    otpNum: OTP,
    role: payload.role,
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOTP(value.replace(/[^0-9]/g, ''));
  };

  const handleOTPAuth = async () => {
    try {
      // TODO: data 타입 지정
      const { data } = await axios.post(`/api/otp-valid`, authPayload);
      if (data.success) {
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);
        navigate(`/${payload.role.toLowerCase().replace('role_', '')}`);
      }
    } catch {
      alert('인증에 실패하였습니다.');
    }
  };

  return (
    <ModalStyle modalSize="small">
      <div className="modal-box" style={{ height: 230, width: 350 }}>
        <div className="modal-title-small">
          <div>OTP 인증</div>
        </div>
        <div className="modal-contents">
          <Input
            type="text"
            length="long"
            placeholder="OTP"
            reset={setOTP}
            value={OTP}
            setValue={handleOTPChange}
          />
        </div>
        <div className="modal-footer">
          <CommonButton value="인증" onClick={handleOTPAuth} btnType="modal" />
          <CommonButton value="취소" onClick={() => setOpenOTP(false)} btnType="modal" />
        </div>
      </div>
    </ModalStyle>
  );
};

export default OTPAuth;
