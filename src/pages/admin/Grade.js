import React, { useState } from 'react';
import { NoDatas } from '../../styles/MyStyleCSS';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Table from '../../components/Table';
import { getStudentGrade } from '../../api/fetch';
import useQuerySearch from '../../hooks/useSearchFetch';
import { FormTable, Row } from '../../styles/UserStyle';

const Grade = () => {
  // 드롭다운
  const semesterData = [
    { id: 1, title: '1학기' },
    { id: 2, title: '2학기' },
  ];
  const gradeData = [
    { id: 1, title: '1학년' },
    { id: 2, title: '2학년' },
    { id: 3, title: '3학년' },
    { id: 4, title: '4학년' },
  ];
  const [semester, setSemester] = useState();
  const [grade, setGrade] = useState();
  const [studentNum, setStudentNum] = useState('');
  const studentNumChange = e => {
    setStudentNum(e.target.value);
  };

  // table
  const tableHeader = [
    { title: '학년', width: 1 },
    { title: '학기', width: 1 },
    { title: '강의명', width: 3 },
    { title: '담당교수', width: 2 },
    { title: '학점', width: 1 },
    { title: '성적', width: 1 },
    { title: '등급', width: 1 },
  ];
  // 데이터통신 - 학생 상세정보 불러오기
  const handleGetStudentInfo = async _info => {
    alert('학생 상세정보 불러올 예정');
    console.log(_info);
    _info ? setDisplay(true) : null;
  };

  // 쿼리
  const [click, setClick] = useState(false);
  const queries = { semester, grade, studentNum };
  const url = '/api/admin/grade';
  const { data, pending, error } = useQuerySearch(url, click);
  console.log(error);
  console.log(data);

  //
  // 학생 상세 정보 모달창
  const [display, setDisplay] = useState(false);

  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          length="short"
          placeholder="학년"
          data={gradeData}
          value={grade}
          setValue={setGrade}
          reset={true}
        />
        <Input
          length="middle"
          type="number"
          placeholder="학번"
          value={studentNum}
          setValue={studentNumChange}
          reset={setStudentNum}
        />
      </SearchBar>

      {data?.avgVo1 === null ? (
        <NoDatas />
      ) : (
        <CommonButton
          btnType="page"
          value="학생상세정보"
          onClick={() => handleGetStudentInfo(data?.avgVo1?.istudent)}
        >
          {/* 학생의 이름+학번?+전공+현재학년 정도 표시(+현재 학점은?) */}
          {/* {data?.voList[0]?.name} {data?.voList[0]?.studentNum} */}
          {data?.avgVo1?.name} {data?.avgVo1?.studentNum}
          {Boolean(data?.avgVo1.length) && (
            <span style={{ color: 'red' }}>* 학번 입력은 필수입니다</span>
          )}
        </CommonButton>
      )}

      <Table
        header={tableHeader}
        data={data?.voList || Array(10).fill('')}
        hasPage={true}
        maxPage={data?.page.maxPage}
        pending={pending}
      >
        {(data?.voList || Array(10).fill('')).map((item, idx) => {
          return (
            <div key={idx}>
              <div>{item.grade}</div>
              <div>{item.semester}</div>
              <div>{item.lectureName}</div>
              <div>{item.professorName}</div>
              <div>{item.lectureScore}</div>
              <div>{item.totalScore}</div>
              <div>{item.rating}</div>
            </div>
          );
        })}
      </Table>

      {display && (
        <CommonModal
          modalSize="big"
          modalTitle={`${data.avgVo1.name}님의 상세정보`}
          setDisplay={setDisplay}
        >
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
            onClick={() => {
              alert('학생정보 페이지로 넘어감');
              setDisplay(false);
            }}
          />
        </CommonModal>
      )}
    </>
  );
};

export default Grade;
