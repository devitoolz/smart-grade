import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Dropdown from '../../components/Dropdown';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import Input from '../../components/Input';
import useQuerySearch from '../../hooks/useSearchFetch';
import { StudentLectureDetail, StudentLectureBtn } from '../../styles/LectureRoomCss';
import { dayData } from '../../modules/timetable';
const Lecture = () => {
  ////searchBar////

  //연도 state
  const [year, setYear] = useState('');

  //강의명 state
  const [lectureName, setLectureName] = useState('');
  //교수명 state
  const [professorName, setProfessorName] = useState('');
  //검색 시 사용할 쿼리스트링
  const queries = { year, lectureName, professorName };
  //검색 버튼 클릭 시
  const [click, setClick] = useState(false);

  //책 사진
  const [bookPic] = useState('');
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
      title: '상태',
      width: '0.5',
    },

    {
      title: '상세보기',
      width: '1',
    },
  ];

  //연도 임시 더미 데이터
  const yearList = [
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
  const handlePageBtnClick = _idx => {
    setDisplay(true);
    setIndex(_idx);
    console.log('aaaaaaaaaa');
  };
  //api get hook test
  const url = '/api/student/lecture-list';
  const { data, pending, error } = useQuerySearch(url, click);
  const [contents, setContents] = useState([]);
  const [index, setIndex] = useState();
  useEffect(() => {
    console.log(data);
    setContents(data?.lectureList);
    console.log(data?.lectureList);
    console.log(contents);
  }, [data]);

  //searchBar dropDown
  //데이터 추후 작성

  return (
    <div>
      <div style={{ marginBottom: '94.41px' }}>
        <SearchBar queries={queries} setPage={true} setClick={setClick}>
          <Dropdown
            length="short"
            placeholder="연도"
            data={data?.lectureList?.year}
            value={year}
            setValue={setYear}
            reset
          />
          <Dropdown
            length="long"
            placeholder="강의명"
            data={data?.lectureList?.lectureName}
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
        data={data?.lectureList}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {data?.lectureList?.map((item, idx) => {
          return (
            <div key={item.idx}>
              <div>{item.year}</div>
              <div>{item.isemester}</div>
              <div>{item.grade}</div>
              <div>{item.lectureName}</div>
              <div>{item.professorName}</div>
              <div>{item.score}</div>
              <div>
                {item.lectureStrTime.substr(0, 5)}~{item.lectureEndTime.substr(0, 5)}
                {''} {''}
                {dayData[item.dayWeek].charAt(0)}
              </div>
              <div>{item.finishedYn === 1 ? '수료' : '수강중'}</div>
              <div>
                <CommonButton
                  btnType="table"
                  color="gray"
                  value="상세보기"
                  onClick={() => handlePageBtnClick(idx)}
                />
              </div>
            </div>
          );
        })}
      </Table>

      {display === true ? (
        <CommonModal
          setDisplay={setDisplay}
          modalSize="big"
          modalTitle="강의 상세정보"
          handleModalOk={handleModalOk}
          handleModalCancel={handleModalCancel}
        >
          <div style={{ marginBottom: '20px', borderBottom: '1px solid #dae8ff' }} />

          <StudentLectureDetail>
            <div className="innerContainer">
              <div className="lectureName">강의명</div>
              <div className="inputLectureName">{contents[index]?.lectureName}</div>
              <div className="grade">학년</div>
              <div className="inputGrade">{contents[index]?.grade}</div>
              <div className="semester">학기</div>
              <div className="inputSemester">{contents[index]?.isemester}</div>
              <div className="score">학점</div>
              <div className="inputScore">{contents[index]?.score}</div>
              <div className="lectureHour">강의시간</div>
              <div className="inputLectureHour">
                {contents[index]?.lectureStrTime}~{contents[index]?.lectureEndTime}
                {''} {contents[index]?.dayWeek}
              </div>
              <div className="professorName">교수명</div>
              <div className="inputProfessorName">{contents[index]?.professorName}</div>
              <div className="bookName">교재명</div>
              <div className="inputBookName"></div>
              <div className="LectureInfo">강의설명</div>
              <div className="inputLectureInfo"></div>

              <div className="bookPic">교재사진</div>
              <div className="inputBookPic">
                <div>
                  {bookPic === false ? (
                    <img
                      src="https://shopping-phinf.pstatic.net/main_3247335/32473359191.20221019132422.jpg"
                      alt="교재 이미지"
                    />
                  ) : (
                    <div className="icon">
                      <FontAwesomeIcon icon={faBook} className="fa-4x" />
                      <p>교재가 없습니다.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </StudentLectureDetail>

          <StudentLectureBtn>
            <CommonButton btnType="modal" value="닫기" onClick={handleModalCancel} />
          </StudentLectureBtn>
        </CommonModal>
      ) : null}
    </div>
  );
};

export default Lecture;
