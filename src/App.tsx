import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { dark, light } from './styles/AppStyle';
import Login from './pages/Login';
import Admin from './Admin';
import NotFound from './pages/NotFound';
import { Interceptor } from './apis/api';
// import { useSelector } from 'react-redux';
// import Loading from './components/Loading';
import Professor from './Professor';
import { getCookie, removeCookie } from './modules/cookies';
import Student from './Student';
import { Global } from '@emotion/react';
import { GlobalLayoutProps } from './types/styles';

const GlobalLayout = ({ isDark }: GlobalLayoutProps) => {
  return <Global styles={isDark ? dark : light} />;
};

const App = () => {
  const { pathname } = useLocation();
  // const { isPosting } = useSelector(state => state.main);

  useEffect(() => {
    const accessToken: string = getCookie('accessToken');
    const refreshToken: string = getCookie('refreshToken');

    if (pathname === '/' && (accessToken || refreshToken)) {
      removeCookie('accessToken');
      removeCookie('refreshToken');
    }
  }, []);

  return (
    <Interceptor>
      <GlobalLayout isDark={false} />
      {/* {isPosting ? <Loading /> : null} */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/professor/*" element={<Professor />} />
        <Route path="/student/*" element={<Student />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </Interceptor>
  );
};

export default App;
