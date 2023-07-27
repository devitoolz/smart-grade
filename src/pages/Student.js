import React, { useState } from 'react';
import { Layout } from '../styles/CommonStyle';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import { useSelector } from 'react-redux';

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

  // const tableHeader = [
  //   { title: '학번', width: null },
  //   { title: '학년', width: null },
  //   { title: '전공', width: null },
  //   { title: '이름', width: null },
  //   { title: '성별', width: null },
  //   { title: '생년월일', width: null },
  //   { title: '입학년도', width: null },
  //   { title: '졸업\n여부', width: null },
  //   { title: '이수\n학점', width: null },
  //   { title: '상세\n보기', width: null },
  // ];

  return (
    <Layout>
      <SearchBar onSearch={() => console.log(grade, major, studentId, name)}>
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
    </Layout>
  );
};

export default Student;
