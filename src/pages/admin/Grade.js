import React, { useState } from 'react';
import { NoDatas, TableMini } from '../../styles/MyStyleCSS';
import SearchBar from '../../components/SearchBar';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Table from '../../components/Table';
import { getStudentInfo } from '../../api/fetch';
import useQuerySearch from '../../hooks/useSearchFetch';
import { FormTable, Row } from '../../styles/UserStyle';
import { useNavigate } from 'react-router-dom';
import CommonProgressBar from '../../components/CommonProgressBar';

const Grade = () => {
  const navigate = useNavigate();
  // 드롭다운
  const gradeData = [
    { id: 1, title: '1학년' },
    { id: 2, title: '2학년' },
    { id: 3, title: '3학년' },
    { id: 4, title: '4학년' },
  ];
  const [grade, setGrade] = useState();
  const [studentNum, setStudentNum] = useState('');
  const studentNumChange = e => {
    setStudentNum(e.target.value);
  };

  // table
  const tableHeader = [
    { title: '학년', width: 1 },
    { title: '학기', width: 1 },
    { title: '강의명', width: 3 },
    { title: '담당교수', width: 2 },
    { title: '학점', width: 1 },
    { title: '성적', width: 1 },
    { title: '등급', width: 1 },
  ];
  // 데이터통신 - 학생 상세정보 불러오기
  const [studentDetail, setStudentDetail] = useState({});
  const handleGetStudentInfo = async _istudent => {
    _istudent ? setDisplay(true) : null;
    await getStudentInfo(_istudent, setStudentDetail);
  };

  // 쿼리
  const [click, setClick] = useState(false);
  const queries = { grade, studentNum };
  const url = '/api/admin/grade';
  const { data, pending, error } = useQuerySearch(url, click);

  //
  // 학생 상세 정보 모달창
  const [display, setDisplay] = useState(false);

  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          length="short"
          placeholder="학년"
          data={gradeData}
          value={grade}
          setValue={setGrade}
          reset={true}
        />
        <Input
          length="middle"
          type="number"
          placeholder="학번"
          value={studentNum}
          setValue={studentNumChange}
          reset={setStudentNum}
        />
      </SearchBar>

      {data?.student === null || data === null ? (
        <NoDatas />
      ) : (
        <CommonButton
          btnType="page"
          value="학생상세정보"
          onClick={() => handleGetStudentInfo(data?.student?.istudent)}
        >
          {data?.student?.name} {data?.student?.studentNum}
        </CommonButton>
      )}

      <Table
        header={tableHeader}
        data={data?.voList || Array(10).fill('')}
        hasPage={true}
        maxPage={data?.page.maxPage}
        pending={pending}
        error={error}
      >
        {(data?.voList || Array(10).fill('')).map((item, idx) => {
          return (
            <div key={idx}>
              <div>{item.grade}</div>
              <div>{item.semester}</div>
              <div>{item.lectureName}</div>
              <div>{item.professorName}</div>
              <div>{item.lectureScore}</div>
              <div>{item.totalScore}</div>
              <div>{item.rating}</div>
            </div>
          );
        })}
      </Table>

      {display && (
        <CommonModal
          modalSize="big"
          modalTitle={`${data?.student?.name} 님의 상세정보`}
          setDisplay={setDisplay}
        >
          <div
            style={{
              padding: 20,
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex' }}>
              <TableMini>
                <div className="table-head-m">
                  <div>학년</div>
                  <div>학기</div>
                  <div>평점</div>
                  <div>점수</div>
                </div>
                <div className="table-body-m">
                  {Array(8)
                    .fill()
                    .map((_, idx) => {
                      return (
                        <div key={idx}>
                          <div>{data?.avgVo[idx]?.grade}</div>
                          <div>{data?.avgVo[idx]?.semester}</div>
                          <div>{data?.avgVo[idx]?.avgRating}</div>
                          <div>{data?.avgVo[idx]?.avgScore}</div>
                        </div>
                      );
                    })}
                </div>
              </TableMini>
              <CommonProgressBar
                maxScore={studentDetail.graduationScore}
                nowScore={studentDetail.scoreStudent}
              />
            </div>
            <FormTable>
              <Row col={2}>
                <div>이름</div>
                <div>{studentDetail.name}</div>
                <div>학번</div>
                <div>{studentDetail.studentNum}</div>
              </Row>
              <Row col={2}>
                <div>성별</div>
                <div>{studentDetail.gender === 'F' ? '여' : '남'}</div>
                <div>학과</div>
                <div>{studentDetail.majorName}</div>
              </Row>
              <Row col={2}>
                <div>입학년도</div>
                <div>{studentDetail.createdAt}</div>
                <div>전화번호</div>
                <div>{studentDetail.phone}</div>
              </Row>
            </FormTable>
            {/* <div>
              학생이 들은 학점 = {studentDetail.scoreStudent} <br />
              졸업에 필요 학점 = {studentDetail.graduationScore}
            </div> */}
            <CommonButton
              btnType="modal"
              value="상세정보"
              onClick={() => {
                setDisplay(false);
                navigate(`/admin/user/students/${data.student.istudent}`);
              }}
            />
          </div>
        </CommonModal>
      )}
    </>
  );
};

export default Grade;
