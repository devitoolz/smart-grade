import React, { useState } from 'react';
import { NoDatas } from '../../styles/MyStyleCSS';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import CommonButton from '../../components/CommonButton';
import Table from '../../components/Table';
import { getStudentGrade } from '../../api/fetch';
import useQuerySearch from '../../hooks/useSearchFetch';

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

  // table
  const tableHeader = [
    { title: '학기', width: 1 },
    { title: '학년', width: 1 },
    { title: '강의명', width: 3 },
    { title: '담당교수', width: 2 },
    { title: '학점', width: 1 },
    { title: '성적', width: 1 },
    { title: '등급', width: 1 },
  ];
  // 데이터통신 - 학생 상세정보 불러오기
  const handleGetStudentInfo = async () => {
    alert('학생 상세정보 불러올 예정');
  };

  // 쿼리
  const [click, setClick] = useState(false);
  const queries = { semester, grade, studentNum };
  const url = '/api/admin/grade';
  const { data, pending } = useQuerySearch(url, click);

  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          length="short"
          placeholder="학기"
          data={semesterData}
          value={semester}
          setValue={setSemester}
          reset={true}
        />
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
          setValue={setStudentNum}
        />
      </SearchBar>

      {!data?.voList?.length ? (
        <NoDatas />
      ) : (
        <>
          <CommonButton btnType="page" value="학생상세정보" onClick={() => handleGetStudentInfo()}>
            {/* 학생의 이름+학번?+전공+현재학년 정도 표시(+현재 학점은?) */}
            {data?.voList[0].name}({data?.voList[0].studentNum})
          </CommonButton>
        </>
      )}
      <Table
        header={tableHeader}
        data={data?.voList}
        hasPage={true}
        maxPage={data?.page.maxPage}
        pending={pending}
      >
        {data?.voList.map((item, idx) => {
          return (
            <div key={idx}>
              <div>{item.istudent}</div>
              <div>{item.name}</div>
              <div>{item.ilecture}</div>
              <div>{item.imajor}</div>
              <div>{item.studentNum}</div>
              <div>{item.score}</div>
              <div>{item.rating}</div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default Grade;
