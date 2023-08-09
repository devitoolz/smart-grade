import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { PlusModal } from '../../styles/LectureRoomCss';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import Table from '../../components/Table';
import { Layout } from '../../styles/CommonStyle';
import CommonModal from '../../components/CommonModal';
import { ModalStyle } from '../../styles/MyStyleCSS';

const LectureRoom = () => {
  ////SearchBar//////
  //검색 시 사용할 쿼리스트링(건물명)
  const queries = { building: 'a관 ' };

  // 검색 버튼 클릭 state 변경 함수
  const [click, setClick] = useState(false);

  ////Dropdown////

  const [value, setValue] = useState(null);

  //Dropdown 메뉴 Item 데이터??
  const [temp, setTemp] = useState([]);

  //Dropdown 메뉴 Item 데이터
  const _temp = [
    { id: 1, title: 'a관' },
    { id: 2, title: 'b관' },
    { id: 3, title: 'c관' },
  ];

  ////Table////
  //table header
  const tableHeader = [
    { title: '장소', width: 3 },
    { title: '최대수용인원', width: 1.5 },
    { title: '관리', width: 2 },
    { title: '비고', width: 1.5 },
  ];

  //추후 API GET 요청 데이터
  const datas = [
    {
      ilectureRoom: '1',
      buildingname: 'a관',
      lectureRoomName: '201호',
      maxCapacity: 100,
      management: 2,
      note: '',
    },
    {
      ilectureRoom: '2',
      buildingname: 'b관',
      lectureRoomName: '202호',
      maxCapacity: 100,
      management: 2,
      note: '',
    },
    {
      ilectureRoom: '3',
      buildingname: 'c관',
      lectureRoomName: '203호',
      maxCapacity: 100,
      management: 2,
      note: '',
    },
  ];

  //modal 활성화 여부
  const [showModal, setShowModal] = useState(false);

  //강의실추가 버튼 클릭시 함수실행
  const modalOpen = () => {
    setShowModal(true);
  };

  //api test
  const getBuildingTest = async () => {
    try {
      const res = await axios.get('/api/lectureroom');
      const result = res.data;
      console.log('나다', result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  ///getLoad
  //lectureLoom data 담는 list
  const [data, setData] = useState([]);

  const getBuildingTestLoad = async () => {
    try {
      const _result = await getBuildingTest();
      // console.log(_result);
      // console.log(_result.lectureRoom);
      // const buildingTable = _result.lectureRoom.map(item => {
      //   let data = {
      //     building: item.buildingName,
      //     place: item.lectureRoomName,
      //     capacity: item.maxCapacity,
      //   };
      //   return data;
      // });
      setData(_result.lectureRoom);
      return _result.lectureRoom;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBuildingTestLoad();
  }, []);

  //commonModal display state
  const [display, setDisplay] = useState(false);

  //commonModal open state
  const handleModalOk = () => {
    //setDisplay(false); //setter쓰면 이중으로 됨.
    //하지만 function은 써줘야 함.
  };

  //commonModal close state
  const handleModalCancel = () => {
    //setDisplay(false);
  };

  //api delete test
  const LectureRoomDeleteTest = async _id => {
    try {
      const res = await axios.delete(`/api/lectureroom?ilectureRoom={_id}`);
      const result = res.data;
    } catch (err) {
      console.log(err);
    }
  };
  //삭제모달창 확인 클릭시
  const deleteModalOk = async _id => {
    
  };

  return (
    <>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          placeholder="건물명"
          data={_temp}
          value={value}
          setValue={setValue}
          reset={true}
          search={true}
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
          handleModalCancel={handleModalCancel}
        >
          <div
            style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
              borderBottom: '1px solid #dae8ff',
            }}
          >
            <p>장소</p> <Input length="middle" placeholder="건물명" />
            <Input type="number" length="short" placeholder="호" />
          </div>
          <div
            style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',

              borderBottom: '1px solid #dae8ff',
            }}
          >
            <p>최대수용인원</p> <Input type="number" length="short" />
          </div>
        </CommonModal>
      ) : null}

      {display ? (
        <CommonModal
          setDisplay={setDisplay}
          modalSize="small"
          modalTitle="강의실 삭제"
          handleModalOk={handleModalOk}
          handleModalCancel={handleModalCancel}
        >
          <p>삭제 하시겠습니까?</p>
        </CommonModal>
      ) : null}

      <Table header={tableHeader} data={data} hasPage={true} maxPage={5}>
        {data.map(item => {
          console.log(item);
          return (
            <div key={item.ilectureRoom}>
              <div>
                {item.buildingName} {item.lectureRoomName}
              </div>
              <div>{item.maxCapacity}</div>
              <div>
                <CommonButton
                  btnType="table"
                  value="삭제"
                  color="red"
                  onClick={() => setDisplay(true)}
                ></CommonButton>
              </div>
              <div></div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default LectureRoom;
