import React, { useState } from 'react';
import { LectureContainer, TableArea, TempStyle, NoData } from '../styles/MyStyleCSS';
import SearchBar from '../components/SearchBar';
import Input from '../components/Input';
import { Link } from 'react-router-dom';

const Lecture = () => {
  const [display, setDisplay] = useState(false);
  const handleShowDetail = () => {
    setDisplay(true);
  };
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

  // JSX
  return (
    <LectureContainer>
      <SearchBar>
        <select name="" className="search-option" id="lecture-state">
          <option value="00">강의상태</option>
          <option value="01">1번</option>
          <option value="02">2번</option>
        </select>
        <select name="" className="search-option" id="lecture-list">
          <option value="00">강의명</option>
          <option value="01">1번강의</option>
          <option value="02">2번강의</option>
        </select>
        <Input length="short" placeholder="교수명" />
      </SearchBar>

      <Link to="/bachelor/lecture/approval">
        <button>강의 개강</button>
      </Link>

      {arr.length === 0 ? (
        <NoData>
          <div>{randomValue}</div>
          <p>검색해주세요</p>
        </NoData>
      ) : (
        <>
          <TableArea>
            <table>
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
                {arr.map(item => (
                  <tr key={item}>
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
          </TableArea>
          <div className="pagination" style={{ background: 'pink' }}>
            <span>1 2 3 4 5 6 7 8 9 </span>
          </div>
        </>
      )}
      {display ? <TempModal setDisplay={setDisplay} /> : <></>}
    </LectureContainer>
  );
};

const TempModal = ({ setDisplay }) => {
  // JSX
  return (
    <TempStyle>
      <div className="modal-box">
        <p>호텔조리학과</p>
        <TableArea>
          <table>
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
        </TableArea>
        <div className="pagination" style={{ background: 'pink' }}>
          <span>1 2 3 4 5 6 7 8 9 </span>
        </div>
        <button onClick={() => setDisplay(false)}>닫기</button>
      </div>
    </TempStyle>
  );
};

export default Lecture;
