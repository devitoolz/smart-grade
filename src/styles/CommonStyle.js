import styled from '@emotion/styled';

const Layout = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
  flex-direction: column;
`;

const CustomInput = styled.div`
  display: flex;
  border: 1px solid var(--primary-border-color);
  background: var(--white);
  align-items: center;
  position: relative;
  width: ${({ length }) =>
    length === 'long'
      ? '200px'
      : length === 'middle'
      ? '160px'
      : length === 'short'
      ? '120px'
      : '120px'};
  height: 35px;
  padding: 0 10px;
  &:hover {
    > svg {
      visibility: ${props => (props.value ? 'visible' : 'hidden')};
      opacity: ${props => (props.value ? 1 : 0)};
    }
  }
  > input {
    border: none;
    height: 100%;
    width: 100%;
    font-size: 14px;
    &::placeholder {
      color: var(--search-ph-color);
    }
  }
  > svg {
    cursor: pointer;
    position: absolute;
    background: var(--white);
    padding-left: 5px;
    right: 8px;
    font-size: 16px;
    color: var(--search-ph-color);
    transition: 0.2s all ease-in-out;
    visibility: hidden;
    opacity: 0;
  }
`;

const CustomDropdown = styled.div`
  position: relative;
  border: 1px solid var(--primary-border-color);
  width: ${({ length }) =>
    length === 'long'
      ? '200px'
      : length === 'middle'
      ? '160px'
      : length === 'short'
      ? '120px'
      : '120px'};
  height: 35px;
  font-size: 14px;
  background: var(--white);
  display: flex;
  align-items: center;
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    > input {
      width: ${({ length }) =>
        length === 'long'
          ? 'calc(200px - 12px - 27px)'
          : length === 'middle'
          ? 'calc(160px - 12px - 27px)'
          : length === 'short'
          ? 'calc(120px - 12px - 27px)'
          : 'calc(120px - 12px - 27px)'};
      height: 100%;
      font-size: 14px;
      background: var(--white);
      border: none;
      &::placeholder {
        color: var(--search-ph-color);
      }
    }
    > span {
      &.placeholder {
        color: var(--search-ph-color);
      }
    }
    &:hover {
      svg.reset {
        visibility: ${props => (props.value ? 'visible' : 'hidden')};
        opacity: ${props => (props.value ? 1 : 0)};
      }
    }
    > svg {
      font-size: 12px;
      color: var(--search-ph-color);
      transition: 0.2s all ease-in-out;
      &.reset {
        cursor: pointer;
        font-size: 16px;
        padding-left: 5px;
        background: var(--white);
        position: absolute;
        right: 8px;
        visibility: hidden;
        opacity: 0;
      }
    }
  }
  > ul {
    position: absolute;
    max-height: ${props => (props.open ? '330px' : 0)};
    top: 34px;
    left: -1px;
    transition: 0.2s all ease-in-out;
    overflow: auto;
    border-bottom: ${props => (props.open ? '1px solid var(--primary-border-color)' : null)};
    > li {
      background: var(--white);
      width: ${({ length }) =>
        length === 'long'
          ? '200px'
          : length === 'middle'
          ? '160px'
          : length === 'short'
          ? '120px'
          : '120px'};
      height: 35px;
      border: 1px solid var(--primary-border-color);
      border-top: none;
      padding: 10px;
      font-size: 14px;
      display: flex;
      align-items: center;
      &.active {
        background: var(--main-bg-color);
      }
      &:last-of-type {
        border-bottom: ${props => (props.open ? 'none' : null)};
      }
      &.data-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: auto;
        padding-top: 30px;
        padding-bottom: 30px;
        > svg {
          font-size: 30px;
          color: red;
          padding-bottom: 10px;
        }
      }
    }
  }
`;

export { Layout, CustomInput, CustomDropdown };
