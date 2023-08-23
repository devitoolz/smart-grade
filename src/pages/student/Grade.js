import React, { useState } from 'react';
import Table from '../../components/Table';
import CommonButton from '../../components/CommonButton';
import SearchBar from '../../components/SearchBar';
import { NoDatas } from '../../styles/MyStyleCSS';
import Dropdown from '../../components/Dropdown';
import LectureInfo from '../../components/student/LectureInfo';
import CommonModal from '../../components/CommonModal';

const Grade = () => {
  // 강의명, 담당 교수, 학점, 성적(출석, 중간, 기말), 최종 성적(A+~F), 평점(4.5~0)+이의신청
  const tableHeader = [
    { title: '학년', width: 1 },
    { title: '학기', width: 1 },
    { title: '강의명', width: 3 },
    { title: '담당교수', width: 1 },
    { title: '강의시간', width: 1 },
    { title: '강의실', width: 1 },
    // 점수
    { title: '학점', width: 1 },
    { title: '최종성적', width: 1 },
    { title: '평점', width: 1 },
    { title: '등급', width: 1 },
    { title: '비고', width: 2 },
  ];
  // 임시데이터
  const data = Array(7).fill();

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
  const [dropValue, setDropValue] = useState('');

  // 강의정보 모달창
  const [showLectureInfo, setShowLectureInfo] = useState(false);
  // 이의신청 모달창
  const [demur, setDemur] = useState(true);
  const handleModalOk = async () => {
    alert('처리되었습니다');
    setDemur(false);
  };
  const handleModalCancel = () => {
    setDemur(false);
  };

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
      <Table header={tableHeader} hasPage={true} data={data}>
        {data.map((_, idx) => {
          return (
            <div key={idx}>
              <div>1</div>
              <div>1</div>
              <div>GUI웹프로그래밍{idx + 1}</div>
              <div>김교수</div>
              <div>14:00~16:00</div>
              <div>그린관 502호</div>
              <div>3</div>
              <div>100</div>
              <div>4.5</div>
              <div>A+</div>
              <div>
                <CommonButton
                  value="이의신청"
                  btnType="table"
                  color="gray"
                  onClick={() => {
                    setDemur(true);
                  }}
                />
                <CommonButton
                  value="강의정보"
                  btnType="table"
                  color="blue"
                  onClick={() => {
                    setShowLectureInfo(true);
                  }}
                />
              </div>
            </div>
          );
        })}
      </Table>
      {showLectureInfo && <LectureInfo setShowLectureInfo={setShowLectureInfo} />}
      {demur && (
        <CommonModal
          setDisplay={setDemur}
          modalSize="small"
          modalTitle="이의신청"
          handleModalOk={handleModalOk}
          handleModalCancel={handleModalCancel}
        >
          이의신청을 하겠습니까?
        </CommonModal>
      )}
    </>
  );
};

export default Grade;
