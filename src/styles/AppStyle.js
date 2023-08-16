import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const light = css`
  :root {
    --main-bg-color: #dff6ff;
    --main-border-color: rgba(41, 49, 65, 0.2);
    --side-bg-color: #293141;
    --title-txt-color: #1363df;
    --primary-color: #47b5ff;
    --primary-border-color: #cacaca;
    --negative-color: #ff6b6b;
    --table-border-color: #dae8ff;
    --form-table-bg-color: #f8f8f8;
    --form-table-odd-border-color: #61bfff;
    --form-table-even-border-color: #f2f2f2;
    --search-bg-color: #d9d9d9;
    --search-ph-color: #a6a6a6;
    --white: #fff;
    --black: #000;
    --button-bar-txt-color: #7e7e7e;
  }
`;

const dark = css`
  :root {
  }
`;

const GlobalLayout = ({ isDark }) => {
  return <Global styles={isDark ? dark : light} />;
};

const MainLayout = styled.div`
  display: flex;
  height: 100%;
`;

const Sidebar = styled.div`
  display: flex;
  position: fixed;
  z-index: 99;
  height: 100%;
`;

const MainMenu = styled.ul`
  background: var(--main-bg-color);
  > li:nth-of-type(${props => props.activeIndex}) {
    background: var(--side-bg-color);
    color: var(--main-bg-color);
  }
`;

const MainMenuItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-bottom: 1px solid var(--main-border-color);
  color: var(--side-bg-color);
  cursor: pointer;
  &:last-of-type {
    border-bottom: none;
  }
  > svg {
    font-size: 28px;
  }
  > span {
    font-size: 12px;
    padding-top: 10px;
  }
`;

const SubMenu = styled.ul`
  display: flex;
  flex-direction: column;
  background: var(--side-bg-color);
  width: 240px;
  padding-top: 30px;
  padding-left: 40px;
  > span {
    color: var(--white);
    font-size: 26px;
    padding-bottom: 40px;
  }
  > a {
    color: var(--white);
    font-size: 18px;
    padding-bottom: 20px;
    &.active {
      font-weight: bold;
    }
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--side-bg-color);
  width: 320px;
`;

const MenuLogo = styled.div`
  display: flex;
  width: 320px;
  height: 70px;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border-bottom: 1px solid var(--main-border-color);
  border-right: 1px solid var(--main-border-color);
  > img {
    height: 32px;
  }
  > span {
    color: var(--title-txt-color);
    padding-left: 5px;
    font-size: 32px;
    font-weight: bold;
    letter-spacing: -2px;
  }
`;

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-top: 70px;
`;

const MenuContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  > a {
    display: flex;
    align-items: center;
    color: var(--white);
    padding: 15px;
    font-size: 18px;
    &.active {
      font-weight: bold;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
    }
    > svg {
      width: 25px;
      font-size: 20px;
    }
    > span {
      padding-left: 15px;
    }
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
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
    color: var(--search-ph-color);
  }
`;

const Content = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  background: var(--white);
  border-bottom: 1px solid var(--main-border-color);
  color: var(--title-txt-color);
  font-size: 30px;
  font-weight: bold;
  padding-left: calc(20px + 320px);
  z-index: 9;
  > div.title {
    display: flex;
    align-items: center;
    > span:first-of-type {
      padding: 5px;
      transition: all 0.2s ease-in-out;
      &.breadcrumb:hover {
        cursor: pointer;
        background: var(--main-bg-color);
        border-radius: 5px;
      }
    }
    > svg {
      font-size: 20px;
      padding: 0 10px 0 5px;
    }
  }
  > div.user-info {
    display: flex;
    align-items: center;
    padding-right: 20px;
    gap: 10px;
    > div.user-info-pic {
      background: var(--search-bg-color);
      overflow: hidden;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      > svg {
        align-self: flex-end;
        font-size: 32px;
        color: var(--search-ph-color);
      }
    }
    > span {
      font-size: 18px;
      font-weight: normal;
      color: black;
    }
    > svg {
      cursor: pointer;
      font-size: 38px;
      padding-left: 10px;
    }
  }
`;

export {
  light,
  dark,
  GlobalLayout,
  MainLayout,
  Sidebar,
  MainMenu,
  MainMenuItem,
  SubMenu,
  Menu,
  MenuLogo,
  MenuContent,
  MenuContainer,
  Footer,
  Content,
  Title,
};
