import React, { useState } from 'react';
import { TableArea } from '../styles/MyStyleCSS';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../components/CommonButton';
import CommonModal from '../components/CommonModal';

const Approval = () => {
  const [display, setDisplay] = useState(false);
  const [contents, setContents] = useState({});
  // 승인
  const [isAccept, setIsAccept] = useState(true);
  const handleRejectLecture = _item => {
    console.log('Reject');
    setContents(_item);
    console.log(_item);
    setDisplay(true);
    setIsAccept(false);
  };
  const handleAcceptLecture = _item => {
    console.log('Accept');
    setContents(_item);
    console.log(_item);
    setDisplay(true);
    setIsAccept(true);
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
      <div
        style={{
          width: '100%',
          height: '80px',
          minHeight: '80px',
          background: 'var(--search-bg-color)',
          marginTop: '70px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        강의 개설 요청 승인
      </div>
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
                      onClick={() => handleRejectLecture(item)}
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
      {display ? (
        // <CommonModal
        //   setDisplay={setDisplay}
        //   contents={contents}
        //   modalSize="small"
        //   modalTitle="개설 승인"
        // >
        //   {/* <p>모달 작은 창 버전</p>
        //   <p>{contents.lecture}</p>
        //   <p>내용추가</p> */}
        //   <div>
        //     <label>전공명</label>
        //     <Input length="long" placeholder="전공명" value={value} setValue={setValue} />
        //   </div>
        //   <div>
        //     <label>졸업학점</label>
        //     <Input
        //       type="number"
        //       length="long"
        //       placeholder="졸업학점"
        //       value={value}
        //       setValue={setValue}
        //     />
        //   </div>
        // </CommonModal>
        <CommonModal modalSize="small" modalTitle="요청 승인" setDisplay={setDisplay}>
          {isAccept ? (
            <>
              <p>다음 요청을 승인하시겠습니까?</p>
              <p>다음 요청을 승인하시겠습니까?</p>
            </>
          ) : (
            <>요청 거절</>
          )}
        </CommonModal>
      ) : null}
    </div>
  );
};

export default Approval;
