import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import Table from '../../components/Table';
import CommonModal from '../../components/CommonModal';
import api from '../../apis/api';
import useQuerySearch from '../../hooks/useSearchFetch';
import axios from 'axios';

const LectureRoom = () => {
  //강의실 추가시 건물명 state
  const [buildingName, setBuildingName] = useState('');

  //강의실 추가시 호실명 state
  const [lectureRoomName, setLectureRoomName] = useState('');

  //강의실 추가시 최대수용인원 state
  const [maxCapacity, setMaxCapacity] = useState('');

  ////SearchBar//////

  // 검색 버튼 클릭 state 변경 함수
  const [click, setClick] = useState(false);
  const [buildingNameData, setBuildingNameData] = useState('');
  //검색 시 사용할 쿼리스트링(건물명)
  const queries = { buildingName };

  //searchBar dropdown buildingName state

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
  const modalOpen = () => {
    setShowModal(true);
  };

  //api get hook test
  const url = '/api/lectureroom';
  const { data, pending, error } = useQuerySearch(url, click);
  //searchBar dropdown
  const buildingDataList = [];
  data?.lectureRoomList?.forEach(item => {
    buildingDataList.push({ id: item.buildingName, title: item.buildingName });
  });

  //api post test
  const postBuildinglist = async (lectureRoomName, buildingName, maxCapacity) => {
    const headers = { 'Content-Type': 'application/json' };
    const postData = {
      lectureRoomName,
      buildingName,
      maxCapacity,
    };
    try {
      await api.post('/api/lectureroom', postData, { headers });
      // const result = res.data;
      // console.log('잘 나오나', result);
      alert('등록되었습니다.');
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
      buildingName !== '' &&
      lectureRoomName !== null &&
      lectureRoomName !== '' &&
      maxCapacity !== null &&
      maxCapacity !== ''
    ) {
      await postBuildinglist(lectureRoomName, buildingName, maxCapacity);
      //window.location.reload();
    } else {
      alert('입력되지 않은 정보가 있습니다.');
      setBuildingNameData('');
      setLectureRoomName('');
      setMaxCapacity('');
    }
  };

  //commonModal close state
  const handleModalCancel = () => {
    //setDisplay(false);

    setLectureRoomName('');
    setMaxCapacity('');
  };

  //api delete test
  const LectureRoomDeleteTest = async _id => {
    try {
      await api.delete(`/api/lectureroom?ilectureRoom=${_id}`);
      //await getBuildingTestLoad();
    } catch (err) {
      console.log(err);
    }
  };

  //삭제모달창 확인 클릭시
  //Id를 담을 state
  const [saveId, setSaveId] = useState('');
  const deleteModalOk = async () => {
    LectureRoomDeleteTest(saveId);
    window.location.reload();
  };

  //임시
  const getLectureRoom = async () => {
    try {
      const res = await axios.get('/api/lectureroom');
      const result = res.data;
      console.log('나오는지 확인', result);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLectureRoom();
  }, []);

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
          search
        />
      </SearchBar>
      <CommonButton btnType="page" value="강의실 추가" onClick={modalOpen} />

      {/* modal이 활성화되면 modal을 띄워라 아니면 null  */}
      {showModal === true ? (
        <CommonModal
          setDisplay={setShowModal}
          modalSize="small"
          modalTitle="강의실 추가"
          handleModalOk={handleModalOk}
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
              />
            </div>
            <Input
              type="number"
              length="short"
              value={lectureRoomName}
              setValue={e => setLectureRoomName(e.target.value)}
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
              type="number"
              length="middle"
              value={maxCapacity}
              setValue={e => setMaxCapacity(e.target.value)}
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
        data={data?.lectureRoomList}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {data?.lectureRoomList?.map(item => {
          return (
            <div key={item.ilectureRoom}>
              <div>
                {item.buildingName}
                {'  '}
                {item.lectureRoomName?.includes('호') === false
                  ? item.lectureRoomName?.concat('호')
                  : item.lectureRoomName}
              </div>
              <div>{item.maxCapacity}</div>
              <div>
                <CommonButton
                  btnType="table"
                  value="삭제"
                  color={item.delYn === 1 ? 'gray' : 'red'}
                  disabled={item.delYn}
                  onClick={() => {
                    setDisplay(true);
                    setSaveId(item.ilectureRoom);
                  }}
                ></CommonButton>
              </div>
              <div>{item.delYn === 1 ? '사용불가' : null}</div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default LectureRoom;
