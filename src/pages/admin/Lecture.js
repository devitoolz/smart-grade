import React, { useState } from 'react';
import { TableArea, IsClosed } from '../../styles/MyStyleCSS';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonButton from '../../components/CommonButton';
import Dropdown from '../../components/Dropdown';
import CommonModal from '../../components/CommonModal';
import Table from '../../components/Table';
import { getStudentList } from '../../api/fetch';
import useQuerySearch from '../../hooks/useSearchFetch';

const Lecture = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const pageIdx = !search.length ? 1 : search.split('?')[1].split('=')[1];
  const [display, setDisplay] = useState(false);
  const [contents, setContents] = useState({});
  // table maxPage
  const [maxPage, setMaxPage] = useState(0);

  const handlePageBtnClick = () => {
    navigate(`${pathname}/approval?procedures=-2`);
  };

  // 강의상태
  const status = ['신청 반려', '개설 승인', '개강 승인', '개강'];
  // 드롭다운
  const [lectureName, setLectureName] = useState();
  const [procedures, setLectureStatus] = useState();
  const statusList = [
    {
      id: '-1',
      title: '전체보기',
    },
    {
      id: '0',
      title: '신청 반려',
    },
    {
      id: '1',
      title: '개설 승인',
    },
    {
      id: '2',
      title: '개강 승인',
    },
    {
      id: '3',
      title: '개강',
    },
  ];
  const tempLecture = [
    {
      id: 1,
      title: '강의 1',
    },
    {
      id: 2,
      title: '강의 2',
    },
    {
      id: 3,
      title: '강의 3',
    },
    {
      id: 4,
      title: '강의 4',
    },
  ];
  const [nm, setProfessorName] = useState('');
  const professorNameChange = e => {
    setProfessorName(e.target.value);
  };

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
    { title: '상세보기', width: 1.5 },
  ];
  // 쿼리
  const [click, setClick] = useState(false);
  const queries = { procedures, lectureName, nm };
  const url = '/api/admin/lecture';

  const { data, pending, error } = useQuerySearch(url, click);

  // 서버연동 테스트 - 테이블에 정보 불러오기
  // const [tableDatas, setTableDatas] = useState([]);
  // const getTestData = async () => {
  //   await handleTestClick(pageIdx, setTableDatas, setMaxPage);
  // };
  // 서버연동 테스트 - 해당 과목 학생리스트 불러오기
  const [lectureNm, setLectureNm] = useState();
  const handlegetStudentList = async (_lectureNm, _ilecture) => {
    setLectureNm(_lectureNm);
    // ilecture = 해당 강의 과목 번호
    const result = await getStudentList(_ilecture, pageIdx);
    Array.isArray(result.list) ? setContents(result.list) : setContents(result);
    setDisplay(true);
  };
  // useEffect(() => {
  //   getTestData();
  // }, [pageIdx]);

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
          data={statusList}
          value={procedures}
          setValue={setLectureStatus}
          reset={true}
        />
        <Dropdown
          length="long"
          placeholder="강의명"
          data={tempLecture}
          value={lectureName}
          setValue={setLectureName}
          reset={true}
        />
        <Input
          length="short"
          type="string"
          placeholder="교수명"
          value={nm}
          setValue={professorNameChange}
          reset={setProfessorName}
        />
      </SearchBar>

      <CommonButton btnType="page" value="강의 개설 관리" onClick={handlePageBtnClick} />

      <Table
        header={tableHeader}
        data={data?.lectures}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {data?.lectures.map((item, idx) => {
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
              <div>{status[item.procedures]}</div>
              <div>
                <CommonButton
                  btnType="table"
                  color="gray"
                  value="확인"
                  onClick={() => handlegetStudentList(item.lectureNm, item.ilecture)}
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
          {Array.isArray(contents) ? (
            <TableArea>
              <div className="table">
                <div className="table_head">
                  {modalHeader.map((item, idx) => {
                    return <div key={idx}>{item.title}</div>;
                  })}
                </div>
                <div className="table_body">
                  {contents.map((item, idx) => {
                    return (
                      <div className="table_body_item" key={item.istudent}>
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
                </div>
              </div>
            </TableArea>
          ) : (
            <IsClosed>
              <p style={{ background: 'grey', marginBottom: 30 }}>
                폐강된 강의입니다 ({contents.returnDate} 폐강)
              </p>
              <p style={{ borderBottom: '2px solid red', display: 'inline-block' }}>폐강 사유</p>
              <div>{contents.returnCtnt}</div>
            </IsClosed>
          )}
        </CommonModal>
      ) : null}
    </>
  );
};

export default Lecture;
