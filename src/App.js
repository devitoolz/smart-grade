import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { GlobalLayout } from './styles/AppStyle';
import Login from './pages/Login';
import Admin from './Admin';
import NotFound from './pages/NotFound';
import { Interceptor } from './api/api';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import Professor from './Professor';
import { getCookie, removeCookie } from './modules/cookies';

const App = () => {
  const { pathname } = useLocation();
  const { isPosting } = useSelector(state => state.main);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');

    if (pathname === '/' && (accessToken || refreshToken)) {
      removeCookie('accessToken');
      removeCookie('refreshToken');
    }
  }, []);

  return (
    <Interceptor>
      <GlobalLayout isDark={false} />
      {isPosting ? <Loading /> : null}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/professor/*" element={<Professor />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </Interceptor>
  );
};

export default App;
