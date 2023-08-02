import React, { useState } from 'react';
import { LectureContainer, TableArea, TempStyle, NoData } from '../styles/MyStyleCSS';
import SearchBar from '../components/SearchBar';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../components/CommonButton';
import Dropdown from '../components/Dropdown';
import CommonModal from '../components/CommonModal';
import { Layout } from '../styles/CommonStyle';
import Table from '../components/Table';
import axios from 'axios';

const Lecture = () => {
  const [display, setDisplay] = useState(false);
  const [contents, setContents] = useState({});
  const handleShowDetail = _item => {
    setDisplay(true);
    setContents(_item);
  };
  const arr = [
    {
      a: '1',
      b: '2',
      c: '컴퓨터공학과',
      lecture: '데이터베이스',
      e: '김그린',
      f: '2',
      g: '6호관 404호',
      h: '2000-03-02~2000-06-28',
      i: '09:00~11:00',
      j: 30,
      k: '상태',
    },
    {
      a: '1',
      b: '3',
      c: '컴퓨터공학과',
      lecture: '웹프로그래밍',
      e: '김그린',
      f: '3',
      g: '6호관 404호',
      h: '2000-03-02~2000-06-28',
      i: '14:00~17:00',
      j: 30,
      k: '상태',
    },
  ];

  const handlePageBtnClick = () => {
    console.log('btn click');
    navigate('/bachelor/lecture/approval');
  };

  // 드롭다운 테스트
  const [lectureName, setLectureName] = useState();
  const [lectureStatus, setLectureStatus] = useState();
  const data = [
    {
      id: 1,
      title: '1번',
    },
    {
      id: 2,
      title: '2번',
    },
  ];
  const navigate = useNavigate();
  const [professorName, setProfessorName] = useState('');

  // table
  const tableHeader = [
    { title: '학기', width: 1 },
    { title: '학년', width: 1 },
    { title: '전공', width: 2 },
    { title: '강의명', width: 3 },
    { title: '담당교수', width: 1.2 },
    { title: '학점', width: 1 },
    { title: '강의실', width: 1.8 },
    { title: '강의 기간', width: 3 },
    { title: '강의 시간', width: 1.5 },
    { title: '정원', width: 1 },
    { title: '상태', width: 1 },
    { title: '상세', width: 1.5 },
  ];
  const tableData = [
    {
      a: '1',
      b: '2',
      c: '컴퓨터공학과',
      lecture: '데이터베이스',
      e: '김그린',
      f: '2',
      g: '6호관 404호',
      h: '2000-03-02~2000-06-28',
      i: '09:00~11:00',
      j: 30,
      k: '상태',
    },
    {
      a: '1',
      b: '3',
      c: '컴퓨터공학과',
      lecture: '웹프로그래밍',
      e: '김그린',
      f: '3',
      g: '6호관 404호',
      h: '2000-03-02~2000-06-28',
      i: '14:00~17:00',
      j: 30,
      k: '상태',
    },
  ];
  // 쿼리
  const queries = { lectureStatus, lectureName, professorName };
  const url = '';

  // 서버연동
  const handleTestClick = async () => {
    // try...catch
    try {
      const res = await axios.get('http://192.168.0.144:5002/api/admin/lecture?page=1');
      const result = res.data;
      console.log('통신 데이터 : ', result);
    } catch (error) {
      console.log(error);
    }
  };

  // JSX
  return (
    <Layout>
      <SearchBar queries={queries} url={url} setPage={true}>
        <Dropdown
          length="short"
          placeholder="강의상태"
          data={data}
          value={lectureStatus}
          setValue={setLectureStatus}
          reset={true}
        />
        <Dropdown
          length="long"
          placeholder="강의명"
          data={data}
          value={lectureName}
          setValue={setLectureName}
          reset={true}
        />
        <Input
          length="short"
          type="string"
          placeholder="교수명"
          value={professorName}
          setValue={setProfessorName}
        />
      </SearchBar>

      <CommonButton btnType="page" value="강의 개설 관리" onClick={handlePageBtnClick} />

      {arr.length === 0 ? (
        <NoData>
          <p>검색해주세요</p>
        </NoData>
      ) : (
        <>
          <Table header={tableHeader} data={tableData} hasPage={true} maxPage={5}>
            {tableData.map((item, idx) => {
              return (
                <div key={idx}>
                  <div>{item.a}</div>
                  <div>{item.b}</div>
                  <div>{item.c}</div>
                  <div>{item.lecture}</div>
                  <div>{item.e}</div>
                  <div>{item.f}</div>
                  <div>{item.g}</div>
                  <div>{item.h}</div>
                  <div>{item.i}</div>
                  <div>{item.j}</div>
                  <div>{item.k}</div>
                  <div>
                    <CommonButton
                      btnType="table"
                      color="gray"
                      value="상세보기"
                      onClick={() => handleTestClick()}
                    />
                  </div>
                </div>
              );
            })}
          </Table>
        </>
      )}
      {display ? (
        <CommonModal
          setDisplay={setDisplay}
          contents={contents}
          modalTitle="강의실 추가"
          modalSize="big"
        >
          <p>모달창 큰 버전</p>
          <p>내용추가</p>
        </CommonModal>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default Lecture;
