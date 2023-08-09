import React, { useState } from 'react';
import Input from '../components/Input';
import api from '../api/api';
import { removeCookie, setCookie } from '../modules/cookies';
import {
  FindAccountForm,
  FindLogin,
  LoginBtn,
  LoginContent,
  LoginFooter,
  LoginForm,
  LoginHeader,
  LoginInput,
  LoginLayout,
  RoleButtonContainer,
} from '../styles/LoginStyle';
import headerLogo from '../images/header_logo.png';
import footerLogo from '../images/footer_logo.png';
import professorImg from '../images/professor.png';
import professorActiveImg from '../images/professor_active.png';
import studentImg from '../images/student.png';
import studentActiveImg from '../images/student_active.png';
import adminImg from '../images/admin.png';
import adminActiveImg from '../images/admin_active.png';
import RoleRadioButton from '../components/RoleRadioButton';

const Login = () => {
  // const [id, setId] = useState('');
  // const [pw, setPw] = useState('');
  // const role = 'ROLE_ADMIN';

  // const handleLogin = async () => {
  //   const payload = {
  //     id: id,
  //     password: pw,
  //     role,
  //   };
  //   try {
  //     const { data } = await api.post(`/api/sign-in`, payload);
  //     console.log(
  //       `로그인 성공!\naccessToken: ${data.accessToken}\nrefreshToken: ${data.refreshToken}`
  //     );
  //     setCookie('accessToken', data.accessToken);
  //     setCookie('refreshToken', data.refreshToken);
  //   } catch (err) {
  //     console.log('Error:', err);
  //   }
  // };

  // const handleLogout = async () => {
  //   try {
  //     await api.post(`/api/logout`);
  //     removeCookie('accessToken');
  //     removeCookie('refreshToken');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const test = async () => {
  //   try {
  //     const { data } = await api.get(`/api/admin/professor`);
  //     console.log(data.professors);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const [role, setRole] = useState('ROLE_PROFESSOR');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleRoleChange = e => {
    setRole(e.target.value);
  };

  return (
    <LoginLayout>
      <LoginHeader>
        <div>
          <img src={headerLogo} alt="logo" />
          <span>LOGIN</span>
        </div>
      </LoginHeader>
      <LoginContent>
        <RoleButtonContainer>
          <RoleRadioButton
            img={role === 'ROLE_PROFESSOR' ? professorActiveImg : professorImg}
            imgHeight={130}
            text="교수님"
            value="ROLE_PROFESSOR"
            checked={role === 'ROLE_PROFESSOR'}
            onChange={handleRoleChange}
          />
          <RoleRadioButton
            img={role === 'ROLE_STUDENT' ? studentActiveImg : studentImg}
            imgHeight={120}
            text="재학생 / 졸업생"
            value="ROLE_STUDENT"
            checked={role === 'ROLE_STUDENT'}
            onChange={handleRoleChange}
          />
          <RoleRadioButton
            img={role === 'ROLE_ADMIN' ? adminActiveImg : adminImg}
            imgHeight={110}
            text="직원"
            value="ROLE_ADMIN"
            checked={role === 'ROLE_ADMIN'}
            onChange={handleRoleChange}
          />
        </RoleButtonContainer>
        <LoginForm>
          <LoginInput>
            <div>
              <label htmlFor="id">아이디</label>
              <input
                id="id"
                type="text"
                value={id}
                onChange={e => setId(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                autoComplete="off"
              />
            </div>
          </LoginInput>
          <FindLogin>
            <LoginBtn>로그인</LoginBtn>
            <FindAccountForm>
              <span>아이디 찾기</span>
              <span>비밀번호 찾기</span>
            </FindAccountForm>
          </FindLogin>
        </LoginForm>
      </LoginContent>
      <LoginFooter>
        <img src={footerLogo} alt="logo" />
        <span>SMARTGRADE</span>
        <div className="copyright">
          <span>ⓒ 2023 Project SMARTGRADE</span>
          <span>Front-end | 박상렬 오영지 황지현</span>
          <span>Back-end | 진혁재 김재경 배성현 이민용</span>
        </div>
      </LoginFooter>
    </LoginLayout>
  );
};

export default Login;
