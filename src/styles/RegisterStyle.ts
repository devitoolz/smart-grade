import styled from '@emotion/styled';

const RegisterLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

const ProfessorRegisterModal = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal !important;
  font-size: 16px;
  padding: 15px 0;
  > div.timetable-help {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;
    gap: 25px;
    font-size: 14px;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      > div {
        width: 40px;
        height: 25px;
        border: 1px solid var(--table-border-color);
        &.selected {
          background: var(--primary-color);
        }
        &.disabled {
          background: var(--primary-border-color);
        }
        &.already-used {
          background: var(--negative-color);
        }
      }
    }
  }
  > div.timetable-header {
    display: grid;
    height: 45px;
    grid-template-columns: 120px repeat(5, 100px);
    border-top: 2px solid var(--table-outline-color);
    border-bottom: 2px solid var(--table-outline-color);
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--main-bg-color);
      border-right: 1px solid var(--table-border-color);
      font-weight: bold;
      &:first-of-type {
        border-right: 2px solid var(--table-outline-color);
      }
      &:last-of-type {
        border-right: none;
      }
    }
  }
  > div.timetable-content {
    display: flex;
    border-bottom: 2px solid var(--table-outline-color);
    > div.timetable-time {
      display: grid;
      width: 120px;
      grid-template-rows: repeat(9, 60px);
      border-right: 2px solid var(--table-outline-color);
      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        border-bottom: 1px solid var(--table-border-color);
        &:last-of-type {
          border-bottom: none;
        }
        > span:last-of-type {
          font-size: 14px;
        }
      }
    }
    > div.timetable-btns {
      display: grid;
      grid-template: repeat(9, 60px) / repeat(5, 100px);
      > button {
        border: none;
        border-right: 1px solid var(--table-border-color);
        border-bottom: 1px solid var(--table-border-color);
        background: white;
        width: 100%;
        height: 100%;
        &:nth-of-type(5n) {
          border-right: none;
        }
        &:nth-of-type(n + 41) {
          border-bottom: none;
        }
        &:active {
          background: var(--main-bg-color);
        }
        &:disabled {
          background: var(--primary-border-color);
        }
        &.selected {
          background: var(--primary-color);
        }
        &.already-used {
          background: var(--negative-color);
        }
      }
    }
  }
`;

export { RegisterLayout, ButtonContainer, ProfessorRegisterModal };
