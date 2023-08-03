import React, { useEffect, useState } from 'react';
import { LectureContainer, TableArea, TempStyle, NoData } from '../../styles/MyStyleCSS';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CommonButton from '../../components/CommonButton';
import Dropdown from '../../components/Dropdown';
import CommonModal from '../../components/CommonModal';
import { Layout } from '../../styles/CommonStyle';
import Table from '../../components/Table';
import { handleTestClick, getStudentList } from '../../api/fetch';
import useQuerySearch from '../../hooks/useSearchFetch';

const Lecture = () => {
  const { pathname, search } = useLocation();
  // console.log(pathname);
  // console.log(search);
  const pageIdx = !search.length ? 1 : search.split('?')[1].split('=')[1];
  console.log(pageIdx);
  const [display, setDisplay] = useState(false);
  const [contents, setContents] = useState({});
  // table maxPage
  const [maxPage, setMaxPage] = useState(0);

  const handlePageBtnClick = () => {
    console.log('btn click');
    navigate(`${pathname}/approval`);
  };

  // 드롭다운 테스트
  const [lectureName, setLectureName] = useState();
  const [lectureStatus, setLectureStatus] = useState();
  const datas = [
    {
      id: 1,
      title: '1번',
    },
    {
      id: 2,
      title: '2번',
    },
  ];
  const navigate = useNavigate();
  const [professorName, setProfessorName] = useState('');

  // table
  const tableHeader = [
    { title: '학기', width: 1 },
    { title: '학년제한', width: 1 },
    { title: '전공', width: 2 },
    { title: '강의명', width: 3 },
    { title: '담당교수', width: 1.2 },
    { title: '학점', width: 1 },
    { title: '강의실', width: 1.8 },
    { title: '강의 기간', width: 3 },
    { title: '강의 시간', width: 1.5 },
    { title: '정원', width: 1 },
    { title: '상태', width: 1 },
    { title: '상세', width: 1.5 },
  ];
  const tableData = [
    {
      a: '1',
      b: '2',
      c: '컴퓨터공학과',
      lecture: '데이터베이스',
      e: '김그린',
      f: '2',
      g: '6호관 404호',
      h: '2000-03-02~2000-06-28',
      i: '09:00~11:00',
      j: 30,
      k: '상태',
    },
    {
      a: '1',
      b: '3',
      c: '컴퓨터공학과',
      lecture: '웹프로그래밍',
      e: '김그린',
      f: '3',
      g: '6호관 404호',
      h: '2000-03-02~2000-06-28',
      i: '14:00~17:00',
      j: 30,
      k: '상태',
    },
  ];
  // 쿼리
  const [click, setClick] = useState(false);
  const queries = { lectureStatus, lectureName, professorName };
  const url = '';
  // const url = '/api/admin/bachelor/lecture';

  const { data, pending } = useQuerySearch(url, click);

  // 서버연동 테스트 - 테이블에 정보 불러오기
  const [tableDatas, setTableDatas] = useState([]);
  const getTestData = async () => {
    await handleTestClick(setTableDatas, setMaxPage);
  };
  // 서버연동 테스트 - 해당 과목 학생리스트 불러오기
  const [lectureNm, setLectureNm] = useState();
  const handlegetStudentList = async (_lectureNm, _ilecture, _pageIdx) => {
    setLectureNm(_lectureNm);
    // console.log('해당 과목 수강 학생 리스트 및 성적 출력');
    // ilecture = 해당 강의 과목 번호
    const result = await getStudentList(_ilecture, _pageIdx);
    setContents(result.list);
    setDisplay(true);
  };
  useEffect(() => {
    getTestData();
  }, []);

  // 모달 - 해당강의 학생리스트+성적 확인
  const modalHeader = [
    { title: 'No', width: 1 },
    { title: '이름', width: 2 },
    { title: '학과', width: 3 },
    { title: '출석', width: 1 },
    { title: '중간', width: 1 },
    { title: '기말', width: 1 },
    { title: '총점', width: 1 },
    { title: '평균', width: 1 },
    { title: '등급', width: 1 },
  ];

  // JSX
  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          length="short"
          placeholder="강의상태"
          data={datas}
          value={lectureStatus}
          setValue={setLectureStatus}
          reset={true}
        />
        <Dropdown
          length="long"
          placeholder="강의명"
          data={datas}
          value={lectureName}
          setValue={setLectureName}
          reset={true}
        />
        <Input
          length="short"
          type="string"
          placeholder="교수명"
          value={professorName}
          setValue={setProfessorName}
        />
      </SearchBar>

      <CommonButton btnType="page" value="강의 개설 관리" onClick={handlePageBtnClick} />

      <Table
        header={tableHeader}
        data={tableDatas}
        hasPage={true}
        maxPage={maxPage}
        pending={pending}
      >
        {tableDatas?.map((item, idx) => {
          return (
            <div key={idx}>
              <div>{item.semester}</div>
              <div>{item.gradeLimit}</div>
              <div>{item.majorName}</div>
              <div>{item.lectureNm}</div>
              <div>{item.nm}</div>
              <div>{item.score}</div>
              <div>
                {item.buildingNm} {item.lectureRoomNm}
              </div>
              <div>
                {item.strDate}~{item.endDate}
              </div>
              <div>
                {item.strTime}~{item.endTime}
              </div>
              <div>
                {item.currentPeople}/{item.maxPeople}
              </div>
              <div>{item.procedures}</div>
              <div>
                <CommonButton
                  btnType="table"
                  color="gray"
                  value="상세보기"
                  onClick={() => handlegetStudentList(item.lectureNm, item.ilecture, pageIdx)}
                />
              </div>
            </div>
          );
        })}
      </Table>

      {display ? (
        <CommonModal
          setDisplay={setDisplay}
          contents={contents}
          modalTitle={lectureNm}
          modalSize="big"
        >
          <Table header={modalHeader} data={contents} hasPage={true} maxPage={5} pending={pending}>
            {contents.map((item, idx) => {
              return (
                <div key={item.istudent}>
                  <div>{idx + 1}</div>
                  <div>{item.nm}</div>
                  <div>{item.majorNm}</div>
                  <div>{item.attendance}</div>
                  <div>{item.minEx}</div>
                  <div>{item.finEx}</div>
                  <div>{item.totalScore}</div>
                  <div>{item.avg}</div>
                  <div>{item.gread}</div>
                </div>
              );
            })}
          </Table>
        </CommonModal>
      ) : (
        <></>
      )}
    </>
  );
};

export default Lecture;
