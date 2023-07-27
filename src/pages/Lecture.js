import React, { useState } from 'react';
import { LectureContainer, TableArea, TempStyle, NoData } from '../styles/MyStyleCSS';
import SearchBar from '../components/SearchBar';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import CommonButton from '../components/CommonButton';
import Dropdown from '../components/Dropdown';
import CommonModal from '../components/CommonModal';

const Lecture = () => {
  const [display, setDisplay] = useState(false);
  const [contents, setContents] = useState({});
  const handleShowDetail = _item => {
    setDisplay(true);
    setContents(_item);
  };
  const arr = [
    {
      a: '1',
      b: '2',
      c: '컴퓨터공학과',
      lecture: '데이터베이스',
      e: '김그린',
      f: '2',
      g: '6호관 404호',
      h: '2000-03-02~2000-06-28',
      i: '09:00~11:00',
      j: 30,
      k: '상태',
    },
    {
      a: '1',
      b: '3',
      c: '컴퓨터공학과',
      lecture: '웹프로그래밍',
      e: '김그린',
      f: '3',
      g: '6호관 404호',
      h: '2000-03-02~2000-06-28',
      i: '14:00~17:00',
      j: 30,
      k: '상태',
    },
  ];

  const handlePageBtnClick = () => {
    console.log('btn click');
    navigate('/bachelor/lecture/approval');
  };
  const handleBtnClick = () => {
    console.log('btn click');
  };
  // 드롭다운 테스트
  const [lectureName, setLectureName] = useState();
  const [lectureStatus, setLectureStatus] = useState();
  const data = [
    {
      id: 1,
      title: '1번',
    },
    {
      id: 2,
      title: '2번',
    },
  ];
  const navigate = useNavigate();

  // JSX
  return (
    <LectureContainer>
      <SearchBar>
        <Dropdown
          length="short"
          placeholder="강의상태"
          data={data}
          value={lectureStatus}
          setValue={setLectureStatus}
          reset={true}
        />
        <Dropdown
          length="long"
          placeholder="강의명"
          data={data}
          value={lectureName}
          setValue={setLectureName}
          reset={true}
        />
        <Input length="short" placeholder="교수명" />
      </SearchBar>

      <CommonButton btnType="page" value="강의 개설 관리" onClick={handlePageBtnClick} />

      {/* <CommonButton btnType="modal" value="상세보기" color="red" onClick={handleBtnClick} />
      <CommonButton value="테스트" color="blue" onClick={handleBtnClick} />
      <CommonButton value="테스트" color="gray" onClick={handleBtnClick} />
      <CommonButton value="onclick없음" /> */}

      {arr.length === 0 ? (
        <NoData>
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
                {arr.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.a}</td>
                    <td>{item.b}</td>
                    <td>{item.c}</td>
                    <td>{item.lecture}</td>
                    <td>{item.e}</td>
                    <td>{item.f}</td>
                    <td>{item.g}</td>
                    <td>{item.h}</td>
                    <td>{item.i}</td>
                    <td>{item.j}</td>
                    <td>{item.k}</td>
                    <td>
                      <CommonButton
                        value="상세보기"
                        color="gray"
                        btnType="table"
                        onClick={() => handleShowDetail(item)}
                      />
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
      {display ? <CommonModal setDisplay={setDisplay} contents={contents} /> : <></>}
    </LectureContainer>
  );
};

export default Lecture;
