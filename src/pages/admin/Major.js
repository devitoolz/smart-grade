import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import CommonButton from '../../components/CommonButton';
import Table from '../../components/Table';

import useQuerySearch from '../../hooks/useSearchFetch';
import CommonModal from '../../components/CommonModal';
import { useSelector } from 'react-redux';
import api from '../../apis/api';

const Major = () => {
  ////SearchBar////

  // searchBar 전공명 state
  const [majorName, setMajorName] = useState('');
  //searchBar 전공명 상태 state
  const [delYn, setDelYn] = useState(null);
  //검색 시 사용할 쿼리스트링목록
  const queries = { majorName, delYn };

  //searchBar 검색버튼 클릭시 state 변경 함수
  const [click, setClick] = useState(false);

  ////DropDown////
  //DropDown value state

  //졸업학점
  const [graduationScore, setGraduationScore] = useState('');

  // 상태 데이터
  const _status = [
    {
      id: '0',
      title: '운영',
    },
    {
      id: '1',
      title: '폐지',
    },
  ];
  //searchBar 운영,폐지 key, value 이름
  const propertyName = { key: 'id', value: 'title' };
  //table header
  const tableHeader = [
    { title: '전공 명', width: 2 },
    { title: '졸업학점', width: 1 },
    { title: '폐지여부', width: 1 },
    { title: '관리', width: 1.5 },
    { title: '비고', width: 2 },
  ];

  //전공추가 시 전공명
  const [newMajorName, setNewMajorName] = useState('');

  //모달창 활성화
  const [showModal, setShowModal] = useState(false);

  //변경버튼 클릭시 모달창 활성화
  const [changeModalShow, setChangeModalShow] = useState(false);

  //폐지버튼 클릭시 모달창 활성화
  const [disUseModalShow, setDisUseModalShow] = useState(false);

  // 변경할 항목 pk값 저장할 state.
  const [selectMajorID, setSelectMajorID] = useState(null);

  //변경전 전공명 state
  const [selectMajorName, setSelectMajorName] = useState('');
  // 변경할 항목 전공명 저장할 state.
  const [selectMajorNameNow, setSelectMajorNameNow] = useState('');

  //전공리스트 state 전역관리
  const { allMajorList } = useSelector(state => state.major);
  // console.log(allMajorList);

  //전공명 id state
  const [majorId, setMajorId] = useState('');

  //변경버튼 state
  const [, setChangeClickShow] = useState(false);

  //disable 버튼 state
  const [, setDisabled] = useState(false);

  //api get hook test
  const url = '/api/major';
  const { data, pending, error } = useQuerySearch(url, click);

  //버튼 onClick시 모달창 열기
  const modalOpen = () => {
    setShowModal(true);
  };

  //변경버튼 클릭시 pk값, majorName 담는것
  const changeModalOpen = async (_imajor, _imajorName) => {
    if (selectMajorID === _imajor) {
      // 전공명 앞뒤 공백 제거하기
      const tempStr = selectMajorName.trim();

      //전공명을 변경하지 않은 경우 체크
      if (selectMajorNameNow === tempStr) {
        alert('전공명을 변경해 주세요.');
        return;
      }
      // 서버로 변경된 전공명을 전달한다.
      const headers = { 'Content-Type': 'application/json' };
      const patchDatas = {
        imajor: _imajor,
        majorName: `${tempStr}`,
      };

      try {
        await api.patch(`/api/major`, patchDatas, { headers });
        //변경 전 전공명 state
        setSelectMajorNameNow(tempStr);
        // console.log('전공명 서버 수정 완료 : ', result);
      } catch (err) {
        console.log('전공명 서버 수정 실패 : ', err);
      }

      // 여기서 화면을 갱신한다.
      const temp = isDataArr.map(item => {
        if (item.imajor === selectMajorID) {
          if (item.majorName !== tempStr) {
            item.isChange = 1;
            item.originName = '구 ' + item.majorName;
            item.majorName = tempStr;
          }
        }
        return item;
      });
      // console.log(temp);
      setDataArr(temp);
      setSelectMajorID(null);
      setSelectMajorName('');
    } else {
      // 다르므로
      setSelectMajorID(_imajor);
      setSelectMajorName(_imajorName);
      setSelectMajorNameNow(_imajorName);
    }
  };

  // 변경버튼 클릭시 전공명 변경 실행할 함수
  const handleChangeName = e => {
    setSelectMajorName(e.target.value);
  };

  //폐지버튼 클릭시 모달창 오픈
  const disUseModalOpen = _majorId => {
    if (selectMajorID === _majorId) {
      // 초기화
      setSelectMajorID(null);
      setSelectMajorName('');
    } else {
      setDisUseModalShow(true);
      setMajorId(_majorId);
    }
  };

  //api post test
  const MajorPostTest = async (newMajorName, graduationScore) => {
    const headers = { 'Content-Type': 'application/json' };

    try {
      await api.post(
        `/api/major?majorName=${newMajorName}&graduationScore=${parseInt(graduationScore)}`,
        { headers }
      );
      handleModalCancel();
      alert('등록되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };
  //api delete test
  const MajorDeleteTest = async _id => {
    try {
      const res = await api.delete(`/api/major?imajor=${_id}`);
      const result = res.data;
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(data?.major);

  //변경 버튼 클릭시
  const changeClickShowOpen = () => {
    alert('항목을 입력하셔야 합니다.');
    setChangeClickShow(true);
  };

  //전공명 변경 모달 취소버튼 클릭시
  const chnageClickCloseWin = () => {
    // 초기화
    setSelectMajorID(null);
    setSelectMajorName('');
    setShowModal(false);
  };

  //폐지모달창 확인 클릭시
  const disuesModalOk = async _id => {
    setDisabled(true);
    await MajorDeleteTest(_id);
    const temp = data.major.map(item => {
      // 강제로 변경상태 기록
      if (_id === item.imajor) {
        item.delYn = 1;
      }
      return item;
    });
    setDataArr(temp);
  };

  const handleModalOk = () => {
    if (newMajorName != '' && graduationScore != '') {
      MajorPostTest(newMajorName, graduationScore);
    } else {
      alert('내용을 입력해 주세요.');
      setNewMajorName('');
      setGraduationScore('');
    }
  };

  //commonModal close state
  const handleModalCancel = () => {
    //setDisplay(false);
    setShowModal(false);
    setNewMajorName('');
    setGraduationScore('');
  };

  // api 전공리스트 전체 보기
  const [isDataArr, setDataArr] = useState([]);
  useEffect(() => {
    // console.log(data);

    if (data) {
      const temp = data?.major?.map(item => {
        // 강제로 변경상태 기록
        item.isChange = 0;
        if (item.remarks !== '') {
          item.isChange = 1;
        }
        item.originName = item.remarks;
        return item;
      });
      setDataArr(temp);
    }
  }, [data]);

  return (
    <>
      {changeModalShow === true ? (
        <CommonModal
          setDisplay={setChangeModalShow}
          modalSize="small"
          modalTitle="전공명 변경"
          handleModalOk={changeClickShowOpen}
          handleModalCancel={chnageClickCloseWin}
        >
          <p>해당 전공명을 변경하시겠습니까?</p>
        </CommonModal>
      ) : null}
      {disUseModalShow === true ? (
        <CommonModal
          setDisplay={setDisUseModalShow}
          modalSize="small"
          modalTitle="전공 폐지"
          handleModalOk={() => disuesModalOk(majorId)}
          handleModalCancel={() => setShowModal(false)}
        >
          <p>해당 전공을 폐지 하겠습니까?</p>
        </CommonModal>
      ) : null}
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          placeholder="상태"
          data={_status}
          value={delYn}
          setValue={setDelYn}
          propertyName={propertyName}
          reset
          search
        />
        <Dropdown
          length="long"
          placeholder="전공명"
          data={allMajorList}
          propertyName={{ key: 'majorName', value: 'majorName' }}
          value={majorName}
          setValue={setMajorName}
          reset
          search
        />
      </SearchBar>
      <CommonButton btnType="page" value="전공추가" onClick={modalOpen} />
      {showModal === true ? (
        <CommonModal
          setDisplay={setShowModal}
          modalSize="small"
          modalTitle="전공 추가"
          handleModalOk={handleModalOk}
          handleModalCancel={handleModalCancel}
        >
          <div
            style={{
              display: 'flex',
              gap: '41px',
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderBottom: '1px solid #dae8ff',
              width: '100%',
              padding: '15px 25px',
            }}
          >
            <p>전공명</p>
            <div style={{ marginLeft: '40px' }}>
              <Input
                length="long"
                type="text"
                placeholder="전공명"
                value={newMajorName}
                setValue={e => setNewMajorName(e.target.value)}
                reset={setNewMajorName}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '25px',
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderBottom: '1px solid #dae8ff',
              width: '100%',
              padding: '15px 25px',
            }}
          >
            <p>졸업학점</p>
            <div style={{ marginLeft: '40px' }}>
              <Input
                type="number"
                length="short"
                value={graduationScore}
                setValue={e => setGraduationScore(e.target.value)}
              />
            </div>
          </div>
        </CommonModal>
      ) : null}
      <Table
        header={tableHeader}
        data={data?.major}
        hasPage={true}
        maxPage={6}
        pending={pending}
        error={error}
      >
        {isDataArr?.map(item => {
          return (
            <div key={item.imajor}>
              <div>
                {/* {changeClickShow === true ? <Input length="long" type="text"></Input> : null} */}
                {selectMajorID === item.imajor ? (
                  <Input
                    length="long"
                    type="text"
                    value={selectMajorName}
                    setValue={handleChangeName}
                  />
                ) : (
                  item.majorName
                )}
              </div>
              <div>{item.graduationScore}</div>
              <div>{item.delYn === 0 ? null : '폐지'}</div>
              <div>
                <CommonButton
                  btnType="table"
                  color={item.delYn ? 'gray' : 'blue'}
                  value={selectMajorID === item.imajor ? '확인' : '변경'}
                  onClick={() => changeModalOpen(item.imajor, item.majorName)}
                  disabled={item.delYn}
                />
                <CommonButton
                  btnType="table"
                  color={item.delYn ? 'gray' : 'red'}
                  value={selectMajorID === item.imajor ? '취소' : '폐지'}
                  onClick={() => disUseModalOpen(item.imajor)}
                  disabled={item.delYn}
                />
              </div>
              <div>
                {item.isChange === 0 ? null : <span>{item.originName.replace('구', '(구)')}</span>}
              </div>
            </div>
          );
        })}
      </Table>
    </>
  );
};
export default Major;
