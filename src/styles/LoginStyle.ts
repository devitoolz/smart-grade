import styled from '@emotion/styled';
import { RoleButtonProps } from '../types/style';

const LoginLayout = styled.div`
  width: 100%;
  min-width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90px;
  min-height: 90px;
  background: var(--title-txt-color);
  > div {
    display: flex;
    width: 100%;
    max-width: 850px;
    gap: 20px;
    > img {
      height: 60px;
    }
    > span {
      align-self: flex-end;
      color: var(--white);
      font-size: 30px;
      line-height: 30px;
    }
  }
`;

const LoginContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  > div {
    width: 100%;
    max-width: 850px;
  }
`;

const RoleButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RoleButton = styled.label<RoleButtonProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 250px;
  border: 1.5px solid
    ${({ checked }) => (checked ? 'var(--title-txt-color)' : 'var(--primary-color)')};
  border-radius: 15px;
  box-shadow: ${({ checked }) => (checked ? '0px 0px 8px -2px var(--title-txt-color)' : null)};
  > div.role-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    > input[type='radio'] {
      position: relative;
      align-self: flex-end;
      width: 32px;
      height: 32px;
      margin-right: 10px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background: var(--form-table-bg-color);
      border: 1px solid
        ${({ checked }) => (checked ? 'var(--title-txt-color)' : 'var(--primary-color)')};
      border-radius: 50%;
      &::after {
        content: '';
        display: block;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--title-txt-color);
        opacity: 0;
      }
      &:checked::after {
        opacity: 1;
      }
    }
    > span {
      padding-top: 15px;
      font-size: 22px;
    }
  }
  > div.role-img {
    text-align: center;
    > img {
      height: ${({ imgHeight }) => imgHeight + 'px'};
    }
  }
`;

const LoginForm = styled.div`
  display: flex;
  width: 100%;
  max-width: 850px;
  height: 200px;
  border: 1.5px solid var(--primary-color);
  border-radius: 12px;
  padding: 30px;
`;

const LoginInput = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 35px;
  > div {
    display: flex;
    align-items: center;
    > label {
      width: 30%;
      font-size: 20px;
      padding-left: 10px;
    }
    > input {
      width: 100%;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      border: 1px solid var(--primary-color);
      border-radius: 3px;
    }
  }
`;

const FindLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  padding-left: 50px;
`;

const FindAccountForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ role }) => (role === 'ROLE_ADMIN' ? 'hidden' : null)};
  color: var(--button-bar-txt-color);
  gap: 5px;
  > span:not(:nth-of-type(2)) {
    cursor: pointer;
  }
`;

const LoginBtn = styled.span`
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 40px;
  color: var(--white);
  font-size: 20px;
  background: var(--primary-color);
  border-radius: 8px;
`;

const LoginFooter = styled.div`
  width: 100%;
  height: 160px;
  min-height: 160px;
  background: var(--search-bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > img {
    height: 40px;
  }
  > span {
    font-weight: bold;
    font-size: 10px;
    color: var(--title-txt-color);
    padding-top: 5px;
  }
  > div.copyright {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding-top: 10px;
    font-size: 12px;
    color: var(--button-bar-txt-color);
  }
`;

export {
  LoginLayout,
  LoginHeader,
  LoginContent,
  RoleButtonContainer,
  RoleButton,
  LoginForm,
  LoginInput,
  FindLogin,
  FindAccountForm,
  LoginBtn,
  LoginFooter,
};
