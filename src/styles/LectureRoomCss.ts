import styled from '@emotion/styled';

// export const CommonButton = styled.div`
//   margin: 35px 0;
// `;

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

export const Wbtns = styled.div`
  display: flex;
  justify-content: center;
`;

//
export const LPTWrap = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-content: center;
  border-collapse: collapse;
`;
// 학생 강의 상세정보
export const LPlanTable = styled.table`
  width: 80%;
  /* justify-content: center; */

  /* padding: 30px; */
  tr {
    colgroup {
      col {
        width: 25%;
      }
    }
    td {
      conspan: 2;
    }
    td {
      border-top: 1px solid #1363df;
      border-right: 1px solid #dae8ff;
      border-left: 1px solid #dae8ff;
      border-bottom: 1px solid #dae8ff;
      padding: 10px 10px;
    }
    .lectureName {
      colspan: 2;
    }
    .inputLectureName {
      colspan: 2;
    }
  }
`;
export const Btn = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 10px;
  /* padding */
`;
