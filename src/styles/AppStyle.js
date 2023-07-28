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
    --search-bg-color: #d9d9d9;
    --search-ph-color: #a6a6a6;
    --white: #fff;
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
    font-size: 24px;
    padding-bottom: 40px;
  }
  > a {
    color: var(--white);
    font-size: 16px;
    padding-bottom: 20px;
    &.active {
      font-weight: bold;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  height: 70px;
  align-items: center;
  border-bottom: 1px solid var(--main-border-color);
  color: var(--title-txt-color);
  font-size: 30px;
  font-weight: bold;
  padding-left: 30px;
`;

export { GlobalLayout, MainLayout, Sidebar, MainMenu, MainMenuItem, SubMenu, Content, Title };
