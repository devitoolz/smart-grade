import React, { useEffect, useState } from 'react';
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
  faBell,
  faBookOpen,
  faFileSignature,
  faGraduationCap,
  faHouse,
  faRightFromBracket,
  faUser,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../apis/api';
import { removeCookie } from '../../modules/cookies';
import { RootState } from '../../store';
import { MenuDataType } from '../../types/pages';
import { ProfessorProfileData } from '../../types/apis';

export const PROFESSOR_IMG_URL = '/imgs/professor';

const Main = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [img, setImg] = useState<string | null>(null);

  const dispatch = useDispatch();
  const main = mainSlice.actions;

  const { title, user } = useSelector((state: RootState) => state.main);

  const menuData: MenuDataType = {
    home: {
      icon: faHouse,
      title: '홈',
    },
    notice: {
      icon: faBell,
      title: '공지사항',
    },
    mypage: {
      icon: faUser,
      title: '마이페이지',
    },
    lecture: {
      icon: faBookOpen,
      title: '강의 조회',
    },
    grade: {
      icon: faFileSignature,
      title: '성적 관리',
    },
    register: {
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
    const title = menuData[mainPath].title;
    dispatch(main.setTitle(<span>{title}</span>));
  }, [pathname]);

  useEffect(() => {
    user?.profile.pic
      ? setImg(
          user?.profile.pic.startsWith('blob')
            ? user?.profile.pic
            : `${PROFESSOR_IMG_URL}/${(user?.profile as ProfessorProfileData).iprofessor}/${user
                ?.profile.pic}`
        )
      : setImg(null);
  }, [user]);

  const handleLogout = async () => {
    try {
      await api.post(`${process.env.REACT_APP_API_URL}/api/logout`);
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
        <Title>
          <div className="title">{title}</div>
          <div className="user-info">
            <div className="user-info-pic">
              {img ? <img src={img} alt="프로필 이미지" /> : <FontAwesomeIcon icon={faUser} />}
            </div>
            <span>{user?.profile.name} 교수님</span>
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
