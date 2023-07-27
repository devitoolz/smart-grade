import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
  Content,
  MainLayout,
  MainMenu,
  MainMenuItem,
  Sidebar,
  SubMenu,
  Title,
} from '../styles/AppStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuildingColumns,
  faGraduationCap,
  faHouse,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import majorSlice from '../slices/majorSlice';

const Main = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);
  const [title, setTitle] = useState('');

  const menuData = {
    home: {
      index: 1,
      icon: faHouse,
      title: '홈',
      submenu: { dashboard: '대시보드', notice: '공지사항' },
    },
    user: {
      index: 2,
      icon: faUser,
      title: '계정관리',
      submenu: { professor: '교수 계정 관리', student: '학생 계정 관리' },
    },
    bachelor: {
      index: 3,
      icon: faGraduationCap,
      title: '학사관리',
      submenu: { lecture: '통합 강의 관리', grade: '통합 성적 관리' },
    },
    college: {
      index: 4,
      icon: faBuildingColumns,
      title: '대학관리',
      submenu: { 'lecture-room': '강의실 관리', major: '전공 관리' },
    },
  };

  const pathSegments = pathname.split('/').filter(Boolean);
  const mainPath = pathSegments[0];
  const subPath = pathSegments[1];

  useEffect(() => {
    setActiveIndex(menuData[mainPath].index || 1);
    setTitle(menuData[mainPath].submenu[subPath] || '');
  }, [pathname]);

  const dispatch = useDispatch();
  const major = majorSlice.actions;

  // TODO: 추후 axios GET 으로 변경 예정
  useEffect(() => {
    const result = [
      { id: 1, title: '내용 1' },
      { id: 2, title: '내용 2' },
      { id: 3, title: '내용 3' },
      { id: 4, title: '내용 4' },
      { id: 5, title: '내용 5' },
    ];

    dispatch(major.loadMajorList(result));
  }, []);

  return (
    <MainLayout>
      <Sidebar>
        <MainMenu activeIndex={activeIndex}>
          {Object.keys(menuData).map(key => {
            return (
              <MainMenuItem key={key} onClick={() => navigate(key)}>
                <FontAwesomeIcon icon={menuData[key].icon} />
                <span>{menuData[key].title}</span>
              </MainMenuItem>
            );
          })}
        </MainMenu>
        <SubMenu>
          <span>{menuData[mainPath].title}</span>
          {Object.keys(menuData[mainPath].submenu).map(key => (
            <NavLink key={key} to={`${mainPath}/${key}`}>
              {menuData[mainPath].submenu[key]}
            </NavLink>
          ))}
        </SubMenu>
      </Sidebar>
      <Content>
        <Title>{title}</Title>
        <Outlet />
      </Content>
    </MainLayout>
  );
};

export default Main;
