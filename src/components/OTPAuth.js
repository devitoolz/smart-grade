import React, { useState } from 'react';
import { ModalStyle } from '../styles/MyStyleCSS';
import api from '../api/api';
import { useNavigate } from 'react-router';
import { getCookie, setCookie } from '../modules/cookies';

const OTPAuth = ({ payload }) => {
  const [OTP, setOTP] = useState('');
  const navigate = useNavigate();

  const newPayload = {
    uid: payload.id,
    otpNum: OTP,
    role: payload.role,
  };

  const handleOTPAuth = async () => {
    try {
      const { data } = await api.post(`/api/otp-valid`, newPayload);
      console.log(data);
      if (data.success) {
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);
        setCookie('role', payload.role);
        navigate(`/${payload.role.toLowerCase().replace('role_', '')}`);
      }
    } catch (err) {
      console.log(err);
      alert('인증 코드를 확인해주세요.');
    }
  };

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
        <input type="text" value={OTP} onChange={e => setOTP(e.target.value)} />
        <button onClick={handleOTPAuth}>OTP 인증</button>
      </div>
    </ModalStyle>
  );
};

export default OTPAuth;
