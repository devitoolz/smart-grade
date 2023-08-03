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
  const data = [
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

      <Table header={tableHeader} data={data} hasPage={true} maxPage={5}>
        {data.map(item => {
          return (
            <div key={item.ilectureRoom}>
              <div>{item.ilectureRoom}</div>
              <div>
                {item.buildingname}
                {item.lectureRoomName}
              </div>
              <div>{item.maxCapacity}</div>
              <div>{item.management}</div>
              <div>{item.note}</div>
            </div>
          );
        })}
      </Table>
    </>
  );
};

export default LectureRoom;
