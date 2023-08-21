import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import api, { removeAuth } from './api/api';
import { useDispatch } from 'react-redux';
import mainSlice from './slices/mainSlice';
import otpNotFound from './hooks/otpNotFound';
import Main from './pages/student/Main';
import Dashboard from './pages/student/Dashboard';
import Mypage from './pages/student/Mypage';
import Grade from './pages/student/Grade';
import Register from './pages/student/Register';

const Student = () => {
  otpNotFound();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const main = mainSlice.actions;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await api.get(`/api/student/profile`);
        dispatch(main.setUser({ ...data }));
      } catch (err) {
        removeAuth();
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
        <Route path="grade" element={<Grade />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/notfound" state={{ user: 'student' }} />} />
    </Routes>
  );
};

export default Student;
