import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Dropdown from '../../components/Dropdown';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import useQuerySearch from '../../hooks/useSearchFetch';
import {
  ProfessorCaution,
  ProfessorLectureDetail,
  ProfessorLectureBtn,
} from '../../styles/LectureRoomCss';
import { dayData } from '../../modules/timetable';
const Lecture = () => {
  ////searchBar////

  //연도 state
  const [year, setYear] = useState('');
  //강의명 state
  const [lectureName, setLectureName] = useState('');
  //책 사진
  const [bookPic] = useState('');

  //검색 시 사용할 쿼리스트링
  const queries = { year, lectureName };

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
      width: '1.5',
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
      title: '상태',
      width: '1',
    },
    {
      title: '삭제여부',
      width: '1',
    },
    {
      title: '상세보기',
      width: '1',
    },
  ];

  //학기 임시 더미 데이터
  // const semesterList = [
  //   {
  //     id: 1,
  //     title: '2017',
  //   },
  //   {
  //     id: 2,
  //     title: '2018',
  //   },
  //   {
  //     id: 3,
  //     title: '2019',
  //   },
  //   {
  //     id: 4,
  //     title: '2020',
  //   },
  //   {
  //     id: 4,
  //     title: '2021',
  //   },
  //   {
  //     id: 4,
  //     title: '2022',
  //   },
  //   {
  //     id: 4,
  //     title: '2023하드',
  //   },
  // ];

  //임시 더미 데이터
  // const _data = [
  //   {
  //     id: '1',
  //     year: '1',
  //     semester: 2,
  //     grade: '3',
  //     LectureName: '콘크리트 구조 이해',
  //     lectureRoom: '백매관 303호',
  //     score: 3,
  //     lectureHour: '09:00~10:00 수,목',
  //     maxCapacity: '25 / 30',
  //   },
  //   {
  //     id: '2 ',
  //     content: '1',
  //   },
  //   {
  //     id: '3 ',
  //     content: '1',
  //   },
  //   {
  //     id: '4 ',
  //     content: '1',
  //   },
  //   {
  //     id: '5 ',
  //     content: '1',
  //   },
  //   {
  //     id: '6  ',
  //     content: '1',
  //   },
  //   {
  //     id: '7   ',
  //     content: '1',
  //   },
  //   {
  //     id: '8    ',
  //     content: '1',
  //   },
  //   {
  //     id: '9',
  //     content: '1',
  //   },
  //   {
  //     id: '10',
  //     content: '1',
  //   },
  // ];

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

  // 교수 강의조회 상세보기 modal창 get
  const professor = useQuerySearch('/api/professor/lecture/list');

  //api get hook test
  const url = `/api/professor/lecture-list`;

  const { data, pending, error } = useQuerySearch(url, click);
  // 연도 드랍다운 데이터
  const yearList = [];
  data?.yearList?.forEach(item => {
    yearList.push({ id: item.year, title: item.year });
  });

  //강의명 드랍다운 데이터
  const LectureNameList = [];
  data?.lectureList?.forEach(item => {
    LectureNameList.push({ id: item.lectureName, title: item.lectureName });
  });

  return (
    <div>
      <div style={{ marginBottom: '94.41px' }}>
        <SearchBar queries={queries} setPage={true} setClick={setClick}>
          <Dropdown
            length="short"
            placeholder="연도"
            data={yearList}
            value={year}
            setValue={setYear}
            reset
            search
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
        data={data?.lectureList}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {data?.lectureList?.map(item => {
          return (
            <div key={item.ilecture}>
              <div>{item.year}</div>
              <div>{item.isemester}</div>
              <div>{item.gradeLimit}</div>

              <div>{item.lectureName}</div>
              <div>
                {item.buildingName}
                {''} {''}
                {item.lectureRoomName}호
              </div>

              <div>{item.score}</div>
              <div>
                {item.lectureStrTime.substr(0, 5)}~{item.lectureEndTime.substr(0, 5)}
                {''} {''}
                {dayData[item.dayWeek]}
              </div>
              <div>{item.lectureMaxPeople}</div>
              <div>
                {item.openingProceudres === 0
                  ? '반려'
                  : item.openingProceudres === 1
                  ? '신청'
                  : item.openingProceudres === 2
                  ? '신청완료모집'
                  : item.openingProceudres === 3
                  ? '개강'
                  : item.openingProceudres === 4
                  ? '종료'
                  : null}
              </div>
              <div>{item.delYn === 0 ? null : '삭제'}</div>
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

      {display === true
        ? professor.data?.lectureList?.map(item => {
            return (
              <div key={item.idx}>
                <CommonModal
                  setDisplay={setDisplay}
                  modalSize="big"
                  modalTitle="강의 상세정보"
                  handleModalOk={handleModalOk}
                  handleModalCancel={handleModalCancel}
                >
                  <div style={{ marginBottom: '20px', borderBottom: '1px solid #dae8ff' }} />
                  <ProfessorCaution>
                    <p>* 수정사항이 있을 시 전산실로 연락 주시기 바랍니다.</p>
                    <p className="callNum">전산실 전화번호: 053-000-0000</p>
                  </ProfessorCaution>
                  <ProfessorLectureDetail>
                    <div className="innerContainer">
                      <div className="lectureName">강의명</div>
                      <div className="inputLectureName">{item.lectureName}</div>
                      <div className="grade">학년</div>
                      <div className="inputGrade">{item.gradeLimit}</div>
                      <div className="semester">학기</div>
                      <div className="inputSemester">{item.isemester}</div>
                      <div className="score">학점</div>
                      <div className="inputScore">{item.score}</div>
                      <div className="lectureHour">강의시간</div>
                      <div className="inputLectureHour">
                        {item.lectureStrTime.substr(0, 5)}~{item.lectureEndTime.substr(0, 5)}
                        {''} {''}
                        {dayData[item.dayWeek]}
                      </div>
                      <div className="capacity">정원</div>
                      <div className="inputCapacity">{item.attendance}</div>
                      <div className="bookName">교재명</div>
                      <div className="inputBookName">{item.textbook}</div>
                      <div className="LectureInfo">강의설명</div>
                      <div className="inputLectureInfo">{item.ctnt}</div>

                      <div className="bookPic">교재사진</div>
                      <div className="inputBookPic">
                        <div>
                          {bookPic === true ? (
                            <img src={item?.bookUrl} alt="교재 이미지" />
                          ) : (
                            <div className="icon">
                              <FontAwesomeIcon icon={faBook} className="fa-4x" />
                              <p>교재가 없습니다.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </ProfessorLectureDetail>

                  <ProfessorLectureBtn>
                    <CommonButton btnType="modal" value="닫기" onClick={handleModalCancel} />
                  </ProfessorLectureBtn>
                </CommonModal>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Lecture;
