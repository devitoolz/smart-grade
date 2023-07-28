import React, { useEffect, useState } from 'react';
import { Layout } from '../styles/CommonStyle';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import { useSelector } from 'react-redux';
import ButtonBar from '../components/ButtonBar';
import Table from '../components/Table';
import { useLocation, useSearchParams } from 'react-router-dom';

const Student = () => {
  const gradeList = Array(4)
    .fill()
    .map((_, index) => {
      return { id: index + 1, title: index + 1 + '학년' };
    });

  const [grade, setGrade] = useState(null);
  const [major, setMajor] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');

  const { majorList } = useSelector(state => state.major);

  const tableHeader = [
    { title: '학번', width: 2 },
    { title: '학년', width: 1 },
    { title: '이름', width: 2 },
    { title: '전공', width: 4 },
    { title: '성별', width: 1 },
    { title: '생년월일', width: 3 },
    { title: '전화번호', width: 3 },
    { title: '입학년도', width: 3 },
    { title: '졸업여부', width: 2 },
    { title: '이수학점', width: 1 },
    { title: '상세보기', width: 2 },
  ];

  const data = {
    page: {
      staIdx: 0,
      page: 1,
      maxPage: 3,
      isMore: 1,
      row: 10,
    },
    studnets: [
      {
        istudent: 1,
        studentNum: '23100001',
        grade: 3,
        nm: '재경킴',
        majoirName: '게임콘텐츠과',
        gender: 'F',
        birthdate: '2023-07-21',
        phone: '010-2120-3636',
        createdAt: '2023-07-21',
        finishedYn: 1,
        score: 3,
      },
      {
        istudent: 3,
        studentNum: '23100002',
        grade: 1,
        nm: '지녹제',
        majoirName: '건축공학과',
        gender: 'F',
        birthdate: '2023-07-21',
        phone: '010-2120-3636',
        createdAt: '2023-07-21',
        finishedYn: 1,
        score: 3,
      },
      {
        istudent: 4,
        studentNum: '2310003',
        grade: 1,
        nm: '지코바',
        majoirName: '게임공학과',
        gender: 'F',
        birthdate: '2023-07-21',
        phone: '010-2120-3636',
        createdAt: '2023-07-21',
        finishedYn: 1,
        score: 0,
      },
      {
        istudent: 6,
        studentNum: '2310004',
        grade: 1,
        nm: '지코바',
        majoirName: '고분자공학과',
        gender: 'F',
        birthdate: '2023-07-21',
        phone: '010-2120-3636',
        createdAt: '2023-07-21',
        finishedYn: 1,
        score: 0,
      },
      {
        istudent: 7,
        studentNum: '2310005',
        grade: 1,
        nm: '갓후라이드',
        majoirName: '건축과',
        gender: 'F',
        birthdate: '2023-07-21',
        phone: '010-2120-3636',
        createdAt: '2023-07-21',
        finishedYn: 1,
        score: 0,
      },
      {
        istudent: 8,
        studentNum: '2310006',
        grade: 1,
        nm: '치킨',
        majoirName: '공업화학과',
        gender: 'F',
        birthdate: '2023-07-21',
        phone: '010-2120-3636',
        createdAt: '2023-07-21',
        finishedYn: 1,
        score: 0,
      },
      {
        istudent: 9,
        studentNum: '2310007',
        grade: 1,
        nm: '맛동산',
        majoirName: '교통공학과',
        gender: 'F',
        birthdate: '2023-07-21',
        phone: '010-2120-3636',
        createdAt: '2023-07-21',
        finishedYn: 1,
        score: 0,
      },
      {
        istudent: 11,
        studentNum: '2310008',
        grade: 1,
        nm: '겨란',
        majoirName: '국방기술학과',
        gender: 'F',
        birthdate: '2023-07-21',
        phone: '010-2120-3636',
        createdAt: '2023-07-21',
        finishedYn: 1,
        score: 0,
      },
      {
        istudent: 12,
        studentNum: '2310009',
        grade: 1,
        nm: '계란',
        majoirName: '금형설계과',
        gender: 'F',
        birthdate: '2023-07-21',
        phone: '010-2120-3636',
        createdAt: '2023-07-21',
        finishedYn: 1,
        score: 0,
      },
      {
        istudent: 13,
        studentNum: '2310010',
        grade: 1,
        nm: '다리',
        majoirName: '금속공학과',
        gender: 'F',
        birthdate: '2023-07-21',
        phone: '010-2120-3636',
        createdAt: '2023-07-21',
        finishedYn: 1,
        score: 0,
      },
    ],
  };

  return (
    <Layout>
      <SearchBar onSearch={() => console.log('search')}>
        <Dropdown
          length="short"
          placeholder="학년"
          data={gradeList}
          value={grade}
          setValue={setGrade}
          reset
        />
        <Dropdown
          length="long"
          placeholder="전공"
          data={majorList}
          value={major}
          setValue={setMajor}
          reset
          search
        />
        <Input
          length="middle"
          type="number"
          placeholder="학번"
          value={studentId}
          setValue={setStudentId}
        />
        <Input length="short" type="text" placeholder="이름" value={name} setValue={setName} />
      </SearchBar>
      <ButtonBar value="계정 생성" onClick={() => console.log('학생 추가')} />
      <Table header={tableHeader} data={data.studnets}>
        {data.studnets.map(item => {
          return (
            <div key={item.istudent}>
              <div>{item.studentNum}</div>
              <div>{item.grade}</div>
              <div>{item.nm}</div>
              <div>{item.majoirName}</div>
              <div>{item.gender === 'M' ? '남' : '여'}</div>
              <div>{item.birthdate}</div>
              <div>{item.phone}</div>
              <div>{item.createdAt}</div>
              <div>{item.finishedYn === 1 ? '재학 중' : '재학 중'}</div>
              <div>{item.score}</div>
              <div>
                <button>hihihihi</button>
              </div>
            </div>
          );
        })}
      </Table>
    </Layout>
  );
};

export default Student;
