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

const InfoFormTable = styled.div`
  display: grid;
  grid-template: 46px 46px auto / 1fr 1fr;
  width: 100%;
  > div.row {
    display: grid;
    grid-template-columns: 1fr 2fr;
    &.pt-2 {
      padding-top: 2px;
    }
    > div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      text-align: center;
      height: 100%;
      box-sizing: content-box;
      &:nth-of-type(odd) {
        font-weight: bold;
        color: var(--white);
        background: var(--primary-color);
        border-bottom: 2px solid var(--form-table-odd-border-color);
      }
      &:nth-of-type(even) {
        background: var(--form-table-bg-color);
        border-bottom: 2px solid var(--form-table-even-border-color);
      }
      > span {
        color: var(--search-ph-color);
      }
    }
    &.book-img {
      height: 354px;
      grid-row: span 3;
    }
  }
`;

const BookImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 330px;
  overflow: hidden;
  border: 2px solid var(--search-bg-color);
  background: var(--form-table-even-border-color);
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  > div.no-book {
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: var(--search-ph-color);
    > svg {
      font-size: 60px;
    }
  }
`;

const LectureDescription = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  background: transparent;
  font-size: 16px;
  padding: 15px;
  &::placeholder {
    color: var(--search-ph-color);
    text-align: center;
    line-height: 230px;
  }
`;

const RegisterTimetableModal = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  line-height: normal !important;
  font-size: 16px;
  padding: 15px 0;
  > span.notice {
    font-size: 14px;
    color: var(--negative-color);
    padding-left: 15px;
    padding-bottom: 15px;
  }
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

const RegisterScoreModal = styled.div<{ total: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  line-height: normal !important;
  font-size: 16px;
  padding: 15px 20px;
  gap: 20px;
  > div.notice {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    > span:first-of-type {
      color: var(--negative-color);
    }
    > span:last-of-type {
      color: ${({ total }) => (total !== 100 ? 'var(--negative-color)' : null)};
    }
  }
  > div.score-inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    > div.score {
      display: flex;
      align-items: center;
      > span:first-of-type {
        padding-right: 10px;
      }
      > span:last-of-type {
        padding-left: 5px;
      }
    }
  }
`;

export {
  RegisterLayout,
  ButtonContainer,
  InfoFormTable,
  BookImage,
  LectureDescription,
  RegisterTimetableModal,
  RegisterScoreModal,
};
