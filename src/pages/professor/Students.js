import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../apis/api';
import CommonButton from '../../components/CommonButton';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import useQuerySearch from '../../hooks/useSearchFetch';

const Students = () => {
  //페이지 이동
  const navigate = useNavigate();
  //페이지 이동 함수
  const pagemove = () => {
    navigate('/professor/students/detail');
  };

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
      title: '연도',
      width: '0.5',
    },
    {
      title: '학기 ',
      width: '0.5',
    },
    {
      title: '학년',
      width: '0.5',
    },
    {
      title: '강의명 ',
      width: '1.5',
    },
    {
      title: '학점',
      width: '0.5',
    },
    {
      title: '강의시간 ',
      width: '1',
    },
    {
      title: '강의실',
      width: '1',
    },
    {
      title: '정원 ',
      width: '0.5',
    },
    {
      title: '학생목록',
      width: '1',
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

  //api get hook test
  const url = `/api/professor/lecture-list`;
  //바꾼거
  // const url = `/api/student/lecture-list?page=${page}&size=10&sort=finishedYn=${degree}`;

  const { data, pending, error } = useQuerySearch(url);

  // const getstudent = async () => {
  //   try {
  //     const res = await api.get(`/api/student/${studentNum}`);
  // const res= await api.get(`/api/student/lecture-list?page=${page}&size=10&sort=finishedYn=${degree}`);
  //     const result = res.data;
  //     console.log('갈치가 천원', result);
  //     return result;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getstudent();
  // });

  return (
    <div>
      <div style={{ marginBottom: '94.41px' }}>
        <SearchBar queries={queries} setPage={true} setClick={setClick}>
          <Dropdown
            length="short"
            placeholder="학년"
            data={data?.lectureList.gradeLimit}
            propertyName={{ key: 'id', value: 'title' }}
            value={grade}
            setValue={setGrade}
            reset
            search
          />
          <Dropdown
            length="long"
            placeholder="강의명"
            data={data?.lectureList.lectureName}
            propertyName={{ key: 'id', value: 'title' }}
            value={major}
            setValue={setMajor}
            reset
            search
          />
        </SearchBar>
      </div>
      <Table
        header={tableHeader}
        data={data?.lectureList}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {data?.lectureList?.map(item => {
          return (
            <div key={item.ilecture}>
              <div>{item.year}</div>
              <div>{item.isemester}</div>
              <div>{item.gradeLimit}</div>
              <div>{item.lectureName}</div>
              <div>
                {item.lectureStrTime}~{item.lectureEndTime}
                {item.dayWeek}
              </div>
              <div>
                {item.buildingName}
                {item.lectureRoomName}
              </div>
              <div>{item.lectureMaxPeople}</div>
              <div>{item.score}</div>
              <div>
                <CommonButton btnType="table" color="gray" value="상세보기" onClick={pagemove} />
              </div>
            </div>
          );
        })}
      </Table>
      <CommonButton btnType="table" color="gray" value="상세보기" onClick={pagemove} />
    </div>
  );
};

export default Students;
