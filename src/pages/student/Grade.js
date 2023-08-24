import React from 'react';
import Table from '../../components/Table';
import CommonButton from '../../components/CommonButton';
import SearchBar from '../../components/SearchBar';
import { NoDatas } from '../../styles/MyStyleCSS';

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
    { title: '성적', width: 1 },
    { title: '평점', width: 1 },
    { title: '등급', width: 1 },
    { title: '비고', width: 2 },
  ];
  const data = Array(10).fill();
  return (
    <>
      <SearchBar>
        <div>학생 개인의 성적 조회 + 학년학기별/ 등 드롭다운 추가 예정</div>
      </SearchBar>
      <NoDatas />
      <Table header={tableHeader} hasPage={true} data={data}>
        {data.map((_, idx) => {
          return (
            <div key={idx}>
              <div>1</div>
              <div>1</div>
              <div>GUI웹프로그래밍</div>
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
                    alert(idx + ' click');
                  }}
                />
                <CommonButton
                  value="강의정보"
                  btnType="table"
                  color="blue"
                  onClick={() => {
                    alert('강의 상세 정보 출력 모달창');
                  }}
                />
              </div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default Grade;
