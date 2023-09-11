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
import { FormTable, Row } from '../../styles/UserStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { BookImage, InfoFormTable } from '../../styles/RegisterStyle';
import { dayData } from '../../modules/timetable';

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
    { title: '연도', width: 1 },
    { title: '학기', width: 1 },
    { title: '학년제한', width: 1 },
    { title: '전공', width: 2 },
    { title: '강의명', width: 3 },
    { title: '담당교수', width: 1.2 },
    { title: '학점', width: 1 },
    { title: '강의실', width: 1.8 },
    { title: '강의 시간', width: 2 },
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
    setContents(result);
    setDisplay(true);
  };

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
        {(data as ObjectType)?.lectures?.map((item: ObjectType, idx: number) => {
          return (
            <div key={idx}>
              <div>{item.year}</div>
              <div>{item.semester}</div>
              <div>{item.gradeLimit}</div>
              <div>{item.majorName}</div>
              <div>{item.lectureNm}</div>
              <div>{item.nm}</div>
              <div>{item.score}</div>
              <div>
                {item.buildingNm} {item.lectureRoomNm}호
              </div>
              <div>
                {item.strTime}~{item.endTime} ({dayData[item.dayWeek].charAt(0)})
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
          modalTitle={lectureNm}
          modalSize={contents?.returnCtnt ? 'small' : 'big'}
          hiddenFooter={true}
        >
          {contents?.returnCtnt ? (
            <div>
              <p>
                이 강의는 <mark>폐강</mark>된 강의입니다
              </p>
              <p>폐강사유 = {contents.returnCtnt}</p>
              <p>폐강일시 = {contents.returnDate.split('T')[0]}</p>
            </div>
          ) : (
            <div style={{ padding: '0px 20px' }}>
              <FormTable style={{ paddingTop: 0 }}>
                <Row>
                  <div>강의명</div>
                  <div>{lectureNm}</div>
                </Row>
                <Row col={2}>
                  <div>강의실</div>
                  <div>
                    {contents.buildingName} {contents.lectureRoomName}호
                  </div>
                  <div>강의시간</div>
                  <div>
                    {contents.lectureStrTime}~{contents.lectureEndTime} (
                    {dayData[contents.dayWeek].charAt(0)})
                  </div>
                </Row>
                <Row col={2}>
                  <div>수강 인원 수</div>
                  <div>
                    {contents.currentPeople}/{contents.attendance}
                  </div>
                  <div>학년 제한</div>
                  <div>{contents.gradeLimit}</div>
                </Row>
                <Row col={2}>
                  <div>학점</div>
                  <div>{contents.score}</div>
                  <div>배점</div>
                  <div>
                    출석{100 - contents.midtermExamination - contents.finalExamination}% 중간
                    {contents.midtermExamination}% 기말{contents.finalExamination}%
                  </div>
                </Row>
                <InfoFormTable style={{ gridTemplate: '4fr 1fr 0/1fr 1fr' }}>
                  <div className="row">
                    <div>강의 설명</div>
                    <div>{contents.ctnt}</div>
                  </div>
                  <div className="row book-img">
                    <div>교재 이미지</div>
                    <div>
                      <BookImage>
                        {/^http/.test(contents.bookUrl) ? (
                          <img src={contents?.bookUrl} alt="교재 이미지" />
                        ) : (
                          <div className="no-book">
                            <FontAwesomeIcon icon={faBook} />
                            <span>교재 이미지가 없습니다.</span>
                          </div>
                        )}
                      </BookImage>
                    </div>
                  </div>
                  <div className="row pt-2">
                    <div>교재명</div>
                    <div>
                      {/^(null|undefined|)$/.test(contents.textBook) ? (
                        <span>교재가 없습니다</span>
                      ) : (
                        <div>{contents.textBook}</div>
                      )}
                    </div>
                  </div>
                </InfoFormTable>
              </FormTable>
            </div>
          )}
        </CommonModal>
      ) : null}
    </>
  );
};

export default Lecture;
