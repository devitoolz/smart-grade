import styled from '@emotion/styled';

const Layout = styled.div`
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
    color: #fff;
    font-size: 24px;
    padding-bottom: 40px;
  }
  > a {
    color: #fff;
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
  border-bottom: 1px solid var(--main-border-color);
  color: var(--title-txt-color);
  font-size: 30px;
  font-weight: bold;
  padding: 15px 30px;
`;

export { Layout, Sidebar, MainMenu, MainMenuItem, SubMenu, Content, Title };
