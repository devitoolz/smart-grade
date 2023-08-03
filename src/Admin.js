import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from './pages/admin/Main';
import Dashboard from './pages/admin/Dashboard';
import Notice from './pages/admin/Notice';
import Write from './pages/admin/Write';
import Professor from './pages/admin/Professor';
import Student from './pages/admin/Student';
import CreateUser from './pages/admin/CreateUser';
import Lecture from './pages/admin/Lecture';
import Approval from './pages/admin/Approval';
import Grade from './pages/admin/Grade';
import LectureRoom from './pages/admin/LectureRoom';
import Major from './pages/admin/Major';

const Admin = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="home" element={<Navigate to="dashboard" />} />
        <Route path="home/dashboard" element={<Dashboard />} />
        <Route path="home/notice" element={<Notice />} />
        <Route path="home/notice/write" element={<Write />} />
        <Route path="user" element={<Navigate to="professor" />} />
        <Route path="user/professor" element={<Professor />} />
        <Route path="user/student" element={<Student />} />
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
