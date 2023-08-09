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
        <Route path="home" element={<Navigate to="dashboard" />} />
        <Route path="home/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/notfound" state={{ user: 'professor' }} />} />
    </Routes>
  );
};

export default Professor;
