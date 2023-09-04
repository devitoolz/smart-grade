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
      border-top: 1.5px solid #61bfff;
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
//grid를 이용
export const LectureDetail = styled.div`
  margin-left: 100px;
  margin-top: 15px;
  text-align: center;
  width: 80%;

  .innerContainer {
    display: grid;

    grid-template-columns: 25% 25% 25% 25%;
  }
  .lectureName {
    grid-column: 1/2;
    border-top: 2px solid var(--form-table-odd-border-color);
    /* border-left: 2px solid var(--form-table-odd-border-color); */
    /* border-right: 2px solid var(--form-table-odd-border-color); */
    border-bottom: 2px solid var(--form-table-odd-border-color);
    padding: 10px 10px;
    color: var(--white);
    background: #47b5ff;
    border-bottom: 2px solid var(--form-table-odd-border-color);
  }
  .inputLectureName {
    grid-column: 2/5;
    border-top: 2px solid var(--form-table-even-border-color);
    border-bottom: 2px solid var(--form-table-even-border-color);
    /* border-right: 2px solid var(--form-table-odd-border-color);; */
    padding: 10px 10px;
    background: var(--form-table-bg-color);
  }
  .grade {
    grid-column: 1/2;
    border-bottom: 2px solid #61bfff;
    border-left: 2px solid #61bfff;
    /* border-top: 2px solid #61bfff; */
    padding: 10px 10px;
    background: #47b5ff;
    color: #fff;
  }
  .inputGrade {
    grid-column: 2/3;
    border-bottom: 2px solid var(--form-table-even-border-color);

    padding: 10px 10px;
    margin-left: -2px;
    background: var(--form-table-bg-color);
  }
  .professor {
    grid-column: 3/4;
    border-bottom: 2px solid #61bfff;
    border-left: 2px solid #61bfff;
    padding: 10px 10px;
    background: #47b5ff;
    color: #fff;
  }
  .inputProfessor {
    grid-column: 4/5;
    /* border-right: 2px solid --form-table-even-border-color; */
    border-bottom: 2px solid --form-table-even-border-color;
    /* border-left: 2px solid --form-table-even-border-color; */

    background: var(--form-table-bg-color);
  }
  .score {
    grid-row: 3/4;
    grid-column: 1/2;
    border-bottom: 2px solid #61bfff;
    border-left: 2px solid #61bfff;
    border-right: 2px solid #61bfff;
    /* border-top: 2px solid #61bfff; */
    padding: 10px 10px;
    background: #47b5ff;
    color: #fff;
  }
  .inputScore {
    grid-row: 3/4;
    grid-column: 2/3;
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;
    margin-left: 2px;

    background: var(--form-table-bg-color);
  }
  .lectureHour {
    grid-row: 3/4;
    grid-column: 3/4;
    padding: 10px 10px;
    text-align: center;
    border-bottom: 2px solid #61bfff;
    /* border-right: 2px solid #61bfff; */
    background: #47b5ff;
    color: #fff;
  }
  .inputLectureHour {
    grid-column: 4/5;
    text-align: center;
    padding: 10px 10px;
    border-bottom: 2px solid var(--form-table-even-border-color);
    background: var(--form-table-bg-color);
  }
  .purpose {
    grid-row: 4/5;
    grid-column: 1/2;
    /* border-right: 2px solid #61bfff; */
    border-bottom: 2px solid #61bfff;
    /* border-left: 2px solid #61bfff; */
    padding: 10px 10px;
    background: #47b5ff;
    color: #fff;
  }
  .inputPurpose {
    grid-row: 4/5;
    grid-column: 2/5;
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;
    background: var(--form-table-bg-color);
  }

  .bookName {
    grid-row: 5/6;
    grid-column: 1/2;
    border-right: 2px solid #61bfff;
    border-left: 2px solid #61bfff;
    background: #47b5ff;
    padding: 10px 10px;
    margin-left: -2px;
    color: #fff;
  }
  .inputBookName {
    grid-row: 5/6;
    grid-column: 2/4;
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;
    background: var(--form-table-bg-color);
  }

  .bookPic {
    grid-row: 5/7;
    grid-column: 4/5;
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;
    background: var(--form-table-bg-color);
  }
`;

export const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 40px 10px;
`;
export const Caution = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  p {
    color: red;
    margin-left: 10px;
  }
`;
