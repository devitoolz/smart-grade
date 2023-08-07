import React, { useState } from 'react';
import Input from '../components/Input';
import api from '../api/api';
import { removeCookie, setCookie } from '../modules/cookies';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const role = 'ROLE_ADMIN';

  const handleLogin = async () => {
    const payload = {
      id: id,
      password: pw,
      role,
    };
    try {
      const { data } = await api.post(`/api/sign-in`, payload);
      console.log(
        `로그인 성공!\naccessToken: ${data.accessToken}\nrefreshToken: ${data.refreshToken}`
      );
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post(`/api/logout`);
      removeCookie('accessToken');
      removeCookie('refreshToken');
    } catch (err) {
      console.log(err);
    }
  };

  const test = async () => {
    try {
      const { data } = await api.get(`/api/admin/professor`);
      console.log(data.professors);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Input
        length="long"
        type="text"
        placeholder="아이디"
        reset={setId}
        value={id}
        setValue={e => setId(e.target.value)}
      />
      <Input
        length="long"
        type="text"
        placeholder="비밀번호"
        reset={setPw}
        value={pw}
        setValue={e => setPw(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={test}>API 테스트</button>
    </div>
  );
};

export default Login;
