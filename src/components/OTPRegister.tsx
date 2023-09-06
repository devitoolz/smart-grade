import React, { useEffect, useState } from 'react';
import { ModalStyle } from '../styles/MyStyleCSS';
import CommonButton from './CommonButton';
import { useDispatch, useSelector } from 'react-redux';
import api from '../apis/api';
import mainSlice from '../slices/mainSlice';
import { RootState } from '../store';
import { OTPRegisterProps } from '../types/components';
import { OTPData } from '../types/apis';

const OTPRegister = ({ setOpenOTPRegister }: OTPRegisterProps) => {
  const [QRUrl, setQRUrl] = useState<string | undefined>(undefined);

  const { user } = useSelector((state: RootState) => state.main);
  const main = mainSlice.actions;

  const dispatch = useDispatch();

  useEffect(() => {
    const registerOTP = async () => {
      try {
        const { data } = await api.get<OTPData>(`/api/otp`);
        setQRUrl(data.barcodeUrl.replace('www.google', 'chart.googleapis'));
        dispatch(main.setUser({ ...user, profile: { ...user?.profile, secretKey: 'true' } }));
      } catch {
        alert('OTP 발급 중 오류가 발생했습니다.');
      }
    };
    registerOTP();
  }, []);

  const handleOk = () => {
    if (confirm('Google OTP에 등록하셨습니까?')) {
      setOpenOTPRegister(false);
    } else {
      alert('OTP 등록을 진행해주세요.');
    }
  };

  return (
    <ModalStyle modalSize="small">
      <div className="modal-box" style={{ height: 'auto' }}>
        <div className="modal-title-small">
          <div>OTP 등록</div>
        </div>
        <div className="modal-contents">
          <img style={{ padding: 15 }} src={QRUrl} alt="QR Code" />
        </div>
        <div className="modal-footer">
          <CommonButton value="확인" onClick={handleOk} btnType="modal" />
        </div>
      </div>
    </ModalStyle>
  );
};

export default OTPRegister;
