import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { GlobalLayout } from './styles/AppStyle';
import Login from './pages/Login';
import Admin from './Admin';
import NotFound from './pages/NotFound';

const App = () => {
  const { pathname } = useLocation();

  switch (pathname) {
    case '/admin':
      return <Navigate to="/admin/home" />;
    case '/professor':
      return <Navigate to="/professor/home" />;
    case '/student':
      return <Navigate to="/student/home" />;
  }

  return (
    <>
      <GlobalLayout isDark={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </>
  );
};

export default App;
