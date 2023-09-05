import React from 'react';
import { useState } from 'react';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Dropdown from '../../components/Dropdown';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import useQuerySearch from '../../hooks/useSearchFetch';
import { LectureDetail, Btn, Caution, ModalWrap } from '../../styles/LectureRoomCss';
const Lecture = () => {
  ////searchBar////

  //학기 state
  const [semester, setSemester] = useState('');
  //강의명 state
  const [lectureName, setLectureName] = useState('');

  //검색 시 사용할 쿼리스트링
  const queries = { semester, lectureName };

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
      title: '강의실  ',
      width: '1.5',
    },
    {
      title: '학점    ',
      width: '0.5',
    },
    {
      title: '강의시간   ',
      width: '1.5',
    },

    {
      title: '정원',
      width: '1',
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
      title: '2017',
    },
    {
      id: 2,
      title: '2018',
    },
    {
      id: 3,
      title: '2019',
    },
    {
      id: 4,
      title: '2020',
    },
    {
      id: 4,
      title: '2021',
    },
    {
      id: 4,
      title: '2022',
    },
    {
      id: 4,
      title: '2023하드',
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
      id: '3',
      title: '디자인실습(1)',
    },
  ];

  //임시 더미 데이터
  const _data = [
    {
      id: '1',
      year: '1',
      semester: 2,
      grade: '3',
      LectureName: '콘크리트 구조 이해',
      lectureRoom: '백매관 303호',
      score: 3,
      lectureHour: '09:00~10:00 수,목',
      maxCapacity: '25 / 30',
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

  const { data, pending, error } = useQuerySearch(url, click);
  return (
    <div>
      {display === true ? (
        <ModalWrap>
          <CommonModal
            setDisplay={setDisplay}
            modalSize="big"
            modalTitle="강의 상세정보"
            handleModalOk={handleModalOk}
            handleModalCancel={handleModalCancel}
          >
            <div style={{ marginBottom: '20px', borderBottom: '1px solid #dae8ff' }} />
            <Caution>
              <p>* 수정사항이 있을 시 전산실로 연락 주시기 바랍니다.</p>
              <p className="callNum">전산실 전화번호: 053-000-0000</p>
            </Caution>
            <LectureDetail>
              <div className="innerContainer">
                <div className="lectureName">강의명</div>
                <div className="inputLectureName">강의명들어갈자리</div>
                <div className="grade">학년</div>
                <div className="inputGrade">학년들어갈자리</div>
                <div className="semester">학기</div>
                <div className="inputSemester">학기들어갈자리</div>
                <div className="score">학점</div>
                <div className="inputScore">학점들어갈자리</div>
                <div className="lectureHour">강의시간</div>
                <div className="inputLectureHour">09:00~10:00 수,목 </div>
                <div className="capacity">정원</div>
                <div className="inputCapacity">현재인원/최대인원</div>
                <div className="bookName">교재명</div>
                <div className="inputBookName">교재명들어갈자리</div>
                <div className="LectureInfo">강의설명</div>
                <div className="inputLectureInfo">
                  최근 기술 혁신과 성장은 대부분 클라우드를 기반으로 하고 있으며, 4차 산업혁명의
                  기술은 클라우드를 통해 컴퓨팅 파워와 플랫폼을 제공받고 있다. 클라우드에 대한 기본/
                  응용 지식은 향후 전개될 IT 서비스 운영/개발에 필수 역량이 되어가고 있다. 이 수업은
                  클라우드 컴퓨팅 핵심 이론을 이해하고, 산업 현장에서 실제 활용되고 있는 기술을
                  실습함으로써 참여자의 역량을 증진할 것이다. 수업 이수 후 대학원 과정에서 필요한
                  연구 분야에서 활용할 수 있으며, 향후 진로에 도움이 될 수 있는 이론 및 실무 역량을
                  쌓는데 기여할 것이다.
                </div>

                <div className="bookPic">교재사진</div>
                <div className="inputBookPic">
                  <div>
                    <img
                      src="https://shopping-phinf.pstatic.net/main_3247335/32473359191.20221019132422.jpg"
                      alt="교재 이미지"
                    />
                  </div>
                </div>
              </div>
            </LectureDetail>

            <Btn>
              <CommonButton btnType="modal" value="닫기" onClick={handleModalCancel} />
            </Btn>
          </CommonModal>
        </ModalWrap>
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
              <div>{item.lectureRoom}</div>

              <div>{item.score}</div>
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
