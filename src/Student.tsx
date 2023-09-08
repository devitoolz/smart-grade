import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import api, { getAuth, removeAuth } from './apis/api';
import { useDispatch } from 'react-redux';
import mainSlice from './slices/mainSlice';
import otpNotFound from './hooks/otpNotFound';
import Main from './pages/student/Main';
import Dashboard from './pages/student/Dashboard';
import Mypage from './pages/student/Mypage';
import Grade from './pages/student/Grade';
import Register from './pages/student/Register';
import Lecture from './pages/student/Lecture';
import { UserProfile } from './types/apis';
import { checkValidEmail } from './modules/regex';

const Student = () => {
  otpNotFound();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const main = mainSlice.actions;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await api.get<UserProfile>(`/api/student/detail`);
        data.profile.secretKey = JSON.parse(data.profile.secretKey);
        if (data.profile.email && !checkValidEmail(data.profile.email)) {
          data.profile.email = '';
        }
        dispatch(main.setUser({ ...data }));
      } catch {
        if (getAuth()) {
          alert('학생만 접근할 수 있습니다.');
          navigate(-2);
        } else {
          alert('로그인이 필요합니다.');
          removeAuth();
        }
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    if (pathname === '/student') {
      navigate('home');
    }
  }, [pathname]);

  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="home" element={<Dashboard />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="lecture" element={<Lecture />} />
        <Route path="grade" element={<Grade />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/notfound" state={{ user: 'student' }} />} />
    </Routes>
  );
};

export default Student;
