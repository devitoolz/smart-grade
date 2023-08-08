import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const goHome = () => {
    let path;
    switch (state?.user) {
      case 'admin':
        path = '/admin/home';
        break;
      case 'professor':
        path = '/professor/home';
        break;
      case 'students':
        path = '/students/home';
        break;
      default:
        path = '/';
    }
    navigate(path);
  };

  return (
    <>
      <div>NotFound</div>
      <button onClick={goHome}>홈으로</button>
    </>
  );
};

export default NotFound;
