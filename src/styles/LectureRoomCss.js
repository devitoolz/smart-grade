import styled from '@emotion/styled';

// export const CommonButton = styled.div`
//   margin: 35px 0;
// `;

export const PlusModal = styled.div`
  position: fixed;
  left: 50%;
  top: 20%;
  width: 400px;
  height: 238px;
  background-color: greenyellow;
  border-radius: 10px;
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

//notice page
export const Ltable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  th {
    background-color: #dff6ff;
    border-top: 1px solid #1363df;
    border-right: 1px solid #dae8ff;
    border-bottom: 1px solid #dae8ff;
    padding: 10px 0;
  }

  td {
    border-bottom: 1px solid #dae8ff;
  }
  .inputTitle {
    padding: 11px 30px;
    background: #fff;
  }
  .statusTitle {
    background: #dff6ff;
    text-align: center;
  }
  .importanceCheck {
    display: flex;
    gap: 15px;
    width: 100%;
    padding: 15px 32px;
    .colorRed {
      color: red;
    }
  }
  .fileTitle {
    background: #dff6ff;
    padding: 20px 0;
    text-align: center;
  }
  .contentTitle {
    background: #dff6ff;
    text-align: center;
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
  .controlTextarea {
    padding: 20px 28px;
    textarea {
    }
  }
`;
export const BtnControl = styled.div`
  display: flex;
  justify-content: start;
`;

export const Wbtns = styled.div`
  display: flex;
  justify-content: center;
`;
