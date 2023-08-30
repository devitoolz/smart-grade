import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import { useSelector } from 'react-redux';
import ButtonBar from '../../components/ButtonBar';
import Table from '../../components/Table';
import { useNavigate } from 'react-router-dom';
import useQuerySearch from '../../hooks/useSearchFetch';
import CommonButton from '../../components/CommonButton';
import { RootState } from '../../store';
import { ObjectType } from '../../types/components';

const Student = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState<boolean>(false);

  const gradeList = Array(4)
    .fill('')
    .map((_, index) => {
      return { id: index + 1, title: index + 1 + '학년' };
    });

  const [grade, setGrade] = useState<string | number | null>(null);
  const [imajor, setImajor] = useState<string | number | null>(null);
  const [studentNum, setStudentNum] = useState<string>('');
  const [nm, setNm] = useState<string>('');

  const { allMajorList } = useSelector((state: RootState) => state.major);

  const tableHeader = [
    { title: '학번', width: 2 },
    { title: '학년', width: 1 },
    { title: '전공', width: 4 },
    { title: '이름', width: 2 },
    { title: '성별', width: 1 },
    { title: '생년월일', width: 2.5 },
    { title: '전화번호', width: 3 },
    { title: '입학년도', width: 2.5 },
    { title: '졸업여부', width: 2 },
    { title: '이수학점', width: 2 },
    { title: '상세보기', width: 2 },
  ];

  const queries = { grade, imajor, studentNum, nm };
  const url = '/api/admin/students';

  const { data, pending, error } = useQuerySearch(url, click);

  const studentsList: Array<ObjectType> = (data as ObjectType)?.students;

  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
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
          data={allMajorList}
          propertyName={{ key: 'imajor', value: 'majorName' }}
          value={imajor}
          setValue={setImajor}
          reset
          search
        />
        <Input
          length="middle"
          type="number"
          placeholder="학번"
          reset={setStudentNum}
          value={studentNum}
          setValue={e => setStudentNum(e.target.value)}
        />
        <Input
          length="short"
          type="text"
          placeholder="이름"
          reset={setNm}
          value={nm}
          setValue={e => setNm(e.target.value)}
        />
      </SearchBar>
      <ButtonBar
        value="계정 생성"
        onClick={() => navigate('/admin/user/create', { state: 'students' })}
      />
      <Table
        header={tableHeader}
        data={studentsList}
        hasPage={true}
        maxPage={(data as ObjectType)?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {studentsList?.map(item => {
          return (
            <div key={item.istudent}>
              <div>{item.studentNum}</div>
              <div>{item.grade}</div>
              <div>{item.majorName}</div>
              <div>{item.nm}</div>
              <div>{(item.gender === 'M' && '남') || (item.gender === 'F' && '여')}</div>
              <div>{item.birthdate}</div>
              <div>{item.phone}</div>
              <div>{item.createdAt}</div>
              <div>{(item.finishedYn === 1 && '재학 중') || (item.finishedYn === 2 && '졸업')}</div>
              <div>{item.score}</div>
              <div>
                <CommonButton
                  btnType="table"
                  value="상세보기"
                  color="gray"
                  onClick={() => navigate(`${item.istudent}`, { state: 'students' })}
                ></CommonButton>
              </div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default Student;
