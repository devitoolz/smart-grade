import styled from '@emotion/styled';
import { CustomInputProps } from '../types/styles';

const Layout = styled.div`
  width: 100%;
  min-width: 1280px;
  padding-left: 320px;
  padding-top: 70px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CustomInput = styled.div<CustomInputProps>`
  display: flex;
  width: ${({ isForm, length }) =>
    isForm
      ? '100%'
      : length === 'long'
      ? '200px'
      : length === 'middle'
      ? '160px'
      : length === 'short'
      ? '120px'
      : length === 'full'
      ? '100%'
      : length === 'tiny'
      ? '60px'
      : '120px'};
  ${({ isForm }) =>
    isForm
      ? `
    height: 100%;
    border: none;
    background: transparent;
  `
      : `
    height: 35px;
    border: 1px solid var(--primary-border-color);
    background: var(--white);
  `};
  align-items: center;
  position: relative;
  padding: 0 10px;
  &:hover {
    > svg {
      visibility: ${props => (props.value ? 'visible' : 'hidden')};
      opacity: ${props => (props.value ? 1 : 0)};
    }
  }
  > input {
    text-align: ${({ isForm, length }) => (isForm || length === 'tiny' ? 'center' : null)};
    border: none;
    height: 100%;
    width: 100%;
    background: transparent;
    color: var(--black);
    font-size: ${({ isForm, length }) => (isForm || length === 'tiny' ? '16px' : '14px')};
    &::placeholder {
      color: var(--search-ph-color);
    }
  }
  > svg {
    cursor: pointer;
    position: absolute;
    background: ${({ isForm }) => (isForm ? 'var(--form-table-bg-color)' : 'var(--white)')};
    padding-left: 5px;
    ${({ isForm }) => (isForm ? 'padding: 5px' : null)};
    right: 8px;
    font-size: ${({ isForm }) => (isForm ? '18px' : '16px')};
    color: var(--search-ph-color);
    transition: 0.2s all ease-in-out;
    visibility: hidden;
    opacity: 0;
  }
`;

const CustomDropdown = styled.div<CustomInputProps>`
  position: relative;
  width: ${({ isForm, length }) =>
    isForm
      ? '100%'
      : length === 'long'
      ? '200px'
      : length === 'middle'
      ? '160px'
      : length === 'short'
      ? '120px'
      : '120px'};
  ${({ isForm }) =>
    isForm
      ? `
    height: 100%;
    border: none;
    background: transparent;
  `
      : `
  height: 35px;
  border: 1px solid var(--primary-border-color);
  background: var(--white);
  `};
  display: flex;
  align-items: center;
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 10px;
    justify-content: ${({ isForm }) => (isForm ? 'center' : null)};
    align-items: center;
    > input {
      width: ${({ isForm, length }) =>
        isForm
          ? '100%'
          : length === 'long'
          ? 'calc(200px - 12px)'
          : length === 'middle'
          ? 'calc(160px - 12px)'
          : length === 'short'
          ? 'calc(120px - 12px)'
          : 'calc(120px - 12px)'};
      height: 100%;
      ${({ isForm }) => (isForm ? `text-align: center;` : null)};
      font-size: ${({ isForm }) => (isForm ? '16px' : '14px')};
      background: transparent;
      border: none;
      &::placeholder {
        color: var(--search-ph-color);
      }
    }
    > span {
      font-size: ${({ isForm }) => (isForm ? '16px' : '14px')};
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
      position: absolute;
      right: ${({ isForm }) => (isForm ? '10px' : '5px')};
      background: ${({ isForm }) => (isForm ? 'var(--form-table-bg-color)' : 'var(--white)')};
      font-size: ${({ isForm }) => (isForm ? '14px' : '12px')};
      padding: 5px;
      color: var(--search-ph-color);
      transition: 0.2s all ease-in-out;
      &.reset {
        cursor: pointer;
        font-size: ${({ isForm }) => (isForm ? '18px' : '16px')};
        background: ${({ isForm }) => (isForm ? 'var(--form-table-bg-color)' : 'var(--white)')};
        position: absolute;
        right: ${({ isForm }) => (isForm ? '8px' : '3px')};
        visibility: hidden;
        opacity: 0;
      }
    }
  }
  > ul {
    position: absolute;
    z-index: 999;
    width: ${({ isForm }) => (isForm ? '100%' : 'calc(100% + 2px)')};
    max-height: ${props => (props.open ? '200px' : 0)};
    top: ${({ isForm }) => (isForm ? '48px' : '34px')};
    left: ${({ isForm }) => (isForm ? 0 : '-1px')};
    font-size: ${({ isForm }) => (isForm ? '16px' : '14px')};
    transition: 0.2s all ease-in-out;
    overflow: auto;
    border-bottom: ${({ isForm, open }) =>
      isForm
        ? open
          ? '2px solid var(--form-table-even-border-color)'
          : null
        : open
        ? '1px solid var(--primary-border-color)'
        : null};
    > li {
      background: var(--white);
      height: ${({ isForm }) => (isForm ? '50px' : '35px')};
      border: ${({ isForm }) => (isForm ? 'none' : '1px solid var(--primary-border-color)')};
      ${({ isForm }) =>
        isForm
          ? `border-left: 2px solid var(--form-table-even-border-color); border-right: 2px solid var(--form-table-even-border-color);`
          : null};
      border-top: none;
      border-bottom: ${({ isForm }) =>
        isForm ? '2px solid var(--form-table-even-border-color)' : null};
      justify-content: ${({ isForm }) => (isForm ? 'center' : null)};
      padding: 10px;
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
