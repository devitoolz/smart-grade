import React, { useState } from 'react';
import { ModalStyle } from '../styles/MyStyleCSS';
import { useNavigate } from 'react-router';
import { setCookie } from '../modules/cookies';
import CommonButton from './CommonButton';
import Input from './Input';
import { OTPAuthProps } from '../types/components';
import { OTPAuthData } from '../types/apis';
import { SendOTP } from '../styles/LoginStyle';
import api from '../apis/api';

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
    if (OTP === '') {
      alert('OTP를 입력하세요.');
      return;
    }

    try {
      // TODO: data 타입 지정
      const { data } = await api.post(`/api/otp-valid`, authPayload);
      if (data.success) {
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);

        navigate(`${payload.role.toLowerCase().replace('role_', '')}`);
      }
    } catch {
      alert('인증에 실패하였습니다.');
    }
  };

  const handleResendQR = async () => {
    try {
      await api.post(`/api/send-email`, payload);
      alert('등록한 이메일로 QR 코드 URL이 발송 되었습니다.');
    } catch {
      alert('이메일 발송에 실패하였습니다.');
    }
  };

  const handleCancel = () => {
    setOpenOTP(false);
  };

  return (
    <ModalStyle modalSize="small">
      <div className="modal-box" style={{ height: 210, width: 300 }}>
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
          <SendOTP onClick={handleResendQR}>QR 재등록</SendOTP>
        </div>
        <div className="modal-footer">
          <CommonButton value="인증" onClick={handleOTPAuth} btnType="modal" />
          <CommonButton value="취소" onClick={handleCancel} btnType="modal" />
        </div>
      </div>
    </ModalStyle>
  );
};

export default OTPAuth;
