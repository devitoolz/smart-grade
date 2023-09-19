import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from './pages/admin/Main';
import Dashboard from './pages/admin/Dashboard';
import Notice from './pages/Notice';
import NoticeDetail from './pages/NoticeDetail';
import Write from './pages/admin/Write';
import Professor from './pages/admin/Professor';
import Student from './pages/admin/Student';
import CreateUser from './pages/admin/CreateUser';
import Lecture from './pages/admin/Lecture';
import Approval from './pages/admin/Approval';
import Grade from './pages/admin/Grade';
import LectureRoom from './pages/admin/LectureRoom';
import Major from './pages/admin/Major';
import UserDetail from './pages/admin/UserDetail';
import { useDispatch } from 'react-redux';
import majorSlice from './slices/majorSlice';
import api, { getAuth, removeAuth } from './apis/api';
import { MajorData } from './types/apis';

const Admin = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const major = majorSlice.actions;

  useEffect(() => {
    // TODO: 전공 목록 api 수정 예정, 타입 추후 추가
    const getMajorList = async () => {
      try {
        const { data } = await api.get<Array<MajorData>>(
          `${process.env.REACT_APP_API_URL}/api/major/list`
        );
        dispatch(major.setAllMajorList(data));
      } catch {
        if (getAuth()) {
          alert('관리자만 접근할 수 있습니다.');
          navigate(-2);
        } else {
          alert('로그인이 필요합니다.');
          removeAuth();
        }
      }
    };
    getMajorList();
  }, []);

  useEffect(() => {
    if (pathname === '/admin') {
      navigate('home');
    }
  }, [pathname]);

  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="home" element={<Navigate to="dashboard" />} />
        <Route path="home/dashboard" element={<Dashboard />} />
        <Route path="home/notice" element={<Notice />} />
        <Route path="home/notice/:id" element={<NoticeDetail />} />
        <Route path="home/notice/write" element={<Write />} />
        <Route path="user" element={<Navigate to="professor" />} />
        <Route path="user/professor" element={<Professor />} />
        <Route path="user/professor/:id" element={<UserDetail />} />
        <Route path="user/students" element={<Student />} />
        <Route path="user/students/:id" element={<UserDetail />} />
        <Route path="user/create" element={<CreateUser />} />
        <Route path="bachelor" element={<Navigate to="lecture" />} />
        <Route path="bachelor/lecture" element={<Lecture />} />
        <Route path="bachelor/lecture/approval" element={<Approval />} />
        <Route path="bachelor/grade" element={<Grade />} />
        <Route path="college" element={<Navigate to="lecture-room" />} />
        <Route path="college/lecture-room" element={<LectureRoom />} />
        <Route path="college/major" element={<Major />} />
      </Route>
      <Route path="*" element={<Navigate to="/notfound" state={{ user: 'admin' }} />} />
    </Routes>
  );
};

export default Admin;
