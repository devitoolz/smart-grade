import React, { useState } from 'react';
import { ModalStyle } from '../styles/MyStyleCSS';
import CommonButton from './CommonButton';
import { NoticeContainer, PasswordForm } from '../styles/UserStyle';
import Input from './Input';
import api from '../apis/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ChangePasswordProps } from '../types/components';

const ChangePassword = ({ setOpenChangePassword, setOpenOTPRegister }: ChangePasswordProps) => {
  const [currentPw, setCurrentPw] = useState<string>('');
  const [newPw, setNewPw] = useState<string>('');
  const [confirmNewPw, setConfirmNewPw] = useState<string>('');

  const { user } = useSelector((state: RootState) => state.main);
  let role: string;

  if (user && 'iprofessor' in user.profile) {
    role = 'professor';
  } else if (user && 'studentNum' in user.profile) {
    role = 'student';
  }

  const handleChangePw = async () => {
    if (!(currentPw && newPw && confirmNewPw)) {
      alert('입력되지 않은 값이 있습니다.');
      return;
    }

    if (newPw !== confirmNewPw) {
      alert('새 비밀번호가 일치하지 않습니다.');
      setConfirmNewPw('');
      return;
    }

    const professorPayload = {
      professorPassword: newPw,
      currentProfessorPassword: currentPw,
    };

    const studentPayload = {
      studentPassword: newPw,
      currentStudentPassword: currentPw,
    };

    try {
      await api.put(
        `/api/${role}/chang-password`,
        (role === 'professor' && professorPayload) || (role === 'student' && studentPayload)
      );
      alert('비밀번호가 변경되었습니다.');
      setOpenChangePassword(false);

      if (user?.profile.secretKey !== 'true') {
        setOpenOTPRegister(true);
      }
    } catch (err) {
      console.log(err);
      alert('현재 비밀번호가 올바르지 않습니다.');
      setCurrentPw('');
    }
  };

  return (
    <ModalStyle modalSize="small">
      <div className="modal-box" style={{ height: 310 }}>
        <div className="modal-title-small">
          <div>비밀번호 변경</div>
        </div>
        <div className="modal-contents">
          {user?.profile.secretKey !== 'true' && (
            <NoticeContainer>
              <span
                style={{ fontSize: 14, lineHeight: 'normal', paddingTop: 0, paddingBottom: 15 }}
              >
                * 초기 비밀번호는 변경 전까지 생년월일 8자리입니다.
              </span>
            </NoticeContainer>
          )}
          <PasswordForm>
            <label>현재 비밀번호</label>
            <Input
              type="password"
              length="long"
              placeholder="현재 비밀번호"
              reset={setCurrentPw}
              value={currentPw}
              setValue={e => setCurrentPw(e.target.value)}
            />
            <label>새 비밀번호</label>
            <Input
              type="password"
              length="long"
              placeholder="변경할 비밀번호"
              reset={setNewPw}
              value={newPw}
              setValue={e => setNewPw(e.target.value)}
            />
            <label>새 비밀번호 확인</label>
            <Input
              type="password"
              length="long"
              placeholder="변경할 비밀번호 확인"
              reset={setConfirmNewPw}
              value={confirmNewPw}
              setValue={e => setConfirmNewPw(e.target.value)}
            />
          </PasswordForm>
        </div>
        <div className="modal-footer">
          <CommonButton value="확인" onClick={handleChangePw} btnType="modal" />
          {user?.profile.secretKey === 'true' && (
            <CommonButton
              value="취소"
              onClick={() => setOpenChangePassword(false)}
              btnType="modal"
            />
          )}
        </div>
      </div>
    </ModalStyle>
  );
};

export default ChangePassword;
