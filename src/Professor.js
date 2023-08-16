import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from './pages/professor/Main';
import Dashboard from './pages/professor/Dashboard';
import api, { removeAuth } from './api/api';
import Mypage from './pages/professor/Mypage';
import { useDispatch } from 'react-redux';
import mainSlice from './slices/mainSlice';
import otpNotFound from './hooks/otpNotFound';

const Professor = () => {
  otpNotFound();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const main = mainSlice.actions;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await api.get(`/api/professor`);
        dispatch(main.setUser({ ...data }));
      } catch (err) {
        removeAuth();
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    if (pathname === '/professor') {
      // navigate('home');
      navigate('mypage');
    }
  }, [pathname]);

  return (
    <Routes>
      <Route element={<Main />}>
        {/* <Route path="home" element={<Dashboard />} /> */}
        <Route path="mypage" element={<Mypage />} />
        <Route path="lecture" element={<Dashboard />} />
        <Route path="open" element={<Dashboard />} />
        <Route path="students" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/notfound" state={{ user: 'professor' }} />} />
    </Routes>
  );
};

export default Professor;
