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
    border-top: 1.5px solid #1363df;
    border-right: 1.5px solid #dae8ff;
    border-bottom: 1.5px solid #dae8ff;
    padding: 10px 0;
  }

  td {
    border-bottom: 1.5px solid #dae8ff;
  }
  .inputTitle {
    padding: 11.5px 30px;
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
  align-items: center;
`;
// 학생 강의 상세정보
export const LPlanTable = styled.table`
  width: 80%;
  border: 1.5px solid dae8ff; /* justify-content: center; */
  border-collapse: collapse;
  text-align: center;
  height: 100%;
  tr {
    th {
      background-color: #dff6ff;
      border-top: 1.5px solid #a5c9f6;
      border-bottom: 1.5px solid #a5c9f6;
      border-right: 1.5px solid #a5c9f6;
      border-left: 1.5px solid #a5c9f6;
    }

    td {
      border-top: 1.5px solid #a5c9f6;
      border-right: 1.5px solid #a5c9f6;
      border-left: 1.5px solid #a5c9f6;
      border-bottom: 1.5px solid #a5c9f6;
      padding: 10px 10px;
    }
  }
`;
export const Btn = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 10px;
`;
export const LectureDetail = styled.div`
  margin-left: 40px;
  text-align: center;
  width: 80%;
  .innerContainer {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
  }
  .lectureName {
    border-top: 1px solid #a5c9f6;
    border-left: 1px solid #a5c9f6;
    border-right: 1px solid #a5c9f6;
    grid-column: 1/3;

    padding: 20px 10px;
  }
  .inputLectureName {
    grid-column: 3/5;
    border-top: 1px solid #a5c9f6;
    border-right: 1px solid #a5c9f6;
    border-bottom: 1px solid #a5c9f6;
    /* border-right: 1px solid #a5c9f6; */
    padding: 20px 10px;
  }
  .score {
    border-bottom: 1px solid #a5c9f6;
    border-left: 1px solid #a5c9f6;
    border-top: 1px solid #a5c9f6;

    padding: 20px 10px;
  }
  .inputScore {
    border-bottom: 1px solid #a5c9f6;
    border-left: 1px solid #a5c9f6;
    border-top: 1px solid #a5c9f6;
    padding: 20px 10px;
  }
  .professor {
    border-bottom: 1px solid #a5c9f6;
    border-left: 1px solid #a5c9f6;

    padding: 20px 10px;
  }
  .inputProfessor {
    border-right: 1px solid #a5c9f6;
    border-bottom: 1px solid #a5c9f6;
    border-left: 1px solid #a5c9f6;
    padding: 20px 10px;
  }
  .purpose {
    grid-column: 1/5;
    border-right: 1px solid #a5c9f6;
    border-bottom: 1px solid #a5c9f6;
    border-left: 1px solid #a5c9f6;

    padding: 20px 10px;
  }
  .inputPurpose {
    grid-column: 1/5;
    grid-row: 4/5;
    border-right: 1px solid #a5c9f6;
    border-bottom: 1px solid #a5c9f6;
    border-left: 1px solid #a5c9f6;
    padding: 20px 10px;
  }
  .bookPic {
    grid-row: 5/7;
    span: 2;
    padding: 20px 10px;
    /* border-right: 1px solid #a5c9f6; */
    border-bottom: 1px solid #a5c9f6;
    border-left: 1px solid #a5c9f6;
  }

  .bookName {
    grid-column: 2/5;
    border-right: 1px solid #a5c9f6;
    /* border-bottom: 1px solid #a5c9f6; */
    border-left: 1px solid #a5c9f6;
    padding: 20px 10px;
  }
  .isbn {
    grid-column: 2/5;
    border-right: 1px solid #a5c9f6;
    border-bottom: 1px solid #a5c9f6;
    border-left: 1px solid #a5c9f6;
    border-top: 1px solid #a5c9f6;
    padding: 20px 10px;
  }
`;
