import styled from '@emotion/styled';

export const Lwrap = styled.div``;

export const Bname = styled.label`
  .building {
    width: 250px;
    height: 50px;
    border: none;
    text-align: center;
  }
  .room {
    width: 150px;
    height: 50px;
    border: none;
    text-align: center;
  }
  select option[value=''] {
    display: none;
  }
`;

export const Ltable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 70px;
  text-align: center;
  background: #f8f8f8;

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
