import React, { useEffect, useState } from 'react';
import { TableArea, IsClosed } from '../../styles/MyStyleCSS';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonButton from '../../components/CommonButton';
import Dropdown from '../../components/Dropdown';
import CommonModal from '../../components/CommonModal';
import Table from '../../components/Table';
import { getStudentList } from '../../apis/fetch';
import useQuerySearch from '../../hooks/useSearchFetch';
import api from '../../apis/api';
import { ObjectType } from '../../types/components';

const Lecture = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const pageIdx = !search.length ? 1 : parseInt(search.split('?')[1].split('=')[1]);
  const [display, setDisplay] = useState(false);
  const [contents, setContents] = useState<ObjectType>({});
  // 강의 승인 페이지로
  const handlePageBtnClick = () => {
    navigate(`${pathname}/approval?procedures=-2`);
  };

  // 강의상태
  const status = ['신청 반려', '개설 승인', '개강 승인', '개강'];
  // 검색 영역
  const [ilectureName, setLectureName] = useState<string | number | null>('');
  const [procedures, setLectureStatus] = useState<string | number | null>('');
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
  // 강의명 리스트 +불러오기
  const [lectureNameList, setLectureNameList] = useState([]);
  useEffect(() => {
    const getLectureName = async () => {
      try {
        const { data } = await api.get(`/api/admin/lecture-name`);
        setLectureNameList(data);
      } catch (err) {
        console.log(err);
        alert('강의 목록을 불러올 수 없습니다');
      }
    };
    getLectureName();
  }, []);
  const [nm, setProfessorName] = useState('');
  const professorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfessorName(e.target.value);
  };
  const queries = { procedures, ilectureName, nm };
  const url = '/api/admin/lecture';

  // table header
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
  // hooks
  const [click, setClick] = useState(false);
  const { data, pending, error } = useQuerySearch(url, click);

  // 서버통신 - 해당 과목 학생리스트 불러오기
  const [lectureNm, setLectureNm] = useState('');
  const handlegetStudentList = async (_lectureNm: string, _ilecture: number) => {
    setLectureNm(_lectureNm);
    const result = await getStudentList(_ilecture);
    // Array.isArray(result.list) ? setContents(result.list) : setContents(result);
    setContents(result);
    setDisplay(true);
  };

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
          data={lectureNameList}
          propertyName={{ key: 'ilectureName', value: 'lectureName' }}
          value={ilectureName}
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
        data={(data as ObjectType)?.lectures}
        hasPage={true}
        maxPage={(data as ObjectType)?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {(data as ObjectType)?.lectures.map((item: ObjectType, idx: number) => {
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
        <CommonModal setDisplay={setDisplay} modalTitle={lectureNm} modalSize="big">
          <div style={{ padding: 20 }}>
            <div>정원 = {contents.attendance}</div>
            <div>현원 = {contents.currentPeople}</div>
            <div>강의실 = {contents.buildingName}</div>
            <div>호실 = {contents.lectureRoomName}</div>
            <div>bookUrl = {contents.bookUrl}</div>
            <div>textBook = {contents.textBook}</div>
            <div>ctnt = {contents.ctnt}</div>
            <div>학점 = {contents.score}</div>
            <div>학년제한 = {contents.gradeLimit}</div>
            <div>finalExamination = {contents.finalExamination}</div>
            <div>midtermExamination = {contents.midtermExamination}</div>
            <div>lectureEndDate = {contents.lectureEndDate}</div>
            <div>lectureEndTime = {contents.lectureEndTime}</div>
            <div>lectureStrDate = {contents.lectureStrDate}</div>
            <div>lectureStrTime = {contents.lectureStrTime}</div>
            <div>lectureName = {contents.lectureName}</div>
          </div>
          {/* {Array.isArray(contents) ? (
            <TableArea>
              <div className="table">
                <div className="table_head">
                  {modalHeader.map((item, idx) => {
                    return <div key={idx}>{item.title}</div>;
                  })}
                </div>
                <div className="table_body">
                  {contents?.map((item, idx) => {
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
                  {contents?.length <= 11 &&
                    Array(11 - (contents.length ?? 0))
                      .fill('')
                      .map((_, idx) => (
                        <div key={idx} className="table_body_item">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      ))}
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
          )} */}
        </CommonModal>
      ) : null}
    </>
  );
};

export default Lecture;
