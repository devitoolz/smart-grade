import styled from '@emotion/styled';

const LoginLayout = styled.div`
  width: 100%;
  min-width: 1280px;
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
    max-width: 1000px;
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
  background: yellow;
  > div {
    height: 100%;
    width: 100%;
    max-width: 1000px;
    background: red;
  }
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

export { LoginLayout, LoginHeader, LoginContent, LoginFooter };
