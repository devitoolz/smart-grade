import CommonModal from '../../components/CommonModal';
import { FormTable, Row } from '../../styles/UserStyle';
import CommonButton from '../../components/CommonButton';

const TestPage = () => {
  return (
    <CommonModal modalSize="big" modalTitle="00님의 상세정보">
      <FormTable>
        <Row col={2}>
          <div>이름(name)</div>
          <div>이름이 들어간다</div>
          <div>학번(studentNum)</div>
          <div>9999999</div>
        </Row>
        <Row col={2}>
          <div>성별(gender)</div>
          <div>남녀</div>
          <div>학과(majorName)</div>
          <div>학과=전공</div>
        </Row>
        <Row col={2}>
          <div>입학년도(createdAt)</div>
          <div>2023-08-09</div>
          <div>전화번호(phone)</div>
          <div>012-3456-7890</div>
        </Row>
      </FormTable>
      <div>
        학생이 들은 학점 = scoreStudent <br />
        졸업에 필요 학점 = graduationScore
      </div>
      <CommonButton
        btnType="page"
        value="상세정보"
        onClick={() => alert('학생정보 페이지로 넘어감')}
      />
    </CommonModal>
  );
};
export default TestPage;
