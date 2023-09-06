import React from 'react';
import { useState } from 'react';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Dropdown from '../../components/Dropdown';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import Input from '../../components/Input';
import useQuerySearch from '../../hooks/useSearchFetch';
import { LectureDetail, Btn } from '../../styles/LectureRoomCss';

const Lecture = () => {
  ////searchBar////

  //학기 state
  const [semester, setSemester] = useState('');
  //강의명 state
  const [lectureName, setLectureName] = useState('');
  //교수명 state
  const [professorName, setProfessorName] = useState('');
  //검색 시 사용할 쿼리스트링
  const queries = { semester, lectureName, professorName };
  //검색 버튼 클릭 시
  const [click, setClick] = useState(false);

  //tabel header
  const tableHeader = [
    {
      title: '연도',
      width: '0.5',
    },
    {
      title: '학기 ',
      width: '0.5',
    },
    {
      title: '학년 ',
      width: '0.5',
    },
    {
      title: '강의명 ',
      width: '2',
    },
    {
      title: '담당교수 ',
      width: '0.5',
    },
    {
      title: '학점  ',
      width: '0.5',
    },
    {
      title: '강의시간',
      width: '1.5',
    },

    {
      title: '상세보기',
      width: '1',
    },
  ];

  //학기 임시 더미 데이터
  const semesterList = [
    {
      id: 1,
      title: '2022',
    },
    {
      id: 2,
      title: '2023',
    },
  ];

  //강의명 임시 더미 데이터
  const LectureNameList = [
    {
      id: '1',
      title: '산업공학의 이해',
    },
    {
      id: '2',
      title: '디자인 마케팅 개론',
    },
    {
      id: '1',
      title: '디자인실습(1)',
    },
  ];

  // 테이블 임시 더미 데이터
  const _data = [
    {
      id: '1',
      year: 2023,
      semester: '1',
      grade: '3',
      LectureName: '콘크리트 구조 이해',
      professor: '도하나',
      lectureHour: '09:00~10:00 화,목',
      score: 3,
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

  //임시로 get 확인
  // const get

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
  const { data, pending, error } = useQuerySearch(url, click);

  //searchBar dropDown
  //데이터 추후 작성

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
          <div style={{ marginBottom: '20px', borderBottom: '1px solid #dae8ff' }} />

          <LectureDetail>
            <div className="innerContainer">
              <div className="lectureName">강의명</div>
              <div className="inputLectureName">강의명들어갈자리</div>
              <div className="grade">학년</div>
              <div className="inputGrade">학년들어갈자리</div>
              <div className="professor">교수명</div>
              <div className="inputProfessor">교수명들어갈자리</div>
              <div className="score">학점</div>
              <div className="inputScore">학점들어갈자리</div>
              <div className="lectureHour">강의시간</div>
              <div className="inputLectureHour">09:00~10:00 수,목 </div>
              <div className="bookName">교재명</div>
              <div className="inputBookName">교재명들어갈자리</div>
              <div className="bookPic">교재사진</div>
              <div className="inputBookPic">
                <div></div>
              </div>
              <div className="purpose">강의목표</div>
              <div className="inputPurpose">
                강의목표들어갈자리Below you will find the CSS and HTML required to generate the
                current layout you built. The CSS has been optimized to omit any properties which
                have the default values. For example, flex-direction: row; would not be included
                since that is the default value for flex-direction.
              </div>
            </div>
          </LectureDetail>

          <Btn>
            <CommonButton btnType="modal" value="닫기" onClick={handleModalCancel} />
          </Btn>
        </CommonModal>
      ) : null}
      <div style={{ marginBottom: '94.41px' }}>
        <SearchBar queries={queries} setPage={true} setClick={setClick}>
          <Dropdown
            length="short"
            placeholder="연도"
            data={semesterList}
            value={semester}
            setValue={setSemester}
            reset
          />
          <Dropdown
            length="long"
            placeholder="강의명"
            data={LectureNameList}
            value={lectureName}
            setValue={setLectureName}
            reset
          />
          <Input
            length="long"
            type="text"
            placeholder="교수명"
            value={professorName}
            setValue={e => setProfessorName(e.target.value)}
            reset={setProfessorName}
          />
        </SearchBar>
      </div>
      <Table
        header={tableHeader}
        data={_data}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {' '}
        {_data.map(item => {
          return (
            <div key={item.id}>
              <div>{item.year}</div>
              <div>{item.semester}</div>
              <div>{item.grade}</div>
              <div>{item.LectureName}</div>
              <div>{item.professor}</div>
              <div>{item.score}</div>
              <div>{item.lectureHour}</div>

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
