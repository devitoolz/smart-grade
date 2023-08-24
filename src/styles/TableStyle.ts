import styled from '@emotion/styled';
import { TableStyleProps } from '../types/styles';

const TableLayout = styled.div`
  width: 100%;
  height: 470px;
  overflow: auto;
`;

const TableContainer = styled.div`
  width: 100%;
  border-top: 2px solid var(--table-outline-color);
  border-bottom: 2px solid var(--table-outline-color);
  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const TableHead = styled.div<TableStyleProps>`
  display: grid;
  grid-template-columns: ${props => props.template};
  border-bottom: 2px solid var(--table-outline-color);
  background: var(--main-bg-color);
  > div {
    padding: 0 5px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    border-right: 1px solid var(--table-border-color);
    &:last-of-type {
      border-right: none;
    }
  }
`;

const TableBody = styled.div<TableStyleProps>`
  position: relative;
  > div {
    display: grid;
    grid-template-columns: ${props => props.template};
    border-bottom: 1px solid var(--table-border-color);
    &:last-of-type {
      border-bottom: none;
    }
    > div {
      padding: 0 5px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid var(--table-border-color);
      &:last-of-type {
        border-right: none;
      }
    }
  }
  > div.table-loading {
    position: absolute;
    border: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--main-border-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    > span {
      font-size: 16px;
    }
  }
`;

const TableNoData = styled.div`
  height: 359px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > svg {
    font-size: 60px;
    color: red;
    padding-bottom: 20px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;

const PageButton = styled.span<TableStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 16px;
  background: ${({ isCurrent }) => (isCurrent ? 'var(--main-bg-color)' : null)};
  cursor: ${({ isCurrent }) => (!isCurrent ? 'pointer' : null)};
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
`;

const PrevNextButton = styled.span<TableStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  opacity: ${({ isFirst, isLast }) => (isFirst || isLast ? 0 : 0.3)};
  visibility: ${({ isFirst, isLast }) => (isFirst || isLast ? 'hidden' : 'visible')};
  transition: all 0.2s ease-in-out;
  &:hover {
    opacity: ${({ isFirst, isLast }) => (isFirst || isLast ? 0 : 1)};
  }
`;

export {
  TableLayout,
  TableContainer,
  TableHead,
  TableBody,
  TableNoData,
  Pagination,
  PageButton,
  PrevNextButton,
};
