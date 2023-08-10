import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from './pages/professor/Main';
import Dashboard from './pages/professor/Dashboard';
import api from './api/api';
import Mypage from './pages/professor/Mypage';
import { useDispatch } from 'react-redux';
import mainSlice from './slices/mainSlice';

const Professor = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const main = mainSlice.actions;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await api.get(`/api/professor`);
        dispatch(main.setUser({ ...data.list[0] }));
      } catch (err) {
        console.log(err);
        navigate('/');
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    if (pathname === '/professor') {
      navigate('home');
    }
  }, [pathname]);

  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="home" element={<Dashboard />} />
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
