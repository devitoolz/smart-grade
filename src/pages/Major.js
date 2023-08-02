import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import { Lwrap, PlusModal } from '../styles/LectureRoomCss';
import Input from '../components/Input';
import CommonButton from '../components/CommonButton';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import { Layout } from '../styles/CommonStyle';

const Major = () => {
  //검색 시 사용할 쿼리스트링(상태)
  const situation = useState([]);

  //검색 시 사용할 쿼리스트링(전공명)
  const majorN = useState([]);
  //검색 시 사용할 쿼리스트링목록
  const queries = { situation, majorN };
  //검색버튼 클릭시 state 변경 함수
  const [click, setClick] = useState(false);

  //DropDown value state
  const [value, setValue] = useState('');
  //DropDown 메뉴 Item 상태데이터 state
  // const [상태, set상태] = useState("");
  //DropDown 메뉴 Item 전공명데이터 state
  // const [전공명, set전공명] = useState("");
  const 상태 = [
    {
      id: 1,
      title: '운영',
    },
    {
      id: 2,
      title: '폐지',
    },
  ];

  const 전공명 = [
    {
      id: 1,
      title: 'ㄱ전공',
    },
    {
      id: 2,
      title: 'ㄱ전공',
    },
    {
      id: 3,
      title: 'ㄱ전공',
    },
    {
      id: 4,
      title: 'ㄱ전공',
    },
    {
      id: 5,
      title: 'ㄱ전공',
    },
    {
      id: 6,
      title: 'ㄱ전공',
    },
  ];

  //modalTitle state
  const [modalTitle, setmodalTitle] = useState('강의실추가', '전공추가');
  //전공명 state
  const [majorName, setMajorName] = useState('');
  //전공학점 state
  const [majorScore, setMajorScore] = useState(null);
  //모달창 활성화
  const [showModal, setshowModal] = useState(false);

  const navigate = useNavigate();

  //버튼 onClick시 모달창 열기
  const modalOpen = () => {
    setshowModal(true);
  };

  //취소, x 누를시 모달창 닫기
  const modalClose = () => {
    setshowModal(false);
  };

  const gogo = () => {
    alert('dkdk');
  };

  const hi = () => {
    alert('수정하시겠습니까?');
  };
  const bye = () => {
    alert('삭제하시겠습니까?');
  };

  return (
    <Lwrap>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          placeholder="상태"
          data={상태}
          value={value}
          setValue={setValue}
          reset={true}
          search={true}
        />
        <Dropdown
          length="long"
          placeholder="전공명"
          data={전공명}
          value={value}
          setValue={setValue}
          reset={true}
          search={true}
        />
      </SearchBar>
      <CommonButton btnType="page" value="전공추가" onClick={modalOpen} />
      {showModal === true ? (
        <PlusModal>
          <div className="majorTitle">
            <p>
              <strong> 전공추가 </strong>
            </p>
            <p onClick={modalClose}>
              <FontAwesomeIcon icon={faX} />
            </p>
          </div>
          <div className="majorName">
            <p>전공명</p>
            <div>
              <Input type="text" length="short" value={majorName} setValue={setMajorName}></Input>
            </div>
          </div>
          <div className="btns"></div>
        </PlusModal>
      ) : null}
    </Lwrap>
  );
};
export default Major;
