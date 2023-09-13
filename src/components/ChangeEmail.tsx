import React, { useEffect, useState } from 'react';
import { ModalStyle } from '../styles/MyStyleCSS';
import CommonButton from './CommonButton';
import { ChangeEmailProps } from '../types/components';
import { Button, EmailForm, NoticeContainer } from '../styles/UserStyle';
import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import api from '../apis/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { checkValidEmail } from '../modules/regex';

const ChangeEmail = ({ setOpenChangeEmail, setEmail }: ChangeEmailProps) => {
  const [value, setValue] = useState<string>('');
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isEmailAuth, setIsEmailAuth] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.main);

  useEffect(() => {
    if (value === '') {
      setIsEmailSent(false);
      setIsEmailAuth(false);
    }
  }, [value]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9-_.@]/g, ''));
  };

  const handleSendEmail = async () => {
    if (!value) {
      alert('이메일이 입력되지 않았습니다.');
      return;
    } else if (!checkValidEmail(value)) {
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    }

    try {
      await api.post('/api/send-email/check-mail', { mail: value });
      alert('이메일 인증 확인 메일이 발송되었습니다.');
      setIsEmailSent(true);
    } catch {
      alert('이미 등록된 이메일입니다.');
    }
  };

  const handleAuthEmail = async () => {
    try {
      const { data } = await api.get('/api/send-email/email-success');
      if (data) {
        alert('이메일 확인이 완료 되었습니다.');
        setIsEmailAuth(true);
      } else {
        alert('이메일 확인이 되지 않았습니다.');
      }
    } catch {
      alert('Error');
    }
  };

  const handleSubmit = () => {
    if (!isEmailAuth) {
      alert('이메일 인증 확인이 되지 않았습니다.');
      return;
    }
    setEmail(value);
    setOpenChangeEmail(false);
  };

  const handleCancel = () => {
    setOpenChangeEmail(false);
  };

  return (
    <ModalStyle modalSize="small">
      <div className="modal-box" style={{ width: 'auto', height: 'auto' }}>
        <div className="modal-title-small">
          <div>{`E-mail ${user?.profile.email ? '변경' : '등록'}`}</div>
          <button onClick={handleCancel}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>
        <div className="modal-contents">
          <NoticeContainer>
            <span style={{ fontSize: 14, paddingTop: 15, lineHeight: 'normal' }}>
              * 입력 값 초기화 시 다른 E-mail로 인증할 수 있습니다.
            </span>
          </NoticeContainer>
          <EmailForm>
            <Input
              type="text"
              length="long"
              placeholder="E-mail"
              reset={setValue}
              value={value}
              setValue={handleEmailChange}
            />
            <Button onClick={isEmailSent ? handleAuthEmail : handleSendEmail}>
              {isEmailSent ? '확인' : '인증'}
            </Button>
          </EmailForm>
        </div>
        <div className="modal-footer">
          <CommonButton
            value={user?.profile.email ? '변경' : '등록'}
            onClick={handleSubmit}
            btnType="modal"
          />
          <CommonButton value="취소" onClick={handleCancel} btnType="modal" />
        </div>
      </div>
    </ModalStyle>
  );
};

export default ChangeEmail;
