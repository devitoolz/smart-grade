import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { GlobalLayout } from './styles/AppStyle';
import Login from './pages/Login';
import Admin from './Admin';
import NotFound from './pages/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import mainSlice from './slices/mainSlice';
import api from './api/api';
import Loading from './components/Loading';

const App = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  switch (pathname) {
    case '/admin':
      return <Navigate to="/admin/home" />;
    case '/professor':
      return <Navigate to="/professor/home" />;
    case '/student':
      return <Navigate to="/student/home" />;
  }

  useEffect(() => {
    const main = mainSlice.actions;

    api.interceptors.request.use(
      config => {
        if (config.method === 'post') {
          dispatch(main.setIsPosting(true));
        }
        return config;
      },
      error => {
        dispatch(main.setIsPosting(false));
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      response => {
        dispatch(main.setIsPosting(false));
        return response;
      },
      error => {
        dispatch(main.setIsPosting(false));
        return Promise.reject(error);
      }
    );
  }, []);

  const { isPosting } = useSelector(state => state.main);

  return (
    <>
      <GlobalLayout isDark={false} />
      {isPosting ? <Loading /> : null}
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
