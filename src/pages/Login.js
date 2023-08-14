import React, { useState } from 'react';
import { setCookie } from '../modules/cookies';
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
import OTPAuth from '../components/OTPAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FindPassword from '../components/FindPassword';

const Login = () => {
  const initialState = {
    id: '',
    password: '',
    role: 'ROLE_PROFESSOR',
  };
  const [payload, setPayload] = useState(initialState);
  const [openOTP, setOpenOTP] = useState(false);
  const [openFindPw, setOpenFindPw] = useState(false);

  const navigate = useNavigate();

  const handleRoleChange = e => {
    setPayload({ ...payload, role: e.target.value });
  };

  const handleIdChange = e => {
    setPayload({ ...payload, id: e.target.value });
  };

  const handlePwChange = e => {
    setPayload({ ...payload, password: e.target.value });
  };

  const handleLogin = async () => {
    for (let key in payload) {
      if (payload[key] === '') {
        alert('입력되지 않은 값이 있습니다.');
        return;
      }
    }

    try {
      const { data } = await axios.post(`/api/sign-in`, payload);
      console.log(data);

      if (!data.success) {
        throw Error('틀린 비번');
      }

      if (data.secretKey) {
        setOpenOTP(true);
      } else {
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken);
        if (payload.role === 'ROLE_ADMIN') {
          navigate(`/${payload.role.toLowerCase().replace('role_', '')}`, { state: payload.id });
        } else {
          console.log('최초 로그인');
          navigate(`${payload.role.toLowerCase().replace('role_', '')}/mypage`);
        }
      }
    } catch (err) {
      alert('존재하지 않는 계정입니다.');
    }
  };

  return (
    <>
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
              img={payload.role === 'ROLE_PROFESSOR' ? professorActiveImg : professorImg}
              imgHeight={130}
              text="교수"
              value="ROLE_PROFESSOR"
              checked={payload.role === 'ROLE_PROFESSOR'}
              onChange={handleRoleChange}
            />
            <RoleRadioButton
              img={payload.role === 'ROLE_STUDENT' ? studentActiveImg : studentImg}
              imgHeight={120}
              text="재학생 / 졸업생"
              value="ROLE_STUDENT"
              checked={payload.role === 'ROLE_STUDENT'}
              onChange={handleRoleChange}
            />
            <RoleRadioButton
              img={payload.role === 'ROLE_ADMIN' ? adminActiveImg : adminImg}
              imgHeight={110}
              text="직원"
              value="ROLE_ADMIN"
              checked={payload.role === 'ROLE_ADMIN'}
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
                  value={payload.id}
                  onChange={handleIdChange}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="password">비밀번호</label>
                <input
                  id="password"
                  type="password"
                  value={payload.password}
                  onChange={handlePwChange}
                  autoComplete="off"
                />
              </div>
            </LoginInput>
            <FindLogin>
              <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
              {payload.role !== 'ROLE_ADMIN' && (
                <FindAccountForm>
                  <span>아이디 찾기</span>
                  <span onClick={() => setOpenFindPw(true)}>비밀번호 찾기</span>
                </FindAccountForm>
              )}
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
      {openOTP && <OTPAuth payload={payload} setOpenOTP={setOpenOTP} />}
      {openFindPw && <FindPassword setOpenFindPw={setOpenFindPw} payload={payload} />}
    </>
  );
};

export default Login;
