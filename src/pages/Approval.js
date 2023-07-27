import React, { useState } from 'react';
import { TableArea, TempStyle } from '../styles/MyStyleCSS';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../components/CommonButton';

const Approval = () => {
  const [display, setDisplay] = useState(false);
  const [contents, setContents] = useState({});
  const handleRejectLecture = () => {
    console.log('Reject');
    setDisplay(true);
  };
  const handleAcceptLecture = _item => {
    console.log('Accept');
    setContents(_item);
    setDisplay(true);
  };
  const arr = [
    {
      lecture: '강의명이 들어갈 장소',
      temp: '전공',
      grade: '2',
      professor: '교수님',
      time: '14:00~16:00',
      classroom: '5호관 202호',
      peopleNum: 30,
    },
    {
      lecture: '데이터베이스',
      temp: '컴퓨터공학',
      grade: '3',
      professor: '박그린',
      time: '13:00~16:00',
      classroom: '5호관 202호',
      peopleNum: 30,
    },
  ];

  //
  const navigate = useNavigate();
  const handlePageBtnClick = () => {
    navigate(-1);
  };

  // JSX
  return (
    <div>
      <p
        style={{
          borderBottom: '1px solid black',
          color: 'blue',
          fontSize: 30,
          padding: '15px 30px',
        }}
      >
        강의승인
      </p>
      <CommonButton btnType="page" value="뒤로가기" onClick={handlePageBtnClick} />
      <TableArea>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>강의명</th>
              <th>전공</th>
              <th>학점</th>
              <th>담당교수</th>
              <th>강의 시간</th>
              <th>강의실</th>
              <th>정원</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {arr.map((item, idx) => (
              <tr key={idx}>
                <td>001</td>
                <td>{item.lecture}</td>
                <td>{item.temp}</td>
                <td>{item.grade}</td>
                <td>{item.professor}</td>
                <td>{item.time}</td>
                <td>{item.classroom}</td>
                <td>{item.peopleNum}</td>
                <td>
                  <div>
                    <CommonButton
                      btnType="table"
                      value="승인"
                      color="blue"
                      onClick={() => handleAcceptLecture(item)}
                    />
                    <CommonButton
                      btnType="table"
                      value="거절"
                      color="red"
                      onClick={handleRejectLecture}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableArea>
      <div className="pagination" style={{ background: 'pink' }}>
        <span>1 2 3 4 5 6 7 8 9 </span>
      </div>
      {display ? <TempModal setDisplay={setDisplay} contents={contents} /> : null}
    </div>
  );
};

const TempModal = ({ setDisplay, contents }) => {
  // JSX
  return (
    <TempStyle>
      <div className="modal-box">
        <p>{contents.lecture}</p>
        <div>
          <button onClick={() => setDisplay(false)}>확인</button>
          <button onClick={() => setDisplay(false)}>취소</button>
        </div>
      </div>
    </TempStyle>
  );
};

export default Approval;
