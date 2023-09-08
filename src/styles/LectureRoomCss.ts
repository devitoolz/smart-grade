import styled from '@emotion/styled';

//noticeDetail page
export const Wbtns = styled.div`
  display: flex;
  justify-content: center;
`;
// 교수 lecture //
// 주의사항
export const ProfessorCaution = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  p {
    color: red;
    margin-left: 10px;
  }
  .callNum {
    margin-left: 20px;
  }
`;

//grid를 이용한 Table
export const ProfessorLectureDetail = styled.div`
  overflow-y: scroll;
  margin-left: 60px;
  margin-top: 15px;
  text-align: center;
  width: 90%;

  .innerContainer {
    display: grid;

    grid-template-columns: 20% 30% 20% 30%;
  }
  .lectureName {
    grid-column: 1/2;
    grid-row: 1/2;
    border-top: 2px solid var(--form-table-odd-border-color);
    border-bottom: 2px solid var(--form-table-odd-border-color);
    padding: 10px 10px;
    color: var(--white);
    background: var(--primary-color);
    border-bottom: 2px solid var(--form-table-odd-border-color);
  }
  .inputLectureName {
    grid-column: 2/5;
    grid-row: 1/2;
    border-top: 2px solid var(--form-table-even-border-color);
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;
    background: var(--form-table-bg-color);
  }
  .grade {
    grid-row: 2/3;
    grid-column: 1/2;
    border-bottom: 2px solid var(--form-table-odd-border-color);
    border-left: 2px solid var(--form-table-odd-border-color);
    padding: 10px 10px;
    background: var(--primary-color);
    color: #fff;
  }
  .inputGrade {
    grid-row: 2/3;
    grid-column: 2/3;
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;

    background: var(--form-table-bg-color);
  }

  .semester {
    grid-row: 2/3;
    grid-column: 3/4;
    border-bottom: 2px solid var(--form-table-odd-border-color);
    border-left: 2px solid var(--form-table-odd-border-color);
    padding: 10px 10px;
    background: var(--primary-color);
    color: #fff;
  }
  .inputSemester {
    grid-row: 2/3;
    grid-column: 4/5;
    border-bottom: 2px solid var(--form-table-even-border-color);
    background: var(--form-table-bg-color);
  }
  .score {
    grid-row: 3/4;
    grid-column: 1/2;
    border-bottom: 2px solid var(--form-table-odd-border-color);
    border-left: 2px solid var(--form-table-odd-border-color);
    border-right: 2px solid var(--form-table-odd-border-color);
    padding: 10px 10px;
    background: var(--primary-color);
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
    border-bottom: 2px solid var(--form-table-odd-border-color);
    background: var(--primary-color);
    color: #fff;
  }
  .inputLectureHour {
    grid-column: 4/5;
    grid-row: 3/4;
    text-align: center;
    padding: 10px 10px;
    border-bottom: 2px solid var(--form-table-even-border-color);
    background: var(--form-table-bg-color);
  }

  .capacity {
    grid-row: 4/5;
    grid-column: 1/2;
    padding: 10px 10px;
    text-align: center;
    border-bottom: 2px solid var(--form-table-odd-border-color);
    background: var(--primary-color);
    color: #fff;
  }

  .inputCapacity {
    grid-row: 4/5;
    grid-column: 2/3;
    padding: 10px 10px;
    text-align: center;
    border-bottom: 2px solid var(--form-table-even-border-color);
    background: var(--form-table-bg-color);
  }

  .bookName {
    grid-row: 4/5;
    grid-column: 3/4;
    /* border-right: 2px solid var(--form-table-odd-border-color); */
    border-bottom: 2px solid var(--form-table-odd-border-color);
    /* border-left: 2px solid var(--form-table-odd-border-color); */
    background: var(--primary-color);
    padding: 10px 10px;

    color: #fff;
  }
  .inputBookName {
    grid-row: 4/5;
    grid-column: 4/5;
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;
    background: var(--form-table-bg-color);
  }

  .LectureInfo {
    grid-row: 5/6;
    grid-column: 1/2;
    /* border-right: 2px solid var(--form-table-odd-border-color); */
    /* border-top: 2px solid var(--form-table-odd-border-color); */
    border-bottom: 2px solid var(--form-table-odd-border-color);
    /* border-left: 2px solid var(--form-table-odd-border-color); */
    padding: 10px 10px;
    background: var(--primary-color);
    color: #fff;
  }
  .inputLectureInfo {
    grid-row: 5/6;
    grid-column: 2/3;
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;
    background: var(--form-table-bg-color);
  }

  .bookPic {
    grid-row: 5/6;
    grid-column: 3/4;
    padding: 10px 10px;
    border-bottom: 2px solid var(--form-table-odd-border-color);
    background: var(--primary-color);
    color: white;
  }
  .inputBookPic {
    display: flex;
    grid-row: 5/6;
    grid-column: 4/5;
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;
    background: var(--form-table-bg-color);
    width: 100%;
    height: 100%;
    /* justify-content: space-around; */
    justify-content: center;
    div {
      width: 207px;
      height: 260px;

      border: 2px solid var(--search-bg-color);
      background: var(--form-table-even-border-color);
      img {
        object-fit: cover;
        width: 100%;
      }
    }
  }
