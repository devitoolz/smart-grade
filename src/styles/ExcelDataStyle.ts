import styled from '@emotion/styled';
import { ExcelDataStyleProps } from '../types/styles';

const ExcelDataLayout = styled.div<ExcelDataStyleProps>`
  width: 100%;
  height: 338px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  line-height: normal !important;
  div.excel-table-header {
    display: grid;
    height: 50px;
    min-height: 50px;
    grid-template-columns: ${({ template }) => template};
    border-top: 2px solid var(--table-outline-color);
    border-bottom: 2px solid var(--table-outline-color);
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--main-bg-color);
      font-size: 16px;
      font-weight: bold;
      border-right: 1px solid var(--table-border-color);
      &:last-of-type {
        border-right: none;
      }
    }
  }
  div.excel-table-body {
    height: 100%;
    font-size: 14px;
    overflow: auto;
    border-bottom: 2px solid var(--table-outline-color);
    > div.excel-table-content {
      position: relative;
      display: grid;
      grid-template-columns: ${({ template }) => template};
      border-bottom: 1px solid var(--table-border-color);
      &:last-of-type {
        border-bottom: none;
      }
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border-right: 1px solid var(--table-border-color);
        &:last-of-type {
          border-right: none;
        }
      }
      > div.excel-table-content-error {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 0, 0, 0.3);
        backdrop-filter: blur(0.5px);
        > span {
          background: rgba(255, 0, 0, 0.5);
          color: var(--white);
          padding: 3px 10px;
          border-radius: 15px;
          > svg {
            padding-right: 7px;
          }
        }
      }
    }
  }
`;

export { ExcelDataLayout };
