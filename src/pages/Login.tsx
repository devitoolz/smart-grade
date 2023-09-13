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
import FindPassword from '../components/FindPassword';
import { LoginData, LoginResult } from '../types/apis';
import api from '../apis/api';

const Login = () => {
  const initialState = {
    id: '',
    password: '',
    role: 'ROLE_PROFESSOR',
  };

  const [payload, setPayload] = useState<LoginData>(initialState);
  const [openOTP, setOpenOTP] = useState<boolean>(false);
  const [openFindPw, setOpenFindPw] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, role: e.target.value });
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, id: e.target.value });
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, password: e.target.value });
  };

  const handleLogin = async () => {
    for (let key in payload) {
      if (payload[key] === '') {
        alert('입력되지 않은 값이 있습니다.');
        console.log(key);
        return;
      }
    }

    try {
      const { data } = await api.post<LoginResult>(`/api/sign-in`, payload);

      if (!data.success) {
        throw Error('틀린 비번');
      }

      if (data.secretKey) {
        setOpenOTP(true);
      } else {
        data.accessToken && setCookie('accessToken', data.accessToken);
        data.refreshToken && setCookie('refreshToken', data.refreshToken);
        if (payload.role === 'ROLE_ADMIN') {
          navigate(`${payload.role.toLowerCase().replace('role_', '')}`);
        } else {
          alert('최초 로그인입니다. 마이 페이지로 이동하여 정보 수정 후 OTP 등록을 진행해주세요.');
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
              <FindAccountForm role={payload.role}>
                <span>ID 찾기</span>
                <span>|</span>
                <span onClick={() => setOpenFindPw(true)}>PW 찾기</span>
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
      {openOTP && <OTPAuth payload={payload} setOpenOTP={setOpenOTP} />}
      {openFindPw && <FindPassword setOpenFindPw={setOpenFindPw} payload={payload} />}
    </>
  );
};

export default Login;
