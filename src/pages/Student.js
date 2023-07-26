import React, { useEffect, useState } from 'react';
import { TableArea } from '../styles/MyStyleCSS';
import { Layout } from '../styles/CommonStyle';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';

const Student = () => {
  const gradeList = Array(4)
    .fill()
    .map((_, index) => {
      return { id: index + 1, title: index + 1 + '학년' };
    });

  const [grade, setGrade] = useState(null);
  const [majorList, setMajorList] = useState([]);
  const [major, setMajor] = useState(null);

  useEffect(() => {
    const majorData = [
      { id: 1, title: '내용 1' },
      { id: 2, title: '내용 2' },
      { id: 3, title: '내용 3' },
      { id: 4, title: '내용 4' },
      { id: 5, title: '내용 5' },
    ];

    setMajorList(majorData);
  }, []);

  const arr = [
    {
      a: '1',
      b: '2',
      c: '컴퓨터공학과',
      d: '데이터베이스',
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
      d: '웹프로그래밍',
      e: '김그린',
      f: '3',
      g: '6호관 404호',
      h: '2000-03-02~2000-06-28',
      i: '14:00~17:00',
      j: 30,
      k: '상태',
    },
  ];

  return (
    <Layout>
      <SearchBar onSearch={() => console.log(grade, major)}>
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
      </SearchBar>
      <TableArea>
        <table>
          <thead>
            {/*
      pink = short
      yellow = middle
      lightgreen = 고정
     */}
            <tr>
              <th style={{ background: 'pink' }}>학기</th>
              <th style={{ background: 'pink' }}>학년</th>
              <th>전공</th>
              <th>강의명</th>
              <th style={{ background: 'yellow' }}>담당교수</th>
              <th style={{ background: 'pink' }}>학점</th>
              <th>강의실</th>
              <th>강의 기간</th>
              <th>강의 시간</th>
              <th style={{ background: 'pink' }}>정원</th>
              <th style={{ background: 'yellow' }}>상태</th>
              <th style={{ background: 'lightgreen' }}>상세</th>
            </tr>
          </thead>
          <tbody>
            {arr.map((item, idx) => (
              <tr key={idx}>
                <td>{item.a}</td>
                <td>{item.b}</td>
                <td>{item.c}</td>
                <td>{item.d}</td>
                <td>{item.e}</td>
                <td>{item.f}</td>
                <td>{item.g}</td>
                <td>{item.h}</td>
                <td>{item.i}</td>
                <td>{item.j}</td>
                <td>{item.k}</td>
                <td>
                  <button>상세보기</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableArea>
    </Layout>
  );
};

export default Student;
