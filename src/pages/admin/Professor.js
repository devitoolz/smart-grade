import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import { useSelector } from 'react-redux';
import ButtonBar from '../../components/ButtonBar';
import { useNavigate } from 'react-router-dom';
import useQuerySearch from '../../hooks/useSearchFetch';
import Table from '../../components/Table';

const Professor = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const [imajor, setImajor] = useState(null);
  const [name, setName] = useState('');

  const { majorList } = useSelector(state => state.major);

  const tableHeader = [
    { title: '전공', width: 1 },
    { title: '이름', width: 1 },
    { title: '성별', width: 1 },
    { title: '생년월일', width: 1 },
    { title: '전화번호', width: 1 },
    { title: '등록일', width: 1 },
    { title: '퇴직여부', width: 1 },
    { title: '상세보기', width: 1 },
  ];

  const queries = { imajor, name };
  const url = '/api/admin/professor';

  const { data, pending, error } = useQuerySearch(url, click);

  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          length="long"
          placeholder="전공"
          data={majorList}
          value={imajor}
          setValue={setImajor}
          reset
          search
        />
        <Input
          length="short"
          type="text"
          placeholder="이름"
          reset={setName}
          value={name}
          setValue={e => setName(e.target.value)}
        />
      </SearchBar>
      <ButtonBar
        value="계정 생성"
        onClick={() => navigate('/admin/user/create?role=professor', { state: 'professor' })}
      />
      <Table
        header={tableHeader}
        data={data?.professors}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {data?.professors.map(item => {
          return (
            <div key={item.iprofessor}>
              <div>{item.majorName}</div>
              <div>{item.nm}</div>
              <div>{item.gender === 'M' ? '남' : '여'}</div>
              <div>{item.birthdate}</div>
              <div>{item.phone}</div>
              <div>{item.createdAt}</div>
              <div>{item.delYn === 1 ? '퇴직' : '재직 중'}</div>
              <div>
                <button>hihihihi</button>
              </div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default Professor;
