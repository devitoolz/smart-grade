import React, { useState, useEffect } from 'react';
import { TableArea, NoData } from '../../styles/MyStyleCSS';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import CommonButton from '../../components/CommonButton';
import { Layout } from '../../styles/CommonStyle';
import Table from '../../components/Table';
import { getStudentGrade } from '../../api/fetch';
import useQuerySearch from '../../hooks/useSearchFetch';

const Grade = () => {
  const arr = [
    {
      aa: '1',
      bb: '1',
      cc: '생명윤리',
      dd: '이그린',
      ee: 3,
      ff: 96,
      gg: 'A+',
    },
  ];
  const array = [
    `(o^^)o`,
    `(^-^*)`,
    `(·_·)`,
    `(^_^)b`,
    `(≥o≤)`,
    `(;-;)`,
    `(>_<)`,
    `(='X'=)`,
    `(·.·)`,
    `(^Д^)/`,
    `(o_o)/`,
    `(o^^)o`,
    `(˚Δ˚)b'`,
  ];
  let randomValue = array[Math.floor(Math.random() * array.length)];

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
  const tableData = [
    {
      aa: '1',
      bb: '1',
      cc: '생명윤리',
      dd: '이그린',
      ee: 3,
      ff: 96,
      gg: 'A+',
    },
    {
      aa: '1',
      bb: '2',
      cc: '기술과학윤리',
      dd: '이그린',
      ee: 2,
      ff: 94,
      gg: 'A+',
    },
    {
      aa: '1',
      bb: '3',
      cc: '생명윤리',
      dd: '이그린',
      ee: 3,
      ff: 97,
      gg: 'A+',
    },
    {
      aa: '1',
      bb: '4',
      cc: '생활속의물리',
      dd: '이그린',
      ee: 3,
      ff: 100,
      gg: 'A+',
    },
    {
      aa: '1',
      bb: '2',
      cc: '데이터베이스',
      dd: '이그린',
      ee: 3,
      ff: 96,
      gg: 'A+',
    },
  ];
  // 데이터통신 - 학생성적 불러오기
  const [studentData, setStudentData] = useState([]);
  const handleGetStudentGrade = async _setFunc => {
    await getStudentGrade(_setFunc);
  };
  // useEffect(() => {
  //   handleGetStudentGrade();
  // }, []);

  // 쿼리
  const [click, setClick] = useState(false);
  const queries = { semester, grade, studentNum };
  const url = '/api/admin/grade';
  const { data, pending } = useQuerySearch(url, click);
  console.log(data);
  console.log(data?.avgVo);
  console.log(data?.voList);

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
        <NoData>
          <p>{randomValue}</p>
          <p>검색해주세요</p>
        </NoData>
      ) : (
        <>
          <CommonButton
            btnType="page"
            value="학생상세정보"
            onClick={() => handleGetStudentGrade(setStudentData)}
          />
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
      )}
    </>
  );
};

export default Grade;
