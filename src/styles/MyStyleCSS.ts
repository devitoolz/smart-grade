import styled from '@emotion/styled';
import { CommonBtnProps, CustomInputProps, ModalStyleProps } from '../types/styles';

export const ScoreProgressBar = styled.div`
  width: 80%;
  height: 5px;
  margin: 0 auto;
  background-color: var(--primary-color);
  background-color: var(--form-table-even-border-color);
`;

export const TableArea = styled.div`
  width: 100%;
  .table {
    width: 100%;
    border-top: 2px solid var(--table-outline-color);
    text-align: center;
    border-collapse: collapse;
    .table_head,
    .table_body > div {
      display: grid;
      grid-template-columns: 0.8fr 1.5fr 3fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
    .table_head {
      height: 45px;
      background-color: var(--main-bg-color);
      div {
        height: 45px;
        line-height: 45px;
        font-weight: 700;
        border-right: 1px solid var(--table-border-color);
      }
    }
    .table_body {
      border-top: 2px solid var(--table-outline-color);
      border-bottom: 2px solid var(--table-outline-color);
      /* height: 100vh; */
      height: 500px;
      /* min-height: 420px; */
      .table_body_item {
        border-bottom: 1px solid var(--table-border-color);
        div {
          padding: 0 5px;
          text-align: center;
          height: 40px;
          line-height: 40px;
          border-right: 1px solid var(--table-border-color);
        }
      }
      /* 스크롤바 */
      overflow-y: auto;
      /* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none; /* 인터넷 익스플로러 */
      scrollbar-width: none; /* 파이어폭스 */
    }
  }
`;
export const TableMini = styled.div`
  width: 50%;
  text-align: center;
  border-top: 1px solid var(--title-txt-color);
  .table-head-m,
  .table-body-m > div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    height: 33px;
    line-height: 33px;
  }
  .table-head-m {
    height: 36px;
    line-height: 36px;
  }
  .table-head-m > div,
  .table-body-m > div > div {
    border-right: 1px solid var(--table-border-color);
    border-bottom: 1px solid var(--table-border-color);
    &:last-of-type {
      border-right: none;
    }
  }
  .table-head-m {
    background-color: var(--main-bg-color);
  }
`;
export const StudentInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* 스크롤바 */
  overflow-y: auto;
  // 커스텀
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: rgb(193, 193, 193); /* 스크롤바의 색상 */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: rgb(241, 241, 241); /*스크롤바 뒷 배경 색상*/
  }
`;
export const SearchArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 96px;
  margin: 72px 0;
  background-color: var(--search-bg-color);
  .search-option {
    height: 32px;
  }
  button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
export const IsClosed = styled.div`
  height: 100%;
  padding: 32px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  p {
    font-size: 32px;
  }
  div {
    mark {
      display: inline-block;
    }
    text-align: center;
    font-size: 24px;
    padding: 10px 50px;
  }
`;

export const LectureContainer = styled.div`
  width: 100%;
