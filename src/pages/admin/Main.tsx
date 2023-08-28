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
} from '../../styles/AppStyle';
import { Layout } from '../../styles/CommonStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuildingColumns,
  faGraduationCap,
  faHouse,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import mainSlice from '../../slices/mainSlice';
import api from '../../apis/api';
import { removeCookie } from '../../modules/cookies';
import { RootState } from '../../store';
import { MenuDataType } from '../../types/pages';

const Main = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const dispatch = useDispatch();
  const main = mainSlice.actions;

  const { title } = useSelector((state: RootState) => state.main);

  const menuData: MenuDataType = {
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
      submenu: { professor: '교수 계정 관리', students: '학생 계정 관리' },
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
  const mainPath = pathSegments[1];
  const subPath = pathSegments[2];
  const paramPath = pathSegments[3];

  useEffect(() => {
    setActiveIndex(menuData[mainPath].index || 1);
    const title: string = menuData[mainPath].submenu[subPath];
    if (title && !paramPath) dispatch(main.setTitle(<span>{title}</span>));
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await api.post(`/api/logout`);
      removeCookie('accessToken');
      removeCookie('refreshToken');
      alert('로그아웃 되었습니다.');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

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
        <Title>
          <div className="title">{title}</div>
          <div className="user-info">
            <div className="user-info-pic">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span>관리자 님</span>
            <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} />
          </div>
        </Title>
        <Layout>
          <Outlet />
        </Layout>
      </Content>
    </MainLayout>
  );
};

export default Main;
