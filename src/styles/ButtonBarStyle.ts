import styled from '@emotion/styled';

const ButtonBarLayout = styled.div`
  width: 100%;
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  > div:first-of-type {
    align-self: flex-start;
  }
  > div:last-of-type {
  }
  > input[type='file'] {
    display: none;
  }
  > label {
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
