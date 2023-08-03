import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import { PlusModal } from '../../styles/LectureRoomCss';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import { Layout } from '../../styles/CommonStyle';

const Major = () => {
  ////SearchBar////
  //검색 시 사용할 쿼리스트링(상태)
  const situation = useState([]);

  //검색 시 사용할 쿼리스트링(전공명)
  const majorN = useState([]);

  //검색 시 사용할 쿼리스트링목록
  const queries = { situation, majorN };

  //검색버튼 클릭시 state 변경 함수
  const [click, setClick] = useState(false);

  ////DropDown////
  //DropDown value state
  const [value, setValue] = useState(null);
  //DropDown 메뉴 Item 상태데이터 state
  const [status, setStatus] = useState('');
  // DropDown 메뉴 Item 전공명데이터 state
  const [majsornm, setMajsornm] = useState('');

  // 상태 임시 데이터
  const _status = [
    {
      id: 1,
      title: '운영',
    },
    {
      id: 2,
      title: '폐지',
    },
  ];
  //전공명 임시 데이터
  const _majsornm = [
    {
      id: 1,
      title: 'ㄱ전공',
    },
    {
      id: 2,
      title: 'aa전공',
    },
    {
      id: 3,
      title: 'g전공',
    },
    {
      id: 4,
      title: 'e전공',
    },
    {
      id: 5,
      title: 'd전공',
    },
    {
      id: 6,
      title: 'ㄱgf전공',
    },
  ];

  //table header
  const tableHeader = [
    { title: '번호', width: 1 },
    { title: '전공 명', width: 3 },
    { title: '졸업학점', width: 1 },
    { title: '폐지여부', width: 1 },
    { title: '관리', width: 2 },
    { title: '비고', width: 1 },
  ];

  //추후 API GET 요청 데이터
  const _data = [
    {
      imajor: '1',
      majorName: 'a관',
      graduationScore: 130,
      status: '',
      management: '',
      note: '',
    },
    {
      imajor: '1',
      majorName: 'a관',
      graduationScore: 130,
      status: '',
      management: '',
      note: '',
    },
    {
      imajor: '1',
      majorName: 'a관',
      graduationScore: 130,
      status: '',
      management: '',
      note: '',
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
    <Layout>
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          placeholder="상태"
          data={_status}
          value={value}
          setValue={setValue}
          reset={true}
          search={true}
        />
        <Dropdown
          length="long"
          placeholder="전공명"
          data={_majsornm}
          value={value}
          setValue={setValue}
          reset={true}
          search={true}
        />
      </SearchBar>
      <CommonButton btnType="page" value="전공추가" onClick={modalOpen} />
      <Table header={tableHeader} data={_data} hasPage={true} maxPage={5}>
        {_data.map(item => {
          return (
            <div key={item.imajor}>
              <div>{item.imajor}</div>
              <div>{item.majorName}</div>
              <div>{item.graduationScore}</div>
              <div>{item.status}</div>
              <div>{item.management}</div>
              <div>{item.note}</div>
            </div>
          );
        })}
      </Table>
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
    </Layout>
  );
};
export default Major;
