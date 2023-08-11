import React, { useState } from 'react';
import { ModalStyle } from '../styles/MyStyleCSS';
import CommonButton from './CommonButton';
import { PasswordForm } from '../styles/UserStyle';
import Input from './Input';
import api from '../api/api';
import { useSelector } from 'react-redux';

const ChangePassword = ({ setOpen }) => {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmNewPw, setConfirmNewPw] = useState('');

  const { user } = useSelector(state => state.main);
  let role;

  if (user?.iprofessor) {
    role = 'professor';
  } else if (user?.istudent) {
    role = 'student';
  }

  const handleChangePw = async () => {
    if (newPw !== confirmNewPw) {
      alert('새 비밀번호가 일치하지 않습니다.');
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
        `/api/${role}/changPassword`,
        (role === 'professor' && professorPayload) || (role === 'student' && studentPayload)
      );
    } catch (err) {
      console.log(err);
      alert('현재 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <ModalStyle modalSize="small">
      <div className="modal-box">
        <div className="modal-title-small">
          <div>비밀번호 변경</div>
        </div>
        <div className="modal-contents">
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
        </div>
      </div>
    </ModalStyle>
  );
};

export default ChangePassword;
