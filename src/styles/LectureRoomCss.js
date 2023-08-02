import styled from '@emotion/styled';

export const Lwrap = styled.div`
  /* width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 23, 60, 0.7); */
  /* z-index: 9999; */
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
  position: fixed;
  left: 50%;
  top: 20%;
  width: 400px;
  height: 238px;
  background-color: greenyellow;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  .LectureLoomTitle {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dae8ff;

    p {
      padding: 15px 20px;
    }
  }
  .placeTitle {
    padding-left: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #dae8ff;
    .dropDownControl {
      z-index: 99;
    }
    .controls {
      display: flex;
      align-items: center;
    }

    .inputControl {
      display: flex;
      padding: 12px 20px;
      align-items: center;
      p {
        margin-left: 5px;
      }
    }
  }
  .capacityTitle {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #dae8ff;
    align-items: center;
    padding-left: 20px;
    .inputControl {
      display: flex;
      padding: 12px 20px;
      align-items: center;
      p {
        margin-left: 5px;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: center;
    margin-top: 18px;
  }
`;
