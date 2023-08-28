import React from 'react';
import { useState } from 'react';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Dropdown from '../../components/Dropdown';
import SearchBar from '../../components/SearchBar';
import Table from '../../components/Table';
import Input from '../../components/Input';
import useQuerySearch from '../../hooks/useSearchFetch';
import { Btn, LPlanTable, LPTWrap } from '../../styles/LectureRoomCss';

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

  //학기 임시 더미 데이터
  const semesterList = [
    {
      id: 1,
      title: '1학기',
    },
    {
      id: 2,
      title: '2학기',
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

  const data_ = [
    {
      lectureName: '치킨의 미학적 아름다움에대한 이해',
      score: 3,
      professorName: '지긴만',
      lecturePurpose:
        '치킨이란 무엇인가에  대해 토론해보는 장을 마련하여 서로가 가진 치킨에 대한 생각을 나눠보고 또한 치킨이 가진 미학점 아름다움에서 주는 경이로움을 깨달을수있다.',
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
          {/* <LPTWrap>
            <LPlanTable>
              <colgroup>
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <td className="lectureName">강의명</td>
                  <td className="inputLectureName">강의명 올자리</td>
                </tr>

                <tr>
                  <td>학점</td>
                  <td>학점 올 자리</td>
                </tr>

                <tr>
                  <td>교수명</td>
                  <td>교수명 올자리</td>
                </tr>

                <tr>
                  <td>강의목표</td>
                </tr>

                <tr>
                  <td>강의목표에 대한 설명</td>
                </tr>

                <tr>
                  <td>
                    <img src=""></img>
                  </td>
                </tr>

                <tr>
                  <td>교재명</td>
                  <td>ISBN</td>
                </tr>
              </tbody>
            </LPlanTable>
          </LPTWrap> */}

          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
          </colgroup>
          <tbody>
            <tr>
              <td style={{ colspan: '2' }}>강의명</td>
              <td style={{ colspan: '2' }}>강의명 들어갈자리</td>
            </tr>

            <tr>
              <td>학점</td>
              <td>학점 들어갈자리</td>
              <td>교수명</td>
              <td>교수명 들어갈자리</td>
            </tr>

            <tr>
              <th>컬럼3</th>
              <td>colspan 3</td>
            </tr>
            <tr>
              <th>컬럼4</th>
              <td>이것은 데이터3</td>
              <th>컬럼5</th>
              <td>이것은 데이터4</td>
            </tr>
          </tbody>

          <Btn>
            <CommonButton btnType="modal" value="닫기" onClick={handleModalCancel} />
          </Btn>
        </CommonModal>
      ) : null}
      <div style={{ marginBottom: '94.41px' }}>
        <SearchBar queries={queries} setPage={true} setClick={setClick}>
          <Dropdown
            length="short"
            placeholder="학기"
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
