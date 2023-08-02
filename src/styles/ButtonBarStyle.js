import styled from '@emotion/styled';

const ButtonBarLayout = styled.div`
  width: 100%;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
`;

const Button = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  padding: 0 25px;
  height: 35px;
  background: var(--main-bg-color);
`;

export { ButtonBarLayout, Button };
