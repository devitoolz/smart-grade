import styled from '@emotion/styled';

export const TableArea = styled.div`
  width: 100%;
  table {
    width: 100%;
    border-top: 2px solid #1363df;
    text-align: center;
    border-collapse: collapse;
    thead {
      height: 54px;
      background-color: #dff6ff;
    }
    tbody {
      tr {
        height: 50px;
      }
    }
    th,
    td {
      border: 1px solid #dae8ff;
    }
    &.notice {
      th,
      td {
        border: 1px solid var(--main-border-color);
      }
    }
  }
`;
export const SearchArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 96px;
  margin: 72px 0;
  background-color: #d9d9d9;
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

export const LectureContainer = styled.div`
  width: 100%;
`;

export const TempStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 23, 60, 0.7);
  .modal-box {
    width: 72%;
    height: 72%;
    background-color: #fff;
    padding-top: 2rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    button {
      width: 48px;
      height: 48px;
    }
    p {
      font-size: 32px;
      text-align: center;
      line-height: 2.5;
      padding-bottom: 1rem;
    }
  }
`;

export const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 180px;
  color: gray;
  p {
    margin-top: 20px;
    font-size: 80px;
  }
`;

// 공통 버튼
export const CommonBtn = styled.button`
  display: ${({ onClick }) => (onClick ? 'block' : 'none')};

  margin: 10px;
  width: 105px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: #dff6ff;
  color: #7e7e7e;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
