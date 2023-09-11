import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../../components/CommonButton';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import useQuerySearch from '../../hooks/useSearchFetch';

const StudentsDetail = () => {
  const [majorName, setMajor] = useState('');
  const [grade, setGrade] = useState('');
  const [major, setMojor] = useState('');
  const [studentID, setStudentID] = useState('');
  const [studentName, setStudentName] = useState('');
  const queries = { majorName };
  const url = `/api/student/detail`;
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
      title: '전화번호',
      width: '1.5',
    },
  ];
  return (
    <div>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          length="short"
          placeholder="학년"
          data={data?.profile?.grade}
          propertyName={{ key: 'id', value: 'title' }}
          value={grade}
          setValue={setGrade}
          reset
          search
        />
        <Dropdown
          length="long"
          placeholder="전공"
          data={data?.profile?.majorName}
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

      <CommonButton btnType="page" value="상세보기" onClick={pagemove} />
      <Table
        header={tableHeader}
        data={data?.profile}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
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

export default StudentsDetail;
