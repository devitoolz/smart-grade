import React, { useState } from 'react';

const Lecture = () => {
  const [display, setDisplay] = useState(false);
  const handleShowDetail = () => {
    setDisplay(true);
  };

  // JSX
  return (
    <div style={{ background: 'aliceblue' }}>
      <>Lecture</>
      <h3 style={{ color: '#1363DF', fontSize: 33 }}>통합 강의관리</h3>
      <hr />
      <div className="search-area" style={{ background: '#D9D9D9', margin: '72px 0', height: 96 }}>
        <input type="text" />
        <button>Q</button>
      </div>
      <div className="table-area">
        <table style={{ textAlign: 'center' }}>
          <thead>
            {/* 
              pink = short
              yellow = middle
              lightgreen = 고정
             */}
            <tr>
              <th style={{ background: 'pink' }}>학기</th>
              <th style={{ background: 'pink' }}>학년</th>
              <th>전공</th>
              <th>강의명</th>
              <th style={{ background: 'yellow' }}>담당교수</th>
              <th style={{ background: 'pink' }}>학점</th>
              <th>강의실</th>
              <th>강의 기간</th>
              <th>강의 시간</th>
              <th style={{ background: 'pink' }}>정원</th>
              <th style={{ background: 'yellow' }}>상태</th>
              <th style={{ background: 'lightgreen' }}>상세</th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill()
              .map(() => (
                <tr key={0}>
                  <td>1</td>
                  <td>2</td>
                  <td>전공이름도 길어질 수 있다</td>
                  <td>강의명은 생각보다 길어질 수가 있다</td>
                  <td>김그린</td>
                  <td>2</td>
                  <td>6호관 404호</td>
                  <td>2000-03-02~2000-06-28</td>
                  <td>09:00~11:00</td>
                  <td>30</td>
                  <td>???</td>
                  <td>
                    <button onClick={handleShowDetail}>상세보기</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {display ? <TempModal setDisplay={setDisplay} /> : <></>}
    </div>
  );
};

const TempModal = ({ setDisplay }) => {
  const tempStyle = {
    // background: '#00173C',
    background: 'rgba(0, 23, 60, 0.7)',
    // opacity: 0.7,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // JSX
  return (
    <div style={tempStyle}>
      <div
        style={{
          width: '72%',
          height: '72%',
          background: 'white',
          paddingTop: 40,
          borderRadius: 20,
        }}
      >
        <button onClick={() => setDisplay(false)}>닫기</button>
        <p>호텔조리학과</p>
        <table style={{ border: '1px solid red' }}>
          <thead>
            <tr>
              <th>학번</th>
              <th>이름</th>
              <th>성별</th>
              <th>전공</th>
              <th>출석</th>
              <th>중간</th>
              <th>기말</th>
              <th>평점</th>
              <th>최종성적</th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill()
              .map(() => (
                <tr key={0}>
                  <td>001</td>
                  <td>002</td>
                  <td>003</td>
                  <td>004</td>
                  <td>005</td>
                  <td>006</td>
                  <td>007</td>
                  <td>008</td>
                  <td>009</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="pagination" style={{ background: 'pink' }}>
          <span>1 2 3 4 5 6 7 8 9 </span>
        </div>
      </div>
    </div>
  );
};

export default Lecture;
