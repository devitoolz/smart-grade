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

  // 선택된 상세보기 객체
  const [selectItem, setSelectItem] = useState(null);

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
  const handlePageBtnClick = _item => {
    console.log(_item);
    setSelectItem(_item);
    setDisplay(true);
    // setIndex(_idx);
    // console.log('aaaaaaaaaa');
  };
  //api get hook test
  const url = '/api/student/lecture-list';
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
  const [contents, setContents] = useState([]);

  useEffect(() => {
    console.log(data);

    setContents(data?.lectureList);

    console.log(data?.lectureList);
    console.log(contents);
  }, [data]);

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
        data={data?.lectureList}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {data?.lectureList?.map(item => {
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
                {dayData[item.dayWeek]}
              </div>
              <div>{item.finishedYn === 1 ? '수료' : '수강중'}</div>
              <div>
                <CommonButton
                  btnType="table"
                  color="gray"
                  value="상세보기"
                  // onClick={() => handlePageBtnClick(idx)}
                  onClick={() => handlePageBtnClick(item)}
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
              <div className="inputLectureName">{selectItem.lectureName}</div>
              <div className="grade">학년</div>
              <div className="inputGrade">{selectItem.grade}</div>
              <div className="semester">학기</div>
              <div className="inputSemester">{selectItem.isemester}</div>
              <div className="score">학점</div>
              <div className="inputScore">{selectItem.score}</div>
              <div className="lectureHour">강의시간</div>
              <div className="inputLectureHour">
                {selectItem.lectureStrTime.substr(0, 5)}~{selectItem.lectureEndTime.substr(0, 5)}
                {''} {''}
                {dayData[selectItem.dayWeek]}
              </div>
              <div className="professorName">교수명</div>
              <div className="inputProfessorName">{selectItem.professorName}</div>
              <div className="bookName">교재명</div>
              <div className="inputBookName"></div>
              <div className="LectureInfo">강의설명</div>
              <div className="inputLectureInfo">
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '280px',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                  }}
                >
                  {
                    // '안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.안녕하세요. 반가워요.'
                  }
                </div>
              </div>

              <div className="bookPic">교재사진</div>
              <div className="inputBookPic">
                <div>
                  {bookPic === true ? (
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
