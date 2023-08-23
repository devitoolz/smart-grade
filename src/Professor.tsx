import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from './pages/professor/Main';
import Dashboard from './pages/professor/Dashboard';
import api, { getAuth, removeAuth } from './api/api';
import Mypage from './pages/professor/Mypage';
import { useDispatch } from 'react-redux';
import mainSlice from './slices/mainSlice';
import otpNotFound from './hooks/otpNotFound';
import Lecture from './pages/professor/Lecture';
import Register from './pages/professor/Register';
import Students from './pages/professor/Students';
import Grade from './pages/professor/Grade';
import { ProfessorProfile } from './types/profile';

const Professor = () => {
  otpNotFound();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const main = mainSlice.actions;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await api.get<ProfessorProfile>(`/api/professor`);
        dispatch(main.setUser({ ...data }));
      } catch {
        if (getAuth()) {
          alert('교수님만 접근할 수 있습니다.');
          navigate(-2);
        } else {
          alert('로그인이 필요합니다.');
          removeAuth();
        }
      }
    };
    // getProfile();
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
        <Route path="lecture" element={<Lecture />} />
        <Route path="grade" element={<Grade />} />
        <Route path="register" element={<Register />} />
        <Route path="students" element={<Students />} />
      </Route>
      <Route path="*" element={<Navigate to="/notfound" state={{ user: 'professor' }} />} />
    </Routes>
  );
};

export default Professor;
