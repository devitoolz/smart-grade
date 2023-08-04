import React, { useState } from 'react';
import Input from '../components/Input';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = async () => {
    console.log(id, pw);
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
    </div>
  );
};

export default Login;
