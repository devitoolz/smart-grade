import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const role = 'ROLE_ADMIN';

  const JWT_EXPIRY_TIME = 3600 * 1000;

  const onLoginSuccess = data => {
    const { accessToken } = data;
    // accessToken 설정
    localStorage.setItem('refresh', data.refreshToken);
    localStorage.setItem('access', data.accessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    // accessToken 만료하기 1분 전에 로그인 연장
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60 * 1000);
  };

  const onSilentRefresh = async () => {
    const refreshToken = localStorage.getItem('refresh');
    const accessToken = localStorage.getItem('access');
    if (!refreshToken) return;
    try {
      const { data } = await axios.get(`/api/refresh-token?refreshToken=${refreshToken}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(
        `토큰 갱신 성공!\naccessToken: ${data.accessToken}\nrefreshToken: ${data.refreshToken}`
      );
      onLoginSuccess(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    const payload = {
      id: id,
      password: pw,
      role,
    };
    try {
      const { data } = await axios.post(`/api/sign-in`, payload);
      console.log(
        `로그인 성공!\naccessToken: ${data.accessToken}\nrefreshToken: ${data.refreshToken}`
      );
      onLoginSuccess(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`/api/logout`);
      console.log(data);
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onSilentRefresh();
  }, []);

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
    </div>
  );
};

export default Login;
