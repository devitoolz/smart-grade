import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { BtnControl } from '../../styles/LectureRoomCss';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import { Layout } from '../../styles/CommonStyle';
import CommonButton from '../../components/CommonButton';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';

const Notice = () => {
  ////SearchBar////
  //SearchBar queries
  const queries = {};
  //검색버튼 클릭 state 변경 함수
  const [click, setClick] = useState(false);
  ////Input창////
  //input value값
  const [value, setValue] = useState('');
  //input value change 함수
  const handleChangeValue = e => {
    setValue(e.target.value);
  };

  ////Table////
  //table header
  const tableHeader = [
    { title: 'NO.', width: '1' },
    { title: '제목', width: '4' },
    { title: 'DATE', width: '2' },
    { title: '관리', width: '3' },
  ];

  const [pending, setPending] = useState(false);

  const data = [
    { iboard: 1, _title: '서문, 북문 포교행위자 주의 바랍니다.', createdAt: '0000-00-00', gg: 1 },
  ];
  const navigate = useNavigate();

  return (
    <>
      <SearchBar queries={data._title} setPage={true} setClick={setClick}>
        <Input
          length="long"
          type="text"
          placeholder="제목"
          value={''}
          setValue={handleChangeValue}
          reset={setValue}
          maxLength={20}
        />
      </SearchBar>
      <Table header={tableHeader} data={data} hasPage={true} maxPage={5} pending={pending}>
        {data.map(item => {
          return (
            <div key={item.iboard}>
              <div>{item.iboard}</div>
              <div>{item._title}</div>
              <div>{item.createdAt}</div>
              <div>{item.gg}</div>
            </div>
          );
        })}
      </Table>
      <BtnControl>
        <CommonButton
          btnType="page"
          value="글쓰기"
          onClick={() => {
            navigate('/admin/home/notice/write');
          }}
        />
      </BtnControl>
    </>
  );
};

export default Notice;
