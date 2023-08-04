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
    { title: '번호', width: 1 },
    { title: '장소', width: 3 },
    { title: '최대수용인원', width: 1 },
    { title: '관리', width: 2 },
    { title: '비고', width: 1 },
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
  //강의실 추가 모달창 안 호실 인풋창 state
  const [roomNumber, setRoomNumber] = useState('');
  //강의실 추가 모달창 안 최대수용인원 인풋창 state
  const [capacityNumber, setCapacityNumber] = useState('');

  const gogo = () => {
    console.log('gogo');
  };

  const bye = () => {
    alert('삭제하시겠습니까?');
  };

  //modal 활성화 여부
  const [showModal, setshowModal] = useState(false);

  //modal활성화 시 배경 변경
  const [modalBlack, setModalBlack] = useState(false);

  //강의실추가 버튼 클릭시 함수실행
  const modalOpen = () => {
    setshowModal(true);
  };

  //취소 , x 클릭시 함수 실행
  const modalClose = () => {
    setshowModal(false);
  };

  //modal활성화 시 배경 변경
  //building state
  const [building, setBuilding] = useState('');
  //room state
  const [place, setPlace] = useState('');
  //최대수용인원 state
  const [capacity, setCapacity] = useState(null);

  //api test
  const getBuildingTest = async () => {
    try {
      const res = await axios.get('/api/lectureroom?page=1&buildingName=1&lectureRoomName=1');
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
        <PlusModal>
          <div className="lectureLoomTitle">
            <p>
              <strong>강의실 추가</strong>
            </p>
            <p onClick={modalClose}>
              <FontAwesomeIcon icon={faX} />
            </p>
          </div>
          <div className="placeTitle">
            <p>장소 :</p>
            <div className="controls">
              <div className="dropDownControl">
                <Dropdown placeholder="건물명" />
              </div>
              <div className="inputControl">
                <Input type="number" length="short" value={roomNumber} setValue={setRoomNumber} />
                <p>호</p>
              </div>
            </div>
          </div>
          <div className="capacityTitle">
            <p>최대수용인원 : </p>
            <div className="inputControl">
              <Input
                type="number"
                length="short"
                value={capacityNumber}
                setValue={setCapacityNumber}
              />
              <p>명</p>
            </div>
          </div>
          <div className="btns">
            <CommonButton
              btnType="modal"
              color="blue"
              value="등록"
              onClick={gogo}
              className="registeration"
            ></CommonButton>
            <CommonButton
              btnType="modal"
              color="gray"
              value="취소"
              onClick={modalClose}
              className="cancellation"
            ></CommonButton>
          </div>
        </PlusModal>
      ) : null}

      {display ? (
        <CommonModal
          setDisplay={setDisplay}
          modalSize="small"
          modalTitle="강의실 삭제"
          handleModalOk={handleModalOk}
          handleModalCancel={handleModalCancel}
        ></CommonModal>
      ) : null}

      <Table header={tableHeader} data={data} hasPage={true} maxPage={5}>
        {data.map(item => {
          return (
            <div key={item.ilectureRoom}>
              <div>{item.ilectureRoom}</div>
              <div>
                {item.buildingName} {item.lectureRoomName}
              </div>
              <div>{item.maxCapacity}</div>
              <div>
                <CommonButton
                  btnType="table"
                  value="삭제"
                  color="red"
                  onClick={gogo}
                ></CommonButton>
              </div>
              <div></div>
            </div>
          );
        })}
      </Table>

      <button onClick={() => setDisplay(true)}>zzz</button>
    </>
  );
};

export default LectureRoom;
