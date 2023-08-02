import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import { Lwrap, PlusModal } from '../styles/LectureRoomCss';
import Input from '../components/Input';
import CommonButton from '../components/CommonButton';
import { useNavigate } from 'react-router-dom';

const Major = () => {
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
      <SearchBar>
        <Dropdown placeholder="" />
        <Dropdown length="long" placeholder="전공명" />
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
