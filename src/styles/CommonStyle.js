import styled from '@emotion/styled';

const CustomInput = styled.input`
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
  ::placeholder {
    color: var(--search-ph-color);
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
      : 'auto'};
  height: 35px;
  padding: 10px;
  font-size: 14px;
  background: var(--white);
  display: flex;
  align-items: center;
  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      &.placeholder {
        color: var(--search-ph-color);
      }
    }
    > svg {
      font-size: 12px;
      transition: 0.2s all ease-in-out;
    }
  }
  > ul {
    position: absolute;
    height: ${props => (props.open ? `${props.dataLength * 35}px` : 0)};
    top: 34px;
    left: -1px;
    transition: 0.2s all ease-in-out;
    overflow: hidden;
    > li {
      background: var(--white);
      width: ${({ length }) =>
        length === 'long'
          ? '180px'
          : length === 'middle'
          ? '140px'
          : length === 'short'
          ? '100px'
          : 'auto'};
      height: 35px;
      border: 1px solid var(--primary-border-color);
      border-top: none;
      padding: 10px;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
  }
`;

export { CustomInput, CustomDropdown };
