import React, { useState } from 'react';
import Input from '../components/Input';
import api from '../api/api';
import { removeCookie, setCookie } from '../modules/cookies';
import { LoginContent, LoginFooter, LoginHeader, LoginLayout } from '../styles/LoginStyle';
import headerLogo from '../images/header_logo.png';
import footerLogo from '../images/footer_logo.png';

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

  return (
    <LoginLayout>
      <LoginHeader>
        <div>
          <img src={headerLogo} alt="logo" />
          <span>LOGIN</span>
        </div>
      </LoginHeader>
      <LoginContent>
        <div>dd</div>
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
