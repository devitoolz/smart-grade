import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
  Content,
  Layout,
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
      subtitle: { dashboard: '대시보드', notice: '공지사항' },
    },
    user: {
      index: 2,
      icon: faUser,
      title: '홈',
      subtitle: { professor: '교수 계정 관리', student: '학생 계정 관리' },
    },
    bachelor: {
      index: 3,
      icon: faGraduationCap,
      title: '홈',
      subtitle: { lecture: '통합 강의 관리', grade: '통합 성적 관리' },
    },
    college: {
      index: 4,
      icon: faBuildingColumns,
      title: '홈',
      subtitle: { 'lecture-room': '강의실 관리', major: '전공 관리' },
    },
  };

  const pathSegments = pathname.split('/').filter(Boolean);
  const mainPath = pathSegments[0];
  const subPath = pathSegments[1];

  useEffect(() => {
    setActiveIndex(menuData[mainPath].index || 1);
    setTitle(menuData[mainPath].subtitle[subPath] || '');
  }, [pathname]);

  return (
    <Layout>
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
          {Object.keys(menuData[mainPath].subtitle).map(key => (
            <NavLink key={key} to={`${mainPath}/${key}`}>
              {menuData[mainPath].subtitle[key]}
            </NavLink>
          ))}
        </SubMenu>
      </Sidebar>
      <Content>
        <Title>{title}</Title>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Main;
