import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import Notice from './pages/Notice';
import NotFound from './pages/NotFound';
import Professor from './pages/Professor';
import Student from './pages/Student';
import Lecture from './pages/Lecture';
import Grade from './pages/Grade';
import LectureRoom from './pages/LectureRoom';
import Major from './pages/Major';
import { GlobalLayout } from './styles/AppStyle';
import Approval from './pages/Approval';
import Write from './pages/Write';

const App = () => {
  return (
    <>
      <GlobalLayout isDark={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Main />}>
          <Route path="home" element={<Navigate to="dashboard" />} />
          <Route path="home/dashboard" element={<Dashboard />} />
          <Route path="home/notice" element={<Notice />} />
          <Route path="/home/notice/write" element={<Write />} />
          <Route path="user" element={<Navigate to="professor" />} />
          <Route path="user/professor" element={<Professor />} />
          <Route path="user/student" element={<Student />} />
          <Route path="bachelor" element={<Navigate to="lecture" />} />
          <Route path="bachelor/lecture" element={<Lecture />} />
          <Route path="bachelor/lecture/approval" element={<Approval />} />
          <Route path="bachelor/grade" element={<Grade />} />
          <Route path="college" element={<Navigate to="lecture-room" />} />
          <Route path="college/lecture-room" element={<LectureRoom />} />
          <Route path="college/major" element={<Major />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
