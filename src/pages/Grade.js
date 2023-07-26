import React from 'react';
import { TableArea, NoData } from '../styles/MyStyleCSS';
import SearchBar from '../components/SearchBar';
import Input from '../components/Input';

const Grade = () => {
  const arr = [
    {
      aa: '1',
      bb: '1',
      cc: '생명윤리',
      dd: '이그린',
      ee: 3,
      ff: 96,
      gg: 'A+',
    },
    {
      aa: '1',
      bb: '2',
      cc: '기술과학윤리',
      dd: '이그린',
      ee: 2,
      ff: 94,
      gg: 'A+',
    },
    {
      aa: '1',
      bb: '3',
      cc: '생명윤리',
      dd: '이그린',
      ee: 3,
      ff: 97,
      gg: 'A+',
    },
    {
      aa: '1',
      bb: '4',
      cc: '생활속의물리',
      dd: '이그린',
      ee: 3,
      ff: 100,
      gg: 'A+',
    },
    {
      aa: '1',
      bb: '2',
      cc: '데이터베이스',
      dd: '이그린',
      ee: 3,
      ff: 96,
      gg: 'A+',
    },
  ];
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
                    <td>{item.aa}</td>
                    <td>{item.bb}</td>
                    <td>{item.cc}</td>
                    <td>{item.dd}</td>
                    <td>{item.ee}</td>
                    <td>{item.ff}</td>
                    <td>{item.gg}</td>
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
