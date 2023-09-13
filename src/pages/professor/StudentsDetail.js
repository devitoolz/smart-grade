import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../../components/CommonButton';
import Input from '../../components/Input';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import useQuerySearch from '../../hooks/useSearchFetch';

const StudentsDetail = () => {
  //searchBar 학번 state
  const [studentID, setStudentID] = useState('');
  //searchBar 이름 state
  const [studentName, setStudentName] = useState('');

  const queries = { studentID, studentName };

  const url = `/api/professor/grade/list`;

  const [click, setClick] = useState(false);
  const { data, pending, error } = useQuerySearch(url, click);

  const navigate = useNavigate();
  const pagemove = () => {
    navigate('/professor/students');
  };
  const tableHeader = [
    {
      title: '학년',
      width: '0.5',
    },
    {
      title: '전공 ',
      width: '1',
    },
    {
      title: '학번',
      width: '1',
    },
    {
      title: '이름 ',
      width: '0.5',
    },
    {
      title: '성별',
      width: '0.5',
    },
    {
      title: '전화번호',
      width: '1.0',
    },
  ];
  
  return (
    <div>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
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

      <CommonButton btnType="page" value="상세보기" onClick={pagemove} />
      <Table
        header={tableHeader}
        data={data?.lecturelist}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {data?.lecturelist?.map(item => {
          return (
            <div key={item.ilectureStudent}>
              <div>{item.grade}</div>
              <div>{item.majorName}</div>
              <div>{item.studentNum}</div>
              <div>{item.studentName}</div>
              <div>{item.gender === 'M' ? '남' : '여'}</div>
              <div>{item.phone}</div>
            </div>
          );
        })}
      </Table>
    </div>
  );
};
export default StudentsDetail;
