import styled from '@emotion/styled';

export const Lwrap = styled.div`
  width: 100%;
`;
export const CommonButton = styled.div`
  margin: 35px 0;
`;
export const Ltable = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* margin-top: 70px; */
  text-align: center;
  background: #fff;
  th {
    background-color: #dff6ff;
    border-top: 1px solid #1363df;
    border-right: 1px solid #dae8ff;
    padding: 10px 0;
  }

  td {
    border: 1px solid #dae8ff;
  }
  .inputTitle {
    padding: 11px 30px;
    background: #fff;
  }
  .leftTitle {
    background: #dff6ff;
  }
  .importantCheck {
    display: flex;
    padding-left: 33px;

    input[type='checkbox'] {
      transform: scale(1.5);

      cursor: pointer;
    }
    p {
      padding-left: 30px;
      color: red;
    }
  }
  textarea {
    display: block;
    text-align: justify;
    margin-left: 32px;
  }
`;

export const PlusModal = styled.div`
  margin-left: 20px;
  width: 400px;
  height: 238px;
  background-color: skyblue;
  border: #000;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  .majorTitle {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dae8ff;

    p {
      padding: 15px 20px;
    }
  }
  .palceTitle {
    display: flex;
    justify-content: space-around;
    align-items: center;

    border-bottom: 1px solid #dae8ff;

    .inputControl {
      display: flex;
      padding: 12px 20px;
    }
  }
  .capacityTitle {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #dae8ff;
    align-items: center;

    .inputControl {
      display: flex;
      padding: 12px 20px;
    }
  }
  .btns {
    display: flex;
    justify-content: center;
  }
`;

export const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  p {
    padding: 10px;
  }
`;
