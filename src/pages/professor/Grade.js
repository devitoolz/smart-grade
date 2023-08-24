import React from 'react';
import Table from '../../components/Table';
import CommonButton from '../../components/CommonButton';
import SearchBar from '../../components/SearchBar';

const Grade = () => {
  const tableHeader = [
    { title: '년도', width: 1 },
    { title: '학기', width: 1 },
    { title: '강의명', width: 3 },
    { title: '강의시간', width: 2 },
    { title: '강의실', width: 1 },
    { title: '학점', width: 1 },
    { title: '비고', width: 2 },
  ];
  const data = Array(10).fill();

  return (
    <>
      <SearchBar>여긴 검색할만한 내용이 없을 듯</SearchBar>
      <div>
        <span>flow</span>
        <ul>
          <li>1. 수업리스트 불러옴</li>
          <li>2. 해당 강의 클릭</li>
          <li>3. 해당 강의를 듣는 학생들의 성적입력</li>
          <li>4. 이의신청온 목록 확인 가능</li>
          <li>5. 이의신청 확인 후 처리</li>
        </ul>
      </div>
      <Table header={tableHeader} data={data}>
        {data.map((_, idx) => {
          return (
            <div key={idx}>
              <div>2018</div>
              <div>1</div>
              <div>웹프로그래밍{idx + 1}</div>
              <div>14:00~16:00 (금)</div>
              <div>그린관 502호</div>
              <div>3</div>
              <div>
                <CommonButton
                  value="이의신청목록 확인"
                  btnType="table"
                  color="gray"
                  onClick={() => {
                    alert(idx + ' click');
                  }}
                />
                <CommonButton
                  value="성적입력"
                  btnType="table"
                  color="blue"
                  onClick={() => {
                    alert('성적입력으로 넘어가기');
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
