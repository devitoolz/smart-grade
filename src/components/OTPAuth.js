import React, { useState } from 'react';
import { ModalStyle } from '../styles/MyStyleCSS';
import api from '../api/api';
import { useNavigate } from 'react-router';
import { getCookie } from '../modules/cookies';

const OTPAuth = () => {
  const [OTP, setOTP] = useState('');
  const navigate = useNavigate();

  const role = getCookie('role');

  const handleOTPAuth = async () => {
    try {
      const data = await api.get(`/api/otp-valid?otpNum=${OTP}`);
      console.log(data);
      if (data) {
        navigate(`/${role.toLowerCase().replace('role_', '')}`);
      }
    } catch (err) {
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
