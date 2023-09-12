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
import { useNavigate } from 'react-router-dom';

const Major = () => {
  const navigator = useNavigate();
  //searchBar
  const [majorName, setMajorName] = useState(''); //전공명 state
  //searchBar 전공명 상태 state
  const [delYn, setDelYn] = useState(''); // 전공명 상태 state

  const queries = { majorName, delYn }; //검색 시 사용할 쿼리스트링목록

  const [click, setClick] = useState(false); // 검색버튼 클릭시 state 변경 함수

  //DropDown//
  //DropDown value state

  //전공명 id state
  const [majorId, setMajorId] = useState('');
  // 변경할 항목 pk값 저장할 state.
  const [selectMajorID, setSelectMajorID] = useState('');

  //변경전 전공명 state
  const [selectMajorName, setSelectMajorName] = useState('');
  // 선택한(변경할) 항목 전공명 저장할 state.
  const [selectMajorNameNow, setSelectMajorNameNow] = useState('');

  //전공리스트 state 전역관리
  const { allMajorList } = useSelector(state => state.major);

  // 변경전 졸업학점
  const [graduationScore, setGraduationScore] = useState('');
  //변경후 졸업학점
  const [graduationScoreNow, setGraduationScoreNow] = useState('');

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

  // 모달창 전공추가 시 전공명 state
  const [newMajorName, setNewMajorName] = useState('');

  // 모달창 졸업학점 추가 시 졸업학점 state
  const [newGraduationScore, setNewGraduationScore] = useState('');

  // 전공추가 모달창 활성화
  const [showModal, setShowModal] = useState(false);

  //변경할 내용(전공,졸업학점) 작성 후 확인 버튼 클릭시 모달창 활성화
  const [changeModalShow, setChangeModalShow] = useState(false);

  //폐지버튼 클릭시 모달창 활성화
  const [disUseModalShow, setDisUseModalShow] = useState(false);

  //disable 버튼 state
  const [, setDisabled] = useState(false);

  //table header
  const tableHeader = [
    { title: '전공 명', width: 2 },
    { title: '졸업학점', width: 1 },
    { title: '폐지여부', width: 1 },
    { title: '관리', width: 1.5 },
    { title: '비고', width: 2 },
  ];

  //api get hook test
  const url = '/api/admin/major';
  const { data, pending, error } = useQuerySearch(url, click);

  //버튼 onClick시 전공, 졸업학점 추가 모달창 열기
  const plusModalOpen = () => {
    setShowModal(true);
  };

  //변경버튼 클릭시 pk값, majorName 담는것
  const changeModalOpen = async (_imajor, _imajorName, _graduationScore) => {
    if (selectMajorID === _imajor) {
      // 전공명 앞뒤 공백 제거하기
      const tempStr = selectMajorName.trim();

      //전공명 또는 졸업학점을 변경하지않은 경우 체크
      if (selectMajorNameNow === tempStr && graduationScoreNow === graduationScore) {
        alert('변경된 정보를 입력하세요');
        return;
      }

      if (tempStr === '') {
        alert('전공명을 입력하세요.');
        return;
      }

      // 참조하기
      // const numberValue = tempScore.replace(/[^0-9]/g, '');
      // if (parseInt(newValue) < 0 || parseInt(newValue) > 100) {
      //   alert('배점은 0 이상 100이하의 숫자만 가능합니다.');
      //   return;
      // }

      //졸업학점기준 최소 110학점이상 135학점 이하 입력 가능
      // const numberValue = graduationScore.replace(/\d{3}/g);

      if (graduationScore < 110 || graduationScore > 135) {
        alert('졸업학점은 110점 이상 135학점 이하로 입력하세요.');
        return;
      }

      if (!graduationScore) {
        alert('졸업학점을 입력하세요.');
        return;
      }

      // //전공명을 변경하지 않은 경우 체크
      // if (selectMajorNameNow === tempStr) {
      //   alert('전공명을 변경해 주세요.');
      //   return;
      // }
      // //졸업학점을 변경하지않은 경우 체크
      // if (graduationScoreNow === graduationScore) {
      //   alert('졸업학점을 변경해 주세요.');
      //   return;
      // }
      setChangeModalShow(true);
    } else {
      // 다르므로
      setSelectMajorID(_imajor);
      setSelectMajorName(_imajorName);
      setSelectMajorNameNow(_imajorName);
      setGraduationScore(_graduationScore);
      setGraduationScoreNow(_graduationScore);
    }
  };

  // 변경버튼 클릭시 전공명 변경 실행할 함수
  // const handleChangeName = e => {
  //   setSelectMajorName(e.target.value);
  // };

  // 변경버튼 클릭시 졸업학점 변경 실행할 함수

  //폐지버튼 클릭시 모달창 오픈
  const disUseModalOpen = _majorId => {
    if (selectMajorID === _majorId) {
      // 초기화
      setSelectMajorID('');
      setSelectMajorName('');
    } else {
      setDisUseModalShow(true);
      setMajorId(_majorId);
    }
  };

  //api post test
  const MajorPostTest = async (newMajorName, newGraduationScore) => {
    const headers = { 'Content-Type': 'application/json' };
    const postData = {
      majorName: newMajorName,
      graduationScore: parseInt(newGraduationScore),
    };
    try {
      await api.post(`/api/admin/major`, postData, { headers });
      handleModalCancel();
      alert('등록되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  //api delete test
  const MajorDeleteTest = async _id => {
    try {
      const res = await api.delete(`/api/admin/major?imajor=${_id}`);
      const result = res.data;
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  //변경 버튼 클릭시
  const changeClickShowOpen = async () => {
    const tempStr = selectMajorName.trim();
    const headers = { 'Content-Type': 'application/json' };
    const patchDatas = {
      imajor: selectMajorID,
      majorName: `${tempStr}`,
      graduationScore: graduationScore,
    };
    try {
      await api.patch(`/api/admin/major`, patchDatas, { headers });
      const res = await api.get(url);
      setDataArr(res.data.vo);

      // 여기서 화면을 갱신한다.
      const temp = isDataArr.map(item => {
        if (item.imajor === selectMajorID) {
          if (item.majorName !== tempStr) {
            // item.isChange = 1;
            item.originName = '구 ' + item.majorName;
            item.majorName = tempStr;
            // item.graduationScore = graduationScore;
          }
          if (item.graduationScore !== graduationScore) {
            item.graduationScore = graduationScore;
          }
        }
        return item;
      });

      setDataArr(temp);
      setSelectMajorID('');
      setSelectMajorName('');
      setGraduationScore('');

      setChangeModalShow(false);
    } catch (err) {
      console.log('전공명 서버 수정 실패 : ', err);
    }
  };

  //전공명 변경 모달 취소버튼 클릭시
  const chnageClickCloseWin = () => {
    // 초기화
    setSelectMajorID(null);
    setSelectMajorName('');

    // setShowModal(false);
  };

  //폐지모달창 확인 클릭시
  const disuesModalOk = async _id => {
    setDisabled(true);
    await MajorDeleteTest(_id);
    const temp = data.vo.map(item => {
      // 강제로 변경상태 기록
      if (_id === item.imajor) {
        item.delYn = 1;
      }
      return item;
    });
    setDataArr(temp);
  };

  //전공추가 모달 창  확인버튼 누를 시
  const handleModalOk = async () => {
    if (newMajorName != '' && newGraduationScore != '') {
      const graduationScoreValue = parseInt(newGraduationScore);
      if (newGraduationScore >= 110 && newGraduationScore <= 135) {
        MajorPostTest(newMajorName, graduationScoreValue);
        // setNewGraduationScore(); //post 후 화면에 전공추가 내용 바로 적용
        setNewMajorName('');
        setNewGraduationScore('');

        const res = await api.get(url);
        setDataArr(res.data.vo);
      } else {
        alert('졸업학점은 110점 이상 135학점 이하로 입력하세요.');
      }
    } else {
      alert('내용을 입력해 주세요.');

      setNewMajorName('');
      setNewGraduationScore('');
    }
  };

  // const handleModalOk = () => {
  //   if (newMajorName != '' && newGraduationScore != '') {
  //     alert('정보를 입력해 주세요.');
  //     return;
  //   }

  //   const graduationScoreValue = parseInt(newGraduationScore);

  //   if (graduationScoreValue < 110 || graduationScoreValue > 135) {
  //     alert('졸업학점은 110에서 135 사이여야 합니다.');
  //     return;
  //   }

  //   MajorPostTest(newMajorName, graduationScoreValue);
  // };

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
    if (data) {
      const temp = data?.vo?.map(item => {
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
          modalTitle="전공명/졸업학점 변경"
          handleModalOk={changeClickShowOpen}
          handleModalCancel={chnageClickCloseWin}
        >
          <p>해당 내용으로 변경하시겠습니까?</p>
        </CommonModal>
      ) : null}
      {disUseModalShow === true ? (
        <CommonModal
          setDisplay={setDisUseModalShow}
          modalSize="small"
          modalTitle="전공 폐지"
          handleModalOk={() => disuesModalOk(majorId)} //확인 버튼 클릭시 majorId넣은 함수 실행
          handleModalCancel={() => setShowModal(false)}
        >
          <p>해당 전공을 폐지 하시겠습니까?</p>
        </CommonModal>
      ) : null}
      <SearchBar queries={queries} setPage={true} setClick={setClick}>
        <Dropdown
          placeholder="상태"
          data={_status}
          value={delYn}
          setValue={setDelYn}
          propertyName={{ key: 'id', value: 'title' }}
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
      <CommonButton btnType="page" value="전공추가" onClick={plusModalOpen} />
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
                type="text"
                length="short"
                value={newGraduationScore}
                // setValue={e => {
                //   const value = e.target.value;
                //   if (/^\d{0,3}$/.test(value)) {
                //     const score = parseInt(value);
                //     if (score >= 110 && score <= 135) {
                //       setNewGraduationScore(value);
                //     }
                //   }
                // }}
                setValue={e => {
                  const value = e.target.value;
                  // 정규 표현식으로  3자리 숫자만 허용
                  if (/^\d{0,3}$/.test(value)) {
                    setNewGraduationScore(value);
                  } else {
                    setNewGraduationScore('');
                  }
                }}
                maxLength={3}
                reset={setNewGraduationScore}
              />
            </div>
          </div>
        </CommonModal>
      ) : null}
      <Table
        header={tableHeader}
        data={data?.vo}
        hasPage={true}
        maxPage={data?.page?.maxPage}
        pending={pending}
        error={error}
      >
        {isDataArr?.map(item => {
          return (
            <div key={item.imajor}>
              <div>
                {selectMajorID === item.imajor ? (
                  <Input
                    length="long"
                    type="text"
                    value={selectMajorName}
                    // setValue={e => setSelectMajorName(e.target.value)}
                    setValue={e => {
                      const inputValue = e.target.value;
                      let nowT = inputValue; //.replace(/[\s!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/g, '');
                      nowT = nowT.replace(/[\s!@#$%^&*()_+{}[\]:;<>,.?~\\-]/g, '');

                      // const regex = /^[가-힣a-zA-Z]*$/;
                      // if (regex.test(inputValue)) {
                      //   const cursorStart = e.target.selectionStart; // 커서 시작 위치
                      //   const cursorEnd = e.target.selectionEnd; // 커서 끝 위치
                      //   // 커서 위치를 설정
                      //   // e.target.setSelectionRange(cursorStart, cursorEnd);
                      //   setSelectMajorName(inputValue);
                      // }
                      setSelectMajorName(nowT);
                    }}
                  />
                ) : (
                  item.majorName
                )}
              </div>
              <div>
                {selectMajorID === item.imajor ? (
                  <Input
                    tlength="short"
                    type="text"
                    maxLength={3}
                    value={graduationScore}
                    // setValue={e => setGraduationScore(e.target.value)}
                    setValue={e => {
                      const value = e.target.value;
                      // 정규 표현식으로  3자리 숫자만 허용
                      if (/^\d{0,3}$/.test(value)) {
                        setGraduationScore(value);
                      } else {
                        setGraduationScore('');
                      }
                    }}
                  />
                ) : (
                  item.graduationScore
                )}
              </div>
              <div>{item.delYn === 0 ? null : '폐지'}</div>
              <div>
                <CommonButton
                  btnType="table"
                  color={item.delYn ? 'gray' : 'blue'}
                  value={selectMajorID === item.imajor ? '확인' : '변경'}
                  onClick={() => changeModalOpen(item.imajor, item.majorName, item.graduationScore)}
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
                {item.isChange === 0 ? null : <span>{item.originName?.replace('구', '(구)')}</span>}
              </div>
            </div>
          );
        })}
      </Table>
    </>
  );
};
export default Major;
