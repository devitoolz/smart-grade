import styled from '@emotion/styled';
import { ButtonBarLayoutProps } from '../types/styles';

const ButtonBarLayout = styled.div<ButtonBarLayoutProps>`
  width: 100%;
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: ${({ between }) => (between ? 'space-between' : 'flex-end')};
  gap: 10px;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  input[type='file'] {
    display: none;
  }
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    padding: 0 20px;
    height: 35px;
    color: var(--button-bar-txt-color);
    background: var(--main-bg-color);
  }
`;

const Button = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  padding: 0 20px;
  height: 35px;
  color: var(--button-bar-txt-color);
  background: var(--main-bg-color);
`;

export { ButtonBarLayout, Button };
