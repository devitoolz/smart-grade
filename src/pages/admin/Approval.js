import React, { useState, useEffect } from 'react';
import { TextArea } from '../../styles/MyStyleCSS';
import { useNavigate, useLocation } from 'react-router-dom';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Table from '../../components/Table';
import { handleGetApprovalLecture, patchRejectLecture } from '../../api/fetch';
import useQuerySearch from '../../hooks/useSearchFetch';

const Approval = () => {
  const [display, setDisplay] = useState(false);
  const [contents, setContents] = useState({});
  // 승인
  const [isAccept, setIsAccept] = useState(true);
  // 승인 및 거절 선택 여부
  const [proceduresStat, setproceduresStat] = useState(false);
  const handleRejectLecture = _item => {
    console.log('Reject');
    setContents(_item);
    setproceduresStat(false);
    console.log(_item);
    setDisplay(true);
    setIsAccept(false);
  };
  const handleAcceptLecture = _item => {
    console.log('Accept');
    setContents(_item);
    setproceduresStat(true);
    console.log(_item);
    setDisplay(true);
    setIsAccept(true);
  };

  //
  const navigate = useNavigate();
  const handlePageBtnClick = () => {
    navigate('/admin/bachelor/lecture');
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
  // 강의 개강개설 거절 patch
  const patchRejectLectureWait = async () => {
    await patchRejectLecture();
  };
  // 모달 버튼 클릭이벤트
  const handleModalOk = async () => {
    console.log(contents);
    console.log('modal click - ok');
    proceduresStat ? console.log('승인') : await patchRejectLectureWait();
    console.log(reason);
    setReason('');
  };
  const handleModalCancel = () => {
    console.log(contents);
    console.log('modal click - no');
    setReason('');
  };
  /* 서버 데이터 연동 테스트 - 테이블에 정보 불러오기 */
  // const [tableDatas, setTableDatas] = useState([]);
  // const getApprovalData = async () => {
  //   await handleGetApprovalLecture(setTableDatas);
  // };
  // useEffect(() => {
  //   getApprovalData();
  // }, []);
  // const [pending, setPending] = useState(false);
  // 쿼리
  const [click, setClick] = useState(false);
  // const queries = { lectureStatus, lectureName, professorName };
  const url = '/api/admin/lecture';
  const { data, pending } = useQuerySearch(url, click, '&procedures=-2');

  // textarea
  const [reason, setReason] = useState('');
  const inputRejectReason = e => {
    setReason(e.target.value);
  };
  const status = ['신청 반려', '개설 승인', '개강 승인', '개강'];

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
      <Table
        header={tableHeader}
        data={data?.lectures}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
      >
        {data?.lectures?.map((item, idx) => {
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
                  color={item.procedures === 0 ? 'gray' : 'blue'}
                  value={status[item.procedures]}
                  onClick={() => handleAcceptLecture(item)}
                  disabled={!item.procedures}
                />
                {item.procedures ? (
                  <CommonButton
                    btnType="table"
                    color="red"
                    value="거절"
                    onClick={() => handleRejectLecture(item)}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </Table>
      {display ? (
        <CommonModal
          modalSize="small"
          modalTitle={
            // procedures
            isAccept ? '요청 승인' : '요청 거절'
          }
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
            <>
              <span>요청 거절 사유</span>
              <span style={{ fontSize: 16, color: 'red' }}>* 100자 제한</span>
              <TextArea maxLength={100} onChange={inputRejectReason} />
            </>
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
