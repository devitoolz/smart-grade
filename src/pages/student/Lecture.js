import React from 'react';
import { useState } from 'react';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Dropdown from '../../components/Dropdown';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import Input from '../../components/Input';
import useQuerySearch from '../../hooks/useSearchFetch';

const Lecture = () => {
  ////searchBar////
  //강의명 state
  const [ilectureName, setIlectureName] = useState('');
  //교수명 state
  const [professorName, setProfessorName] = useState('');
  //검색 시 사용할 쿼리스트링
  const queries = { ilectureName, professorName };
  //검색 버튼 클릭 시
  const [click, setClick] = useState(false);

  //tabel header
  const tableHeader = [
    {
      title: '학기',
      width: '0.5',
    },
    {
      title: '학년제한 ',
      width: '0.7',
    },
    {
      title: '전공 ',
      width: '2',
    },
    {
      title: '강의명 ',
      width: '2',
    },
    {
      title: '담당교수 ',
      width: '1',
    },
    {
      title: '학점  ',
      width: '0.5',
    },
    {
      title: '강의실   ',
      width: '1.5',
    },
    {
      title: '강의시간    ',
      width: '2',
    },
    {
      title: '정원',
      width: '0.5',
    },
    {
      title: '상세보기',
      width: '1',
    },
  ];
  //임시데이터
  const data = [
    {
      id: '1',
      semester: '1',
      gradeLimit: '3',
      major: '산업디자인',
      LectureName: '콘크리트 구조 이해',
      professor: '도하나',
      score: 3,
      lectureLoom: '백매관 303호',
      lectureHour: '09:00~10:00',
      maxCapacity: 30,
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
    {
      id: '6  ',
      content: '1',
    },
    {
      id: '7   ',
      content: '1',
    },
    {
      id: '8    ',
      content: '1',
    },
    {
      id: '9',
      content: '1',
    },
    {
      id: '10',
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
  //api get hook test
  const url = '';
  //더미데이터 삭제후 _data변수명 변경 예정
  const { _data, pending, error } = useQuerySearch(url, click);

  return (
    <div>
      {display === true ? (
        <CommonModal
          setDisplay={setDisplay}
          modalSize="big"
          modalTitle="강의 상세정보"
          handleModalOk={handleModalOk}
          handleModalCancel={handleModalCancel}
        >
          <p>강의명</p>
          {''} <p>세로토닌과 코르티솔의 상관관계</p>
        </CommonModal>
      ) : null}
      <div style={{ marginBottom: '94.41px' }}>
        <SearchBar queries={queries} setPage={true} setClick={setClick}>
          <Dropdown length="long" placeholder="강의명" />
          <Input length="long" type="text" placeholder="교수명" />
        </SearchBar>
      </div>
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
              <div>{item.semester}</div>
              <div>{item.gradeLimit}</div>
              <div>{item.major}</div>
              <div>{item.LectureName}</div>
              <div>{item.professor}</div>
              <div>{item.score}</div>
              <div>{item.lectureLoom}</div>
              <div>{item.lectureHour}</div>
              <div>{item.maxCapacity}</div>
              <div>
                <CommonButton
                  btnType="table"
                  color="gray"
                  value="상세보기"
                  onClick={handlePageBtnClick}
                />
              </div>
            </div>
          );
        })}
      </Table>
    </div>
  );
};

export default Lecture;
