import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import CommonButton from '../../components/CommonButton';
import SearchBar from '../../components/SearchBar';
import { NoDatas } from '../../styles/MyStyleCSS';
import Dropdown from '../../components/Dropdown';
import LectureInfo from '../../components/student/LectureInfo';
import CommonModal from '../../components/CommonModal';
import api from '../../apis/api';

const Grade = () => {
  // 강의명, 담당 교수, 학점, 성적(출석, 중간, 기말), 최종 성적(A+~F), 평점(4.5~0)+이의신청
  const tableHeader = [
    { title: '학년/년도', width: 1 },
    { title: '학기', width: 1 },
    { title: '강의명', width: 3 },
    { title: '담당교수', width: 1 },
    { title: '강의시간', width: 1.5 },
    // 점수
    { title: '학점', width: 1 },
    { title: '최종성적', width: 1 },
    { title: '평점', width: 1 },
    { title: '등급', width: 1 },
    { title: '비고', width: 1.5 },
  ];

  // 검색
  const queries = {};
  const [click, setClick] = useState(false);
  // 검색 - 드롭다운 - 학년학기 검색?
  const dropData = [
    { id: 1, title: '1학년 1학기' },
    { id: 2, title: '1학년 2학기' },
    { id: 3, title: '2학년 1학기' },
    { id: 4, title: '2학년 2학기' },
  ];
  // XXX 타입 수정 필요 !!
  const [dropValue, setDropValue] = useState<any>('');

  // 강의 pk
  const [ilectureStudent, setIlectureStudent] = useState<number | null>(null);
  // 이의신청 모달창
  const [demur, setDemur] = useState(false);
  const handleApplyDemurOk = async () => {
    console.log(ilectureStudent);
    putObjection();
    alert('처리되었습니다');
    setDemur(false);
  };
  const handleApplyDemurCancel = () => {
    setDemur(false);
    setIlectureStudent(null);
  };

  // 임시데이터
  // const data = Array(7).fill('');
  const [data, setData] = useState([]);
  // XXX api 연동 - 추후 별도 파일 분리
  const url = '/api/student?studentNum=23300001';
  const getLectureList = async () => {
    try {
      const { data } = await api.get(url);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLectureList();
  }, []);
  const objectionUrl = `/api/student/objection?studentNum=23300001&ilectureStudent=${ilectureStudent}`;
  const putObjection = async () => {
    const headers = { 'Content-Type': 'application/json' };
    const putData = {
      objection: 1,
    };
    try {
      await api.put(objectionUrl, putData, { headers });
    } catch (err) {
      console.log(err);
    }
  };
  // api 연동 - 추후 별도 파일 분리

  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <div>학생 개인의 성적 조회</div>
        <Dropdown
          length="middle"
          placeholder="학년학기"
          data={dropData}
          value={dropValue}
          setValue={setDropValue}
          reset={true}
        />
      </SearchBar>
      <NoDatas />
      <Table header={tableHeader} hasPage={true} data={data} pending={false} error={false}>
        {data.map((item: any, idx) => {
          return (
            <div key={idx}>
              <div>{item.year}</div>
              <div>{item.isemester}</div>
              <div>{item.lectureName}</div>
              <div>{item.professorName}</div>
              <div>14:00~16:00</div>
              <div>{item.score}</div>
              <div>{item.totalScore}</div>
              <div>{item.grade}</div>
              <div>{item.rating}</div>
              <div>
                <CommonButton
                  value="이의신청"
                  btnType="table"
                  color="gray"
                  onClick={() => {
                    console.log('필요 데이터 : 학번, ilectureStudent');
                    console.log(item.ilectureStudent);
                    setIlectureStudent(item.ilectureStudent);
                    setDemur(true);
                  }}
                />
              </div>
            </div>
          );
        })}
      </Table>
      {demur && (
        <CommonModal
          setDisplay={setDemur}
          modalSize="small"
          modalTitle="이의신청"
          handleModalOk={handleApplyDemurOk}
          handleModalCancel={handleApplyDemurCancel}
        >
          <span>강의 번호 : {ilectureStudent}</span>
          이의신청을 하겠습니까?
        </CommonModal>
      )}
    </>
  );
};

export default Grade;
