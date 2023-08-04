import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GlobalLayout } from './styles/AppStyle';
import Login from './pages/Login';
import Admin from './Admin';
import NotFound from './pages/NotFound';
import { Interceptor } from './api/api';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';

const App = () => {
  const { isPosting } = useSelector(state => state.main);

  return (
    <Interceptor>
      <GlobalLayout isDark={false} />
      {isPosting ? <Loading /> : null}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </Interceptor>
  );
};

export default App;
