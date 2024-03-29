import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import Table from '../../components/Table';
import CommonModal from '../../components/CommonModal';
import api from '../../apis/api';
import useQuerySearch from '../../hooks/useSearchFetch';
import { useNavigate } from 'react-router-dom';

const LectureRoom = () => {
  const navigate = useNavigate();
  //강의실 pk값
  const [, setIlectureRoom] = useState('');
  //강의실 추가시 건물명 state

  const [buildingNameData, setBuildingNameData] = useState('');
  //강의실 추가시 호실명 state
  const [lectureRoomName, setLectureRoomName] = useState('');

  //강의실 추가시 최대수용인원 state
  const [maxCapacity, setMaxCapacity] = useState('');

  // 삭제된 강의실을 추적하기 위한 state
  const [deletedLectureRoom, setDeletedLectureRoom] = useState('');

  // 강의실을 삭제로 표시하는 함수
  const markLectureRoomAsDeleted = ilectureRoomId => {
    setDeletedLectureRoom(prevDeletedRooms => [...prevDeletedRooms, ilectureRoomId]);
  };

  // 강의실이 삭제되었는지 확인하는 함수
  const isLectureRoomDeleted = ilectureRoomId => {
    return deletedLectureRoom.includes(ilectureRoomId);
  };

  ////SearchBar//////

  // 검색 버튼 클릭 state 변경 함수
  const [click, setClick] = useState(false);
  //searchBar dropdown buildingName state
  const [buildingName, setBuildingName] = useState('');
  //searchBar 운영,폐지 key, value 이름

  ////Table////
  //table header
  const tableHeader = [
    { title: '장소', width: 3 },
    { title: '최대수용인원', width: 1.5 },
    { title: '관리', width: 2 },
    { title: '비고', width: 1.5 },
  ];

  //modal 활성화 여부
  const [showModal, setShowModal] = useState(false);

  //강의실추가 버튼 클릭시 함수실행
  const PlueModalOpen = () => {
    setShowModal(true);
  };

  //검색 시 사용할 쿼리스트링(건물명)
  const queries = { buildingName };

  //api get hook test
  const url = `/api/admin/lectureroom`;
  const { data, pending, error } = useQuerySearch(url, click);
  const [roomListData, setRoomListData] = useState([]);
  useEffect(() => {
    setRoomListData(data?.lectureRoomList);
  }, [data]);
  //searchBar dropdown
  const buildingDataList = [];
  data?.lectureRoom?.forEach(item => {
    buildingDataList.push({ id: item.buildingName, title: item.buildingName });
  });

  //api post test
  const postBuildinglist = async (lectureRoomName, buildingName, maxCapacity) => {
    const headers = { 'Content-Type': 'application/json' };
    try {
      // await api.post(
      //   `/api/lectureroom?ilectureRoom=${ilectureRoom}&lectureRoomName=${lectureRoomName}&buildingName=${buildingName}&maxCapacity=${maxCapacity}&delYn=0`,
      //   { headers }
      // );
      const postData = {
        lectureRoomName,
        buildingName,
        maxCapacity,
      };
      const res = await api.post(
        // `/api/admin/lectureroom?ilectureRoom=${ilectureRoom}&lectureRoomName=${lectureRoomName}&buildingName=${buildingName}&maxCapacity=${maxCapacity}&delYn=0`,
        `/api/admin/lectureroom`,
        postData,

        { headers }
      );
      console.log(res);
      // 목록을 갱신한다.
      navigate('/admin/college/lecture-room');
    } catch (err) {
      console.log(err);
    }
  };

  //commonModal display state
  const [display, setDisplay] = useState(false);

  //commonModal open state
  const handleModalOk = async () => {
    //setDisplay(false); //setter쓰면 이중으로 됨.
    //하지만 function은 써줘야 함.

    if (
      buildingNameData !== '' &&
      buildingNameData !== null &&
      lectureRoomName !== null &&
      lectureRoomName !== '' &&
      maxCapacity !== null &&
      maxCapacity !== ''
    ) {
      await postBuildinglist(lectureRoomName, buildingNameData, maxCapacity);

      const { data } = await api.get(url);
      console.log(data?.lectureRoomList);
      setRoomListData(data?.lectureRoomList);

      alert('등록되었습니다.');
      setIlectureRoom('');
      setLectureRoomName('');
      setBuildingName('');
      setMaxCapacity('');
      //window.location.reload();
    } else {
      alert('입력되지 않은 정보가 있습니다.');
      setIlectureRoom('');
      setBuildingNameData('');
      setLectureRoomName('');
      setMaxCapacity('');
    }
  };
  //강의실추가 모달창 취소 버튼 클릭시
  const handleModalCancel = () => {
    //setDisplay(false);
    setBuildingNameData('');
    setLectureRoomName('');
    setMaxCapacity('');
  };

  //api delete test
  const LectureRoomDeleteTest = async _id => {
    try {
      await api.delete(`/api/admin/lectureroom?ilectureRoom=${_id}`);
      //await getBuildingTestLoad()s;
    } catch (err) {
      console.log(err);
    }
  };

  //삭제모달창 확인 클릭시
  //Id를 담을 state
  const [saveId, setSaveId] = useState('');
  const deleteModalOk = async () => {
    LectureRoomDeleteTest(saveId);
    markLectureRoomAsDeleted(saveId); // "사용불가"로 상태 변경
    // window.location.reload();
  };

  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          placeholder="건물명"
          length="short"
          data={buildingDataList}
          value={buildingName}
          setValue={setBuildingName}
          reset
          search={true}
        />
      </SearchBar>
      <CommonButton btnType="page" value="강의실 추가" onClick={PlueModalOpen} />

      {/* modal이 활성화되면 modal을 띄워라 아니면 null  */}
      {showModal === true ? (
        <CommonModal
          setDisplay={setShowModal}
          modalSize="small"
          modalTitle="강의실 추가"
          handleModalOk={handleModalOk}
          handleModalCancel={handleModalCancel}
        >
          <div
            style={{
              display: 'flex',
              gap: '10px',
              borderBottom: '1px solid #dae8ff',
              width: '100%',
              padding: '15px 20px',
            }}
          >
            <p style={{ width: '40%' }}>장소</p>
            <div>
              <Dropdown
                length="short"
                placeholder="건물명"
                data={buildingDataList}
                value={buildingNameData}
                setValue={setBuildingNameData}
                reset
              />
            </div>
            <Input
              type="text"
              length="short"
              maxLength={3}
              value={lectureRoomName}
              // setValue={() => {
              //   // 입력값이 숫자인지 확인하는 정규표현식
              //   const isNumeric = /^[0-9]*$/;
              //   setBuildingNameData(isNumeric);
              //   // 입력값이 숫자인 경우에만 setValue 함수 호출
              //   // if (isNumeric.test(e.target.value)) {
              //   //   setBuildingNameData(e.target.value);
              //   // }
              // }}
              setValue={e => {
                const value = e.target.value;
                // 정규 표현식으로  3자리 숫자만 허용
                if (/^\d{0,3}$/.test(value)) {
                  setLectureRoomName(value);
                } else {
                  setLectureRoomName('');
                }
              }}
            />
            <p>호</p>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '30px',
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderBottom: '1px solid #dae8ff',
              width: '100%',
              padding: '15px 11px',
            }}
          >
            <p>최대수용인원</p>
            <Input
              type="text"
              length="middle"
              maxLength={2}
              value={maxCapacity}
              setValue={e => {
                const value = e.target.value;
                // 정규 표현식으로  3자리 숫자만 허용
                if (/^\d{0,3}$/.test(value)) {
                  setMaxCapacity(value);
                } else {
                  setMaxCapacity('');
                }
              }}
            />
          </div>
        </CommonModal>
      ) : null}

      {display ? (
        <CommonModal
          setDisplay={setDisplay}
          modalSize="small"
          modalTitle="강의실 삭제"
          handleModalOk={deleteModalOk}
          handleModalCancel={handleModalCancel}
        >
          <p>삭제 하시겠습니까?</p>
        </CommonModal>
      ) : null}

      <Table
        header={tableHeader}
        data={roomListData}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {roomListData?.map(item => {
          const isDeleted = isLectureRoomDeleted(item.ilectureRoom); //강의실 삭제 되었는지 체크
          return (
            <div key={item.ilectureRoom}>
              <div>
                {item.buildingName}
                {'  '}
                {item.lectureRoomName} {'  '}호
              </div>
              <div>{item.maxCapacity}</div>
              <div>
                <CommonButton
                  btnType="table"
                  value="삭제"
                  color={item.delYn === 1 || isDeleted ? 'gray' : 'red'}
                  disabled={item.delYn || isDeleted} // 삭제된 경우 버튼 비활성화
                  onClick={() => {
                    setDisplay(true);
                    setSaveId(item.ilectureRoom);
                    // markLectureRoomAsDeleted(item.ilectureRoom);  강의실을 삭제로 표시
                  }}
                />
              </div>
              <div>{isDeleted ? '사용불가' : item.delYn === 1 ? '사용불가' : null}</div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default LectureRoom;
