import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const role = 'ROLE_ADMIN';

  // const JWT_EXPIRY_TIME = 10 * 1000;

  // const onLoginSuccess = data => {
  //   const { accessToken } = data;
  //   // accessToken 설정
  //   localStorage.setItem('refresh', data.refreshToken);
  //   localStorage.setItem('access', data.accessToken);
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  //   // accessToken 만료하기 1분 전에 로그인 연장
  //   setTimeout(onSilentRefresh, JWT_EXPIRY_TIME);
  // };

  // const onSilentRefresh = async () => {
  //   const refreshToken = localStorage.getItem('refresh');
  //   const accessToken = localStorage.getItem('access');
  //   console.log(refreshToken);
  //   if (!refreshToken) return;
  //   try {
  //     const { data } = await axios.get(`/api/refresh-token?refreshToken=${refreshToken}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     console.log(data);
  //     onLoginSuccess(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleLogin = async () => {
  //   try {
  //     const { data } = await axios.post(`/api/sign-in?id=${id}&password=${pw}&role=${role}`);
  //     console.log(data);
  //     onLoginSuccess(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleLogout = async () => {
  //   const accessToken = localStorage.getItem('access');
  //   try {
  //     const { data } = await axios.post(
  //       `/api/logout`,
  //       {},
  //       { headers: { Authorization: `Bearer ${accessToken}` } }
  //     );
  //     console.log(data);
  //     localStorage.removeItem('access');
  //     localStorage.removeItem('refresh');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   onSilentRefresh();
  // }, []);

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
      {/* <button onClick={handleLogin}>로그인</button>
      <button onClick={handleLogout}>로그아웃</button> */}
    </div>
  );
};

export default Login;
