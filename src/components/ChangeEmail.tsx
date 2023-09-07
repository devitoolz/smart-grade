import React, { useState } from 'react';
import { ModalStyle } from '../styles/MyStyleCSS';
import CommonButton from './CommonButton';
import { ChangeEmailProps } from '../types/components';
import { EmailForm } from '../styles/UserStyle';
import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import api from '../apis/api';

const ChangeEmail = ({ setOpenChangeEmail, setEmail }: ChangeEmailProps) => {
  const [value, setValue] = useState<string>('');
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const handleAuthEmail = async () => {
    try {
      await api.post('/api/send-email/check-mail', { mail: value });
      setIsAuth(true);
    } catch {
      alert('이미 등록된 이메일입니다.');
    }
  };

  const handleSubmit = () => {};

  const handleCancel = () => {
    setOpenChangeEmail(false);
  };

  return (
    <ModalStyle modalSize="small">
      <div className="modal-box" style={{ width: 'auto', height: 'auto' }}>
        <div className="modal-title-small">
          <div>E-mail 등록 / 변경</div>
          <button onClick={handleCancel}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>
        <div className="modal-contents">
          <EmailForm>
            <label>E-mail</label>
            <Input
              type="text"
              length="long"
              placeholder="E-mail"
              reset={setValue}
              value={value}
              setValue={e => setValue(e.target.value)}
            />
          </EmailForm>
        </div>
        <div className="modal-footer">
          <CommonButton
            value={isAuth ? '확인' : '인증'}
            onClick={isAuth ? () => alert('확인') : handleAuthEmail}
            btnType="modal"
          />
          <CommonButton value="취소" onClick={handleCancel} btnType="modal" />
        </div>
      </div>
    </ModalStyle>
  );
};

export default ChangeEmail;
