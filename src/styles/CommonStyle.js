import styled from '@emotion/styled';

const CustomInput = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  &:hover {
    > svg {
      visibility: ${props => (props.value ? 'visible' : 'hidden')};
      opacity: ${props => (props.value ? 1 : 0)};
    }
  }
  > input {
    border: 1px solid var(--primary-border-color);
    width: ${({ length }) =>
      length === 'long'
        ? '180px'
        : length === 'middle'
        ? '140px'
        : length === 'short'
        ? '100px'
        : 'auto'};
    height: 35px;
    padding: 10px;
    font-size: 14px;
    background: var(--white);
    &::placeholder {
      color: var(--search-ph-color);
    }
  }
  > svg {
    cursor: pointer;
    position: absolute;
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
      ? '180px'
      : length === 'middle'
      ? '140px'
      : length === 'short'
      ? '100px'
      : '100px'};
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
          ? 'calc(180px - 12px - 32px)'
          : length === 'middle'
          ? 'calc(140px - 12px - 32px)'
          : length === 'short'
          ? 'calc(100px - 12px - 32px)'
          : 'calc(100px - 12px -32px)'};
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
          ? '180px'
          : length === 'middle'
          ? '140px'
          : length === 'short'
          ? '100px'
          : '100px'};
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

const Layout = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
  flex-direction: column;
`;

export { CustomInput, CustomDropdown, Layout };
