import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import type { RootState } from '../store';

const otpNotFound = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.main);

  const role = pathname.split('/').filter(Boolean)[0];

  useEffect(() => {
    if (user && user.profile.secretKey !== 'true' && pathname !== `/${role}/mypage`) {
      alert('OTP 등록을 하지 않으면 접근할 수 없습니다.');
      navigate(`/${role}/mypage`);
      return;
    }
  }, [user, pathname]);
};

export default otpNotFound;
