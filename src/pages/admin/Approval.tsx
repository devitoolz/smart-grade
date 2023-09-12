import React, { useEffect, useState } from 'react';
import { TextArea } from '../../styles/MyStyleCSS';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CommonButton from '../../components/CommonButton';
import CommonModal from '../../components/CommonModal';
import Table from '../../components/Table';
import { patchRejectLecture, patchApproveLecture } from '../../apis/fetch';
import useQuerySearch from '../../hooks/useSearchFetch';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import { ObjectType } from '../../types/components';
import { dayData } from '../../modules/timetable';

const Approval = () => {
  const [display, setDisplay] = useState(false);
  const [contents, setContents] = useState<ObjectType>({});
  // 승인
  const [isAccept, setIsAccept] = useState(true);
  // 승인 및 거절 선택 여부
  const [procedureState, setProcedureState] = useState(0);
  const handleRejectLecture = (_item: ObjectType) => {
    setContents(_item);
    setProcedureState(0);
    setDisplay(true);
    setIsAccept(false);
  };
  const handleAcceptLecture = (_item: ObjectType) => {
    setContents(_item);
    setProcedureState(_item.procedures);
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
  // 강의 요청 승인 patch
  const patchApproveLectureWait = async (_ilecture: number, _procedure: number) => {
    await patchApproveLecture(_ilecture, _procedure);
  };
  // 강의 개강개설 거절 patch
  const patchRejectLectureWait = async (_ilecture: number, reason: string) => {
    await patchRejectLecture(_ilecture, reason);
  };
  // 모달 버튼 클릭이벤트
  const handleModalOk = async () => {
    switch (procedureState) {
      case 0:
        await patchRejectLectureWait(contents.ilecture, reason);
        break;
      case 1:
        await patchApproveLectureWait(contents.ilecture, procedureState);
        break;
      case 2:
        await patchApproveLectureWait(contents.ilecture, procedureState);
        break;
      default:
        break;
    }
    setReason('');
    window.location.reload();
  };
  const handleModalCancel = () => {
    setReason('');
  };

  // 쿼리
  const [click, setClick] = useState(false);
  const [query, setQuery] = useSearchParams();
  // useEffect(() => {
  //   query.set('procedures', '-2');
  //   setQuery(query);
  // }, []);
  const url = '/api/admin/lecture';
  const { data, pending, error } = useQuerySearch(url, click);

  // textarea
  const [reason, setReason] = useState('');
  const inputRejectReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };
  const status = ['신청 반려', '개설 승인', '개강 승인', '개강'];
  // 검색기능
  const [procedures, setLectureStatus] = useState<string | number | null>('-2');
  const statusList = [
    {
      id: '-2',
      title: '전체보기',
    },
    {
      id: '0',
      title: '신청 반려',
    },
    {
      id: '1',
      title: '개설 승인',
    },
    {
      id: '2',
      title: '개강 승인',
    },
  ];
  const queries = { procedures };
  // JSX
  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          length="short"
          placeholder="강의상태"
          data={statusList}
          value={procedures}
          setValue={setLectureStatus}
          reset={false}
        />
      </SearchBar>
      <CommonButton btnType="page" value="뒤로가기" onClick={handlePageBtnClick} />
      <Table
        header={tableHeader}
        data={(data as ObjectType)?.lectures}
        hasPage={true}
        maxPage={(data as ObjectType)?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {(data as ObjectType)?.lectures?.map((item: ObjectType, idx: number) => {
          return (
            <div key={idx}>
              <div>{item.lectureNm}</div>
              <div>{item.majorName}</div>
              <div>{item.score}</div>
              <div>{item.nm}</div>
              <div>
                {item.buildingNm} {item.lectureRoomNm}호
              </div>
              <div>
                {item.strTime}~{item.endTime} {dayData[item.dayWeek]}
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
                  disabled={!item.procedures || item.procedures === 3}
                />
                {item.procedures ? (
                  <CommonButton
                    btnType="table"
                    color="red"
                    value="거절"
                    onClick={() => handleRejectLecture(item)}
                    disabled={!item.procedures || item.procedures === 3}
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
              <p className="procedure">{status[procedureState]}</p>
              <p>다음 요청을 승인하시겠습니까?</p>
            </>
          ) : (
            <>
              <p className="procedure">{status[procedureState]}</p>
              {/* <span>
                요청 거절 사유 <span style={{ fontSize: 16, color: 'red' }}>* 100자 제한</span>
              </span> */}
              <TextArea
                maxLength={100}
                onChange={inputRejectReason}
                placeholder="요청 거절 사유 입력(100자 제한)"
              />
            </>
          )}
        </CommonModal>
      ) : null}
    </>
  );
};

export default Approval;
