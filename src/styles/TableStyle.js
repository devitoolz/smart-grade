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
    height: 35px;
    line-height: 35px;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;

export { TableContainer, TableHead, TableBody, Pagination };
