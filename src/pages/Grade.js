import React from 'react';
import { TableArea, NoData } from '../styles/MyStyleCSS';
import SearchBar from '../components/SearchBar';
import Input from '../components/Input';

const Grade = () => {
  const arr = [1, 2, 3, 4, 5];
  const array = [
    `(o^^)o`,
    `(^-^*)`,
    `(·_·)`,
    `(^_^)b`,
    `(≥o≤)`,
    `(;-;)`,
    `(>_<)`,
    `(='X'=)`,
    `(·.·)`,
    `(^Д^)/`,
    `(o_o)/`,
    `(o^^)o`,
    `(˚Δ˚)b'`,
  ];
  let randomValue = array[Math.floor(Math.random() * array.length)];

  return (
    <div>
      <SearchBar>
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
        <Input length="short" placeholder="이름" />
        <Input length="middle" placeholder="학번" />
      </SearchBar>
      {arr.length === 0 ? (
        <NoData>
          <div>{randomValue}</div>
          <p>검색해주세요</p>
        </NoData>
      ) : (
        <>
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
                {arr.map((item, idx) => (
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
        </>
      )}
    </div>
  );
};

export default Grade;
