import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from './pages/professor/Main';
import Dashboard from './pages/professor/Dashboard';
import api from './api/api';

const Professor = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('교수 페이지 로딩');
    const getProfile = async () => {
      try {
        const { data } = await api.get(`/api/professor`);
        console.log(data);
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
        <Route path="mypage" element={<Dashboard />} />
        <Route path="lecture" element={<Dashboard />} />
        <Route path="open" element={<Dashboard />} />
        <Route path="students" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/notfound" state={{ user: 'professor' }} />} />
    </Routes>
  );
};

export default Professor;
