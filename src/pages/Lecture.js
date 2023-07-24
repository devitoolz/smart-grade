import React from 'react';

const Lecture = () => {
  return (
    <div style={{ background: 'aliceblue' }}>
      <>Lecture</>
      <h3 style={{ color: '#1363DF', fontSize: 33 }}>통합 강의관리</h3>
      <hr />
      <div className="search-area" style={{ background: '#D9D9D9', margin: '72px 0', height: 96 }}>
        <input type="text" />
        <button>Q</button>
      </div>
      <div>
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
                    <button>상세보기</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lecture;
