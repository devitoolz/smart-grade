import styled from '@emotion/styled';

const TableContainer = styled.div`
  width: 100%;
  border-top: 2px solid var(--title-txt-color);
  border-bottom: 2px solid var(--title-txt-color);
  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const TableHead = styled.div`
  display: grid;
  grid-template-columns: ${props => props.template};
  border-bottom: 2px solid var(--title-txt-color);
  background: var(--main-bg-color);
  > div {
    padding: 0 5px;
    text-align: center;
    height: 45px;
    font-weight: bold;
    line-height: 45px;
    border-right: 1px solid var(--table-border-color);
    &:last-of-type {
      border-right: none;
    }
  }
`;

const TableBody = styled.div`
  > div {
    display: grid;
    grid-template-columns: ${props => props.template};
    border-bottom: 1px solid var(--table-border-color);
    &:last-of-type {
      border-bottom: none;
    }
    > div {
      padding: 0 5px;
      text-align: center;
      height: 35px;
      line-height: 35px;
      border-right: 1px solid var(--table-border-color);
      &:last-of-type {
        border-right: none;
      }
    }
  }
`;

const TableNoData = styled.div`
  height: 406px;
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
  padding: 30px;
`;

const PageButton = styled.span`
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

const PrevNextButton = styled.span`
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
  TableContainer,
  TableHead,
  TableBody,
  TableNoData,
  Pagination,
  PageButton,
  PrevNextButton,
};