`;

export const NoData = styled.div`
  width: 100%;
  height: calc(37px + 6vh + 500px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 60px;
  font-size: 80px;
  line-height: 80px;
  color: gray;
  p:first-of-type {
    font-size: 180px;
    line-height: 180px;
  }
`;
export const NoDatas = styled.div`
  width: 100%;
  height: calc(37px + 6vh);
  background-color: transparent;
`;

// textarea
export const TextArea = styled.textarea<CustomInputProps>`
  resize: none;

  display: flex;
  border: 1px solid var(--primary-border-color);
  background: var(--white);
  align-items: center;
  position: relative;
  width: ${({ length }) => (length === 'full' ? '100%' : '70%')};
  height: ${({ length }) => (length === 'full' ? '500px' : '50%')};
  padding: ${({ length }) => (length === 'full' ? '10px' : '0 5px')};
  line-height: 1.2;
  font-size: ${({ length }) => (length === 'full' ? '18px' : '16px')};
  font-family: 'Pretendard', sans-serif;
`;

// 공통 모달
export const ModalStyle = styled.div<ModalStyleProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 23, 60, 0.7);
  z-index: 999;
  overflow: hidden;
  .modal-box {
    width: ${({ modalSize }) => (modalSize === 'small' ? '400px' : '1024px')};
    /* min-width: ${({ modalSize }) => (modalSize === 'small' ? '480px' : '800px')}; */
    height: ${({ modalSize }) => (modalSize === 'small' ? '250px' : '70%')};
    background-color: var(--white);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .modal-title-small,
    .modal-title {
      width: 100%;
      height: ${({ modalSize }) => (modalSize === 'big' ? '10%' : '48px')};
      min-height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 22px;
      font-weight: 700;

      padding: 0 20px;
      border-bottom: 1px solid var(--table-border-color);
      button {
        font-size: 18px;
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
    }
    .modal-title {
      font-size: 27px;
      border-bottom-color: ${({ modalSize }) => (modalSize === 'big' ? 'transparent' : '')};
    }
    .modal-contents {
      position: relative;
      overflow: auto;
      padding: ${({ modalSize }) => (modalSize === 'big' ? '0 0 10px' : null)};
      width: 100%;
      height: ${({ modalSize }) => (modalSize === 'big' ? '90%' : '100%')};
      ${({ modalSize }) =>
        modalSize === 'small'
          ? `display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;`
          : null};
      font-size: ${({ modalSize }) => (modalSize === 'big' ? null : '18px')};

      .procedure {
        margin-bottom: 10px;
      }
      & > * {
        line-height: 2;
      }
    }
    .modal-footer {
      display: ${({ modalSize }) => (modalSize === 'big' ? 'none' : 'flex')};
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 58px;
      min-height: 58px;
      text-align: center;
      button {
        margin: 6px 20px;
        padding: 7px 21px;
        font-size: 16px;
      }
    }
  }
`;

// 공통 버튼
const pageBtn = `
  padding: 8px 18px;
  border-radius: 5px;
  color: var(--button-bar-txt-color);
  font-size: 16px;
`;
const tableBtn = `
  margin: 0 4px;
  padding: 4px 8px;
  border-radius: 3px;
  color: var(--white);
  font-size: 12px;
`;
const modalBtn = `
  margin: 2px 8px;
  padding: 6px 24px;
  border-radius: 5px;
  color: var(--button-bar-txt-color);
  font-size: 18px;
`;
export const CommonBtn = styled.button<CommonBtnProps>`
  display: ${({ onClick }) => (onClick ? 'block' : 'none')};
  ${({ btnType }) => (btnType === 'page' ? pageBtn : btnType === 'modal' ? modalBtn : tableBtn)};
  background-color: ${({ color }) =>
    color === 'gray'
      ? '#C0C3C6'
      : color === 'blue'
      ? 'var(--primary-color)'
      : color === 'red'
      ? 'var(--negative-color)'
      : 'var(--main-bg-color)'};

  border: none;
  color: ${({ textColor }) =>
    textColor === 'white' ? 'var(--white)' : 'var(--button-bar-txt-color)'};
  color: ${({ btnType }) => (btnType === 'table' ? 'var(--white)' : null)};
  font-weight: 500;
  text-align: center;
  cursor: pointer;
`;
const btnContainer = `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3vh;
`;
const btnBox = `
  display: inline-block;
`;
export const CommonBtnArea = styled.div<CommonBtnProps>`
  ${({ btnType }) => (btnType === 'page' ? btnContainer : btnBox)};
  .student-info {
    font-size: 15px;
  }
  & > button {
    display: table-cell;
    vertical-align: middle;
  }
`;

/* * * * * * * * * * * * * * * */
// professor

export const DemurTable = styled.div`
  width: 100%;
  padding-top: 20px;
  .table {
    width: 100%;
    border-top: 2px solid var(--table-outline-color);
    text-align: center;
    border-collapse: collapse;
    .table-head,
    .table-body > div {
      display: grid;
      grid-template-columns: 1fr 1fr 2fr 1fr 1fr 1fr;
    }
    .table-head {
      height: 45px;
      background-color: var(--main-bg-color);
      div {
        height: 45px;
        line-height: 45px;
        font-weight: 700;
        border-right: 1px solid var(--table-border-color);
      }
    }
    .table-body {
      border-top: 2px solid var(--table-outline-color);
      border-bottom: 2px solid var(--table-outline-color);
      // height: 500px;
      .table-body-item {
        border-bottom: 1px solid var(--table-border-color);
        div {
          padding: 0 5px;
          text-align: center;
          height: 40px;
          line-height: 40px;
          border-right: 1px solid var(--table-border-color);
          &:last-of-type {
            border-right: none;
          }
        }
      }
      /* 스크롤바 */
      overflow-y: auto;
      /* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none; /* 인터넷 익스플로러 */
      scrollbar-width: none; /* 파이어폭스 */
    }
  }
`;
