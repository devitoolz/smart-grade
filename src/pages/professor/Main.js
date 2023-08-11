import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Content,
  Footer,
  MainLayout,
  Menu,
  MenuContainer,
  MenuContent,
  MenuLogo,
  Sidebar,
  Title,
} from '../../styles/AppStyle';
import { Layout } from '../../styles/CommonStyle';
import footerLogo from '../../images/footer_logo.png';

import { useDispatch, useSelector } from 'react-redux';
import mainSlice from '../../slices/mainSlice';
import {
  faBookOpen,
  faGraduationCap,
  faHouse,
  faUser,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Main = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const main = mainSlice.actions;

  const { title } = useSelector(state => state.main);
  const { user } = useSelector(state => state.main);

  const menuData = {
    home: {
      icon: faHouse,
      title: '홈',
    },
    mypage: {
      icon: faUser,
      title: '마이페이지',
    },
    lecture: {
      icon: faBookOpen,
      title: '담당 강의 조회',
    },
    open: {
      icon: faGraduationCap,
      title: '강의 개설 신청',
    },
    students: {
      icon: faUserGraduate,
      title: '수강생 조회',
    },
  };

  const pathSegments = pathname.split('/').filter(Boolean);
  const mainPath = pathSegments[1];

  useEffect(() => {
    if (user && user.profile.secretKey !== 'true' && pathname !== '/professor/mypage') {
      alert('OTP 등록을 하지 않으면 접근할 수 없습니다.');
      navigate('mypage');
      return;
    }

    const title = menuData[mainPath].title;
    dispatch(main.setTitle(<span>{title}</span>));
  }, [pathname]);

  return (
    <MainLayout>
      <Sidebar>
        <Menu>
          <MenuLogo>
            <img src={footerLogo} alt="logo" />
            <span>SMARTGRADE</span>
          </MenuLogo>
          <MenuContent>
            <MenuContainer>
              {Object.keys(menuData).map(key => (
                <NavLink key={key} to={key}>
                  <FontAwesomeIcon icon={menuData[key].icon} />
                  <span>{menuData[key].title}</span>
                </NavLink>
              ))}
            </MenuContainer>
            <Footer>
              <img src={footerLogo} alt="logo" />
              <span>SMARTGRADE</span>
              <div className="copyright">
                <span>ⓒ 2023 Project SMARTGRADE</span>
                <span>Front-end | 박상렬 오영지 황지현</span>
                <span>Back-end | 진혁재 김재경 배성현 이민용</span>
              </div>
            </Footer>
          </MenuContent>
        </Menu>
      </Sidebar>
      <Content>
        <Title>{title}</Title>
        <Layout>
          <Outlet />
        </Layout>
      </Content>
    </MainLayout>
  );
};

export default Main;
