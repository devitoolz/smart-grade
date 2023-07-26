import styled from '@emotion/styled';

export const Lwrap = styled.div``;

export const Ltable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 70px;
  text-align: center;
  background: #f8f8f8;

  colgroup {
    .number {
      width: 7%;
    }
    .place {
      width: 35%;
    }
    .capacity {
      width: 15%;
    }
    .management {
      width: 20%;
    }
  }
  th,
  td {
    border: 1px solid #dae8ff;
    padding: 15px 0;
  }
`;

export const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  p {
  }
`;
