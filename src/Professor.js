import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from './pages/professor/Main';
import Dashboard from './pages/professor/Dashboard';

const Professor = () => {
  const { pathname } = useLocation();

  if (pathname === '/professor') {
    return <Navigate to="/professor/home" />;
  }

  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="home" element={<Dashboard />} />
        <Route path="lecture" element={<Dashboard />} />
        <Route path="open" element={<Dashboard />} />
        <Route path="students" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/notfound" state={{ user: 'professor' }} />} />
    </Routes>
  );
};

export default Professor;
