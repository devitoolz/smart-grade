import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotFoundLayout } from '../styles/AppStyle';

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
    <NotFoundLayout>
      <FontAwesomeIcon icon={faTriangleExclamation} />
      <span>페이지를 찾을 수 없습니다.</span>
      <button onClick={goHome}>홈으로</button>
    </NotFoundLayout>
  );
};

export default NotFound;
