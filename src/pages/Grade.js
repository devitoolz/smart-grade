import React from 'react';
import { TableArea } from '../styles/MyStyleCSS';

const Grade = () => {
  return (
    <div>
      <div className="search-area" style={{ background: '#D9D9D9', margin: '72px 0', height: 96 }}>
        <select name="" id="student-semester">
          <option value="00">학기</option>
          <option value="01">1학기</option>
          <option value="02">2학기</option>
        </select>
        <select name="" id="student-grade">
          <option value="00">학년</option>
          <option value="01">1학년</option>
          <option value="02">2학년</option>
          <option value="03">3학년</option>
          <option value="04">4학년</option>
          <option value="05">5학년</option>
        </select>
        <input type="text" id="student-name" placeholder="이름" />
        <input type="number" id="student-id" placeholder="학번" />
        <button>Q</button>
      </div>
      <TableArea>
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
              <th>강의명zzzzzzzzzzzzzzzzzzzz</th>
              <th style={{ background: 'yellow' }}>담당교수</th>
              <th style={{ background: 'pink' }}>학점</th>
              <th style={{ background: 'pink' }}>성적</th>
              <th style={{ background: 'pink' }}>최종성적(등급)</th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill()
              .map((item, idx) => (
                <tr key={idx}>
                  <td>1</td>
                  <td>2</td>
                  <td>생명윤리</td>
                  <td>이그린</td>
                  <td>3</td>
                  <td>96</td>
                  <td>A+</td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableArea>
      <div className="pagination">
        <span>1 2 3 4 5 6 7 8 9 </span>
      </div>
    </div>
  );
};

export default Grade;
