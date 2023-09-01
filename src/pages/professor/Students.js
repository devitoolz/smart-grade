import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
// import { EffectCards } from 'swiper/modules';
import CommonModal from '../../components/CommonModal';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import useQuerySearch from '../../hooks/useSearchFetch';

const Students = () => {
  ////searchBar////

  //학년 state
  const [grade, setGrade] = useState('');
  //전공 state
  const [major, setMajor] = useState('');
  //학번 state
  const [studentID, setStudentID] = useState('');
  //이름 state
  const [studentName, setStudentName] = useState('');
  //쿼리스트링
  const queries = { grade, major, studentID, studentName };

  //검색 버튼 클릭 시
  const [click, setClick] = useState(false);

  //tabel header
  const tableHeader = [
    {
      title: '학년',
      width: '0.5',
    },
    {
      title: '전공 ',
      width: '2',
    },
    {
      title: '학번',
      width: '2',
    },
    {
      title: '이름 ',
      width: '1',
    },
    {
      title: '전화번호',
      width: '2',
    },
  ];
  //학기 임시 더미데이터
  const majorList = [
    {
      id: 1,
      title: '산업디자인학과',
    },
    {
      id: 2,
      title: '컴퓨터 공학과',
    },
    {
      id: 3,
      title: '신소재 공학과',
    },
  ];
  //학년 임시 더미데이터
  const gradeList = [
    {
      id: 1,
      title: '1학년',
    },
    {
      id: 2,
      title: '2학년',
    },
    {
      id: 3,
      title: '3학년',
    },
    {
      id: 4,
      title: '4학년',
    },
  ];

  //테이블 임시 더미데이터
  // const _data = [
  //   {
  //     id: '1',
  //     grade: '3',
  //     major: '산업디자인',
  //     StudentID: 23720004,
  //     name: '도하나',
  //     phoneNumber: '010 - 1234 - 5678',
  //   },
  //   {
  //     id: '2 ',
  //     content: '1',
  //   },
  //   {
  //     id: '3 ',
  //     content: '1',
  //   },
  //   {
  //     id: '4 ',
  //     content: '1',
  //   },
  //   {
  //     id: '5 ',
  //     content: '1',
  //   },
  // ];

  //상세보기 모달창 활성화
  const [display, setDisplay] = useState(false);
  //상세보기 모달창 열기
  const handleModalOk = () => {
    setDisplay(true);
  };

  //상세보기 모달창 닫기
  const handleModalCancel = () => {
    setDisplay(false);
  };

  //api get hook test
  const url = '/api/student/${studentNum}';
  const { data, pending, error } = useQuerySearch(url, click);

  const getstudent = async () => {
    try {
      const res = await axios.get('/api/student/${studentNum}');
      const result = res.data;
      console.log('갈치가 천원', result);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getstudent();
  });
  return (
    <div>
      {display === true ? (
        <CommonModal
          setDisplay={setDisplay}
          modalSize="small"
          modalTitle="개설 승인"
          handleModalOk={handleModalOk}
          handleModalCancel={handleModalCancel}
        >
          <p>모달 작은 창 버전</p>
          <p>내용추가</p>
        </CommonModal>
      ) : null}
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          length="short"
          placeholder="학년"
          data={gradeList}
          propertyName={{ key: 'id', value: 'title' }}
          value={grade}
          setValue={setGrade}
          reset
          search
        />
        <Dropdown
          length="long"
          placeholder="전공"
          data={majorList}
          propertyName={{ key: 'id', value: 'title' }}
          value={major}
          setValue={setMajor}
          reset
          search
        />
        <Input
          length="long"
          type="number"
          placeholder="학번"
          value={studentID}
          setValue={e => setStudentID(e.target.value)}
          reset={setStudentID}
        />
        <Input
          length="short"
          type="text"
          placeholder="이름"
          value={studentName}
          setValue={e => setStudentName(e.target.value)}
          reset={setStudentName}
        />
      </SearchBar>
      <Table
        header={tableHeader}
        data={data?.profile}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {' '}
        {data?.profile?.map(item => {
          return (
            <div key={item.studentNum}>
              <div>{item.grade}</div>
              <div>{item.majorName}</div>
              <div>{item.studentNum}</div>
              <div>{item.name}</div>
              <div>{item.phone}</div>
            </div>
          );
        })}
      </Table>
    </div>
  );
};

export default Students;
