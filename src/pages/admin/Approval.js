import React, { useState, useEffect } from 'react';
import { TableArea } from '../../styles/MyStyleCSS';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Table from '../../components/Table';
import { Layout } from '../../styles/CommonStyle';
import { handleGetApprovalLecture } from '../../api/fetch';

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

  //
  const navigate = useNavigate();
  const handlePageBtnClick = () => {
    navigate(-1);
  };
  // table
  const tableHeader = [
    { title: '강의명', width: 3 },
    { title: '전공', width: 2.5 },
    { title: '학점', width: 1 },
    { title: '담당교수', width: 1 },
    { title: '강의실', width: 1.5 },
    { title: '강의 시간', width: 1.5 },
    { title: '정원', width: 1 },
    { title: '관리', width: 2 },
  ];
  const tableData = [
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
  // 모달 버튼 클릭이벤트
  const handleModalOk = () => {
    console.log(contents);
    console.log('modal click - ok');
  };
  const handleModalCancel = () => {
    console.log(contents);
    console.log('modal click - no');
  };
  /* 서버 데이터 연동 테스트 - 테이블에 정보 불러오기 */
  const [tableDatas, setTableDatas] = useState([]);
  const getApprovalData = async () => {
    await handleGetApprovalLecture(setTableDatas);
  };
  useEffect(() => {
    getApprovalData();
  }, []);

  // JSX
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '95px',
          background: 'var(--search-bg-color)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        강의 개설 요청 승인
      </div>
      <CommonButton btnType="page" value="뒤로가기" onClick={handlePageBtnClick} />
      <Table header={tableHeader} data={tableDatas} hasPage={true} maxPage={5}>
        {tableDatas.map((item, idx) => {
          return (
            <div key={idx}>
              <div>{item.lectureNm}</div>
              <div>{item.majorName}</div>
              <div>{item.score}</div>
              <div>{item.nm}</div>
              <div>
                {item.buildingNm} {item.lectureRoomNm}
              </div>
              <div>
                {item.strTime}~{item.endTime}
              </div>
              <div>
                {item.currentPeople}/{item.maxPeople}
              </div>
              <div>
                <CommonButton
                  btnType="table"
                  color="blue"
                  value={item.procedures === 1 ? '개설 승인' : '개강 승인'}
                  onClick={() => handleAcceptLecture(item)}
                />
                <CommonButton
                  btnType="table"
                  color="red"
                  value="거절"
                  onClick={() => handleRejectLecture(item)}
                />
              </div>
            </div>
          );
        })}
      </Table>
      {display ? (
        <CommonModal
          modalSize="small"
          modalTitle="요청 승인"
          setDisplay={setDisplay}
          handleModalOk={handleModalOk}
          handleModalCancel={handleModalCancel}
        >
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
    </>
  );
};

export default Approval;
/*
// <CommonModal
//   setDisplay={setDisplay}
//   contents={contents}
//   modalSize="small"
//   modalTitle="개설 승인"
// >
//   <p>모달 작은 창 버전</p>
//   <p>{contents.lecture}</p>
//   <p>내용추가</p>
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
*/