`;

export const ProfessorLectureBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 40px 10px;
`;

export const ModalWrap = styled.div`
  height: '86%';
  display: flex;
`;

//학생 lecture//

export const StudentLectureDetail = styled.div`
  overflow-y: scroll;
  margin-left: 60px;
  margin-top: 15px;
  text-align: center;
  width: 90%;

  .innerContainer {
    display: grid;

    grid-template-columns: 20% 30% 20% 30%;
  }
  .lectureName {
    grid-column: 1/2;
    grid-row: 1/2;
    border-top: 2px solid var(--form-table-odd-border-color);
    border-bottom: 2px solid var(--form-table-odd-border-color);
    padding: 10px 10px;
    color: var(--white);
    background: var(--primary-color);
    border-bottom: 2px solid var(--form-table-odd-border-color);
  }
  .inputLectureName {
    grid-column: 2/5;
    grid-row: 1/2;
    border-top: 2px solid var(--form-table-even-border-color);
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;
    background: var(--form-table-bg-color);
  }
  .grade {
    grid-row: 2/3;
    grid-column: 1/2;
    border-bottom: 2px solid var(--form-table-odd-border-color);
    border-left: 2px solid var(--form-table-odd-border-color);
    padding: 10px 10px;
    background: var(--primary-color);
    color: #fff;
  }
  .inputGrade {
    grid-row: 2/3;
    grid-column: 2/3;
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;

    background: var(--form-table-bg-color);
  }

  .semester {
    grid-row: 2/3;
    grid-column: 3/4;
    border-bottom: 2px solid var(--form-table-odd-border-color);
    border-left: 2px solid var(--form-table-odd-border-color);
    padding: 10px 10px;
    background: var(--primary-color);
    color: #fff;
  }
  .inputSemester {
    grid-row: 2/3;
    grid-column: 4/5;
    border-bottom: 2px solid var(--form-table-even-border-color);
    background: var(--form-table-bg-color);
  }
  .score {
    grid-row: 3/4;
    grid-column: 1/2;
    border-bottom: 2px solid var(--form-table-odd-border-color);
    border-left: 2px solid var(--form-table-odd-border-color);
    border-right: 2px solid var(--form-table-odd-border-color);
    padding: 10px 10px;
    background: var(--primary-color);
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
    border-bottom: 2px solid var(--form-table-odd-border-color);
    background: var(--primary-color);
    color: #fff;
  }
  .inputLectureHour {
    grid-column: 4/5;
    grid-row: 3/4;
    text-align: center;
    padding: 10px 10px;
    border-bottom: 2px solid var(--form-table-even-border-color);
    background: var(--form-table-bg-color);
  }

  .professorName {
    grid-row: 4/5;
    grid-column: 1/2;
    padding: 10px 10px;
    text-align: center;
    border-bottom: 2px solid var(--form-table-odd-border-color);
    background: var(--primary-color);
    color: #fff;
  }

  .inputProfessorName {
    grid-row: 4/5;
    grid-column: 2/3;
    padding: 10px 10px;
    text-align: center;
    border-bottom: 2px solid var(--form-table-even-border-color);
    background: var(--form-table-bg-color);
  }

  .bookName {
    grid-row: 4/5;
    grid-column: 3/4;
    /* border-right: 2px solid var(--form-table-odd-border-color); */
    border-bottom: 2px solid var(--form-table-odd-border-color);
    /* border-left: 2px solid var(--form-table-odd-border-color); */
    background: var(--primary-color);
    padding: 10px 10px;

    color: #fff;
  }
  .inputBookName {
    grid-row: 4/5;
    grid-column: 4/5;
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;
    background: var(--form-table-bg-color);
  }

  .LectureInfo {
    grid-row: 5/6;
    grid-column: 1/2;
    /* border-right: 2px solid var(--form-table-odd-border-color); */
    /* border-top: 2px solid var(--form-table-odd-border-color); */
    border-bottom: 2px solid var(--form-table-odd-border-color);
    /* border-left: 2px solid var(--form-table-odd-border-color); */
    padding: 10px 10px;
    background: var(--primary-color);
    color: #fff;
  }
  .inputLectureInfo {
    grid-row: 5/6;
    grid-column: 2/3;
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;
    background: var(--form-table-bg-color);
  }

  .bookPic {
    grid-row: 5/6;
    grid-column: 3/4;
    padding: 10px 10px;
    border-bottom: 2px solid var(--form-table-odd-border-color);
    background: var(--primary-color);
    color: white;
  }
  .inputBookPic {
    display: flex;
    grid-row: 5/6;
    grid-column: 4/5;
    border-bottom: 2px solid var(--form-table-even-border-color);
    padding: 10px 10px;
    background: var(--form-table-bg-color);
    width: 100%;
    height: 100%;
    /* justify-content: space-around; */
    justify-content: center;
    div {
      width: 207px;
      height: 260px;

      border: 2px solid var(--search-bg-color);
      background: var(--form-table-even-border-color);
      img {
        object-fit: cover;
        width: 100%;
      }
    }
  }
`;

export const StudentLectureBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 40px 10px;
`;
