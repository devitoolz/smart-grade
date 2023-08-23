import React from 'react';
import { useState } from 'react';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';

const Students = () => {
  ////searchBar////
  //쿼리스트링
  const queries = {};

  //검색 버튼 클릭 시
  const [click, setClick] = useState(false);

  //tabel pending
  const [pending, setPending] = useState(false);
  //tabel error
  const [error, setError] = useState(false);
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
  //임시데이터
  const data = [
    {
      id: '1',
      grade: '3',
      major: '산업디자인',
      StudentID: 23720004,
      name: '도하나',
      phoneNumber: '010 - 1234 - 5678',
    },
    {
      id: '2 ',
      content: '1',
    },
    {
      id: '3 ',
      content: '1',
    },
    {
      id: '4 ',
      content: '1',
    },
    {
      id: '5 ',
      content: '1',
    },
  ];

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
  //상세보기 버튼 클릭시
  const handlePageBtnClick = () => {
    setDisplay(true);
  };

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
        <Dropdown length="short" placeholder="학년" />
        <Dropdown length="long" placeholder="전공" />
        <Input length="long" type="number" placeholder="학번" maxLength={8} />
        <Input length="short" type="text" placeholder="이름" />
      </SearchBar>
      <Table
        header={tableHeader}
        data={data}
        hasPage={true}
        maxPage={5}
        pending={pending}
        error={error}
      >
        {' '}
        {data.map(item => {
          return (
            <div key={item.id}>
              <div>{item.grade}</div>
              <div>{item.major}</div>
              <div>{item.StudentID}</div>
              <div>{item.name}</div>
              <div>{item.phoneNumber}</div>
            </div>
          );
        })}
      </Table>
    </div>
  );
};

export default Students;
